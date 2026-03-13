# 🚀 ويزو ميديا — ملف تعليمات الـ AI Agent الكامل
## نسخة احترافية للبناء المرحلي
### Stack: Next.js 14 + TypeScript + Tailwind CSS + Prisma + PostgreSQL

---

> **⚠️ تعليمات للـ Agent قبل ما تكتب ولو سطر كود واحد:**
> اقرأ هاد الملف بالكامل من البداية حتى النهاية.
> تبع كل مرحلة بالترتيب — لا تتخطى أي خطوة.
> في نهاية كل مرحلة أكد الاكتمال قبل ما تمشي للمرحلة الجاية.
> اللغة الافتراضية هي العربية (RTL) مع دعم الإنجليزية (LTR).

---

## 🎯 نظرة عامة على المشروع

أنت بصدد بناء منصة **Wezo Media** — شركة إعلام رقمي متكاملة.

| المعلومة | التفاصيل |
|---|---|
| **اسم الشركة** | Wezo Media |
| **المجال** | الإعلام الرقمي، الإنتاج الموسيقي، التسويق الرقمي |
| **نوع المنصة** | SaaS متكامل — موقع عام + لوحة عميل + لوحة إدارة |
| **اللغات** | العربية (RTL أساسية) + الإنجليزية (قابلة للتبديل من الواجهة) |
| **ستايل التصميم** | Dark Modern Tech — خلفيات داكنة عميقة مع لمسات برتقالية وردية نيون |

---

## 🎨 الهوية البصرية — التصميم

```css
/* ألوان المنصة الأساسية */
--color-bg-primary:     #0A0A0F;   /* خلفية رئيسية داكنة جداً */
--color-bg-secondary:   #111118;   /* خلفية ثانوية */
--color-bg-card:        #16161F;   /* بطاقات */
--color-bg-glass:       rgba(255,255,255,0.04); /* زجاجية */

--color-accent-orange:  #FF6B2B;   /* برتقالي كهربائي */
--color-accent-pink:    #FF2D78;   /* وردي نيون */
--color-accent-glow:    #FF6B2B40; /* توهج برتقالي */

--color-text-primary:   #F5F5F7;   /* نص أساسي */
--color-text-secondary: #8B8B9E;   /* نص ثانوي */
--color-text-muted:     #4A4A5E;   /* نص خافت */

--color-border:         rgba(255,255,255,0.08); /* حدود */
--color-border-accent:  rgba(255,107,43,0.3);   /* حدود مضيئة */

/* Gradient الأساسي */
--gradient-brand: linear-gradient(135deg, #FF6B2B, #FF2D78);
--gradient-dark:  linear-gradient(180deg, #0A0A0F 0%, #111118 100%);
```

**الخطوط:**
- العناوين: `Cairo` أو `Almarai` (عربي) — `Syne` أو `Space Grotesk` (إنجليزي)
- النصوص: `Tajawal` (عربي) — `DM Sans` (إنجليزي)

**التأثيرات البصرية:**
- Glassmorphism على البطاقات
- Neon Glow على العناصر البارزة
- Gradient borders
- Particle effects خفيفة في الهيرو
- Smooth scroll animations مع Framer Motion

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

```
Frontend:      Next.js 14 (App Router) + TypeScript
Styling:       Tailwind CSS + shadcn/ui + Framer Motion
Database:      PostgreSQL عبر Prisma ORM
Auth:          NextAuth.js v5 (Credentials + Google OAuth)
Payments:      Stripe + PayPal SDK
File Upload:   Uploadthing
Email:         Resend + React Email templates
State:         Zustand + TanStack Query v5
i18n:          next-intl (AR + EN)
SEO:           Next.js Metadata API + next-sitemap + Schema.org
Icons:         Lucide React
Forms:         React Hook Form + Zod validation
Notifications: Sonner (toast)
Tables:        TanStack Table v8
Charts:        Recharts
```

---

## 📁 هيكل المشروع الكامل

```
wezo-media/
├── app/
│   ├── [locale]/                         # توجيه i18n (ar / en)
│   │   ├── (public)/                     # الموقع العام
│   │   │   ├── page.tsx                  # الصفحة الرئيسية
│   │   │   ├── services/
│   │   │   │   ├── page.tsx              # كل الخدمات
│   │   │   │   └── [slug]/page.tsx       # تفاصيل خدمة
│   │   │   ├── artists/page.tsx          # خدمات الفنانين
│   │   │   ├── portfolio/page.tsx        # الأعمال
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   └── contact/page.tsx
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── dashboard/                    # لوحة العميل
│   │   │   ├── page.tsx                  # Overview
│   │   │   ├── projects/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── messages/page.tsx
│   │   │   ├── payments/page.tsx
│   │   │   └── settings/page.tsx
│   │   └── admin/                        # لوحة الإدارة
│   │       ├── page.tsx                  # Dashboard overview
│   │       ├── users/page.tsx
│   │       ├── projects/
│   │       │   ├── page.tsx
│   │       │   └── [id]/page.tsx
│   │       ├── services/page.tsx
│   │       ├── blog/page.tsx
│   │       └── payments/page.tsx
├── components/
│   ├── ui/                               # shadcn/ui components
│   ├── public/                           # مكونات الموقع العام
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── ServicesGrid.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Team.tsx
│   │   ├── CTA.tsx
│   │   └── Footer.tsx
│   ├── dashboard/                        # مكونات لوحة العميل
│   │   ├── Sidebar.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── MessageThread.tsx
│   │   └── PaymentCard.tsx
│   ├── admin/                            # مكونات الإدارة
│   │   ├── AdminSidebar.tsx
│   │   ├── StatsCard.tsx
│   │   ├── ProjectsTable.tsx
│   │   └── UsersTable.tsx
│   └── shared/
│       ├── LanguageSwitcher.tsx
│       ├── ThemeProvider.tsx
│       └── RequestServiceModal.tsx
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   ├── stripe.ts
│   ├── uploadthing.ts
│   └── validations/
├── messages/
│   ├── ar.json                           # ترجمات عربية
│   └── en.json                           # ترجمات إنجليزية
├── prisma/
│   └── schema.prisma
└── public/
    ├── fonts/
    └── images/
```

