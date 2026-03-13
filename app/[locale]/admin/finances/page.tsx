
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { 
  DollarSign, 
  Search, 
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  User,
  FolderKanban,
  Loader2,
  FileText,
  Download
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export default function AdminFinancesPage() {
  const t = useTranslations('dashboard')
  const [payments, setPayments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const isAr = t('welcome') === 'أهلاً بك'

  useEffect(() => {
    async function fetchPayments() {
      try {
        const resp = await fetch('/api/admin/payments')
        if (resp.ok) {
          const data = await resp.json()
          setPayments(data)
        }
      } catch (e) {
        console.error(e)
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

  const totalRevenue = payments
    .filter(p => p.status === 'PAID')
    .reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="space-y-8 pb-10 text-start">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white">{t('admin.finances')}</h1>
          <p className="text-text-muted mt-2">
            {isAr ? 'إجمالي المداخيل:' : 'Total Revenue:'} 
            <span className="text-brand-orange font-black ml-2">${totalRevenue.toLocaleString()}</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="h-14 px-6 rounded-xl border-white/5 bg-white/5 gap-2 font-bold text-white">
            <Download className="w-5 h-5" />
            {isAr ? 'تصدير التقرير' : 'Export Report'}
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-start border-separate border-spacing-y-4">
          <thead>
            <tr className="text-text-muted text-[10px] uppercase tracking-widest font-black">
              <th className="px-6 py-4">{isAr ? 'العميل' : 'Client'}</th>
              <th className="px-6 py-4">{isAr ? 'المشروع' : 'Project'}</th>
              <th className="px-6 py-4">{isAr ? 'المبلغ' : 'Amount'}</th>
              <th className="px-6 py-4">{isAr ? 'الحالة' : 'Status'}</th>
              <th className="px-6 py-4">{isAr ? 'التاريخ' : 'Date'}</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment, i) => (
                <motion.tr
                  key={payment.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white/[0.02] hover:bg-white/[0.05] transition-colors rounded-2xl group"
                >
                  <td className="px-6 py-6 first:rounded-l-2xl rtl:first:rounded-r-2xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-brand-orange">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-white font-bold">{payment.client?.name}</p>
                        <p className="text-text-muted text-xs">{payment.client?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 font-medium text-white/80">
                    <div className="flex items-center gap-3">
                      <FolderKanban className="w-4 h-4 text-white/10" />
                      {payment.project?.title}
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <p className="text-xl font-black text-white">${payment.amount}</p>
                  </td>
                  <td className="px-6 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      payment.status === 'PAID' ? 'bg-green-500/10 text-green-500' :
                      payment.status === 'FAILED' ? 'bg-red-500/10 text-red-500' :
                      'bg-white/5 text-text-muted'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-text-muted text-sm">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-6 last:rounded-r-2xl rtl:last:rounded-l-2xl text-end">
                    <Button variant="ghost" size="icon" className="text-white/20 hover:text-white transition-all">
                      <FileText className="w-5 h-5" />
                    </Button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-20 text-text-muted">{isAr ? 'لا توجد دفعات.' : 'No payments found.'}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
