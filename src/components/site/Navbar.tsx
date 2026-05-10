import { Link } from "@tanstack/react-router";
import { Brain, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/modules", label: "Modules" },
  { to: "/comparison", label: "Comparison" },
  { to: "/prediction", label: "Live Demo" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 glass-strong">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-[var(--neon)] to-[var(--violet)] glow">
            <Brain className="h-5 w-5 text-background" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold gradient-text">NeuralDrive</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Perceptron · MLP</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-4 py-2 text-sm rounded-md text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "px-4 py-2 text-sm rounded-md text-foreground bg-secondary" }}
              activeOptions={{ exact: true }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-md hover:bg-secondary">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <nav className="md:hidden border-t border-border px-4 py-3 flex flex-col gap-1 bg-card/80">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="px-3 py-2 rounded-md text-sm hover:bg-secondary">
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
