'use client'

import { useState, useEffect } from 'react'
import { X, Play, Loader2, CheckCircle2, AlertCircle, Sparkles, Image as ImageIcon, Video, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  video: any | null // null for new, object for edit
  categories: any[]
  sectors: any[]
  onSuccess: () => void
  locale: string
}

export default function VideoModal({
  isOpen,
  onClose,
  video,
  categories,
  sectors,
  onSuccess,
  locale
}: VideoModalProps) {
  const isAr = locale === 'ar'
  const isEditing = Boolean(video)

  // Form states
  const [clientName, setClientName] = useState('')
  const [projectName, setProjectName] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [aspectRatio, setAspectRatio] = useState<'VERTICAL_9_16' | 'HORIZONTAL_16_9'>('VERTICAL_9_16')
  const [categoryId, setCategoryId] = useState('')
  const [sectorId, setSectorId] = useState('')
  const [customThumbnail, setCustomThumbnail] = useState('')
  const [titleFr, setTitleFr] = useState('')
  const [titleAr, setTitleAr] = useState('')
  const [titleEn, setTitleEn] = useState('')
  const [descFr, setDescFr] = useState('')
  const [descAr, setDescAr] = useState('')
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED' | 'HIDDEN'>('DRAFT')
  const [isFeatured, setIsFeatured] = useState(false)

  // Validation / Preview state
  const [validatingUrl, setValidatingUrl] = useState(false)
  const [urlData, setUrlData] = useState<{
    valid: boolean
    provider?: string
    videoId?: string
    thumbnailUrl?: string
    embedUrl?: string
    isDuplicate?: boolean
    duplicateClientName?: string | null
    error?: string
  } | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Reset or load initial values
  useEffect(() => {
    if (video) {
      setClientName(video.clientName || '')
      setProjectName(video.projectName || '')
      setVideoUrl(video.videoUrl || '')
      setAspectRatio(video.aspectRatio || 'VERTICAL_9_16')
      setCategoryId(video.categoryId || '')
      setSectorId(video.sectorId || '')
      setCustomThumbnail(video.customThumbnail || '')
      setTitleFr(video.titleFr || '')
      setTitleAr(video.titleAr || '')
      setTitleEn(video.titleEn || '')
      setDescFr(video.descFr || '')
      setDescAr(video.descAr || '')
      setStatus(video.status || 'DRAFT')
      setIsFeatured(Boolean(video.isFeatured))
      setUrlData({
        valid: true,
        provider: video.provider,
        videoId: video.videoId,
        thumbnailUrl: video.thumbnailUrl,
        embedUrl: video.provider === 'GOOGLE_DRIVE' 
          ? `https://drive.google.com/file/d/${video.videoId}/preview`
          : `https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&rel=0`
      })
    } else {
      setClientName('')
      setProjectName('')
      setVideoUrl('')
      setAspectRatio('VERTICAL_9_16')
      setCategoryId(categories[0]?.id || '')
      setSectorId(sectors[0]?.id || '')
      setCustomThumbnail('')
      setTitleFr('')
      setTitleAr('')
      setTitleEn('')
      setDescFr('')
      setDescAr('')
      setStatus('DRAFT')
      setIsFeatured(false)
      setUrlData(null)
      setShowAdvanced(false)
    }
  }, [video, categories, sectors, isOpen])

  // Debounced URL validator
  useEffect(() => {
    if (!videoUrl || videoUrl.trim().length < 8) {
      setUrlData(null)
      return
    }

    const timer = setTimeout(async () => {
      setValidatingUrl(true)
      try {
        const resp = await fetch('/api/admin/portfolio/validate-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: videoUrl.trim(),
            excludeId: video?.id
          })
        })
        const data = await resp.json()
        if (data.success) {
          setUrlData({
            valid: true,
            provider: data.provider,
            videoId: data.videoId,
            thumbnailUrl: data.thumbnailUrl,
            embedUrl: data.embedUrl,
            isDuplicate: data.isDuplicate,
            duplicateClientName: data.duplicateClientName
          })
          if (data.suggestedAspect && !video) {
            setAspectRatio(data.suggestedAspect)
          }
        } else {
          setUrlData({
            valid: false,
            error: data.error
          })
        }
      } catch {
        setUrlData({ valid: false, error: 'Erreur lors de la validation du lien' })
      } finally {
        setValidatingUrl(false)
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [videoUrl, video])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!clientName.trim()) {
      toast.error('Le nom du client ou du projet est requis')
      return
    }

    if (!videoUrl.trim() || !urlData?.valid) {
      toast.error('Veuillez renseigner un lien vidéo valide (YouTube ou Google Drive)')
      return
    }

    if (urlData.isDuplicate) {
      toast.error(`Cette vidéo existe déjà dans le projet "${urlData.duplicateClientName}". Les doublons sont interdits.`)
      return
    }

    setSubmitting(true)
    try {
      const payload = {
        clientName: clientName.trim(),
        projectName: projectName.trim() || clientName.trim(),
        videoUrl: videoUrl.trim(),
        aspectRatio,
        categoryId: categoryId || null,
        sectorId: sectorId || null,
        customThumbnail: customThumbnail.trim() || null,
        titleFr: titleFr.trim() || clientName.trim(),
        titleAr: titleAr.trim() || null,
        titleEn: titleEn.trim() || null,
        descFr: descFr.trim() || null,
        descAr: descAr.trim() || null,
        status,
        isFeatured
      }

      const url = isEditing ? `/api/admin/portfolio/${video.id}` : '/api/admin/portfolio'
      const method = isEditing ? 'PUT' : 'POST'

      const resp = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const result = await resp.json()

      if (resp.ok) {
        toast.success(isEditing ? 'Vidéo mise à jour avec succès' : 'Vidéo ajoutée avec succès')
        onSuccess()
        onClose()
      } else {
        toast.error(result.error || 'Erreur lors de l’enregistrement')
      }
    } catch {
      toast.error('Erreur réseau lors de la communication avec le serveur')
    } finally {
      setSubmitting(false)
    }
  }

  const activeThumbnail = customThumbnail.trim() || urlData?.thumbnailUrl || '/assets/showcase/video-placeholder.webp'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-[#0F172A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto text-start">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-brand-orange/10 rounded-2xl text-brand-orange">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">
                {isEditing ? (isAr ? 'تعديل بيانات الفيديو' : 'Modifier la vidéo') : (isAr ? 'إضافة فيديو إعلاني جديد' : 'Ajouter une nouvelle vidéo')}
              </h2>
              <p className="text-xs text-text-muted">
                {isAr ? 'أدخل رابط YouTube أو Google Drive وسيتكفل النظام بالباقي' : 'Workflow rapide : collez le lien YouTube ou Google Drive'}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-white/10 text-white">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* STEP 1: Video URL Input with Instant Detection */}
          <div className="space-y-2 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
            <label className="flex items-center justify-between text-sm font-black text-white">
              <span>Lien de la vidéo (YouTube ou Google Drive) <span className="text-brand-orange">*</span></span>
              {validatingUrl && (
                <span className="flex items-center gap-1.5 text-xs text-text-muted">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-orange" /> Analyse du lien...
                </span>
              )}
            </label>
            <div className="relative">
              <input
                type="url"
                required
                placeholder="https://www.youtube.com/shorts/... ou youtu.be/... ou drive.google.com/file/d/..."
                value={videoUrl}
                onChange={e => setVideoUrl(e.target.value)}
                className={`w-full bg-white/5 border rounded-2xl px-4 py-3.5 text-sm text-white placeholder:text-text-muted/50 focus:outline-none transition-all ${
                  urlData?.valid 
                    ? 'border-emerald-500/50 focus:border-emerald-500' 
                    : urlData?.error 
                    ? 'border-red-500/50 focus:border-red-500' 
                    : 'border-white/10 focus:border-brand-orange'
                }`}
              />
            </div>

            {/* Live Detection Feedback */}
            {urlData && (
              <div className="pt-2">
                {urlData.valid ? (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>
                        Détecté : <strong className="uppercase">{urlData.provider}</strong> (ID: {urlData.videoId})
                      </span>
                    </div>
                    {urlData.isDuplicate ? (
                      <span className="text-amber-400 font-bold flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> Doublon détecté ({urlData.duplicateClientName})
                      </span>
                    ) : (
                      <span className="text-emerald-400 font-medium">✓ Lien unique et sécurisé</span>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-300">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{urlData.error}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Live Preview Card */}
          {urlData?.valid && (
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row gap-5 items-center">
              <div className="relative w-36 h-48 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-black">
                <img src={activeThumbnail} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="p-2.5 rounded-full bg-brand-orange text-white shadow-lg">
                    <Play className="w-5 h-5 fill-current" />
                  </div>
                </div>
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 text-[10px] font-black uppercase text-white">
                  {aspectRatio === 'VERTICAL_9_16' ? '9:16' : '16:9'}
                </div>
              </div>
              <div className="space-y-2 flex-grow text-sm">
                <div className="text-xs font-black uppercase text-brand-orange tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Aperçu automatique
                </div>
                <div className="text-white font-bold text-base">
                  {clientName || 'Nom du client apparaîtra ici'}
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  Ce format sera affiché dans le WEZO SHOWCASE. La vignette s&apos;affiche instantanément, et la vidéo se chargera uniquement lorsque le client cliquera sur Play.
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: Required Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-black text-white uppercase tracking-wider">
                Nom du Client / Marque <span className="text-brand-orange">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ex: IFOLKI, STIL CUISINE, AUTO ANAS..."
                value={clientName}
                onChange={e => {
                  setClientName(e.target.value)
                  if (!projectName) setProjectName(e.target.value)
                }}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-text-muted/50 focus:outline-none focus:border-brand-orange"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black text-white uppercase tracking-wider">
                Projet Associé (Regroupement)
              </label>
              <input
                type="text"
                placeholder="Nom du projet pour regrouper plusieurs vidéos"
                value={projectName}
                onChange={e => setProjectName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-text-muted/50 focus:outline-none focus:border-brand-orange"
              />
            </div>
          </div>

          {/* STEP 3: Category, Sector & Aspect Ratio */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-black text-white uppercase tracking-wider">
                Type de Production
              </label>
              <select
                value={categoryId}
                onChange={e => setCategoryId(e.target.value)}
                className="w-full bg-[#1E293B] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-orange"
              >
                <option value="">Sélectionner une catégorie...</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.nameFr || c.nameEn || c.nameAr}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black text-white uppercase tracking-wider">
                Secteur d’Activité
              </label>
              <select
                value={sectorId}
                onChange={e => setSectorId(e.target.value)}
                className="w-full bg-[#1E293B] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-orange"
              >
                <option value="">Sélectionner un secteur...</option>
                {sectors.map(s => (
                  <option key={s.id} value={s.id}>{s.nameFr || s.nameEn || s.nameAr}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black text-white uppercase tracking-wider">
                Format d&apos;Affichage
              </label>
              <div className="flex rounded-2xl bg-white/5 p-1 border border-white/10">
                <button
                  type="button"
                  onClick={() => setAspectRatio('VERTICAL_9_16')}
                  className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${
                    aspectRatio === 'VERTICAL_9_16' ? 'bg-brand-orange text-white shadow' : 'text-text-muted hover:text-white'
                  }`}
                >
                  9:16 Vertical
                </button>
                <button
                  type="button"
                  onClick={() => setAspectRatio('HORIZONTAL_16_9')}
                  className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${
                    aspectRatio === 'HORIZONTAL_16_9' ? 'bg-brand-orange text-white shadow' : 'text-text-muted hover:text-white'
                  }`}
                >
                  16:9 Horizontal
                </button>
              </div>
            </div>
          </div>

          {/* STEP 4: Publication Status & Featured */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-xs font-black text-white uppercase tracking-wider">Statut :</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStatus('PUBLISHED')}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    status === 'PUBLISHED' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-white/5 text-text-muted hover:text-white'
                  }`}
                >
                  ✓ Publié
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('DRAFT')}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    status === 'DRAFT' ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'bg-white/5 text-text-muted hover:text-white'
                  }`}
                >
                  Brouillon (Draft)
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('HIDDEN')}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    status === 'HIDDEN' ? 'bg-gray-600 text-white' : 'bg-white/5 text-text-muted hover:text-white'
                  }`}
                >
                  Masqué
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-white">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={e => setIsFeatured(e.target.checked)}
                className="w-4 h-4 accent-brand-orange rounded"
              />
              <span>Mettre en avant (Featured) ⭐</span>
            </label>
          </div>

          {/* Accordion: Optional Advanced Fields */}
          <div className="border border-white/10 rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full p-4 bg-white/[0.02] hover:bg-white/5 text-left text-xs font-black text-text-muted hover:text-white flex items-center justify-between transition-all"
            >
              <span>Options Avancées (Vignette personnalisée, Titres FR/AR/EN, Descriptions)</span>
              <span>{showAdvanced ? '▲ Masquer' : '▼ Déplier'}</span>
            </button>

            {showAdvanced && (
              <div className="p-5 space-y-4 border-t border-white/10 bg-white/[0.01]">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-muted flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-brand-orange" /> Vignette personnalisée (URL)
                  </label>
                  <input
                    type="url"
                    placeholder="Laissez vide pour utiliser la vignette automatique YouTube"
                    value={customThumbnail}
                    onChange={e => setCustomThumbnail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-text-muted/40 focus:outline-none focus:border-brand-orange"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-text-muted">Titre de la vidéo (FR)</label>
                    <input
                      type="text"
                      placeholder="Ex: Campagne de lancement nouvelle collection"
                      value={titleFr}
                      onChange={e => setTitleFr(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-orange"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-text-muted">عنوان الفيديو (AR)</label>
                    <input
                      type="text"
                      dir="rtl"
                      placeholder="عنوان اختياري بالعربية"
                      value={titleAr}
                      onChange={e => setTitleAr(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-orange"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-text-muted">Brève description (FR)</label>
                  <textarea
                    rows={2}
                    placeholder="Description succincte de la prestation réalisée..."
                    value={descFr}
                    onChange={e => setDescFr(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-orange"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={submitting}
              className="text-text-muted hover:text-white rounded-2xl px-6"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={submitting || (urlData && !urlData.valid) || urlData?.isDuplicate}
              className="btn-gradient-orange px-8 py-3 rounded-2xl font-black text-white shadow-lg shadow-brand-orange/20 hover:scale-105 active:scale-95 transition-all gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Enregistrement...
                </>
              ) : isEditing ? (
                'Enregistrer les modifications'
              ) : (
                'Ajouter au Showcase'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