---

## 🗄️ قاعدة البيانات — Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ==================== المستخدمون ====================

model User {
  id            String    @id @default(cuid())
  name          String
  email         String    @unique
  emailVerified DateTime?
  password      String?
  phone         String?
  avatar        String?
  role          Role      @default(CLIENT)
  locale        String    @default("ar")
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  projects      Project[]
  messages      Message[]
  payments      Payment[]
  accounts      Account[]
  sessions      Session[]
}

enum Role {
  CLIENT
  ADMIN
  SUPER_ADMIN
}

// ==================== المشاريع ====================

model Project {
  id          String        @id @default(cuid())
  title       String
  description String
  status      ProjectStatus @default(PENDING)
  priority    Priority      @default(MEDIUM)
  startDate   DateTime?
  dueDate     DateTime?
  budget      Float?
  isPaid      Boolean       @default(false)
  paymentEnabled Boolean    @default(false)
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt

  clientId    String
  client      User          @relation(fields: [clientId], references: [id])
  serviceId   String?
  service     Service?      @relation(fields: [serviceId], references: [id])

  files       File[]
  messages    Message[]
  payments    Payment[]
  updates     ProjectUpdate[]
}

enum ProjectStatus {
  PENDING
  IN_PROGRESS
  REVIEW
  COMPLETED
  CANCELLED
}

enum Priority {
  LOW
  MEDIUM
  HIGH
  URGENT
}

// ==================== الخدمات ====================

model Service {
  id          String   @id @default(cuid())
  slug        String   @unique
  nameAr      String
  nameEn      String
  descAr      String
  descEn      String
  category    ServiceCategory
  icon        String?
  image       String?
  isActive    Boolean  @default(true)
  order       Int      @default(0)
  createdAt   DateTime @default(now())

  projects    Project[]
  packages    Package[]
  workSteps   WorkStep[]
}

enum ServiceCategory {
  AUDIO_PRODUCTION
  VIDEO_PRODUCTION
  DIGITAL_MARKETING
  WEB_DEVELOPMENT
  MUSIC_DISTRIBUTION
  ARTIST_SERVICES
}

model Package {
  id          String   @id @default(cuid())
  nameAr      String
  nameEn      String
  price       Float
  currency    String   @default("USD")
  features    Json     // مصفوفة مميزات
  isPopular   Boolean  @default(false)
  serviceId   String
  service     Service  @relation(fields: [serviceId], references: [id])
}

model WorkStep {
  id          String   @id @default(cuid())
  titleAr     String
  titleEn     String
  descAr      String
  descEn      String
  order       Int
  serviceId   String
  service     Service  @relation(fields: [serviceId], references: [id])
}

// ==================== الرسائل ====================

model Message {
  id          String   @id @default(cuid())
  content     String
  isRead      Boolean  @default(false)
  isAdmin     Boolean  @default(false)
  createdAt   DateTime @default(now())

  projectId   String
  project     Project  @relation(fields: [projectId], references: [id])
  senderId    String
  sender      User     @relation(fields: [senderId], references: [id])
}

// ==================== الملفات ====================

model File {
  id          String   @id @default(cuid())
  name        String
  url         String
  size        Int
  type        String
  createdAt   DateTime @default(now())

  projectId   String
  project     Project  @relation(fields: [projectId], references: [id])
}

// ==================== المدفوعات ====================

model Payment {
  id            String        @id @default(cuid())
  amount        Float
  currency      String        @default("USD")
  status        PaymentStatus @default(PENDING)
  method        PaymentMethod?
  stripeId      String?
  paypalId      String?
  invoiceUrl    String?
  paidAt        DateTime?
  createdAt     DateTime      @default(now())

  projectId     String
  project       Project       @relation(fields: [projectId], references: [id])
  clientId      String
  client        User          @relation(fields: [clientId], references: [id])
}

enum PaymentStatus {
  PENDING
  AWAITING_PAYMENT
  PAID
  FAILED
  REFUNDED
}

enum PaymentMethod {
  CARD
  PAYPAL
  BANK_TRANSFER
}

// ==================== المدونة ====================

model BlogPost {
  id          String   @id @default(cuid())
  slug        String   @unique
  titleAr     String
  titleEn     String
  contentAr   String
  contentEn   String
  excerpt     String?
  coverImage  String?
  isPublished Boolean  @default(false)
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  tags        String[]
}

// ==================== التحديثات ====================

