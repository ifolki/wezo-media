import prisma from "@/lib/prisma"
import QuoteForm from "@/components/public/QuoteForm"
import { getTranslations } from 'next-intl/server'

interface Props {
  params: {
    locale: string
  }
}

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'quote' })
  return {
    title: `${t('title')} | WEZO MEDIA`,
    description: t('subtitle')
  }
}

export default async function GetQuotePage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'quote' })
  
  // Fetch services from DB for the selection step, with a fallback if the database is unreachable/paused
  let services = [];
  try {
    services = await prisma.service.findMany({
      select: {
        id: true,
        slug: true,
        nameAr: true,
        nameEn: true,
        nameFr: true,
        descAr: true,
        descEn: true,
        descFr: true
      }
    });
  } catch (error) {
    console.error("Database connection failed. Falling back to static services list.", error);
    services = [
      {
        id: "cl-audio-id",
        slug: "audio",
        nameAr: "الإنتاج الصوتي",
        nameEn: "Audio Production",
        nameFr: "Production Audio",
        descAr: "توزيع موسيقي، هندسة صوتية، وإنتاج كامل.",
        descEn: "Music arrangement, sound engineering, and full production.",
        descFr: "Arrangement musical, ingénierie sonore et production complète."
      },
      {
        id: "cl-video-id",
        slug: "video",
        nameAr: "الإنتاج المرئي",
        nameEn: "Video Production",
        nameFr: "Production Vidéo",
        descAr: "تصوير فيديو كليب، مونتاج، وإخراج.",
        descEn: "Music video shooting, editing, and directing.",
        descFr: "Tournage de clips vidéo, montage et réalisation."
      },
      {
        id: "cl-marketing-id",
        slug: "marketing",
        nameAr: "التسويق الرقمي",
        nameEn: "Digital Marketing",
        nameFr: "Marketing Digital",
        descAr: "إدارة حملات إعلانية وتنشيط السوشيال ميديا.",
        descEn: "Ad campaign management and social media activation.",
        descFr: "Gestion de campagnes publicitaires et activation des médias sociaux."
      },
      {
        id: "cl-web-id",
        slug: "web",
        nameAr: "تطوير المواقع",
        nameEn: "Web Development",
        nameFr: "Développement Web",
        descAr: "بناء منصات ومواقع عصرية.",
        descEn: "Building modern platforms and websites.",
        descFr: "Construction de plateformes et de sites web modernes."
      },
      {
        id: "cl-artist-id",
        slug: "artist",
        nameAr: "خدمات الفنانين",
        nameEn: "Artist Services",
        nameFr: "Services aux Artistes",
        descAr: "إدارة وتوزيع أعمال الفنانين.",
        descEn: "Artist management and distribution.",
        descFr: "Gestion et distribution des œuvres des artistes."
      }
    ];
  }

  return (
    <main className="min-h-screen pb-24">
      {/* Header section with gradient background accent */}
      <section className="relative py-20 overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-orange/10 blur-[120px] -z-10" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-[#FF4D80]/10 blur-[100px] -z-10" />

        <div className="container mx-auto px-4 text-center space-y-4 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight font-syne">
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Interactive Form Step Section */}
      <section className="px-4 md:px-0">
        <QuoteForm services={services} />
      </section>
    </main>
  )
}
