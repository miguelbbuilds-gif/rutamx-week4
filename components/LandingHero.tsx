"use client";

export function LandingHero({ onStart }: { onStart: () => void }) {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 pb-4 pt-10 sm:px-6 sm:pt-16">
      <div className="overflow-hidden rounded-3xl bg-forest-deep text-white shadow-[0_20px_50px_-28px_rgba(10,63,54,0.7)]">
        <div className="grid gap-8 px-6 py-10 sm:px-12 sm:py-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80">
              Para jóvenes en México
            </p>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.6rem]">
              Tu siguiente paso no tiene que ser perfecto. Tiene que ser posible.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Cuéntanos dónde estás hoy y RutaMX te muestra 3 caminos realistas
              para volver a estudiar, trabajar o desarrollar una habilidad.
            </p>
            <button
              type="button"
              onClick={onStart}
              className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-gold px-6 text-base font-bold text-forest-deep transition hover:brightness-105 sm:w-auto"
            >
              Encontrar mis rutas
            </button>
          </div>
          <div className="rounded-2xl bg-white/8 p-5 ring-1 ring-white/10">
            <p className="text-sm font-semibold text-white/90">Esto no es</p>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li>Un score de crédito ni un “ranking” de personas.</li>
              <li>Un tutor escolar ni un test de personalidad genérico.</li>
              <li>Una promesa de empleo, salario o admisión.</li>
            </ul>
            <p className="mt-5 text-sm font-semibold text-white/90">Sí es</p>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              Una brújula para quienes tienen experiencia informal o habilidades,
              pero no ven un camino claro de regreso al estudio o al trabajo.
            </p>
          </div>
        </div>
      </div>

      <ol className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          {
            step: "01",
            title: "Dónde estás hoy",
            body: "Edad, estado, estudios, experiencia y lo que se te da.",
          },
          {
            step: "02",
            title: "Tres rutas posibles",
            body: "Opciones de entrada en México, no carreras de ensueño.",
          },
          {
            step: "03",
            title: "Un plan en pasos",
            body: "Esta semana, 30 días y cuándo aplicar. Sin teatro.",
          },
        ].map((item) => (
          <li
            key={item.step}
            className="rounded-2xl border border-line bg-card p-5 shadow-[0_8px_24px_-18px_rgba(20,34,28,0.35)]"
          >
            <p className="text-xs font-bold tracking-widest text-terracotta">{item.step}</p>
            <h2 className="mt-2 text-lg font-bold text-forest-deep">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
