
import { PrismaClient, ServiceCategory } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const services = [
    {
      slug: 'audio',
      nameAr: 'الإنتاج الصوتي',
      nameEn: 'Audio Production',
      descAr: 'توزيع موسيقي، هندسة صوتية، وإنتاج كامل.',
      descEn: 'Music arrangement, sound engineering, and full production.',
      category: ServiceCategory.AUDIO_PRODUCTION,
    },
    {
      slug: 'video',
      nameAr: 'الإنتاج المرئي',
      nameEn: 'Video Production',
      descAr: 'تصوير فيديو كليب، مونتاج، وإخراج.',
      descEn: 'Music video shooting, editing, and directing.',
      category: ServiceCategory.VIDEO_PRODUCTION,
    },
    {
      slug: 'marketing',
      nameAr: 'التسويق الرقمي',
      nameEn: 'Digital Marketing',
      descAr: 'إدارة حملات إعلانية وتنشيط السوشيال ميديا.',
      descEn: 'Ad campaign management and social media activation.',
      category: ServiceCategory.DIGITAL_MARKETING,
    },
    {
      slug: 'web',
      nameAr: 'تطوير المواقع',
      nameEn: 'Web Development',
      descAr: 'بناء منصات ومواقع عصرية.',
      descEn: 'Building modern platforms and websites.',
      category: ServiceCategory.WEB_DEVELOPMENT,
    },
    {
      slug: 'artist',
      nameAr: 'خدمات الفنانين',
      nameEn: 'Artist Services',
      descAr: 'إدارة وتوزيع أعمال الفنانين.',
      descEn: 'Artist management and distribution.',
      category: ServiceCategory.ARTIST_SERVICES,
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
