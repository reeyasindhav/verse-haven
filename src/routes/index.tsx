import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Play } from "lucide-react";
import { Page } from "@/components/page";
import { PoemCard, MoodTag } from "@/components/poem-card";
import { usePlayer, Waveform } from "@/components/player";
import { collections, getPoet, moods, poemOfTheDay, poems, poets } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Versify — Read poems, hear them spoken" },
      {
        name: "description",
        content:
          "Discover poetry by mood, read verse with its line breaks intact, and listen to the poet perform it. Versify is the stage for written and spoken word.",
      },
      { property: "og:title", content: "Versify — Read poems, hear them spoken" },
      {
        property: "og:description",
        content: "Mood-based poetry discovery with spoken-word audio beside every poem.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { play } = usePlayer();
  const potdPoet = getPoet(poemOfTheDay.poet);

  return (
    <Page>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="animate-inkflow pointer-events-none absolute -top-40 right-[-10%] size-[36rem] rounded-full opacity-25 blur-3xl"
          style={{ background: "var(--gradient-dusk)" }}
        />
        <div className="mx-auto max-w-6xl px-5 pt-24 pb-16">
          <p className="animate-fade font-mono text-xs uppercase tracking-[0.35em] text-accent">
            Poetry &amp; spoken word
          </p>
          <h1 className="animate-rise mt-6 max-w-3xl font-display text-6xl leading-[0.98] tracking-tight sm:text-7xl md:text-8xl">
            The line break
            <br />
            <span className="italic text-accent">is the poem.</span>
          </h1>
          <p className="animate-rise delay-step mt-8 max-w-lg text-lg text-muted-foreground" style={{ ["--i" as string]: 2 }}>
            A dedicated stage for verse — read it as written, hear it as performed, and find it by
            how you feel rather than what an algorithm decides.
          </p>
          <div className="animate-rise mt-10 flex flex-wrap items-center gap-3" style={{ ["--i" as string]: 3 }}>
            <Link
              to="/explore"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Start reading
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/listen"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm transition-colors hover:border-accent hover:text-accent"
            >
              <Play className="size-3.5" /> Listen to the stage
            </Link>
          </div>
        </div>

        {/* moods marquee */}
        <div className="overflow-hidden border-y border-border py-4">
          <div className="animate-marquee flex w-max gap-8 whitespace-nowrap">
            {[...moods, ...moods].map((m, i) => (
              <span key={i} className="font-display text-2xl text-muted-foreground/70">
                {m.name} <span className="text-accent">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Poem of the day */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-display text-3xl">Poem of the day</h2>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {poemOfTheDay.date}
          </span>
        </div>
        <div className="mt-8 grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <article className="animate-rise rounded-lg border border-border bg-card p-8 shadow-[var(--shadow-page)] sm:p-12">
            <MoodTag mood={poemOfTheDay.mood} />
            <h3 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
              {poemOfTheDay.title}
            </h3>
            <p className="verse mt-8 text-lg sm:text-xl">{poemOfTheDay.body}</p>
            {poemOfTheDay.note && (
              <p className="mt-8 border-l-2 border-accent pl-4 text-sm italic text-muted-foreground">
                {poemOfTheDay.note}
              </p>
            )}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/poets/$slug"
                params={{ slug: poemOfTheDay.poet }}
                className="flex items-center gap-3"
              >
                <img
                  src={potdPoet?.avatar}
                  alt={potdPoet?.name ?? ""}
                  loading="lazy"
                  className="size-10 rounded-full object-cover"
                />
                <span>
                  <span className="block text-sm">{potdPoet?.name}</span>
                  <span className="block text-xs text-muted-foreground">{potdPoet?.city}</span>
                </span>
              </Link>
              {poemOfTheDay.audio && (
                <button
                  onClick={() => play(poemOfTheDay)}
                  className="ml-auto inline-flex items-center gap-3 rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
                >
                  <Play className="size-3.5" />
                  Hear the poet read it
                  <span className="font-mono text-xs text-muted-foreground">
                    {poemOfTheDay.audio.duration}
                  </span>
                </button>
              )}
            </div>
          </article>

          <aside className="space-y-6">
            <div className="rounded-lg border border-border p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Pick a mood
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {moods.map((m) => (
                  <Link
                    key={m.name}
                    to="/moods/$mood"
                    params={{ mood: m.name.toLowerCase() }}
                    className="rounded-full border border-border px-3 py-1.5 text-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                  >
                    {m.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-border p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Voices to follow
              </p>
              <ul className="mt-4 space-y-4">
                {poets.slice(0, 4).map((p) => (
                  <li key={p.slug}>
                    <Link
                      to="/poets/$slug"
                      params={{ slug: p.slug }}
                      className="group flex items-center gap-3"
                    >
                      <img
                        src={p.avatar}
                        alt={p.name}
                        loading="lazy"
                        className="size-9 rounded-full object-cover"
                      />
                      <span className="min-w-0">
                        <span className="block truncate text-sm group-hover:text-accent">
                          {p.name}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {p.handle} · {p.followers}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Fresh verse */}
      <section className="mx-auto max-w-6xl px-5">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-3xl">Fresh verse</h2>
          <Link to="/explore" className="text-sm text-muted-foreground hover:text-accent">
            Explore all →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {poems.slice(1, 7).map((p, i) => (
            <PoemCard key={p.id} poem={p} index={i} />
          ))}
        </div>
      </section>

      {/* Stage / audio strip */}
      <section className="mt-24 border-y border-border bg-secondary/40 py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="font-display text-3xl">On the stage tonight</h2>
          <div className="mt-8 space-y-3">
            {poems
              .filter((p) => p.audio)
              .map((p, i) => {
                const poet = getPoet(p.poet);
                return (
                  <button
                    key={p.id}
                    onClick={() => play(p)}
                    style={{ ["--i" as string]: i }}
                    className="delay-step group flex w-full animate-rise items-center gap-4 rounded-lg border border-transparent bg-card px-5 py-4 text-left transition-all hover:border-accent/40"
                  >
                    <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-110">
                      <Play className="size-3" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-display text-xl">{p.title}</span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {poet?.name} · {p.mood}
                      </span>
                    </span>
                    <Waveform bars={p.audio!.waveform.slice(0, 32)} className="hidden h-8 sm:flex" />
                    <span className="font-mono text-xs text-muted-foreground">
                      {p.audio!.duration}
                    </span>
                  </button>
                );
              })}
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="font-display text-3xl">Curated collections</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {collections.map((c, i) => (
            <Link
              key={c.id}
              to="/collections"
              style={{ ["--i" as string]: i }}
              className="delay-step group relative animate-rise overflow-hidden rounded-lg border border-border"
            >
              <img
                src={c.cover}
                alt={c.title}
                loading="lazy"
                className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <span className="absolute bottom-5 left-5">
                <span className="block font-display text-2xl">{c.title}</span>
                <span className="block text-xs text-muted-foreground">
                  {c.count} poems · {c.curator}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5">
        <div className="rounded-lg border border-border p-10 text-center sm:p-16">
          <h2 className="font-display text-4xl sm:text-5xl">Your stanzas deserve a stage.</h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Publish written poems and recordings side by side. Spacing, indentation and silence all
            survive the upload.
          </p>
          <Link
            to="/signup"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm text-accent-foreground transition-transform hover:-translate-y-0.5"
          >
            Create your poet page <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </Page>
  );
}
