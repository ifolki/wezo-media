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
import { toast } from 'sonner'
import { Loader2, DollarSign, Image as ImageIcon, File } from 'lucide-react'

interface DigitalProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  product?: any 
}

export default function DigitalProductModal({ isOpen, onClose, onSuccess, product }: DigitalProductModalProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nameAr: '',
    nameEn: '',
    nameFr: '',
    descAr: '',
    descEn: '',
    descFr: '',
    price: '',
    currency: 'USD',
    image: '',
    fileUrl: '',
    isActive: true
  })

  useEffect(() => {
    if (product) {
      setFormData({
        nameAr: product.nameAr || '',
        nameEn: product.nameEn || '',
        nameFr: product.nameFr || '',
        descAr: product.descAr || '',
        descEn: product.descEn || '',
        descFr: product.descFr || '',
        price: product.price?.toString() || '',
        currency: product.currency || 'USD',
        image: product.image || '',
        fileUrl: product.fileUrl || '',
        isActive: product.isActive ?? true
      })
    } else {
      setFormData({
        nameAr: '',
        nameEn: '',
        nameFr: '',
        descAr: '',
        descEn: '',
        descFr: '',
        price: '',
        currency: 'USD',
        image: '',
        fileUrl: '',
        isActive: true
      })
    }
  }, [product, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = product ? `/api/admin/digital-products/${product.id}` : '/api/admin/digital-products'
      const method = product ? 'PATCH' : 'POST'

      const resp = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price)
        })
      })

      if (resp.ok) {
        toast.success(product ? 'Product updated' : 'Product created')
        onSuccess()
        onClose()
      } else {
        toast.error('Failed to save product')
      }
    } catch (error) {
      toast.error('Error saving product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-brand-dark border-white/10 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">
            {product ? 'Edit Product' : 'Add New Digital Product'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Translations */}
            <div className="space-y-4 border border-white/5 p-4 rounded-2xl bg-white/5">
              <h4 className="text-brand-orange font-bold uppercase text-xs tracking-widest">Arabic (العربية)</h4>
              <div className="space-y-2">
                <Label>Product Name</Label>
                <Input dir="rtl" value={formData.nameAr} onChange={e => setFormData({...formData, nameAr: e.target.value})} className="bg-white/5" required />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea dir="rtl" value={formData.descAr} onChange={e => setFormData({...formData, descAr: e.target.value})} className="bg-white/5 min-h-[100px]" required />
              </div>
            </div>

            <div className="space-y-4 border border-white/5 p-4 rounded-2xl bg-white/5">
              <h4 className="text-brand-pink font-bold uppercase text-xs tracking-widest">English</h4>
              <div className="space-y-2">
                <Label>Product Name</Label>
                <Input value={formData.nameEn} onChange={e => setFormData({...formData, nameEn: e.target.value})} className="bg-white/5" required />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={formData.descEn} onChange={e => setFormData({...formData, descEn: e.target.value})} className="bg-white/5 min-h-[100px]" required />
              </div>
            </div>

            <div className="space-y-4 border border-white/5 p-4 rounded-2xl bg-white/5 md:col-span-2">
              <h4 className="text-blue-400 font-bold uppercase text-xs tracking-widest">French (Français)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nom du Produit</Label>
                  <Input value={formData.nameFr} onChange={e => setFormData({...formData, nameFr: e.target.value})} className="bg-white/5" required />
                </div>
                <div className="space-y-2">
                  <Label>Description (Fr)</Label>
                  <Textarea value={formData.descFr} onChange={e => setFormData({...formData, descFr: e.target.value})} className="bg-white/5" required />
                </div>
              </div>
            </div>

            {/* Common */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Price</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <Input type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="bg-white/5 pl-10" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Cover Image URL</Label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <Input value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="bg-white/5 pl-10" placeholder="https://..." />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>File URL (Download Link)</Label>
                <div className="relative">
                  <File className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <Input value={formData.fileUrl} onChange={e => setFormData({...formData, fileUrl: e.target.value})} className="bg-white/5 pl-10" placeholder="https://..." required />
                </div>
              </div>
              <div className="flex items-center gap-2 pt-8">
                <Input type="checkbox" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} className="w-5 h-5" />
                <Label>Active and visible on shop</Label>
              </div>
            </div>

          </div>

          <DialogFooter className="pt-6 border-t border-white/5">
            <Button type="button" variant="ghost" onClick={onClose} disabled={loading}>Cancel</Button>
            <Button type="submit" className="gradient-brand min-w-[150px] h-12 rounded-xl" disabled={loading}>
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (product ? 'Update Product' : 'Create Product')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
