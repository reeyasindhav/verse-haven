import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Bookmark, Headphones, Play, Share2 } from "lucide-react";
import { Page } from "@/components/page";
import { MoodTag, PoemCard } from "@/components/poem-card";
import { usePlayer, Waveform } from "@/components/player";
import { getPoem, getPoet, poems } from "@/lib/data";

export const Route = createFileRoute("/poem/$id")({
  loader: ({ params }) => {
    const poem = getPoem(params.id);
    if (!poem) throw notFound();
    return { poem };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Poem not found — Versify" }, { name: "robots", content: "noindex" }],
      };
    }
    const { poem } = loaderData;
    const desc = poem.excerpt.replace(/\n/g, " ");
    return {
      meta: [
        { title: `${poem.title} — Versify` },
        { name: "description", content: desc },
        { property: "og:title", content: `${poem.title} — Versify` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: PoemPage,
  notFoundComponent: PoemNotFound,
});

function PoemNotFound() {
  return (
    <Page>
      <section className="mx-auto max-w-xl px-5 py-28 text-center">
        <h1 className="font-display text-5xl">This poem has gone quiet.</h1>
        <p className="mt-4 text-muted-foreground">
          The verse you're looking for isn't here anymore.
        </p>
        <Link to="/explore" className="mt-8 inline-block text-sm text-accent">
          Back to Explore →
        </Link>
      </section>
    </Page>
  );
}

function PoemPage() {
  const { poem } = Route.useLoaderData();
  const poet = getPoet(poem.poet);
  const { play, current, playing, progress } = usePlayer();
  const isCurrent = current?.id === poem.id;
  const related = poems.filter((p) => p.id !== poem.id && p.mood === poem.mood).slice(0, 3);

  return (
    <Page>
      <article className="mx-auto max-w-3xl px-5 pt-16">
        <div className="animate-fade flex items-center gap-4">
          <MoodTag mood={poem.mood} />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {poem.form} · {poem.date}
          </span>
        </div>
        <h1 className="animate-rise mt-5 font-display text-5xl leading-[1.05] sm:text-6xl">
          {poem.title}
        </h1>

        <Link
          to="/poets/$slug"
          params={{ slug: poem.poet }}
          className="animate-rise mt-7 flex items-center gap-3"
        >
          <img
            src={poet?.avatar}
            alt={poet?.name ?? ""}
            loading="lazy"
            className="size-10 rounded-full object-cover"
          />
          <span>
            <span className="block text-sm">{poet?.name}</span>
            <span className="block text-xs text-muted-foreground">{poet?.city}</span>
          </span>
        </Link>

        {poem.audio && (
          <div className="animate-rise mt-8 flex items-center gap-4 rounded-lg border border-border bg-card p-4">
            <button
              onClick={() => play(poem)}
              aria-label="Play performance"
              className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground transition-transform hover:scale-105"
            >
              <Play className="size-4" />
            </button>
            <Waveform
              bars={poem.audio.waveform}
              progress={isCurrent ? progress : 0}
              playing={playing && isCurrent}
              className="h-10 flex-1"
            />
            <span className="font-mono text-xs text-muted-foreground">{poem.audio.duration}</span>
          </div>
        )}

        <p className="verse animate-rise mt-12 text-xl leading-[1.9]">{poem.body}</p>

        {poem.note && (
          <p className="mt-12 border-l-2 border-accent/60 pl-4 text-sm italic text-muted-foreground">
            {poem.note}
          </p>
        )}

        <div className="mt-12 flex items-center gap-5 border-y border-border py-4 text-sm text-muted-foreground">
          <span>{poem.reads} reads</span>
          {poem.listens && (
            <span className="flex items-center gap-1">
              <Headphones className="size-3.5" /> {poem.listens}
            </span>
          )}
          <button className="ml-auto flex items-center gap-2 hover:text-accent">
            <Bookmark className="size-4" /> Save
          </button>
          <button className="flex items-center gap-2 hover:text-accent">
            <Share2 className="size-4" /> Share
          </button>
        </div>
      </article>

      {related.length > 0 && (
        <section className="mx-auto mt-20 max-w-6xl px-5">
          <h2 className="font-display text-3xl">More in {poem.mood}</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {related.map((p, i) => (
              <PoemCard key={p.id} poem={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </Page>
  );
}
