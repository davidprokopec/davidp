import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface UserSessionsModalProps {
  isOpen: boolean
  onClose: () => void
  user: { id: number; name: string }
}

// Mock session data
const mockSessions = [
  { id: 1, device: 'Chrome on Windows', lastActive: '2023-06-01 10:30:00' },
  { id: 2, device: 'Safari on iPhone', lastActive: '2023-06-02 15:45:00' },
  // Add more mock sessions as needed
]

export function UserSessionsModal({ isOpen, onClose, user }: UserSessionsModalProps) {
  const [sessions, setSessions] = useState(mockSessions)

  const handleRevoke = (sessionId: number) => {
    // Implement session revocation logic here
    console.log(`Revoking session ${sessionId} for user ${user.id}`)
    setSessions(sessions.filter((session) => session.id !== sessionId))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>User Sessions: {user.name}</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Device</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((session) => (
              <TableRow key={session.id}>
                <TableCell>{session.device}</TableCell>
                <TableCell>{session.lastActive}</TableCell>
                <TableCell>
                  <Button variant="destructive" size="sm" onClick={() => handleRevoke(session.id)}>
                    Revoke
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  )
}
