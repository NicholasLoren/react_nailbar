import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { useInView } from '../hooks/useInView'
import { services } from '../data/services'

function SectionLabel({ children }) {
  return <p className="text-xs tracking-[0.25em] uppercase font-medium mb-6" style={{ color: 'var(--accent)' }}>{children}</p>
}

function ServiceRow({ title, subtitle, description, features, image, reverse, index }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20 border-b last:border-0 ${reverse ? 'lg:grid-flow-dense' : ''}`}
      style={{ borderColor: 'var(--border)' }}>
      {/* Image */}
      <div className={`${reverse ? 'lg:col-start-2' : ''} reveal-scale ${inView ? 'in-view' : ''} overflow-hidden rounded-3xl img-shine`}
        style={{ aspectRatio: '4/3' }}>
        <img src={image} alt={title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-spring" loading="lazy" />
      </div>

      {/* Text */}
      <div className={`${reverse ? 'lg:col-start-1 lg:row-start-1' : ''} reveal ${inView ? 'in-view' : ''} delay-200`}>
        <SectionLabel>{subtitle}</SectionLabel>
        <h2 className="font-display text-5xl sm:text-6xl mb-6 leading-tight" style={{ color: 'var(--text-1)' }}>{title}</h2>
        <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--text-2)' }}>{description}</p>
        <ul className="space-y-3 mb-10">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-2)' }}>
              <span className="w-4 h-px flex-shrink-0" style={{ background: 'var(--accent)' }} />
              {f}
            </li>
          ))}
        </ul>
        <Link to="/contact"
          className="inline-flex items-center gap-3 px-7 py-4 rounded-full text-white text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95"
          style={{ background: 'var(--accent)' }}>
          Book This Service
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

const pricingFeatures = [
  { title: 'Transparent Pricing', desc: 'No hidden fees — all prices clearly communicated before we begin.' },
  { title: 'Package Deals', desc: 'Save more with combo bundles. Mani + pedi packages for the full treat.' },
  { title: 'Loyalty Rewards', desc: 'Earn points with every visit, redeemable for free services and upgrades.' },
]

export default function Services() {
  const [heroRef, heroInView] = useInView()
  const [pricingRef, pricingInView] = useInView()

  return (
    <>
      <Seo
        title="Nail Services — Manicures, Pedicures, Acrylics & More"
        description="Discover our full range of luxury nail services in Kampala: manicures, pedicures, acrylic nails, gel builder nails, ombre nails, eyelash extensions, and eyebrow shaping."
        path="/services"
        image="https://thenailbarug.com/images/31.jpg"
      />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-20 overflow-hidden" style={{ background: 'var(--bg)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-[0.06] blur-3xl" style={{ background: 'var(--gold)' }} />
        </div>
        <div ref={heroRef} className="max-w-5xl mx-auto px-6 lg:px-12">
          <p className={`reveal ${heroInView ? 'in-view' : ''} text-xs tracking-[0.25em] uppercase font-medium mb-6`} style={{ color: 'var(--accent)' }}>
            What We Offer
          </p>
          <h1 className={`reveal-left ${heroInView ? 'in-view' : ''} font-display text-6xl sm:text-8xl leading-[0.9] mb-10`} style={{ color: 'var(--text-1)' }}>
            Our<br /><em className="text-gradient not-italic">Services</em>
          </h1>
          <p className={`reveal delay-200 ${heroInView ? 'in-view' : ''} text-lg max-w-xl leading-relaxed`} style={{ color: 'var(--text-2)' }}>
            From classic elegance to bold artistry — a complete range of luxury nail and beauty services tailored entirely to you.
          </p>
        </div>
      </section>

      {/* ── SERVICE ROWS ──────────────────────────────────────────── */}
      <section className="py-8" style={{ background: 'var(--bg-elevated)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {services.map((s, i) => <ServiceRow key={s.title} {...s} index={i} />)}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, var(--bg-muted) 0%, var(--bg-elevated) 100%)' }} />
        <div className="absolute right-0 top-0 w-80 h-80 rounded-full opacity-20 blur-3xl" style={{ background: 'var(--accent)' }} />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-xs tracking-[0.25em] uppercase font-medium mb-6" style={{ color: 'var(--accent)' }}>Ready?</p>
          <h2 className="font-display text-5xl sm:text-7xl mb-8 leading-tight" style={{ color: 'var(--text-1)' }}>
            Ready to Indulge?
          </h2>
          <p className="mb-12 max-w-md mx-auto text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
            Book your appointment and let our expert technicians transform your look.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-3 px-9 py-5 rounded-full text-white text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
            style={{ background: 'var(--accent)', boxShadow: '0 10px 40px rgba(196,154,138,0.4)' }}>
            Book Now
          </Link>
        </div>
      </section>

      {/* ── PRICING INFO ──────────────────────────────────────────── */}
      <section ref={pricingRef} className="py-28" style={{ background: 'var(--bg)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.25em] uppercase font-medium mb-4" style={{ color: 'var(--accent)' }}>Pricing</p>
            <h2 className="font-display text-5xl sm:text-6xl" style={{ color: 'var(--text-1)' }}>Fair & Transparent</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {pricingFeatures.map(({ title, desc }, i) => (
              <div key={title} className={`reveal ${pricingInView ? 'in-view' : ''} delay-${(i + 1) * 100} p-10 rounded-3xl text-center`}
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
                <div className="w-14 h-14 mx-auto rounded-2xl mb-7 flex items-center justify-center" style={{ background: 'var(--accent-muted)' }}>
                  <div className="w-4 h-4 rounded-full" style={{ background: 'var(--accent)' }} />
                </div>
                <h3 className="font-display text-2xl mb-4" style={{ color: 'var(--text-1)' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-3)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
