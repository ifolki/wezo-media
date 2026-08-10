
import { PrismaClient, ServiceCategoryEnum } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const services = [
    {
      slug: 'audio',
      nameAr: 'الإنتاج الصوتي',
      nameEn: 'Audio Production',
      nameFr: 'Production Audio',
      descAr: 'توزيع موسيقي، هندسة صوتية، وإنتاج كامل.',
      descEn: 'Music arrangement, sound engineering, and full production.',
      descFr: 'Arrangement musical, ingénierie sonore et production complète.',
      category: ServiceCategoryEnum.AUDIO_PRODUCTION,
    },
    {
      slug: 'video',
      nameAr: 'الإنتاج المرئي',
      nameEn: 'Video Production',
      nameFr: 'Production Vidéo',
      descAr: 'تصوير فيديو كليب، مونتاج، وإخراج.',
      descEn: 'Music video shooting, editing, and directing.',
      descFr: 'Tournage de clips vidéo, montage et réalisation.',
      category: ServiceCategoryEnum.VIDEO_PRODUCTION,
    },
    {
      slug: 'marketing',
      nameAr: 'التسويق الرقمي',
      nameEn: 'Digital Marketing',
      nameFr: 'Marketing Digital',
      descAr: 'إدارة حملات إعلانية وتنشيط السوشيال ميديا.',
      descEn: 'Ad campaign management and social media activation.',
      descFr: 'Gestion de campagnes publicitaires et activation des médias sociaux.',
      category: ServiceCategoryEnum.DIGITAL_MARKETING,
    },
    {
      slug: 'web',
      nameAr: 'تطوير المواقع',
      nameEn: 'Web Development',
      nameFr: 'Développement Web',
      descAr: 'بناء منصات ومواقع عصرية.',
      descEn: 'Building modern platforms and websites.',
      descFr: 'Construction de plateformes et de sites web modernes.',
      category: ServiceCategoryEnum.WEB_DEVELOPMENT,
    },
    {
      slug: 'artist',
      nameAr: 'خدمات الفنانين',
      nameEn: 'Artist Services',
      nameFr: 'Services aux Artistes',
      descAr: 'إدارة وتوزيع أعمال الفنانين.',
      descEn: 'Artist management and distribution.',
      descFr: 'Gestion et distribution des œuvres des artistes.',
      category: ServiceCategoryEnum.ARTIST_SERVICES,
    },
  ]

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    })
  }

  console.log('Services seeded!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
