import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Zap } from 'lucide-react'
import { plans } from '../data/content'

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

async function handlePayment(plan, setLoading) {
  if (!plan.razorpay_amount) {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
    return
  }

  setLoading(plan.name)
  const loaded = await loadRazorpay()
  setLoading(null)

  if (!loaded) {
    alert('Payment gateway failed to load. Please try again.')
    return
  }

  const options = {
    key: 'rzp_test_REPLACE_WITH_YOUR_KEY', // ← Replace with your Razorpay key
    amount: plan.razorpay_amount, // in paise
    currency: 'INR',
    name: 'Nexus Agency',
    description: `${plan.name} Plan`,
    image: '/vite.svg',
    handler: function (response) {
      alert(`Payment successful! ID: ${response.razorpay_payment_id}`)
      // TODO: verify payment on your backend
    },
    prefill: { name: '', email: '', contact: '' },
    notes: { plan: plan.name },
    theme: { color: '#00f5ff' },
    modal: {
      ondismiss: () => console.log('Payment modal dismissed'),
    },
  }

  const rzp = new window.Razorpay(options)
  rzp.on('payment.failed', function (resp) {
    alert('Payment failed: ' + resp.error.description)
  })
  rzp.open()
}

export default function Pricing() {
  const [loading, setLoading] = useState(null)

  return (
    <section id="pricing" className="py-32 dark:bg-[#050508] bg-white">
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
            <span className="text-xs font-grotesk font-600 tracking-[0.2em] uppercase dark:text-white/40 text-black/50">
              Pricing
            </span>
            <span className="w-6 h-px bg-[#00f5ff]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-syne font-800 text-[clamp(2.5rem,5vw,4.5rem)] leading-tight dark:text-white text-black"
          >
            Built for momentum,
            <br />
            <span className="gradient-text-cyan">not contracts.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 font-grotesk text-base dark:text-white/50 text-black/55"
          >
            Pause or cancel anytime. We earn your trust month over month.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className={`relative rounded-2xl p-6 flex flex-col transition-all duration-300 ${
                plan.highlight
                  ? 'dark:bg-white/[0.04] bg-white border-2 border-[#00f5ff]/60 dark:shadow-[0_0_40px_rgba(0,245,255,0.1)]'
                  : 'dark:bg-white/[0.02] bg-black/[0.01] border dark:border-white/5 border-black/6'
              }`}
            >
              {/* Popular badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#00f5ff] text-black text-xs font-grotesk font-600">
                    <Zap size={11} className="fill-black" />
                    {plan.badge}
                  </div>
                </div>
              )}

              {/* Plan header */}
              <div className="mb-6">
                <h3 className="font-syne font-700 text-lg dark:text-white text-black mb-1">{plan.name}</h3>
                <p className="font-grotesk text-sm dark:text-white/40 text-black/50">{plan.desc}</p>
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b dark:border-white/5 border-black/5">
                <div className="flex items-end gap-1">
                  <span className="font-syne font-800 text-4xl dark:text-white text-black">{plan.price}</span>
                  {plan.period && (
                    <span className="font-grotesk text-sm dark:text-white/40 text-black/50 mb-1">{plan.period}</span>
                  )}
                </div>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-3 flex-1 mb-8">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#00f5ff]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={11} className="text-[#00f5ff]" />
                    </div>
                    <span className="font-grotesk text-sm dark:text-white/65 text-black/65">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handlePayment(plan, setLoading)}
                disabled={loading === plan.name}
                className={`w-full py-3.5 rounded-xl font-grotesk font-600 text-sm transition-all duration-200 ${
                  plan.highlight
                    ? 'bg-[#00f5ff] text-black hover:bg-[#00f5ff]/90'
                    : 'dark:bg-white/5 bg-black/5 dark:text-white text-black dark:hover:bg-white/10 hover:bg-black/10'
                }`}
              >
                {loading === plan.name ? 'Loading...' : plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-8 text-xs font-grotesk dark:text-white/25 text-black/35"
        >
          Payments secured by Razorpay · 256-bit SSL encryption · GST invoice provided
        </motion.p>
      </div>
    </section>
  )
}
