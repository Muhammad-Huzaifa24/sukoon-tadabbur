'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { Bold, Italic, List, ListOrdered, LogOut, Underline } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const categories = ['Reminder', 'Series', 'Course', 'Tadabbur', 'Consultation', 'Blog'] as const
const empty = { title: '', slug: '', excerpt: '', body: '', category: 'Reminder', status: 'published' }

type EditorCommand = 'bold' | 'italic' | 'underline' | 'insertUnorderedList' | 'insertOrderedList'

export default function AdminPage() {
  const editorRef = useRef<HTMLDivElement>(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [form, setForm] = useState(empty)
  const [message, setMessage] = useState('')
  const [count, setCount] = useState(0)

  useEffect(() => {
    setLoggedIn(sessionStorage.getItem('sukoon-admin') === '1')
  }, [])

  function updateField(field: keyof typeof empty, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function format(command: EditorCommand) {
    editorRef.current?.focus()
    document.execCommand(command, false)
    setForm((current) => ({ ...current, body: editorRef.current?.innerHTML ?? '' }))
  }

  async function save(event: FormEvent) {
    event.preventDefault()
    const body = editorRef.current?.innerHTML ?? form.body
    const { error } = await createClient().from('site_content').upsert({ ...form, body, is_featured: false }, { onConflict: 'slug' })
    setMessage(error ? 'Could not save. Check the Supabase table policies.' : 'Published to the site.')
    if (!error) {
      setForm(empty)
      if (editorRef.current) editorRef.current.innerHTML = ''
    }
  }

  async function loadCount() {
    const { count: subscriberCount } = await createClient().from('subscribers').select('id', { count: 'exact', head: true })
    setCount(subscriberCount ?? 0)
  }

  if (!loggedIn) return <main className="min-h-screen bg-paper px-6 py-10"><div className="mx-auto max-w-md"><a href="/" className="font-serif text-2xl">sukoon<span className="text-terracotta">.</span></a><div className="mt-20 rounded-[2rem] border border-border bg-card p-8"><p className="eyebrow">Private studio</p><h1 className="mt-3 font-serif text-4xl">Admin sign in.</h1><form className="mt-8 flex flex-col gap-4" onSubmit={(event) => { event.preventDefault(); if (username === 'admin' && password === 'admin') { sessionStorage.setItem('sukoon-admin', '1'); setLoggedIn(true) } else setMessage('Use the provided admin credentials.') }}><input aria-label="Username" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} className="rounded-xl border border-border bg-paper px-4 py-3" /><input aria-label="Password" type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} className="rounded-xl border border-border bg-paper px-4 py-3" />{message && <p className="text-sm text-terracotta">{message}</p>}<button className="cursor-pointer rounded-full bg-ink px-5 py-3 text-sm text-white">Enter studio</button></form></div></div></main>

  return <main className="min-h-screen bg-paper px-6 py-10"><div className="mx-auto max-w-4xl"><div className="flex items-center justify-between"><a href="/" className="font-serif text-2xl">sukoon<span className="text-terracotta">.</span></a><button className="cursor-pointer inline-flex items-center gap-2 text-sm underline" onClick={() => { sessionStorage.removeItem('sukoon-admin'); setLoggedIn(false) }}><LogOut />Sign out</button></div><div className="mt-16"><p className="eyebrow">Content studio</p><h1 className="mt-3 font-serif text-5xl">Write something worth returning to.</h1><p className="mt-4 max-w-xl text-muted-foreground">Publish directly into Supabase. Use the toolbar to shape the body copy.</p><div className="mt-10 rounded-[2rem] border border-border bg-card p-8"><form onSubmit={save} className="flex flex-col gap-4"><input required placeholder="Title" value={form.title} onChange={(event) => { const title = event.target.value; updateField('title', title); if (!form.slug) updateField('slug', title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) }} className="rounded-xl border border-border bg-paper px-4 py-3" /><input required placeholder="Slug" value={form.slug} onChange={(event) => updateField('slug', event.target.value)} className="rounded-xl border border-border bg-paper px-4 py-3" /><select aria-label="Category" value={form.category} onChange={(event) => updateField('category', event.target.value)} className="cursor-pointer rounded-xl border border-border bg-paper px-4 py-3">{categories.map((category) => <option key={category}>{category}</option>)}</select><input required placeholder="Short excerpt" value={form.excerpt} onChange={(event) => updateField('excerpt', event.target.value)} className="rounded-xl border border-border bg-paper px-4 py-3" /><div className="overflow-hidden rounded-xl border border-border bg-paper"><div className="flex flex-wrap gap-1 border-b border-border p-2" aria-label="Text formatting toolbar">{([['bold', Bold, 'Bold'], ['italic', Italic, 'Italic'], ['underline', Underline, 'Underline'], ['insertUnorderedList', List, 'Bulleted list'], ['insertOrderedList', ListOrdered, 'Numbered list']] as const).map(([command, Icon, label]) => <button key={command} type="button" title={label} aria-label={label} onClick={() => format(command)} className="cursor-pointer rounded-lg p-2 hover:bg-muted"><Icon /></button>)}</div><div ref={editorRef} contentEditable role="textbox" aria-label="Body" aria-multiline="true" data-placeholder="Body" onInput={(event) => updateField('body', event.currentTarget.innerHTML)} className="min-h-56 px-4 py-3 outline-none empty:before:text-muted-foreground empty:before:content-[attr(data-placeholder)]" /></div><button className="cursor-pointer rounded-full bg-ink px-5 py-3 text-sm text-white">Publish content</button></form>{message && <p className="mt-4 text-sm text-olive">{message}</p>}</div><div className="mt-6 flex items-center justify-between rounded-2xl border border-border bg-card p-5"><span>Active subscribers</span><button className="cursor-pointer rounded-full border border-border px-4 py-2 text-sm" onClick={loadCount}>Refresh count: {count}</button></div></div></div></main>
}
