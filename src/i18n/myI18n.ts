import type { myLanguageCode, myTranslation } from "./myTypes";
import { myDe } from "./locales/myDe";
import { myEn } from "./locales/myEn";
import { myFr } from "./locales/myFr";
import { myUk } from "./locales/myUk";

export const myDefaultLanguage: myLanguageCode = "en";

export const myLanguageOptions: myLanguageCode[] = ["en", "fr", "de", "uk"];

export const myTranslations: Record<myLanguageCode, myTranslation> = {
  en: myEn,
  fr: myFr,
  de: myDe,
  uk: myUk
};
