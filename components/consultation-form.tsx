'use client'

import { FormEvent, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function ConsultationForm() {
  const [status, setStatus] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    setStatus('')
    const form = new FormData(event.currentTarget)
    const { error } = await createClient().from('interest_requests').insert({
      email: String(form.get('email') ?? '').trim(),
      name: String(form.get('name') ?? '').trim() || null,
      message: String(form.get('message') ?? '').trim() || null,
      kind: 'consultation',
    })
    setBusy(false)
    setStatus(error ? 'We could not send your note. Please try again.' : 'Your note is on its way. We will be in touch soon.')
    if (!error) event.currentTarget.reset()
  }

  return <form onSubmit={submit} className="mt-8 flex flex-col gap-3" aria-label="Consultation request">
    <input name="name" placeholder="Your name" className="rounded-xl border border-paper/20 bg-transparent px-4 py-3 text-paper placeholder:text-paper/50" />
    <input name="email" required type="email" placeholder="Email address" className="rounded-xl border border-paper/20 bg-transparent px-4 py-3 text-paper placeholder:text-paper/50" />
    <textarea name="message" rows={4} placeholder="What would you like to explore?" className="resize-y rounded-xl border border-paper/20 bg-transparent px-4 py-3 text-paper placeholder:text-paper/50" />
    <button disabled={busy} className="mt-2 inline-flex items-center justify-center rounded-full bg-paper px-5 py-3 text-sm text-ink disabled:cursor-wait disabled:opacity-60">{busy ? 'Sending…' : 'Request a conversation'} <span aria-hidden="true" className="ml-2">↗</span></button>
    {status && <p role="status" className="text-sm text-paper/70">{status}</p>}
  </form>
}
