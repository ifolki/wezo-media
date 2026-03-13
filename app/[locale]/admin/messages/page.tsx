'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { 
  MessageSquare, 
  Search, 
  User, 
  Clock, 
  ArrowRight,
  Loader2,
  FolderKanban,
  CheckCircle,
  Mail
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Link } from '@/navigation'
import { formatDistanceToNow } from 'date-fns'
import { ar, enUS } from 'date-fns/locale'

export default function AdminMessagesPage() {
  const t = useTranslations('dashboard')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMessages() {
      try {
        const resp = await fetch('/api/admin/messages')
        if (resp.ok) {
          const data = await resp.json()
          setMessages(data)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchMessages()
  }, [])

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-brand-orange animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div className="space-y-1 text-start">
          <h1 className="text-3xl font-black text-white">{isAr ? 'الرسائل والاشعارات' : 'Messages & Notifications'}</h1>
          <p className="text-text-muted font-medium">
            {isAr ? 'متابعة المحادثات مع العملاء بخصوص المشاريع' : 'Monitor client conversations regarding projects'}
          </p>
        </div>
      </div>

      <div className="px-2">
        <div className="relative group max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-brand-orange transition-colors rtl:left-auto rtl:right-4" />
          <Input 
            placeholder={isAr ? 'بحث في الرسائل...' : 'Search messages...'}
            className="h-14 bg-white/5 border-white/10 rounded-2xl ps-12 rtl:ps-4 rtl:pe-12 text-white placeholder:text-white/20 focus:border-brand-orange transition-all"
          />
        </div>
      </div>

      <div className="space-y-4 px-2">
        {messages.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className={`glass-card border-white/5 hover:border-white/10 transition-all overflow-hidden ${!msg.isRead && !msg.isAdmin ? 'border-brand-orange/20 bg-brand-orange/5' : ''}`}>
               <CardContent className="p-0">
                  <Link href={`/admin/orders/${msg.projectId}`} className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6">
                    <Avatar className="w-14 h-14 rounded-2xl border-2 border-white/5">
                       <AvatarImage src={msg.sender?.image} />
                       <AvatarFallback className="bg-gradient-brand text-white font-bold">{msg.sender?.name?.[0]}</AvatarFallback>
                    </Avatar>

                    <div className="flex-grow space-y-1 text-start">
                       <div className="flex items-center gap-3">
                          <p className="text-white font-black text-lg">{msg.sender?.name}</p>
                          {msg.isAdmin && <span className="bg-brand-orange/20 text-brand-orange text-[10px] font-black px-2 py-0.5 rounded uppercase">{isAr ? 'أدمن' : 'Admin'}</span>}
                       </div>
                       <p className="text-text-muted font-medium line-clamp-1 italic">
                          "{msg.content}"
                       </p>
                       <div className="flex items-center gap-4 text-xs text-text-muted font-bold mt-2">
                          <span className="flex items-center gap-1">
                             <FolderKanban className="w-3 h-3 text-brand-pink" />
                             {msg.project?.title}
                          </span>
                          <span className="flex items-center gap-1">
                             <Clock className="w-3 h-3 text-brand-orange" />
                             {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true, locale: isAr ? ar : enUS })}
                          </span>
                       </div>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-white/5">
                       <Button variant="ghost" className="text-brand-orange font-bold gap-2 hover:bg-brand-orange/10 rounded-xl">
                          {isAr ? 'عرض المشروع' : 'View Project'}
                          <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                       </Button>
                    </div>
                  </Link>
               </CardContent>
            </Card>
          </motion.div>
        ))}

        {messages.length === 0 && (
          <div className="text-center py-40 glass-card rounded-[3.5rem] border-2 border-dashed border-white/5 flex flex-col items-center gap-6">
             <div className="w-24 h-24 rounded-[2.5rem] bg-white/5 flex items-center justify-center">
                <Mail className="w-12 h-12 text-text-muted/30" />
             </div>
             <p className="text-xl font-bold text-text-muted">{isAr ? 'لا توجد رسائل حالياً' : 'No messages yet'}</p>
          </div>
        )}
      </div>
    </div>
  )
}
