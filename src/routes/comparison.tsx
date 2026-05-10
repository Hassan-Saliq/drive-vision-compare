import { Fragment } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
  PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  LineChart, Line,
} from "recharts";
import { Activity, Clock, Target, Zap } from "lucide-react";

export const Route = createFileRoute("/comparison")({
  head: () => ({
    meta: [
      { title: "Performance Comparison — NeuralDrive" },
      { name: "description", content: "Detailed Perceptron vs MLP performance dashboard." },
    ],
  }),
  component: ComparisonPage,
});

const metrics = [
  { metric: "Accuracy", Perceptron: 72, MLP: 94 },
  { metric: "Precision", Perceptron: 70, MLP: 93 },
  { metric: "Recall", Perceptron: 68, MLP: 92 },
  { metric: "F1", Perceptron: 69, MLP: 92 },
  { metric: "Loss", Perceptron: 38, MLP: 9 },
];

const trainTime = [
  { name: "Perceptron", value: 12 },
  { name: "MLP", value: 88 },
];

const radar = [
  { metric: "Accuracy", Perceptron: 72, MLP: 94 },
  { metric: "Speed", Perceptron: 95, MLP: 78 },
  { metric: "Robustness", Perceptron: 55, MLP: 90 },
  { metric: "Non-linear fit", Perceptron: 30, MLP: 95 },
  { metric: "Generalization", Perceptron: 60, MLP: 88 },
];

const lossLine = Array.from({ length: 20 }, (_, i) => ({
  epoch: i + 1,
  Perceptron: +(0.95 - i * 0.012).toFixed(3),
  MLP: +(0.9 * Math.exp(-i * 0.18) + 0.05).toFixed(3),
}));

const cmPerceptron = [
  [180, 22, 18, 30],
  [25, 165, 20, 40],
  [28, 24, 168, 30],
  [32, 28, 26, 164],
];
const cmMLP = [
  [240, 4, 3, 3],
  [5, 235, 6, 4],
  [4, 5, 232, 9],
  [3, 4, 6, 237],
];
const labels = ["Stop", "Go", "Turn-L", "Turn-R"];

const COLORS = ["var(--chart-2)", "var(--chart-1)"];

function ComparisonPage() {
  return (
    <Section eyebrow="Dashboard" title="Performance comparison" description="A complete breakdown of how Perceptron and MLP stack up.">
      {/* KPI cards */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { icon: Target, t: "Best accuracy", v: "94.2%", s: "MLP · test set" },
          { icon: Activity, t: "Best F1", v: "0.92", s: "MLP" },
          { icon: Clock, t: "Train time", v: "88s", s: "MLP · 20 epochs" },
          { icon: Zap, t: "Inference", v: "4.8 ms", s: "MLP per sample" },
        ].map((c, i) => (
          <div key={c.t} className="glass rounded-2xl p-5 hover-lift gradient-border animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
            <c.icon className="h-5 w-5 text-[var(--neon)]" />
            <div className="mt-2 text-3xl font-bold gradient-text">{c.v}</div>
            <div className="text-sm font-semibold mt-1">{c.t}</div>
            <div className="text-xs text-muted-foreground">{c.s}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mt-8">
        <div className="glass rounded-2xl p-6">
          <div className="text-sm font-semibold mb-2">Metric comparison</div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={metrics}>
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
            <RadarChart data={radar}>
              <PolarGrid stroke="var(--grid)" />
              <PolarAngleAxis dataKey="metric" stroke="var(--muted-foreground)" />
              <PolarRadiusAxis stroke="var(--muted-foreground)" />
              <Radar name="Perceptron" dataKey="Perceptron" stroke="var(--chart-2)" fill="var(--chart-2)" fillOpacity={0.35} />
              <Radar name="MLP" dataKey="MLP" stroke="var(--chart-1)" fill="var(--chart-1)" fillOpacity={0.35} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="text-sm font-semibold mb-2">Loss over epochs</div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lossLine}>
              <CartesianGrid stroke="var(--grid)" strokeDasharray="3 3" />
              <XAxis dataKey="epoch" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Legend />
              <Line type="monotone" dataKey="Perceptron" stroke="var(--chart-2)" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="MLP" stroke="var(--chart-1)" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="text-sm font-semibold mb-2">Training time share</div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={trainTime} dataKey="value" nameKey="name" outerRadius={110} label>
                {trainTime.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mt-8">
        <ConfusionMatrix title="Perceptron — Confusion Matrix" matrix={cmPerceptron} />
        <ConfusionMatrix title="MLP — Confusion Matrix" matrix={cmMLP} />
      </div>

      <div className="mt-8 glass rounded-2xl overflow-hidden">
        <div className="px-5 py-3 border-b border-border text-sm font-semibold">Comparison table</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>{["Metric", "Perceptron", "MLP", "Δ"].map(h => <th key={h} className="px-4 py-3 text-left">{h}</th>)}</tr>
            </thead>
            <tbody>
              {[
                ["Accuracy", "72.0%", "94.2%", "+22.2"],
                ["Precision", "0.70", "0.93", "+0.23"],
                ["Recall", "0.68", "0.92", "+0.24"],
                ["F1 Score", "0.69", "0.92", "+0.23"],
                ["Final loss", "0.38", "0.09", "−0.29"],
                ["Training time", "12 s", "88 s", "+76 s"],
                ["Inference (per sample)", "1.2 ms", "4.8 ms", "+3.6 ms"],
              ].map(row => (
                <tr key={row[0]} className="border-t border-border hover:bg-secondary/40">
                  {row.map((c, i) => (
                    <td key={i} className={`px-4 py-3 ${i === 3 ? "font-mono text-[var(--neon)]" : ""}`}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}

function ConfusionMatrix({ title, matrix }: { title: string; matrix: number[][] }) {
  const max = Math.max(...matrix.flat());
  return (
    <div className="glass rounded-2xl p-6">
      <div className="text-sm font-semibold mb-4">{title}</div>
      <div className="grid gap-1" style={{ gridTemplateColumns: `auto repeat(${labels.length}, 1fr)` }}>
        <div />
        {labels.map(l => <div key={l} className="text-[11px] text-center text-muted-foreground">{l}</div>)}
        {matrix.map((row, i) => (
          <Fragment key={i}>
            <div className="text-[11px] text-muted-foreground self-center pr-2 text-right">{labels[i]}</div>
            {row.map((v, j) => {
              const intensity = v / max;
              return (
                <div key={j} className="aspect-square rounded-md grid place-items-center text-xs font-mono"
                  style={{
                    background: `color-mix(in oklab, ${i === j ? "var(--neon)" : "var(--violet)"} ${intensity * 100}%, var(--card))`,
                    color: intensity > 0.4 ? "var(--background)" : "var(--foreground)",
                  }}
                >
                  {v}
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
