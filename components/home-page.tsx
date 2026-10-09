import { createClient } from "@/lib/supabase/server";
import { ScrollEffects } from "@/components/home/ScrollEffects";
import { Nav }           from "@/components/home/Nav";
import { Hero }          from "@/components/home/Hero";
import { Ticker }        from "@/components/home/Ticker";
import { TodayCard }     from "@/components/home/TodayCard";
import { PathsGrid }     from "@/components/home/PathsGrid";
import { LiveSection }   from "@/components/home/LiveSection";
import { JournalSignup } from "@/components/home/JournalSignup";
import { Testimonials }  from "@/components/home/Testimonials";
import { Faq }           from "@/components/home/Faq";
import { HomeFooter }    from "@/components/home/Footer";

export async function HomePage() {
  const supabase = await createClient();

  const [
    { data: content },
    { data: testimonials },
    { data: faqs },
  ] = await Promise.all([
    supabase
      .from("published_content")
      .select(
        "id,title,excerpt,type,access,free_until,price_display,is_featured,event_starts_at,position,created_at",
      )
      .order("position", { ascending: true })
      .limit(60),
    supabase
      .from("testimonials")
      .select("id,quote,author_name,role")
      .order("position", { ascending: true }),
    supabase
      .from("faqs")
      .select("id,question,answer")
      .order("position", { ascending: true }),
  ]);

  const items    = content ?? [];
  const reminder = items.find(
    (item) => item.type === "reminder" && item.access === "free",
  );

  return (
    <>
      <ScrollEffects />
      <Nav />
      <main>
        <Hero
          quote={reminder?.excerpt ?? ""}
          reminderDate={reminder?.created_at ?? null}
        />
        <Ticker />
        <TodayCard
          title={reminder?.title ?? ""}
          excerpt={reminder?.excerpt ?? ""}
          createdAt={reminder?.created_at ?? null}
        />
        <PathsGrid />
        <LiveSection />
        <JournalSignup />
        <Testimonials items={testimonials ?? []} />
        <Faq items={faqs ?? []} />
        <HomeFooter />
      </main>
    </>
  );
}
