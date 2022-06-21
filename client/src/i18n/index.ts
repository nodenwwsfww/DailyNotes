import { Locales } from "./locales";

import en from "./en.json";
import ru from "./ru.json";
import tr from "./tr.json";

export const messages = {
  [Locales.EN]: en,
  [Locales.RU]: ru,
  [Locales.TR]: tr
};

export const defaultLocale = Locales.EN;

export const formatDate = (date: Date | undefined, locale: string) => {
  const formatter = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  if (!date) return;

  if (date) console.log(date, typeof date)
  return formatter.format(date);
};
