import { createFileRoute, Link } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { Page, PageIntro } from "@/components/page";
import { usePlayer, Waveform } from "@/components/player";
import { getPoet, poems } from "@/lib/data";

export const Route = createFileRoute("/listen")({
  head: () => ({
    meta: [
      { title: "Listen — spoken word on Versify" },
      {
        name: "description",
        content:
          "Hear poems performed by the poets who wrote them. Follow the text as the voice moves through it.",
      },
      { property: "og:title", content: "Listen — spoken word on Versify" },
      {
        property: "og:description",
        content: "Spoken-word performances with the written poem alongside.",
      },
    ],
  }),
  component: Listen,
});

function Listen() {
  const { play, current, playing, progress } = usePlayer();
  const audioPoems = poems.filter((p) => p.audio);
  const featured = current ?? audioPoems[0]!;
  const poet = getPoet(featured.poet);

  return (
    <Page>
      <PageIntro
        eyebrow="The stage"
        title="Hear it in the poet's own breath."
        lede="Spoken word belongs next to the page, not on a different platform. Play a performance and read along."
      />
      <section className="mx-auto max-w-6xl px-5">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="animate-rise overflow-hidden rounded-lg border border-border">
            <img
              src={poet?.cover}
              alt={poet?.name ?? ""}
              loading="lazy"
              className="h-56 w-full object-cover"
            />
            <div className="p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                Now on stage · {featured.mood}
              </p>
              <h2 className="mt-3 font-display text-4xl">{featured.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {poet?.name} · {poet?.city}
              </p>
              <div className="mt-6 flex items-center gap-4">
                <button
                  onClick={() => play(featured)}
                  className="grid size-12 place-items-center rounded-full bg-accent text-accent-foreground transition-transform hover:scale-105"
                >
                  <Play className="size-4" />
                </button>
                <Waveform
                  bars={featured.audio!.waveform}
                  progress={current?.id === featured.id ? progress : 0}
                  playing={playing && current?.id === featured.id}
                  className="h-12 flex-1"
                />
                <span className="font-mono text-xs text-muted-foreground">
                  {featured.audio!.duration}
                </span>
              </div>
            </div>
          </div>
          <article className="animate-rise rounded-lg border border-border bg-card p-8">
            <p className="verse text-lg">{featured.body}</p>
            <Link
              to="/poem/$id"
              params={{ id: featured.id }}
              className="mt-8 inline-block text-sm text-muted-foreground hover:text-accent"
            >
              Open the poem page →
            </Link>
          </article>
        </div>

        <h2 className="mt-16 font-display text-3xl">Queue</h2>
        <div className="mt-6 divide-y divide-border overflow-hidden rounded-lg border border-border">
          {audioPoems.map((p, i) => {
            const pp = getPoet(p.poet);
            return (
              <button
                key={p.id}
                onClick={() => play(p)}
                className="flex w-full items-center gap-4 bg-card px-5 py-4 text-left transition-colors hover:bg-secondary/60"
              >
                <span className="font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display text-xl">{p.title}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {pp?.name} · {p.listens} listens
                  </span>
                </span>
                <span className="hidden font-mono text-[10px] uppercase tracking-widest text-accent sm:block">
                  {p.mood}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {p.audio!.duration}
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </Page>
  );
}