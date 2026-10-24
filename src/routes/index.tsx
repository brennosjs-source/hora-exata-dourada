import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Relógio — Hora exata e data" },
      { name: "description", content: "Relógio com a hora exata até os segundos e a data de hoje." },
      { property: "og:title", content: "Relógio — Hora exata e data" },
      { property: "og:description", content: "Hora exata até os segundos e a data de hoje." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const pad = (n: number) => String(n).padStart(2, "0");

function Index() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 250);
    return () => clearInterval(id);
  }, []);

  const date = now
    ? now.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
    : "";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4 text-foreground">
      <h1 className="sr-only">Relógio</h1>
      <div className="font-mono text-6xl font-bold tabular-nums tracking-tight sm:text-8xl md:text-9xl">
        {now ? (
          <>
            {pad(now.getHours())}
            <span className="text-primary">:</span>
            {pad(now.getMinutes())}
            <span className="text-primary">:</span>
            <span className="text-primary">{pad(now.getSeconds())}</span>
          </>
        ) : (
          "--:--:--"
        )}
      </div>
      <p className="text-lg capitalize text-muted-foreground sm:text-2xl">{date}</p>
    </main>
  );
}
