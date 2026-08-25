import { Link } from "@/navigation"
import { ArrowLeft, CheckCircle2, FileText, BarChart, Award, Calendar, Globe, Youtube, Music, Disc, Volume2 } from 'lucide-react'

interface Props {
  params: {
    locale: string
  }
}

export default function MohammedTifawineCaseStudy({ params: { locale } }: Props) {
  const isAr = locale === 'ar'

  const services = isAr ? [
    'بناء وتطوير الهوية الفنية (Artist Branding)',
    'إعداد وإدارة التواجد الرقمي (Digital Presence Setup)',
    'تصميم غلاف الصفحة والصورة الشخصية (Cover & Profile Design)',
    'إنتاج التصاميم الإعلانية والملصقات الترويجية (Promotional Music Creatives)',
    'صناعة المحتوى التفاعلي (Content Creation)',
    'الدعم الكامل في التوزيع الموسيقي الرقمي (Digital Music Distribution Support)'
  ] : [
    'Artist Branding',
    'Digital Presence Setup',
    'Cover & Profile Design',
    'Promotional Music Creatives',
    'Content Creation',
    'Digital Music Distribution Support'
  ]

  const deliverables = isAr ? [
    'صفحة الفيسبوك الرسمية (Facebook Page)',
    'تصميم غلاف الصفحة (Cover Design)',
    'تصميم الصورة الشخصية (Profile Design)',
    'الملصقات الموسيقية الرسمية (Music Posters)',
    'التصاميم الفنية الإعلانية (Promotional Artwork)',
    'تأسيس وتجهيز حسابات المنصات الموسيقية (Platform Presence Setup)'
  ] : [
    'Facebook Page',
    'Cover Design',
    'Profile Design',
    'Music Posters',
    'Promotional Artwork',
    'Platform Presence Setup'
  ]

  const outcomes = isAr ? [
    'بناء هوية بصرية فنية قوية واحترافية (Stronger artist branding)',
    'انسجام واتساق بصري عبر جميع منصات التواصل (Professional visual consistency)',
    'حضور موسيقي أوسع على الإنترنت ومختلف المنصات (Wider online music presence)',
    'تقديم أفضل وأرقى للأعمال الموسيقية (Better presentation across digital platforms)'
  ] : [
    'Stronger artist branding',
    'Professional visual consistency',
    'Wider online music presence',
    'Better presentation across digital platforms'
  ]

  const youtubeVideos = [
    { id: 'ABsfE5W4FmA', title_ar: 'المنفرد الأول', title_en: 'Release 1' },
    { id: 'zZMZZSNqp9c', title_ar: 'المنفرد الثاني', title_en: 'Release 2' },
    { id: 'fGR1sPNvb_w', title_ar: 'المنفرد الثالث', title_en: 'Release 3' },
    { id: 'NqIhzBf8G-c', title_ar: 'المنفرد الرابع', title_en: 'Release 4' },
  ]

  const artworks = [
    {
      img: '/assets/agency/tifawine-art1.jpg',
      title_ar: 'أغنية تامولايت',
      title_en: 'Tamoulayt',
      desc_ar: 'كلمات وألحان محمد تيفاوين | إنتاج ويزو ميديا',
      desc_en: 'Lyrics & Composition by Mohammed Tifawine | Produced by WEZO MEDIA'
    },
    {
      img: '/assets/agency/tifawine-art2.png',
      title_ar: 'أغنية يان كيران (نسخة أولى)',
      title_en: 'Yan K Iran (Version 1)',
      desc_ar: 'كلمات وألحان محمد تيفاوين | إنتاج وتوزيع ويزو ميديا',
      desc_en: 'Lyrics & Comp. by Mohammed Tifawine | Produced & Distributed by WEZO MEDIA'
    },
    {
      img: '/assets/agency/tifawine-art3.jpg',
      title_ar: 'أغنية IMOT OULNGH',
      title_en: 'Imot Oulngh',
      desc_ar: 'تسجيل استوديو ويزو ميديا | توزيع وميكساج محمد تيفاوين',
      desc_en: 'Recorded at WEZO STUDIO | Mix & Master by Mohammed Tifawine'
    },
    {
      img: '/assets/agency/tifawine-art4.jpg',
      title_ar: 'أغنية يان كيران (نسخة ثانية)',
      title_en: 'Yan K Iran (Version 2)',
      desc_ar: 'تسجيل استوديو ويزو ميديا | توزيع وميكساج بوجمعة أجديك',
      desc_en: 'Recorded at WEZO STUDIO | Mix & Master by Boujmaa Ajdig'
    }
  ]

  return (
    <main className="min-h-screen pb-24 text-start">
      {/* Header Banner */}
      <section className="relative py-20 bg-brand-secondary/30 overflow-hidden border-b border-white/5">
        <div className="container mx-auto px-4 space-y-6">
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-brand-orange hover:text-white transition-colors font-bold">
            <span className="rtl:rotate-180">➔</span> {isAr ? 'العودة لمعرض الأعمال' : 'Back to Portfolio'}
          </Link>
          <div className="space-y-4">
            <div className="inline-block bg-brand-orange/10 border border-brand-orange/20 text-brand-orange px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
              {isAr ? 'إنتاج وتوزيع الموسيقى / هوية الفنانين' : 'Music Production & Distribution / Artist Branding'}
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight font-syne">
              MOHAMMED TIFAWINE
            </h1>
            <p className="text-xl text-text-muted max-w-3xl leading-relaxed">
              {isAr 
                ? 'تصميم الهوية البصرية للفنان، وتأسيس الحضور الرقمي، بالإضافة لتوزيع الموسيقى على جميع المنصات العالمية.'
                : 'Artist Branding, Digital Presence Setup & Worldwide Music Distribution.'}
            </p>
          </div>
        </div>
      </section>

      {/* Case Study Details Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Visual Mockup, Videos, Gallery */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Main Banner Presentation */}
              <div className="rounded-3xl overflow-hidden border border-white/5 shadow-2xl glass-card">
                <img 
                  src="/assets/agency/tifawine-mockup.jpg" 
                  alt="Mohammed Tifawine Case Study Presentation" 
                  className="w-full h-auto object-cover" 
                />
              </div>

              {/* YouTube Releases Section */}
              <div className="space-y-6">
                <h2 className="text-3xl font-black text-white flex items-center gap-3">
                  <Youtube className="w-8 h-8 text-red-600" />
                  {isAr ? 'الإصدارات الموسيقية على يوتيوب' : 'YouTube Music Releases'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {youtubeVideos.map((video) => (
                    <div key={video.id} className="rounded-2xl overflow-hidden border border-white/5 glass-card p-3 space-y-3">
                      <div className="relative aspect-video rounded-xl overflow-hidden">
                        <iframe
                          className="absolute inset-0 w-full h-full border-0"
                          src={`https://www.youtube.com/embed/${video.id}`}
                          title={isAr ? video.title_ar : video.title_en}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <div className="px-2 py-1">
                        <h4 className="font-bold text-white text-sm flex items-center gap-2">
                          <Music className="w-4 h-4 text-brand-orange shrink-0" />
                          <span>{isAr ? video.title_ar : video.title_en}</span>
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Gallery */}
              <div className="space-y-6">
                <h2 className="text-3xl font-black text-white flex items-center gap-3">
                  <Disc className="w-8 h-8 text-brand-orange" />
                  {isAr ? 'الأعمال الفنية والملصقات الترويجية' : 'Promotional Artwork & Covers'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {artworks.map((art, idx) => (
                    <div key={idx} className="rounded-2xl overflow-hidden border border-white/5 glass-card flex flex-col justify-between">
                      <div className="overflow-hidden bg-brand-dark/40 aspect-[4/3] flex items-center justify-center">
                        <img 
                          src={art.img} 
                          alt={isAr ? art.title_ar : art.title_en} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4 bg-brand-dark/40 border-t border-white/5 space-y-1">
                        <h4 className="font-bold text-white text-base">{isAr ? art.title_ar : art.title_en}</h4>
                        <p className="text-text-muted text-xs leading-relaxed">{isAr ? art.desc_ar : art.desc_en}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Project Details Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Project Overview Card */}
              <div className="glass-card p-8 rounded-[2rem] border-white/5 space-y-6">
                <h3 className="text-2xl font-black text-white flex items-center gap-3">
                  <FileText className="w-6 h-6 text-brand-orange" />
                  {isAr ? 'نظرة عامة على المشروع' : 'Project Overview'}
                </h3>
                <p className="text-text-muted leading-relaxed text-sm">
                  {isAr 
                    ? 'أنشأت ويزو ميديا (WEZO MEDIA) حضوراً رقمياً قوياً ومتكاملاً للفنان محمد تيفاوين (Mohammed Tifawine) من خلال تصميم صور الهوية الفنية على فيسبوك ووسائل التواصل الاجتماعي، وتصميم الأغلفة الفنية والملصقات الترويجية للأغاني (تامولايت، يان كيران، Imot Oulngh)، بالإضافة لدعم تسجيل أعماله باستوديوهات ويزو وتوزيع أعماله الموسيقية على أهم المنصات الرقمية العالمية كـ Spotify وApple Music ويوتيوب وأنغامي وديزر.'
                    : 'WEZO MEDIA built a strong and comprehensive digital presence for Mohammed Tifawine by designing his official Facebook branding visuals, creating custom cover art and promotional posters for his releases (Tamoulayt, Yan K Iran, Imot Oulngh), recording at WEZO STUDIO, and distributing his musical works across all major global digital platforms including Spotify, Apple Music, YouTube, Anghami, and Deezer.'}
                </p>
              </div>

              {/* Services & Deliverables Card */}
              <div className="glass-card p-8 rounded-[2rem] border-white/5 space-y-6">
                <h3 className="text-2xl font-black text-white flex items-center gap-3">
                  <Award className="w-6 h-6 text-brand-orange" />
                  {isAr ? 'الخدمات المقدمة' : 'Services Delivered'}
                </h3>
                <ul className="space-y-3">
                  {services.map((srv, idx) => (
                    <li key={idx} className="flex gap-3 items-start text-sm text-text-muted">
                      <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                      <span>{srv}</span>
                    </li>
                  ))}
                </ul>

                <hr className="border-white/5" />

                <h3 className="text-lg font-black text-white">
                  {isAr ? 'المخرجات والتسليمات' : 'Deliverables'}
                </h3>
                <ul className="space-y-3">
                  {deliverables.map((del, idx) => (
                    <li key={idx} className="flex gap-3 items-start text-sm text-text-muted">
                      <CheckCircle2 className="w-5 h-5 text-[#FF4D80] shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Outcome / Results Card */}
              <div className="glass-card p-8 rounded-[2rem] border-white/5 space-y-6">
                <h3 className="text-2xl font-black text-white flex items-center gap-3">
                  <BarChart className="w-6 h-6 text-brand-orange" />
                  {isAr ? 'النتائج المحققة' : 'Outcomes & Results'}
                </h3>
                <ul className="space-y-3">
                  {outcomes.map((res, idx) => (
                    <li key={idx} className="flex gap-3 items-start text-sm text-text-muted">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
