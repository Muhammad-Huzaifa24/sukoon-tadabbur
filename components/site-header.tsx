'use client'

import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Reminders', href: '/reminders' },
  { label: 'Series', href: '/series' },
  { label: 'Courses', href: '/courses' },
  { label: 'Tadabbur', href: '/tadabbur' },
  { label: 'Consultation', href: '/consultation' },
  { label: 'Blog', href: '/blog' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-6 px-6 lg:px-10">
        <a href="/" className="font-display text-2xl tracking-tight text-ink" aria-label="sukoon home">sukoon<span className="text-terracotta">.</span></a>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
          {navigation.map((item) => <a key={item.href} href={item.href} className="rounded-full px-2 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{item.label}</a>)}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a href="/admin" className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Admin</a>
          <a href="/reminders" className="rounded-full bg-ink px-5 py-2.5 text-sm text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Begin here</a>
        </div>
        <button type="button" className="inline-flex size-11 items-center justify-center rounded-full border border-border lg:hidden" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      {open && <nav className="border-t border-border bg-paper px-6 py-5 lg:hidden" aria-label="Mobile navigation"><div className="mx-auto flex max-w-7xl flex-col gap-2">{navigation.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-sm hover:bg-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{item.label}</a>)}<a href="/admin" onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-sm text-muted-foreground hover:bg-sand">Admin</a></div></nav>}
    </header>
  )
}
