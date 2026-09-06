"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { LandingHero } from "@/components/LandingHero";
import { ProfileForm } from "@/components/ProfileForm";
import { ResultsView } from "@/components/ResultsView";
import { recommendPaths } from "@/lib/match";
import type { Interest, MatchedPath, ProfileInput } from "@/lib/types";
import {
  type FieldErrors,
  type FormFields,
  validateProfileForm,
} from "@/lib/validate";

type View = "home" | "results";

const emptyFields: FormFields = {
  age: "",
  state: "",
  education: "",
  experience: "",
  skills: "",
  interests: [],
};

export function RutaMXApp() {
  const [view, setView] = useState<View>("home");
  const [fields, setFields] = useState<FormFields>(emptyFields);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [profile, setProfile] = useState<ProfileInput | null>(null);
  const [matches, setMatches] = useState<MatchedPath[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (view === "results") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [view]);

  function goHome() {
    setView("home");
  }

  function scrollToForm() {
    document.getElementById("perfil-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function submitForm() {
    const result = validateProfileForm(fields);
    if (!result.ok) {
      setErrors(result.errors);
      document.getElementById("perfil-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }
    setErrors({});
    setProfile(result.profile);
    setMatches(recommendPaths(result.profile));
    setExpandedId(null);
    setView("results");
  }

  function toggleInterest(interest: Interest) {
    setFields((current) => {
      const selected = current.interests.includes(interest)
        ? current.interests.filter((item) => item !== interest)
        : [...current.interests, interest];
      return { ...current, interests: selected };
    });
  }

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header view={view} onLogoClick={goHome} />
      <main className="flex-1">
        {view === "home" ? (
          <>
            <LandingHero onStart={scrollToForm} />
            <ProfileForm
              fields={fields}
              errors={errors}
              onChange={(patch) => setFields((current) => ({ ...current, ...patch }))}
              onToggleInterest={toggleInterest}
              onSubmit={submitForm}
            />
          </>
        ) : null}
        {view === "results" && profile ? (
          <ResultsView
            profile={profile}
            matches={matches}
            expandedId={expandedId}
            onTogglePlan={(id) =>
              setExpandedId((current) => (current === id ? null : id))
            }
            onRetry={() => {
              setView("home");
              setErrors({});
              window.setTimeout(() => {
                document.getElementById("perfil-form")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }, 50);
            }}
          />
        ) : null}
      </main>
      <footer className="border-t border-line px-4 py-6 text-center text-xs text-muted">
        RutaMX · prototipo universitario. No almacenamos información personal.
      </footer>
    </div>
  );
}
