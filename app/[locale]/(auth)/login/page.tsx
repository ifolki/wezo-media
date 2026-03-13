'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { signIn } from 'next-auth/react'
import { useRouter } from '@/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Rocket, Mail, Lock } from 'lucide-react'
import { Link } from '@/navigation'
import { toast } from 'sonner'

export default function LoginPage() {
  const t = useTranslations('auth')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        toast.error(t('error_invalid'))
      } else {
        toast.success(t('login_title')) // Placeholder for success
        router.push('/dashboard')
        router.refresh()
      }
    } catch (error) {
      toast.error(t('error_generic'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-brand-dark px-4 py-20">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-pink/10 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="glass-card border-white/10 shadow-2xl overflow-hidden rounded-[2.5rem]">
          <CardHeader className="text-center pt-12 pb-8 space-y-4">
            <div className="w-20 h-20 mx-auto flex items-center justify-center animate-float">
              <img src="/assets/logo/logo-3d.png" alt="Wezo Media 3D Logo" className="w-full h-full object-contain" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-3xl font-black text-white">{t('login_title')}</CardTitle>
              <CardDescription className="text-text-muted text-lg">{t('login_subtitle')}</CardDescription>
            </div>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-white font-bold text-base px-1">{t('email')}</Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-brand-orange transition-colors rtl:left-auto rtl:right-4" />
                  <Input
                    type="email"
                    required
                    placeholder="example@wezo.com"
                    className="h-14 bg-white/5 border-white/10 rounded-2xl ps-12 rtl:ps-4 rtl:pe-12 text-white placeholder:text-white/20 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all text-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <Label className="text-white font-bold text-base">{t('password')}</Label>
                  <Link href="/forgot-password" title={t('forgot_password')} className="text-sm text-brand-orange hover:underline">
                    {t('forgot_password')}
                  </Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-brand-pink transition-colors rtl:left-auto rtl:right-4" />
                  <Input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="h-14 bg-white/5 border-white/10 rounded-2xl ps-12 rtl:ps-4 rtl:pe-12 text-white placeholder:text-white/20 focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all text-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <Button
                disabled={isLoading}
                className="w-full h-14 gradient-brand text-lg font-black rounded-2xl shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isLoading ? <div className="w-6 h-6 border-b-2 border-white rounded-full animate-spin" /> : t('login_button')}
              </Button>
            </form>

            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#16161F] px-4 text-text-muted font-bold tracking-widest">{t('nav.home') === 'الرئيسية' ? 'أو' : 'OR'}</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full h-14 border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl gap-3 transition-all"
              onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {t('google_button')}
            </Button>
          </CardContent>

          <CardFooter className="justify-center py-8 border-t border-white/5 bg-white/[0.02]">
             <p className="text-text-muted font-medium">
               {t('no_account')} {' '}
               <Link href="/register" className="text-brand-orange font-bold hover:underline">
                 {t('register_button')}
               </Link>
             </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
