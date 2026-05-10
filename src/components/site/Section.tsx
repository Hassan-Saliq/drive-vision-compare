import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-6 py-20 scroll-mt-24">
      <div className="mb-12 max-w-3xl animate-fade-up">
        {eyebrow && (
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs uppercase tracking-widest text-[var(--neon)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon)] animate-pulse" />
            {eyebrow}
          </div>
        )}
        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
          <span className="gradient-text">{title}</span>
        </h2>
        {description && <p className="mt-4 text-muted-foreground text-lg">{description}</p>}
      </div>
      {children}
    </section>
  );
}
