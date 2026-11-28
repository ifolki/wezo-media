'use client'

import { useState } from 'react'
import { X, Plus, Trash2, Tag, Layers, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface TaxonomyModalProps {
  isOpen: boolean
  onClose: () => void
  categories: any[]
  sectors: any[]
  onRefresh: () => void
  locale: string
}

export default function TaxonomyModal({
  isOpen,
  onClose,
  categories,
  sectors,
  onRefresh,
  locale
}: TaxonomyModalProps) {
  const isAr = locale === 'ar'
  const [activeTab, setActiveTab] = useState<'CATEGORY' | 'SECTOR'>('CATEGORY')
  const [nameFr, setNameFr] = useState('')
  const [nameAr, setNameAr] = useState('')
  const [nameEn, setNameEn] = useState('')
  const [slug, setSlug] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  if (!isOpen) return null

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nameFr && !nameAr && !nameEn) {
      toast.error('Veuillez renseigner au moins un nom')
      return
    }

    setSubmitting(true)
    try {
      const resp = await fetch('/api/admin/portfolio/taxonomies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: activeTab,
          nameFr: nameFr.trim() || nameEn.trim() || nameAr.trim(),
          nameAr: nameAr.trim() || nameFr.trim(),
          nameEn: nameEn.trim() || nameFr.trim(),
          slug: slug.trim() || undefined,
        })
      })

      if (resp.ok) {
        toast.success(activeTab === 'CATEGORY' ? 'Catégorie ajoutée' : 'Secteur ajouté')
        setNameFr('')
        setNameAr('')
        setNameEn('')
        setSlug('')
        onRefresh()
      } else {
        const data = await resp.json()
        toast.error(data.error || 'Erreur lors de la création')
      }
    } catch {
      toast.error('Erreur réseau')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Confirmer la suppression ? Les vidéos associées ne seront pas supprimées.')) return

    setDeletingId(id)
    try {
      const resp = await fetch(`/api/admin/portfolio/taxonomies?type=${activeTab}&id=${id}`, {
        method: 'DELETE'
      })

      if (resp.ok) {
        toast.success('Élément supprimé')
        onRefresh()
      } else {
        toast.error('Impossible de supprimer')
      }
    } catch {
      toast.error('Erreur réseau')
    } finally {
      setDeletingId(null)
    }
  }

  const items = activeTab === 'CATEGORY' ? categories : sectors

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#0F172A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-brand-orange/10 rounded-2xl text-brand-orange">
              {activeTab === 'CATEGORY' ? <Layers className="w-6 h-6" /> : <Tag className="w-6 h-6" />}
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">
                {isAr ? 'إدارة التصنيفات والقطاعات' : 'Catégories & Secteurs'}
              </h2>
              <p className="text-xs text-text-muted">
                {isAr ? 'تخصيص تصنيفات الإنتاج وقطاعات نشاط العملاء' : 'Gérez les types de production et secteurs d’activité'}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-white/10 text-white">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex rounded-2xl bg-white/5 p-1 border border-white/10">
          <button
            type="button"
            onClick={() => setActiveTab('CATEGORY')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'CATEGORY' ? 'bg-brand-orange text-white shadow-lg' : 'text-text-muted hover:text-white'
            }`}
          >
            {isAr ? 'أنواع الإنتاج (Catégories)' : 'Types de production'} ({categories.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('SECTOR')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'SECTOR' ? 'bg-brand-orange text-white shadow-lg' : 'text-text-muted hover:text-white'
            }`}
          >
            {isAr ? 'قطاعات النشاط (Secteurs)' : 'Secteurs d’activité'} ({sectors.length})
          </button>
        </div>

        {/* Quick Add Form */}
        <form onSubmit={handleCreate} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
          <div className="text-xs font-black text-brand-orange uppercase tracking-wider">
            {isAr ? 'إضافة عنصر جديد' : 'Ajouter un nouvel élément'}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="Nom en Français (ex: Vidéos UGC)"
              value={nameFr}
              onChange={e => setNameFr(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-text-muted/60 focus:outline-none focus:border-brand-orange"
            />
            <input
              type="text"
              dir="rtl"
              placeholder="الاسم بالعربية"
              value={nameAr}
              onChange={e => setNameAr(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-text-muted/60 focus:outline-none focus:border-brand-orange"
            />
            <input
              type="text"
              placeholder="Name in English"
              value={nameEn}
              onChange={e => setNameEn(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-text-muted/60 focus:outline-none focus:border-brand-orange"
            />
          </div>
          <div className="flex justify-end pt-1">
            <Button
              type="submit"
              disabled={submitting}
              className="btn-gradient-orange rounded-xl px-5 py-2 text-sm font-black text-white gap-2"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              {isAr ? 'إضافة' : 'Ajouter'}
            </Button>
          </div>
        </form>

        {/* Existing Items List */}
        <div className="space-y-2">
          <div className="text-xs font-black text-text-muted uppercase tracking-wider">
            {isAr ? 'العناصر المسجلة حالياً' : 'Éléments configurés'}
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {items.map(item => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all text-sm"
              >
                <div className="space-y-0.5">
                  <div className="font-bold text-white flex items-center gap-2">
                    <span>{item.nameFr || item.nameEn || item.nameAr}</span>
                    {item.nameAr && <span className="text-xs text-text-muted font-cairo">({item.nameAr})</span>}
                  </div>
                  <div className="text-xs text-text-muted font-mono">{item.slug}</div>
                </div>
                <div className="flex items-center gap-3">
                  {item._count?.videos !== undefined && (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white font-mono">
                      {item._count.videos} vidéos
                    </span>
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                    className="hover:bg-red-500/20 text-text-muted hover:text-red-400 rounded-xl h-8 w-8"
                  >
                    {deletingId === item.id ? (
                      <Loader2 className="w-4 h-4 animate-spin text-red-400" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
