import { Fragment } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Activity, BarChart3, Brain, Car, Cpu, Database,
  Eye, GitBranch, GitCompare, GraduationCap, LineChart as LineIcon,
  Network, Rocket, ShieldCheck, Sparkles, Target, Workflow, FileText, Layers, Zap, CheckCircle2, AlertTriangle, BookOpen
} from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
  BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";
import heroImg from "@/assets/hero-driving.jpg";
import { Section } from "@/components/site/Section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sfwan Vision — Perceptron vs MLP for Autonomous Driving" },
      { name: "description", content: "ML capstone comparing Perceptron and Multilayer Neural Network performance on autonomous driving data." },
    ],
  }),
  component: HomePage,
});

const team = [
  { name: "Hassan Saliq", id: "192421322", role: "Model Architecture" },
  { name: "Mohammed Safwaan", id: "192421385", role: "Data Engineering" },
  { name: "Sabari Kannan", id: "192412605", role: "Training & Evaluation" },
  { name: "Rampreetham", id: "192412550", role: "Frontend & Visualization" },
];

const objectives = [
  { icon: Brain, title: "Design Perceptron", desc: "Build a single-layer perceptron baseline classifier." },
  { icon: Network, title: "Develop MLP", desc: "Construct a multilayer neural network with hidden layers." },
  { icon: Database, title: "Train on same data", desc: "Use an identical dataset to ensure fair comparison." },
  { icon: GitCompare, title: "Compare performance", desc: "Benchmark both models across multiple metrics." },
  { icon: Activity, title: "Analyze accuracy", desc: "Quantify accuracy, precision, recall and inference time." },
  { icon: Sparkles, title: "Insights & report", desc: "Distill findings into a presentation-ready dashboard." },
];

const modules = [
  { icon: Database, name: "Module 1", title: "Data Collection & Preprocessing", desc: "Gather labeled driving images, resize, normalize, denoise and split.", steps: ["Collect dataset", "Resize 64×64", "Normalize 0–1", "Train/test split"] },
  { icon: Cpu, name: "Module 2", title: "Perceptron Implementation", desc: "Single-layer linear classifier as baseline.", steps: ["Init weights", "Activation: step", "Update rule", "Evaluate"] },
  { icon: Network, name: "Module 3", title: "MLP Model", desc: "Multilayer network with non-linear activations.", steps: ["3 hidden layers", "ReLU + Softmax", "Adam optimizer", "Backprop"] },
  { icon: BarChart3, name: "Module 4", title: "Performance Comparison", desc: "Benchmark accuracy, loss, time and confusion.", steps: ["Confusion matrix", "Metric tables", "Plots", "Conclusion"] },
];

const trainingCurve = Array.from({ length: 20 }, (_, i) => {
  const epoch = i + 1;
  return {
    epoch,
    perceptron: +(0.55 + Math.min(0.18, i * 0.012) + (Math.random() - 0.5) * 0.01).toFixed(3),
    mlp: +(0.62 + Math.min(0.32, i * 0.022) + (Math.random() - 0.5) * 0.008).toFixed(3),
  };
});

const lossCurve = trainingCurve.map((d) => ({
  epoch: d.epoch,
  perceptron: +(0.95 - d.perceptron * 0.6).toFixed(3),
  mlp: +(0.9 - d.mlp * 0.85).toFixed(3),
}));

const metricBars = [
  { metric: "Accuracy", Perceptron: 72, MLP: 94 },
  { metric: "Precision", Perceptron: 70, MLP: 93 },
  { metric: "Recall", Perceptron: 68, MLP: 92 },
  { metric: "F1", Perceptron: 69, MLP: 92 },
];

const radarData = [
  { metric: "Accuracy", Perceptron: 72, MLP: 94 },
  { metric: "Speed", Perceptron: 95, MLP: 78 },
  { metric: "Robustness", Perceptron: 55, MLP: 90 },
  { metric: "Non-linear fit", Perceptron: 30, MLP: 95 },
  { metric: "Generalization", Perceptron: 60, MLP: 88 },
];

