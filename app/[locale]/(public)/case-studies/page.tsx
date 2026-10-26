import { redirect } from '@/navigation'

interface Props {
  params: {
    locale: string
  }
}

export default function CaseStudiesRedirectPage({ params: { locale } }: Props) {
  redirect('/portfolio')
}
