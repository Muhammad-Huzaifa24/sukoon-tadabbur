import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60;

export default async function ContentPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("published_content")
    .select("title,excerpt,body,created_at,type")
    .eq("id", id)
    .maybeSingle();
  if (!post) notFound();
  return (
    <main>
      <SiteHeader />
      <article className="mx-auto max-w-3xl px-6 pb-24 pt-16 lg:pt-24">
        <p className="eyebrow">The journal</p>
        <h1 className="section-title mt-5">{post.title}</h1>
        <p className="mt-7 text-lg leading-8 text-muted-foreground">
          {post.excerpt}
        </p>
        <div className="my-14 border-y border-border py-8 text-sm text-muted-foreground">
          {new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(
            new Date(post.created_at),
          )}
        </div>
        <div
          className="prose-sukoon"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      </article>
      <SiteFooter />
    </main>
  );
}
