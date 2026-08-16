import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Page } from "@/components/page";
import { moods } from "@/lib/data";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Start writing — join Versify" },
      {
        name: "description",
        content:
          "Create a Versify account to publish poems, upload spoken-word recordings and find your readers.",
      },
      { property: "og:title", content: "Start writing — join Versify" },
      {
        property: "og:description",
        content: "Publish verse and performances on one dedicated stage.",
      },
    ],
  }),
  component: Signup,
});

function Signup() {
  const navigate = useNavigate();
  const [picked, setPicked] = useState<string[]>(["Longing"]);

  const toggle = (m: string) =>
    setPicked((p) => (p.includes(m) ? p.filter((x) => x !== m) : [...p, m]));

  return (
    <Page footer={false}>
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-2">
        <div className="animate-rise">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Join Versify</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05]">
            A stage for the page and the voice.
          </h1>
          <ul className="mt-8 space-y-4 text-sm text-muted-foreground">
            <li>— Publish poems with line breaks that survive.</li>
            <li>— Upload the performance beside the text.</li>
            <li>— Be found by mood, not by algorithmic accident.</li>
          </ul>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/dashboard" });
          }}
          className="animate-rise rounded-lg border border-border bg-card p-8"
        >
          <h2 className="font-display text-3xl">Create your account</h2>
          <label className="mt-6 block text-sm">
            <span className="text-muted-foreground">Pen name</span>
            <input
              required
              placeholder="Amara Quill"
              className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent"
            />
          </label>
          <label className="mt-4 block text-sm">
            <span className="text-muted-foreground">Email</span>
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent"
            />
          </label>
          <label className="mt-4 block text-sm">
            <span className="text-muted-foreground">Password</span>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent"
            />
          </label>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Moods you write in
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {moods.map((m) => (
              <button
                type="button"
                key={m.name}
                onClick={() => toggle(m.name)}
                className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                  picked.includes(m.name)
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-muted-foreground hover:border-accent/50"
                }`}
              >
                {m.name}
              </button>
            ))}
          </div>
          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-primary px-4 py-2.5 text-sm text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Start writing
          </button>
          <p className="mt-6 text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-accent hover:opacity-70">
              Sign in
            </Link>
          </p>
        </form>
      </section>
    </Page>
  );
}
