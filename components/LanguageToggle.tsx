"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Languages } from "lucide-react";

export default function LanguageToggle({ currentLang }: { currentLang: "en" | "es" }) {
  const pathname = usePathname();
  const newLang = currentLang === "en" ? "es" : "en";
  
  // Replace the first path segment (the locale)
  const newPath = pathname.replace(`/${currentLang}`, `/${newLang}`);

  return (
    <Link
      href={newPath}
      className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-colors text-sm font-medium"
      title={currentLang === "en" ? "Cambiar a Español" : "Switch to English"}
    >
      <Languages size={20} />
      <span className="uppercase">{newLang}</span>
    </Link>
  );
}
