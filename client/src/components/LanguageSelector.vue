<template>
  <div class="language-selector__container">
<!--    <label>
      <select
        v-model="$i18n.locale"
        @change="updateLanguage($event.target.value)"
        class="js_language_selector"
      >
        <option
          v-for="(o, i) in LOCALES"
          :key="i"
          :value="o.value"
          :selected="o.value === defaultLocale"
          >{{ o.caption }}</option
        >
      </select>
    </label>-->
    <b-select
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
  </div>
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

<!--<style scoped src="./LanguageSelector.scss" lang="scss"></style>-->
