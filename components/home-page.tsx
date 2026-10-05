'use client'

import { useState } from 'react'
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  ChevronDown,
  Clock3,
  Headphones,
  Menu,
  Moon,
  Play,
  Sparkles,
  X,
} from 'lucide-react'

const navItems = [
  { label: 'Home', href: '#top' },
  { label: 'Reminders', href: '/reminders' },
  { label: 'Series', href: '/series' },
  { label: 'Courses', href: '/courses' },
  { label: 'Tadabbur', href: '/tadabbur' },
  { label: 'Consultation', href: '/consultation' },
]

const notes = [
  {
    number: '01',
    type: 'A quiet reminder',
    title: 'On making room',
    body: 'There is wisdom in the pause before an answer. Let today have a little more space than yesterday.',
    color: 'bg-[#d8ded0]',
  },
  {
    number: '02',
    type: 'A thought to carry',
    title: 'The work of returning',
    body: 'You do not have to begin again from the beginning. You can begin again from where you are.',
    color: 'bg-[#e5d8c9]',
  },
  {
    number: '03',
    type: 'A gentle question',
    title: 'What is asking for care?',
    body: 'Attention is one of the most generous things we can give. Notice where yours wants to go.',
    color: 'bg-[#d9d5ca]',
  },
]

function ArrowLink({ children, href = '#' }: { children: React.ReactNode; href?: string }) {
  return (
    <a href={href} className="group inline-flex items-center gap-2 text-sm font-medium text-foreground">
      {children}
      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
    </a>
  )
}

