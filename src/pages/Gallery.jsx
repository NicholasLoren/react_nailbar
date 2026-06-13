import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { useInView } from '../hooks/useInView'
import { galleryItems, galleryFilters, instagramGrid } from '../data/gallery'

// ─── Lightbox ────────────────────────────────────────────────────
function Lightbox({ items, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex)
  const prev = useCallback(() => setCurrent((c) => (c - 1 + items.length) % items.length), [items.length])
  const next = useCallback(() => setCurrent((c) => (c + 1) % items.length), [items.length])

  useEffect(() => {
    const fn = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', fn); document.body.style.overflow = '' }
  }, [onClose, prev, next])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(10,8,9,0.96)' }}
      onClick={onClose} role="dialog" aria-modal="true">
      <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
        <img src={items[current].image} alt={items[current].title}
          className="w-full max-h-[80vh] object-contain rounded-2xl" />
        <p className="text-center mt-5 text-sm font-display text-white/50">{items[current].title}</p>

        {/* Prev / Next */}
        {[{ fn: prev, d: 'M15 19l-7-7 7-7', side: 'left-0 -translate-x-14' }, { fn: next, d: 'M9 5l7 7-7 7', side: 'right-0 translate-x-14' }].map(({ fn, d, side }) => (
          <button key={d} onClick={fn} className={`absolute top-1/2 -translate-y-1/2 ${side} w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hidden sm:flex`}
            style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={d} /></svg>
          </button>
        ))}

        {/* Counter */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(0,0,0,0.5)', color: 'rgba(255,255,255,0.6)' }}>
          {current + 1} / {items.length}
        </div>
      </div>

      {/* Close */}
      <button onClick={onClose} aria-label="Close" className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(255,255,255,0.08)', color: '#fff' }}>
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

// ─── Gallery card ─────────────────────────────────────────────────
function GalleryCard({ item, index, onClick }) {
  const [ref, inView] = useInView()
  return (
    <button
      ref={ref}
      onClick={onClick}
      aria-label={`View ${item.title}`}
      className={`reveal-scale ${inView ? 'in-view' : ''} delay-${(index % 4) * 100 + 100} group relative overflow-hidden rounded-2xl img-shine focus:outline-none focus:ring-2 focus:ring-accent w-full`}
      style={{ aspectRatio: index % 5 === 0 ? '1/1' : '3/4' }}
    >
      <img src={item.image} alt={item.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-spring"
        loading="lazy" />
      <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{ background: 'linear-gradient(to top, rgba(10,8,9,0.8) 0%, transparent 60%)' }} />
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <p className="text-white text-sm font-display">{item.title}</p>
      </div>
    </button>
  )
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [lightbox, setLightbox] = useState(null)
  const [heroRef, heroInView] = useInView()

  const filtered = activeFilter === 'all' ? galleryItems : galleryItems.filter((i) => i.category === activeFilter)

  return (
    <>
      <Seo
        title="Gallery — Nail Art Portfolio"
        description="Browse our portfolio of stunning nail art, gel manicures, acrylic extensions, pedicures, lash extensions, and beauty work at The Nail Bar UG in Kampala."
        path="/gallery"
        image="https://thenailbarug.com/images/12.jpg"
      />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-20 overflow-hidden" style={{ background: 'var(--bg)' }}>
        <div ref={heroRef} className="max-w-5xl mx-auto px-6 lg:px-12">
          <p className={`reveal ${heroInView ? 'in-view' : ''} text-xs tracking-[0.25em] uppercase font-medium mb-6`} style={{ color: 'var(--accent)' }}>Our Portfolio</p>
          <h1 className={`reveal-left ${heroInView ? 'in-view' : ''} font-display text-6xl sm:text-8xl leading-[0.9] mb-10`} style={{ color: 'var(--text-1)' }}>
            Our<br /><em className="text-gradient not-italic">Work</em>
          </h1>
          <p className={`reveal delay-200 ${heroInView ? 'in-view' : ''} text-lg max-w-lg leading-relaxed`} style={{ color: 'var(--text-2)' }}>
            Browse our portfolio of nail art, extensions, and beauty treatments — each piece a testament to our craft.
          </p>
        </div>
      </section>

      {/* ── FILTER TABS ───────────────────────────────────────────── */}
      <div className="sticky top-20 z-30 border-b" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {galleryFilters.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className="shrink-0 px-5 py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-200"
              style={activeFilter === key
                ? { background: 'var(--accent)', color: '#fff' }
                : { background: 'var(--bg-muted)', color: 'var(--text-3)' }
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── GALLERY GRID ──────────────────────────────────────────── */}
      <section className="py-20" style={{ background: 'var(--bg-elevated)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {filtered.length === 0 ? (
            <p className="text-center py-24 text-sm" style={{ color: 'var(--text-3)' }}>No items in this category yet.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {filtered.map((item, i) => (
                <GalleryCard key={`${item.image}-${i}`} item={item} index={i} onClick={() => setLightbox({ items: filtered, index: i })} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── INSTAGRAM FEED ────────────────────────────────────────── */}
      <section className="py-28" style={{ background: 'var(--bg)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.25em] uppercase font-medium mb-4" style={{ color: 'var(--accent)' }}>Follow Along</p>
            <h2 className="font-display text-4xl sm:text-5xl mb-3" style={{ color: 'var(--text-1)' }}>@the_nail_bar_ug</h2>
            <a href="https://www.instagram.com/the_nail_bar_ug" target="_blank" rel="noopener noreferrer"
              className="text-xs tracking-widest uppercase font-medium transition-opacity hover:opacity-60"
              style={{ color: 'var(--accent)' }}>
              Follow on Instagram →
            </a>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
            {instagramGrid.map((src, i) => (
              <a key={i} href="https://www.instagram.com/the_nail_bar_ug" target="_blank" rel="noopener noreferrer"
                className="aspect-square overflow-hidden rounded-xl img-shine">
                <img src={src} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" loading="lazy" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-28 text-center" style={{ background: 'var(--bg-muted)' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <p className="text-xs tracking-[0.25em] uppercase font-medium mb-6" style={{ color: 'var(--accent)' }}>Love What You See?</p>
          <h2 className="font-display text-5xl sm:text-6xl mb-8" style={{ color: 'var(--text-1)' }}>
            Let Us Create<br />Something for You
          </h2>
          <Link to="/contact" className="inline-flex items-center gap-3 px-9 py-5 rounded-full text-white text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95"
            style={{ background: 'var(--accent)' }}>
            Book an Appointment
          </Link>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && <Lightbox items={lightbox.items} startIndex={lightbox.index} onClose={() => setLightbox(null)} />}
    </>
  )
}
