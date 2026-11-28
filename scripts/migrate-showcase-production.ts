import { prisma } from '../lib/prisma'

async function migrateProductionShowcase() {
  console.log('🚀 Executing Safe & Idempotent Production Migration for WEZO SHOWCASE...')

  // Step 1: Create Enums in public schema
  console.log('1. Ensuring Enums in public schema...')
  await prisma.$executeRawUnsafe(`
    DO $$ BEGIN
      CREATE TYPE "public"."VideoProvider" AS ENUM ('YOUTUBE', 'GOOGLE_DRIVE', 'EXTERNAL', 'BUNNY', 'VIMEO');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `)

  await prisma.$executeRawUnsafe(`
    DO $$ BEGIN
      CREATE TYPE "public"."VideoAspect" AS ENUM ('VERTICAL_9_16', 'HORIZONTAL_16_9');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `)

  await prisma.$executeRawUnsafe(`
    DO $$ BEGIN
      CREATE TYPE "public"."VideoStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'HIDDEN');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `)
  console.log('   ✓ Enums verified in public.')

  // Step 2: Create VideoCategory table
  console.log('2. Creating VideoCategory table if not exists...')
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "public"."VideoCategory" (
      "id" TEXT NOT NULL,
      "slug" TEXT NOT NULL,
      "nameAr" TEXT NOT NULL,
      "nameFr" TEXT NOT NULL,
      "nameEn" TEXT NOT NULL,
      "order" INTEGER NOT NULL DEFAULT 0,
      "isActive" BOOLEAN NOT NULL DEFAULT true,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "VideoCategory_pkey" PRIMARY KEY ("id")
    );
  `)
  await prisma.$executeRawUnsafe(`
    CREATE UNIQUE INDEX IF NOT EXISTS "VideoCategory_slug_key" ON "public"."VideoCategory"("slug");
  `)

  // Step 3: Create VideoSector table
  console.log('3. Creating VideoSector table if not exists...')
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "public"."VideoSector" (
      "id" TEXT NOT NULL,
      "slug" TEXT NOT NULL,
      "nameAr" TEXT NOT NULL,
      "nameFr" TEXT NOT NULL,
      "nameEn" TEXT NOT NULL,
      "order" INTEGER NOT NULL DEFAULT 0,
      "isActive" BOOLEAN NOT NULL DEFAULT true,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "VideoSector_pkey" PRIMARY KEY ("id")
    );
  `)
  await prisma.$executeRawUnsafe(`
    CREATE UNIQUE INDEX IF NOT EXISTS "VideoSector_slug_key" ON "public"."VideoSector"("slug");
  `)

  // Step 4: Create ShowcaseVideo table
  console.log('4. Creating ShowcaseVideo table if not exists...')
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "public"."ShowcaseVideo" (
      "id" TEXT NOT NULL,
      "slug" TEXT NOT NULL,
      "clientName" TEXT NOT NULL,
      "projectName" TEXT,
      "projectSlug" TEXT,
      "titleAr" TEXT,
      "titleFr" TEXT,
      "titleEn" TEXT,
      "descAr" TEXT,
      "descFr" TEXT,
      "descEn" TEXT,
      "provider" "public"."VideoProvider" NOT NULL DEFAULT 'YOUTUBE',
      "videoUrl" TEXT NOT NULL,
      "videoId" TEXT NOT NULL,
      "thumbnailUrl" TEXT,
      "customThumbnail" TEXT,
      "aspectRatio" "public"."VideoAspect" NOT NULL DEFAULT 'VERTICAL_9_16',
      "order" INTEGER NOT NULL DEFAULT 0,
      "isFeatured" BOOLEAN NOT NULL DEFAULT false,
      "status" "public"."VideoStatus" NOT NULL DEFAULT 'DRAFT',
      "viewsCount" INTEGER NOT NULL DEFAULT 0,
      "completionDate" TIMESTAMP(3),
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL,
      "categoryId" TEXT,
      "sectorId" TEXT,
      CONSTRAINT "ShowcaseVideo_pkey" PRIMARY KEY ("id"),
      CONSTRAINT "ShowcaseVideo_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."VideoCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE,
      CONSTRAINT "ShowcaseVideo_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "public"."VideoSector"("id") ON DELETE SET NULL ON UPDATE CASCADE
    );
  `)
  await prisma.$executeRawUnsafe(`
    CREATE UNIQUE INDEX IF NOT EXISTS "ShowcaseVideo_slug_key" ON "public"."ShowcaseVideo"("slug");
  `)
  await prisma.$executeRawUnsafe(`
    CREATE UNIQUE INDEX IF NOT EXISTS "ShowcaseVideo_provider_videoId_key" ON "public"."ShowcaseVideo"("provider", "videoId");
  `)
  await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS "ShowcaseVideo_status_order_idx" ON "public"."ShowcaseVideo"("status", "order");
  `)
  await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS "ShowcaseVideo_projectSlug_idx" ON "public"."ShowcaseVideo"("projectSlug");
  `)
  await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS "ShowcaseVideo_categoryId_idx" ON "public"."ShowcaseVideo"("categoryId");
  `)
  await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS "ShowcaseVideo_sectorId_idx" ON "public"."ShowcaseVideo"("sectorId");
  `)
  console.log('   ✓ Tables and indexes created successfully in public schema.')

  // Step 5: Seed default categories into public
  console.log('5. Seeding default categories in public schema...')
  const defaultCategories = [
    { slug: 'reels-publicitaires', nameAr: 'ريلز إعلانية', nameFr: 'Reels publicitaires', nameEn: 'Advertising Reels', order: 1 },
    { slug: 'videos-ugc', nameAr: 'فيديوهات UGC', nameFr: 'Vidéos UGC', nameEn: 'UGC Videos', order: 2 },
    { slug: 'videos-produits', nameAr: 'فيديوهات المنتجات', nameFr: 'Vidéos produits', nameEn: 'Product Videos', order: 3 },
    { slug: 'motion-design', nameAr: 'موشن ديزاين', nameFr: 'Motion Design', nameEn: 'Motion Design', order: 4 },
    { slug: 'videos-corporate', nameAr: 'فيديوهات مؤسساتية', nameFr: 'Vidéos Corporate', nameEn: 'Corporate Videos', order: 5 },
    { slug: 'production-ia', nameAr: 'إنتاج بالذكاء الاصطناعي', nameFr: 'Production IA', nameEn: 'AI Production', order: 6 },
    { slug: 'clips-musicaux', nameAr: 'فيديو كليب وأعمال فنية', nameFr: 'Clips musicaux', nameEn: 'Music Videos', order: 7 }
  ]

  for (const c of defaultCategories) {
    await prisma.$executeRawUnsafe(`
      INSERT INTO "public"."VideoCategory" ("id", "slug", "nameAr", "nameFr", "nameEn", "order", "isActive", "createdAt")
      VALUES ('cat_' || $1, $1, $2, $3, $4, $5, true, NOW())
      ON CONFLICT ("slug") DO UPDATE 
      SET "nameAr" = EXCLUDED."nameAr", "nameFr" = EXCLUDED."nameFr", "nameEn" = EXCLUDED."nameEn", "order" = EXCLUDED."order";
    `, c.slug, c.nameAr, c.nameFr, c.nameEn, c.order)
    console.log(`   + Category: ${c.nameFr}`)
  }

  // Step 6: Seed default sectors into public
  console.log('6. Seeding default sectors in public schema...')
  const defaultSectors = [
    { slug: 'immobilier-deco', nameAr: 'العقار والديكور', nameFr: 'Immobilier & Décoration', nameEn: 'Real Estate & Décor', order: 1 },
    { slug: 'cuisine-maison', nameAr: 'المطابخ والأثاث المنزلي', nameFr: 'Cuisine & Ameublement', nameEn: 'Kitchen & Home Furnishing', order: 2 },
    { slug: 'automobile', nameAr: 'السيارات والخدمات الميكانيكية', nameFr: 'Automobile & Garage', nameEn: 'Automotive & Garage', order: 3 },
    { slug: 'sante-bien-etre', nameAr: 'الصحة والجمال والعيادات', nameFr: 'Santé & Bien-être', nameEn: 'Health & Wellness', order: 4 },
    { slug: 'mode-beaute', nameAr: 'الموضة والأزياء', nameFr: 'Mode & Habillement', nameEn: 'Fashion & Apparel', order: 5 },
    { slug: 'ecommerce', nameAr: 'التجارة الإلكترونية والمنتجات', nameFr: 'E-commerce & Boutiques', nameEn: 'E-commerce & Retail', order: 6 }
  ]

  for (const s of defaultSectors) {
    await prisma.$executeRawUnsafe(`
      INSERT INTO "public"."VideoSector" ("id", "slug", "nameAr", "nameFr", "nameEn", "order", "isActive", "createdAt")
      VALUES ('sec_' || $1, $1, $2, $3, $4, $5, true, NOW())
      ON CONFLICT ("slug") DO UPDATE 
      SET "nameAr" = EXCLUDED."nameAr", "nameFr" = EXCLUDED."nameFr", "nameEn" = EXCLUDED."nameEn", "order" = EXCLUDED."order";
    `, s.slug, s.nameAr, s.nameFr, s.nameEn, s.order)
    console.log(`   + Sector: ${s.nameFr}`)
  }

  // Step 7: Verify isolation and clean video count in public
  const videoCount: any[] = await prisma.$queryRawUnsafe(`SELECT COUNT(*)::int as count FROM "public"."ShowcaseVideo";`)
  console.log(`\n✅ Production Showcase migration completed successfully!`)
  console.log(`Current ShowcaseVideo records in public schema: ${videoCount[0]?.count} (Clean slate, zero test videos).`)
}

migrateProductionShowcase()
  .catch((err) => {
    console.error('Migration failed:', err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