model ProjectUpdate {
  id          String   @id @default(cuid())
  content     String
  createdAt   DateTime @default(now())

  projectId   String
  project     Project  @relation(fields: [projectId], references: [id])
}

// ==================== Auth (NextAuth) ====================

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

---

## 📋 المراحل التنفيذية

---

### 🔵 المرحلة 1 — إعداد المشروع والبنية الأساسية

**الهدف:** بيئة عمل كاملة جاهزة للبناء عليها.

**الخطوات:**

```bash
# 1. إنشاء المشروع
npx create-next-app@latest wezo-media \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

cd wezo-media

# 2. تثبيت الحزم الأساسية
npm install \
  prisma @prisma/client \
  next-auth@beta \
  next-intl \
  framer-motion \
  zustand \
  @tanstack/react-query \
  react-hook-form zod @hookform/resolvers \
  uploadthing @uploadthing/next \
  stripe @stripe/stripe-js \
  resend react-email \
  sonner \
  clsx tailwind-merge \
  lucide-react

# 3. تثبيت shadcn/ui
npx shadcn@latest init

# أضف هاد الكومبونانتات
npx shadcn@latest add button card input label select textarea badge
npx shadcn@latest add dialog sheet dropdown-menu avatar progress tabs
npx shadcn@latest add table pagination skeleton toast separator

# 4. إعداد Prisma
npx prisma init
```

**ما يجب إنشاؤه في هاد المرحلة:**

1. `prisma/schema.prisma` — انسخ الـ schema كامل من فوق
2. `.env.local` بهاد المتغيرات:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/wezo_media"

# NextAuth
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Stripe
STRIPE_SECRET_KEY=""
STRIPE_PUBLISHABLE_KEY=""
STRIPE_WEBHOOK_SECRET=""

# PayPal
PAYPAL_CLIENT_ID=""
PAYPAL_CLIENT_SECRET=""

# Uploadthing
UPLOADTHING_SECRET=""
UPLOADTHING_APP_ID=""

# Resend (Email)
RESEND_API_KEY=""
EMAIL_FROM="noreply@wezomedia.com"
```

3. `tailwind.config.ts` — أضف الألوان المخصصة:

```typescript
import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#FF6B2B",
          pink:   "#FF2D78",
          dark:   "#0A0A0F",
          card:   "#16161F",
        },
      },
      fontFamily: {
        arabic:  ["Tajawal", "Cairo", "sans-serif"],
        display: ["Syne", "sans-serif"],
      },
      animation: {
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "float":      "float 6s ease-in-out infinite",
        "slide-up":   "slideUp 0.5s ease-out",
        "fade-in":    "fadeIn 0.6s ease-out",
      },
      keyframes: {
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255,107,43,0.3)" },
          "50%":      { boxShadow: "0 0 40px rgba(255,107,43,0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-20px)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
```

4. `app/globals.css` — الستايل الأساسي:

```css
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Tajawal:wght@300;400;500;700&family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --bg-primary:    #0A0A0F;
    --bg-secondary:  #111118;
    --bg-card:       #16161F;
    --accent-orange: #FF6B2B;
    --accent-pink:   #FF2D78;
    --text-primary:  #F5F5F7;
    --text-muted:    #8B8B9E;
    --border:        rgba(255,255,255,0.08);
  }

  * { @apply border-border; }
  
  body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    font-family: 'Tajawal', 'DM Sans', sans-serif;
    @apply antialiased;
  }

  [dir="rtl"] body { font-family: 'Tajawal', sans-serif; }
  [dir="ltr"] body { font-family: 'DM Sans', sans-serif; }
}

