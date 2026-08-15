import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export function Page({ children, footer = true }: { children: ReactNode; footer?: boolean }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pb-28">{children}</main>
      {footer && <SiteFooter />}
    </div>
  );
}

export function PageIntro({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-16 pb-10">
      <p className="animate-fade font-mono text-xs uppercase tracking-[0.3em] text-accent">
        {eyebrow}
      </p>
      <h1 className="animate-rise mt-4 font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
        {title}
      </h1>
      {lede && (
        <p className="animate-rise mt-5 max-w-xl text-base text-muted-foreground">{lede}</p>
      )}
    </section>
  );
}