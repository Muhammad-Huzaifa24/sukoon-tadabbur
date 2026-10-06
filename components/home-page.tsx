import { ArrowUpRight, CalendarDays, LockKeyhole, Sparkles } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { SubscribeForm } from '@/components/subscribe-form'
import { createClient } from '@/lib/supabase/server'

export async function HomePage() {
  const supabase = await createClient()
  const [{ data: settings }, { data: content }, { data: testimonials }, { data: faqs }] = await Promise.all([
    supabase.from('site_settings').select('hero_title,hero_subtitle,author_name,author_bio').limit(1).maybeSingle(),
    supabase.from('published_content').select('id,slug,title,excerpt,type,access,free_until,price_display,is_featured,event_starts_at,position,created_at').order('position', { ascending: true }).limit(60),
    supabase.from('testimonials').select('id,quote,author_name,role').order('position', { ascending: true }),
    supabase.from('faqs').select('id,question,answer').order('position', { ascending: true }),
  ])
  const items = content ?? []
  const reminder = items.find((item) => item.type === 'reminder' && item.access === 'free')
  const offers = [
    ['Reminders', '/reminders', 'reminder'], ['Short series', '/series', 'series'], ['Micro courses', '/courses', 'course'],
    ['Tadabbur', '/tadabbur', 'tadabbur'], ['Masterclasses', '/tadabbur', 'masterclass'], ['Consultation', '/consultation', 'consultation'], ['Blog', '/blog', 'blog'],
  ] as const
  const featured = items.filter((item) => item.is_featured).slice(0, 6)
  const date = (value: string | null) => value ? new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value)) : null
  return <main><SiteHeader />
    <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-16 lg:grid-cols-[1.1fr_.9fr] lg:px-10 lg:pb-28 lg:pt-28">
      <div><p className="eyebrow">A space to return to what matters</p><h1 className="section-title mt-5 max-w-4xl">{settings?.hero_title || 'Small words for returning to what matters.'}</h1><p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">{settings?.hero_subtitle || 'Thoughtful reminders, intimate learning, and conversations for a life already in motion.'}</p><a href="/reminders" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-ink px-6 text-sm text-white">Begin with a reminder <ArrowUpRight className="ml-2 size-4" /></a></div>
      <div className="relative min-h-72 overflow-hidden rounded-[3rem] bg-olive p-8 text-paper"><div className="absolute inset-0 opacity-20 [background-image:linear-gradient(30deg,transparent_48%,white_49%,transparent_51%),linear-gradient(150deg,transparent_48%,white_49%,transparent_51%)] [background-size:52px_90px]" /><div className="relative mt-auto flex min-h-56 items-end"><p className="max-w-sm font-serif text-3xl leading-tight">“{reminder?.excerpt || 'Make a little room for wonder.'}”</p></div></div>
    </section>
    <section className="border-y border-border bg-sand/50"><div className="mx-auto max-w-7xl px-6 py-16 lg:px-10"><p className="eyebrow">Find your way around</p><div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{offers.map(([label, href, type]) => { const item = items.find((entry) => entry.type === type); return <a key={type} href={href} className="rounded-2xl border border-border bg-paper p-5 transition-transform hover:-translate-y-1"><span className="text-sm text-muted-foreground">{item?.access === 'premium' ? 'Premium' : 'Free'}</span><h2 className="mt-8 font-serif text-2xl">{label}</h2><ArrowUpRight className="mt-5 size-4 text-terracotta" /></a> })}</div></div></section>
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10"><div className="flex items-end justify-between gap-6"><div><p className="eyebrow">A reminder for today</p><h2 className="section-title mt-4">Small words, <em>held gently.</em></h2></div><a href="/reminders" className="text-sm">All reminders <ArrowUpRight className="ml-1 inline size-4" /></a></div>{reminder ? <article className="mt-10 rounded-[2rem] bg-ink p-8 text-paper lg:p-12"><p className="eyebrow text-paper/60">Free daily reminder · {date(reminder.created_at)}</p><h3 className="mt-8 max-w-3xl font-serif text-4xl leading-tight md:text-6xl">{reminder.title}</h3><p className="mt-6 max-w-2xl text-lg leading-8 text-paper/70">{reminder.excerpt}</p></article> : <p className="mt-10 rounded-2xl border border-dashed border-border p-8 text-muted-foreground">No published reminder yet.</p>}</section>
    <section className="bg-olive text-paper"><div className="mx-auto max-w-7xl px-6 py-20 lg:px-10"><p className="eyebrow text-paper/60">Featured paths</p><div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{featured.map((item) => <a key={item.id} href={`/${item.type === 'course' ? 'courses' : item.type === 'blog' ? 'blog' : item.type}/${item.slug}`} className="rounded-[1.5rem] border border-paper/15 p-6"><Sparkles className="size-5 text-terracotta" /><h3 className="mt-12 font-serif text-3xl">{item.title}</h3><p className="mt-3 text-sm leading-6 text-paper/65">{item.excerpt}</p><span className="mt-6 inline-flex text-sm">{item.access === 'premium' ? item.price_display || 'Premium preview' : 'Explore'} <ArrowUpRight className="ml-2 size-4" /></span></a>)}</div></div></section>
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10"><div className="grid gap-5 md:grid-cols-2"><div className="rounded-[2rem] bg-sand p-8"><LockKeyhole className="size-6 text-terracotta" /><p className="eyebrow mt-12">Premium, later</p><h2 className="mt-4 font-serif text-4xl">Go deeper, at your pace.</h2><p className="mt-4 leading-7 text-muted-foreground">Premium previews show what is inside without payment or checkout.</p></div><div className="rounded-[2rem] bg-card p-8"><CalendarDays className="size-6 text-terracotta" /><p className="eyebrow mt-12">Live reflection</p><h2 className="mt-4 font-serif text-4xl">Gather in good company.</h2><a href="/tadabbur" className="mt-8 inline-flex text-sm">See upcoming sessions <ArrowUpRight className="ml-2 size-4" /></a></div></div></section>
    <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10"><div className="grid gap-10 rounded-[2rem] bg-sand p-8 lg:grid-cols-[.7fr_1.3fr] lg:p-12"><div><p className="eyebrow">The journal</p><h2 className="section-title mt-4">A letter for <em>your inbox.</em></h2></div><div><p className="max-w-lg text-lg leading-8 text-ink/70">Occasional notes on attention, faith, and the quiet work of becoming.</p><div className="mt-8"><SubscribeForm /></div></div></div></section>
    {testimonials?.length ? <section className="border-y border-border"><div className="mx-auto max-w-7xl px-6 py-16 lg:px-10"><p className="eyebrow">Words from readers</p><div className="mt-8 grid gap-5 md:grid-cols-3">{testimonials.map((item) => <blockquote key={item.id} className="rounded-2xl border border-border p-6 font-serif text-xl">“{item.quote}”<footer className="mt-6 font-sans text-sm text-muted-foreground">{item.author_name}{item.role ? ` · ${item.role}` : ''}</footer></blockquote>)}</div></div></section> : null}
    {faqs?.length ? <section className="mx-auto max-w-3xl px-6 py-20"><p className="eyebrow">Frequently asked</p>{faqs.map((item) => <details key={item.id} className="border-b border-border py-5"><summary className="cursor-pointer font-medium">{item.question}</summary><p className="mt-3 leading-7 text-muted-foreground">{item.answer}</p></details>)}</section> : null}
    <SiteFooter /></main>
}

export function HomeRouteLink() { return null }
