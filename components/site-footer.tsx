import { SubscribeForm } from '@/components/subscribe-form'

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="grid gap-8 rounded-[1.75rem] bg-sand p-7 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div><p className="eyebrow">A note, now and then</p><p className="mt-3 font-display text-3xl">Join the letters.</p></div>
          <SubscribeForm />
        </div>
        <div className="mt-8 flex flex-col gap-5 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <a href="/" className="font-display text-xl text-ink">sukoon<span className="text-terracotta">.</span></a>
          <p>For the life you are already living.</p>
          <div className="flex flex-wrap gap-5"><a href="/blog">Blog</a><a href="/auth/sign-in">Admin</a><a href="mailto:hello@sukoon.example">Contact</a><a href="/privacy">Privacy</a></div>
        </div>
      </div>
    </footer>
  )
}
