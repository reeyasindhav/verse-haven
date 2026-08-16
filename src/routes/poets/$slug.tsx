import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Page } from "@/components/page";
import { PoemCard } from "@/components/poem-card";
import { getPoet, poemsByPoet } from "@/lib/data";

export const Route = createFileRoute("/poets/$slug")({
  loader: ({ params }) => {
    const poet = getPoet(params.slug);
    if (!poet) throw notFound();
    return { poet };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Poet not found — Versify" }, { name: "robots", content: "noindex" }],
      };
    }
    const { poet } = loaderData;
    return {
      meta: [
        { title: `${poet.name} — poems & performances on Versify` },
        { name: "description", content: poet.bio },
        { property: "og:title", content: `${poet.name} on Versify` },
        { property: "og:description", content: poet.bio },
        { property: "og:type", content: "profile" },
      ],
    };
  },
  component: PoetPage,
  notFoundComponent: PoetNotFound,
});

function PoetNotFound() {
  return (
    <Page>
      <section className="mx-auto max-w-xl px-5 py-28 text-center">
        <h1 className="font-display text-5xl">No poet by that name.</h1>
        <Link to="/poets" className="mt-8 inline-block text-sm text-accent">
          See all poets →
        </Link>
      </section>
    </Page>
  );
}

function PoetPage() {
  const { poet } = Route.useLoaderData();
  const list = poemsByPoet(poet.slug);

  return (
    <Page>
      <section className="relative border-b border-border">
        <img src={poet.cover} alt="" loading="lazy" className="h-64 w-full object-cover" />
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-wrap items-end gap-5 pb-8">
            <img
              src={poet.avatar}
              alt={poet.name}
              className="-mt-14 size-28 rounded-full border-4 border-background object-cover"
            />
            <div className="animate-rise">
              <h1 className="font-display text-5xl leading-none">{poet.name}</h1>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                {poet.handle} · {poet.city}
              </p>
            </div>
            <button className="ml-auto rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground transition-transform hover:-translate-y-0.5">
              Follow
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <aside className="animate-rise">
            <p className="verse text-lg">{poet.bio}</p>
            <dl className="mt-8 space-y-3 text-sm">
              <div className="flex justify-between border-b border-border pb-2">
                <dt className="text-muted-foreground">Followers</dt>
                <dd>{poet.followers}</dd>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <dt className="text-muted-foreground">Poems</dt>
                <dd>{poet.poems}</dd>
              </div>
            </dl>
            <div className="mt-6 flex flex-wrap gap-2">
              {poet.forms.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                >
                  {f}
                </span>
              ))}
            </div>
          </aside>
          <div>
            <h2 className="font-display text-3xl">Selected work</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {list.map((p, i) => (
                <PoemCard key={p.id} poem={p} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}
