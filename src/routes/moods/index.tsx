import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, PageIntro } from "@/components/page";
import { moods, poems } from "@/lib/data";

export const Route = createFileRoute("/moods/")({
  head: () => ({
    meta: [
      { title: "Mood-based discovery — Versify" },
      {
        name: "description",
        content:
          "Longing, rage, tenderness, wonder. Choose how you feel and Versify hands you the verse that matches it.",
      },
      { property: "og:title", content: "Mood-based discovery — Versify" },
      {
        property: "og:description",
        content: "Choose a feeling and read the poems that match it.",
      },
    ],
  }),
  component: Moods,
});

function Moods() {
  return (
    <Page>
      <PageIntro
        eyebrow="Moods"
        title="How do you want to feel about it?"
        lede="Eight doors into the archive. No trending tab, no engagement bait — just weather."
      />
      <section className="mx-auto max-w-6xl px-5">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {moods.map((m, i) => {
            const count = poems.filter((p) => p.mood === m.name).length;
            return (
              <Link
                key={m.name}
                to="/moods/$mood"
                params={{ mood: m.name.toLowerCase() }}
                style={{ ["--i" as string]: i }}
                className="delay-step group relative animate-rise overflow-hidden rounded-lg border border-border p-6 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-page)]"
              >
                <span
                  aria-hidden
                  className="absolute -right-10 -top-10 size-32 rounded-full opacity-30 blur-2xl transition-opacity group-hover:opacity-70"
                  style={{ background: m.hue }}
                />
                <span className="relative block font-display text-3xl">{m.name}</span>
                <span className="relative mt-2 block text-sm text-muted-foreground">{m.blurb}</span>
                <span className="relative mt-8 block font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  {count} poems
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </Page>
  );
}