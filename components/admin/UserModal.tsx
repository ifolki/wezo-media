'use client'

import { useState, useEffect } from 'react'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface UserModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  user?: any 
}

export default function UserModal({ isOpen, onClose, onSuccess, user }: UserModalProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'USER',
    phone: ''
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '', // Don't show password
        role: user.role || 'USER',
        phone: user.phone || ''
      })
    } else {
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'USER',
        phone: ''
      })
    }
  }, [user, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const url = user ? `/api/admin/users/${user.id}` : '/api/admin/users'
      const method = user ? 'PATCH' : 'POST'

      const resp = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (resp.ok) {
        toast.success(user ? 'User updated' : 'User created')
        onSuccess()
        onClose()
      } else {
        const err = await resp.json()
        toast.error(err.error || 'Something went wrong')
      }
    } catch (error) {
      toast.error('Failed to save user')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-brand-dark border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">
            {user ? 'Edit User' : 'Add New Client'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-white/5" required />
          </div>
          
          <div className="space-y-2">
            <Label>Email Address</Label>
            <Input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="bg-white/5" required />
          </div>

          {!user && (
            <div className="space-y-2">
              <Label>Password</Label>
              <Input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="bg-white/5" required={!user} />
            </div>
          )}

          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input value={formData.phone || ''} onChange={e => setFormData({...formData, phone: e.target.value})} className="bg-white/5" />
          </div>

          <div className="space-y-2">
            <Label>Role</Label>
            <Select value={formData.role} onValueChange={(val: string | null) => setFormData({...formData, role: val || 'USER'})}>
              <SelectTrigger className="bg-white/5 border-white/10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-brand-dark border-white/10 text-white">
                <SelectItem value="USER">Client (USER)</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="pt-6 border-t border-white/5">
            <Button type="button" variant="ghost" onClick={onClose} disabled={loading}>Cancel</Button>
            <Button type="submit" className="gradient-brand min-w-[120px] h-12 rounded-xl font-bold" disabled={loading}>
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (user ? 'Update' : 'Add Client')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
