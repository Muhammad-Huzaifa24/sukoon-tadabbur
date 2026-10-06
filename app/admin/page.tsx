'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { Bold, Italic, List, ListOrdered, LogOut, Quote, Underline } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const categories = ['Reminder', 'Series', 'Course', 'Tadabbur', 'Consultation', 'Blog'] as const
const blockStyles = [
  { value: 'p', label: 'Paragraph' },
  { value: 'h1', label: 'Heading 1' },
  { value: 'h2', label: 'Heading 2' },
  { value: 'h3', label: 'Heading 3' },
  { value: 'h4', label: 'Heading 4' },
  { value: 'h5', label: 'Heading 5' },
  { value: 'h6', label: 'Heading 6' },
  { value: 'blockquote', label: 'Quote' },
]
const empty = { title: '', slug: '', excerpt: '', body: '', category: 'Reminder', status: 'published' }
type EditorCommand = 'bold' | 'italic' | 'underline' | 'insertUnorderedList' | 'insertOrderedList' | 'formatBlock'

export default function AdminPage() {
  const editorRef = useRef<HTMLDivElement>(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [form, setForm] = useState(empty)
  const [message, setMessage] = useState('')
  const [count, setCount] = useState(0)
  const [blockStyle, setBlockStyle] = useState('p')

  useEffect(() => setLoggedIn(sessionStorage.getItem('sukoon-admin') === '1'), [])

  function updateField(field: keyof typeof empty, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function syncBody() {
    setForm((current) => ({ ...current, body: editorRef.current?.innerHTML ?? '' }))
  }

  function format(command: EditorCommand, value?: string) {
    editorRef.current?.focus()
    document.execCommand(command, false, value)
    syncBody()
  }

  function handleBlockChange(value: string) {
    setBlockStyle(value)
    format('formatBlock', value)
  }

  async function save(event: FormEvent) {
    event.preventDefault()
    const body = editorRef.current?.innerHTML ?? form.body
    const { error } = await createClient().from('site_content').upsert({ ...form, body, is_featured: false }, { onConflict: 'slug' })
    setMessage(error ? 'Could not save. Check the Supabase table policies.' : 'Published to the site.')
    if (!error) {
      setForm(empty)
      setBlockStyle('p')
      if (editorRef.current) editorRef.current.innerHTML = ''
    }
  }

  async function loadCount() {
    const { count: subscriberCount } = await createClient().from('subscribers').select('id', { count: 'exact', head: true })
    setCount(subscriberCount ?? 0)
  }

  if (!loggedIn) return <main className="min-h-screen bg-paper px-6 py-10"><div className="mx-auto max-w-md"><a href="/" className="cursor-pointer font-serif text-2xl">sukoon<span className="text-terracotta">.</span></a><div className="mt-20 rounded-[2rem] border border-border bg-card p-8"><p className="eyebrow">Private studio</p><h1 className="mt-3 font-serif text-4xl">Admin sign in.</h1><form className="mt-8 flex flex-col gap-4" onSubmit={(event) => { event.preventDefault(); if (username === 'admin' && password === 'admin') { sessionStorage.setItem('sukoon-admin', '1'); setLoggedIn(true) } else setMessage('Use the provided admin credentials.') }}><input aria-label="Username" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} className="rounded-xl border border-border bg-paper px-4 py-3" /><input aria-label="Password" type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} className="rounded-xl border border-border bg-paper px-4 py-3" />{message && <p className="text-sm text-terracotta">{message}</p>}<button className="cursor-pointer rounded-full bg-ink px-5 py-3 text-sm text-white">Enter studio</button></form></div></div></main>

  return <main className="min-h-screen bg-paper px-6 py-10"><div className="mx-auto max-w-4xl"><div className="flex items-center justify-between"><a href="/" className="cursor-pointer font-serif text-2xl">sukoon<span className="text-terracotta">.</span></a><button className="cursor-pointer inline-flex items-center gap-2 text-sm underline" onClick={() => { sessionStorage.removeItem('sukoon-admin'); setLoggedIn(false) }}><LogOut />Sign out</button></div><div className="mt-16"><p className="eyebrow">Content studio</p><h1 className="mt-3 font-serif text-5xl">Write something worth returning to.</h1><p className="mt-4 max-w-xl text-muted-foreground">Publish directly into Supabase. Use the toolbar to shape the body copy.</p><div className="mt-10 rounded-[2rem] border border-border bg-card p-8"><form onSubmit={save} className="flex flex-col gap-4"><input required placeholder="Title" value={form.title} onChange={(event) => { const title = event.target.value; updateField('title', title); if (!form.slug) updateField('slug', title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) }} className="rounded-xl border border-border bg-paper px-4 py-3" /><input required placeholder="Slug" value={form.slug} onChange={(event) => updateField('slug', event.target.value)} className="rounded-xl border border-border bg-paper px-4 py-3" /><Select value={form.category} onValueChange={(value) => updateField('category', value)}><SelectTrigger aria-label="Category" className="h-16 min-h-16 w-full cursor-pointer rounded-xl border-border bg-paper px-5 text-base font-medium shadow-sm hover:border-terracotta focus-visible:border-terracotta"><SelectValue placeholder="Choose a category" /></SelectTrigger><SelectContent className="rounded-xl border-border bg-card p-1 shadow-xl">{categories.map((category) => <SelectItem key={category} value={category} className="cursor-pointer rounded-lg px-3 py-2.5 text-base focus:bg-terracotta/10 focus:text-ink">{category}</SelectItem>)}</SelectContent></Select><input required placeholder="Short excerpt" value={form.excerpt} onChange={(event) => updateField('excerpt', event.target.value)} className="rounded-xl border border-border bg-paper px-4 py-3" /><div className="overflow-hidden rounded-2xl border border-border bg-paper"><div className="flex flex-wrap items-center gap-2 border-b border-border bg-card p-3"><button type="button" aria-label="Bold" className="cursor-pointer rounded-lg p-2 hover:bg-muted" onClick={() => format('bold')}><Bold /></button><button type="button" aria-label="Italic" className="cursor-pointer rounded-lg p-2 hover:bg-muted" onClick={() => format('italic')}><Italic /></button><button type="button" aria-label="Underline" className="cursor-pointer rounded-lg p-2 hover:bg-muted" onClick={() => format('underline')}><Underline /></button><span className="h-6 w-px bg-border" /><Select value={blockStyle} onValueChange={handleBlockChange}><SelectTrigger aria-label="Block style" className="h-9 w-40 cursor-pointer rounded-lg border-border bg-paper"><SelectValue /></SelectTrigger><SelectContent className="rounded-xl border-border bg-card p-1 shadow-xl">{blockStyles.map((style) => <SelectItem key={style.value} value={style.value} className="cursor-pointer rounded-lg px-3 py-2 focus:bg-terracotta/10 focus:text-ink">{style.label}</SelectItem>)}</SelectContent></Select><span className="h-6 w-px bg-border" /><button type="button" aria-label="Bulleted list" className="cursor-pointer rounded-lg p-2 hover:bg-muted" onClick={() => format('insertUnorderedList')}><List /></button><button type="button" aria-label="Numbered list" className="cursor-pointer rounded-lg p-2 hover:bg-muted" onClick={() => format('insertOrderedList')}><ListOrdered /></button><button type="button" aria-label="Quote" className="cursor-pointer rounded-lg p-2 hover:bg-muted" onClick={() => handleBlockChange('blockquote')}><Quote /></button></div><div ref={editorRef} contentEditable suppressContentEditableWarning onInput={syncBody} className="min-h-72 p-5 text-base leading-8 outline-none empty:before:text-muted-foreground empty:before:content-[attr(data-placeholder)]" data-placeholder="Write the body here..." /></div>{message && <p className="text-sm text-terracotta">{message}</p>}<div className="flex flex-wrap items-center gap-3"><button type="submit" className="cursor-pointer rounded-full bg-ink px-6 py-3 text-sm text-white">Publish content</button><button type="button" onClick={loadCount} className="cursor-pointer rounded-full border border-border px-5 py-3 text-sm hover:bg-muted">Check subscribers</button>{count > 0 && <span className="text-sm text-muted-foreground">{count} subscriber{count === 1 ? '' : 's'} stored in Supabase</span>}</div></form></div></div></div></main>
}
