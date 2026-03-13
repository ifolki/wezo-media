
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { 
  Users, 
  Search, 
  Mail,
  Shield,
  MoreVertical,
  Calendar,
  FolderKanban,
  Loader2,
  UserPlus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export default function AdminUsersPage() {
  const t = useTranslations('dashboard')
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const isAr = t('welcome') === 'أهلاً بك'

  useEffect(() => {
    async function fetchUsers() {
      try {
        const resp = await fetch('/api/admin/users')
        if (resp.ok) {
          const data = await resp.json()
          setUsers(data)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-brand-orange animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-10 text-start">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h1 className="text-3xl font-black text-white">{t('admin.users')}</h1>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <Input 
              placeholder={isAr ? 'البحث عن مستخدم...' : 'Search users...'} 
              className="h-12 bg-white/5 border-white/5 ps-12 rounded-xl focus:border-brand-orange/50"
            />
          </div>
          <Button className="h-12 px-6 rounded-xl gradient-brand font-bold gap-2">
            <UserPlus className="w-5 h-5" />
            <span className="hidden sm:inline">{isAr ? 'إضافة مستخدم' : 'Add User'}</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {users.length > 0 ? (
          users.map((user, i) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="glass-card border-white/5 p-6 hover:border-brand-orange/20 transition-all group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-orange/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-brand-orange text-2xl font-black">
                    {user.name?.charAt(0) || 'U'}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    user.role === 'SUPER_ADMIN' ? 'bg-brand-orange/10 text-brand-orange' :
                    user.role === 'ADMIN' ? 'bg-purple-500/10 text-purple-400' :
                    'bg-white/5 text-text-muted'
                  }`}>
                    {user.role}
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white leading-tight">{user.name}</h3>
                    <p className="text-text-muted flex items-center gap-2 text-sm mt-1">
                      <Mail className="w-3.5 h-3.5" />
                      {user.email}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                    <div className="space-y-1">
                      <p className="text-text-muted text-[10px] uppercase tracking-widest font-black">{isAr ? 'المشاريع' : 'Projects'}</p>
                      <p className="text-white font-bold flex items-center gap-2">
                        <FolderKanban className="w-4 h-4 text-brand-orange" />
                        {user._count?.projects || 0}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-text-muted text-[10px] uppercase tracking-widest font-black">{isAr ? 'انضم' : 'Joined'}</p>
                      <p className="text-white font-bold flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-brand-orange" />
                        {new Date(user.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </div>

                <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-text-muted hover:text-white">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-white/[0.01] rounded-[3rem] border-2 border-dashed border-white/5">
            <p className="text-text-muted text-lg">{isAr ? 'لا يوجد مستخدمون.' : 'No users found.'}</p>
          </div>
        )}
      </div>
    </div>
  )
}
