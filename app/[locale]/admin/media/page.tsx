'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { 
  Image as ImageIcon,
  FolderOpen,
  Film,
  Music,
  UploadCloud,
  Search,
  MoreVertical,
  Trash2,
  Eye,
  Plus
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export default function AdminMediaPage() {
  const t = useTranslations('dashboard')
  const locale = useLocale()
  const isAr = locale === 'ar'

  // Demo Media Files
  const [media, setMedia] = useState([
    { id: '1', name: 'hero-bg.jpg', type: 'image', size: '2.4 MB', date: '2026-03-12' },
    { id: '2', name: 'logo-dark.png', type: 'image', size: '150 KB', date: '2026-03-11' },
    { id: '3', name: 'promo-video.mp4', type: 'video', size: '45 MB', date: '2026-03-10' },
    { id: '4', name: 'podcast-ep1.mp3', type: 'audio', size: '12 MB', date: '2026-03-09' },
    { id: '5', name: 'brand-guidelines.pdf', type: 'document', size: '4.2 MB', date: '2026-03-05' },
    { id: '6', name: 'team-photo.jpg', type: 'image', size: '3.1 MB', date: '2026-03-01' },
    { id: '7', name: 'portfolio-1.jpg', type: 'image', size: '1.8 MB', date: '2026-02-28' },
    { id: '8', name: 'portfolio-2.jpg', type: 'image', size: '2.1 MB', date: '2026-02-28' },
  ])

  const getMediaIcon = (type: string) => {
    switch(type) {
      case 'image': return <ImageIcon className="w-8 h-8 text-brand-orange" />
      case 'video': return <Film className="w-8 h-8 text-brand-pink" />
      case 'audio': return <Music className="w-8 h-8 text-purple-400" />
      default: return <FolderOpen className="w-8 h-8 text-white/50" />
    }
  }

  const getMediaColor = (type: string) => {
    switch(type) {
      case 'image': return 'bg-brand-orange/10 group-hover:bg-brand-orange/20 border-brand-orange/20'
      case 'video': return 'bg-brand-pink/10 group-hover:bg-brand-pink/20 border-brand-pink/20'
      case 'audio': return 'bg-purple-500/10 group-hover:bg-purple-500/20 border-purple-500/20'
      default: return 'bg-white/5 group-hover:bg-white/10 border-white/10'
    }
  }

  return (
    <div className="space-y-8 pb-10 text-start">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-white">{isAr ? 'مكتبة الوسائط' : 'Media Library'}</h1>
          <p className="text-text-muted font-medium">
            {isAr ? 'إدارة الصور، الفيديوهات، والملفات المرفوعة' : 'Manage uploaded images, videos, and files'}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-brand-orange transition-colors rtl:left-auto rtl:right-4" />
            <Input 
              placeholder={isAr ? 'البحث عن ملف...' : 'Search files...'} 
              className="h-14 bg-white/5 border-white/10 rounded-2xl ps-12 rtl:ps-4 rtl:pe-12 text-white placeholder:text-white/20 focus:border-brand-orange/50 transition-all text-lg"
            />
          </div>
          <Button className="w-full sm:w-auto h-14 px-8 rounded-2xl gradient-brand font-black text-lg gap-2 shadow-lg shadow-brand-orange/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
            <UploadCloud className="w-6 h-6" />
            <span>{isAr ? 'رفع ملفات' : 'Upload Files'}</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-2">
        {media.map((file, i) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="glass-card border-white/5 overflow-hidden hover:border-white/20 transition-all group cursor-pointer h-full flex flex-col relative text-center">
               <div className="absolute top-2 right-2 rtl:right-auto rtl:left-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex gap-1">
                  <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg bg-black/50 backdrop-blur-md text-white hover:text-brand-orange border border-white/10">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg bg-black/50 backdrop-blur-md text-red-400 hover:text-red-500 hover:bg-red-500/20 border border-red-500/20">
                    <Trash2 className="w-4 h-4" />
                  </Button>
               </div>

              <div className={`aspect-square w-full flex items-center justify-center border-b border-white/5 transition-colors relative ${getMediaColor(file.type)}`}>
                 {file.type === 'image' && file.name.includes('.jpg') ? (
                    <img src={`https://source.unsplash.com/random/400x400?sig=${file.id}`} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity mix-blend-overlay group-hover:mix-blend-normal" />
                 ) : null}
                 <div className="relative z-0 group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl">
                    {getMediaIcon(file.type)}
                 </div>
              </div>

              <div className="p-4 flex flex-col justify-between flex-grow">
                 <p className="text-white font-bold text-sm truncate group-hover:text-brand-orange transition-colors" title={file.name}>{file.name}</p>
                 <div className="flex items-center justify-between mt-3">
                    <Badge variant="outline" className="text-[10px] uppercase font-black tracking-widest bg-white/5 border-white/10 px-2 py-0.5 rounded-lg text-text-muted">
                      {file.type}
                    </Badge>
                    <span className="text-[10px] text-text-muted font-bold">{file.size}</span>
                 </div>
              </div>
            </Card>
          </motion.div>
        ))}

        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: media.length * 0.05 }}
            className="h-full min-h-[220px]"
        >
            <div className="h-full w-full rounded-3xl border-2 border-dashed border-white/10 hover:border-brand-orange/50 bg-white/[0.01] hover:bg-brand-orange/5 transition-all text-text-muted hover:text-brand-orange flex flex-col items-center justify-center gap-4 cursor-pointer group">
               <div className="w-16 h-16 rounded-2xl bg-white/5 group-hover:bg-brand-orange/20 flex items-center justify-center transition-colors">
                  <Plus className="w-8 h-8" />
               </div>
               <p className="font-bold text-sm">{isAr ? 'رفع المزيد...' : 'Upload More...'}</p>
            </div>
        </motion.div>
      </div>
    </div>
  )
}
