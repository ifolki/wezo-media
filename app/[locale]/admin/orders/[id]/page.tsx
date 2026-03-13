
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { 
  FolderKanban, 
  User, 
  Settings, 
  CreditCard,
  ChevronLeft,
  Loader2,
  Save,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Link } from '@/navigation'
import { toast } from 'sonner'

export default function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  const t = useTranslations('dashboard')
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const isAr = t('welcome') === 'أهلاً بك'

  const [formData, setFormData] = useState<{
    status: string;
    priority: string;
    budget: number;
    paymentEnabled: boolean;
  }>({
    status: '',
    priority: '',
    budget: 0,
    paymentEnabled: false
  })

  useEffect(() => {
    async function fetchProject() {
      try {
        const resp = await fetch(`/api/admin/projects/${params.id}`)
        if (resp.ok) {
          const data = await resp.json()
          setProject(data)
          setFormData({
            status: data.status || '',
            priority: data.priority || '',
            budget: data.budget || 0,
            paymentEnabled: data.paymentEnabled || false
          })
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchProject()
  }, [params.id])

  const handleSave = async () => {
    setSaving(true)
    try {
      const resp = await fetch(`/api/admin/projects/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (resp.ok) {
        toast.success(isAr ? 'تم تحديث المشروع بنجاح' : 'Project updated successfully')
      } else {
        throw new Error()
      }
    } catch (e) {
      toast.error(isAr ? 'حدث خطأ' : 'An error occurred')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-brand-orange animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-10 text-start">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <Link href="/admin/orders">
            <Button variant="ghost" size="icon" className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 text-white">
              <ChevronLeft className="w-6 h-6 rtl:rotate-180" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-brand-orange text-xs font-black uppercase tracking-wider">#{project.id.slice(-6)}</span>
              <span className="text-text-muted text-xs font-medium">{new Date(project.createdAt).toLocaleString()}</span>
            </div>
            <h1 className="text-3xl font-black text-white">{project.title}</h1>
          </div>
        </div>

        <Button 
          onClick={handleSave} 
          disabled={saving}
          className="gradient-brand h-14 px-8 rounded-2xl font-black text-lg gap-2 shadow-lg"
        >
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {isAr ? 'حفظ التغييرات' : 'Save Changes'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           {/* Client Card */}
           <Card className="glass-card border-white/5 p-8 flex items-center justify-between">
              <div className="flex items-center gap-6">
                 <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-brand-orange text-3xl font-black">
                    {project.client.name.charAt(0)}
                 </div>
                 <div>
                    <h3 className="text-xl font-bold text-white">{project.client.name}</h3>
                    <p className="text-text-muted">{project.client.email}</p>
                 </div>
              </div>
              <Button variant="outline" className="text-white border-white/10 h-12 rounded-xl">
                 {isAr ? 'عرض العميل' : 'View Client'}
              </Button>
           </Card>

           {/* Description */}
           <Card className="glass-card border-white/5 p-8">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                 <FolderKanban className="w-5 h-5 text-brand-orange" />
                 {isAr ? 'وصف المشروع' : 'Project Description'}
              </h3>
              <p className="text-text-muted leading-relaxed whitespace-pre-wrap italic bg-white/5 p-6 rounded-2xl border border-white/5">
                 {project.description}
              </p>
           </Card>
        </div>

        <div className="space-y-8">
           {/* Settings Card */}
           <Card className="glass-card border-white/5 p-8 space-y-8">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/5 pb-4">
                 <Settings className="w-5 h-5 text-brand-orange" />
                 {isAr ? 'إعدادات المشروع' : 'Project Settings'}
              </h3>
              
              <div className="space-y-6">
                 <div className="space-y-3">
                    <Label className="text-text-muted font-bold text-xs uppercase tracking-widest">{isAr ? 'الحالة' : 'Status'}</Label>
                    <Select value={formData.status || ''} onValueChange={(val) => setFormData({...formData, status: val || ''})}>
                       <SelectTrigger className="h-12 bg-white/5 border-white/5 rounded-xl text-white">
                          <SelectValue />
                       </SelectTrigger>
                       <SelectContent className="bg-brand-card border-white/10 text-white">
                          <SelectItem value="PENDING">{isAr ? 'في الانتظار' : 'Pending'}</SelectItem>
                          <SelectItem value="IN_PROGRESS">{isAr ? 'قيد التنفيذ' : 'In Progress'}</SelectItem>
                          <SelectItem value="REVIEW">{isAr ? 'مراجعة' : 'Review'}</SelectItem>
                          <SelectItem value="COMPLETED">{isAr ? 'مكتمل' : 'Completed'}</SelectItem>
                          <SelectItem value="CANCELLED">{isAr ? 'ملغي' : 'Cancelled'}</SelectItem>
                       </SelectContent>
                    </Select>
                 </div>

                 <div className="space-y-3">
                    <Label className="text-text-muted font-bold text-xs uppercase tracking-widest">{isAr ? 'الأولوية' : 'Priority'}</Label>
                    <Select value={formData.priority || ''} onValueChange={(val) => setFormData({...formData, priority: val || ''})}>
                       <SelectTrigger className="h-12 bg-white/5 border-white/5 rounded-xl text-white">
                          <SelectValue />
                       </SelectTrigger>
                       <SelectContent className="bg-brand-card border-white/10 text-white">
                          <SelectItem value="LOW">Low</SelectItem>
                          <SelectItem value="MEDIUM">Medium</SelectItem>
                          <SelectItem value="HIGH">High</SelectItem>
                          <SelectItem value="URGENT">Urgent</SelectItem>
                       </SelectContent>
                    </Select>
                 </div>

                 <div className="space-y-3">
                    <Label className="text-text-muted font-bold text-xs uppercase tracking-widest">{isAr ? 'الميزانية ($)' : 'Budget ($)'}</Label>
                    <Input 
                       type="number" 
                       value={formData.budget} 
                       onChange={(e) => setFormData({...formData, budget: parseFloat(e.target.value)})}
                       className="h-12 bg-white/5 border-white/5 rounded-xl text-white font-black"
                    />
                 </div>

                 <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="space-y-0.5">
                       <Label className="text-white font-bold">{isAr ? 'تفعيل الدفع' : 'Enable Payment'}</Label>
                       <p className="text-text-muted text-[10px]">{isAr ? 'السماح للعميل بالدفع' : 'Allow client to pay'}</p>
                    </div>
                    <Switch 
                       checked={formData.paymentEnabled} 
                       onCheckedChange={(val) => setFormData({...formData, paymentEnabled: val})} 
                    />
                 </div>
              </div>
           </Card>
        </div>
      </div>
    </div>
  )
}
