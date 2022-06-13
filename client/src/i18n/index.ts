import { Locales } from "./locales";

import en from "./en.json";
import ru from "./ru.json";
import tr from "./tr.json";

export const messages = {
  [Locales.EN]: en,
  [Locales.RU]: ru,
  [Locales.TR]: tr,
};

export const defaultLocale = Locales.EN;