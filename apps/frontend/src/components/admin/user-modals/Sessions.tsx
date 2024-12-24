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
import { useUserMutations } from '@/hooks/useUserMutations'
import { UserWithRole } from 'better-auth/plugins'
interface UserSessionsModalProps {
  isOpen: boolean
  onClose: () => void
  user: UserWithRole
}

export function UserSessionsModal({ isOpen, onClose, user }: UserSessionsModalProps) {
  const { sessions, isLoadingSessions, revokeSession } = useUserMutations(user.id)

  const handleRevoke = (sessionId: string) => {
    revokeSession.mutate(
      { userId: user.id, sessionId },
      {
        onSuccess: () => {
          // Session will be automatically removed from the list due to query invalidation
        },
      },
    )
  }

  if (!sessions) return <div>Loading...</div>

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>User Sessions: {user.name || user.email}</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-muted/50">
              <TableHead>Device</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingSessions ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Loading sessions...
                </TableCell>
              </TableRow>
            ) : sessions?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No active sessions
                </TableCell>
              </TableRow>
            ) : (
              sessions?.sessions?.map((session) => (
                <TableRow key={session.id} className="hover:bg-muted/50">
                  <TableCell>{session.device}</TableCell>
                  <TableCell>{session.ipAddress || 'Unknown'}</TableCell>
                  <TableCell>{new Date(session.lastActive).toLocaleString()}</TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRevoke(session.id)}
                      disabled={revokeSession.isPending}
                    >
                      {revokeSession.isPending ? 'Revoking...' : 'Revoke'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  )
}
