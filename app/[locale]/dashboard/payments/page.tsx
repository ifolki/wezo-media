'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { 
  CreditCard, 
  Search, 
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  FolderKanban,
  FileText,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function ClientPaymentsPage() {
  const t = useTranslations('dashboard')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const [payments, setPayments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPayments() {
      try {
        const resp = await fetch('/api/payments/my')
        if (resp.ok) {
          const data = await resp.json()
          setPayments(data)
        } else {
          setPayments([])
        }
      } catch (e) {
        console.error(e)
        setPayments([])
      } finally {
        setLoading(false)
      }
    }
    fetchPayments()
  }, [])

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-brand-orange animate-spin" />
      </div>
    )
  }

  const totalSpent = payments
    .filter(p => p.status === 'PAID')
    .reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="space-y-8 pb-10 text-start">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 px-2">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-white">{isAr ? 'المدفوعات' : 'Payments'}</h1>
          <p className="text-text-muted font-medium">
            {isAr ? 'متابعة سجل فواتيرك ومدفوعات المشاريع' : 'Track your invoice history and project payments'}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Card className="glass-card border-white/5 bg-gradient-to-br from-brand-orange/10 via-white/5 to-transparent pr-12 pl-6 py-4 rounded-3xl w-full sm:w-auto relative overflow-hidden">
            <div className="absolute -right-4 -top-8 w-24 h-24 bg-brand-orange/20 rounded-full blur-2xl" />
            <div className="relative z-10">
              <p className="text-text-muted text-[10px] font-black uppercase tracking-widest">{isAr ? 'إجمالي المدفوعات' : 'Total Spent'}</p>
              <div className="flex items-end gap-2 mt-1">
                <p className="text-4xl font-black text-white">${totalSpent.toLocaleString()}</p>
                <div className="flex items-center text-green-400 bg-green-500/10 px-2 py-0.5 rounded text-xs font-bold mb-1">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="px-2">
        <Card className="glass-card border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start">
            <thead>
              <tr className="text-text-muted text-[10px] uppercase tracking-widest font-black border-b border-white/5 bg-white/[0.02]">
                <th className="px-8 py-5 text-start whitespace-nowrap">{isAr ? 'رقم الفاتورة' : 'Invoice ID'}</th>
                <th className="px-8 py-5 text-start whitespace-nowrap">{isAr ? 'المشروع' : 'Project'}</th>
                <th className="px-8 py-5 text-start whitespace-nowrap">{isAr ? 'المبلغ' : 'Amount'}</th>
                <th className="px-8 py-5 text-start whitespace-nowrap">{isAr ? 'الحالة' : 'Status'}</th>
                <th className="px-8 py-5 text-start whitespace-nowrap">{isAr ? 'التاريخ' : 'Date'}</th>
                <th className="px-8 py-5 text-end whitespace-nowrap"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {payments.length > 0 ? (
                payments.map((payment, i) => (
                  <motion.tr
                    key={payment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4 min-w-[150px]">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-orange group-hover:bg-brand-orange/10 transition-colors">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-white font-bold group-hover:text-brand-orange transition-colors">#INV-{payment.id.substring(0,6).toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col justify-center min-w-[200px]">
                        <p className="text-white font-bold leading-tight line-clamp-1 group-hover:text-brand-pink transition-colors">{payment.project?.title || 'N/A'}</p>
                        <div className="flex items-center gap-1.5 text-text-muted text-xs mt-1">
                          <FolderKanban className="w-3 h-3" />
                          <span>{isAr ? 'مشروع' : 'Project'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-text-muted" />
                        <p className="text-xl font-black text-white">${payment.amount}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <Badge className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${
                        payment.status === 'PAID' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                        payment.status === 'FAILED' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                        'bg-white/5 text-text-muted border-white/10'
                      }`}>
                        {payment.status === 'PAID' && <CheckCircle2 className="w-3 h-3 inline-block mx-1" />}
                        {payment.status === 'FAILED' && <XCircle className="w-3 h-3 inline-block mx-1" />}
                        {payment.status === 'PENDING' && <Clock className="w-3 h-3 inline-block mx-1" />}
                        {payment.status}
                      </Badge>
                    </td>
                    <td className="px-8 py-6 text-text-muted text-sm whitespace-nowrap font-medium">
                      {new Date(payment.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-8 py-6 text-end">
                      <Button variant="ghost" size="icon" className="w-12 h-12 rounded-xl text-text-muted hover:text-brand-orange hover:bg-brand-orange/10 transition-all ml-auto rtl:ml-0 rtl:mr-auto">
                        <ArrowUpRight className="w-5 h-5 rtl:-scale-x-100" />
                      </Button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-20 text-text-muted">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">
                        <CreditCard className="w-8 h-8 text-text-muted/30" />
                      </div>
                      <p className="text-lg font-bold">{isAr ? 'لا توجد دفعات حالياً.' : 'No payments found.'}</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        </Card>
      </div>
    </div>
  )
}
