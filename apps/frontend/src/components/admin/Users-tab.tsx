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
import { Button } from '@/components/ui/button'
import { BanUserModal } from './user-modals/Ban'
import { UserSessionsModal } from './user-modals/Sessions'
import { EditUserModal } from './user-modals/Edit'
import { useUsers } from '@/hooks/useUsers'
import { Badge } from '@/components/ui/badge'
import { formatDistanceToNow } from 'date-fns'
import { Users } from '@repo/shared'

export function UsersTab() {
  const { data } = useUsers()
  const users = data?.data?.users || []
  const [searchTerm, setSearchTerm] = useState('')
  const [sortColumn, setSortColumn] = useState<keyof Users.User>('lastActive')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [selectedUser, setSelectedUser] = useState<Users.User | null>(null)
  const [isBanModalOpen, setIsBanModalOpen] = useState(false)
  const [isSessionsModalOpen, setIsSessionsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

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
                <Button
                  variant="outline"
                  size="sm"
                  className="mr-2 hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => {
                    setSelectedUser(user)
                    setIsBanModalOpen(true)
                  }}
                >
                  {user.banned ? 'Update Ban' : 'Ban'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="mr-2 hover:bg-primary hover:text-primary-foreground"
                  onClick={() => {
                    setSelectedUser(user)
                    setIsSessionsModalOpen(true)
                  }}
                >
                  Sessions
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-secondary hover:text-secondary-foreground"
                  onClick={() => {
                    setSelectedUser(user)
                    setIsEditModalOpen(true)
                  }}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedUser && (
        <>
          <BanUserModal
            isOpen={isBanModalOpen}
            onClose={() => setIsBanModalOpen(false)}
            user={selectedUser}
          />
          <UserSessionsModal
            isOpen={isSessionsModalOpen}
            onClose={() => setIsSessionsModalOpen(false)}
            user={selectedUser}
          />
          <EditUserModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            user={selectedUser}
          />
        </>
      )}
    </div>
  )
}
