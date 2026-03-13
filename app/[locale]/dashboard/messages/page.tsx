'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { 
  MessageSquare, 
  Search, 
  Send,
  User,
  MoreVertical
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function MessagesPage() {
  const t = useTranslations('dashboard')
  const isAr = t('welcome') === 'أهلاً بك'

  return (
    <div className="h-[calc(100vh-12rem)] flex gap-6">
      {/* Sidebar List */}
      <div className="w-96 hidden lg:flex flex-col gap-6">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-brand-orange transition-colors rtl:left-auto rtl:right-4" />
          <Input 
            placeholder={isAr ? 'ابحث عن محادثة...' : 'Search messages...'} 
            className="h-12 bg-white/5 border-white/5 ps-10 rtl:ps-4 rtl:pe-10 rounded-xl"
          />
        </div>

        <Card className="flex-grow glass-card border-white/5 overflow-hidden flex flex-col pt-4">
           <div className="px-6 pb-4 border-b border-white/5">
              <h3 className="text-white font-black">{isAr ? 'المحادثات' : 'Conversations'}</h3>
           </div>
           
           <div className="flex-grow flex flex-col items-center justify-center p-8 text-center space-y-4 opacity-50">
              <MessageSquare className="w-12 h-12 text-text-muted" />
              <p className="text-sm font-medium text-text-muted">
                {isAr ? 'لا توجد محادثات نشطة حالياً' : 'No active conversations yet'}
              </p>
           </div>
        </Card>
      </div>

      {/* Main Chat Area */}
      <Card className="flex-grow glass-card border-white/5 flex flex-col relative overflow-hidden">
         {/* Chat Empty State */}
         <div className="flex-grow flex flex-col items-center justify-center space-y-6">
            <div className="w-24 h-24 rounded-[2.5rem] gradient-brand/10 border border-brand-orange/20 flex items-center justify-center animate-float">
               <MessageSquare className="w-12 h-12 text-brand-orange" />
            </div>
            <div className="text-center space-y-2">
               <h3 className="text-2xl font-black text-white">{isAr ? 'صندوق الرسائل' : 'Messages Box'}</h3>
               <p className="text-text-muted max-w-xs">{isAr ? 'اختر محادثة من القائمة أو اطلب خدمة جديدة لبدء التواصل.' : 'Choose a conversation from the list or request a new service to start communicating.'}</p>
            </div>
         </div>

         {/* Input Area (Disabled in empty state) */}
         <div className="p-6 border-t border-white/5 bg-white/[0.01]">
            <div className="relative flex items-center gap-4">
               <Input 
                  disabled
                  placeholder={isAr ? 'اكتب رسالتك هنا...' : 'Type your message...'} 
                  className="h-14 bg-white/5 border-white/5 rounded-2xl"
               />
               <Button disabled className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 text-white p-0">
                  <Send className="w-6 h-6 rtl:rotate-180" />
               </Button>
            </div>
         </div>
      </Card>
    </div>
  )
}
