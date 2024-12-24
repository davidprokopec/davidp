import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUserMutations } from '@/hooks/useUserMutations'
import { UserWithRole } from 'better-auth/plugins'
import { Switch } from '@/components/ui/switch'
import { DateTimePicker } from '@/components/ui/datetime-picker'

interface BanUserModalProps {
  isOpen: boolean
  onClose: () => void
  user: UserWithRole
}

export function BanUserModal({ isOpen, onClose, user }: BanUserModalProps) {
  const [banReason, setBanReason] = useState('')
  const [banDate, setBanDate] = useState<Date | undefined>(
    // Set default to tomorrow at current time
    new Date(new Date().setDate(new Date().getDate() + 1)),
  )
  const [isUnban, setIsUnban] = useState(false)
  const [isForever, setIsForever] = useState(false)
  const { banUser } = useUserMutations()

  const handleBan = () => {
    banUser.mutate(
      {
        userId: user.id,
        reason: banReason,
        expiresAt: isUnban ? null : isForever ? undefined : banDate?.toISOString(),
      },
      {
        onSuccess: () => {
          onClose()
        },
      },
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isUnban ? 'Unban' : 'Ban'} User: {user.name || user.email}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center space-x-2">
            <Switch id="unban-mode" checked={isUnban} onCheckedChange={setIsUnban} />
            <Label htmlFor="unban-mode">Unban user instead</Label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reason">{isUnban ? 'Unban' : 'Ban'} Reason</Label>
            <Input
              id="reason"
              value={banReason}
              onChange={(e) => setBanReason(e.target.value)}
              placeholder={`Enter reason for ${isUnban ? 'unban' : 'ban'}...`}
            />
          </div>
          {!isUnban && (
            <>
              <div className="flex items-center space-x-2">
                <Switch
                  id="forever-mode"
                  checked={isForever}
                  onCheckedChange={(checked) => {
                    setIsForever(checked)
                    if (checked) {
                      setBanDate(undefined)
                    } else {
                      setBanDate(new Date(new Date().setDate(new Date().getDate() + 1)))
                    }
                  }}
                />
                <Label htmlFor="forever-mode">Ban Forever</Label>
              </div>
              {!isForever && (
                <div className="space-y-2">
                  <Label>Ban Until</Label>
                  <DateTimePicker
                    value={banDate}
                    onChange={(date) => {
                      if (date && date > new Date()) {
                        setBanDate(date)
                      }
                    }}
                    displayFormat={{ hour24: 'dd/MM/yyyy HH:mm' }}
                    granularity="minute"
                  />
                </div>
              )}
            </>
          )}
          <Button
            variant="destructive"
            onClick={handleBan}
            className="w-full"
            disabled={banUser.isPending || (!isUnban && !isForever && !banDate)}
          >
            {banUser.isPending
              ? isUnban
                ? 'Unbanning...'
                : 'Banning...'
              : isUnban
                ? 'Unban User'
                : 'Ban User'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
