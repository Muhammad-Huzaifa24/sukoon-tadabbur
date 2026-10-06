import { ReactNode } from 'react'
import { ArrowUpRight, CalendarDays, Check, Clock3, LockKeyhole, Menu, Play, Sparkles, X } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { createClient } from '@/lib/supabase/server'

const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Reminders', href: '/reminders' },
  { label: 'Series', href: '/series' },
  { label: 'Courses', href: '/courses' },
  { label: 'Tadabbur', href: '/tadabbur' },
  { label: 'Consultation', href: '/consultation' },
  { label: 'Blog', href: '/blog' },
]

type ContentItem = { id: string; title: string; excerpt: string; body: string; category: string; slug: string; type?: string; access?: string; price_display?: string | null; event_starts_at?: string | null }

function Header() { return <SiteHeader /> }

function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: ReactNode; description: string }) {
  return <section className="mx-auto max-w-7xl px-6 pb-16 pt-12 lg:px-10 lg:pb-24 lg:pt-20"><p className="eyebrow">{eyebrow}</p><h1 className="section-title mt-4 max-w-3xl">{title}</h1><p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">{description}</p></section>
}

function CardGrid({ items, kind }: { items: ContentItem[]; kind: 'series' | 'courses' }) {
  return <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{items.map((item, index) => <a href={`/${kind}/${item.slug}`} key={item.id} className={`flex min-h-[300px] flex-col rounded-[1.75rem] border border-border p-7 ${index === 1 ? 'bg-olive text-paper' : 'bg-card'}`}><div className="flex items-center justify-between"><span className={`rounded-full px-3 py-1 text-xs ${index === 1 ? 'bg-paper/15 text-paper' : 'bg-olive/12 text-olive'}`}>{item.category}</span><Clock3 className="size-5 opacity-70" /></div><h2 className="mt-auto font-serif text-3xl leading-tight">{item.title}</h2><p className={`mt-4 text-sm leading-6 ${index === 1 ? 'text-paper/65' : 'text-muted-foreground'}`}>{item.excerpt}</p><div className={`mt-6 flex items-center justify-between border-t pt-4 text-sm ${index === 1 ? 'border-paper/20' : 'border-border'}`}><span>Explore content</span><ArrowUpRight className="size-4" /></div></a>)}</div>
}

function Footer() { return <SiteFooter /> }

