// lib/blogUtils.ts

export function formatIndonesianDate(dateInput: string | Date | undefined): string {
  if (!dateInput) return "";

  // If already in text format (e.g., "18 April 2026" without ISO format)
  if (typeof dateInput === "string" && !dateInput.includes("T") && !dateInput.includes("-")) {
    return dateInput;
  }

  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return String(dateInput);

    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d);
  } catch {
    return String(dateInput);
  }
}

export function isRecentArticle(dateInput: string | Date | undefined): boolean {
  if (!dateInput) return false;
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return false;
    // Check if within the last 7 days of Oct 30, 2026
    const ref = new Date("2026-10-30T23:59:59.000Z");
    const diffDays = (ref.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays >= 0 && diffDays <= 7;
  } catch {
    return false;
  }
}

export function getCategoryTheme(category: string) {
  switch (category) {
    case "Etika Digital":
      return {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        badge: "bg-emerald-500 text-white",
        glow: "hover:border-emerald-300",
        dot: "bg-emerald-500",
      };
    case "Cyber Security":
      return {
        bg: "bg-rose-50",
        text: "text-rose-700",
        border: "border-rose-200",
        badge: "bg-rose-500 text-white",
        glow: "hover:border-rose-300",
        dot: "bg-rose-500",
      };
    case "AI & Masa Depan":
      return {
        bg: "bg-purple-50",
        text: "text-purple-700",
        border: "border-purple-200",
        badge: "bg-purple-600 text-white",
        glow: "hover:border-purple-300",
        dot: "bg-purple-500",
      };
    case "Teknologi & IT":
      return {
        bg: "bg-sky-50",
        text: "text-sky-700",
        border: "border-sky-200",
        badge: "bg-sky-600 text-white",
        glow: "hover:border-sky-300",
        dot: "bg-sky-500",
      };
    case "Desain & UI/UX":
      return {
        bg: "bg-amber-50",
        text: "text-amber-800",
        border: "border-amber-200",
        badge: "bg-amber-500 text-white",
        glow: "hover:border-amber-300",
        dot: "bg-amber-500",
      };
    case "Bisnis Digital":
      return {
        bg: "bg-indigo-50",
        text: "text-indigo-700",
        border: "border-indigo-200",
        badge: "bg-indigo-600 text-white",
        glow: "hover:border-indigo-300",
        dot: "bg-indigo-500",
      };
    case "Tips & Trik":
      return {
        bg: "bg-cyan-50",
        text: "text-cyan-800",
        border: "border-cyan-200",
        badge: "bg-cyan-600 text-white",
        glow: "hover:border-cyan-300",
        dot: "bg-cyan-500",
      };
    case "Fun Fact":
      return {
        bg: "bg-fuchsia-50",
        text: "text-fuchsia-700",
        border: "border-fuchsia-200",
        badge: "bg-fuchsia-600 text-white",
        glow: "hover:border-fuchsia-300",
        dot: "bg-fuchsia-500",
      };
    default:
      return {
        bg: "bg-slate-100",
        text: "text-slate-700",
        border: "border-slate-200",
        badge: "bg-slate-800 text-white",
        glow: "hover:border-slate-300",
        dot: "bg-slate-500",
      };
  }
}

