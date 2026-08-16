import { createFileRoute, Link } from "@tanstack/react-router";
import { Feather, Mic2, Compass, BookOpen } from "lucide-react";
import { Page, PageIntro } from "@/components/page";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Versify — Poetry & spoken word" },
      {
        name: "description",
        content:
          "Versify is a stage for poetry and spoken word: faithful typography, mood-based discovery, and audio performances beside the written line.",
      },
      { property: "og:title", content: "About Versify — Poetry & spoken word" },
      {
        property: "og:description",
        content: "A dedicated stage for verse — read it as written, hear it as performed.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <Page>
      <PageIntro
        eyebrow="Our story"
        title="We built Versify because poetry deserves better than a timeline."
        lede="A quiet place to read, listen, and publish verse without losing the line breaks, the silence, or the breath in between."
      />

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl">The line break is the poem.</h2>
            <p className="mt-4 text-muted-foreground">
              Most platforms flatten verse into paragraphs. Versify preserves the space between words
              and lines — because that space is where the poem lives. Whether you are reading a sonnet
              on a screen or listening to a poet perform it in a kitchen, the form should survive the
              medium.
            </p>
            <p className="mt-4 text-muted-foreground">
              We started with a simple observation: poetry apps either treat poems like blog posts or
              like museum exhibits. Neither feels like poetry. Versify is the stage in between — where
              the written line and the spoken breath meet.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-accent">What we believe</p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-1 rounded-full bg-primary/10 p-1.5 text-primary">
                  <Feather className="size-4" />
                </span>
                <div>
                  <p className="font-display text-lg">Form matters</p>
                  <p className="text-sm text-muted-foreground">
                    Indentation, spacing, and line breaks are not decoration — they are meaning.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 rounded-full bg-primary/10 p-1.5 text-primary">
                  <Mic2 className="size-4" />
                </span>
                <div>
                  <p className="font-display text-lg">Voice is part of the text</p>
                  <p className="text-sm text-muted-foreground">
                    Every poem on Versify can be heard as well as read. Audio is not an add-on; it is
                    the other half of the work.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 rounded-full bg-primary/10 p-1.5 text-primary">
                  <Compass className="size-4" />
                </span>
                <div>
                  <p className="font-display text-lg">Mood over algorithm</p>
                  <p className="text-sm text-muted-foreground">
                    We believe you find poetry by how you feel, not by what an algorithm decides you
                    should read next.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 rounded-full bg-primary/10 p-1.5 text-primary">
                  <BookOpen className="size-4" />
                </span>
                <div>
                  <p className="font-display text-lg">Poets first</p>
                  <p className="text-sm text-muted-foreground">
                    The platform serves the writer, not the other way around. Your drafts stay yours.
                    Your voice stays yours.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="font-display text-3xl">How it works</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-accent">01</p>
              <p className="mt-3 font-display text-xl">Discover by mood</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Browse Longing, Joy, Rage, Grief, and more. Find the poem that matches the weather
                inside you.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-accent">02</p>
              <p className="mt-3 font-display text-xl">Read and listen</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Open any poem and hear the poet read it. Line breaks, pauses, and emphasis are all
                part of the performance.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-accent">03</p>
              <p className="mt-3 font-display text-xl">Publish your verse</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Create a poet page, save drafts, and publish written and spoken work side by side.
                Spacing and silence survive the upload.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="font-display text-3xl">A note from the team</h2>
        <div className="mt-8 max-w-3xl space-y-4 text-muted-foreground">
          <p>
            Versify is made by a small team of readers, writers, and developers who believe that
            poetry should not have to fight for attention on the internet. We built this space
            because we were tired of watching verse get flattened into captions, compressed into
            tweets, and stripped of the very things that make it worth reading.
          </p>
          <p>
            If you are a poet, a reader, or someone who just likes the sound of words in order,
            welcome. The notebook is open. The line breaks are intact.
          </p>
          <p>
            Have feedback, ideas, or a poem you want to share?{" "}
            <Link to="/signup" className="text-accent hover:opacity-70">
              Create an account
            </Link>{" "}
            or{" "}
            <Link to="/explore" className="text-accent hover:opacity-70">
              start reading
            </Link>
            .
          </p>
        </div>
      </section>
    </Page>
  );
}
