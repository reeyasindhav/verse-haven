import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <p className="font-display text-3xl">
            Versify<span className="text-accent">.</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            A stage for the written line and the spoken breath. Line breaks preserved, always.
          </p>
        </div>
        <FooterCol
          title="Discover"
          links={[
            { to: "/explore", label: "Explore" },
            { to: "/moods", label: "Moods" },
            { to: "/listen", label: "Listen" },
            { to: "/collections", label: "Collections" },
          ]}
        />
        <FooterCol
          title="Poets"
          links={[
            { to: "/poets", label: "Directory" },
            { to: "/dashboard", label: "Dashboard" },
            { to: "/dashboard/write", label: "Write a poem" },
            { to: "/about", label: "About" },
          ]}
        />
        <FooterCol
          title="Account"
          links={[
            { to: "/login", label: "Sign in" },
            { to: "/signup", label: "Create account" },
          ]}
        />
      </div>
      <div className="border-t border-border px-5 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Versify — mockup data, made for reading aloud.
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { to: string; label: string }[];
}) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{title}</p>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="transition-colors hover:text-accent">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}