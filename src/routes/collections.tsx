import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, PageIntro } from "@/components/page";
import { collections, poems } from "@/lib/data";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — curated poetry sets on Versify" },
      {
        name: "description",
        content:
          "Curated sets of poems and performances: night shift verse, mother tongues, stage voices and more.",
      },
      { property: "og:title", content: "Collections — Versify" },
      { property: "og:description", content: "Curated sets of poems and performances." },
    ],
  }),
  component: Collections,
});

function Collections() {
  return (
    <Page>
      <PageIntro
        eyebrow="Curated"
        title="Poems that belong beside each other."
        lede="Sets built by editors and poets — read them in order, or wander."
      />
      <section className="mx-auto max-w-6xl px-5">
        <div className="grid gap-6 md:grid-cols-3">
          {collections.map((c, i) => (
            <article
              key={c.id}
              style={{ ["--i" as string]: i }}
              className="delay-step group animate-rise overflow-hidden rounded-lg border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-page)]"
            >
              <img
                src={c.cover}
                alt={c.title}
                loading="lazy"
                className="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                  {c.count} poems
                </p>
                <h2 className="mt-3 font-display text-3xl group-hover:text-accent">{c.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">Curated by {c.curator}</p>
                <Link to="/explore" className="mt-5 inline-block text-sm hover:text-accent">
                  Open collection →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <h2 className="mt-16 font-display text-3xl">Fresh in the archive</h2>
        <ul className="mt-6 divide-y divide-border overflow-hidden rounded-lg border border-border">
          {poems.slice(0, 6).map((p) => (
            <li key={p.id}>
              <Link
                to="/poem/$id"
                params={{ id: p.id }}
                className="flex items-center gap-4 bg-card px-5 py-4 transition-colors hover:bg-secondary/60"
              >
                <span className="min-w-0 flex-1 truncate font-display text-xl">{p.title}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                  {p.mood}
                </span>
                <span className="hidden text-xs text-muted-foreground sm:block">{p.date}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Page>
  );
}
