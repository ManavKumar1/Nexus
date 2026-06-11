import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Video, Phone, ArrowRight } from 'lucide-react'

const slots = [
  {id:1,day:'Mon',date:'Jun 9', time:'10:00 AM',ok:true},
  {id:2,day:'Mon',date:'Jun 9', time:'3:00 PM', ok:true},
  {id:3,day:'Tue',date:'Jun 10',time:'11:00 AM',ok:true},
  {id:4,day:'Tue',date:'Jun 10',time:'4:00 PM', ok:false},
  {id:5,day:'Wed',date:'Jun 11',time:'9:00 AM', ok:true},
  {id:6,day:'Wed',date:'Jun 11',time:'2:00 PM', ok:true},
]
const callTypes = [
  {id:'video',label:'Video Call',icon:Video,desc:'30 min · Google Meet'},
  {id:'phone',label:'Phone Call',icon:Phone,desc:'20 min · Any number'},
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

export default function Booking() {
  const [slot, setSlot] = useState(null)
  const [callType, setCallType] = useState('video')
  const [form, setForm] = useState({name:'',email:'',company:'',note:''})
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const book = async () => {
    if (!form.name || !form.email) return
    setLoading(true)
    const ok = await loadRazorpay(); if (!ok) { setLoading(false); return }
    const rzp = new window.Razorpay({
      key:'rzp_test_REPLACE_WITH_YOUR_KEY',
      amount:99900, currency:'INR',
      name:'Nexus Agency', description:'Discovery Call — ₹999 deposit (refundable)',
      handler: () => { setLoading(false); setStep(3) },
      prefill:{ name:form.name, email:form.email },
      theme:{ color:'#00f5ff' },
      modal:{ ondismiss:() => setLoading(false) },
    })
    setLoading(false)
    rzp.open()
  }

  if (step === 3) return (
    <section id="booking" className="py-28 dark:bg-[#050508] bg-white">
      <div className="max-w-lg mx-auto px-6 text-center">
        <motion.div initial={{scale:0.85,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:0.5,ease:[0.16,1,0.3,1]}}>
          <div className="w-16 h-16 rounded-full bg-[#00f5ff]/12 border border-[#00f5ff]/25 flex items-center justify-center mx-auto mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00f5ff" strokeWidth="2" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
          </div>
          <h2 className="font-syne font-800 text-3xl dark:text-white text-black mb-3">You're booked.</h2>
          <p className="font-grotesk text-sm dark:text-white/52 text-black/58 leading-relaxed">
            Confirmation goes to <span className="text-[#00f5ff]">{form.email}</span> within 10 minutes.
          </p>
        </motion.div>
      </div>
    </section>
  )

  return (
    <section id="booking" className="py-28 dark:bg-[#050508] bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-5 h-px bg-[#00f5ff]"/>
            <span className="font-grotesk text-[11px] tracking-[0.22em] uppercase dark:text-white/35 text-black/45">Book a Call</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <h2 className="font-syne font-800 dark:text-white text-black leading-[0.93] tracking-[-0.02em]"
              style={{fontSize:'clamp(2.4rem,5.5vw,5rem)'}}>
              Let's talk about<br/><span className="grad-cyan">your product.</span>
            </h2>
            <p className="font-grotesk text-sm dark:text-white/42 text-black/50 max-w-xs leading-relaxed">
              Pick a slot, tell us about your project, pay a refundable deposit — and we'll be ready for the call.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 max-w-5xl">
          {/* Left: slot + call type */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {/* Call type */}
            <div className="rounded-2xl dark:bg-white/[0.025] bg-black/[0.01] border dark:border-white/5 border-black/6 p-5">
              <p className="font-grotesk text-[11px] tracking-[0.18em] uppercase dark:text-white/35 text-black/45 mb-4">Call type</p>
              <div className="grid grid-cols-2 gap-2">
                {callTypes.map(ct => {
                  const Icon = ct.icon
                  return (
                    <button key={ct.id} onClick={() => setCallType(ct.id)}
                      className={`rounded-xl p-3.5 text-left border transition-all duration-200 ${callType===ct.id
                        ? 'border-[#00f5ff]/50 dark:bg-[#00f5ff]/[0.05] bg-[#00f5ff]/[0.04]'
                        : 'dark:border-white/5 border-black/6 dark:hover:border-white/10 hover:border-black/10'}`}>
                      <Icon size={15} className={`mb-1.5 ${callType===ct.id ? 'text-[#00f5ff]' : 'dark:text-white/45 text-black/45'}`}/>
                      <p className="font-grotesk font-600 text-sm dark:text-white text-black">{ct.label}</p>
                      <p className="font-grotesk text-xs dark:text-white/35 text-black/42">{ct.desc}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Slots */}
            <div className="rounded-2xl dark:bg-white/[0.025] bg-black/[0.01] border dark:border-white/5 border-black/6 p-5">
              <p className="font-grotesk text-[11px] tracking-[0.18em] uppercase dark:text-white/35 text-black/45 mb-4">Available slots</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {slots.map(s => (
                  <button key={s.id} disabled={!s.ok} onClick={() => setSlot(s.id)}
                    className={`rounded-xl p-3 text-left border transition-all duration-200 ${!s.ok
                      ? 'opacity-25 cursor-not-allowed dark:border-white/5 border-black/5'
                      : slot===s.id
                        ? 'border-[#00f5ff]/50 dark:bg-[#00f5ff]/[0.05]'
                        : 'dark:border-white/5 border-black/6 dark:hover:border-white/12 hover:border-black/10'}`}>
                    <p className="font-grotesk text-[10px] tracking-[0.15em] dark:text-white/35 text-black/40 mb-0.5 uppercase">{s.day} · {s.date}</p>
                    <p className={`font-grotesk font-600 text-sm ${slot===s.id ? 'text-[#00f5ff]' : 'dark:text-white text-black'}`}>{s.time}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl dark:bg-white/[0.025] bg-black/[0.01] border dark:border-white/5 border-black/6 p-5 h-full flex flex-col gap-3">
              <p className="font-grotesk text-[11px] tracking-[0.18em] uppercase dark:text-white/35 text-black/45">Your details</p>

              {[{k:'name',l:'Full Name',t:'text'},{k:'email',l:'Email',t:'email'},{k:'company',l:'Company (optional)',t:'text'}].map(f => (
                <div key={f.k}>
                  <label className="block font-grotesk text-xs dark:text-white/35 text-black/42 mb-1.5">{f.l}</label>
                  <input type={f.t} value={form[f.k]} onChange={e => setForm(p => ({...p,[f.k]:e.target.value}))}
                    placeholder={f.l}
                    className="w-full rounded-xl px-3.5 py-2.5 text-sm font-grotesk dark:bg-white/[0.04] bg-black/[0.04] border dark:border-white/5 border-black/8 dark:text-white text-black dark:placeholder-white/18 placeholder-black/25 focus:outline-none focus:border-[#00f5ff]/45 transition-colors"/>
                </div>
              ))}

              <div>
                <label className="block font-grotesk text-xs dark:text-white/35 text-black/42 mb-1.5">What are you building?</label>
                <textarea rows={3} value={form.note} onChange={e => setForm(p => ({...p,note:e.target.value}))}
                  placeholder="Brief description of your project…"
                  className="w-full rounded-xl px-3.5 py-2.5 text-sm font-grotesk dark:bg-white/[0.04] bg-black/[0.04] border dark:border-white/5 border-black/8 dark:text-white text-black dark:placeholder-white/18 placeholder-black/25 focus:outline-none focus:border-[#00f5ff]/45 transition-colors resize-none"/>
              </div>

              <motion.button
                onClick={book}
                disabled={!slot||!form.name||!form.email||loading}
                whileHover={{scale:1.02,boxShadow:'0 0 36px rgba(0,245,255,0.22)'}}
                whileTap={{scale:0.97}}
                className="mt-auto w-full py-3.5 rounded-xl bg-[#00f5ff] text-black font-grotesk font-600 text-sm flex items-center justify-center gap-2 disabled:opacity-35 disabled:cursor-not-allowed transition-all duration-200">
                {loading ? 'Processing…' : <><span>Confirm & Pay ₹999 Deposit</span><ArrowRight size={15}/></>}
              </motion.button>

              <p className="text-center font-grotesk text-[10px] dark:text-white/22 text-black/30">
                Fully refundable if cancelled 24h before · Secured by Razorpay
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
