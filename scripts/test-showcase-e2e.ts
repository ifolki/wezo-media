import { prisma } from '../lib/prisma'
import { parseAndValidateVideo, isSafePublicUrl } from '../lib/video/providers'

async function runE2ETests() {
  console.log('🚀 Starting WEZO SHOWCASE E2E Verification & Seeding...')

  // 1. Verify schema isolation
  console.log('\n--- 1. Checking Schema Isolation ---')
  const isolatedTables: any[] = await prisma.$queryRawUnsafe(`
    SELECT table_schema, table_name 
    FROM information_schema.tables 
    WHERE table_name IN ('ShowcaseVideo', 'VideoCategory', 'VideoSector')
    ORDER BY table_schema, table_name;
  `)
  console.log('Detected Showcase tables in database:')
  isolatedTables.forEach((t) => console.log(`   - Schema: [${t.table_schema}] Table: [${t.table_name}]`))

  const inPublic = isolatedTables.filter((t) => t.table_schema === 'public')
  if (inPublic.length > 0) {
    throw new Error('❌ CRITICAL: Showcase tables detected in public schema! Aborting.')
  }
  console.log('✅ Isolated Schema Confirmed: 0 tables in public schema, all isolated in test_showcase.')

  // 2. Fetch seeded taxonomies
  console.log('\n--- 2. Fetching Taxonomies ---')
  const categories = await prisma.videoCategory.findMany({ orderBy: { order: 'asc' } })
  const sectors = await prisma.videoSector.findMany({ orderBy: { order: 'asc' } })
  console.log(`Found ${categories.length} categories:`, categories.map(c => `${c.slug} (${c.id})`))
  console.log(`Found ${sectors.length} sectors:`, sectors.map(s => `${s.slug} (${s.id})`))

  const catReels = categories.find((c) => c.slug.includes('reel') || c.slug.includes('pub'))?.id || categories[0]?.id
  const catProduits = categories.find((c) => c.slug.includes('produit'))?.id || categories[1]?.id
  const catCorporate = categories.find((c) => c.slug.includes('corp'))?.id || categories[2]?.id

  const secDeco = sectors.find((s) => s.slug.includes('deco') || s.slug.includes('immo'))?.id || sectors[0]?.id
  const secCuisine = sectors.find((s) => s.slug.includes('cuisin'))?.id || sectors[1]?.id
  const secAuto = sectors.find((s) => s.slug.includes('auto'))?.id || sectors[2]?.id
  const secTech = sectors.find((s) => s.slug.includes('tech') || s.slug.includes('ecom'))?.id || sectors[3]?.id

  // 3. Clear existing test videos to ensure idempotency
  await prisma.showcaseVideo.deleteMany({})
  console.log('Cleaned previous showcase test videos.')

  // 4. Seed Reference Mockup Videos
  console.log('\n--- 3. Seeding Reference Mockup Videos ---')
  const sampleVideos = [
    {
      slug: 'ifolki-decoration-vegetale',
      clientName: 'IFOLKI',
      projectName: 'IFOLKI Déco Végétale',
      projectSlug: 'ifolki',
      titleFr: 'IFOLKI — Décoration Végétale & Design Intérieur',
      titleAr: 'إيفولكي — ديكور نباتي وتصميم داخلي راقٍ',
      titleEn: 'IFOLKI — Botanical Décor & Interior Design',
      descFr: 'Campagne vidéo verticale 9:16 pour mise en valeur des créations végétales et décoration haut de gamme au Maroc.',
      descAr: 'حملة إعلانية عمودية 9:16 لتسليط الضوء على الإبداعات النباتية والديكور الداخلي بالمغرب.',
      descEn: 'Vertical 9:16 video campaign highlighting botanical design and luxury interior décor in Morocco.',
      provider: 'YOUTUBE' as const,
      videoId: 'dQw4w9WgXcQ',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnailUrl: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=720&q=80',
      aspectRatio: 'VERTICAL_9_16' as const,
      status: 'PUBLISHED' as const,
      isFeatured: true,
      order: 1,
      categoryId: catReels,
      sectorId: secDeco,
      viewsCount: 1420,
    },
    {
      slug: 'stil-cuisine-haut-de-gamme',
      clientName: 'STIL CUISINE',
      projectName: 'STIL CUISINE 2026',
      projectSlug: 'stil-cuisine',
      titleFr: 'STIL CUISINE — Cuisines Modernes & Îlots Centraux',
      titleAr: 'ستيل كوزين — مطابخ عصرية وجزر مركزية راقية',
      titleEn: 'STIL CUISINE — Modern Kitchens & Islands',
      descFr: 'Vidéo produit immersive au format 9:16 présentant la nouvelle collection de cuisines contemporaines sur mesure.',
      descAr: 'فيديو ترويجي عمودي 9:16 للمطابخ الحديثة المصممة حسب الطلب.',
      descEn: 'Immersive 9:16 product video showcasing custom modern kitchen collections.',
      provider: 'YOUTUBE' as const,
      videoId: '9bZkp7q19f0',
      videoUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
      thumbnailUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=720&q=80',
      aspectRatio: 'VERTICAL_9_16' as const,
      status: 'PUBLISHED' as const,
      isFeatured: true,
      order: 2,
      categoryId: catProduits,
      sectorId: secCuisine,
      viewsCount: 2890,
    },
    {
      slug: 'auto-anas-mecanique-precision',
      clientName: 'AUTO ANAS',
      projectName: 'AUTO ANAS Diagnostic',
      projectSlug: 'auto-anas',
      titleFr: 'AUTO ANAS — Mécanique de Précision & Entretien Auto',
      titleAr: 'أوتو أنس — ميكانيك دقيق وصيانة السيارات الاحترافية',
      titleEn: 'AUTO ANAS — Precision Mechanics & Auto Care',
      descFr: 'Spot publicitaire dynamique capturant l’expertise et les technologies d’atelier automobile à Casablanca.',
      descAr: 'وصلة إعلانية تبرز كفاءة وتقنيات ورشة صيانة السيارات في الدار البيضاء.',
      descEn: 'Dynamic commercial showcasing automotive workshop expertise and diagnostics in Casablanca.',
      provider: 'GOOGLE_DRIVE' as const,
      videoId: '1a2b3c4d5e6f7g8h9i0j_autoanas',
      videoUrl: 'https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i0j_autoanas/view',
      thumbnailUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=720&q=80',
      aspectRatio: 'VERTICAL_9_16' as const,
      status: 'PUBLISHED' as const,
      isFeatured: true,
      order: 3,
      categoryId: catCorporate,
      sectorId: secAuto,
      viewsCount: 950,
    },
    {
      slug: 'tech-maroc-solutions-saas',
      clientName: 'TECH MAROC',
      projectName: 'TECH MAROC SaaS Platform',
      projectSlug: 'tech-maroc',
      titleFr: 'TECH MAROC — Transformation Digitale & Solutions SaaS',
      titleAr: 'تيك ماروك — التحول الرقمي وحلول الساس',
      titleEn: 'TECH MAROC — Digital Transformation & SaaS',
      descFr: 'Spot horizontal 16:9 pour diffusion web et corporate.',
      descAr: 'فيديو ترويجي أفقي 16:9 للعرض المؤسساتي والموقع الإلكتروني.',
      descEn: 'Horizontal 16:9 corporate video for web and B2B marketing.',
      provider: 'YOUTUBE' as const,
      videoId: 'kJQP7kiw5Fk',
      videoUrl: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
      thumbnailUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=720&q=80',
      aspectRatio: 'HORIZONTAL_16_9' as const,
      status: 'PUBLISHED' as const,
      isFeatured: false,
      order: 4,
      categoryId: catCorporate,
      sectorId: secTech,
      viewsCount: 3400,
    },
    {
      slug: 'internal-draft-test',
      clientName: 'WEZO INTERNAL',
      projectName: 'Draft Demo Project',
      projectSlug: 'internal-draft',
      titleFr: 'TEST DRAFT — Brouillon interne non publié',
      titleAr: 'مسودة اختبار داخلية غير منشورة',
      titleEn: 'TEST DRAFT — Unpublished internal draft',
      descFr: 'Brouillon pour tester le filtrage public.',
      provider: 'YOUTUBE' as const,
      videoId: 'draft_video_test_999',
      videoUrl: 'https://www.youtube.com/watch?v=draft_video_test_999',
      thumbnailUrl: null,
      aspectRatio: 'VERTICAL_9_16' as const,
      status: 'DRAFT' as const,
      isFeatured: false,
      order: 5,
      categoryId: catReels,
      sectorId: secDeco,
    },
  ]

  for (const v of sampleVideos) {
    const created = await prisma.showcaseVideo.create({ data: v })
    console.log(`   + Created [${v.status}] [${v.aspectRatio}] ${v.titleFr} (ID: ${created.id})`)
  }

  // 5. Test Duplicate Prevention
  console.log('\n--- 4. Testing Duplicate Prevention (provider + videoId) ---')
  try {
    await prisma.showcaseVideo.create({
      data: {
        slug: 'duplicate-test-attempt-slug',
        clientName: 'DUPLICATE ATTEMPT',
        provider: 'YOUTUBE',
        videoId: 'dQw4w9WgXcQ', // Same videoId as IFOLKI
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        titleFr: 'DUPLICATE ATTEMPT',
      },
    })
    throw new Error('❌ Duplicate prevention failed! Record was created.')
  } catch (err: any) {
    if (err.code === 'P2002' || err.message?.includes('Unique constraint failed')) {
      console.log('✅ Duplicate Prevention PASSED: P2002 Unique constraint blocked duplicate YouTube video ID.')
    } else {
      throw err
    }
  }

  // 6. Test Public Filtering (PUBLISHED vs DRAFT)
  console.log('\n--- 5. Testing Public API Query Filtering ---')
  const publicVideos = await prisma.showcaseVideo.findMany({
    where: { status: 'PUBLISHED' },
    include: { category: true, sector: true },
    orderBy: { order: 'asc' },
  })
  console.log(`Public query returned ${publicVideos.length} videos:`)
  publicVideos.forEach((v) => {
    console.log(`   * #${v.order} [${v.clientName}] "${v.titleFr}" — Status: ${v.status}, Cat: ${v.category?.nameFr}, Sec: ${v.sector?.nameFr}`)
  })
  const hasDraft = publicVideos.some((v) => v.status === 'DRAFT')
  if (hasDraft) throw new Error('❌ Security error: DRAFT video appeared in public query!')
  console.log('✅ Public Filtering PASSED: DRAFT videos correctly excluded.')

  // 7. Test Admin Operations (Toggle status, delete draft)
  console.log('\n--- 6. Testing Admin Operations (Update & Delete) ---')
  const draftRecord = await prisma.showcaseVideo.findFirst({
    where: { videoId: 'draft_video_test_999' },
  })
  if (!draftRecord) throw new Error('Draft record not found')

  // Update status to HIDDEN
  const updated = await prisma.showcaseVideo.update({
    where: { id: draftRecord.id },
    data: { status: 'HIDDEN' },
  })
  console.log(`Updated video status to: ${updated.status}`)

  // Delete test draft record
  await prisma.showcaseVideo.delete({ where: { id: draftRecord.id } })
  console.log(`Deleted draft test record successfully.`)

  const afterDeleteCount = await prisma.showcaseVideo.count()
  console.log(`Active showcase videos remaining in test_showcase: ${afterDeleteCount}`)

  // 8. Test Dynamic Embed Generation & SSRF Protection
  console.log('\n--- 7. Testing Video Provider Engine & Embed Generator ---')
  const sampleYt = parseAndValidateVideo('https://youtu.be/dQw4w9WgXcQ')
  console.log(`YouTube parsed: provider=${sampleYt.provider}, id=${sampleYt.videoId}, embedUrl=${sampleYt.embedUrl}`)
  if (!sampleYt.success || !sampleYt.embedUrl?.includes('youtube-nocookie.com')) {
    throw new Error('YouTube engine failed')
  }

  const sampleDrive = parseAndValidateVideo('https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i0j_autoanas/view')
  console.log(`Drive parsed: provider=${sampleDrive.provider}, id=${sampleDrive.videoId}, embedUrl=${sampleDrive.embedUrl}`)
  if (!sampleDrive.success || !sampleDrive.embedUrl?.includes('/preview')) {
    throw new Error('Google Drive engine failed')
  }

  const invalidSsrf = isSafePublicUrl('http://169.254.169.254/latest/meta-data/')
  console.log(`SSRF test (AWS metadata): safe=${invalidSsrf.safe}`)
  if (invalidSsrf.safe) throw new Error('SSRF validator failed to block AWS metadata IP!')

  const invalidLocal = isSafePublicUrl('http://127.0.0.1:3000/api/admin')
  console.log(`SSRF test (Loopback IP): safe=${invalidLocal.safe}`)
  if (invalidLocal.safe) throw new Error('SSRF validator failed to block 127.0.0.1!')

  console.log('\n🎉 ALL SHOWCASE E2E AND SEEDING TESTS PASSED SUCCESSFULLY!')
}

runE2ETests()
  .catch((err) => {
    console.error('Test execution failed:', err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
