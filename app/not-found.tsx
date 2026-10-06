import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export default function NotFound() { return <main><SiteHeader /><section className="mx-auto max-w-3xl px-6 py-32 text-center"><p className="eyebrow">A quiet detour</p><h1 className="section-title mt-4">That page has gone <em>somewhere else.</em></h1><p className="mx-auto mt-6 max-w-md leading-7 text-muted-foreground">The piece you are looking for may be unpublished or not yet written.</p><Link href="/" className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 text-sm text-white">Return home</Link></section><SiteFooter /></main> }
