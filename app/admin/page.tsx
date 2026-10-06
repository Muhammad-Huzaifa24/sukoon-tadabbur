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
  const selectionRef = useRef<Range | null>(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [form, setForm] = useState(empty)
  const [message, setMessage] = useState('')
  const [count, setCount] = useState(0)
  const [blockStyle, setBlockStyle] = useState('p')

  useEffect(() => setLoggedIn(sessionStorage.getItem('sukoon-admin') === '1'), [])

  useEffect(() => {
    const commandLabels: Record<string, string> = {
      bold: 'Bold',
      italic: 'Italic',
      underline: 'Underline',
      insertUnorderedList: 'Bulleted list',
      insertOrderedList: 'Numbered list',
    }

    const syncToolbarState = () => {
      Object.entries(commandLabels).forEach(([command, label]) => {
        const button = document.querySelector<HTMLButtonElement>(`button[aria-label="${label}"]`)
        if (!button) return
        const active = document.queryCommandState(command)
        button.classList.toggle('bg-terracotta/15', active)
        button.classList.toggle('text-terracotta', active)
        button.setAttribute('aria-pressed', String(active))
      })
    }

    const rememberSelection = () => {
      const selection = window.getSelection()
      if (!selection || selection.rangeCount === 0 || !editorRef.current?.contains(selection.anchorNode)) return
      selectionRef.current = selection.getRangeAt(0).cloneRange()
      syncToolbarState()
    }

    const preserveSelectionBeforeToolbarClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (target.closest('button[aria-label]')) saveSelection()
    }

    document.addEventListener('selectionchange', rememberSelection)
    document.addEventListener('mousedown', preserveSelectionBeforeToolbarClick)
    return () => {
      document.removeEventListener('selectionchange', rememberSelection)
      document.removeEventListener('mousedown', preserveSelectionBeforeToolbarClick)
    }
  }, [])

  function updateField(field: keyof typeof empty, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function saveSelection() {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0 || !editorRef.current?.contains(selection.anchorNode)) return
    selectionRef.current = selection.getRangeAt(0).cloneRange()
  }

  function restoreSelection() {
    const selection = window.getSelection()
    const range = selectionRef.current
    if (!selection || !range) return
    selection.removeAllRanges()
    selection.addRange(range)
  }

  function syncBody() {
    setForm((current) => ({ ...current, body: editorRef.current?.innerHTML ?? '' }))
  }

  function format(command: EditorCommand, value?: string) {
    const editor = editorRef.current
    if (!editor) return

    restoreSelection()
    editor.focus({ preventScroll: true })
    restoreSelection()
    document.execCommand(command, false, value)
    saveSelection()
    syncBody()
  }

  function handleBlockChange(value: string | null) {
    if (!value) return
    setBlockStyle(value)
    format('formatBlock', `<${value}>`)
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

  if (!loggedIn) return <main className="min-h-screen bg-paper px-6 py-10"><div className="mx-auto max-w-md"><a href="/" className="cursor-pointer font-serif text-2xl">sukoon<span className="text-terracotta">.</span></a><div className="mt-20 rounded-[2rem] border border-border bg-card p-8"><p className="eyebrow">Private studio</p><h1 className="mt-3 font-serif text-4xl">Admin sign in.</h1><form className="mt-8 flex flex-col gap-4" onSubmit={(event) => { event.preventDefault(); if (username === 'admin' && password === 'admin') { sessionStorage.setItem('sukoon-admin', '1'); setLoggedIn(true) } else setMessage('Use the provided admin credentials.') }}><input aria-label="Username" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} className="rounded-xl border border-border bg-paper px-4 py-3" /><input aria-label="Password" type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} className="rounded-xl border border-border bg-paper px-4 py-3" />{message && <p className="text-sm text-terracotta">{message}</p>}<button type="submit" className="cursor-pointer rounded-full bg-ink px-5 py-3 text-sm text-white">Enter studio</button></form></div></div></main>

  return <main className="min-h-screen bg-paper px-6 py-10"><div className="mx-auto max-w-4xl"><div className="flex items-center justify-between"><a href="/" className="cursor-pointer font-serif text-2xl">sukoon<span className="text-terracotta">.</span></a><button type="button" className="cursor-pointer inline-flex items-center gap-2 text-sm underline" onClick={() => { sessionStorage.removeItem('sukoon-admin'); setLoggedIn(false) }}><LogOut />Sign out</button></div><div className="mt-16"><p className="eyebrow">Content studio</p><h1 className="mt-3 font-serif text-5xl">Write something worth returning to.</h1><p className="mt-4 max-w-xl text-muted-foreground">Publish directly into Supabase. Use the toolbar to shape the body copy.</p><div className="mt-10 rounded-[2rem] border border-border bg-card p-8"><form onSubmit={save} className="flex flex-col gap-4"><input required placeholder="Title" value={form.title} onChange={(event) => { const title = event.target.value; updateField('title', title); if (!form.slug) updateField('slug', title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) }} className="rounded-xl border border-border bg-paper px-4 py-3" /><input required placeholder="Slug" value={form.slug} onChange={(event) => updateField('slug', event.target.value)} className="rounded-xl border border-border bg-paper px-4 py-3" /><Select value={form.category} onValueChange={(value) => { if (value) updateField('category', value) }}><SelectTrigger aria-label="Category" className="h-14 min-h-14 w-full cursor-pointer rounded-xl border-border bg-paper px-5 text-base font-medium shadow-sm hover:border-terracotta focus-visible:border-terracotta"><SelectValue placeholder="Choose a category" /></SelectTrigger><SelectContent className="rounded-xl border-border bg-card p-1 shadow-xl">{categories.map((category) => <SelectItem key={category} value={category} className="cursor-pointer rounded-lg px-3 py-2.5 text-base focus:bg-terracotta/10 focus:text-ink">{category}</SelectItem>)}</SelectContent></Select><textarea required placeholder="Short excerpt" value={form.excerpt} onChange={(event) => updateField('excerpt', event.target.value)} className="min-h-16 resize-y rounded-xl border border-border bg-paper px-4 py-3" /><div className="overflow-hidden rounded-xl border border-border bg-paper"><div className="flex flex-wrap items-center gap-2 border-b border-border bg-card p-2"><Select value={blockStyle} onValueChange={handleBlockChange}><SelectTrigger aria-label="Block style" className="h-10 w-36 cursor-pointer rounded-lg border-border bg-paper px-3 text-sm"><SelectValue /></SelectTrigger><SelectContent className="rounded-xl border-border bg-card p-1 shadow-xl">{blockStyles.map((style) => <SelectItem key={style.value} value={style.value} className="cursor-pointer rounded-lg px-3 py-2 text-sm focus:bg-terracotta/10 focus:text-ink">{style.label}</SelectItem>)}</SelectContent></Select>{[[Bold, 'bold'], [Italic, 'italic'], [Underline, 'underline'], [List, 'insertUnorderedList'], [ListOrdered, 'insertOrderedList'], [Quote, 'formatBlock']] .map(([Icon, command]) => <button key={command as string} type="button" aria-label={command === 'insertUnorderedList' ? 'Bulleted list' : command === 'insertOrderedList' ? 'Numbered list' : command === 'formatBlock' ? 'Quote' : command as string} className="cursor-pointer rounded-lg p-2 text-ink transition-colors hover:bg-terracotta/10" onMouseDown={(event) => event.preventDefault()} onClick={() => format(command as EditorCommand, command === 'formatBlock' ? '<blockquote>' : undefined)}><Icon /></button>)}</div><div ref={editorRef} contentEditable role="textbox" aria-label="Body" data-placeholder="Write the body here..." onInput={syncBody} onBlur={saveSelection} className="rich-editor min-h-64 px-4 py-3 outline-none" /></div><div className="flex items-center justify-between gap-4 pt-2"><button type="submit" className="cursor-pointer rounded-full bg-ink px-6 py-3 text-sm text-white">Publish content</button><button type="button" onClick={loadCount} className="cursor-pointer text-sm underline">Check subscribers ({count})</button></div>{message && <p className="text-sm text-terracotta">{message}</p>}</form></div></div></div></main>
}