export async function ContentPage({ type }: { type: 'reminders' | 'series' | 'courses' | 'tadabbur' | 'consultation' | 'blog' }) {
  const client = await createClient()
  const contentType = type === 'courses' ? 'course' : type
  const contentTypes = type === 'tadabbur' ? ['tadabbur', 'masterclass'] : [contentType]
  const { data } = await client.from('published_content').select('id,title,excerpt,body,category,slug,type,access,price_display,event_starts_at').in('type', contentTypes).order('position', { ascending: true })
  const categoryItems = (data ?? []) as ContentItem[]
  return <main><Header />
    {type === 'reminders' && <><PageIntro eyebrow="The daily practice" title={<>Small words for <em>the long way.</em></>} description="A quiet library of reminders, plus private letters for the seasons that ask a little more of us." /><section className="mx-auto max-w-7xl px-6 lg:px-10"><div className="grid gap-5 lg:grid-cols-2">{categoryItems.map((item, index) => <a key={item.id} href={`/blog/${item.slug}`} className={`flex min-h-[260px] flex-col justify-between rounded-[2rem] p-8 ${index === 0 ? 'bg-ink text-paper' : 'border border-border bg-card'}`}><div><p className={`eyebrow ${index === 0 ? 'text-paper/60' : ''}`}>{item.access === 'premium' ? `Premium · ${item.price_display ?? 'Preview'}` : 'Free reminder'}</p><h2 className="mt-6 max-w-xl font-serif text-4xl leading-tight">{item.title}</h2><p className={`mt-4 max-w-xl leading-7 ${index === 0 ? 'text-paper/70' : 'text-muted-foreground'}`}>{item.excerpt}</p></div><span className="mt-8 inline-flex items-center text-sm">Read the reminder <ArrowUpRight className="ml-2 size-4" /></span></a>)}</div></section></>}
    {type === 'series' && <><PageIntro eyebrow="Move at your own pace" title={<>Short series, <em>lasting questions.</em></>} description="A few free, thoughtful paths to return to whenever you need a little direction." /><section className="mx-auto max-w-7xl px-6 lg:px-10"><CardGrid items={categoryItems} kind="series" /></section></>}
    {type === 'courses' && <><PageIntro eyebrow="Learn & reflect" title={<>Learning that <em>stays with you.</em></>} description="Small courses and masterclasses for the curious mind. No rush, no noise." /><section className="mx-auto max-w-7xl px-6 lg:px-10"><CardGrid items={categoryItems} kind="courses" /></section></>}
    {type === 'tadabbur' && <><PageIntro eyebrow="Gather in good company" title={<>A deeper look at <em>what is here.</em></>} description="Live highlights and considered masterclasses for reflection, meaning, and the practice of noticing." /><section className="mx-auto max-w-7xl px-6 lg:px-10"><div className="grid gap-5 md:grid-cols-2">{categoryItems.map((item, index) => <a key={item.id} href={`/blog/${item.slug}`} className={`rounded-[1.75rem] p-8 ${index === 0 ? 'bg-olive text-paper' : 'bg-sand text-ink'}`}><div className="flex items-center justify-between"><p className={`eyebrow ${index === 0 ? 'text-paper/60' : ''}`}>{item.type === 'masterclass' ? 'Masterclass' : 'Live session'}</p>{item.type === 'masterclass' ? <Sparkles className="size-6 text-terracotta" /> : <CalendarDays className="size-6 text-terracotta" />}</div><h2 className="mt-20 font-serif text-4xl">{item.title}</h2><p className={`mt-4 leading-7 ${index === 0 ? 'text-paper/65' : 'text-ink/65'}`}>{item.excerpt}</p><span className="mt-8 inline-flex text-sm">View details <ArrowUpRight className="ml-2 size-4" /></span></a>)}</div></section></>}
    {type === 'consultation' && <><PageIntro eyebrow="A private room" title={<>A conversation for <em>where you are.</em></>} description="One-on-one time to slow down, name what matters, and leave with a little more clarity." /><section className="mx-auto grid max-w-7xl gap-5 px-6 lg:grid-cols-[1fr_0.8fr] lg:px-10"><article className="rounded-[2rem] bg-sand p-8 lg:p-10"><p className="eyebrow">What we can explore</p><ul className="mt-8 flex flex-col gap-5">{['A season of transition or uncertainty', 'Finding a gentler relationship with your attention', 'Making space for a decision that matters'].map((item) => <li key={item} className="flex gap-3 leading-7"><Check className="mt-1 size-5 shrink-0 text-olive" />{item}</li>)}</ul></article><article className="rounded-[2rem] bg-ink p-8 text-paper lg:p-10"><p className="eyebrow text-paper/60">Private session</p><h2 className="mt-5 font-serif text-4xl">60 minutes</h2><p className="mt-4 text-paper/65">Online · Availability shared after your note</p><p className="mt-10 font-serif text-3xl">$75 <span className="font-sans text-sm text-paper/50">placeholder</span></p><a href="mailto:hello@sukoon.example?subject=Consultation" className="mt-8 inline-flex rounded-full bg-paper px-5 py-3 text-sm text-ink">Book a consultation <ArrowUpRight className="ml-1 size-4" /></a></article></section></>}
    {type === 'blog' && <><PageIntro eyebrow="The journal" title={<>Notes for a life <em>already in motion.</em></>} description="Occasional writing on attention, faith, learning, and the quiet work of becoming." /><section className="mx-auto max-w-7xl px-6 lg:px-10"><div className="grid gap-5 md:grid-cols-2">{categoryItems.map((item, index) => <a key={item.id} href={`/blog/${item.slug}`} className={`rounded-[1.5rem] p-7 ${index === 0 ? 'bg-sand md:col-span-2 md:p-12' : 'border border-border'}`}><p className="eyebrow">{index === 0 ? 'Featured note' : 'Journal note'}</p><h2 className="mt-5 font-serif text-4xl md:text-5xl">{item.title}</h2><p className="mt-5 max-w-2xl leading-7 text-muted-foreground">{item.excerpt}</p><span className="mt-8 inline-flex text-sm font-medium">Read the article <ArrowUpRight className="ml-2 size-4" /></span></a>)}</div></section></>}
    <Footer /></main>
}

export function ArticlePage() { return <main><Header /><article className="mx-auto max-w-3xl px-6 pb-24 pt-16 lg:pt-24"><p className="eyebrow">Reflection · 8 min read</p><h1 className="section-title mt-5">The work of <em>returning.</em></h1><p className="mt-7 text-lg leading-8 text-muted-foreground">You do not have to begin again from the beginning. You can begin again from where you are.</p><div className="my-14 border-y border-border py-8 text-sm text-muted-foreground">A letter from Amina Rahman · October 6, 2026</div><div className="flex flex-col gap-7 font-serif text-2xl leading-[1.55] text-ink"><p>There are seasons when progress feels like a straight line, and seasons when it feels more like a tide. In the latter, returning is not failure. It is a form of wisdom.</p><p>Return to the breath. Return to the question. Return to the small promise you made before the noise got loud.</p><p>The place you are standing is not a detour from your life. It is part of the path, asking to be met with the same tenderness you would offer anyone else.</p></div><a href="/blog" className="mt-14 inline-flex text-sm font-medium">Back to the journal <ArrowUpRight className="ml-1 size-4" /></a></article><Footer /></main> }

export function HomeRouteLink() { return null }
