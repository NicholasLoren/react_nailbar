import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import HeroSlideshow from '../components/HeroSlideshow'
import { useInView } from '../hooks/useInView'

// ─── Marquee strip ───────────────────────────────────────────────
const marqueeItems = ['Manicures', 'Pedicures', 'Acrylic Nails', 'Nail Art', 'Gel Nails', 'Lash Extensions', 'Eyebrow Shaping', 'Ombre Nails']

function MarqueeStrip() {
  const doubled = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems]
  return (
    <div className="overflow-hidden py-5 border-y" style={{ borderColor: 'var(--border)', background: 'var(--bg-muted)' }}>
      <div className="flex whitespace-nowrap marquee-track gap-0">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-6 text-xs font-semibold tracking-[0.25em] uppercase" style={{ color: 'var(--text-3)' }}>
            {item}
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--accent)' }} />
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Stat card ───────────────────────────────────────────────────
function StatCard({ value, label, delay }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className={`reveal ${inView ? 'in-view' : ''} ${delay}`}>
      <p className="font-display text-5xl lg:text-6xl font-light text-gradient mb-1">{value}</p>
      <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--text-3)' }}>{label}</p>
    </div>
  )
}

// ─── Service preview card ────────────────────────────────────────
function FeaturedServiceCard({ title, subtitle, image, delay }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className={`reveal ${inView ? 'in-view' : ''} ${delay} group relative overflow-hidden rounded-2xl img-shine`} style={{ aspectRatio: '3/4' }}>
      <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-spring" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p className="text-xs tracking-[0.2em] uppercase mb-2 font-medium" style={{ color: 'var(--accent)' }}>{subtitle}</p>
        <h3 className="font-display text-2xl text-white mb-3">{title}</h3>
        <Link to="/services" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-xs tracking-widest uppercase font-medium transition-all duration-300 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
          Explore <span>→</span>
        </Link>
      </div>
    </div>
  )
}

const featuredServices = [
  { title: 'Manicures', subtitle: 'Beauty Bliss', image: '/images/14.jpg' },
  { title: 'Pedicures', subtitle: 'Glamour Touch', image: '/images/4.jpg' },
  { title: 'Acrylic Nails', subtitle: 'Luxury Extensions', image: '/images/3.jpg' },
]

// ─── Gallery preview ─────────────────────────────────────────────
const galleryPreview = [
  '/images/1.jpg', '/images/2.jpg', '/images/6.jpg',
  '/images/8.jpg', '/images/12.jpg', '/images/15.jpg',
]

