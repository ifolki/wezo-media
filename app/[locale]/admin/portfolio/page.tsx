'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { 
  Film, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Eye, 
  Sparkles, 
  ExternalLink, 
  ArrowUp, 
  ArrowDown, 
  CheckCircle2, 
  Clock, 
  Layers, 
  Tag, 
  Share2, 
  Copy, 
  Check, 
  Loader2, 
  Play,
  Star,
  Globe
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import VideoModal from '@/components/admin/portfolio/VideoModal'
import TaxonomyModal from '@/components/admin/portfolio/TaxonomyModal'

export default function AdminPortfolioPage() {
  const t = useTranslations('dashboard')
  const locale = useLocale()
  const isAr = locale === 'ar'

  const [videos, setVideos] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [sectors, setSectors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Filters
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PUBLISHED' | 'DRAFT' | 'HIDDEN'>('ALL')
  const [categoryFilter, setCategoryFilter] = useState('ALL')
  const [sectorFilter, setSectorFilter] = useState('ALL')

  // Modals
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isTaxonomyModalOpen, setIsTaxonomyModalOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null)

  // Preview Lightbox
  const [previewVideo, setPreviewVideo] = useState<any | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const [videosRes, taxRes] = await Promise.all([
        fetch('/api/admin/portfolio'),
        fetch('/api/admin/portfolio/taxonomies'),
      ])

      if (videosRes.ok) {
        const vData = await videosRes.json()
        setVideos(vData)
      }
      if (taxRes.ok) {
        const tData = await taxRes.json()
        setCategories(tData.categories || [])
        setSectors(tData.sectors || [])
      }
    } catch (e) {
      console.error(e)
      toast.error('Erreur lors du chargement des vidéos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Filtered list
  const filteredVideos = useMemo(() => {
    return videos.filter(v => {
      if (statusFilter !== 'ALL' && v.status !== statusFilter) return false
      if (categoryFilter !== 'ALL' && v.categoryId !== categoryFilter) return false
      if (sectorFilter !== 'ALL' && v.sectorId !== sectorFilter) return false
      if (search.trim()) {
        const q = search.toLowerCase()
        const matchesClient = v.clientName?.toLowerCase().includes(q)
        const matchesProject = v.projectName?.toLowerCase().includes(q)
        const matchesTitle = v.titleFr?.toLowerCase().includes(q) || v.titleAr?.includes(q)
        const matchesId = v.videoId?.toLowerCase().includes(q)
        if (!matchesClient && !matchesProject && !matchesTitle && !matchesId) return false
      }
      return true
    })
  }, [videos, statusFilter, categoryFilter, sectorFilter, search])

  // Quick Status Toggle
  const handleToggleStatus = async (video: any) => {
    const nextStatus = video.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED'
    try {
      const resp = await fetch(`/api/admin/portfolio/${video.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      })
      if (resp.ok) {
        toast.success(nextStatus === 'PUBLISHED' ? 'Vidéo publiée' : 'Vidéo passée en brouillon')
        setVideos(prev => prev.map(item => item.id === video.id ? { ...item, status: nextStatus } : item))
      } else {
        toast.error('Échec de la mise à jour')
      }
    } catch {
      toast.error('Erreur réseau')
    }
  }

  // Delete
  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Confirmez-vous la suppression de la vidéo "${name}" ?`)) return
    try {
      const resp = await fetch(`/api/admin/portfolio/${id}`, { method: 'DELETE' })
      if (resp.ok) {
        toast.success('Vidéo supprimée avec succès')
        setVideos(prev => prev.filter(v => v.id !== id))
      } else {
        toast.error('Erreur lors de la suppression')
      }
    } catch {
      toast.error('Erreur réseau')
    }
  }

  // Move Order
  const handleMoveOrder = async (index: number, direction: 'UP' | 'DOWN') => {
    const targetIndex = direction === 'UP' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= filteredVideos.length) return

    const newItems = [...videos]
    const itemA = filteredVideos[index]
    const itemB = filteredVideos[targetIndex]

    const orderA = itemA.order
    const orderB = itemB.order

    itemA.order = orderB
    itemB.order = orderA

    setVideos([...newItems].sort((a, b) => a.order - b.order))

    try {
      await fetch('/api/admin/portfolio/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [
            { id: itemA.id, order: orderB },
            { id: itemB.id, order: orderA },
          ]
        })
      })
      toast.success('Ordre mis à jour')
    } catch {
      toast.error('Erreur réordonnancement')
      fetchData()
    }
  }

  // Copy share link
  const handleCopyLink = (video: any) => {
    const shareUrl = `${window.location.origin}/${locale}/portfolio/videos?video=${video.slug}`
    navigator.clipboard.writeText(shareUrl)
    setCopiedId(video.id)
    toast.success('Lien direct copié ! Prêt à être partagé sur WhatsApp.')
    setTimeout(() => setCopiedId(null), 2500)
  }

  // Metrics
  const stats = useMemo(() => {
    return {
      total: videos.length,
      published: videos.filter(v => v.status === 'PUBLISHED').length,
      drafts: videos.filter(v => v.status === 'DRAFT').length,
      categoriesCount: categories.length,
    }
  }, [videos, categories])

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-10 h-10 text-brand-orange animate-spin" />
        <p className="text-text-muted text-sm font-bold">Chargement du portfolio vidéo...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-16 text-start">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-2">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-black uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> WEZO SHOWCASE
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            {isAr ? 'إدارة معرض الفيديوهات والأعمال' : 'Portfolio Vidéos & Showcase'}
          </h1>
          <p className="text-text-muted font-medium text-sm">
            {isAr ? 'إدارة الفيديوهات الإعلانية، Reels، وتصنيفات الأعمال ومشاركتها مع العملاء' : 'Gérez vos productions publicitaires, Reels 9:16 et vidéos 16:9'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={`/${locale}/portfolio/videos`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm flex items-center gap-2 transition-all"
          >
            <Globe className="w-4 h-4 text-brand-orange" />
            <span>{isAr ? 'معاينة المعرض المباشر' : 'Voir le Showcase en ligne'}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>

          <Button
            onClick={() => setIsTaxonomyModalOpen(true)}
            variant="outline"
            className="border-white/10 text-white hover:bg-white/5 rounded-2xl px-5 py-3 text-sm font-bold gap-2"
          >
            <Layers className="w-4 h-4 text-brand-pink" />
            <span>Catégories & Secteurs</span>
          </Button>

          <Button
            onClick={() => {
              setSelectedVideo(null)
              setIsVideoModalOpen(true)
            }}
            className="btn-gradient-orange px-6 py-3 rounded-2xl font-black text-white text-sm flex items-center gap-2 shadow-lg shadow-brand-orange/20 hover:scale-105 active:scale-95 transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>{isAr ? 'إضافة فيديو جديد' : 'Ajouter une vidéo'}</span>
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-2">
        <div className="glass-card p-5 rounded-2xl border-white/10 space-y-1">
          <div className="text-xs font-bold text-text-muted uppercase">Total Réalisations</div>
          <div className="text-3xl font-black text-white font-mono">{stats.total}</div>
        </div>
        <div className="glass-card p-5 rounded-2xl border-emerald-500/20 bg-emerald-500/[0.02] space-y-1">
          <div className="text-xs font-bold text-emerald-400 uppercase">En Ligne (Publiées)</div>
          <div className="text-3xl font-black text-white font-mono">{stats.published}</div>
        </div>
        <div className="glass-card p-5 rounded-2xl border-amber-500/20 bg-amber-500/[0.02] space-y-1">
          <div className="text-xs font-bold text-amber-400 uppercase">Brouillons (Draft)</div>
          <div className="text-3xl font-black text-white font-mono">{stats.drafts}</div>
        </div>
        <div className="glass-card p-5 rounded-2xl border-white/10 space-y-1">
          <div className="text-xs font-bold text-text-muted uppercase">Catégories Actives</div>
          <div className="text-3xl font-black text-white font-mono">{stats.categoriesCount}</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card p-4 rounded-3xl border-white/10 space-y-4 px-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Rechercher par client, titre, ou ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-2.5 text-sm text-white placeholder:text-text-muted/50 focus:outline-none focus:border-brand-orange"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Status Filter Pills */}
            <div className="flex rounded-xl bg-white/5 p-1 border border-white/10 text-xs">
              {(['ALL', 'PUBLISHED', 'DRAFT', 'HIDDEN'] as const).map(st => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    statusFilter === st ? 'bg-brand-orange text-white' : 'text-text-muted hover:text-white'
                  }`}
                >
                  {st === 'ALL' ? 'Tous' : st === 'PUBLISHED' ? 'Publiés' : st === 'DRAFT' ? 'Brouillons' : 'Masqués'}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="bg-[#1E293B] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-orange"
            >
              <option value="ALL">Toutes les catégories</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.nameFr || c.nameEn || c.nameAr}</option>
              ))}
            </select>

            {/* Sector Filter */}
            <select
              value={sectorFilter}
              onChange={e => setSectorFilter(e.target.value)}
              className="bg-[#1E293B] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-orange"
            >
              <option value="ALL">Tous les secteurs</option>
              {sectors.map(s => (
                <option key={s.id} value={s.id}>{s.nameFr || s.nameEn || s.nameAr}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Videos List / Table */}
      <div className="glass-card rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        {filteredVideos.length === 0 ? (
          <div className="p-16 text-center space-y-4">
            <Film className="w-12 h-12 text-text-muted mx-auto opacity-50" />
            <h3 className="text-xl font-bold text-white">Aucune vidéo trouvée</h3>
            <p className="text-sm text-text-muted max-w-md mx-auto">
              {search || statusFilter !== 'ALL'
                ? 'Aucun résultat ne correspond à vos filtres de recherche.'
                : 'Commencez par ajouter votre première réalisation vidéo dans le WEZO SHOWCASE.'}
            </p>
            <Button
              onClick={() => {
                setSelectedVideo(null)
                setIsVideoModalOpen(true)
              }}
              className="btn-gradient-orange px-6 py-2.5 rounded-2xl font-black text-white text-sm"
            >
              Ajouter une vidéo
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filteredVideos.map((video, idx) => (
              <div
                key={video.id}
                className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 hover:bg-white/[0.02] transition-colors"
              >
                {/* Left: Thumbnail & Info */}
                <div className="flex items-center gap-4 min-w-0">
                  {/* Thumbnail with aspect badge */}
                  <div
                    onClick={() => setPreviewVideo(video)}
                    className="relative w-20 h-28 sm:w-24 sm:h-36 rounded-2xl overflow-hidden bg-black shrink-0 border border-white/10 group cursor-pointer shadow-lg"
                  >
                    <img
                      src={video.thumbnailUrl || '/assets/showcase/video-placeholder.webp'}
                      alt={video.clientName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="p-2 rounded-full bg-brand-orange text-white">
                        <Play className="w-4 h-4 fill-current" />
                      </div>
                    </div>
                    <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-black uppercase text-white font-mono">
                      {video.aspectRatio === 'VERTICAL_9_16' ? '9:16' : '16:9'}
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs px-2.5 py-0.5 rounded-full font-mono uppercase font-black tracking-wider text-white bg-white/10">
                        {video.provider}
                      </span>
                      {video.category && (
                        <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-brand-orange/15 text-brand-orange border border-brand-orange/30">
                          {video.category.nameFr || video.category.nameEn || video.category.nameAr}
                        </span>
                      )}
                      {video.sector && (
                        <span className="text-xs px-2 py-0.5 rounded-full text-text-muted bg-white/5">
                          {video.sector.nameFr || video.sector.nameEn || video.sector.nameAr}
                        </span>
                      )}
                      {video.isFeatured && (
                        <span className="text-xs px-2 py-0.5 rounded-full text-amber-300 bg-amber-400/10 border border-amber-400/30 font-bold flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current" /> En vedette
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-black text-white truncate">
                      {video.clientName}
                      {video.projectName && video.projectName !== video.clientName && (
                        <span className="text-text-muted font-normal text-sm ml-2">({video.projectName})</span>
                      )}
                    </h3>

                    {video.titleFr && (
                      <p className="text-xs text-text-muted line-clamp-1">
                        {video.titleFr}
                      </p>
                    )}

                    <div className="text-[11px] text-text-muted/60 font-mono flex items-center gap-3">
                      <span>ID: {video.videoId}</span>
                      <span>Slug: /{video.slug}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Status Pill & Actions */}
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-0 border-white/5">
                  {/* Status Toggle Button */}
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(video)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      video.status === 'PUBLISHED'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30'
                        : video.status === 'DRAFT'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30'
                        : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                    }`}
                  >
                    {video.status === 'PUBLISHED' ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Publié
                      </>
                    ) : video.status === 'DRAFT' ? (
                      <>
                        <Clock className="w-3.5 h-3.5" /> Brouillon
                      </>
                    ) : (
                      'Masqué'
                    )}
                  </button>

                  {/* Ordering Buttons */}
                  <div className="flex items-center rounded-xl bg-white/5 border border-white/10 p-0.5">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleMoveOrder(idx, 'UP')}
                      disabled={idx === 0}
                      className="h-7 w-7 text-text-muted hover:text-white disabled:opacity-30 rounded-lg"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleMoveOrder(idx, 'DOWN')}
                      disabled={idx === filteredVideos.length - 1}
                      className="h-7 w-7 text-text-muted hover:text-white disabled:opacity-30 rounded-lg"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </Button>
                  </div>

                  {/* Copy Share Link */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopyLink(video)}
                    title="Copier le lien direct pour WhatsApp"
                    className="h-9 w-9 rounded-xl bg-white/5 hover:bg-white/10 text-text-muted hover:text-white"
                  >
                    {copiedId === video.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  </Button>

                  {/* Preview Button */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setPreviewVideo(video)}
                    className="h-9 w-9 rounded-xl bg-white/5 hover:bg-white/10 text-text-muted hover:text-white"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>

                  {/* Edit Button */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedVideo(video)
                      setIsVideoModalOpen(true)
                    }}
                    className="h-9 w-9 rounded-xl bg-white/5 hover:bg-white/10 text-text-muted hover:text-brand-orange"
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>

                  {/* Delete Button */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(video.id, video.clientName)}
                    className="h-9 w-9 rounded-xl bg-white/5 hover:bg-red-500/20 text-text-muted hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video Add/Edit Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        video={selectedVideo}
        categories={categories}
        sectors={sectors}
        onSuccess={fetchData}
        locale={locale}
      />

      {/* Taxonomies Modal */}
      <TaxonomyModal
        isOpen={isTaxonomyModalOpen}
        onClose={() => setIsTaxonomyModalOpen(false)}
        categories={categories}
        sectors={sectors}
        onRefresh={fetchData}
        locale={locale}
      />

      {/* Admin Video Lightbox Preview */}
      {previewVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in">
          <div className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
            <div className="p-4 bg-[#0A0A0F] border-b border-white/10 flex items-center justify-between">
              <div>
                <h4 className="text-white font-black">{previewVideo.clientName}</h4>
                <p className="text-xs text-text-muted font-mono">{previewVideo.provider} • ID: {previewVideo.videoId}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPreviewVideo(null)}
                className="text-white hover:bg-white/10 rounded-full"
              >
                ✕
              </Button>
            </div>

            <div className={`w-full flex items-center justify-center bg-black ${
              previewVideo.aspectRatio === 'VERTICAL_9_16' ? 'h-[75vh]' : 'aspect-video'
            }`}>
              {previewVideo.provider === 'YOUTUBE' ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${previewVideo.videoId}?autoplay=1&rel=0&modestbranding=1`}
                  className={`${previewVideo.aspectRatio === 'VERTICAL_9_16' ? 'h-full aspect-[9/16]' : 'w-full h-full'}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : previewVideo.provider === 'GOOGLE_DRIVE' ? (
                <iframe
                  src={`https://drive.google.com/file/d/${previewVideo.videoId}/preview`}
                  className={`${previewVideo.aspectRatio === 'VERTICAL_9_16' ? 'h-full aspect-[9/16]' : 'w-full h-full'}`}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              ) : (
                <video
                  src={previewVideo.videoUrl}
                  controls
                  autoPlay
                  className="max-h-full max-w-full"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
