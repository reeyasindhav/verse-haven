import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/page";
import { PoemCard } from "@/components/poem-card";
import { moods, poems } from "@/lib/data";

export const Route = createFileRoute("/moods/$mood")({
  head: ({ params }) => {
    const name = params.mood.charAt(0).toUpperCase() + params.mood.slice(1);
    return {
      meta: [
        { title: `${name} poems — Versify` },
        {
          name: "description",
          content: `Poems and spoken-word recordings collected under ${name.toLowerCase()} on Versify.`,
        },
        { property: "og:title", content: `${name} poems — Versify` },
        {
          property: "og:description",
          content: `Verse that matches ${name.toLowerCase()}.`,
        },
      ],
    };
  },
  component: MoodPage,
});

function MoodPage() {
  const { mood } = Route.useParams();
  const found = moods.find((m) => m.name.toLowerCase() === mood.toLowerCase());
  const list = poems.filter((p) => p.mood.toLowerCase() === mood.toLowerCase());

  return (
    <Page>
      <section className="relative overflow-hidden border-b border-border">
        <span
          aria-hidden
          className="animate-inkflow absolute -top-32 left-1/3 size-[30rem] rounded-full opacity-30 blur-3xl"
          style={{ background: found?.hue ?? "var(--accent)" }}
        />
        <div className="relative mx-auto max-w-6xl px-5 py-20">
          <Link to="/moods" className="font-mono text-xs uppercase tracking-widest text-accent">
            ← All moods
          </Link>
          <h1 className="animate-rise mt-6 font-display text-6xl tracking-tight sm:text-7xl">
            {found?.name ?? mood}
          </h1>
          <p className="animate-rise mt-4 max-w-lg text-lg italic text-muted-foreground">
            {found?.blurb ?? "an unlisted feeling"}
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <PoemCard key={p.id} poem={p} index={i} />
          ))}
        </div>
        {list.length === 0 && (
          <p className="verse py-20 text-center text-2xl text-muted-foreground">
            {"No poems wear this mood yet.\nBe the first."}
          </p>
        )}
      </section>
    </Page>
  );
}