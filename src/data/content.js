export const services = [
  {
    id: '01',
    title: 'Web Development',
    desc: 'Pixel-perfect, performant web experiences built with cutting-edge stacks. From marketing sites to complex web apps.',
    tags: ['React', 'Next.js', 'Node.js', 'PostgreSQL'],
    icon: 'globe',
    color: 'cyan',
  },
  {
    id: '02',
    title: 'Mobile Apps',
    desc: 'Native-quality iOS & Android apps using React Native or Flutter. Ship once, run everywhere without compromise.',
    tags: ['React Native', 'Flutter', 'iOS', 'Android'],
    icon: 'smartphone',
    color: 'violet',
  },
  {
    id: '03',
    title: 'SaaS Products',
    desc: 'End-to-end SaaS platforms — auth, billing, dashboards, APIs. Built to scale from day one.',
    tags: ['SaaS Architecture', 'Stripe', 'Auth', 'Dashboards'],
    icon: 'layers',
    color: 'lime',
  },
  {
    id: '04',
    title: 'AI Integration',
    desc: 'Embed intelligence into your product. LLM pipelines, RAG systems, AI-powered features that feel like magic.',
    tags: ['OpenAI', 'LangChain', 'RAG', 'Vector DBs'],
    icon: 'cpu',
    color: 'pink',
  },
  {
    id: '05',
    title: 'Brand & Design',
    desc: 'Visual identities that command attention. Logo systems, design tokens, and UI kits that make brands unforgettable.',
    tags: ['Identity', 'UI Kits', 'Motion', 'Design Systems'],
    icon: 'sparkles',
    color: 'cyan',
  },
  {
    id: '06',
    title: 'Dev Consulting',
    desc: 'Architecture reviews, tech stack audits, team scaling strategies. Senior-level thinking without full-time overhead.',
    tags: ['Architecture', 'Code Review', 'Strategy', 'Mentorship'],
    icon: 'terminal',
    color: 'violet',
  },
]

export const stats = [
  { value: '120+', label: 'Projects Shipped' },
  { value: '$40M+', label: 'Client Revenue Generated' },
  { value: '98%', label: 'Client Retention' },
  { value: '4 Days', label: 'Avg. First Delivery' },
]

export const process = [
  {
    step: '01',
    title: 'Discovery Call',
    desc: 'No pitch decks. A raw, honest 30-min conversation about your vision, constraints, and what success actually looks like.',
  },
  {
    step: '02',
    title: 'Scope & Strategy',
    desc: 'We map the architecture, define milestones, and agree on a timeline. Transparent pricing before a single line is written.',
  },
  {
    step: '03',
    title: 'Build & Iterate',
    desc: 'Weekly sprints, live previews, tight feedback loops. You see progress — not status updates — from week one.',
  },
  {
    step: '04',
    title: 'Launch & Scale',
    desc: 'Zero-downtime deploys, monitoring setup, performance tuning. We stay on until you\'re flying.',
  },
]

export const plans = [
  {
    name: 'Starter',
    price: '₹49,000',
    period: '/project',
    badge: null,
    desc: 'Perfect for MVPs and landing pages.',
    features: [
      'Up to 5 pages or screens',
      'Responsive design',
      'Basic CMS integration',
      '2 revision rounds',
      '2 weeks delivery',
      'Email support',
    ],
    cta: 'Get Started',
    highlight: false,
    razorpay_amount: 4900000,
  },
  {
    name: 'Growth',
    price: '₹1,20,000',
    period: '/month',
    badge: 'Most Popular',
    desc: 'For teams building serious products.',
    features: [
      'Unlimited requests & revisions',
      'Web + Mobile development',
      'Design system included',
      'Weekly sprints & reviews',
      'Dedicated Slack channel',
      'Priority 24h turnaround',
    ],
    cta: 'Book a Demo',
    highlight: true,
    razorpay_amount: 12000000,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    badge: null,
    desc: 'For large-scale, complex builds.',
    features: [
      'Full embedded team',
      'AI + SaaS architecture',
      'Multi-platform delivery',
      'Dedicated project manager',
      'NDA & IP ownership',
      'SLA & compliance support',
    ],
    cta: 'Contact Us',
    highlight: false,
    razorpay_amount: null,
  },
]

export const faqs = [
  {
    q: 'How quickly can you start?',
    a: 'We can typically kick off within 3–5 business days of signing. For urgent projects, same-week starts are possible.',
  },
  {
    q: 'Do you work with early-stage startups?',
    a: 'Absolutely. Many of our best projects started as napkin sketches. We help shape the product vision, not just execute it.',
  },
  {
    q: 'What\'s included in the monthly retainer?',
    a: 'Design + development, weekly planning calls, async collaboration, bug fixes, and continuous feature delivery — all in one plan.',
  },
  {
    q: 'Can I pause or cancel?',
    a: 'Yes. Monthly plans can be paused or cancelled with 7 days notice. No lock-in, no penalty. We earn your trust monthly.',
  },
  {
    q: 'Who owns the code and designs?',
    a: 'You do. 100% IP ownership transfers upon final payment. We can also set up your own repos and infra from day one.',
  },
  {
    q: 'Do you offer post-launch support?',
    a: 'Yes. All projects include a 30-day support window. Ongoing maintenance retainers are available at a flat monthly rate.',
  },
]

export const techStack = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python',
  'React Native', 'Flutter', 'PostgreSQL', 'MongoDB', 'Redis',
  'AWS', 'Vercel', 'Docker', 'Kubernetes', 'Stripe',
  'OpenAI', 'LangChain', 'Figma', 'Framer', 'TailwindCSS',
]

export const testimonials = [
  {
    name: 'Arjun Mehta',
    role: 'CEO, Finvest',
    avatar: 'AM',
    color: 'cyan',
    text: 'Nexus delivered a full SaaS dashboard in 6 weeks. The quality was genuinely shocking — better than our previous agency charged 3x more.',
  },
  {
    name: 'Priya Nair',
    role: 'Founder, Loopstack',
    avatar: 'PN',
    color: 'violet',
    text: 'They didn\'t just build what we asked for — they challenged our assumptions and shipped something 10x better. True partners.',
  },
  {
    name: 'Rajan Oberoi',
    role: 'CTO, Tradeflow',
    avatar: 'RO',
    color: 'lime',
    text: 'The AI integration work was exceptional. Shipped a RAG system in 2 weeks that our in-house team estimated at 3 months.',
  },
]
