export const INTERESTS = [
  "Logística",
  "Tecnología",
  "Ventas",
  "Administración",
  "Servicio al cliente",
  "Trabajo práctico",
  "Marketing",
  "Finanzas",
] as const;

export type Interest = (typeof INTERESTS)[number];

export const EDUCATION_LEVELS = [
  "Secundaria",
  "Preparatoria incompleta",
  "Preparatoria terminada",
  "Universidad incompleta",
  "Carrera técnica",
  "Otro",
] as const;

export type EducationLevel = (typeof EDUCATION_LEVELS)[number];

export type ConfidenceLevel = "Alta" | "Media" | "Baja";

export type ProfileInput = {
  age: number;
  state: string;
  education: EducationLevel;
  experience: string;
  skills: string;
  interests: Interest[];
};

export type CareerPath = {
  id: string;
  title: string;
  category: string;
  compatibleInterests: Interest[];
  relevantSkills: string[];
  salaryMin: number;
  salaryMax: number;
  preparationTime: string;
  skillsRequired: string[];
  suggestedNextStep: string;
  confidence: ConfidenceLevel;
  dataYear: number;
  sourceLabel: string;
  educationFit: Record<EducationLevel, number>;
  plan: {
    thisWeek: string[];
    next30Days: string[];
    whenReady: string[];
  };
};

export type MatchedPath = {
  path: CareerPath;
  score: number;
  whyFit: string;
  leverage: string[];
  toDevelop: string[];
};
