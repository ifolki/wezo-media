import type { Metadata } from 'next'
import { FileText, Mail, Phone, MapPin } from 'lucide-react'
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
    ? 'الشروط والأحكام العامة للخدمات'
    : isFr
    ? 'Conditions Générales d’Utilisation et de Services'
    : 'Terms & Conditions of Service'

  const description = isAr
    ? 'الشروط والأحكام العامة لاستخدام موقع وخدمات وكالة WEZO MEDIA للحلول الرقمية والتسويق والإنتاج الفني في المغرب.'
    : isFr
    ? 'Conditions générales d’utilisation du site et des prestations de services de l’agence digitale WEZO MEDIA au Maroc.'
    : 'Terms and conditions governing the use of WEZO MEDIA website and digital agency services in Morocco.'

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.wezomedia.ma/${locale}/terms`,
    },
  }
}

export default function TermsPage({ params: { locale } }: Props) {
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  const sections = isAr
    ? [
        {
          title: '1. قبول الشروط والأحكام',
          content:
            'إن تصفحك واستخدامك لموقع وكالة WEZO MEDIA (www.wezomedia.ma) أو تقديمك لطلب عرض سعر أو التعاقد على إحدى خدماتنا الرقمية والتسويقية والفنية يعني موافقتك الكاملة على هذه الشروط والأحكام العامة وفقاً للقوانين المعمول بها في المملكة المغربية.',
        },
        {
          title: '2. نطاق خدمات وكالة WEZO MEDIA',
          content:
            'تقدم وكالة WEZO MEDIA حلولاً رقمية وتسويقية وإبداعية متكاملة للشركات والفنانين، وتشمل:\n• الاستراتيجية الرقمية، إدارة الحملات الإعلانية الممولة (Meta Ads وGoogle Ads)، وتحسين معدلات التحويل.\n• تصميم وبرمجة المواقع الإلكترونية، المتاجر الإلكترونية، وصفحات الهبوط.\n• تصميم الهوية البصرية، صناعة المحتوى المرئي والفيديوهات الإعلانية (Reels & UGC)، وإدارة شبكات التواصل الاجتماعي.\n• حلول الأتمتة والذكاء الاصطناعي وربط مسارات واتساب وأنظمة CRM.\n• الإنتاج الصوتي والموسيقي وخدمات الفنانين داخل استوديو WEZO.',
        },
        {
          title: '3. عروض الأسعار والتعاقد والدفعات المالية',
          content:
            '• يتم تحديد نطاق العمل الدقيق، المخرجات، الجدول الزمني، والتكلفة المالية لكل مشروع بناءً على عرض سعر رسمي (Devis) أو عقد مخصص يوافق عليه الطرفان.\n• يبدأ تنفيذ المشروع بعد تأكيد الطلب وسداد الدفعة المقدمة المتفق عليها في عرض السعر.\n• الميزانية المخصصة للمنصات الإعلانية (مثل ميزانية فيسبوك وإنستغرام وجوجل) تكون مستقلة عن أتعاب الإدارة والتنفيذ الفني إلا إذا نُص صراحة على خلاف ذلك في العرض المكتوب.',
        },
        {
          title: '4. التزامات العميل والتعاون المشترك',
          content:
            'لضمان إنجاز المشروع في الآجال المحددة وبأعلى جودة، يلتزم العميل بتزويد فريق WEZO MEDIA بالمعلومات، المواد، الصلاحيات التقنية، والملاحظات اللازمة في الوقت المناسب، كما يضمن العميل ملكيته القانونية لأي شعارات أو مواد يزود الوكالة بها.',
        },
        {
          title: '5. حقوق الملكية الفكرية',
          content:
            '• جميع التصاميم، الأكواد البرمجية، المحتويات، والشعارات الخاصة بموقع WEZO MEDIA هي ملكية فكرية حصرية للوكالة ولا يجوز نسخها أو إعادة استخدامها دون إذن كتابي.\n• تنتقل حقوق استخدام المخرجات النهائية للمشروع المتعاقد عليه إلى العميل فور استكمال سداد كافة المستحقات المالية المتفق عليها.',
        },
        {
          title: '6. الأداء التسويقي وإخلاء المسؤولية',
          content:
            'تلتزم وكالة WEZO MEDIA ببذل أقصى درجات العناية المهنية وتطبيق أفضل الممارسات والمنهجيات العلمية في إدارة الحملات الإعلانية وتصميم مسارات التحويل. ومع ذلك، فإن النتائج النهائية للمبيعات تتأثر أيضاً بعوامل خارجية مثل جودة منتج أو خدمة العميل، تسعيره في السوق، وسرعة استجابة فريق مبيعات العميل مع العملاء المحتملين (Leads).',
        },
        {
          title: '7. القانون الواجب التطبيق والاختصاص القضائي',
          content:
            'تخضع هذه الشروط والأحكام للقوانين الجاري بها العمل في المملكة المغربية، وفي حال نشوء أي نزاع تعذر حله ودياً، ينعقد الاختصاص للمحاكم المختصة بمدينة الدار البيضاء.',
        },
      ]
    : isFr
    ? [
        {
          title: '1. Acceptation des Conditions Générales',
          content:
            'L’accès et l’utilisation du site web de WEZO MEDIA (www.wezomedia.ma), ainsi que toute demande de devis ou commande de prestation, impliquent l’acceptation pleine et entière des présentes Conditions Générales, régies par le droit marocain.',
        },
        {
          title: '2. Périmètre des Services WEZO MEDIA',
          content:
            'WEZO MEDIA propose des prestations de conseil, de création et de développement digital comprenant :\n• Stratégie digitale, gestion de campagnes publicitaires (Meta Ads, Google Ads) et génération de leads.\n• Conception et développement de sites web vitrines, boutiques e-commerce et landing pages.\n• Identité visuelle (Branding), création de contenu vidéo (Reels, UGC) et gestion des réseaux sociaux.\n• Automatisation des flux clients WhatsApp, CRM et intégration d’assistants IA.\n• Production audio, musicale et services aux artistes en studio.',
        },
        {
          title: '3. Devis, Commandes et Modalités de Paiement',
          content:
            '• Chaque projet fait l’objet d’un devis détaillé ou d’un contrat précisant le cahier des charges, les livrables, les délais et les tarifs.\n• Le démarrage effectif des travaux intervient dès validation du devis et réception de l’acompte convenu.\n• Sauf mention contraire, le budget média payé directement aux régies publicitaires (Meta, Google, TikTok) est distinct des honoraires de gestion et de création de l’agence.',
        },
        {
          title: '4. Collaboration et Engagements du Client',
          content:
            'Le Client s’engage à fournir dans les délais convenus l’ensemble des éléments, accès techniques et validations nécessaires à la bonne réalisation de la prestation. Le Client garantit détenir les droits sur tous les documents et éléments fournis à l’agence.',
        },
        {
          title: '5. Propriété Intellectuelle',
          content:
            '• L’ensemble du contenu du site www.wezomedia.ma est la propriété exclusive de WEZO MEDIA.\n• Le transfert des droits d’exploitation des livrables réalisés pour le Client prend effet après le règlement intégral des factures correspondantes.',
        },
        {
          title: '6. Responsabilité et Performances Publicitaires',
          content:
            'WEZO MEDIA est tenue à une obligation de moyens renforcée et met en œuvre son expertise pour optimiser le retour sur investissement du Client. Les résultats commerciaux finaux dépendent également de facteurs propres au Client (compétitivité de l’offre, qualité du service et réactivité commerciale dans le traitement des prospects).',
        },
        {
          title: '7. Droit Applicable et Juridiction',
          content:
            'Les présentes conditions sont soumises au droit marocain. En cas de litige non résolu à l’amiable, compétence expresse est attribuée aux tribunaux compétents de Casablanca.',
        },
      ]
    : [
        {
          title: '1. Acceptance of Terms',
          content:
            'By accessing and using the WEZO MEDIA website (www.wezomedia.ma) or engaging our digital agency services, you agree to be bound by these Terms and Conditions in accordance with the laws of the Kingdom of Morocco.',
        },
        {
          title: '2. Scope of Services',
          content:
            'WEZO MEDIA provides integrated digital marketing, web development, branding, and creative production services, including:\n• Digital strategy, paid acquisition management (Meta Ads & Google Ads), and conversion optimization.\n• Corporate websites, e-commerce stores, and high-converting landing pages.\n• Visual brand identity, commercial video production (Reels & UGC), and social media management.\n• AI automation, WhatsApp conversion flows, and CRM integrations.\n• Studio audio production, music arrangement, and digital artist services.',
        },
        {
          title: '3. Quotes, Proposals & Payment Terms',
          content:
            '• Every project is governed by a formal written quote or agreement detailing the scope of work, deliverables, timeline, and fees.\n• Project execution commences upon approval of the proposal and receipt of the agreed initial deposit.\n• Direct advertising media spend (paid to Meta, Google, or TikTok) is separate from agency management and production retainers unless explicitly stated otherwise.',
        },
        {
          title: '4. Client Responsibilities',
          content:
            'To ensure timely delivery, the Client agrees to provide required information, brand assets, technical access, and feedback promptly, and warrants ownership of any materials supplied to the Agency.',
        },
        {
          title: '5. Intellectual Property Rights',
          content:
            '• All content, design elements, and code on www.wezomedia.ma are the exclusive property of WEZO MEDIA.\n• Usage rights for custom client deliverables are transferred to the Client upon full settlement of all agreed project invoices.',
        },
        {
          title: '6. Marketing Performance Disclaimer',
          content:
            'WEZO MEDIA applies industry best practices and data-driven methodologies to maximize campaign performance. However, final commercial sales also depend on the Client’s product-market fit, pricing, and sales team responsiveness to generated leads.',
        },
        {
          title: '7. Governing Law & Jurisdiction',
          content:
            'These Terms and Conditions are governed by the laws of Morocco. Any dispute that cannot be resolved amicably shall fall under the exclusive jurisdiction of the courts of Casablanca.',
        },
      ]

  const address = isAr ? siteConfig.addressAr : isFr ? siteConfig.addressFr : siteConfig.addressEn

  return (
    <main className="min-h-screen pb-24 bg-brand-dark text-start">
      <section className="py-20 bg-brand-secondary/30 border-b border-white/5">
        <div className="container-custom text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-black uppercase tracking-widest">
            <FileText className="w-4 h-4" />
            <span>{isAr ? 'الإطار التعاقدي والقانوني' : isFr ? 'Cadre Légal & Contractuel' : 'Legal Framework'}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
            {isAr ? 'الشروط والأحكام' : isFr ? 'Conditions Générales' : 'Terms & Conditions'}
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

          {/* Contact Box */}
          <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border-brand-orange/20 bg-brand-orange/[0.03] space-y-6">
            <h2 className="text-2xl font-black text-white">
              {isAr ? 'معلومات التواصل الرسمية للوكالة' : isFr ? 'Coordonnées Officielles de l’Agence' : 'Official Agency Contact Information'}
            </h2>
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
            <div className="pt-4 border-t border-white/10 flex flex-wrap gap-6">
              <Link href="/privacy" className="text-brand-orange font-bold text-sm hover:underline">
                {isAr ? 'اطلع على سياسة الخصوصية ←' : isFr ? 'Consulter la Politique de Confidentialité →' : 'View Privacy Policy →'}
              </Link>
              <Link href="/get-quote" className="text-white font-bold text-sm hover:text-brand-orange transition-colors">
                {isAr ? 'اطلب عرض سعر لمشروعك ←' : isFr ? 'Demander un devis pour votre projet →' : 'Request a Project Quote →'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