export function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeNote, setActiveNote] = useState(0)

  return (
    <main className="overflow-hidden">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <a href="#top" className="font-serif text-2xl tracking-tight">sukoon<span className="text-terracotta">.</span></a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => <a key={item.label} href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{item.label}</a>)}
        </nav>
        <div className="hidden items-center gap-5 md:flex">
          <a href="#journal" className="text-sm text-muted-foreground">Sign in</a>
          <a href="#journal" className="rounded-full bg-ink px-5 py-2.5 text-sm text-white transition-transform hover:-translate-y-0.5">Begin here</a>
        </div>
        <button className="rounded-full border border-border p-2 md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </header>
      {menuOpen && <nav className="mx-6 flex flex-col gap-4 border-t border-border py-5 md:hidden" aria-label="Mobile navigation">{navItems.map((item) => <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)} className="text-sm">{item.label}</a>)}<a href="#journal" className="text-sm text-muted-foreground">Sign in</a></nav>}

      <section id="top" className="mx-auto grid max-w-7xl gap-10 px-6 pb-20 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10 lg:pb-32 lg:pt-20">
        <div className="max-w-2xl">
          <p className="mb-7 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-olive"><span className="inline-block size-2 rounded-full bg-terracotta" /> A space to return to yourself</p>
          <h1 className="font-serif text-[clamp(3.5rem,8vw,7.7rem)] leading-[0.88] tracking-[-0.06em] text-ink">Small words.<br /><em className="text-olive">Deep roots.</em></h1>
          <p className="mt-8 max-w-md text-lg leading-8 text-muted-foreground">Thoughtful reminders, intimate learning, and conversations for the parts of life that deserve your full attention.</p>
          <div className="mt-9 flex flex-wrap items-center gap-5"><a href="#reminders" className="rounded-full bg-ink px-6 py-3.5 text-sm text-white transition-transform hover:-translate-y-0.5">Explore reminders <ArrowUpRight className="ml-2 inline size-4" /></a><ArrowLink href="#learn">Find your way around</ArrowLink></div>
        </div>
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="absolute -left-6 top-10 size-28 rounded-full border border-terracotta/30 lg:-left-12" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[14rem] rounded-br-[2rem] rounded-tl-[2rem] bg-olive"><img src="/images/quiet-dawn.png" alt="A quiet dawn landscape with an olive branch" className="size-full object-cover mix-blend-multiply opacity-90" /></div>
          <div className="absolute -bottom-5 -left-3 rounded-2xl border border-border bg-paper/90 p-4 shadow-sm backdrop-blur-sm lg:-left-8"><Moon className="mb-2 size-5 text-terracotta" /><p className="font-serif text-lg leading-tight">Make a little<br />room for wonder.</p></div>
        </div>
      </section>

      <section id="reminders" className="border-y border-border bg-sand/50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow">The daily practice</p><h2 className="section-title mt-4">A reminder for <em>today.</em></h2></div><p className="max-w-xs text-sm leading-6 text-muted-foreground">A small note to meet you where you are. Read it slowly. Let it stay.</p></div>
          <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <article className="flex min-h-[380px] flex-col justify-between rounded-[2rem] bg-ink p-7 text-paper md:p-10"><div className="flex items-start justify-between"><span className="eyebrow text-paper/60">Free daily reminder · 06.10.26</span><Headphones className="size-5 text-terracotta" /></div><div><p className="max-w-2xl font-serif text-4xl leading-[1.08] tracking-tight md:text-6xl">“You are allowed to take the long way to a life that feels like your own.”</p><div className="mt-8 flex items-center gap-4"><button className="inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2.5 text-sm text-ink"><Play className="size-4 fill-current" /> Listen · 2 min</button><span className="text-sm text-paper/50">A note by Amina Rahman</span></div></div></article>
            <div className="grid gap-4">{notes.map((note, index) => <button key={note.number} onClick={() => setActiveNote(index)} className={`rounded-[1.5rem] p-6 text-left transition-all ${note.color} ${activeNote === index ? 'ring-2 ring-terracotta ring-offset-2 ring-offset-sand' : 'hover:-translate-y-1'}`}><div className="flex items-center justify-between"><span className="text-xs font-semibold tracking-[0.2em] text-ink/45">{note.number}</span><ArrowUpRight className="size-4 text-ink/50" /></div><p className="mt-7 text-xs uppercase tracking-[0.16em] text-ink/55">{note.type}</p><h3 className="mt-2 font-serif text-2xl text-ink">{note.title}</h3><p className="mt-2 text-sm leading-6 text-ink/60">{note.body}</p></button>)}</div>
          </div>
          <div className="mt-10 flex items-center justify-between border-t border-border pt-5"><span className="text-sm text-muted-foreground">New reminders, every morning</span><ArrowLink href="#journal">Receive them in your inbox</ArrowLink></div>
        </div>
      </section>

      <section id="learn" className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]"><div><p className="eyebrow">Go a little deeper</p><h2 className="section-title mt-4">Learning that<br /><em>stays with you.</em></h2><p className="mt-6 max-w-sm leading-7 text-muted-foreground">Short, considered experiences for the curious mind. Move at your own pace, return whenever you need to.</p><ArrowLink href="#journal">Explore all learning</ArrowLink></div><div className="grid gap-5 md:grid-cols-2"><article className="group rounded-[1.75rem] border border-border bg-card p-7 transition-colors hover:bg-sand/60"><div className="flex justify-between"><span className="rounded-full bg-olive/15 px-3 py-1 text-xs text-olive">Free · 8 parts</span><BookOpen className="size-5 text-olive" /></div><h3 className="mt-20 font-serif text-3xl leading-tight">The art of<br /><em>beginning again</em></h3><p className="mt-4 text-sm leading-6 text-muted-foreground">A six-week series on returning to what matters, one small practice at a time.</p><div className="mt-7 flex items-center justify-between border-t border-border pt-4 text-sm"><span>Short series</span><ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></div></article><article className="group rounded-[1.75rem] bg-[#c7d0be] p-7 text-ink transition-transform hover:-translate-y-1"><div className="flex justify-between"><span className="rounded-full bg-ink/10 px-3 py-1 text-xs">Premium · 4 lessons</span><Sparkles className="size-5" /></div><h3 className="mt-20 font-serif text-3xl leading-tight">Listening to<br /><em>your inner weather</em></h3><p className="mt-4 text-sm leading-6 text-ink/60">A focused micro-course for noticing the patterns beneath the noise.</p><div className="mt-7 flex items-center justify-between border-t border-ink/15 pt-4 text-sm"><span>$24 · Self-paced</span><ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></div></article></div></div>
      </section>

      <section id="gather" className="bg-olive text-paper"><div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><p className="eyebrow text-paper/55">Gather in good company</p><h2 className="section-title mt-4 text-paper">There is something<br /><em>about being together.</em></h2></div><p className="max-w-sm text-sm leading-6 text-paper/65">Live sessions, patient conversation, and space to ask the questions that do not fit neatly anywhere else.</p></div><div className="mt-14 grid gap-4 md:grid-cols-3"><article className="rounded-[1.5rem] border border-paper/15 p-6"><CalendarDays className="size-6 text-terracotta" /><p className="mt-16 text-xs uppercase tracking-[0.16em] text-paper/50">Next gathering · Oct 14</p><h3 className="mt-2 font-serif text-2xl">Tadabbur Highlights</h3><p className="mt-3 text-sm leading-6 text-paper/60">A live, intimate reflection on finding steadiness in uncertain seasons.</p><button className="mt-6 rounded-full border border-paper/30 px-4 py-2 text-sm transition-colors hover:bg-paper hover:text-olive">Reserve a seat</button></article><article className="rounded-[1.5rem] bg-paper p-6 text-ink md:translate-y-8"><Sparkles className="size-6 text-terracotta" /><p className="mt-16 text-xs uppercase tracking-[0.16em] text-ink/45">Limited · October 28</p><h3 className="mt-2 font-serif text-2xl">The spacious life</h3><p className="mt-3 text-sm leading-6 text-ink/60">A two-part masterclass on attention, boundaries, and living with intention.</p><button className="mt-6 rounded-full bg-ink px-4 py-2 text-sm text-white">View masterclass <ArrowUpRight className="ml-1 inline size-4" /></button></article><article className="rounded-[1.5rem] border border-paper/15 p-6"><Clock3 className="size-6 text-terracotta" /><p className="mt-16 text-xs uppercase tracking-[0.16em] text-paper/50">Private · By appointment</p><h3 className="mt-2 font-serif text-2xl">A conversation for you</h3><p className="mt-3 text-sm leading-6 text-paper/60">One-to-one guidance for a season of transition, clarity, or change.</p><button className="mt-6 rounded-full border border-paper/30 px-4 py-2 text-sm transition-colors hover:bg-paper hover:text-olive">Book a consultation</button></article></div></div></section>

      <section id="journal" className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-32"><div className="grid gap-10 rounded-[2rem] bg-[#e9e2d5] p-8 md:p-12 lg:grid-cols-[0.8fr_1.2fr] lg:p-16"><div><p className="eyebrow">The journal</p><h2 className="section-title mt-4">A letter for<br /><em>your inbox.</em></h2></div><div className="flex flex-col justify-between gap-8"><p className="max-w-lg text-lg leading-8 text-ink/70">Occasional notes on attention, faith, and the quiet work of becoming. No noise. Just something worth keeping.</p><form className="flex flex-col gap-3 sm:flex-row" onSubmit={(event) => event.preventDefault()}><label htmlFor="email" className="sr-only">Email address</label><input id="email" type="email" placeholder="Your email address" className="min-h-12 flex-1 rounded-full border border-ink/15 bg-paper px-5 text-sm outline-none placeholder:text-ink/40 focus:border-terracotta" /><button type="submit" className="min-h-12 rounded-full bg-ink px-6 text-sm text-white">Subscribe <ArrowUpRight className="ml-1 inline size-4" /></button></form><p className="text-xs text-ink/45">By subscribing, you are joining a quiet corner of the internet. Unsubscribe anytime.</p></div></div></section>

      <footer className="border-t border-border"><div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between lg:px-10"><a href="#top" className="font-serif text-xl text-ink">sukoon<span className="text-terracotta">.</span></a><p>For the life you are already living.</p><div className="flex gap-5"><a href="#journal">Instagram</a><a href="#journal">Contact</a><a href="#journal">Privacy</a></div></div></footer>
    </main>
  )
}
