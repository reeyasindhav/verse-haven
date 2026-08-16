import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, PageIntro } from "@/components/page";
import { poems, poets } from "@/lib/data";

export const Route = createFileRoute("/poets/")({
  head: () => ({
    meta: [
      { title: "Poets on Versify" },
      {
        name: "description",
        content:
          "Meet the poets writing and performing on Versify — from ghazal writers to stage-first spoken-word voices.",
      },
      { property: "og:title", content: "Poets on Versify" },
      { property: "og:description", content: "The voices behind the verse." },
    ],
  }),
  component: Poets,
});

function Poets() {
  return (
    <Page>
      <PageIntro
        eyebrow="The voices"
        title="Poets who write it and say it."
        lede="Every poet here keeps the page and the stage in the same hand."
      />
      <section className="mx-auto max-w-6xl px-5">
        <div className="grid gap-6 md:grid-cols-2">
          {poets.map((p, i) => (
            <Link
              key={p.slug}
              to="/poets/$slug"
              params={{ slug: p.slug }}
              style={{ ["--i" as string]: i }}
              className="delay-step group animate-rise overflow-hidden rounded-lg border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-page)]"
            >
              <img
                src={p.cover}
                alt=""
                loading="lazy"
                className="h-36 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <img
                    src={p.avatar}
                    alt={p.name}
                    loading="lazy"
                    className="-mt-10 size-14 rounded-full border-2 border-card object-cover"
                  />
                  <span>
                    <span className="block font-display text-2xl group-hover:text-accent">
                      {p.name}
                    </span>
                    <span className="block font-mono text-[11px] text-muted-foreground">
                      {p.handle} · {p.city}
                    </span>
                  </span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{p.bio}</p>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  {p.followers} followers · {poems.filter((x) => x.poet === p.slug).length} here
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Page>
  );
}
