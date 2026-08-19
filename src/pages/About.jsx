import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { useInView } from '../hooks/useInView'
import { pageSeo } from '../data/seo'

const values = [
  { title: 'Excellence', desc: 'The highest standards in every stroke, every finish, every detail.' },
  { title: 'Creativity', desc: 'Your nails are a canvas. We push boundaries with innovative artistry.' },
  { title: 'Luxury', desc: 'Premium products, serene atmosphere, an experience beyond ordinary.' },
  { title: 'Hygiene', desc: 'Strict sterilisation protocols. Your health is always the priority.' },
  { title: 'Personalization', desc: 'Every client is unique. We tailor every service to your vision.' },
  { title: 'Relaxation', desc: 'Step away from the hustle into a sanctuary designed for you.' },
]

function SectionLabel({ children }) {
  return <p className="text-xs tracking-[0.25em] uppercase font-medium mb-6" style={{ color: 'var(--accent)' }}>{children}</p>
}

function ValueCard({ title, desc, index }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'in-view' : ''} delay-${(index % 3) * 100 + 100} p-8 rounded-2xl border group hover:-translate-y-1 transition-transform duration-300`}
      style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)' }}
    >
      <div className="w-10 h-10 rounded-xl mb-6 flex items-center justify-center" style={{ background: 'var(--accent-muted)' }}>
        <div className="w-3 h-3 rounded-full" style={{ background: 'var(--accent)' }} />
      </div>
      <h3 className="font-display text-2xl mb-3" style={{ color: 'var(--text-1)' }}>{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-3)' }}>{desc}</p>
    </div>
  )
}

export default function About() {
  const [heroRef, heroInView] = useInView()
  const [whyRef, whyInView] = useInView()

  const whyUs = [
    ['Premium Products', 'Only the finest brands, carefully curated for quality and safety.'],
    ['Expert Technicians', 'Highly trained artists who are passionate about their craft.'],
    ['Hygiene Standards', 'Strict sterilisation protocols, clean tools, every time.'],
    ['Relaxing Environment', 'A calm, beautiful space designed for your total comfort.'],
    ['Affordable Luxury', 'Premium experiences at prices that welcome everyone.'],
    ['Custom Designs', 'From timeless classics to bold avant-garde, we make it yours.'],
  ]

  return (
    <>
      <Seo path="/about" {...pageSeo['/about']} />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-28 overflow-hidden" style={{ background: 'var(--bg)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: 'var(--accent)' }} />
        </div>
        <div ref={heroRef} className="max-w-5xl mx-auto px-6 lg:px-12">
          <SectionLabel>Our Story</SectionLabel>
          <h1 className={`reveal-left ${heroInView ? 'in-view' : ''} font-display text-6xl sm:text-8xl leading-[0.9] mb-10`} style={{ color: 'var(--text-1)' }}>
            About<br />The Nail<br /><em className="text-gradient not-italic">Bar UG</em>
          </h1>
          <p className={`reveal-left delay-200 ${heroInView ? 'in-view' : ''} text-lg max-w-xl leading-relaxed`} style={{ color: 'var(--text-2)' }}>
            Kampala's premier destination for luxury nail care, where passion, precision, and artistry come together.
          </p>
        </div>
      </section>

      {/* ── STORY ─────────────────────────────────────────────────── */}
      <section className="py-28" style={{ background: 'var(--bg-elevated)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <SectionLabel>How It Started</SectionLabel>
            <h2 className="font-display text-5xl mb-8 leading-tight" style={{ color: 'var(--text-1)' }}>Passion Meets Craft</h2>
            <div className="space-y-6 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
              <p>The Nail Bar UG was born from a deep passion for beauty and a vision to bring world-class nail care to Kampala. Nestled in The Cube on the First Floor, we created a sanctuary where every client is treated like royalty.</p>
              <p>Our skilled technicians combine artistry with technical precision, offering everything from classic manicures to intricate nail art. We believe beautiful nails are not a luxury. They're a form of self-care every person deserves.</p>
              <p>Since opening our doors, we've served hundreds of delighted clients, building a reputation for excellence, creativity, and unmatched attention to detail. Every visit is a journey into luxury.</p>
            </div>
            <Link to="/contact" className="inline-flex items-center gap-3 mt-10 px-7 py-4 rounded-full text-white text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ background: 'var(--accent)' }}>
              Book an Appointment
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <img src="/images/5.jpg" alt="Our story" className="rounded-2xl w-full h-72 object-cover" loading="lazy" />
            <img src="/images/7.jpg" alt="Our craft" className="rounded-2xl w-full h-72 object-cover mt-12" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ── VALUES ────────────────────────────────────────────────── */}
      <section className="py-28" style={{ background: 'var(--bg)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <SectionLabel>What Drives Us</SectionLabel>
            <h2 className="font-display text-5xl sm:text-6xl" style={{ color: 'var(--text-1)' }}>Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v, i) => <ValueCard key={v.title} {...v} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── WHY US ────────────────────────────────────────────────── */}
      <section ref={whyRef} className="py-28" style={{ background: 'var(--bg-elevated)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <SectionLabel>The Difference</SectionLabel>
              <h2 className="font-display text-5xl sm:text-6xl leading-tight" style={{ color: 'var(--text-1)' }}>
                Why Choose<br />The Nail Bar
              </h2>
            </div>
            <div className="space-y-8">
              {whyUs.map(([title, desc], i) => (
                <div
                  key={title}
                  className={`reveal ${whyInView ? 'in-view' : ''} delay-${(i % 4) * 100 + 100} flex gap-5 pb-8 border-b last:border-0 last:pb-0`}
                  style={{ borderColor: 'var(--border)' }}
                >
                  <span className="font-display text-3xl shrink-0 w-10 text-right" style={{ color: 'var(--accent)', lineHeight: 1 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-semibold mb-2 text-sm" style={{ color: 'var(--text-1)' }}>{title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-3)' }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────── */}
      <section className="py-28" style={{ background: 'var(--bg-muted)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <SectionLabel>Happy Clients</SectionLabel>
            <h2 className="font-display text-5xl sm:text-6xl" style={{ color: 'var(--text-1)' }}>What They Say</h2>
          </div>
          <div className="commonninja_component pid-c7da764f-ee06-4eb8-a556-f22207500989" />
        </div>
      </section>
    </>
  )
}
