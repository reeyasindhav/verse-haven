import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Page, PageIntro } from "@/components/page";
import { PoemCard } from "@/components/poem-card";
import { moods, poems } from "@/lib/data";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore poems — Versify" },
      {
        name: "description",
        content:
          "Browse every poem on Versify by mood, form and voice. Written verse and spoken-word recordings in one feed.",
      },
      { property: "og:title", content: "Explore poems — Versify" },
      {
        property: "og:description",
        content: "Browse poems by mood, form and voice — written and spoken.",
      },
    ],
  }),
  component: Explore,
});

const forms = ["All forms", "Free verse", "Spoken word", "Sonnet", "Ghazal", "Elegy", "Prose poem"];

function Explore() {
  const [q, setQ] = useState("");
  const [mood, setMood] = useState("All moods");
  const [form, setForm] = useState("All forms");
  const [audioOnly, setAudioOnly] = useState(false);

  const results = useMemo(
    () =>
      poems.filter(
        (p) =>
          (mood === "All moods" || p.mood === mood) &&
          (form === "All forms" || p.form === form) &&
          (!audioOnly || p.audio) &&
          (q === "" ||
            p.title.toLowerCase().includes(q.toLowerCase()) ||
            p.body.toLowerCase().includes(q.toLowerCase())),
      ),
    [q, mood, form, audioOnly],
  );

  return (
    <Page>
      <PageIntro
        eyebrow="Explore"
        title="Find the poem that already knows."
        lede="Filter by feeling, not by follower count. Every poem keeps its original spacing and stanza breaks."
      />
      <section className="mx-auto max-w-6xl px-5">
        <div className="rounded-lg border border-border bg-card p-5">
          <label className="flex items-center gap-3 border-b border-border pb-4">
            <Search className="size-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search a line, a title, a feeling…"
              className="w-full bg-transparent font-display text-2xl outline-none placeholder:text-muted-foreground/60"
            />
          </label>
          <div className="mt-4 flex flex-wrap gap-2">
            {["All moods", ...moods.map((m) => m.name)].map((m) => (
              <button
                key={m}
                onClick={() => setMood(m)}
                className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  mood === m
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border hover:border-accent"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {forms.map((f) => (
              <button
                key={f}
                onClick={() => setForm(f)}
                className={`font-mono text-[11px] uppercase tracking-widest transition-colors ${
                  form === f ? "text-accent" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
            <button
              onClick={() => setAudioOnly((v) => !v)}
              className={`ml-auto rounded-full border px-3 py-1.5 text-xs transition-colors ${
                audioOnly ? "border-accent text-accent" : "border-border text-muted-foreground"
              }`}
            >
              Audio only
            </button>
          </div>
        </div>

        <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {results.length} poem{results.length === 1 ? "" : "s"}
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p, i) => (
            <PoemCard key={p.id} poem={p} index={i} />
          ))}
        </div>
        {results.length === 0 && (
          <p className="verse py-20 text-center text-2xl text-muted-foreground">
            {"Nothing here yet —\nthe silence is also a form."}
          </p>
        )}
      </section>
    </Page>
  );
}