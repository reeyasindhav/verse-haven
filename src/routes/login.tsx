import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Page } from "@/components/page";
import { useAuth } from "@/lib/auth";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Versify" },
      {
        name: "description",
        content: "Sign in to Versify to save poems, follow poets and publish your own verse.",
      },
      { property: "og:title", content: "Sign in — Versify" },
      { property: "og:description", content: "Return to your notebook and your saved poems." },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { signIn } = useStore();
  const [email, setEmail] = useState("");

  return (
    <Page footer={false}>
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-2">
        <div className="animate-rise">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Welcome back</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05]">
            The notebook stayed open where you left it.
          </h1>
          <p className="verse mt-8 text-lg text-muted-foreground">
            Every draft you abandoned{"\n"}is still waiting, patient as a harbour.
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login();
            signIn(email);
            navigate({ to: "/dashboard" });
          }}
          className="animate-rise rounded-lg border border-border bg-card p-8"
        >
          <h2 className="font-display text-3xl">Sign in</h2>
          <label className="mt-6 block text-sm">
            <span className="text-muted-foreground">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-primary px-4 py-2.5 text-sm text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Continue
          </button>
          <p className="mt-6 text-sm text-muted-foreground">
            New here?{" "}
            <Link to="/signup" className="text-accent hover:opacity-70">
              Start writing
            </Link>
          </p>
        </form>
      </section>
    </Page>
  );
}
