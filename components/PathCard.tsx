"use client";

import { formatSalary } from "@/lib/match";
import type { MatchedPath } from "@/lib/types";

const CONFIDENCE_STYLES = {
  Alta: "bg-[#e4f4ee] text-forest-deep ring-[#b7dccf]",
  Media: "bg-[#f8efd4] text-[#6b5310] ring-[#e6d39a]",
  Baja: "bg-[#f8e4dd] text-[#8a3a28] ring-[#e8c0b4]",
} as const;

export function PathCard({
  match,
  expanded,
  onTogglePlan,
}: {
  match: MatchedPath;
  expanded: boolean;
  onTogglePlan: () => void;
}) {
  const { path } = match;

  return (
    <article className="rounded-3xl border border-line bg-card p-5 shadow-[0_12px_32px_-24px_rgba(20,34,28,0.45)] sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            {path.category}
          </p>
          <h2 className="mt-1 text-xl font-extrabold text-forest-deep sm:text-2xl">
            {path.title}
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-forest/10 px-2.5 py-1 text-[11px] font-bold text-forest">
              Recomendación simulada con IA
            </span>
            <span className="rounded-full bg-[#f4f1ea] px-2.5 py-1 text-[11px] font-bold text-muted">
              Datos demostrativos para prototipo académico
            </span>
          </div>
        </div>
        <div
          className={`rounded-full px-3 py-1.5 text-xs font-bold ring-1 ${CONFIDENCE_STYLES[path.confidence]}`}
        >
          Confianza del dato: {path.confidence}
        </div>
      </div>

      <dl className="mt-6 space-y-4 text-sm leading-relaxed">
        <div>
          <dt className="font-bold text-forest-deep">Por qué encaja con el perfil</dt>
          <dd className="mt-1 text-muted">{match.whyFit}</dd>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="font-bold text-forest-deep">Rango mensual estimado (MXN)</dt>
            <dd className="mt-1 text-muted">{formatSalary(path.salaryMin, path.salaryMax)}</dd>
          </div>
          <div>
            <dt className="font-bold text-forest-deep">Tiempo estimado de preparación</dt>
            <dd className="mt-1 text-muted">{path.preparationTime}</dd>
          </div>
        </div>
        <div>
          <dt className="font-bold text-forest-deep">Habilidades que puede aprovechar</dt>
          <dd className="mt-1">
            <ul className="list-disc space-y-1 pl-5 text-muted">
              {match.leverage.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </dd>
        </div>
        <div>
          <dt className="font-bold text-forest-deep">Habilidades que necesita desarrollar</dt>
          <dd className="mt-1">
            <ul className="list-disc space-y-1 pl-5 text-muted">
              {match.toDevelop.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </dd>
        </div>
        <div>
          <dt className="font-bold text-forest-deep">Siguiente paso concreto</dt>
          <dd className="mt-1 text-muted">{path.suggestedNextStep}</dd>
        </div>
        <div className="rounded-2xl bg-[#f4f1ea] p-4">
          <p className="text-sm font-bold text-forest-deep">
            Qué tan confiable es este dato
          </p>
          <p className="mt-1 text-muted">
            Confianza del dato: <strong>{path.confidence}</strong>. Las cifras no
            están verificadas con un feed laboral en vivo.
          </p>
          <p className="mt-3 text-sm font-bold text-forest-deep">Actualización del dato</p>
          <p className="mt-1 text-muted">Actualización: {path.dataYear}</p>
          <p className="mt-3 text-sm font-bold text-forest-deep">Fuente / tipo de información</p>
          <p className="mt-1 text-muted">{path.sourceLabel}</p>
        </div>
      </dl>

      <p className="mt-4 text-xs leading-relaxed text-muted">
        Las cifras son estimaciones orientativas y no garantizan salario,
        contratación ni resultados laborales.
      </p>

      <button
        type="button"
        onClick={onTogglePlan}
        className="mt-5 min-h-11 w-full rounded-xl border border-forest px-4 text-sm font-bold text-forest transition hover:bg-forest hover:text-white sm:w-auto sm:px-5"
        aria-expanded={expanded}
      >
        {expanded ? "Ocultar plan" : "Ver plan"}
      </button>

      {expanded ? (
        <div className="mt-5 space-y-4 border-t border-line pt-5">
          <PlanBlock title="PASO 1 — Esta semana" items={path.plan.thisWeek} />
          <PlanBlock title="PASO 2 — Próximos 30 días" items={path.plan.next30Days} />
          <PlanBlock
            title="PASO 3 — Cuando estés listo para aplicar"
            items={path.plan.whenReady}
          />
        </div>
      ) : null}
    </article>
  );
}

function PlanBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-extrabold tracking-tight text-forest-deep">{title}</h3>
      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-muted">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
