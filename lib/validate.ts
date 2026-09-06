import type { EducationLevel, Interest, ProfileInput } from "./types";
import { EDUCATION_LEVELS, INTERESTS } from "./types";
import { MEXICAN_STATES } from "./states";

export const EXPERIENCE_MAX = 300;
export const SKILLS_MAX = 200;
export const AGE_MIN = 15;
export const AGE_MAX = 30;
export const AGE_RANGE_ERROR = "La edad debe estar entre 15 y 30 años.";

export function parseValidAge(raw: string): number | null {
  const ageTrimmed = raw.trim();
  if (!ageTrimmed) return null;
  if (!/^\d+$/.test(ageTrimmed)) return null;

  const age = Number(ageTrimmed);
  if (!Number.isInteger(age) || age < AGE_MIN || age > AGE_MAX) {
    return null;
  }

  return age;
}

export type FormFields = {
  age: string;
  state: string;
  education: string;
  experience: string;
  skills: string;
  interests: Interest[];
};

export type FieldErrors = Partial<
  Record<"age" | "state" | "education" | "experience" | "skills" | "interests", string>
>;

export function validateProfileForm(fields: FormFields): {
  ok: true;
  profile: ProfileInput;
} | {
  ok: false;
  errors: FieldErrors;
} {
  const errors: FieldErrors = {};

  const age = parseValidAge(fields.age);
  if (age === null) {
    errors.age = AGE_RANGE_ERROR;
  }

  if (!fields.state) {
    errors.state = "Selecciona tu estado.";
  } else if (!MEXICAN_STATES.includes(fields.state as (typeof MEXICAN_STATES)[number])) {
    errors.state = "Selecciona un estado válido de México.";
  }

  if (!fields.education) {
    errors.education = "Selecciona tu nivel de estudios.";
  } else if (!EDUCATION_LEVELS.includes(fields.education as EducationLevel)) {
    errors.education = "Selecciona un nivel de estudios de la lista.";
  }

  if (fields.experience.length > EXPERIENCE_MAX) {
    errors.experience = `Máximo ${EXPERIENCE_MAX} caracteres.`;
  }

  if (fields.skills.length > SKILLS_MAX) {
    errors.skills = `Máximo ${SKILLS_MAX} caracteres.`;
  }

  if (fields.interests.length === 0) {
    errors.interests = "Elige al menos un interés.";
  } else {
    const invalid = fields.interests.some((item) => !INTERESTS.includes(item));
    if (invalid) {
      errors.interests = "Hay un interés que no es válido.";
    }
  }

  if (age === null || Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    profile: {
      age,
      state: fields.state,
      education: fields.education as EducationLevel,
      experience: fields.experience.trim(),
      skills: fields.skills.trim(),
      interests: [...fields.interests],
    },
  };
}
