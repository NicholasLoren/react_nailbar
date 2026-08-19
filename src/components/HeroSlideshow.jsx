import { useState, useEffect, useRef } from 'react'

const images = [
  '/images/gold-charm-nude-nails-01.jpg',
  '/images/red-french-tip-chrome-01.jpg',
  '/images/white-glitter-french-ombre-01.jpg',
  '/images/burgundy-pink-floral-nails.jpg',
  '/images/green-gold-chrome-nails.jpg',
  '/images/red-stiletto-3d-flower-nails.jpg',
  '/images/french-white-gold-floral-01.jpg',
  '/images/nude-gold-outline-heart-nails.jpg',
  '/images/blush-pink-dotted-ombre-nails.jpg',
  '/images/white-french-3d-flower-01.jpg',
]
const AUTOPLAY_MS = 5000
const SWIPE_THRESHOLD = 60

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const startXRef = useRef(0)
  const offsetRef = useRef(0)
  const draggingRef = useRef(false)

  const goTo = (i) => setCurrent((i + images.length) % images.length)
  const next = () => goTo(current + 1)
  const prev = () => goTo(current - 1)

  // Restarts on every navigation — auto or manual — so a swipe or arrow
  // click always gets a full AUTOPLAY_MS before the next auto-advance.
  useEffect(() => {
    if (isDragging) return
    const timer = setInterval(() => setCurrent((c) => (c + 1) % images.length), AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [current, isDragging])

  // Drag bookkeeping lives in refs, not state — pointerdown/move/up can fire
  // faster than a state update commits, and reading stale state here would
  // drop the tail end of a fast swipe.
  const onPointerDown = (e) => {
    draggingRef.current = true
    startXRef.current = e.clientX
    offsetRef.current = 0
    setIsDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e) => {
    if (!draggingRef.current) return
    offsetRef.current = e.clientX - startXRef.current
    setDragOffset(offsetRef.current)
  }
  const endDrag = () => {
    if (!draggingRef.current) return
    draggingRef.current = false
    const offset = offsetRef.current
    if (offset <= -SWIPE_THRESHOLD) next()
    else if (offset >= SWIPE_THRESHOLD) prev()
    offsetRef.current = 0
    setDragOffset(0)
    setIsDragging(false)
  }

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden hero-image">
      {/* Swipeable track */}
      <div
        className="absolute inset-0 flex h-full cursor-grab active:cursor-grabbing select-none"
        style={{
          touchAction: 'pan-y',
          transform: `translateX(calc(${-current * 100}% + ${dragOffset}px))`,
          transition: isDragging ? 'none' : 'transform 0.7s cubic-bezier(.22,1,.36,1)',
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
      >
        {images.map((src, i) => (
          <div key={src} className="w-full h-full flex-shrink-0">
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover pointer-events-none"
              draggable={false}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

      {/* Prev / Next arrows */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="glass absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full items-center justify-center transition-all duration-200 hover:scale-110 hidden sm:flex"
        style={{ color: 'var(--text-1)' }}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="glass absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full items-center justify-center transition-all duration-200 hover:scale-110 hidden sm:flex"
        style={{ color: 'var(--text-1)' }}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className="transition-all duration-500 rounded-full bg-white"
            style={{
              width: i === current ? '24px' : '6px',
              height: '6px',
              opacity: i === current ? 1 : 0.45,
            }}
          />
        ))}
      </div>
    </div>
  )
}
