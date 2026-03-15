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
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function ProjectModal({ isOpen, onClose, onSuccess }: ProjectModalProps) {
  const [loading, setLoading] = useState(false)
  const [clients, setClients] = useState<any[]>([])
  const [services, setServices] = useState<any[]>([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    clientId: '',
    serviceId: '',
    status: 'PENDING',
    priority: 'MEDIUM',
    budget: ''
  })

  useEffect(() => {
    if (isOpen) {
      fetchData()
    }
  }, [isOpen])

  async function fetchData() {
    try {
      const [uResp, sResp] = await Promise.all([
        fetch('/api/admin/users'),
        fetch('/api/admin/services')
      ])
      if (uResp.ok) setClients(await uResp.json())
      if (sResp.ok) setServices(await sResp.json())
    } catch (e) {
      console.error(e)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.clientId) return toast.error('Please select a client')
    if (!formData.serviceId) return toast.error('Please select a service')

    setLoading(true)
    try {
      const resp = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          budget: parseFloat(formData.budget) || 0
        })
      })

      if (resp.ok) {
        toast.success('Project created')
        onSuccess()
        onClose()
      } else {
        toast.error('Failed to create project')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-brand-dark border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">Create New Project</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Project Title</Label>
            <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="bg-white/5" placeholder="e.g. Website Development" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Client</Label>
              <Select value={formData.clientId} onValueChange={(val: string | null) => setFormData({...formData, clientId: val || ''})}>
                <SelectTrigger className="bg-white/5 border-white/10">
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent className="bg-brand-dark border-white/10 text-white">
                  {(clients || []).map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.name} ({c.email})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Service Category</Label>
              <Select value={formData.serviceId} onValueChange={(val: string | null) => setFormData({...formData, serviceId: val || ''})}>
                <SelectTrigger className="bg-white/5 border-white/10">
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent className="bg-brand-dark border-white/10 text-white">
                  {(services || []).map(s => (
                    <SelectItem key={s.id} value={s.id}>{s.nameEn}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Budget ($)</Label>
              <Input type="number" value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} className="bg-white/5" />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={(val: string | null) => setFormData({...formData, status: val || 'PENDING'})}>
                <SelectTrigger className="bg-white/5 border-white/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-brand-dark border-white/10 text-white">
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="REVIEW">Review</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={formData.priority} onValueChange={(val: string | null) => setFormData({...formData, priority: val || 'MEDIUM'})}>
                <SelectTrigger className="bg-white/5 border-white/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-brand-dark border-white/10 text-white">
                  <SelectItem value="LOW">Low</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="HIGH">High</SelectItem>
                  <SelectItem value="URGENT">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="bg-white/5" />
          </div>

          <DialogFooter className="pt-6 border-t border-white/5">
            <Button type="button" variant="ghost" onClick={onClose} disabled={loading}>Cancel</Button>
            <Button type="submit" className="gradient-brand min-w-[150px] h-12 rounded-xl font-bold" disabled={loading}>
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Project'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
