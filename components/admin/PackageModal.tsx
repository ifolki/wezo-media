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
import { Loader2, Plus, X } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

interface PackageModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  pkg?: any 
}

export default function PackageModal({ isOpen, onClose, onSuccess, pkg }: PackageModalProps) {
  const [loading, setLoading] = useState(false)
  const [services, setServices] = useState<any[]>([])
  const [formData, setFormData] = useState<{
    nameAr: string;
    nameEn: string;
    nameFr: string;
    price: string;
    currency: string;
    isPopular: boolean;
    serviceId: string;
    features: string[];
  }>({
    nameAr: '',
    nameEn: '',
    nameFr: '',
    price: '',
    currency: 'USD',
    isPopular: false,
    serviceId: '',
    features: []
  })
  const [featureInput, setFeatureInput] = useState('')

  useEffect(() => {
    fetchServices()
  }, [])

  useEffect(() => {
    if (pkg) {
      setFormData({
        nameAr: pkg.nameAr || '',
        nameEn: pkg.nameEn || '',
        nameFr: pkg.nameFr || '',
        price: pkg.price?.toString() || '',
        currency: pkg.currency || 'USD',
        isPopular: pkg.isPopular || false,
        serviceId: pkg.serviceId || '',
        features: pkg.features || []
      })
    } else {
      setFormData({
        nameAr: '',
        nameEn: '',
        nameFr: '',
        price: '',
        currency: 'USD',
        isPopular: false,
        serviceId: '',
        features: []
      })
    }
  }, [pkg, isOpen])

  async function fetchServices() {
    try {
      const resp = await fetch('/api/admin/services')
      if (resp.ok) {
        setServices(await resp.json())
      }
    } catch (e) {
      console.error(e)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.serviceId) return toast.error('Please select a service')
    
    setLoading(true)
    try {
      const url = pkg ? `/api/admin/packages/${pkg.id}` : '/api/admin/packages'
      const method = pkg ? 'PATCH' : 'POST'

      const resp = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (resp.ok) {
        toast.success(pkg ? 'Package updated' : 'Package created')
        onSuccess()
        onClose()
      } else {
        toast.error('Something went wrong')
      }
    } catch (error) {
      toast.error('Failed to save package')
    } finally {
      setLoading(false)
    }
  }

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({ ...formData, features: [...formData.features, featureInput.trim()] })
      setFeatureInput('')
    }
  }

  const removeFeature = (index: number) => {
    setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-brand-dark border-white/10 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">
            {pkg ? 'Edit Pricing Package' : 'Create New Package'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Name (Arabic)</Label>
              <Input dir="rtl" value={formData.nameAr} onChange={e => setFormData({...formData, nameAr: e.target.value})} className="bg-white/5" required />
            </div>
            <div className="space-y-2">
              <Label>Name (English)</Label>
              <Input value={formData.nameEn} onChange={e => setFormData({...formData, nameEn: e.target.value})} className="bg-white/5" required />
            </div>
            <div className="space-y-2">
              <Label>Name (French)</Label>
              <Input value={formData.nameFr} onChange={e => setFormData({...formData, nameFr: e.target.value})} className="bg-white/5" />
            </div>
            <div className="space-y-2">
              <Label>Service</Label>
              <Select value={formData.serviceId} onValueChange={(val: string | null) => setFormData({...formData, serviceId: val || ''})}>
                <SelectTrigger className="bg-white/5 border-white/10">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent className="bg-brand-dark border-white/10 text-white">
                  {services.map(s => (
                    <SelectItem key={s.id} value={s.id}>{s.nameEn} / {s.nameAr}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Price</Label>
              <Input type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="bg-white/5" required />
            </div>
            <div className="space-y-2">
              <Label>Currency</Label>
              <Select value={formData.currency} onValueChange={(val: string | null) => setFormData({...formData, currency: val || ''})}>
                <SelectTrigger className="bg-white/5 border-white/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-brand-dark border-white/10 text-white">
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="MAD">MAD (DH)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
              <Label className="cursor-pointer">Popular Package</Label>
              <Switch checked={formData.isPopular} onCheckedChange={val => setFormData({...formData, isPopular: val})} />
            </div>
          </div>

          <div className="space-y-4">
            <Label>Features</Label>
            <div className="flex gap-2">
              <Input 
                value={featureInput} 
                onChange={e => setFeatureInput(e.target.value)} 
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFeature())} 
                placeholder="Add a feature..." 
                className="bg-white/5" 
              />
              <Button type="button" onClick={addFeature} variant="secondary">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {formData.features.map((feature, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 text-sm">
                  <span>{feature}</span>
                  <button type="button" onClick={() => removeFeature(idx)} className="text-red-500/50 hover:text-red-500">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter className="pt-6 border-t border-white/5">
            <Button type="button" variant="ghost" onClick={onClose} disabled={loading}>Cancel</Button>
            <Button type="submit" className="gradient-brand min-w-[150px] h-12 rounded-xl font-bold" disabled={loading}>
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (pkg ? 'Update Package' : 'Create Package')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
