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
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { Loader2, Plus, Trash2 } from 'lucide-react'

interface SolutionModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  solution?: any // If provided, we are editing
}

export default function SolutionModal({ isOpen, onClose, onSuccess, solution }: SolutionModalProps) {
  const [loading, setLoading] = useState(false)
  const [servicesList, setServicesList] = useState<any[]>([])
  const [formData, setFormData] = useState({
    nameAr: '',
    nameEn: '',
    nameFr: '',
    descriptionAr: '',
    descriptionEn: '',
    descriptionFr: '',
    slug: '',
    icon: '',
    image: '',
    isActive: true,
    isFeatured: false,
    order: 0
  })

  // Attached services relation tracking
  const [attached, setAttached] = useState<any[]>([])

  useEffect(() => {
    // Fetch all active services for selector mapping
    async function fetchAllServices() {
      try {
        const resp = await fetch('/api/admin/services')
        if (resp.ok) {
          const data = await resp.json()
          setServicesList(data)
        }
      } catch (err) {
        console.error(err)
      }
    }
    if (isOpen) {
      fetchAllServices()
    }
  }, [isOpen])

  useEffect(() => {
    if (solution) {
      setFormData({
        nameAr: solution.nameAr || '',
        nameEn: solution.nameEn || '',
        nameFr: solution.nameFr || '',
        descriptionAr: solution.descriptionAr || '',
        descriptionEn: solution.descriptionEn || '',
        descriptionFr: solution.descriptionFr || '',
        slug: solution.slug || '',
        icon: solution.icon || '',
        image: solution.image || '',
        isActive: solution.isActive ?? true,
        isFeatured: solution.isFeatured ?? false,
        order: solution.order ?? 0
      })
      // Map attached services
      if (solution.services) {
        setAttached(solution.services.map((s: any) => ({
          serviceId: s.serviceId,
          order: s.order ?? 0,
          isPrimary: s.isPrimary ?? false
        })))
      } else {
        setAttached([])
      }
    } else {
      setFormData({
        nameAr: '',
        nameEn: '',
        nameFr: '',
        descriptionAr: '',
        descriptionEn: '',
        descriptionFr: '',
        slug: '',
        icon: '',
        image: '',
        isActive: true,
        isFeatured: false,
        order: 0
      })
      setAttached([])
    }
  }, [solution, isOpen])

  const addAttachedService = () => {
    const available = servicesList.find(s => !attached.some(a => a.serviceId === s.id))
    if (!available) {
      toast.error('All services are already attached')
      return
    }
    setAttached([...attached, {
      serviceId: available.id,
      order: attached.length,
      isPrimary: false
    }])
  }

  const removeAttachedService = (idx: number) => {
    setAttached(attached.filter((_, i) => i !== idx))
  }

  const updateAttachedService = (idx: number, key: string, val: any) => {
    const updated = [...attached]
    updated[idx] = { ...updated[idx], [key]: val }
    setAttached(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = solution ? `/api/admin/solutions/${solution.id}` : '/api/admin/solutions'
      const method = solution ? 'PATCH' : 'POST'

      const resp = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          attachedServices: attached
        })
      })

      if (resp.ok) {
        toast.success(solution ? 'Solution updated' : 'Solution created')
        onSuccess()
        onClose()
      } else {
        const err = await resp.json()
        toast.error(err.error || 'Something went wrong')
      }
    } catch (error) {
      toast.error('Failed to save solution')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-brand-dark border-white/10 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">
            {solution ? 'Edit Business Solution' : 'Add Business Solution'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Arabic content */}
            <div className="space-y-4 border border-white/5 p-4 rounded-2xl bg-white/5">
              <h4 className="text-brand-orange font-bold uppercase text-xs tracking-widest">Arabic Content (العربية)</h4>
              <div className="space-y-2">
                <Label>Solution Goal</Label>
                <Input 
                  dir="rtl"
                  value={formData.nameAr}
                  onChange={e => setFormData({...formData, nameAr: e.target.value})}
                  className="bg-white/5 border-white/10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Explanation / description</Label>
                <Textarea 
                  dir="rtl"
                  value={formData.descriptionAr}
                  onChange={e => setFormData({...formData, descriptionAr: e.target.value})}
                  className="bg-white/5 border-white/10 min-h-[100px]"
                  required
                />
              </div>
            </div>

            {/* English content */}
            <div className="space-y-4 border border-white/5 p-4 rounded-2xl bg-white/5">
              <h4 className="text-brand-pink font-bold uppercase text-xs tracking-widest">English Content</h4>
              <div className="space-y-2">
                <Label>Solution Goal</Label>
                <Input 
                  value={formData.nameEn}
                  onChange={e => setFormData({...formData, nameEn: e.target.value})}
                  className="bg-white/5 border-white/10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Explanation / description</Label>
                <Textarea 
                  value={formData.descriptionEn}
                  onChange={e => setFormData({...formData, descriptionEn: e.target.value})}
                  className="bg-white/5 border-white/10 min-h-[100px]"
                  required
                />
              </div>
            </div>

            {/* French Content */}
            <div className="space-y-4 border border-white/5 p-4 rounded-2xl bg-white/5 md:col-span-2">
              <h4 className="text-blue-400 font-bold uppercase text-xs tracking-widest">French Content (Français)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nom de la solution</Label>
                  <Input 
                    value={formData.nameFr}
                    onChange={e => setFormData({...formData, nameFr: e.target.value})}
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description (Fr)</Label>
                  <Textarea 
                    value={formData.descriptionFr}
                    onChange={e => setFormData({...formData, descriptionFr: e.target.value})}
                    className="bg-white/5 border-white/10"
                  />
                </div>
              </div>
            </div>

            {/* Commons */}
            <div className="space-y-2">
              <Label>Slug (unique url ID)</Label>
              <Input 
                value={formData.slug}
                onChange={e => setFormData({...formData, slug: e.target.value})}
                placeholder="get-more-customers"
                className="bg-white/5 border-white/10"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Icon / Graphic class</Label>
              <Input 
                value={formData.icon}
                onChange={e => setFormData({...formData, icon: e.target.value})}
                placeholder="TrendingUp"
                className="bg-white/5 border-white/10"
              />
            </div>

            <div className="flex gap-6 items-center pt-6">
              <div className="flex items-center gap-2">
                <Switch 
                  checked={formData.isActive}
                  onCheckedChange={checked => setFormData({...formData, isActive: checked})}
                />
                <Label>Active</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch 
                  checked={formData.isFeatured}
                  onCheckedChange={checked => setFormData({...formData, isFeatured: checked})}
                />
                <Label>Featured on Home</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Display Order</Label>
              <Input 
                type="number"
                value={formData.order}
                onChange={e => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                className="bg-white/5 border-white/10"
              />
            </div>
          </div>

          {/* Attached services builder section */}
          <div className="border border-white/5 p-6 rounded-3xl bg-white/5 space-y-4 text-start">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-white text-lg">Attached Services & Solutions</h4>
              <Button type="button" size="sm" onClick={addAttachedService} className="bg-brand-orange hover:bg-brand-orange/80 text-white gap-1 rounded-xl">
                <Plus className="w-4 h-4" />
                Add Service
              </Button>
            </div>

            {attached.length === 0 ? (
              <p className="text-text-muted text-sm text-center py-4">No services attached yet.</p>
            ) : (
              <div className="space-y-3">
                {attached.map((rel, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row items-center gap-4 bg-black/25 p-4 rounded-2xl border border-white/5">
                    <div className="w-full sm:w-1/2">
                      <Label className="text-xs text-text-muted mb-1 block">Select Service</Label>
                      <select 
                        value={rel.serviceId} 
                        onChange={e => updateAttachedService(idx, 'serviceId', e.target.value)}
                        className="bg-brand-dark border border-white/10 rounded-xl px-3 py-2 w-full text-white text-sm"
                      >
                        {servicesList.map(s => (
                          <option key={s.id} value={s.id}>{s.nameEn} ({s.nameAr})</option>
                        ))}
                      </select>
                    </div>

                    <div className="w-24 shrink-0">
                      <Label className="text-xs text-text-muted mb-1 block">Order</Label>
                      <Input 
                        type="number" 
                        value={rel.order} 
                        onChange={e => updateAttachedService(idx, 'order', parseInt(e.target.value) || 0)}
                        className="bg-brand-dark border-white/10 h-9"
                      />
                    </div>

                    <div className="flex items-center gap-2 mt-4 sm:mt-0 pt-2 shrink-0">
                      <Switch 
                        checked={rel.isPrimary}
                        onCheckedChange={checked => updateAttachedService(idx, 'isPrimary', checked)}
                      />
                      <Label className="text-xs">Primary</Label>
                    </div>

                    <Button type="button" size="icon" onClick={() => removeAttachedService(idx)} className="h-9 w-9 rounded-xl border border-red-500/20 text-red-500 bg-red-500/5 hover:bg-red-500/10 mt-4 sm:mt-0">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="ghost" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" className="gradient-brand min-w-[120px]" disabled={loading}>
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (solution ? 'Update Solution' : 'Create Solution')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
