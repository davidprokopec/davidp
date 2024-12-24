'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { BanUserModal } from './user-modals/Ban'
import { UserSessionsModal } from './user-modals/Sessions'
import { EditUserModal } from './user-modals/Edit'
import { useUsers } from '@/hooks/useUsers'
import { Badge } from '@/components/ui/badge'
import { formatDistanceToNow } from 'date-fns'
import { Users } from '@repo/shared'
import { MoreHorizontal, Ban, Users as UsersIcon, Edit } from 'lucide-react'
import { Route as AdminRoute } from '@/routes/admin/$tab'
import { useUserMutations } from '@/hooks/useUserMutations'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

export function UsersTab() {
  const { data } = useUsers()
  const users = data?.data?.users || []
  const [searchTerm, setSearchTerm] = useState('')
  const [sortColumn, setSortColumn] = useState<keyof Users.User>('lastActive')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const { banUser } = useUserMutations()
  const [showUnbanConfirm, setShowUnbanConfirm] = useState(false)
  const [userToUnban, setUserToUnban] = useState<Users.User | null>(null)

  const { modal, userId } = AdminRoute.useSearch()
  const navigate = AdminRoute.useNavigate()

  const selectedUser = userId ? users.find((u) => u.id === userId) : null

  const handleSort = (column: keyof Users.User) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const formatDate = (date: Date | string | null) => {
    if (!date) return 'Never'
    return formatDistanceToNow(new Date(date), { addSuffix: true })
  }

  const openModal = (modalType: 'ban' | 'sessions' | 'edit', user: Users.User) => {
    navigate({
      search: (prev) => ({
        ...prev,
        modal: modalType,
        userId: user.id,
      }),
      replace: true,
    })
  }

  const closeModal = () => {
    navigate({
      search: (prev) => ({
        ...prev,
        modal: undefined,
        userId: undefined,
      }),
      replace: true,
    })
  }

  const handleBanAction = (user: Users.User) => {
    if (user.banned) {
      setUserToUnban(user)
      setShowUnbanConfirm(true)
    } else {
      openModal('ban', user)
    }
  }

  const handleUnban = () => {
    if (userToUnban) {
      banUser.mutate(
        { userId: userToUnban.id, reason: 'Unbanned by administrator', expiresAt: null },
        {
          onSuccess: () => {
            setShowUnbanConfirm(false)
            setUserToUnban(null)
          },
        },
      )
    }
  }

  const filteredUsers = users
    .filter((user) => {
      const searchLower = searchTerm.toLowerCase()
      return (
        user.name?.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.role?.toLowerCase().includes(searchLower)
      )
    })
    .sort((a, b) => {
      const aValue = a[sortColumn]?.toString() || ''
      const bValue = b[sortColumn]?.toString() || ''
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })

  if (!data) {
    return <div className="p-4">Loading users...</div>
  }

  return (
    <div className="p-4">
      <Input
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 bg-background border-input"
      />
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-muted/50">
            <TableHead onClick={() => handleSort('name')} className="cursor-pointer">
              Name {sortColumn === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead onClick={() => handleSort('email')} className="cursor-pointer">
              Email {sortColumn === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead onClick={() => handleSort('role')} className="cursor-pointer">
              Role {sortColumn === 'role' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead onClick={() => handleSort('createdAt')} className="cursor-pointer">
              Created {sortColumn === 'createdAt' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead onClick={() => handleSort('lastActive')} className="cursor-pointer">
              Last Active {sortColumn === 'lastActive' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id} className="hover:bg-muted/50">
              <TableCell>{user.name || 'N/A'}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="capitalize">{user.role || 'user'}</TableCell>
              <TableCell>{formatDate(user.createdAt)}</TableCell>
              <TableCell>{formatDate(user.lastActive)}</TableCell>
              <TableCell>
                {user.banned ? (
                  <Badge variant="destructive">
                    Banned
                    {user.banExpires
                      ? ` until ${new Date(user.banExpires).toLocaleString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false,
                        })}`
                      : ' Forever'}
                  </Badge>
                ) : (
                  <Badge variant="default">Active</Badge>
                )}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleBanAction(user)}
                      className="text-destructive"
                    >
                      <Ban className="mr-2 h-4 w-4" />
                      {user.banned ? 'Unban' : 'Ban'}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openModal('sessions', user)}>
                      <UsersIcon className="mr-2 h-4 w-4" />
                      Sessions
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openModal('edit', user)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedUser && (
        <>
          <BanUserModal isOpen={modal === 'ban'} onClose={closeModal} user={selectedUser} />
          <UserSessionsModal
            isOpen={modal === 'sessions'}
            onClose={closeModal}
            user={selectedUser}
          />
          <EditUserModal isOpen={modal === 'edit'} onClose={closeModal} user={selectedUser} />
        </>
      )}

      <AlertDialog open={showUnbanConfirm} onOpenChange={setShowUnbanConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Unban</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to unban {userToUnban?.name || userToUnban?.email}? This will
              immediately restore their access to the platform.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setUserToUnban(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleUnban}>Unban User</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