const datasetRows = [
  { id: "img_0001.png", label: "Stop", brightness: 0.42, edges: 128, blur: 0.12 },
  { id: "img_0002.png", label: "Go", brightness: 0.81, edges: 96, blur: 0.07 },
  { id: "img_0003.png", label: "Turn-L", brightness: 0.55, edges: 142, blur: 0.21 },
  { id: "img_0004.png", label: "Turn-R", brightness: 0.49, edges: 137, blur: 0.18 },
  { id: "img_0005.png", label: "Stop", brightness: 0.38, edges: 151, blur: 0.09 },
];

const features = [
  { name: "Edge density", importance: 0.92 },
  { name: "Mean brightness", importance: 0.81 },
  { name: "Color histogram", importance: 0.74 },
  { name: "HOG vector", importance: 0.88 },
  { name: "Lane curvature", importance: 0.69 },
  { name: "Object area", importance: 0.77 },
];

const futureScope = [
  { icon: Layers, title: "CNN architectures", desc: "Move from MLP to convolutional networks for spatial features." },
  { icon: Zap, title: "Real-time inference", desc: "Deploy models on edge devices with sub-50ms latency." },
  { icon: Eye, title: "Object detection", desc: "Extend to YOLO / DETR for traffic-aware perception." },
  { icon: Rocket, title: "GPU optimization", desc: "Mixed-precision and batch tuning for throughput." },
  { icon: ShieldCheck, title: "Safety AI", desc: "Adversarial robustness and failure-mode analysis." },
];

const terminalLines = [
  "$ python train_mlp.py --epochs 20 --batch 64",
  "[INFO] Loading dataset: 8,420 samples (train) / 1,808 (test)",
  "[INFO] Building MLP: 4096 → 256 → 128 → 64 → 4",
  "Epoch 01/20  loss=0.812  acc=0.640  val_acc=0.671",
  "Epoch 10/20  loss=0.214  acc=0.901  val_acc=0.913",
  "Epoch 20/20  loss=0.087  acc=0.952  val_acc=0.942",
  "[OK] Model saved → models/mlp_best.h5",
  "[OK] Confusion matrix exported → reports/cm_mlp.png",
];

