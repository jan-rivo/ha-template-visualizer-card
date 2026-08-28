// Small, dependency-free i18n layer for the card. Resolution order for a
// given hass.language (e.g. "nb-NO"):
//   1. exact match ("nb-NO")
//   2. base subtag ("nb")
//   3. English fallback
//
// Adding a new language is just: create src/i18n/languages/<code>.ts
// implementing `Translation` (TypeScript enforces every key is present),
// then register it in `translations` below.
import type { HomeAssistant } from '../ha/hass';
import { en, type Translation, type TranslationKey } from './languages/en';
import { fr } from './languages/fr';
import { it } from './languages/it';
import { es } from './languages/es';
import { de } from './languages/de';
import { nl } from './languages/nl';
import { nb } from './languages/nb';
import { nn } from './languages/nn';

export type { TranslationKey } from './languages/en';

const translations: Record<string, Translation> = {
  en,
  fr,
  it,
  es,
  de,
  nl,
  nb,
  nn,
};

function resolveTranslation(language?: string): Translation {
  if (!language) return en;
  if (translations[language]) return translations[language];
  const base = language.split('-')[0];
  if (translations[base]) return translations[base];
  return en;
}

/** Translate `key` for the current hass user, with optional {placeholder} substitution. */
export function t(hass: HomeAssistant | undefined, key: TranslationKey, vars?: Record<string, string>): string {
  const dict = resolveTranslation(hass?.language);
  let str = dict[key] ?? en[key];
  if (vars) {
    for (const [name, value] of Object.entries(vars)) {
      str = str.replaceAll(`{${name}}`, value);
    }
  }
  return str;
}
