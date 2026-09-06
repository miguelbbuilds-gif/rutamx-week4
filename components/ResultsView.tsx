"use client";

import { PathCard } from "@/components/PathCard";
import type { MatchedPath, ProfileInput } from "@/lib/types";

export function ResultsView({
  profile,
  matches,
  expandedId,
  onTogglePlan,
  onRetry,
}: {
  profile: ProfileInput;
  matches: MatchedPath[];
  expandedId: string | null;
  onTogglePlan: (id: string) => void;
  onRetry: () => void;
}) {
  return (
    <section id="rutas" className="mx-auto w-full max-w-3xl scroll-mt-24 px-4 pb-20 pt-8 sm:px-6">
      <div className="rounded-2xl border border-line bg-card px-4 py-3 text-sm">
        <p className="font-bold text-forest-deep">Datos demostrativos para prototipo académico</p>
        <p className="mt-1 text-muted">
          Recomendación simulada con IA · coincidencia local, sin APIs externas.
        </p>
      </div>

      <h1 className="mt-8 text-2xl font-extrabold tracking-tight text-forest-deep sm:text-3xl">
        Tres caminos posibles desde donde estás
      </h1>
      <p className="mt-2 text-sm text-muted">
        Perfil: {profile.age} años · {profile.state} · {profile.education}
      </p>

      <div className="mt-8 space-y-6">
        {matches.map((match) => (
          <PathCard
            key={match.path.id}
            match={match}
            expanded={expandedId === match.path.id}
            onTogglePlan={() => onTogglePlan(match.path.id)}
          />
        ))}
      </div>

      <p className="mt-8 text-xs leading-relaxed text-muted">
        RutaMX no se conecta a INEGI, IMSS, LinkedIn, bolsas de gobierno ni a
        datos laborales en vivo. Las rutas son un ejercicio de prototipo para
        reducir incertidumbre, no una predicción.
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-6 min-h-12 w-full rounded-2xl bg-forest px-6 text-base font-bold text-white transition hover:bg-leaf sm:w-auto"
      >
        Probar otro perfil
      </button>
    </section>
  );
}
