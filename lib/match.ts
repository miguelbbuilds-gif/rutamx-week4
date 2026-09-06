import { CAREER_PATHS } from "./paths";
import type { CareerPath, MatchedPath, ProfileInput } from "./types";

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9ñ\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function textHasKeyword(haystack: string, keyword: string): boolean {
  const n = normalize(haystack);
  const k = normalize(keyword);
  if (!n || !k) return false;
  if (k.includes(" ")) return n.includes(k);
  const tokens = new Set(n.split(" "));
  return tokens.has(k) || n.includes(k);
}

function expandProfileText(text: string): string {
  const n = normalize(text);
  const hints: string[] = [n];
  if (/\b(bodega|cedis|picking|paquetes|paqueteria|envios|envio)\b/.test(n)) {
    hints.push("almacen inventario logistica empaque");
  }
  if (/\b(caja|mostrador|vende|vendi|venta|cliente)\b/.test(n)) {
    hints.push("ventas clientes atencion");
  }
  if (/\b(canva|tiktok|instagram|facebook|contenido|redes)\b/.test(n)) {
    hints.push("redes contenido marketing diseno");
  }
  if (/\b(excel|word|office|archivos|agenda|correo)\b/.test(n)) {
    hints.push("office excel administracion");
  }
  if (/\b(factura|facturas|iva|sat|gastos|caja chica|contab)\b/.test(n)) {
    hints.push("facturas contabilidad excel numeros");
  }
  if (/\b(computadora|laptop|wifi|impresora|windows|celular)\b/.test(n)) {
    hints.push("computadora software soporte");
  }
  if (/\b(herramientas|electric|plomer|repar|moto|aire)\b/.test(n)) {
    hints.push("herramientas mantenimiento reparacion");
  }
  return hints.join(" ");
}

function matchedKeywords(text: string, keywords: string[]): string[] {
  const expanded = expandProfileText(text);
  return keywords.filter((keyword) => textHasKeyword(expanded, keyword));
}

function buildWhyFit(
  path: CareerPath,
  profile: ProfileInput,
  interestHits: string[],
  skillHits: string[],
  experienceHits: string[],
): string {
  const parts: string[] = [];

  if (interestHits.length > 0) {
    parts.push(
      `Tus intereses en ${interestHits.join(", ")} se acercan a lo que pide un rol de ${path.title.toLowerCase()}.`,
    );
  }

  if (skillHits.length > 0) {
    parts.push(
      `En habilidades mencionaste indicios útiles (${skillHits.slice(0, 3).join(", ")}).`,
    );
  } else if (experienceHits.length > 0) {
    parts.push(
      `Tu experiencia previa sugiere contacto con ${experienceHits.slice(0, 3).join(", ")}, aunque haya sido informal.`,
    );
  }

  parts.push(
    `Con nivel ${profile.education.toLowerCase()} en ${profile.state}, este es un punto de entrada realista, no un atajo mágico al empleo.`,
  );

  return parts.join(" ");
}

function leverageItems(
  path: CareerPath,
  profile: ProfileInput,
  skillHits: string[],
  experienceHits: string[],
  interestHits: string[],
): string[] {
  const items: string[] = [];

  if (skillHits.length > 0) {
    items.push(`Habilidades que ya nombraste: ${skillHits.slice(0, 4).join(", ")}.`);
  }
  if (experienceHits.length > 0 && experienceHits.some((h) => !skillHits.includes(h))) {
    items.push(
      `Experiencia informal o previa relacionada: ${experienceHits.slice(0, 3).join(", ")}.`,
    );
  }
  if (interestHits.length > 0) {
    items.push(`Motivación clara hacia ${interestHits.join(" y ")}.`);
  }
  if (profile.education === "Carrera técnica" || profile.education === "Universidad incompleta") {
    items.push(`Tu trayectoria de estudios (${profile.education}) ya cuenta como señal de constancia.`);
  }
  if (items.length === 0) {
    items.push(
      "Aún sin historial formal, puedes aprovechar disponibilidad, ganas de aprender y un perfil honesto de entrada.",
    );
  }
  return items.slice(0, 4);
}

function toDevelopItems(path: CareerPath, skillHits: string[]): string[] {
  const hitSet = new Set(skillHits.map((s) => normalize(s)));
  const remaining = path.skillsRequired.filter((skill) => {
    const n = normalize(skill);
    return ![...hitSet].some((hit) => n.includes(hit) || hit.includes(n.split(" ")[0] ?? ""));
  });
  return (remaining.length > 0 ? remaining : path.skillsRequired).slice(0, 3);
}

function scorePath(path: CareerPath, profile: ProfileInput) {
  const interestHits = path.compatibleInterests.filter((interest) =>
    profile.interests.includes(interest),
  );
  const skillHits = matchedKeywords(profile.skills, path.relevantSkills);
  const experienceHits = matchedKeywords(profile.experience, path.relevantSkills);

  let score = 0;
  score += interestHits.length * 12;
  if (path.compatibleInterests[0] && profile.interests.includes(path.compatibleInterests[0])) {
    score += 8;
  }
  score += skillHits.length * 5;
  score += experienceHits.length * 4;
  score += path.educationFit[profile.education];

  if (profile.age <= 18 && path.id === "operador-almacen") {
    score -= 2;
  }

  return { score, interestHits, skillHits, experienceHits };
}

export function recommendPaths(profile: ProfileInput): MatchedPath[] {
  const ranked = CAREER_PATHS.map((path) => {
    const { score, interestHits, skillHits, experienceHits } = scorePath(path, profile);
    return {
      path,
      score,
      whyFit: buildWhyFit(path, profile, interestHits, skillHits, experienceHits),
      leverage: leverageItems(path, profile, skillHits, experienceHits, interestHits),
      toDevelop: toDevelopItems(path, skillHits),
    };
  }).sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.path.id.localeCompare(b.path.id);
  });

  return ranked.slice(0, 3);
}

export function formatSalary(min: number, max: number): string {
  const fmt = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  });
  return `${fmt.format(min)} – ${fmt.format(max)} al mes`;
}
