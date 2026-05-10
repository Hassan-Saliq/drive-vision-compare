import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Database, Cpu, Network, BarChart3, CheckCircle2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/modules")({
  head: () => ({
    meta: [
      { title: "Modules — NeuralDrive" },
      { name: "description", content: "The four modules that make up the Perceptron vs MLP capstone pipeline." },
    ],
  }),
  component: ModulesPage,
});

const modules = [
  {
    icon: Database, name: "Module 1", title: "Data Collection & Preprocessing",
    desc: "Curate a labeled driving image dataset and prepare it for model training.",
    procedure: ["Source frames from public driving datasets", "Label four classes: Stop, Go, Turn-L, Turn-R", "Clean corrupt or duplicate samples"],
    steps: ["Resize to 64×64 grayscale", "Normalize pixel values to [0, 1]", "Apply Gaussian denoising", "Stratified 82/18 train-test split"],
  },
  {
    icon: Cpu, name: "Module 2", title: "Perceptron Implementation",
    desc: "A single-layer perceptron baseline using NumPy.",
    procedure: ["Initialize random weights", "Apply step activation function", "Use perceptron learning rule", "Iterate until convergence"],
    steps: ["Flatten image to 4096-d vector", "Train for 20 epochs", "Track per-epoch accuracy", "Save weights to disk"],
  },
  {
    icon: Network, name: "Module 3", title: "MLP Model",
    desc: "Multilayer Neural Network with non-linear activations using TensorFlow / Keras.",
    procedure: ["Define dense architecture", "Use ReLU + Softmax activations", "Compile with Adam + categorical crossentropy", "Train with early stopping"],
    steps: ["4096 → 256 → 128 → 64 → 4", "Dropout 0.3 between hidden layers", "Batch size 64, lr 1e-3", "Save best model on val_acc"],
  },
  {
    icon: BarChart3, name: "Module 4", title: "Performance Comparison",
    desc: "Benchmark both models with a unified evaluation pipeline.",
    procedure: ["Load both saved models", "Run on same test set", "Compute metrics", "Generate plots & report"],
    steps: ["Accuracy, precision, recall, F1", "Confusion matrices", "Inference latency", "Final comparative report"],
  },
];

function ModulesPage() {
  return (
    <Section eyebrow="Pipeline" title="Project modules" description="A deeper look at each stage of the NeuralDrive capstone.">
      <div className="space-y-6">
        {modules.map((m, i) => (
          <div key={m.title} className="glass rounded-2xl p-6 md:p-8 hover-lift gradient-border animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br from-[var(--neon)] to-[var(--violet)] text-background glow">
                  <m.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-[var(--neon)]">{m.name}</div>
                  <h3 className="text-2xl font-bold">{m.title}</h3>
                  <p className="text-muted-foreground mt-1 max-w-2xl">{m.desc}</p>
                </div>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 mt-6">
              <div>
                <div className="text-sm font-semibold mb-3 text-[var(--violet)]">Procedure</div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {m.procedure.map((p) => (
                    <li key={p} className="flex items-start gap-2"><ArrowRight className="h-4 w-4 mt-0.5 text-[var(--neon)]" />{p}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-sm font-semibold mb-3 text-[var(--violet)]">Implementation steps</div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {m.steps.map((s) => (
                    <li key={s} className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-[var(--neon)]" />{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
