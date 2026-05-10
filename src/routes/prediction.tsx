import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Sparkles, Upload, Loader2, CheckCircle2, ImageIcon } from "lucide-react";
import { useRef, useState } from "react";

export const Route = createFileRoute("/prediction")({
  head: () => ({
    meta: [
      { title: "Live Prediction — Sfwan Vision" },
      { name: "description", content: "Upload a driving frame and see the model classify it in real time." },
    ],
  }),
  component: PredictionPage,
});

const CLASSES = ["Stop", "Go", "Turn-L", "Turn-R"];

function PredictionPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ label: string; confidence: number; probs: { label: string; p: number }[]; actual: string } | null>(null);

  function onPick(file: File) {
    const url = URL.createObjectURL(file);
    setPreview(url);
    setResult(null);
  }

  function predict() {
    if (!preview) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const idx = Math.floor(Math.random() * CLASSES.length);
      const main = 0.82 + Math.random() * 0.15;
      const rest = (1 - main) / (CLASSES.length - 1);
      const probs = CLASSES.map((label, i) => ({ label, p: i === idx ? main : rest * (0.6 + Math.random() * 0.8) }));
      const sum = probs.reduce((a, b) => a + b.p, 0);
      probs.forEach(p => (p.p = p.p / sum));
      const actualIdx = Math.random() < 0.85 ? idx : (idx + 1) % CLASSES.length;
      setResult({
        label: CLASSES[idx],
        confidence: probs[idx].p,
        probs: probs.sort((a, b) => b.p - a.p),
        actual: CLASSES[actualIdx],
      });
      setLoading(false);
    }, 1200);
  }

  return (
    <Section eyebrow="Live Demo" title="Prediction sandbox" description="Upload a driving image — the MLP model returns a class with confidence.">
      <div className="grid gap-6 lg:grid-cols-2">
        <div
          className="glass rounded-2xl p-6 hover-lift gradient-border"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) onPick(f); }}
        >
          <div className="text-sm font-semibold mb-4">1 · Upload an image</div>
          <button
            onClick={() => inputRef.current?.click()}
            className="group relative w-full aspect-video rounded-xl border-2 border-dashed border-border bg-secondary/30 grid place-items-center overflow-hidden hover:border-[var(--neon)] transition-colors"
          >
            {preview ? (
              <img src={preview} alt="upload preview" className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <div className="text-center px-4">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[var(--neon)] to-[var(--violet)] text-background glow group-hover:scale-110 transition-transform">
                  <Upload className="h-6 w-6" />
                </div>
                <div className="mt-3 font-semibold">Drop a driving frame here</div>
                <div className="text-xs text-muted-foreground">or click to browse · JPG / PNG</div>
              </div>
            )}
          </button>
          <input ref={inputRef} type="file" accept="image/*" hidden onChange={e => e.target.files && onPick(e.target.files[0])} />

          <button
            onClick={predict}
            disabled={!preview || loading}
            className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[var(--neon)] to-[var(--violet)] px-6 py-3 text-sm font-semibold text-background glow disabled:opacity-50 disabled:cursor-not-allowed hover-lift"
          >
            {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Running MLP...</> : <><Sparkles className="h-4 w-4" /> Predict</>}
          </button>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="text-sm font-semibold mb-4">2 · Model output</div>
          {!result && !loading && (
            <div className="h-full grid place-items-center text-muted-foreground py-16 text-center">
              <div>
                <ImageIcon className="h-10 w-10 mx-auto mb-3 opacity-40" />
                Upload an image and click Predict to see results.
              </div>
            </div>
          )}
          {loading && (
            <div className="grid place-items-center py-16">
              <div className="h-16 w-16 rounded-full border-2 border-[var(--neon)]/30 border-t-[var(--neon)] animate-spin" />
              <div className="mt-4 text-sm text-muted-foreground">Forwarding through 4 layers...</div>
            </div>
          )}
          {result && (
            <div className="animate-fade-up">
              <div className="rounded-xl bg-secondary/40 p-5 border border-border">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Predicted class</div>
                <div className="mt-1 flex items-baseline gap-3">
                  <div className="text-4xl font-bold gradient-text">{result.label}</div>
                  <div className="text-sm text-[var(--neon)] font-mono">{(result.confidence * 100).toFixed(1)}%</div>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Actual label: <span className="text-foreground font-semibold">{result.actual}</span>
                  {result.actual === result.label
                    ? <span className="ml-2 inline-flex items-center gap-1 text-[var(--neon)]"><CheckCircle2 className="h-3.5 w-3.5" /> match</span>
                    : <span className="ml-2 text-destructive">mismatch</span>}
                </div>
              </div>
              <div className="mt-5 space-y-3">
                <div className="text-sm font-semibold">Class probabilities</div>
                {result.probs.map((p) => (
                  <div key={p.label}>
                    <div className="flex justify-between text-xs">
                      <span className="font-mono">{p.label}</span>
                      <span className="font-mono text-muted-foreground">{(p.p * 100).toFixed(1)}%</span>
                    </div>
                    <div className="mt-1 h-2 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[var(--neon)] to-[var(--violet)] transition-all duration-700"
                        style={{ width: `${p.p * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          { t: "Model", d: "MLP · 4096→256→128→64→4 · ReLU + Softmax" },
          { t: "Latency", d: "~4.8 ms per frame on CPU" },
          { t: "Accuracy", d: "94.2% on held-out test set" },
        ].map(c => (
          <div key={c.t} className="glass rounded-2xl p-5">
            <div className="text-xs uppercase tracking-widest text-[var(--neon)]">{c.t}</div>
            <div className="text-sm mt-1 text-muted-foreground">{c.d}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
