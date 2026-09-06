"use client";

type View = "home" | "results";

export function Header({
  view,
  onLogoClick,
}: {
  view: View;
  onLogoClick: () => void;
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-line/80 bg-[#f4f1ea]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <button
          type="button"
          onClick={onLogoClick}
          className="flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-forest"
          aria-label="RutaMX inicio"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-forest text-sm font-extrabold tracking-tight text-white shadow-sm">
            R
          </span>
          <span className="text-lg font-extrabold tracking-tight text-forest-deep">
            Ruta<span className="text-terracotta">MX</span>
          </span>
        </button>
        <p className="hidden text-xs font-medium text-muted sm:block">
          {view === "results"
            ? "Recomendación simulada con IA"
            : "Prototipo académico · México"}
        </p>
      </div>
    </header>
  );
}
