import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Video, Phone, ArrowRight, Zap } from 'lucide-react'

const slots = [
  { id: 1, day: 'Mon', date: 'Jun 9', time: '10:00 AM', available: true },
  { id: 2, day: 'Mon', date: 'Jun 9', time: '3:00 PM', available: true },
  { id: 3, day: 'Tue', date: 'Jun 10', time: '11:00 AM', available: true },
  { id: 4, day: 'Tue', date: 'Jun 10', time: '4:00 PM', available: false },
  { id: 5, day: 'Wed', date: 'Jun 11', time: '9:00 AM', available: true },
  { id: 6, day: 'Wed', date: 'Jun 11', time: '2:00 PM', available: true },
]

const callTypes = [
  { id: 'video', label: 'Video Call', icon: Video, desc: '30 min · Google Meet' },
  { id: 'phone', label: 'Phone Call', icon: Phone, desc: '20 min · Any number' },
]

function loadRazorpay() {
  return new Promise(resolve => {
    if (window.Razorpay) return resolve(true)
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export default function Booking() {
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [callType, setCallType] = useState('video')
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [step, setStep] = useState(1) // 1=select, 2=details, 3=success
  const [loading, setLoading] = useState(false)

  const handleBooking = async () => {
    if (!form.name || !form.email) return
    setLoading(true)

    const loaded = await loadRazorpay()
    if (!loaded) { setLoading(false); return }

    const options = {
      key: 'rzp_test_REPLACE_WITH_YOUR_KEY', // ← Replace with your key
      amount: 99900, // ₹999 booking deposit (refundable)
      currency: 'INR',
      name: 'Nexus Agency',
      description: 'Discovery Call Booking',
      handler: function () {
        setLoading(false)
        setStep(3)
      },
      prefill: { name: form.name, email: form.email },
      notes: { slot: selectedSlot ? `${slots.find(s => s.id === selectedSlot)?.day} ${slots.find(s => s.id === selectedSlot)?.time}` : '', callType },
      theme: { color: '#00f5ff' },
      modal: { ondismiss: () => setLoading(false) },
    }

    setLoading(false)
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  if (step === 3) {
    return (
      <section id="booking" className="py-32 dark:bg-[#050508] bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-20 h-20 rounded-full bg-[#00f5ff]/15 border border-[#00f5ff]/30 flex items-center justify-center mx-auto mb-6">
              <Zap size={32} className="text-[#00f5ff]" />
            </div>
            <h2 className="font-syne font-800 text-4xl dark:text-white text-black mb-4">You're booked.</h2>
            <p className="font-grotesk text-base dark:text-white/60 text-black/60 leading-relaxed mb-8">
              We've received your booking and will send a confirmation to <span className="text-[#00f5ff]">{form.email}</span> within 10 minutes.
            </p>
            <button
              onClick={() => { setStep(1); setSelectedSlot(null); setForm({ name: '', email: '', company: '', message: '' }) }}
              className="font-grotesk text-sm dark:text-white/40 text-black/50 underline underline-offset-4"
            >
              Book another call
            </button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="booking" className="py-32 dark:bg-[#050508] bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="w-6 h-px bg-[#00f5ff]" />
            <span className="text-xs font-grotesk font-600 tracking-[0.2em] uppercase dark:text-white/40 text-black/50">Book a Call</span>
            <span className="w-6 h-px bg-[#00f5ff]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-syne font-800 text-[clamp(2.5rem,5vw,4.5rem)] leading-tight dark:text-white text-black mb-4"
          >
            Let's talk about
            <br />
            <span className="gradient-text-cyan">your product.</span>
          </motion.h2>
          <p className="font-grotesk text-sm dark:text-white/50 text-black/55">
            Pick a slot, fill in your details, and we'll be ready for the call.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left: slot picker + call type */}
          <div className="lg:col-span-3 space-y-6">
            {/* Call type */}
            <div className="rounded-2xl dark:bg-white/[0.025] bg-black/[0.01] border dark:border-white/5 border-black/6 p-5">
              <p className="font-syne font-600 text-sm dark:text-white/60 text-black/60 mb-4 flex items-center gap-2">
                <Clock size={14} /> Call type
              </p>
              <div className="grid grid-cols-2 gap-3">
                {callTypes.map(ct => {
                  const Icon = ct.icon
                  return (
                    <button
                      key={ct.id}
                      onClick={() => setCallType(ct.id)}
                      className={`rounded-xl p-3 text-left border transition-all duration-200 ${
                        callType === ct.id
                          ? 'border-[#00f5ff]/60 dark:bg-[#00f5ff]/5 bg-[#00f5ff]/5'
                          : 'dark:border-white/5 border-black/6 dark:hover:border-white/10 hover:border-black/10'
                      }`}
                    >
                      <Icon size={16} className={callType === ct.id ? 'text-[#00f5ff] mb-1' : 'dark:text-white/50 text-black/50 mb-1'} />
                      <p className="font-grotesk font-600 text-sm dark:text-white text-black">{ct.label}</p>
                      <p className="font-grotesk text-xs dark:text-white/40 text-black/50">{ct.desc}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Slots */}
            <div className="rounded-2xl dark:bg-white/[0.025] bg-black/[0.01] border dark:border-white/5 border-black/6 p-5">
              <p className="font-syne font-600 text-sm dark:text-white/60 text-black/60 mb-4 flex items-center gap-2">
                <Calendar size={14} /> Available slots
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {slots.map(slot => (
                  <button
                    key={slot.id}
                    disabled={!slot.available}
                    onClick={() => setSelectedSlot(slot.id)}
                    className={`rounded-xl p-3 text-left border transition-all duration-200 ${
                      !slot.available
                        ? 'opacity-30 cursor-not-allowed dark:border-white/5 border-black/5'
                        : selectedSlot === slot.id
                          ? 'border-[#00f5ff]/60 bg-[#00f5ff]/5'
                          : 'dark:border-white/5 border-black/6 dark:hover:border-white/15 hover:border-black/10'
                    }`}
                  >
                    <p className="font-syne font-700 text-xs dark:text-white/40 text-black/50 mb-0.5">{slot.day} · {slot.date}</p>
                    <p className={`font-grotesk font-600 text-sm ${selectedSlot === slot.id ? 'text-[#00f5ff]' : 'dark:text-white text-black'}`}>
                      {slot.time}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl dark:bg-white/[0.025] bg-black/[0.01] border dark:border-white/5 border-black/6 p-5 h-full flex flex-col">
              <p className="font-syne font-600 text-sm dark:text-white/60 text-black/60 mb-4">Your details</p>

              <div className="flex flex-col gap-3 flex-1">
                {[
                  { key: 'name', label: 'Full Name', type: 'text', req: true },
                  { key: 'email', label: 'Email Address', type: 'email', req: true },
                  { key: 'company', label: 'Company (optional)', type: 'text', req: false },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block font-grotesk text-xs dark:text-white/40 text-black/50 mb-1.5">{f.label}</label>
                    <input
                      type={f.type}
                      value={form[f.key]}
                      onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      className="w-full rounded-xl px-3.5 py-2.5 text-sm font-grotesk dark:bg-white/5 bg-black/5 dark:border-white/5 border-black/8 border dark:text-white text-black dark:placeholder-white/20 placeholder-black/25 focus:outline-none focus:border-[#00f5ff]/50 transition-colors"
                      placeholder={f.label}
                    />
                  </div>
                ))}

                <div>
                  <label className="block font-grotesk text-xs dark:text-white/40 text-black/50 mb-1.5">What are you building?</label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    className="w-full rounded-xl px-3.5 py-2.5 text-sm font-grotesk dark:bg-white/5 bg-black/5 dark:border-white/5 border-black/8 border dark:text-white text-black dark:placeholder-white/20 placeholder-black/25 focus:outline-none focus:border-[#00f5ff]/50 transition-colors resize-none"
                    placeholder="Brief description of your project..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0,245,255,0.35)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleBooking}
                  disabled={!selectedSlot || !form.name || !form.email || loading}
                  className="mt-auto w-full py-3.5 rounded-xl bg-[#00f5ff] text-black font-grotesk font-600 text-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {loading ? 'Processing...' : (
                    <>
                      Confirm & Pay ₹999 Deposit
                      <ArrowRight size={16} />
                    </>
                  )}
                </motion.button>

                <p className="text-center text-xs font-grotesk dark:text-white/25 text-black/35">
                  ₹999 deposit fully refundable if cancelled 24h before
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
