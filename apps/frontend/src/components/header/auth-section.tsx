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
import { Badge } from '../ui/badge'

export function AuthSection() {
  const { data: session, isPending, error } = authClient.useSession()
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)

  const signOut = () => {
    authClient.signOut()
  }

  if (session) {
    return (
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <div className="w-10 h-10 rounded-full select-none">
              <Avatar className="h-10 w-10 cursor-pointer rounded-full">
                <AvatarImage
                  src={session.user.image!}
                  alt={session.user.name}
                  className="rounded-full"
                />
                <AvatarFallback>tvuj profil</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{session.user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {session.user.role === 'admin' && (
              <Link to="/admin">
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
            <DropdownMenuItem onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>odhlas me PROSIM</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }

  if (isPending) return <div></div>

  return (
    <div className="space-x-2">
      <Link
        to="/auth"
        search={{ mode: 'login' }}
        activeProps={{
          className: 'font-bold',
        }}
      >
        <Button variant="default" className="px-4 py-2 text-sm font-medium">
          Log In
        </Button>
      </Link>
      <Link
        to="/auth"
        search={{ mode: 'signup' }}
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
