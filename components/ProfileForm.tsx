"use client";

import { INTERESTS, EDUCATION_LEVELS, type Interest } from "@/lib/types";
import { MEXICAN_STATES } from "@/lib/states";
import {
  AGE_MAX,
  AGE_MIN,
  AGE_RANGE_ERROR,
  EXPERIENCE_MAX,
  SKILLS_MAX,
  type FieldErrors,
  type FormFields,
} from "@/lib/validate";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 text-sm text-terracotta" role="alert">
      {message}
    </p>
  );
}

export function ProfileForm({
  fields,
  errors,
  onChange,
  onToggleInterest,
  onSubmit,
  onAgeBlur,
}: {
  fields: FormFields;
  errors: FieldErrors;
  onChange: (patch: Partial<FormFields>) => void;
  onToggleInterest: (interest: Interest) => void;
  onSubmit: () => void;
  onAgeBlur: () => void;
}) {
  return (
    <section
      id="perfil-form"
      className="mx-auto w-full max-w-5xl scroll-mt-24 px-4 pb-16 pt-6 sm:px-6"
    >
      <div className="rounded-3xl border border-line bg-card p-5 shadow-[0_12px_32px_-24px_rgba(20,34,28,0.45)] sm:p-8">
      <h2 className="text-2xl font-extrabold tracking-tight text-forest-deep sm:text-3xl">
        Cuéntanos dónde estás hoy
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Completa el perfil y te mostramos 3 rutas. No guardamos tus datos: viven
        solo en esta página.
      </p>

      <form
        className="mt-8 space-y-6"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
        noValidate
      >
        <div>
          <label htmlFor="age" className="block text-sm font-semibold text-forest-deep">
            Edad
          </label>
          <input
            id="age"
            name="age"
            type="number"
            inputMode="numeric"
            required
            min={AGE_MIN}
            max={AGE_MAX}
            step={1}
            value={fields.age}
            aria-invalid={errors.age ? true : undefined}
            aria-describedby={errors.age ? "age-error" : undefined}
            onChange={(e) => onChange({ age: e.target.value })}
            onBlur={onAgeBlur}
            className={`mt-2 h-12 w-full rounded-xl border bg-card px-4 text-base outline-none ring-forest/30 focus:ring-2 ${
              errors.age ? "border-terracotta" : "border-line"
            }`}
            placeholder={`${AGE_MIN}–${AGE_MAX}`}
          />
          {errors.age ? (
            <p id="age-error" className="mt-1.5 text-sm font-medium text-terracotta" role="alert">
              {AGE_RANGE_ERROR}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-semibold text-forest-deep">
            Estado
          </label>
          <select
            id="state"
            name="state"
            required
            value={fields.state}
            onChange={(e) => onChange({ state: e.target.value })}
            className="mt-2 h-12 w-full rounded-xl border border-line bg-card px-4 text-base outline-none ring-forest/30 focus:ring-2"
          >
            <option value="">Selecciona tu estado</option>
            {MEXICAN_STATES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          <FieldError message={errors.state} />
        </div>

        <div>
          <label htmlFor="education" className="block text-sm font-semibold text-forest-deep">
            Nivel de estudios
          </label>
          <select
            id="education"
            name="education"
            required
            value={fields.education}
            onChange={(e) => onChange({ education: e.target.value })}
            className="mt-2 h-12 w-full rounded-xl border border-line bg-card px-4 text-base outline-none ring-forest/30 focus:ring-2"
          >
            <option value="">Selecciona una opción</option>
            {EDUCATION_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          <FieldError message={errors.education} />
        </div>

        <div>
          <label htmlFor="experience" className="block text-sm font-semibold text-forest-deep">
            Experiencia previa
          </label>
          <p className="mt-1 text-xs text-muted">
            Incluye trabajo informal, ayuda en un negocio familiar o proyectos. Opcional.
          </p>
          <textarea
            id="experience"
            name="experience"
            rows={4}
            maxLength={EXPERIENCE_MAX}
            value={fields.experience}
            onChange={(e) => onChange({ experience: e.target.value })}
            className="mt-2 w-full resize-y rounded-xl border border-line bg-card px-4 py-3 text-base outline-none ring-forest/30 focus:ring-2"
            placeholder="Ej. Ayudé en la tienda de mi tía, empacaba pedidos y cobraba en caja."
          />
          <div className="mt-1 flex justify-between text-xs text-muted">
            <FieldError message={errors.experience} />
            <span className="ml-auto">
              {fields.experience.length}/{EXPERIENCE_MAX}
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="skills" className="block text-sm font-semibold text-forest-deep">
            Habilidades
          </label>
          <p className="mt-1 text-xs text-muted">Opcional. Máximo {SKILLS_MAX} caracteres.</p>
          <textarea
            id="skills"
            name="skills"
            rows={3}
            maxLength={SKILLS_MAX}
            value={fields.skills}
            onChange={(e) => onChange({ skills: e.target.value })}
            className="mt-2 w-full resize-y rounded-xl border border-line bg-card px-4 py-3 text-base outline-none ring-forest/30 focus:ring-2"
            placeholder="Ej. Excel, atención al cliente, redes sociales, herramientas."
          />
          <div className="mt-1 flex justify-between text-xs text-muted">
            <FieldError message={errors.skills} />
            <span className="ml-auto">
              {fields.skills.length}/{SKILLS_MAX}
            </span>
          </div>
        </div>

        <fieldset>
          <legend className="text-sm font-semibold text-forest-deep">Intereses</legend>
          <p className="mt-1 text-xs text-muted">Elige uno o más.</p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-2">
            {INTERESTS.map((interest) => {
              const selected = fields.interests.includes(interest);
              return (
                <label
                  key={interest}
                  className={`flex min-h-12 cursor-pointer items-center gap-2 rounded-xl border px-3 text-sm font-medium transition ${
                    selected
                      ? "border-forest bg-forest text-white"
                      : "border-line bg-card text-forest-deep hover:border-leaf"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={selected}
                    onChange={() => onToggleInterest(interest)}
                  />
                  {interest}
                </label>
              );
            })}
          </div>
          <FieldError message={errors.interests} />
        </fieldset>

        <button
          type="submit"
          className="flex min-h-12 w-full items-center justify-center rounded-2xl bg-forest px-6 text-base font-bold text-white shadow-[0_10px_24px_-14px_rgba(13,92,77,0.9)] transition hover:bg-leaf"
        >
          Encontrar mis rutas
        </button>
      </form>
      </div>
    </section>
  );
}
