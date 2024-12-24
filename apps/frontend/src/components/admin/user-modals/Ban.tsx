import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface BanUserModalProps {
  isOpen: boolean
  onClose: () => void
  user: { id: number; name: string }
}

export function BanUserModal({ isOpen, onClose, user }: BanUserModalProps) {
  const [reason, setReason] = useState('')
  const [duration, setDuration] = useState('')

  const handleBan = () => {
    // Implement ban logic here
    console.log(`Banning user ${user.id} for ${duration} with reason: ${reason}`)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ban User: {user.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="reason" className="text-right">
              Reason
            </Label>
            <Input
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duration" className="text-right">
              Duration
            </Label>
            <Input
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="col-span-3"
              placeholder="e.g., 7 days, 1 month"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleBan}>
            Ban User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
