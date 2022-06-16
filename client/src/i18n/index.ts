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

export const formatDate = (date: Date | string, locale: string) => {
  const formatter = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  let newDate: Date | undefined;

  if (date instanceof String) newDate = new Date(date);
  return formatter.format(newDate);
};
