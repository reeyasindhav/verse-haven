import { createFileRoute, Link } from "@tanstack/react-router";
import { PenLine } from "lucide-react";
import { Page, PageIntro } from "@/components/page";
import { dashboardStats, myDrafts, poems, readsSeries } from "@/lib/data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your studio — Versify dashboard" },
      {
        name: "description",
        content:
          "Track reads and listens, manage drafts and see how your poems travel — your Versify studio.",
      },
      { property: "og:title", content: "Your studio — Versify" },
      { property: "og:description", content: "Reads, listens and drafts in one quiet place." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const max = Math.max(...readsSeries.map((d) => d.reads));
  const mine = poems.slice(0, 4);

  return (
    <Page>
      <PageIntro
        eyebrow="Your studio"
        title="Good morning, Amara."
        lede="Three drafts are waiting and the harbour poem is having a week."
      />
      <section className="mx-auto max-w-6xl px-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dashboardStats.map((s, i) => (
            <div
              key={s.label}
              style={{ ["--i" as string]: i }}
              className="delay-step animate-rise rounded-lg border border-border bg-card p-5"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {s.label}
              </p>
              <p className="mt-3 font-display text-4xl">{s.value}</p>
              <p className="mt-1 text-xs text-accent">{s.delta} vs last month</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="animate-rise rounded-lg border border-border bg-card p-6">
            <h2 className="font-display text-2xl">This week</h2>
            <div className="mt-8 flex h-48 items-end gap-4">
              {readsSeries.map((d) => (
                <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex h-full w-full items-end justify-center gap-1">
                    <span
                      className="w-3 rounded-t bg-primary/80 transition-all duration-700"
                      style={{ height: `${(d.reads / max) * 100}%` }}
                    />
                    <span
                      className="w-3 rounded-t bg-accent transition-all duration-700"
                      style={{ height: `${(d.listens / max) * 100}%` }}
                    />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {d.day}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-6 flex gap-5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-primary/80" /> Reads
              </span>
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-accent" /> Listens
              </span>
            </p>
          </div>

          <div className="animate-rise rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl">Drafts</h2>
              <PenLine className="size-4 text-muted-foreground" />
            </div>
            <ul className="mt-5 space-y-4">
              {myDrafts.map((d) => (
                <li key={d.title} className="border-b border-border/70 pb-4 last:border-0">
                  <p className="font-display text-lg leading-tight">{d.title}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {d.mood} · {d.words} words · {d.updated}
                  </p>
                </li>
              ))}
            </ul>
            <button className="mt-5 w-full rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent">
              New poem
            </button>
          </div>
        </div>

        <h2 className="mt-14 font-display text-3xl">Published</h2>
        <ul className="mt-6 divide-y divide-border overflow-hidden rounded-lg border border-border">
          {mine.map((p) => (
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
                <span className="text-xs text-muted-foreground">{p.reads} reads</span>
                <span className="hidden text-xs text-muted-foreground sm:block">
                  {p.listens ?? "—"} listens
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Page>
  );
}
