import VueI18n from "vue-i18n";

enum Locales {
  EN = 'en',
  FR = 'fr',
}

const LOCALES = [
  { value: Locales.EN, caption: 'English' },
  { value: Locales.FR, caption: 'Francais' },
]

import en from "./en.json";
import fr from "./fr.json";

const messages = {
  [Locales.EN]: en,
  [Locales.FR]: fr
};

const defaultLocale = Locales.EN;

const i18n = new VueI18n({
  messages,
  locale: defaultLocale,
  fallbackLocale: defaultLocale
});

export default i18n;
