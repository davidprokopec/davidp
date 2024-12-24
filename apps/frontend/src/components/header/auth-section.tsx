import * as React from 'react'
import { Link } from '@tanstack/react-router'
import { authClient } from '@/lib/auth-client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Eye, LogOut, Settings, User } from 'lucide-react'
import { Button } from '../ui/button'
import { useSession } from '@/hooks/useSession'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QueryKeys, MutationKeys } from '@/lib/query-keys'
import { Roles } from '@repo/shared'

export function AuthSection() {
  const { data: session, isPending, error } = useSession()
  const queryClient = useQueryClient()
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)

  const signOutMutation = useMutation({
    mutationKey: MutationKeys.auth.signOut,
    mutationFn: () => authClient.signOut(),
    onSuccess: () => {
      queryClient.setQueryData(QueryKeys.session, null)
      queryClient.invalidateQueries({ queryKey: QueryKeys.session })
    },
  })

  if (session?.user) {
    const userInitials = session.user.name
      ? session.user.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
      : (session.user.email?.[0]?.toUpperCase() ?? 'U')

    const displayName = session.user.name || session.user.email || 'User'

    return (
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <div className="w-10 h-10 rounded-full select-none">
              <Avatar className="h-10 w-10 cursor-pointer rounded-full">
                {session.user.image ? (
                  <AvatarImage
                    src={session.user.image}
                    alt={displayName}
                    className="rounded-full"
                  />
                ) : null}
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{displayName}</p>
                <p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {session.user.role && Roles.adminRoles.includes(session.user.role) && (
              <Link to="/admin/$tab" params={{ tab: 'users' }}>
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  <span>admin</span>
                </DropdownMenuItem>
              </Link>
            )}
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>TODO Profil</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>TODO Nastaveni</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOutMutation.mutate()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>odhlas me PROSIM</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }

  return (
    <div className="space-x-2">
      <Link
        to="/auth/$mode"
        params={{ mode: 'login' }}
        activeProps={{
          className: 'font-bold',
        }}
      >
        <Button variant="default" className="px-4 py-2 text-sm font-medium">
          Log In
        </Button>
      </Link>
      <Link
        to="/auth/$mode"
        params={{ mode: 'signup' }}
        activeProps={{
          className: 'font-bold',
        }}
      >
        <button className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-900 transition-all">
          Sign Up
        </button>
      </Link>
    </div>
  )
}
