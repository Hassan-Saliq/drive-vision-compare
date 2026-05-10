import { Brain, Github, Mail } from "lucide-react";

const team = [
  { name: "Hassan Saliq", id: "192421322" },
  { name: "Mohammed Safwaan", id: "192421385" },
  { name: "Sabari Kannan", id: "192412605" },
  { name: "Rampreetham", id: "192412550" },
];

export function Footer() {
  return (
    <footer className="border-t border-border mt-24 bg-card/40 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-[var(--neon)] to-[var(--violet)] glow">
              <Brain className="h-5 w-5 text-background" />
            </div>
            <div className="font-bold gradient-text">Sfwan Vision</div>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            A capstone research project comparing Perceptron and Multilayer Neural Network architectures for autonomous driving classification.
          </p>
          <p className="text-xs text-muted-foreground mt-3">Subject: Machine Learning for Medical Intelligence</p>
        </div>
        <div>
          <div className="text-sm font-semibold mb-3 text-foreground">Team</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {team.map((m) => (
              <li key={m.id} className="flex justify-between gap-4">
                <span>{m.name}</span>
                <span className="font-mono text-xs text-[var(--neon)]">{m.id}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold mb-3 text-foreground">Resources</div>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <a className="flex items-center gap-2 hover:text-foreground" href="#"><Github className="h-4 w-4" /> GitHub Repository</a>
            <a className="flex items-center gap-2 hover:text-foreground" href="#"><Mail className="h-4 w-4" /> Contact Team</a>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Sfwan Vision · Final Year ML Capstone Project
      </div>
    </footer>
  );
}