export default function Home() {
  const [storyRef, storyInView] = useInView()
  const [statsRef, statsInView] = useInView()
  const [galleryRef, galleryInView] = useInView()
  const [ctaRef, ctaInView] = useInView()

  return (
    <>
      <Helmet>
        <title>Home — The Nail Bar UG</title>
        <meta name="description" content="Experience luxury nail care at The Nail Bar UG. Professional manicures, pedicures, acrylic nails, and beauty treatments in Kampala." />
      </Helmet>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'var(--bg)' }}>
        {/* Decorative circles */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.07] pointer-events-none" style={{ background: 'radial-gradient(circle, var(--accent), transparent 70%)' }} />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full opacity-[0.05] pointer-events-none" style={{ background: 'radial-gradient(circle, var(--gold), transparent 70%)' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full pt-28 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <div className="hero-text-1 inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8 text-xs font-medium tracking-widest uppercase" style={{ background: 'var(--accent-muted)', color: 'var(--accent)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
              Kampala's Premier Nail Salon
            </div>

            <h1 className="hero-text-2 font-display text-6xl sm:text-7xl lg:text-8xl leading-[0.95] mb-8" style={{ color: 'var(--text-1)' }}>
              Where<br />
              <em className="text-gradient not-italic">Beauty</em><br />
              Meets Art
            </h1>

            <p className="hero-text-3 text-base leading-relaxed mb-10 max-w-md" style={{ color: 'var(--text-2)' }}>
              Step into a world of luxury nail care. Expert technicians, premium products, and stunning results — every single visit.
            </p>

            <div className="hero-text-3 flex flex-wrap gap-4">
              <Link
                to="/services"
                className="inline-flex items-center gap-3 px-7 py-4 rounded-full text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                style={{ background: 'var(--accent)', boxShadow: '0 8px 30px rgba(196,154,138,0.35)' }}
              >
                Explore Services
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-7 py-4 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 border"
                style={{ borderColor: 'var(--border)', color: 'var(--text-1)' }}
              >
                Book Now
              </Link>
            </div>
          </div>

          {/* Slideshow + floating badges */}
          <div className="relative hero-image">
            <div className="relative h-[520px] sm:h-[580px]">
              <HeroSlideshow />
            </div>

            {/* Floating badge 1 */}
            <div className="float absolute -left-6 top-1/4 glass rounded-2xl px-5 py-4 shadow-xl hidden sm:block" style={{ minWidth: '160px' }}>
              <p className="font-display text-3xl font-light" style={{ color: 'var(--accent)' }}>500+</p>
              <p className="text-xs tracking-widest uppercase mt-1" style={{ color: 'var(--text-3)' }}>Happy Clients</p>
            </div>

            {/* Floating badge 2 */}
            <div className="float-delay absolute -right-4 bottom-1/4 glass rounded-2xl px-5 py-4 shadow-xl hidden sm:block">
              <div className="flex items-center gap-2 mb-1">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="h-3 w-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className="text-xs font-medium" style={{ color: 'var(--text-1)' }}>Top Rated Salon</p>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hero-text-3">
          <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--text-3)' }}>Scroll</p>
          <div className="w-px h-12 overflow-hidden" style={{ background: 'var(--border)' }}>
            <div className="w-full h-1/2 animate-bounce" style={{ background: 'var(--accent)' }} />
          </div>
        </div>
      </section>

      {/* ── MARQUEE ───────────────────────────────────────────────── */}
      <MarqueeStrip />

      {/* ── SERVICES PREVIEW ──────────────────────────────────────── */}
      <section className="py-32" style={{ background: 'var(--bg)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-xs tracking-[0.25em] uppercase font-medium mb-4" style={{ color: 'var(--accent)' }}>What We Offer</p>
              <h2 className="font-display text-5xl sm:text-6xl leading-tight" style={{ color: 'var(--text-1)' }}>Our<br />Services</h2>
            </div>
            <Link to="/services" className="inline-flex items-center gap-2 text-sm font-medium tracking-wide transition-opacity hover:opacity-60 shrink-0" style={{ color: 'var(--text-2)' }}>
              View all services <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {featuredServices.map((s, i) => (
              <FeaturedServiceCard key={s.title} {...s} delay={`delay-${(i + 1) * 100}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ── STORY / ABOUT ─────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg-elevated)' }} className="py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div ref={storyRef} className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Image collage */}
            <div className={`reveal-left ${storyInView ? 'in-view' : ''} relative`}>
              <div className="grid grid-cols-2 gap-3">
                <img src="/images/5.jpg" alt="Our story" className="rounded-2xl w-full h-64 object-cover" loading="lazy" />
                <img src="/images/7.jpg" alt="Our craft" className="rounded-2xl w-full h-64 object-cover mt-10" loading="lazy" />
                <img src="/images/31.jpg" alt="Our quality" className="rounded-2xl w-full h-48 object-cover" loading="lazy" />
                <img src="/images/42.jpg" alt="Our team" className="rounded-2xl w-full h-48 object-cover mt-6" loading="lazy" />
              </div>
              {/* Decorative label */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 glass rounded-2xl px-6 py-4 text-center shadow-xl w-44">
                <p className="font-display text-2xl font-light" style={{ color: 'var(--accent)' }}>Est.</p>
                <p className="font-display text-4xl" style={{ color: 'var(--text-1)' }}>2020</p>
              </div>
            </div>

            {/* Text */}
            <div className={`reveal-right ${storyInView ? 'in-view' : ''}`}>
              <p className="text-xs tracking-[0.25em] uppercase font-medium mb-6" style={{ color: 'var(--accent)' }}>Our Story</p>
              <h2 className="font-display text-5xl sm:text-6xl mb-8 leading-tight" style={{ color: 'var(--text-1)' }}>
                Passion<br />Meets Craft
              </h2>
              <div className="space-y-5 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
                <p>The Nail Bar UG was born from a deep love of beauty and a mission to bring world-class nail artistry to Kampala. Nestled in The Cube, we created a sanctuary where every client is treated like royalty.</p>
                <p>Our expert technicians blend artistry with precision, delivering experiences that go beyond aesthetics — they refresh the soul. From classic manicures to avant-garde nail art, your vision is our canvas.</p>
              </div>
              <div className="mt-10 pt-10 flex gap-12 border-t" style={{ borderColor: 'var(--border)' }}>
                {[['500+', 'Happy Clients'], ['6+', 'Services Offered'], ['7', 'Days a Week']].map(([v, l]) => (
                  <div key={l}>
                    <p className="font-display text-4xl text-gradient">{v}</p>
                    <p className="text-xs tracking-widest uppercase mt-1" style={{ color: 'var(--text-3)' }}>{l}</p>
                  </div>
                ))}
              </div>
              <Link to="/about" className="inline-flex items-center gap-3 mt-10 text-sm font-medium tracking-wide group" style={{ color: 'var(--accent)' }}>
                Read our full story
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY PREVIEW ───────────────────────────────────────── */}
      <section className="py-32" style={{ background: 'var(--bg)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.25em] uppercase font-medium mb-4" style={{ color: 'var(--accent)' }}>Our Portfolio</p>
            <h2 className="font-display text-5xl sm:text-6xl" style={{ color: 'var(--text-1)' }}>Recent Work</h2>
          </div>

          <div ref={galleryRef} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {galleryPreview.map((src, i) => (
              <div
                key={src}
                className={`reveal-scale ${galleryInView ? 'in-view' : ''} delay-${(i % 3 + 1) * 100} group overflow-hidden rounded-2xl img-shine`}
                style={{ aspectRatio: i === 0 || i === 5 ? '1/1' : '4/5' }}
              >
                <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-spring" loading="lazy" />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
            >
              View Full Gallery
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section ref={ctaRef} className="relative py-40 overflow-hidden" style={{ background: 'var(--bg-muted)' }}>
        {/* Large decorative text */}
        <p className="absolute inset-0 flex items-center justify-center font-display text-[20vw] font-light opacity-[0.04] select-none pointer-events-none leading-none whitespace-nowrap" style={{ color: 'var(--text-1)' }}>
          LUXURY
        </p>

        <div className={`relative max-w-4xl mx-auto px-6 lg:px-12 text-center reveal ${ctaInView ? 'in-view' : ''}`}>
          <p className="text-xs tracking-[0.25em] uppercase font-medium mb-6" style={{ color: 'var(--accent)' }}>Ready?</p>
          <h2 className="font-display text-5xl sm:text-7xl mb-8 leading-tight" style={{ color: 'var(--text-1)' }}>
            Experience<br />
            <em className="text-gradient not-italic">True Luxury</em>
          </h2>
          <p className="text-base mb-12 max-w-lg mx-auto" style={{ color: 'var(--text-2)' }}>
            Join hundreds of clients who trust The Nail Bar UG for their most important moments.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-9 py-5 rounded-full text-white text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
              style={{ background: 'var(--accent)', boxShadow: '0 10px 40px rgba(196,154,138,0.4)' }}
            >
              Book Your Appointment
            </Link>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-3 px-9 py-5 rounded-full text-sm font-semibold tracking-wide border transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ borderColor: 'var(--border)', color: 'var(--text-2)' }}
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
