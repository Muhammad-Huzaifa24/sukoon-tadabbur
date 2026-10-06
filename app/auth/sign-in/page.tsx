'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function SignInPage() {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [message, setMessage] = useState('')
  async function submit(event: FormEvent) { event.preventDefault(); const { error } = await createClient().auth.signInWithPassword({ email, password }); if (error) setMessage('Invalid email or password.'); else window.location.href = '/admin' }
  return <main className="min-h-screen bg-paper px-6 py-10"><div className="mx-auto max-w-md"><Link href="/" className="font-serif text-2xl">sukoon<span className="text-terracotta">.</span></Link><div className="mt-20 rounded-[2rem] border border-border bg-card p-8"><p className="eyebrow">Welcome back</p><h1 className="mt-3 font-serif text-4xl">Sign in.</h1><p className="mt-3 text-sm leading-6 text-muted-foreground">Return to your quiet corner.</p><form onSubmit={submit} className="mt-8 flex flex-col gap-4"><label className="text-sm">Email<input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-border bg-paper px-4 py-3 outline-none" /></label><label className="text-sm">Password<input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-border bg-paper px-4 py-3 outline-none" /></label>{message && <p role="alert" className="text-sm text-terracotta">{message}</p>}<button className="rounded-full bg-ink px-5 py-3 text-sm text-white">Sign in</button></form><p className="mt-6 text-sm text-muted-foreground">New here? <Link className="text-foreground underline" href="/auth/sign-up">Create an account</Link></p></div></div></main>
}
