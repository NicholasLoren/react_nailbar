import { useState } from 'react'
import Seo from '../components/Seo'
import emailjs from '@emailjs/browser'
import { useInView } from '../hooks/useInView'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'

const serviceOptions = ['Manicure','Pedicure','Acrylic Nails','Artificial Nails','Gel Builder Nails','Ombre Nails','Eyelashes','Eyebrow Shaping','Consultation']
const timeOptions = ['9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM','8:00 PM']
const todayDate = new Date().toISOString().split('T')[0]
const initialForm = { name: '', email: '', phone: '', service: '', date: '', time: '', message: '' }

const contactInfo = [
  {
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>,
    label: 'Location', value: 'The Cube, First Floor\nKampala, Uganda',
  },
  {
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>,
    label: 'Phone', value: '+256 772 054 361', href: 'tel:+256772054361',
  },
  {
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>,
    label: 'Email', value: 'info@thenailbarug.com', href: 'mailto:info@thenailbarug.com',
  },
  {
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
    label: 'Hours', value: 'Mon – Sun · 9:00 AM – 8:00 PM',
  },
]

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [heroRef, heroInView] = useInView()
  const [formRef, formInView] = useInView()

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (honeypot) { setStatus('success'); return } // silent bot reject
    setStatus('sending'); setErrorMsg('')
    try {
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          reply_to: form.email,
          phone: form.phone,
          service: form.service,
          preferred_date: form.date,
          preferred_time: form.time,
          message: form.message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      )
      console.log('EmailJS success:', result)
      setStatus('success')
      setForm(initialForm)
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
      setErrorMsg(
        err?.text
          ? `EmailJS: ${err.text}`
          : 'Something went wrong. Please try again or call us directly.'
      )
    }
  }

  const field = 'w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200 border focus:border-accent'
  const fieldStyle = { background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text-1)' }
  const labelStyle = { color: 'var(--text-2)' }

  return (
    <>
      <Seo
        title="Book an Appointment"
        description="Book your nail appointment at The Nail Bar UG in Kampala. Call +256 772 054 361 or fill out our online form. Open 7 days a week, 9 AM – 8 PM."
        path="/contact"
      />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-20 overflow-hidden" style={{ background: 'var(--bg)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-[0.06] blur-3xl" style={{ background: 'var(--accent)' }} />
        </div>
        <div ref={heroRef} className="max-w-5xl mx-auto px-6 lg:px-12">
          <p className={`reveal ${heroInView ? 'in-view' : ''} text-xs tracking-[0.25em] uppercase font-medium mb-6`} style={{ color: 'var(--accent)' }}>Get in Touch</p>
          <h1 className={`reveal-left ${heroInView ? 'in-view' : ''} font-display text-6xl sm:text-8xl leading-[0.9] mb-10`} style={{ color: 'var(--text-1)' }}>
            Book Your<br /><em className="text-gradient not-italic">Appointment</em>
          </h1>
          <p className={`reveal delay-200 ${heroInView ? 'in-view' : ''} text-lg max-w-lg leading-relaxed`} style={{ color: 'var(--text-2)' }}>
            Ready to treat yourself? Fill out the form below and we'll confirm your booking within 24 hours.
          </p>
        </div>
      </section>

      {/* ── CONTENT ───────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: 'var(--bg-elevated)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* ── Booking form ────── */}
            <div ref={formRef} className={`reveal ${formInView ? 'in-view' : ''} rounded-3xl p-8 sm:p-10`}
              style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
              <h2 className="font-display text-3xl mb-8" style={{ color: 'var(--text-1)' }}>Send a Message</h2>

              {status === 'success' ? (
                /* ── Success state ── */
                <div className="text-center py-20 animate-fade-in">
                  <div className="relative w-24 h-24 mx-auto mb-8">
                    {/* Pulsing ring */}
                    <span className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: 'var(--accent)' }} />
                    <div className="relative w-24 h-24 rounded-full flex items-center justify-center" style={{ background: 'var(--accent-muted)' }}>
                      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: 'var(--accent)' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="font-display text-4xl mb-3" style={{ color: 'var(--text-1)' }}>Message Sent!</h3>
                  <p className="text-sm leading-relaxed mb-8 max-w-xs mx-auto" style={{ color: 'var(--text-2)' }}>
                    Thank you! We'll confirm your appointment within 24 hours. See you soon.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-7 py-3 rounded-full text-sm font-semibold border transition-all duration-200 hover:scale-105"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-2)' }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                /* ── Form ── */
                <div className="relative">
                  {/* Sending overlay */}
                  {status === 'sending' && (
                    <div className="absolute inset-0 z-10 rounded-2xl flex flex-col items-center justify-center gap-5"
                      style={{ background: 'var(--bg)', opacity: 0.95 }}>
                      {/* Orbital spinner */}
                      <div className="relative w-16 h-16">
                        <svg className="w-16 h-16 animate-spin" viewBox="0 0 64 64" fill="none">
                          <circle cx="32" cy="32" r="28" stroke="var(--border)" strokeWidth="4" />
                          <path d="M32 4a28 28 0 0 1 28 28" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }} />
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="font-display text-xl mb-1" style={{ color: 'var(--text-1)' }}>Sending…</p>
                        <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--text-3)' }}>Please wait a moment</p>
                      </div>
                    </div>
                  )}

                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="transition-opacity duration-300"
                    style={{ opacity: status === 'sending' ? 0.15 : 1, pointerEvents: status === 'sending' ? 'none' : 'auto' }}
                  >
                    {/* Honeypot */}
                    {/* Honeypot — moved off-screen via inline style so autofill ignores it */}
                    <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
                      <input
                        type="text"
                        name="b_address"
                        tabIndex={-1}
                        autoComplete="nope"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {[
                        { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Jane Doe', required: true },
                        { id: 'email', label: 'Email Address', type: 'email', placeholder: 'jane@example.com', required: true },
                        { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+256 700 000 000' },
                      ].map(({ id, label, type, placeholder, required }) => (
                        <div key={id}>
                          <label htmlFor={id} className="block text-xs font-medium tracking-wide mb-2 uppercase" style={labelStyle}>
                            {label} {required && <span style={{ color: 'var(--accent)' }}>*</span>}
                          </label>
                          <input id={id} name={id} type={type} required={required} placeholder={placeholder}
                            className={field} style={fieldStyle} value={form[id]} onChange={handleChange} />
                        </div>
                      ))}

                      <div>
                        <label htmlFor="service" className="block text-xs font-medium tracking-wide mb-2 uppercase" style={labelStyle}>Service</label>
                        <select id="service" name="service" className={field} style={fieldStyle} value={form.service} onChange={handleChange}>
                          <option value="">Select…</option>
                          {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="date" className="block text-xs font-medium tracking-wide mb-2 uppercase" style={labelStyle}>Preferred Date</label>
                        <input id="date" name="date" type="date" min={todayDate} className={field} style={fieldStyle} value={form.date} onChange={handleChange} />
                      </div>

                      <div>
                        <label htmlFor="time" className="block text-xs font-medium tracking-wide mb-2 uppercase" style={labelStyle}>Preferred Time</label>
                        <select id="time" name="time" className={field} style={fieldStyle} value={form.time} onChange={handleChange}>
                          <option value="">Select…</option>
                          {timeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="message" className="block text-xs font-medium tracking-wide mb-2 uppercase" style={labelStyle}>
                          Message <span style={{ color: 'var(--accent)' }}>*</span>
                        </label>
                        <textarea id="message" name="message" required rows={5}
                          placeholder="Tell us what you have in mind…"
                          className={field + ' resize-none'} style={fieldStyle}
                          value={form.message} onChange={handleChange} />
                      </div>
                    </div>

                    {status === 'error' && (
                      <div className="mt-5 flex items-start gap-3 px-4 py-3 rounded-xl" style={{ background: 'rgba(220,38,38,0.08)' }}>
                        <svg className="h-4 w-4 mt-0.5 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                        <p className="text-sm text-red-500">{errorMsg}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="mt-7 w-full py-4 rounded-xl text-white text-sm font-semibold tracking-wide flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-100"
                      style={{ background: 'var(--accent)', boxShadow: '0 4px 20px rgba(196,154,138,0.3)' }}
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                      Send Message
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* ── Info + Map ──────── */}
            <div className="space-y-6">
              {/* Info cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactInfo.map(({ icon, label, value, href }) => (
                  <div key={label} className="p-6 rounded-2xl flex gap-4"
                    style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: 'var(--accent-muted)', color: 'var(--accent)' }}>
                      {icon}
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.2em] uppercase mb-2 font-semibold" style={{ color: 'var(--text-3)' }}>{label}</p>
                      {href ? (
                        <a href={href} className="text-sm font-medium leading-relaxed whitespace-pre-line transition-opacity hover:opacity-70" style={{ color: 'var(--text-1)' }}>{value}</a>
                      ) : (
                        <p className="text-sm font-medium leading-relaxed whitespace-pre-line" style={{ color: 'var(--text-1)' }}>{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="rounded-3xl overflow-hidden shadow-lg" style={{ height: '340px' }}>
                <iframe
                  title="The Nail Bar UG"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7487171605458!2d32.58506327363888!3d0.33843576399458253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbbe879689b65%3A0x148c26a39a399e8d!2sThe%20Nail%20Bar%20UG!5e0!3m2!1sen!2sug!4v1753535488494!5m2!1sen!2sug"
                  width="100%" height="100%"
                  style={{ border: 0 }}
                  allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* WhatsApp */}
              <a href="https://wa.me/256772054361" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-white text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-100"
                style={{ background: '#25D366' }}>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
