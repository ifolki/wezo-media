'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocale } from 'next-intl'
import { 
  ClipboardList, 
  RotateCw, 
  ExternalLink, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  MapPin, 
  DollarSign, 
  Calendar,
  Briefcase,
  User,
  Info,
  Phone,
  Settings,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export default function AdminLeadsPage() {
  const locale = useLocale()
  const isAr = locale === 'ar'

  const [leads, setLeads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'SYNCED' | 'FAILED'>('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [retryingId, setRetryingId] = useState<string | null>(null)
  const [selectedLead, setSelectedLead] = useState<any | null>(null)

  useEffect(() => {
    fetchLeads()
  }, [filter])

  async function fetchLeads() {
    setLoading(true)
    try {
      const resp = await fetch(`/api/admin/leads?notionStatus=${filter}`)
      if (resp.ok) {
        const data = await resp.json()
        setLeads(data)
      } else {
        toast.error(isAr ? 'فشل في جلب طلبات عروض الأسعار' : 'Failed to fetch leads')
      }
    } catch (e) {
      console.error(e)
      toast.error('Error fetching data')
    } finally {
      setLoading(false)
    }
  }

  // Handle manual retry trigger
  const handleRetry = async (leadId: string, e: React.MouseEvent) => {
    e.stopPropagation() // Don't trigger lead detail modal open
    setRetryingId(leadId)
    toast.loading(isAr ? 'جاري إعادة محاولة مزامنة الطلب...' : 'Retrying lead sync to Notion...')
    
    try {
      const resp = await fetch('/api/admin/leads/retry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId })
      })

      toast.dismiss()
      if (resp.ok) {
        toast.success(isAr ? 'تمت المزامنة مع Notion بنجاح!' : 'Lead synced successfully to Notion!')
        fetchLeads()
      } else {
        const data = await resp.json()
        toast.error(data.error || (isAr ? 'فشلت المزامنة مجدداً' : 'Sync failed again'))
        fetchLeads()
      }
    } catch (err) {
      toast.dismiss()
      toast.error('Connection error')
    } finally {
      setRetryingId(null)
    }
  }

  // Filtered and searched leads
  const searchedLeads = leads.filter(lead => {
    const term = searchQuery.toLowerCase()
    const name = lead.name ? String(lead.name).toLowerCase() : ''
    const businessName = lead.businessName ? String(lead.businessName).toLowerCase() : ''
    const city = lead.city ? String(lead.city).toLowerCase() : ''
    const phone = lead.phone ? String(lead.phone) : ''
    const email = lead.email ? String(lead.email).toLowerCase() : ''
    
    return (
      name.includes(term) ||
      businessName.includes(term) ||
      city.includes(term) ||
      phone.includes(term) ||
      email.includes(term)
    )
  })

  // Leads count stats
  const totalCount = leads.length
  const syncedCount = leads.filter(l => l.notionSyncStatus === 'SYNCED').length
  const failedCount = leads.filter(l => l.notionSyncStatus === 'FAILED').length
  const pendingCount = leads.filter(l => l.notionSyncStatus === 'PENDING').length

  return (
    <div className="space-y-8 pb-10 text-start">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-white font-syne flex items-center gap-3">
            <ClipboardList className="w-8 h-8 text-brand-orange" />
            {isAr ? 'الطلبات الواردة وعروض الأسعار' : 'Leads & Quote Requests'}
          </h1>
          <p className="text-text-muted text-sm md:text-base">
            {isAr 
              ? 'متابعة وإدارة طلبات عروض الأسعار الواردة من نموذج الموقع ومزامنتها مع Notion.' 
              : 'Monitor, manage, and sync quote inquiries from the website form to Notion.'}
          </p>
        </div>
      </div>

      {/* Notion Status Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
          <div className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-text-muted text-xs font-bold uppercase tracking-wider">{isAr ? 'إجمالي الطلبات' : 'Total Leads'}</p>
              <p className="text-3xl font-black text-white">{totalCount}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
              <ClipboardList className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card className="glass-card border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
          <div className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-text-muted text-xs font-bold uppercase tracking-wider">{isAr ? 'تمت المزامنة' : 'Synced'}</p>
              <p className="text-3xl font-black text-white">{syncedCount}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card className="glass-card border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
          <div className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-text-muted text-xs font-bold uppercase tracking-wider">{isAr ? 'فشلت المزامنة' : 'Sync Failed'}</p>
              <p className="text-3xl font-black text-white">{failedCount}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400">
              <AlertCircle className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card className="glass-card border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
          <div className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-text-muted text-xs font-bold uppercase tracking-wider">{isAr ? 'بانتظار المزامنة' : 'Pending Sync'}</p>
              <p className="text-3xl font-black text-white">{pendingCount}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-brand-card/30 p-4 rounded-2xl border border-white/5">
        <div className="relative w-full md:w-80">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isAr ? 'بحث بالاسم، الشركة، الهاتف...' : 'Search by name, company, phone...'}
            className="w-full h-11 bg-brand-dark/50 border-white/5 rounded-xl pl-4 pr-10 text-white placeholder-text-muted"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
          {(['ALL', 'SYNCED', 'FAILED', 'PENDING'] as const).map((status) => {
            const isActive = filter === status
            return (
              <Button
                key={status}
                onClick={() => setFilter(status)}
                variant="ghost"
                className={`h-11 px-6 rounded-xl font-bold transition-all ${
                  isActive 
                    ? 'gradient-brand text-white' 
                    : 'bg-white/5 text-text-muted hover:bg-white/10 hover:text-white'
                }`}
              >
                {status === 'ALL' && (isAr ? 'الكل' : 'All')}
                {status === 'SYNCED' && (isAr ? 'تمت المزامنة' : 'Synced')}
                {status === 'FAILED' && (isAr ? 'فشلت المزامنة' : 'Failed')}
                {status === 'PENDING' && (isAr ? 'في الانتظار' : 'Pending')}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Leads Table Container */}
      <div className="glass-card border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4">
            <RotateCw className="w-10 h-10 text-brand-orange animate-spin" />
            <p className="text-text-muted text-sm">{isAr ? 'جاري تحميل الطلبات...' : 'Loading leads...'}</p>
          </div>
        ) : searchedLeads.length === 0 ? (
          <div className="py-20 text-center text-text-muted space-y-2">
            <ClipboardList className="w-12 h-12 text-white/10 mx-auto" />
            <p className="font-bold text-lg text-white">{isAr ? 'لا توجد طلبات واردة' : 'No leads found'}</p>
            <p className="text-sm">{isAr ? 'لم نجد أي طلبات مطابقة للمعايير المحددة.' : 'We could not find any leads matching the criteria.'}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.01] text-text-muted text-xs uppercase tracking-wider font-bold">
                  <th className="py-4 px-6 text-start">{isAr ? 'العميل' : 'Client'}</th>
                  <th className="py-4 px-6 text-start">{isAr ? 'الشركة والخدمة' : 'Business & Service'}</th>
                  <th className="py-4 px-6 text-start">{isAr ? 'الميزانية والموقع' : 'Budget & City'}</th>
                  <th className="py-4 px-6 text-start">{isAr ? 'مزامنة Notion' : 'Notion Sync'}</th>
                  <th className="py-4 px-6 text-center">{isAr ? 'إجراءات' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {searchedLeads.map((lead) => {
                  const syncStatus = lead.notionSyncStatus
                  const serviceName = lead.requestedService 
                    ? (locale === 'ar' ? lead.requestedService.nameAr : locale === 'fr' ? lead.requestedService.nameFr || lead.requestedService.nameEn : lead.requestedService.nameEn)
                    : (isAr ? 'غير محدد' : 'Not selected')

                  return (
                    <tr 
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="hover:bg-white/[0.01] transition-colors cursor-pointer group text-start"
                    >
                      {/* Name & Contact */}
                      <td className="py-5 px-6">
                        <div className="space-y-1">
                          <p className="font-bold text-white group-hover:text-brand-orange transition-colors">{lead.name}</p>
                          <div className="flex flex-col text-xs text-text-muted space-y-0.5">
                            <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {lead.phone}</span>
                            {lead.email && <span className="truncate max-w-[180px]">{lead.email}</span>}
                          </div>
                        </div>
                      </td>

                      {/* Business & Service */}
                      <td className="py-5 px-6">
                        <div className="space-y-1">
                          <p className="font-bold text-white text-sm">{lead.businessName}</p>
                          <p className="text-text-muted text-xs flex items-center gap-1.5">
                            <Briefcase className="w-3.5 h-3.5 text-brand-orange/70" />
                            {serviceName}
                          </p>
                        </div>
                      </td>

                      {/* City & Budget */}
                      <td className="py-5 px-6 text-sm">
                        <div className="space-y-1">
                          <p className="text-white flex items-center gap-1.5 text-xs font-semibold">
                            <MapPin className="w-3.5 h-3.5 text-blue-400" />
                            {lead.city}
                          </p>
                          <p className="text-text-muted text-xs font-bold">
                            {lead.budgetMin} - {lead.budgetMax} MAD
                          </p>
                        </div>
                      </td>

                      {/* Notion Sync Status Badge */}
                      <td className="py-5 px-6">
                        <div className="space-y-1.5">
                          {syncStatus === 'SYNCED' && (
                            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-2.5 py-1 rounded-lg flex items-center gap-1.5 w-fit">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              {isAr ? 'مكتملة' : 'Synced'}
                            </Badge>
                          )}
                          {syncStatus === 'FAILED' && (
                            <Badge className="bg-red-500/10 text-red-400 border-red-500/20 px-2.5 py-1 rounded-lg flex items-center gap-1.5 w-fit">
                              <AlertCircle className="w-3.5 h-3.5" />
                              {isAr ? 'فشلت' : 'Failed'}
                            </Badge>
                          )}
                          {syncStatus === 'PENDING' && (
                            <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 px-2.5 py-1 rounded-lg flex items-center gap-1.5 w-fit">
                              <Clock className="w-3.5 h-3.5" />
                              {isAr ? 'قيد الانتظار' : 'Pending'}
                            </Badge>
                          )}
                          
                          {lead.notionSyncedAt && (
                            <p className="text-[10px] text-text-muted">
                              {new Date(lead.notionSyncedAt).toLocaleString(locale)}
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-5 px-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-2">
                          {lead.notionPageId && (
                            <Button
                              onClick={() => window.open(`https://notion.so/${lead.notionPageId.replace(/-/g, '')}`, '_blank')}
                              size="icon"
                              variant="ghost"
                              className="w-9 h-9 rounded-xl hover:bg-white/5 text-text-muted hover:text-white"
                              title={isAr ? 'فتح في Notion' : 'Open in Notion'}
                            >
                              <ExternalLink className="w-4.5 h-4.5" />
                            </Button>
                          )}

                          {syncStatus === 'FAILED' && (
                            <Button
                              onClick={(e) => handleRetry(lead.id, e)}
                              disabled={retryingId === lead.id}
                              size="icon"
                              variant="ghost"
                              className="w-9 h-9 rounded-xl hover:bg-white/5 text-text-muted hover:text-white"
                              title={isAr ? 'إعادة المحاولة' : 'Retry Sync'}
                            >
                              <RotateCw className={`w-4.5 h-4.5 ${retryingId === lead.id ? 'animate-spin text-brand-orange' : ''}`} />
                            </Button>
                          )}

                          {lead.notionSyncError && (
                            <div className="relative group/tooltip">
                              <Info className="w-4.5 h-4.5 text-red-400/80 cursor-help" />
                              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover/tooltip:block bg-brand-dark border border-white/10 p-3 rounded-xl text-xs text-red-400 w-64 shadow-2xl z-50">
                                <p className="font-bold mb-1">{isAr ? 'خطأ المزامنة:' : 'Sync Error:'}</p>
                                <p className="line-clamp-4">{lead.notionSyncError}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Slide-Over Panel for Lead Details */}
      <AnimatePresence>
        {selectedLead && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLead(null)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />
            {/* Panel */}
            <motion.div
              initial={{ x: isAr ? -450 : 450 }}
              animate={{ x: 0 }}
              exit={{ x: isAr ? -450 : 450 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed inset-y-0 ${isAr ? 'left-0' : 'right-0'} w-full max-w-md bg-brand-card border-l border-white/5 z-50 p-8 shadow-2xl overflow-y-auto flex flex-col justify-between`}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <h3 className="text-xl font-black text-white font-syne">{isAr ? 'تفاصيل الطلب' : 'Lead Details'}</h3>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedLead(null)} className="rounded-xl hover:bg-white/5">
                    <X className="w-6 h-6 text-white" />
                  </Button>
                </div>

                <div className="space-y-4 text-start">
                  <div>
                    <label className="text-xs text-text-muted font-bold block mb-0.5">{isAr ? 'الاسم الكامل' : 'Full Name'}</label>
                    <p className="text-white font-bold text-base flex items-center gap-2">
                      <User className="w-4 h-4 text-brand-orange" />
                      {selectedLead.name}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs text-text-muted font-bold block mb-0.5">{isAr ? 'الشركة / النشاط' : 'Company / Industry'}</label>
                    <p className="text-white font-bold text-base">{selectedLead.businessName}</p>
                    <p className="text-text-muted text-xs font-semibold">{selectedLead.industry}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-text-muted font-bold block mb-0.5">{isAr ? 'المدينة' : 'City'}</label>
                      <p className="text-white font-bold text-sm flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-blue-400" />
                        {selectedLead.city}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-text-muted font-bold block mb-0.5">{isAr ? 'الخدمة المطلوبة' : 'Service'}</label>
                      <p className="text-white font-bold text-sm truncate">
                        {selectedLead.requestedService 
                          ? (locale === 'ar' ? selectedLead.requestedService.nameAr : locale === 'fr' ? selectedLead.requestedService.nameFr || selectedLead.requestedService.nameEn : selectedLead.requestedService.nameEn)
                          : 'غير محدد'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-text-muted font-bold block mb-0.5">{isAr ? 'الميزانية' : 'Budget'}</label>
                      <p className="text-emerald-400 font-black text-sm flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5" />
                        {selectedLead.budgetMin} - {selectedLead.budgetMax} MAD
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-text-muted font-bold block mb-0.5">{isAr ? 'تاريخ الإرسال' : 'Sent Date'}</label>
                      <p className="text-white font-semibold text-xs flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-purple-400" />
                        {new Date(selectedLead.createdAt).toLocaleDateString(locale)}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-4">
                    <label className="text-xs text-text-muted font-bold block mb-1">{isAr ? 'أهداف المشروع وتفاصيله' : 'Project Objectives & Details'}</label>
                    <p className="text-white text-sm bg-brand-dark/50 p-4 rounded-xl leading-relaxed whitespace-pre-wrap border border-white/5">
                      {selectedLead.objective}
                    </p>
                  </div>

                  {/* UTM Trackers */}
                  <div className="border-t border-white/5 pt-4 space-y-2">
                    <label className="text-xs text-text-muted font-bold block">{isAr ? 'حملات التتبع والمصدر (UTM Parameters)' : 'UTM Tracking Information'}</label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-white/5 p-2 rounded-lg">
                        <span className="text-text-muted block text-[10px]">Source</span>
                        <span className="text-white font-bold">{selectedLead.utmSource || 'N/A'}</span>
                      </div>
                      <div className="bg-white/5 p-2 rounded-lg">
                        <span className="text-text-muted block text-[10px]">Campaign</span>
                        <span className="text-white font-bold">{selectedLead.utmCampaign || 'N/A'}</span>
                      </div>
                      <div className="bg-white/5 p-2 rounded-lg">
                        <span className="text-text-muted block text-[10px]">Medium</span>
                        <span className="text-white font-bold">{selectedLead.utmMedium || 'N/A'}</span>
                      </div>
                      <div className="bg-white/5 p-2 rounded-lg">
                        <span className="text-text-muted block text-[10px]">Locale</span>
                        <span className="text-white font-bold uppercase">{selectedLead.locale || 'AR'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {selectedLead.notionSyncStatus === 'FAILED' && (
                <Button
                  onClick={(e) => {
                    handleRetry(selectedLead.id, e)
                    setSelectedLead(null)
                  }}
                  disabled={retryingId === selectedLead.id}
                  className="w-full h-12 gradient-brand rounded-2xl font-bold mt-6 flex items-center justify-center gap-2"
                >
                  <RotateCw className={`w-4 h-4 ${retryingId === selectedLead.id ? 'animate-spin' : ''}`} />
                  {isAr ? 'إعادة محاولة المزامنة' : 'Retry Sync to Notion'}
                </Button>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
