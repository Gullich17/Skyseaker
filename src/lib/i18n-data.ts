import type { Locale } from "@/i18n/routing";

/**
 * A translatable string: either a simple string (same for both locales)
 * or an object with locale keys.
 */
export type Translatable = string | { fr: string; en: string };

/**
 * Resolve a Translatable value for a given locale.
 * Falls back to French if the locale key is missing.
 */
export function t(value: Translatable, locale: Locale): string {
  if (typeof value === "string") return value;
  return value[locale] || value.fr;
}
