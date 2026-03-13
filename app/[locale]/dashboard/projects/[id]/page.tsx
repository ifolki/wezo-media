
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { 
  FolderKanban, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  FileText, 
  CreditCard,
  ChevronLeft,
  Loader2,
  Send,
  Plus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Link } from '@/navigation'

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const t = useTranslations('dashboard')
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const isAr = t('welcome') === 'أهلاً بك'

  useEffect(() => {
    async function fetchProject() {
      try {
        const resp = await fetch(`/api/projects/${params.id}`)
        if (resp.ok) {
          const data = await resp.json()
          setProject(data)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchProject()
  }, [params.id])

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-brand-orange animate-spin" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="text-center py-20 space-y-6">
        <h2 className="text-2xl font-black text-white">{isAr ? 'المشروع غير موجود' : 'Project not found'}</h2>
        <Link href="/dashboard">
          <Button variant="outline" className="text-white border-white/10">{isAr ? 'العودة للرئيسية' : 'Back to Dashboard'}</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <Link href="/dashboard/projects">
            <Button variant="ghost" size="icon" className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 text-white">
              <ChevronLeft className="w-6 h-6 rtl:rotate-180" />
            </Button>
          </Link>
          <div className="text-start">
            <div className="flex items-center gap-3 mb-1">
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                project.status === 'COMPLETED' ? 'bg-green-500/10 text-green-500' :
                'bg-brand-orange/10 text-brand-orange'
              }`}>
                {project.status}
              </span>
              <span className="text-text-muted text-xs font-medium">
                {new Date(project.createdAt).toLocaleDateString(isAr ? 'ar-EG' : 'en-US')}
              </span>
            </div>
            <h1 className="text-3xl font-black text-white">{project.title}</h1>
          </div>
        </div>

        <div className="flex gap-4">
          <Button className="gradient-brand h-14 px-8 rounded-2xl font-black text-lg shadow-lg">
             {isAr ? 'تواصل معنا' : 'Contact Us'}
          </Button>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-8" dir={isAr ? 'rtl' : 'ltr'}>
        <TabsList className="bg-brand-dark/50 border border-white/5 p-1 h-auto rounded-2xl overflow-x-auto flex-nowrap w-full justify-start md:w-auto">
          <TabsTrigger value="overview" className="rounded-xl px-8 py-3 data-[state=active]:gradient-brand data-[state=active]:text-white data-[state=inactive]:text-text-muted font-bold text-lg gap-2">
            <FolderKanban className="w-5 h-5" />
            {isAr ? 'التفاصيل' : 'Overview'}
          </TabsTrigger>
          <TabsTrigger value="messages" className="rounded-xl px-8 py-3 data-[state=active]:gradient-brand data-[state=active]:text-white data-[state=inactive]:text-text-muted font-bold text-lg gap-2">
            <MessageSquare className="w-5 h-5" />
            {isAr ? 'الرسائل' : 'Messages'}
          </TabsTrigger>
          <TabsTrigger value="files" className="rounded-xl px-8 py-3 data-[state=active]:gradient-brand data-[state=active]:text-white data-[state=inactive]:text-text-muted font-bold text-lg gap-2">
            <FileText className="w-5 h-5" />
            {isAr ? 'الملفات' : 'Files'}
          </TabsTrigger>
          <TabsTrigger value="payment" className="rounded-xl px-8 py-3 data-[state=active]:gradient-brand data-[state=active]:text-white data-[state=inactive]:text-text-muted font-bold text-lg gap-2">
            <CreditCard className="w-5 h-5" />
            {isAr ? 'الدفع' : 'Payment'}
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <TabsContent value="overview">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <Card className="glass-card border-white/5 p-8 text-start">
                  <h3 className="text-xl font-bold text-white mb-6 underline decoration-brand-orange/30 underline-offset-8">
                    {isAr ? 'وصف المشروع' : 'Project Description'}
                  </h3>
                  <p className="text-text-muted leading-relaxed whitespace-pre-wrap">
                    {project.description}
                  </p>
                </Card>

                {/* Timeline */}
                <Card className="glass-card border-white/5 p-8 text-start">
                  <h3 className="text-xl font-bold text-white mb-8 underline decoration-brand-orange/30 underline-offset-8">
                    {isAr ? 'مراحل العمل' : 'Project Timeline'}
                  </h3>
                  <div className="space-y-8 relative before:absolute before:left-[17px] rtl:before:left-auto rtl:before:right-[17px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/5">
                    <div className="relative flex gap-6 px-1 items-start">
                      <div className="w-8 h-8 rounded-full gradient-brand flex items-center justify-center shrink-0 z-10">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-bold">{isAr ? 'تم استلام الطلب' : 'Request Received'}</p>
                        <p className="text-text-muted text-sm">{new Date(project.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    {/* Add more timeline items based on project.updates */}
                  </div>
                </Card>
              </div>

              <div className="space-y-8">
                <Card className="glass-card border-white/5 p-8 text-start">
                  <h3 className="text-lg font-bold text-white mb-6">{isAr ? 'معلومات الخدمة' : 'Service Info'}</h3>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl">
                      <span className="text-text-muted text-sm">{isAr ? 'الخدمة' : 'Service'}</span>
                      <span className="text-white font-bold">{project.service?.nameAr || project.serviceId}</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl">
                      <span className="text-text-muted text-sm">{isAr ? 'الميزانية' : 'Budget'}</span>
                      <span className="text-brand-orange font-black">{project.budget ? `$${project.budget}` : (isAr ? 'لم يحدد بعد' : 'Not set')}</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl">
                      <span className="text-text-muted text-sm">{isAr ? 'الأولوية' : 'Priority'}</span>
                      <span className="text-white font-bold">{project.priority}</span>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="messages">
             <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="h-[600px] flex flex-col glass-card border-white/5 overflow-hidden">
                <div className="flex-grow p-6 overflow-y-auto space-y-6 flex flex-col">
                   <div className="bg-white/5 p-8 rounded-3xl text-center text-text-muted max-w-sm mx-auto mt-20 border border-dashed border-white/10">
                      <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-20" />
                      <p className="font-medium">{isAr ? 'سجل المحادثات سيظهر هنا قريباً.' : 'Chat history will appear here soon.'}</p>
                   </div>
                </div>
                <div className="p-6 bg-brand-dark/50 border-t border-white/5 flex gap-4">
                   <div className="flex-grow relative">
                      <input className="w-full h-14 bg-brand-card/50 border-white/5 rounded-2xl px-6 outline-none focus:border-brand-orange text-white" placeholder={isAr ? 'اكتب رسالتك...' : 'Type your message...'} />
                   </div>
                   <Button className="w-14 h-14 rounded-2xl gradient-brand flex items-center justify-center">
                      <Send className="w-5 h-5 text-white" />
                   </Button>
                </div>
             </motion.div>
          </TabsContent>

          <TabsContent value="files">
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="glass-card border-white/5 border-dashed p-8 flex flex-col items-center justify-center gap-4 text-center group cursor-pointer hover:border-brand-orange/30 transition-all">
                   <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Plus className="w-8 h-8 text-brand-orange" />
                   </div>
                   <div className="space-y-1">
                      <p className="text-white font-bold">{isAr ? 'رفع ملف' : 'Upload File'}</p>
                      <p className="text-text-muted text-xs">Max 10MB</p>
                   </div>
                </Card>
             </motion.div>
          </TabsContent>

          <TabsContent value="payment">
             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-12 flex flex-col items-center text-center space-y-8">
                <div className="w-20 h-20 rounded-full bg-brand-orange/10 flex items-center justify-center">
                   <CreditCard className="w-10 h-10 text-brand-orange" />
                </div>
                <div className="space-y-3">
                   <h3 className="text-2xl font-black text-white">{isAr ? 'بانتظار مراجعة الإدارة' : 'Awaiting Review'}</h3>
                   <p className="text-text-muted max-w-sm">
                      {isAr ? 'سيتم تفعيل روابط الدفع وتفاصيل الفاتورة بعد مراجعة الإدارة لطلبك وتحديد السعر.' : 'Payment links and invoice details will be enabled after our team reviews your request.'}
                   </p>
                </div>
                <Button disabled className="h-14 px-10 rounded-2xl bg-white/5 border border-white/10 text-text-muted font-bold">
                   {isAr ? 'ادفع الآن' : 'Pay Now'}
                </Button>
             </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </div>
  )
}