@layer utilities {
  .gradient-brand {
    background: linear-gradient(135deg, #FF6B2B, #FF2D78);
  }
  .gradient-text {
    background: linear-gradient(135deg, #FF6B2B, #FF2D78);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .glass-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    backdrop-filter: blur(12px);
  }
  .glow-orange {
    box-shadow: 0 0 30px rgba(255,107,43,0.25);
  }
  .glow-pink {
    box-shadow: 0 0 30px rgba(255,45,120,0.25);
  }
}
```

5. إعداد `next-intl`:

```typescript
// middleware.ts
import createMiddleware from 'next-intl/middleware'
export default createMiddleware({
  locales: ['ar', 'en'],
  defaultLocale: 'ar',
  localeDetection: true,
})
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
}
```

```json
// messages/ar.json — الترجمات العربية الكاملة
{
  "nav": {
    "home": "الرئيسية",
    "services": "الخدمات",
    "artists": "خدمات الفنانين",
    "portfolio": "الأعمال",
    "blog": "المدونة",
    "contact": "تواصل معنا",
    "login": "تسجيل الدخول",
    "register": "إنشاء حساب",
    "dashboard": "لوحة التحكم"
  },
  "hero": {
    "badge": "شريكك في النجاح الرقمي",
    "title": "نصنع المحتوى الذي يُحرّك العالم",
    "subtitle": "إنتاج موسيقي، تسويق رقمي، وحضور قوي على الإنترنت — كل ما تحتاجه في مكان واحد",
    "cta_primary": "اطلب خدمة الآن",
    "cta_secondary": "اكتشف أعمالنا"
  },
  "services": {
    "title": "خدماتنا",
    "subtitle": "حلول متكاملة لنجاحك الرقمي",
    "categories": {
      "audio": "الإنتاج الصوتي",
      "video": "إنتاج الفيديو",
      "marketing": "التسويق الرقمي",
      "web": "تطوير الويب",
      "distribution": "التوزيع الموسيقي",
      "artist": "خدمات الفنانين"
    }
  },
  "dashboard": {
    "welcome": "أهلاً بك",
    "my_projects": "مشاريعي",
    "messages": "الرسائل",
    "payments": "المدفوعات",
    "settings": "الإعدادات",
    "new_request": "طلب خدمة جديدة",
    "status": {
      "pending": "في الانتظار",
      "in_progress": "قيد التنفيذ",
      "review": "مراجعة",
      "completed": "مكتمل",
      "cancelled": "ملغي"
    }
  },
  "payments": {
    "pay_now": "ادفع الآن",
    "invoice": "الفاتورة",
    "amount": "المبلغ",
    "status": "الحالة",
    "method": "طريقة الدفع"
  }
}
```

**✅ نهاية المرحلة 1 — تأكد من:**
- [ ] المشروع يشتغل على `localhost:3000`
- [ ] Prisma schema مضاف وميجريشن شغال
- [ ] Tailwind يطبق الألوان المخصصة
- [ ] next-intl middleware يشتغل مع `/ar` و `/en`

---

### 🟠 المرحلة 2 — الموقع العام (Public Website)

**الهدف:** بناء كامل الصفحات العامة بتصميم احترافي.

---

#### 2.1 — الـ Layout الأساسي والـ Navbar

```typescript
// components/public/Navbar.tsx
// متطلبات الكومبونانت:
// - شفاف في البداية، يصبح solid عند الـ scroll
// - لوغو Wezo Media بالـ gradient (برتقالي → وردي)
// - لينكات الناف: الرئيسية | الخدمات | الفنانين | الأعمال | المدونة | تواصل
// - زر تسجيل الدخول + زر "اطلب خدمة" بالـ gradient
// - Language Switcher: زر AR/EN يغير الـ locale ويضبط direction
// - Mobile: Hamburger menu مع drawer
// - RTL/LTR يتغير حسب اللغة
```

#### 2.2 — الصفحة الرئيسية

ابنِ الصفحة الرئيسية بهاد الـ sections بالترتيب:

**Section 1 — Hero:**
```
- خلفية داكنة مع particle effect خفيف أو mesh gradient متحرك
- Badge صغير: "شريكك في النجاح الرقمي ✨"
- عنوان رئيسي كبير (font-size: 72px على desktop) بالـ gradient text
- عنوان فرعي وصفي
- زرين: "اطلب خدمة الآن" (gradient button) + "اكتشف أعمالنا" (outline)
- scroll indicator يتحرك للأسفل
- صور أو موكاب يطفو على اليمين (float animation)
```

**Section 2 — Stats:**
```
- 4 أرقام متحركة (count-up animation عند الـ scroll):
  - "+500 مشروع منجز"
  - "+200 عميل راضٍ"
  - "+50 فنان تعاملنا معهم"
  - "5 سنوات خبرة"
- خلفية glass card مع gradient border
```

**Section 3 — الخدمات:**
```
- Grid من 3 أعمدة (responsive: 1 col mobile, 2 col tablet, 3 col desktop)
- كل بطاقة خدمة تحتوي:
  - أيقونة كبيرة ملونة
  - اسم الخدمة
  - وصف قصير (2 سطر)
  - زر "اعرف أكثر" يوجه لصفحة الخدمة
- Hover effect: glow + scale(1.02) + gradient border يظهر
```

**Section 4 — طريقة العمل:**
```
- 4 خطوات بـ timeline أفقي
  1. طلب الخدمة 📝
  2. مراجعة ودراسة المشروع 🔍
  3. التنفيذ والإنتاج 🎬
  4. التسليم والمتابعة 🚀
- كل خطوة: رقم كبير بالـ gradient، عنوان، وصف
```

**Section 5 — أحدث الأعمال:**
```
- Grid مع masonry layout
- كل بطاقة: صورة + اسم المشروع + نوع الخدمة + hover يظهر زر "مشاهدة"
- زر "عرض كل الأعمال" في الأسفل
```

**Section 6 — الفريق:**
```
- عنوان القسم + وصف قصير
- Grid: 4 بطاقات للفريق
- كل بطاقة: صورة دائرية + الاسم + المنصب + أيقونات التواصل الاجتماعي
```

**Section 7 — آراء العملاء (Testimonials):**
```
- Slider/Carousel تلقائي
- كل بطاقة: نص الرأي + صورة العميل + الاسم + المسمى
- نجوم التقييم بالـ gradient
```

**Section 8 — CTA النهائي:**
```
- خلفية gradient برتقالي → وردي
- عنوان كبير: "جاهز للبدء؟"
- وصف قصير
- زر أبيض كبير: "اطلب خدمتك الآن"
```

**Section 9 — Footer:**
```
- 4 أعمدة:
  - عمود 1: لوغو + وصف قصير + أيقونات سوشيال ميديا
  - عمود 2: روابط سريعة
  - عمود 3: الخدمات
  - عمود 4: تواصل معنا (عنوان، إيميل، هاتف)
- الكوبيرايت في الأسفل
- RTL على عربي، LTR على إنجليزي
```

---

#### 2.3 — صفحة الخدمات

```typescript
// app/[locale]/(public)/services/page.tsx
// عرض كل الخدمات مع:
// - Filter بالكاتيغوري (tabs أو buttons)
// - Search input
// - Grid responsive من البطاقات
```

```typescript
// app/[locale]/(public)/services/[slug]/page.tsx
// صفحة تفاصيل الخدمة:
// - Hero صغير بالـ gradient مع اسم الخدمة
// - وصف مفصل للخدمة
// - مراحل العمل (steps timeline)
// - الباقات والأسعار (packages cards)
// - أعمال سابقة مرتبطة بهاد الخدمة
// - زر كبير: "اطلب هاد الخدمة الآن" → يفتح modal الطلب
// - SEO: generateMetadata ديناميكي لكل خدمة
```

---

#### 2.4 — صفحة خدمات الفنانين

```typescript
// app/[locale]/(public)/artists/page.tsx
// خدمات خاصة بالفنانين:
// - Hero بصورة موسيقية + نص إبداعي
// - Section: توزيع الأغاني على المنصات (Spotify, Apple Music, YouTube Music, Deezer, Tidal)
//   → اعرض أيقونات المنصات + ما تشمله الخدمة
// - Section: التسويق الموسيقي
// - Section: إدارة الفنانين
// - Section: إنتاج الفيديو كليب
// - قسم الأسعار مع مقارنة الباقات
// - زر طلب الخدمة
```

---

#### 2.5 — صفحة الأعمال (Portfolio)

```typescript
// app/[locale]/(public)/portfolio/page.tsx
// - Hero صغير
// - Filter بالكاتيغوري (كل الأعمال / فيديو / موسيقى / تسويق / ويب)
// - Grid/Masonry من المشاريع
// - كل مشروع: صورة/فيديو + اسم + نوع + زر "عرض التفاصيل" → Lightbox
// - تحميل تدريجي (Load More button أو infinite scroll)
```

---

#### 2.6 — صفحة المدونة

```typescript
// app/[locale]/(public)/blog/page.tsx
// - قائمة المقالات من قاعدة البيانات
// - كل بطاقة: صورة + عنوان + تاريخ + وقت القراءة + excerpt
// - Filter بالـ Tags
// - Pagination

// app/[locale]/(public)/blog/[slug]/page.tsx
// - صفحة المقال الكاملة
// - generateMetadata للـ SEO
// - مقالات مشابهة في الأسفل
```

---

#### 2.7 — صفحة التواصل

```typescript
// app/[locale]/(public)/contact/page.tsx
// - نموذج تواصل: الاسم + إيميل + الهاتف + الموضوع + الرسالة
// - معلومات التواصل: إيميل، هاتف، عنوان
// - Map embed (اختياري)
// - عند الإرسال: يُرسل إيميل للإدارة عبر Resend
```

---

#### 2.8 — Modal طلب الخدمة (RequestServiceModal)

هاد الـ modal هو **نقطة الدخول الأساسية** للنظام، ابنيه بعناية:

```typescript
// components/shared/RequestServiceModal.tsx
// نموذج متعدد الخطوات (Multi-step form) بـ 3 خطوات:

// الخطوة 1 — معلومات التواصل:
//   - الاسم الكامل (مطلوب)
//   - البريد الإلكتروني (مطلوب)
//   - رقم الهاتف (مطلوب)

// الخطوة 2 — تفاصيل الطلب:
//   - نوع الخدمة المطلوبة (Select من قاعدة البيانات)
//   - وصف المشروع (Textarea)
//   - التاريخ المتوقع للتسليم (Date picker)
//   - رفع ملفات مرجعية (Uploadthing - max 5 files, 10MB each)

// الخطوة 3 — تأكيد الطلب:
//   - ملخص كل ما أدخله المستخدم
//   - زر "إرسال الطلب"

// بعد الإرسال:
//   - إذا كان المستخدم مسجلاً → ينشئ مشروع في حسابه مباشرة
//   - إذا كان زائراً → يطلب منه التسجيل/تسجيل الدخول لمتابعة طلبه
//   - يُرسل إيميل للإدارة بتفاصيل الطلب
//   - يُرسل إيميل تأكيد للعميل
```

**✅ نهاية المرحلة 2 — تأكد من:**
- [ ] كل الصفحات العامة تعمل بالعربية والإنجليزية
- [ ] RTL يشتغل صح مع العربية
- [ ] الـ Modal تشتغل وتُرسل البيانات لـ API
- [ ] SEO: كل صفحة فيها metadata صحيحة
- [ ] الموقع responsive على موبايل وتابلت وديسكتوب

---

### 🟡 المرحلة 3 — نظام المصادقة (Auth)

**الهدف:** نظام تسجيل دخول آمن ومتكامل.

```typescript
// lib/auth.ts — إعداد NextAuth.js v5
// Providers:
//   1. CredentialsProvider (إيميل + كلمة مرور مشفرة بـ bcrypt)
//   2. GoogleProvider (OAuth)
// Session strategy: JWT
// Callbacks: user role في الـ session token
// Middleware: حماية routes الـ /dashboard و /admin
```

**صفحات المصادقة:**

```typescript
// app/[locale]/(auth)/login/page.tsx
// - نموذج تسجيل الدخول (إيميل + كلمة مرور)
// - زر "تسجيل الدخول بـ Google"
// - رابط "نسيت كلمة المرور؟"
// - رابط للتسجيل
// - تصميم: glass card على خلفية داكنة مع gradient background

// app/[locale]/(auth)/register/page.tsx
// - نموذج إنشاء حساب (الاسم + إيميل + كلمة مرور + تأكيد كلمة المرور + هاتف)
// - زر "إنشاء حساب بـ Google"
// - Zod validation على كل الحقول
// - بعد التسجيل: إيميل ترحيب عبر Resend

// app/api/auth/[...nextauth]/route.ts — NextAuth handler
// app/api/auth/register/route.ts — API لإنشاء حساب جديد
```

**✅ نهاية المرحلة 3 — تأكد من:**
- [ ] تسجيل الدخول بالإيميل وكلمة المرور يشتغل
- [ ] Google OAuth يشتغل
- [ ] Middleware يحمي routes الـ dashboard و admin
- [ ] Roles: CLIENT لا يقدر يوصل لـ /admin

---

### 🟢 المرحلة 4 — لوحة تحكم العميل (Client Dashboard)

**الهدف:** لوحة تحكم جميلة وعملية يشوف فيها العميل مشاريعه ويتواصل مع الإدارة.

---

#### 4.1 — Layout لوحة العميل

```typescript
// app/[locale]/dashboard/layout.tsx
// - Sidebar على اليسار (RTL: اليمين)
// - يحتوي على:
//   - لوغو + اسم المستخدم + صورته
//   - روابط: Overview | مشاريعي | الرسائل | المدفوعات | الإعدادات
//   - زر "طلب خدمة جديدة" (يفتح RequestServiceModal)
//   - زر تسجيل الخروج
// - على موبايل: Bottom navigation bar
// - Header علوي: عنوان الصفحة + notifications bell + avatar
```

---

#### 4.2 — الصفحة الرئيسية للداشبورد (Overview)

```typescript
// app/[locale]/dashboard/page.tsx
// - ترحيب بالاسم: "أهلاً [اسم العميل] 👋"
// - 4 Stats cards:
//   - إجمالي المشاريع
//   - مشاريع قيد التنفيذ
//   - مشاريع مكتملة
//   - مدفوعات معلقة
// - جدول آخر المشاريع (5 مشاريع) مع حالتها
// - آخر الرسائل (3 رسائل)
```

---

#### 4.3 — صفحة المشاريع

```typescript
// app/[locale]/dashboard/projects/page.tsx
// - Filter بالحالة (كل | في الانتظار | قيد التنفيذ | مراجعة | مكتمل)
// - Grid من بطاقات المشاريع
// - كل بطاقة:
//   - اسم المشروع + نوع الخدمة
//   - Status badge ملون:
//     PENDING → رمادي "في الانتظار"
//     IN_PROGRESS → برتقالي "قيد التنفيذ" (مع نبضة)
//     REVIEW → أزرق "مراجعة"
//     COMPLETED → أخضر "مكتمل"
//   - تاريخ الإنشاء + تاريخ التسليم المتوقع
//   - Progress bar (يحسب حسب الحالة)
//   - زر "عرض التفاصيل"
```

---

#### 4.4 — صفحة تفاصيل المشروع

```typescript
// app/[locale]/dashboard/projects/[id]/page.tsx
// - Header: اسم المشروع + Status badge + التاريخ
// - Tabs:
//   ▸ التفاصيل:
//     - وصف المشروع الكامل
//     - تفاصيل الخدمة المطلوبة
//     - المراحل والتحديثات (timeline)
//   ▸ الملفات:
//     - عرض الملفات المرفوعة (من الإدارة أو العميل)
//     - زر "رفع ملف" (Uploadthing)
//     - كل ملف: اسم + حجم + تاريخ + زر تحميل
//   ▸ الرسائل:
//     - Chat interface كامل
//     - رسائل الإدارة تظهر على اليسار (bubble رمادي)
//     - رسائل العميل تظهر على اليمين (bubble gradient)
//     - Input في الأسفل + زر إرسال
//     - الوقت والتاريخ على كل رسالة
//   ▸ الدفع:
//     - إذا paymentEnabled = false: رسالة "سيتم تفعيل الدفع بعد مراجعة الطلب"
//     - إذا paymentEnabled = true: زر "ادفع الآن" كبير بالـ gradient
//       + تفاصيل الفاتورة (المبلغ، العملة، الخدمة)
//       + خيارات الدفع: Stripe (بطاقة) أو PayPal أو تحويل بنكي
```

---

#### 4.5 — صفحة الرسائل

```typescript
// app/[locale]/dashboard/messages/page.tsx
// - قائمة المحادثات على الجانب (مع آخر رسالة وعدد غير المقروء)
// - نافذة المحادثة الكاملة على اليمين (أو كامل الشاشة على موبايل)
// - Real-time messages (استخدم polling كل 5 ثوانٍ أو Server-Sent Events)
```

---

#### 4.6 — صفحة المدفوعات

```typescript
// app/[locale]/dashboard/payments/page.tsx
// - قائمة بكل الفواتير
// - كل فاتورة: رقم الفاتورة + المشروع + المبلغ + الحالة + تاريخ الإنشاء
// - Status badges: معلق | في انتظار الدفع | مدفوع | فشل
// - زر "ادفع الآن" على الفواتير المفعّلة
// - زر "تحميل الفاتورة PDF"
```

**✅ نهاية المرحلة 4 — تأكد من:**
- [ ] العميل يقدر يشوف كل مشاريعه
- [ ] نظام الرسائل يشتغل
- [ ] صفحة الدفع تظهر صح حسب حالة `paymentEnabled`
- [ ] رفع الملفات يشتغل مع Uploadthing

---

### 🔴 المرحلة 5 — لوحة تحكم الإدارة (Admin Dashboard)

**الهدف:** لوحة إدارة قوية وشاملة للتحكم في كل المنصة.

---

#### 5.1 — Layout الإدارة

```typescript
// app/[locale]/admin/layout.tsx
// - Sidebar أوسع من الـ client dashboard
// - روابط: Dashboard | المستخدمون | المشاريع | الخدمات | المدونة | المدفوعات | الإعدادات
// - Protected: role === ADMIN || SUPER_ADMIN فقط
// - Header: Admin badge + اسم المسؤول + notifications
```

---

#### 5.2 — الصفحة الرئيسية للإدارة

```typescript
// app/[locale]/admin/page.tsx
// - Stats overview:
//   - إجمالي المستخدمين + الجدد هاد الشهر
//   - إجمالي المشاريع + المشاريع الجديدة
//   - الإيرادات هاد الشهر
//   - الطلبات المعلقة (تحتاج مراجعة)
// - Chart: إيرادات آخر 6 أشهر (Recharts BarChart)
// - Chart: توزيع المشاريع بالحالة (Recharts PieChart)
// - جدول: آخر 10 طلبات جديدة مع زر "مراجعة"
// - جدول: المشاريع التي تحتاج متابعة
```

---

#### 5.3 — إدارة المشاريع

```typescript
// app/[locale]/admin/projects/page.tsx
// - جدول شامل بكل المشاريع (TanStack Table)
// - أعمدة: # | اسم المشروع | العميل | الخدمة | الحالة | التاريخ | الأولوية | إجراءات
// - Filter: بالحالة + بالخدمة + بالتاريخ
// - Search: بالاسم أو اسم العميل
// - Pagination
// - Bulk actions: تغيير حالة مشاريع متعددة دفعة واحدة

// app/[locale]/admin/projects/[id]/page.tsx
// - نفس الـ tabs كلوحة العميل + tabs إضافية:
//   ▸ الإعدادات:
//     - تغيير حالة المشروع (Status dropdown)
//     - تغيير أولوية المشروع
//     - تعيين تاريخ التسليم
//     - إضافة ملاحظة داخلية (لا يشوفها العميل)
//   ▸ إدارة الدفع:
//     - إدخال مبلغ المشروع
//     - تفعيل/إلغاء زر الدفع للعميل
//     - إرسال الفاتورة بالإيميل
//     - تسجيل دفع يدوي (تحويل بنكي)
```

---

#### 5.4 — إدارة المستخدمين

```typescript
// app/[locale]/admin/users/page.tsx
// - جدول كل المستخدمين
// - أعمدة: الاسم | الإيميل | الهاتف | الدور | تاريخ التسجيل | عدد المشاريع | إجراءات
// - Filter بالدور (client/admin)
// - Search بالاسم أو الإيميل
// - إجراءات: عرض مشاريع المستخدم | تغيير الدور | تعليق الحساب
```

---

#### 5.5 — إدارة الخدمات

```typescript
// app/[locale]/admin/services/page.tsx
// - جدول الخدمات مع drag-and-drop لترتيبها
// - زر "إضافة خدمة جديدة" → modal نموذج
// - كل خدمة: تعديل | حذف | إخفاء/إظهار
// - إدارة الباقات لكل خدمة (pricing packages)
// - إدارة مراحل العمل (work steps) لكل خدمة
```

---

#### 5.6 — إدارة المدونة

```typescript
// app/[locale]/admin/blog/page.tsx
// - قائمة المقالات مع status (منشور/مسودة)
// - زر "مقال جديد" → محرر نصوص (استخدم TipTap أو Quill)
// - المحرر يدعم: عناوين | نص عريض | صور | روابط | قوائم
// - حقول: عنوان عربي + إنجليزي | محتوى عربي + إنجليزي | صورة غلاف | tags | SEO meta
```

---

#### 5.7 — إدارة المدفوعات

```typescript
// app/[locale]/admin/payments/page.tsx
// - جدول كل المدفوعات
// - Filter: مدفوع | معلق | فاشل
// - إجمالي الإيرادات + هاد الشهر
// - تصدير CSV
// - لكل دفعة: عرض التفاصيل | إرسال فاتورة | استرداد (refund)
```

**✅ نهاية المرحلة 5 — تأكد من:**
- [ ] الإدارة تقدر تغير حالة كل مشروع
- [ ] تفعيل/إلغاء الدفع يشتغل
- [ ] نظام الرسائل من طرف الإدارة يشتغل
- [ ] إدارة الخدمات تشتغل (CRUD كامل)

---

### 🟣 المرحلة 6 — نظام الدفع (Payments)

**الهدف:** ربط Stripe وPayPal مع نظام الفواتير.

---

#### 6.1 — Stripe (بطاقة بنكية)

```typescript
// app/api/payments/stripe/create-intent/route.ts
// - يستقبل: projectId + amount
// - يتحقق من: paymentEnabled === true في قاعدة البيانات
// - ينشئ: PaymentIntent في Stripe
// - يرجع: clientSecret

// app/api/payments/stripe/webhook/route.ts
// - يستقبل: Stripe webhook events
// - عند payment_intent.succeeded:
//   → يحدث حالة Payment لـ PAID في قاعدة البيانات
//   → يحدث isPaid في المشروع
//   → يرسل إيميل تأكيد للعميل
//   → يرسل إشعار للإدارة

// components/dashboard/StripePaymentForm.tsx
// - نموذج دفع بـ Stripe Elements
// - يظهر عند الضغط على "ادفع بالبطاقة"
```

---

#### 6.2 — PayPal

```typescript
// app/api/payments/paypal/create-order/route.ts
// - ينشئ PayPal order
// - يرجع: orderID

// app/api/payments/paypal/capture-order/route.ts
// - يلتقط الدفع بعد موافقة العميل
// - يحدث قاعدة البيانات

// components/dashboard/PayPalButton.tsx
// - PayPal Smart Buttons
```

---

#### 6.3 — التحويل البنكي

```typescript
// عند اختيار العميل "تحويل بنكي":
// - تظهر معلومات الحساب البنكي
// - زر "أرسل إشعار الدفع" → يرسل للإدارة إيميل
// - الإدارة تؤكد الاستلام يدوياً من لوحتها
```

**✅ نهاية المرحلة 6 — تأكد من:**
- [ ] Stripe يشتغل في وضع Test
- [ ] PayPal يشتغل في وضع Sandbox
- [ ] Webhooks تحدث قاعدة البيانات صح
- [ ] إيميلات التأكيد تصل

---

### ⚫ المرحلة 7 — SEO والأداء

**الهدف:** موقع سريع ومتوافق مع محركات البحث.

```typescript
// app/[locale]/(public)/layout.tsx
// generateMetadata لكل صفحة:
export const metadata: Metadata = {
  metadataBase: new URL('https://wezomedia.com'),
  title: { default: 'Wezo Media | ويزو ميديا', template: '%s | Wezo Media' },
  description: 'شركة إعلام رقمي متخصصة في الإنتاج الموسيقي، التسويق الرقمي، وتطوير الويب',
  keywords: ['ويزو ميديا', 'إنتاج موسيقي', 'تسويق رقمي', 'تطوير مواقع', 'Wezo Media'],
  openGraph: {
    type: 'website',
    locale: 'ar_MA',
    alternateLocale: 'en_US',
    siteName: 'Wezo Media',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

// next-sitemap.config.js
// - توليد sitemap.xml تلقائي
// - يشمل: الصفحات الثابتة + الخدمات + المقالات

// Schema.org Structured Data:
// - Organization schema في الـ homepage
// - Service schema لكل خدمة
// - BlogPosting schema لكل مقال

// الأداء:
// - next/image لكل الصور
// - lazy loading للـ sections
// - font optimization مع next/font
// - Suspense + loading.tsx لكل route
```

---

### ⚪ المرحلة 8 — الاختبار والنشر

```bash
# الاختبار:
npm run build          # تأكد لا توجد أخطاء TypeScript
npm run lint           # تأكد من جودة الكود

# متغيرات البيئة للإنتاج:
# DATABASE_URL → Neon.tech أو Supabase (PostgreSQL مجاني)
# NEXTAUTH_URL → رابط الموقع الحقيقي
# Stripe → مفاتيح الإنتاج
# PayPal → مفاتيح الإنتاج

# النشر على Vercel:
vercel --prod
```

---

## 📌 ملاحظات مهمة للـ Agent

1. **اللغة والاتجاه:** استخدم `dir="rtl"` مع العربية و `dir="ltr"` مع الإنجليزية. كل النصوص يجب أن تكون في ملفات الترجمة وليس hardcoded.

2. **الأمان:** كل الـ API routes تحتاج `getServerSession()` للتحقق من الهوية. لا بيانات حساسة في الـ client-side.

3. **التصميم:** لا تستخدم ألوان بيضاء كخلفيات. كل شيء dark. البرتقالي والوردي فقط للـ accents والـ gradients والأزرار المهمة.

4. **Error Handling:** كل الـ API routes تحتاج try/catch. كل الفورمات تحتاج Zod validation. اعرض رسائل خطأ واضحة للمستخدم.

5. **Loading States:** كل صفحة تحتاج `loading.tsx`. كل action يحتاج loading indicator.

6. **Mobile First:** ابدأ التصميم للموبايل ثم وسّع للـ desktop.

7. **i18n:** كل نص يمر عبر `useTranslations()` أو `getTranslations()` من `next-intl`. لا نصوص hardcoded أبداً.

8. **الخطوات:** لا تكتب كل الكود دفعة واحدة. ابنِ مرحلة بمرحلة، اختبر، ثم انتقل للتالية.

---

## 🎯 أولويات التنفيذ

```
P0 (أساسي):    المرحلة 1 (setup) + المرحلة 3 (auth) + المرحلة 4 (client dashboard)
P1 (مهم):      المرحلة 2 (موقع عام) + المرحلة 5 (admin dashboard)
P2 (متقدم):    المرحلة 6 (دفع) + المرحلة 7 (SEO)
```

---

*تم إعداد هاد الملف خصيصاً لـ Wezo Media — جميع الحقوق محفوظة*