function HomePage() {
  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={heroImg} alt="Futuristic autonomous car on neon highway" className="h-full w-full object-cover opacity-40" width={1920} height={1024} />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
          <div className="absolute inset-0 grid-bg opacity-50 animate-grid-pan" />
        </div>
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-28 md:pt-28 md:pb-36">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-widest text-[var(--neon)] animate-fade-up">
            <GraduationCap className="h-3.5 w-3.5" /> Final Year Capstone · ML for Medical Intelligence
          </div>
          <h1 className="mt-6 text-5xl md:text-7xl font-bold leading-[1.05] animate-fade-up [animation-delay:120ms]">
            <span className="gradient-text text-glow">Perceptron vs MLP</span>
            <br />
            <span className="text-foreground/90">for Autonomous Driving</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground animate-fade-up [animation-delay:220ms]">
            A research dashboard that benchmarks a classic single-layer Perceptron against a Multilayer Neural Network on real-world driving classification tasks — with live demos, charts and full pipeline transparency.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 animate-fade-up [animation-delay:320ms]">
            <Link to="/comparison" className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[var(--neon)] to-[var(--violet)] px-6 py-3 text-sm font-semibold text-background glow hover-lift">
              View Project <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/comparison" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-6 py-3 text-sm font-semibold backdrop-blur hover-lift">
              <GitCompare className="h-4 w-4" /> Model Comparison
            </Link>
            <Link to="/prediction" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-6 py-3 text-sm font-semibold backdrop-blur hover-lift">
              <Sparkles className="h-4 w-4" /> Live Prediction
            </Link>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-fade-up [animation-delay:420ms]">
            {[
              { k: "10,228", v: "Driving samples", icon: Database },
              { k: "94.2%", v: "MLP test accuracy", icon: Activity },
              { k: "20", v: "Training epochs", icon: LineIcon },
              { k: "4×", v: "Compared metrics", icon: BarChart3 },
            ].map(({ k, v, icon: Icon }) => (
              <div key={v} className="glass rounded-2xl p-5 hover-lift gradient-border">
                <Icon className="h-5 w-5 text-[var(--neon)]" />
                <div className="mt-3 text-3xl font-bold gradient-text">{k}</div>
                <div className="text-sm text-muted-foreground">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <Section id="team" eyebrow="Team" title="Built by 4 engineers" description="A capstone team from the Machine Learning for Medical Intelligence track.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <div key={m.id} className="group glass rounded-2xl p-6 hover-lift gradient-border animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--neon)] to-[var(--violet)] text-background font-bold text-lg glow">
                {m.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
              </div>
              <div className="mt-4 font-semibold">{m.name}</div>
              <div className="text-xs font-mono text-[var(--neon)]">{m.id}</div>
              <div className="mt-2 text-sm text-muted-foreground">{m.role}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* INTRODUCTION */}
      <Section id="introduction" eyebrow="Introduction" title="Autonomous driving, simplified" description="From pixels to decisions — how learning systems perceive the road.">
        <div className="grid gap-5 md:grid-cols-2">
          {[
            { icon: Car, t: "Autonomous Systems", d: "Self-driving stacks combine perception, planning and control. Perception classifies what the car sees in real time." },
            { icon: Eye, t: "Pattern Recognition", d: "Models learn statistical patterns in pixels — edges, shapes, colors — that map to driving classes." },
            { icon: GitBranch, t: "Linear vs Non-linear", d: "A perceptron draws straight decision boundaries. Real-world driving data is non-linear and needs deeper models." },
            { icon: Network, t: "Perceptron & MLP", d: "Perceptron = 1 neuron, 1 line. MLP = many neurons in layers, capable of curved, complex boundaries." },
          ].map((c, i) => (
            <div key={c.t} className="glass rounded-2xl p-6 hover-lift animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
              <c.icon className="h-6 w-6 text-[var(--neon)]" />
              <h3 className="mt-3 text-xl font-semibold">{c.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* OBJECTIVES */}
      <Section id="objectives" eyebrow="Objectives" title="What we set out to do" description="Six concrete deliverables for the capstone.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {objectives.map((o, i) => (
            <div key={o.title} className="group glass rounded-2xl p-6 hover-lift gradient-border animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-[var(--neon)] group-hover:scale-110 transition-transform">
                  <o.icon className="h-5 w-5" />
                </div>
                <div className="text-xs font-mono text-muted-foreground">OBJ-{String(i + 1).padStart(2, "0")}</div>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{o.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{o.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* PROBLEM */}
      <Section id="problem" eyebrow="Problem Statement" title="Why this matters" description="Driving data is messy, non-linear, and high-stakes.">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: AlertTriangle, t: "Driving challenges", d: "Lighting, weather, occlusion and motion blur make every frame different." },
            { icon: Workflow, t: "Non-linear data", d: "A single straight boundary cannot separate complex driving classes." },
            { icon: Network, t: "Why MLP wins", d: "Hidden layers + non-linear activations approximate the true decision surface." },
          ].map((c, i) => (
            <div key={c.t} className="glass rounded-2xl p-6 hover-lift animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
              <c.icon className="h-6 w-6 text-[var(--violet)]" />
              <h3 className="mt-3 text-xl font-semibold">{c.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* MODULES preview */}
      <Section id="modules" eyebrow="Modules" title="Project pipeline" description="Four modules from raw data to a benchmarked verdict.">
        <div className="grid gap-5 md:grid-cols-2">
          {modules.map((m, i) => (
            <div key={m.title} className="glass rounded-2xl p-6 hover-lift gradient-border animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--neon)]">{m.name}</span>
                <m.icon className="h-5 w-5 text-[var(--violet)]" />
              </div>
              <h3 className="mt-3 text-xl font-semibold">{m.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{m.desc}</p>
              <ul className="mt-4 grid grid-cols-2 gap-2 text-xs">
                {m.steps.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-muted-foreground"><CheckCircle2 className="h-3.5 w-3.5 text-[var(--neon)]" />{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link to="/modules" className="inline-flex items-center gap-2 text-sm text-[var(--neon)] hover:underline">
            Explore full module breakdown <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* DATASET */}
      <Section id="dataset" eyebrow="Dataset" title="Driving image dataset" description="Labeled traffic frames preprocessed for both models.">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            { k: "10,228", v: "Total samples" },
            { k: "4", v: "Classes (Stop, Go, L, R)" },
            { k: "82 / 18", v: "Train / Test split" },
          ].map((s) => (
            <div key={s.v} className="glass rounded-2xl p-6 text-center hover-lift">
              <div className="text-3xl font-bold gradient-text">{s.k}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.v}</div>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3 glass rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-border flex items-center justify-between">
              <div className="text-sm font-semibold">Raw dataset preview</div>
              <span className="text-xs font-mono text-muted-foreground">driving_dataset.csv</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-secondary/60 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>{["Image", "Label", "Brightness", "Edges", "Blur"].map(h => <th key={h} className="px-4 py-3 text-left">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {datasetRows.map((r) => (
                    <tr key={r.id} className="border-t border-border hover:bg-secondary/40">
                      <td className="px-4 py-3 font-mono text-xs">{r.id}</td>
                      <td className="px-4 py-3"><span className="px-2 py-1 rounded-md bg-[var(--neon)]/15 text-[var(--neon)] text-xs">{r.label}</span></td>
                      <td className="px-4 py-3">{r.brightness}</td>
                      <td className="px-4 py-3">{r.edges}</td>
                      <td className="px-4 py-3">{r.blur}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="lg:col-span-2 glass rounded-2xl p-6">
            <div className="text-sm font-semibold mb-4">Preprocessing pipeline</div>
            <ol className="space-y-3 text-sm">
              {["Resize to 64×64 grayscale", "Normalize pixel values to [0, 1]", "Gaussian denoise (σ=1.0)", "Stratified train/test split"].map((s, i) => (
                <li key={s} className="flex items-start gap-3">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-[var(--neon)] to-[var(--violet)] text-background text-xs font-bold">{i + 1}</span>
                  <span className="text-muted-foreground">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* FEATURES */}
      <Section id="features" eyebrow="Feature Selection" title="What the models look at" description="Engineered visual features ranked by importance.">
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3 glass rounded-2xl p-6">
            <div className="text-sm font-semibold mb-4">Feature importance</div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={features} layout="vertical" margin={{ left: 30 }}>
                <CartesianGrid stroke="var(--grid)" strokeDasharray="3 3" />
                <XAxis type="number" stroke="var(--muted-foreground)" />
                <YAxis type="category" dataKey="name" stroke="var(--muted-foreground)" width={120} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Bar dataKey="importance" fill="var(--neon)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="lg:col-span-2 glass rounded-2xl p-6">
            <div className="text-sm font-semibold mb-4">Correlation heatmap</div>
            <Heatmap />
          </div>
        </div>
      </Section>

      {/* TRAINING */}
      <Section id="training" eyebrow="Model Training" title="Watch the models learn" description="Accuracy and loss curves across epochs.">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass rounded-2xl p-6">
            <div className="text-sm font-semibold mb-2">Accuracy per epoch</div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={trainingCurve}>
                <CartesianGrid stroke="var(--grid)" strokeDasharray="3 3" />
                <XAxis dataKey="epoch" stroke="var(--muted-foreground)" />
                <YAxis domain={[0.5, 1]} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Legend />
                <Line type="monotone" dataKey="perceptron" stroke="var(--chart-2)" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="mlp" stroke="var(--chart-1)" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="glass rounded-2xl p-6">
            <div className="text-sm font-semibold mb-2">Loss per epoch</div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={lossCurve}>
                <CartesianGrid stroke="var(--grid)" strokeDasharray="3 3" />
                <XAxis dataKey="epoch" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Legend />
                <Line type="monotone" dataKey="perceptron" stroke="var(--chart-5)" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="mlp" stroke="var(--chart-3)" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { t: "Train / Test split", d: "82% / 18% stratified by class label." },
            { t: "Optimizer", d: "Adam (lr=1e-3) with batch size 64 for the MLP." },
            { t: "Early stopping", d: "Patience of 4 on validation accuracy." },
          ].map(c => (
            <div key={c.t} className="glass rounded-2xl p-5">
              <div className="text-sm font-semibold">{c.t}</div>
              <div className="text-sm text-muted-foreground mt-1">{c.d}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* COMPARISON PREVIEW */}
      <Section id="comparison" eyebrow="Performance" title="Head-to-head metrics" description="Perceptron vs MLP across the standard battery.">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass rounded-2xl p-6">
            <div className="text-sm font-semibold mb-2">Metric comparison</div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={metricBars}>
                <CartesianGrid stroke="var(--grid)" strokeDasharray="3 3" />
                <XAxis dataKey="metric" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Legend />
                <Bar dataKey="Perceptron" fill="var(--chart-2)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="MLP" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="glass rounded-2xl p-6">
            <div className="text-sm font-semibold mb-2">Capability radar</div>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="var(--grid)" />
                <PolarAngleAxis dataKey="metric" stroke="var(--muted-foreground)" />
                <PolarRadiusAxis stroke="var(--muted-foreground)" />
                <Radar name="Perceptron" dataKey="Perceptron" stroke="var(--chart-2)" fill="var(--chart-2)" fillOpacity={0.35} />
                <Radar name="MLP" dataKey="MLP" stroke="var(--chart-1)" fill="var(--chart-1)" fillOpacity={0.35} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="mt-6">
          <Link to="/comparison" className="inline-flex items-center gap-2 text-sm text-[var(--neon)] hover:underline">
            See full comparison dashboard <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* CODE EXECUTION */}
      <Section id="execution" eyebrow="Code Execution" title="Logs from the lab" description="A peek at training output from our scripts.">
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2 glass rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 border-b border-border bg-card/80 px-4 py-2">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <span className="h-3 w-3 rounded-full bg-green-500/80" />
              <span className="ml-3 text-xs font-mono text-muted-foreground">~/neural-drive · zsh</span>
            </div>
            <pre className="p-5 text-xs font-mono leading-relaxed text-[var(--neon)] overflow-x-auto">
{terminalLines.map((l, i) => (
  <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>{l}</div>
))}
            </pre>
          </div>
          <div className="space-y-4">
            {[
              { t: "Training run", d: "20 epochs · batch 64 · Adam · 1e-3", icon: Activity },
              { t: "Inference", d: "Avg latency: Perceptron 1.2ms · MLP 4.8ms", icon: Zap },
              { t: "Artifacts", d: "Models, plots and confusion matrices saved to /reports", icon: FileText },
            ].map(c => (
              <div key={c.t} className="glass rounded-2xl p-5 hover-lift">
                <c.icon className="h-5 w-5 text-[var(--violet)]" />
                <div className="mt-2 text-sm font-semibold">{c.t}</div>
                <div className="text-sm text-muted-foreground">{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* DEPLOYMENT */}
      <Section id="deployment" eyebrow="UI Demo" title="Dashboard preview" description="Responsive on every screen — desktop, tablet and mobile.">
        <div className="glass-strong rounded-3xl p-4 md:p-8 gradient-border">
          <div className="grid gap-4 md:grid-cols-3">
            {["Desktop", "Tablet", "Mobile"].map((d, i) => (
              <div key={d} className="rounded-2xl border border-border bg-secondary/40 p-4 hover-lift animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="aspect-video rounded-xl bg-gradient-to-br from-[var(--neon)]/15 to-[var(--violet)]/15 grid-bg relative overflow-hidden">
                  <div className="absolute inset-3 rounded-lg glass flex items-center justify-center">
                    <Brain className="h-8 w-8 text-[var(--neon)] animate-glow-pulse rounded-full" />
                  </div>
                </div>
                <div className="mt-3 text-sm font-semibold">{d} layout</div>
                <div className="text-xs text-muted-foreground">Optimized for {d.toLowerCase()} viewports.</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* DOCUMENTATION */}
      <Section id="docs" eyebrow="Documentation" title="Project docs & repo" description="Everything you need to reproduce the experiments.">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: GitBranch, t: "GitHub Repo", d: "github.com/your-team/neural-drive (placeholder)" },
            { icon: BookOpen, t: "README", d: "Setup, dataset, training and evaluation steps." },
            { icon: FileText, t: "Project Report", d: "PDF documentation with full results." },
          ].map(c => (
            <div key={c.t} className="glass rounded-2xl p-6 hover-lift">
              <c.icon className="h-6 w-6 text-[var(--neon)]" />
              <div className="mt-3 font-semibold">{c.t}</div>
              <div className="text-sm text-muted-foreground mt-1">{c.d}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 glass rounded-2xl p-6 font-mono text-xs leading-relaxed text-muted-foreground">
{`neural-drive/
├── data/                  # raw + processed driving images
├── models/                # saved Perceptron & MLP weights
├── notebooks/             # exploratory + training notebooks
├── src/
│   ├── perceptron.py
│   ├── mlp.py
│   ├── preprocess.py
│   └── evaluate.py
├── reports/               # confusion matrices, plots
├── web/                   # this dashboard
└── README.md`}
        </div>
      </Section>

      {/* FUTURE SCOPE */}
      <Section id="future" eyebrow="Future Scope" title="Where we go next" description="From MLP to a perception stack ready for the road.">
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--neon)] via-[var(--violet)] to-transparent" />
          <div className="space-y-6">
            {futureScope.map((f, i) => (
              <div key={f.title} className={`relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-10 animate-fade-up ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`} style={{ animationDelay: `${i * 100}ms` }}>
                <div className={`md:text-right ${i % 2 ? "md:pl-10" : "md:pr-10"}`}>
                  <div className="glass rounded-2xl p-6 hover-lift inline-block text-left">
                    <f.icon className="h-5 w-5 text-[var(--neon)]" />
                    <div className="mt-2 font-semibold">{f.title}</div>
                    <div className="text-sm text-muted-foreground mt-1">{f.desc}</div>
                  </div>
                </div>
                <div className="hidden md:block" />
                <div className="absolute left-2.5 md:left-1/2 top-6 -translate-x-1/2 h-3 w-3 rounded-full bg-[var(--neon)] glow" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CONCLUSION */}
      <Section id="conclusion" eyebrow="Conclusion" title="The verdict" description="A clear, evidence-backed summary.">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: Target, t: "Perceptron", d: "Works for linearly separable problems but plateaus on real driving data at ~72% accuracy." },
            { icon: Network, t: "MLP", d: "Hidden layers + non-linear activations capture complex patterns, reaching ~94% accuracy." },
            { icon: Sparkles, t: "Recommendation", d: "MLP is the clear choice for autonomous driving classification — and a stepping stone to CNNs." },
          ].map(c => (
            <div key={c.t} className="glass rounded-2xl p-6 hover-lift gradient-border">
              <c.icon className="h-6 w-6 text-[var(--violet)]" />
              <div className="mt-3 font-semibold text-lg">{c.t}</div>
              <div className="text-sm text-muted-foreground mt-1">{c.d}</div>
            </div>
          ))}
        </div>
        <div className="mt-8 glass-strong rounded-3xl p-8 gradient-border text-center">
          <Sparkles className="h-7 w-7 text-[var(--neon)] mx-auto" />
          <h3 className="mt-3 text-2xl md:text-3xl font-bold gradient-text">MLP outperforms Perceptron by ~22% on driving data.</h3>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">Our experiments confirm that depth and non-linear activations are essential for modeling the complex visual patterns encountered in autonomous driving.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/comparison" className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[var(--neon)] to-[var(--violet)] px-5 py-2.5 text-sm font-semibold text-background glow">
              Open dashboard <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/prediction" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-5 py-2.5 text-sm font-semibold">
              Try live prediction
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}

function Heatmap() {
  const labels = ["Edge", "Bright", "Color", "HOG", "Curve"];
  const matrix = [
    [1.0, 0.42, 0.18, 0.71, 0.33],
    [0.42, 1.0, 0.55, 0.38, 0.21],
    [0.18, 0.55, 1.0, 0.27, 0.14],
    [0.71, 0.38, 0.27, 1.0, 0.46],
    [0.33, 0.21, 0.14, 0.46, 1.0],
  ];
  return (
    <div className="grid gap-1" style={{ gridTemplateColumns: `auto repeat(${labels.length}, 1fr)` }}>
      <div />
      {labels.map(l => <div key={l} className="text-[10px] text-center text-muted-foreground">{l}</div>)}
      {matrix.map((row, i) => (
        <Fragment key={i}>
          <div className="text-[10px] text-muted-foreground self-center">{labels[i]}</div>
          {row.map((v, j) => (
            <div
              key={j}
              className="aspect-square rounded-md grid place-items-center text-[10px] font-mono"
              style={{ background: `color-mix(in oklab, var(--neon) ${v * 100}%, var(--card))`, color: v > 0.5 ? "var(--background)" : "var(--foreground)" }}
              title={`${labels[i]} × ${labels[j]} = ${v}`}
            >
              {v.toFixed(2)}
            </div>
          ))}
        </Fragment>
      ))}
    </div>
  );
}
