<template>
    <b-select
        class="language-selector__container"
        v-model="$i18n.locale"
        @select="updateLanguage($event.target.value)"
    >
      <option
          v-for="(o, i) in LOCALES"
          :key="i"
          :value="o.value"
          :selected="o.value === defaultLocale"
      >{{ o.caption }}</option
      >
    </b-select>
</template>

<script>
import { LOCALES } from "@/i18n/locales";
import { defaultLocale } from "@/i18n";

export default {
  name: "LanguageSelector",
  data: () => ({ LOCALES, defaultLocale }),
  methods: {
    updateLanguage(lang) {
      this.$store.commit("setLanguage", lang);
    }
  }
};
</script>
