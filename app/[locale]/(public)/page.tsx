import Hero from '@/components/public/Hero'
import Stats from '@/components/public/Stats'
import ServicesGrid from '@/components/public/ServicesGrid'
import WorkProcess from '@/components/public/WorkProcess'
import Portfolio from '@/components/public/Portfolio'
import Team from '@/components/public/Team'
import Testimonials from '@/components/public/Testimonials'
import FinalCTA from '@/components/public/CTA'

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <Hero />
      <Stats />
      <ServicesGrid />
      <WorkProcess />
      <Portfolio />
      <Team />
      <Testimonials />
      <FinalCTA />
    </main>
  )
}
