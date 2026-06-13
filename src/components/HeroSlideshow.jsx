import { useState, useEffect } from 'react'

const images = Array.from({ length: 10 }, (_, i) => `/images/${i + 1}.jpg`)

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => {
        setPrev(c)
        return (c + 1) % images.length
      })
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden hero-image">
      {/* All images stacked, only current + prev visible */}
      {images.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => { setPrev(current); setCurrent(i) }}
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
