import type { Metadata } from 'next'
import { Shield, Lock, Eye, FileCheck, Mail, Phone, MapPin } from 'lucide-react'
import { siteConfig } from '@/lib/config/site'
import { Link } from '@/navigation'

interface Props {
  params: {
    locale: string
  }
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  const title = isAr
    ? 'سياسة الخصوصية وحماية البيانات'
    : isFr
    ? 'Politique de Confidentialité & Protection des Données'
    : 'Privacy Policy & Data Protection'

  const description = isAr
    ? 'سياسة الخصوصية وحماية المعطيات الشخصية لوكالة WEZO MEDIA بالمغرب وفقاً للقانون 09-08 المتعلق بحماية الأشخاص الذاتيين تجاه معالجة المعطيات ذات الطابع الشخصي.'
    : isFr
    ? 'Politique de confidentialité de WEZO MEDIA au Maroc conformément à la loi 09-08 relative à la protection des personnes physiques à l’égard du traitement des données à caractère personnel.'
    : 'Privacy policy and personal data protection of WEZO MEDIA in Morocco in compliance with Law 09-08 and global advertising standards.'

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.wezomedia.ma/${locale}/privacy`,
    },
  }
}

export default function PrivacyPage({ params: { locale } }: Props) {
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  const sections = isAr
    ? [
        {
          title: '1. مقدمة والتزامنا بحماية الخصوصية',
          content:
            'تلتزم وكالة WEZO MEDIA ("نحن"، "الوكالة") بحماية خصوصية زوار موقعنا الإلكتروني (www.wezomedia.ma) وعملائنا في المملكة المغربية وخارجها. توضح سياسة الخصوصية هذه كيفية جمعنا واستخدامنا وحمايتنا للمعلومات الشخصية التي تقدمها لنا عند استخدام موقعنا أو ملء نماذج طلب عروض الأسعار والاستشارات التسويقية، وذلك طبقاً لمقتضيات القانون المغربي رقم 09-08 المتعلق بحماية الأشخاص الذاتيين تجاه معالجة المعطيات ذات الطابع الشخصي ومعايير منصات الإعلانات العالمية (Meta وGoogle).',
        },
        {
          title: '2. البيانات التي نقوم بجمعها',
          content:
            'نجمع فقط البيانات الضرورية لدراسة مشروعك والتواصل معك وتقديم خدماتنا الرقمية، وتشمل:\n• بيانات الهوية والتواصل: الاسم الكامل، رقم الهاتف، رقم واتساب، والبريد الإلكتروني.\n• بيانات النشاط التجاري: اسم الشركة أو المشروع، مجال النشاط، المدينة، رابط الموقع الإلكتروني أو صفحات التواصل الاجتماعي، والميزانية التسويقية التقديرية.\n• البيانات التقنية وبيانات التصفح: عنوان بروتوكول الإنترنت (IP)، نوع المتصفح، الصفحات التي تمت زيارتها، ومعرفات ملفات تعريف الارتباط (Cookies) ومصادر الحملة الإعلانية (UTM Parameters).',
        },
        {
          title: '3. كيف نستخدم بياناتك؟',
          content:
            'تُستخدم البيانات التي نجمعها للأغراض المشروعة التالية:\n• دراسة طلبك وإعداد عروض الأسعار والاستراتيجيات التسويقية المخصصة لمشروعك.\n• التواصل معك عبر الهاتف أو واتساب أو البريد الإلكتروني للرد على استفساراتك ومرافقتك.\n• تحسين جودة موقعنا الإلكتروني وتجربة المستخدم وقياس أداء حملاتنا الإعلانية على منصات Meta (فيسبوك وإنستغرام) وGoogle.\n• إرسال تحديثات أو معلومات متعلقة بخدماتنا في حال موافقتك على ذلك.',
        },
        {
          title: '4. ملفات تعريف الارتباط (Cookies) وتقنيات التتبع الإعلاني',
          content:
            'يستخدم موقعنا ملفات تعريف الارتباط وتقنيات التتبع القياسية مثل (Google Analytics وMeta Pixel) لفهم سلوك الزوار بشكل إحصائي وقياس فعالية الحملات الإعلانية وإعادة الاستهداف (Retargeting). لا تتيح لنا هذه الأدوات الاطلاع على بياناتك البنكية أو الخاصة على جهازك، ويمكنك في أي وقت ضبط إعدادات متصفحك لتعطيل ملفات تعريف الارتباط.',
        },
        {
          title: '5. حماية البيانات وعدم مشاركتها مع أطراف ثالثة',
          content:
            'نحن لا نبيع ولا نؤجر ولا نشارك بياناتك الشخصية مع أي جهات خارجية لأغراض تجارية. يتم تخزين بيانات الطلبات في قواعد بيانات مؤمنة وأنظمة إدارة علاقات العملاء الخاصة بوكالتنا حصرياً، ولا يطلع عليها سوى فريق العمل المختص بدراسة وإدارة مشروعك.',
        },
        {
          title: '6. حقوقك القانونية (القانون المغربي 09-08)',
          content:
            'بموجب القانون رقم 09-08، يحق لك في أي وقت طلب الوصول إلى بياناتك الشخصية المسجلة لدينا، أو طلب تصحيحها، أو تحديثها، أو حذفها نهائياً من قاعدة بياناتنا، أو الاعتراض على معالجتها، وذلك عبر التواصل المباشر معنا عبر البريد الإلكتروني أو الهاتف الموضح أدناه.',
        },
      ]
    : isFr
    ? [
        {
          title: '1. Introduction et engagement de confidentialité',
          content:
            'L’agence WEZO MEDIA (« nous », « l’Agence ») s’engage à protéger la vie privée des visiteurs de son site web (www.wezomedia.ma) et de ses clients au Maroc et à l’international. La présente Politique de Confidentialité détaille la manière dont nous collectons, utilisons et protégeons vos données personnelles lorsque vous utilisez nos formulaires de demande de devis ou d’audit, dans le strict respect de la loi marocaine n° 09-08 relative à la protection des personnes physiques à l’égard du traitement des données à caractère personnel ainsi que des exigences des plateformes Meta et Google.',
        },
        {
          title: '2. Données collectées',
          content:
            'Nous collectons uniquement les informations nécessaires à l’étude de votre projet et à la prise de contact commerciale :\n• Données d’identification et de contact : Nom complet, numéro de téléphone, numéro WhatsApp et adresse e-mail.\n• Données professionnelles : Nom de l’entreprise, secteur d’activité, ville, site web ou réseaux sociaux actuels, objectifs et budget marketing indicatif.\n• Données de navigation : Adresse IP, type de navigateur, pages consultées, paramètres UTM et cookies analytiques.',
        },
        {
          title: '3. Utilisation des données',
          content:
            'Vos données sont traitées exclusivement pour :\n• Analyser vos besoins et élaborer des propositions commerciales ou audits sur mesure.\n• Vous contacter par téléphone, WhatsApp ou e-mail afin de répondre à votre demande.\n• Améliorer les performances de notre site et mesurer l’efficacité de nos campagnes publicitaires (Meta Ads, Google Ads).',
        },
        {
          title: '4. Cookies et Pixels de suivi publicitaire',
          content:
            'Notre site utilise des cookies ainsi que des outils d’analyse (Google Analytics, Meta Pixel) afin de mesurer l’audience, optimiser nos tunnels de conversion et proposer des publicités pertinentes. Vous pouvez configurer votre navigateur à tout moment pour refuser ou supprimer ces cookies.',
        },
        {
          title: '5. Sécurité et confidentialité des données',
          content:
            'WEZO MEDIA ne vend, ne loue et ne cède jamais vos données personnelles à des tiers. Les informations transmises via nos formulaires sont stockées de manière sécurisée dans notre CRM interne et ne sont accessibles qu’aux membres habilités de notre équipe.',
        },
        {
          title: '6. Vos droits (Loi 09-08)',
          content:
            'Conformément à la loi n° 09-08, vous disposez d’un droit d’accès, de rectification, de modification et de suppression des données vous concernant. Pour exercer ce droit, il vous suffit de nous contacter aux coordonnées ci-dessous.',
        },
      ]
    : [
        {
          title: '1. Introduction & Privacy Commitment',
          content:
            'WEZO MEDIA ("we", "our Agency") is committed to protecting the privacy of visitors to our website (www.wezomedia.ma) and our clients in Morocco and worldwide. This Privacy Policy explains how we collect, use, and safeguard your personal data when you submit quote requests or growth audit forms, in compliance with Moroccan Law No. 09-08 on personal data protection and global advertising policies (Meta & Google).',
        },
        {
          title: '2. Information We Collect',
          content:
            'We only collect information necessary to evaluate your project and communicate with you:\n• Contact Information: Full name, phone number, WhatsApp number, and email address.\n• Business Information: Company name, industry, city, website or social media links, project objectives, and estimated marketing budget.\n• Technical & Analytics Data: IP address, browser type, visited pages, UTM campaign parameters, and cookies.',
        },
        {
          title: '3. How We Use Your Information',
          content:
            'Your information is used strictly to:\n• Review your project requirements and prepare tailored digital strategies or quotes.\n• Contact you via phone, WhatsApp, or email regarding your inquiry.\n• Improve our website experience and measure the effectiveness of our advertising campaigns on Meta and Google.',
        },
        {
          title: '4. Cookies & Tracking Technologies',
          content:
            'We use cookies and standard tracking pixels (such as Google Analytics and Meta Pixel) to analyze traffic, measure ad conversions, and optimize our marketing campaigns. You can disable cookies at any time through your browser settings.',
        },
        {
          title: '5. Data Security & Third-Party Sharing',
          content:
            'We never sell, rent, or trade your personal or business information to third parties. All submitted lead data is securely stored in our encrypted database and internal CRM, accessible only to authorized WEZO MEDIA team members.',
        },
        {
          title: '6. Your Rights',
          content:
            'In accordance with Law No. 09-08 and applicable data protection regulations, you have the right to access, update, correct, or request the permanent deletion of your personal data at any time by contacting us directly.',
        },
      ]

  const address = isAr ? siteConfig.addressAr : isFr ? siteConfig.addressFr : siteConfig.addressEn

  return (
    <main className="min-h-screen pb-24 bg-brand-dark text-start">
      <section className="py-20 bg-brand-secondary/30 border-b border-white/5">
        <div className="container-custom text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-black uppercase tracking-widest">
            <Shield className="w-4 h-4" />
            <span>{isAr ? 'حماية المعطيات والخصوصية' : isFr ? 'Protection des Données' : 'Data Protection'}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
            {isAr ? 'سياسة الخصوصية' : isFr ? 'Politique de Confidentialité' : 'Privacy Policy'}
          </h1>
          <p className="text-text-muted text-lg">
            {isAr
              ? 'آخر تحديث: يناير 2026 • وكالة WEZO MEDIA للحلول الرقمية والتسويق'
              : isFr
              ? 'Dernière mise à jour : Janvier 2026 • Agence WEZO MEDIA'
              : 'Last Updated: January 2026 • WEZO MEDIA Digital Agency'}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom max-w-4xl mx-auto space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-3xl border-white/5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-white font-black text-base">
                  {isAr ? 'بيانات مشفرة وآمنة' : isFr ? 'Données Sécurisées' : 'Encrypted & Secure'}
                </h2>
                <p className="text-xs text-text-muted">
                  {isAr ? 'حماية تامة لمعلومات مشروعك' : isFr ? 'Protection stricte de vos infos' : 'Full protection of project info'}
                </p>
              </div>
            </div>
            <div className="glass-card p-6 rounded-3xl border-white/5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-white font-black text-base">
                  {isAr ? 'شفافية كاملة' : isFr ? 'Transparence Totale' : 'Full Transparency'}
                </h2>
                <p className="text-xs text-text-muted">
                  {isAr ? 'لا نشارك بياناتك مع أي طرف' : isFr ? 'Aucun partage avec des tiers' : 'Zero third-party data selling'}
                </p>
              </div>
            </div>
            <div className="glass-card p-6 rounded-3xl border-white/5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-pink/10 text-brand-pink flex items-center justify-center shrink-0">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-white font-black text-base">
                  {isAr ? 'توافق قانوني 09-08' : isFr ? 'Conformité Loi 09-08' : 'Law 09-08 Compliant'}
                </h2>
                <p className="text-xs text-text-muted">
                  {isAr ? 'وفق التشريع المغربي والمعايير الدولية' : isFr ? 'Conforme à la législation marocaine' : 'Moroccan & global standards'}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {sections.map((sec, idx) => (
              <div key={idx} className="glass-card p-8 md:p-10 rounded-[2.5rem] border-white/5 space-y-4">
                <h2 className="text-2xl font-black text-white">{sec.title}</h2>
                <p className="text-text-muted text-base md:text-lg leading-relaxed whitespace-pre-line">
                  {sec.content}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Box for Privacy Inquiries */}
          <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border-brand-orange/20 bg-brand-orange/[0.03] space-y-6">
            <h2 className="text-2xl font-black text-white">
              {isAr
                ? 'التواصل بخصوص الخصوصية وحماية البيانات'
                : isFr
                ? 'Contact relatif à la protection des données'
                : 'Contact Us Regarding Privacy'}
            </h2>
            <p className="text-text-muted">
              {isAr
                ? 'لأي استفسار حول سياسة الخصوصية أو لطلب تعديل أو حذف بياناتك، يرجى التواصل معنا عبر القنوات الرسمية:'
                : isFr
                ? 'Pour toute question concernant cette politique ou pour exercer vos droits d’accès et de suppression, contactez-nous :'
                : 'For any questions regarding this Privacy Policy or to request data access or deletion, please contact us:'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 text-white hover:text-brand-orange transition-colors">
                <Mail className="w-5 h-5 text-brand-orange shrink-0" />
                <span dir="ltr" className="font-mono text-sm">{siteConfig.email}</span>
              </a>
              <a href={`tel:${siteConfig.phoneInternational}`} className="flex items-center gap-3 text-white hover:text-brand-orange transition-colors">
                <Phone className="w-5 h-5 text-brand-orange shrink-0" />
                <span dir="ltr" className="font-mono text-sm">{siteConfig.whatsappFormatted}</span>
              </a>
              <div className="flex items-center gap-3 text-white">
                <MapPin className="w-5 h-5 text-brand-orange shrink-0" />
                <span className="text-sm">{address}</span>
              </div>
            </div>
            <div className="pt-4 border-t border-white/10 flex flex-wrap gap-4">
              <Link href="/terms" className="text-brand-orange font-bold text-sm hover:underline">
                {isAr ? 'اطلع أيضاً على الشروط والأحكام ←' : isFr ? 'Voir aussi les Conditions Générales →' : 'View Terms & Conditions →'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
