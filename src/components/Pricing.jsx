import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const plans = [
  {
    tag:'ON-GOING', name:'Growth', price:'₹1,20,000', period:'/month', highlight:false,
    desc:'Design & development, every sprint.',
    features:['Design & dev, every sprint','Weekly planning & review call','Async-first collaboration','Iterative feature delivery','Bug fixes & improvements','Pause or cancel anytime'],
    cta:'Book your call', amount:12000000,
  },
  {
    tag:'EMBEDDED', name:'Studio', price:'₹2,20,000', period:'/month', highlight:true,
    desc:'Full throttle — your work ships first.',
    features:['Design & dev, full throttle','Priority queue — ships first','Calls around the work','Two parallel workstreams','48h average turnaround','Pause or cancel anytime'],
    cta:'Book your call', amount:22000000,
  },
  {
    tag:'ONE-OFF', name:'Project', price:'Custom', period:'', highlight:false,
    desc:'Scoped project with fixed deliverables.',
    features:['Fixed scope & timeline','Full IP ownership','Dedicated PM','Post-launch support window','NDA available','Invoice + GST'],
    cta:'Contact us', amount:null,
  },
]

function loadRazorpay() {
  return new Promise(resolve => {
    if (window.Razorpay) return resolve(true)
    const s = document.createElement('script')
    s.src = 'https://checkout.razorpay.com/v1/checkout.js'
    s.onload = () => resolve(true); s.onerror = () => resolve(false)
    document.body.appendChild(s)
  })
}

export default function Pricing() {
  const [loading, setLoading] = useState(null)

  async function pay(plan) {
    if (!plan.amount) { document.getElementById('booking')?.scrollIntoView({behavior:'smooth'}); return }
    setLoading(plan.name)
    const ok = await loadRazorpay(); setLoading(null)
    if (!ok) return
    const rzp = new window.Razorpay({
      key: 'rzp_test_REPLACE_WITH_YOUR_KEY',
      amount: plan.amount, currency:'INR',
      name:'Nexus Agency', description:`${plan.name} Plan`,
      handler: () => alert('Payment successful!'),
      theme:{ color:'#00f5ff' },
    })
    rzp.open()
  }

  return (
    <section id="pricing" className="py-28 dark:bg-[#050508] bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-5 h-px bg-[#00f5ff]"/>
            <span className="font-grotesk text-[11px] tracking-[0.22em] uppercase dark:text-white/35 text-black/45">Pricing</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <h2 className="font-syne font-800 dark:text-white text-black leading-[0.93] tracking-[-0.02em]"
              style={{fontSize:'clamp(2.4rem,5.5vw,5rem)'}}>
              Built for momentum,<br/><span className="grad-cyan">not contracts.</span>
            </h2>
            <p className="font-grotesk text-sm dark:text-white/42 text-black/50 max-w-xs leading-relaxed">
              Pause or cancel anytime. We earn your trust month over month.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan,i) => (
            <motion.div key={plan.name}
              initial={{opacity:0,y:30}}
              whileInView={{opacity:1,y:0}}
              viewport={{once:true,margin:'-50px'}}
              transition={{duration:0.7,delay:i*0.1,ease:[0.16,1,0.3,1]}}
              className={`relative rounded-2xl p-6 flex flex-col ${plan.highlight
                ? 'dark:bg-white/[0.04] bg-white border-2 border-[#00f5ff]/50 shadow-[0_0_60px_rgba(0,245,255,0.08)]'
                : 'dark:bg-white/[0.018] bg-black/[0.01] border dark:border-white/5 border-black/6'}`}>
              {plan.highlight && (
                <div className="absolute -top-3.5 left-6">
                  <span className="px-3 py-1 rounded-full bg-[#00f5ff] text-black font-grotesk text-[11px] font-600 tracking-wide">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Tag */}
              <div className="font-grotesk text-[10px] tracking-[0.22em] uppercase dark:text-white/25 text-black/35 mb-3">{plan.tag}</div>

              {/* Price */}
              <div className="mb-1">
                <span className="font-syne font-800 dark:text-white text-black" style={{fontSize:'clamp(2rem,4vw,2.8rem)'}}>
                  {plan.price}
                </span>
                {plan.period && <span className="font-grotesk text-sm dark:text-white/38 text-black/45 ml-1">{plan.period}</span>}
              </div>
              <p className="font-grotesk text-sm dark:text-white/42 text-black/50 mb-6 pb-6 border-b dark:border-white/5 border-black/5">
                {plan.desc}
              </p>

              {/* Features */}
              <ul className="flex flex-col gap-3 flex-1 mb-7">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{background:'rgba(0,245,255,0.12)'}}>
                      <Check size={9} className="text-[#00f5ff]"/>
                    </div>
                    <span className="font-grotesk text-sm dark:text-white/60 text-black/62">{f}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{scale:1.02}} whileTap={{scale:0.97}}
                onClick={() => pay(plan)}
                disabled={loading===plan.name}
                className={`w-full py-3 rounded-xl font-grotesk font-600 text-sm transition-all duration-200 ${plan.highlight
                  ? 'bg-[#00f5ff] text-black hover:shadow-[0_0_30px_rgba(0,245,255,0.25)]'
                  : 'dark:bg-white/5 bg-black/5 dark:text-white text-black dark:hover:bg-white/10 hover:bg-black/10'}`}>
                {loading===plan.name ? 'Loading…' : plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>

        <p className="text-center mt-6 font-grotesk text-[11px] dark:text-white/22 text-black/30">
          Secured by Razorpay · 256-bit SSL · GST invoice on request
        </p>
      </div>
    </section>
  )
}
