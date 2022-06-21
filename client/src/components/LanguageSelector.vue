<template>
  <div class="language-selector__container">
    <label>
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
    </label>
  </div>
</template>

<script lang="ts">
import { Locales, LOCALES } from "@/i18n/locales";
import { defaultLocale } from "@/i18n";
import Vue from "vue";

export default Vue.extend({
  name: "LanguageSelector",
  data: () => ({ LOCALES, defaultLocale }),
  methods: {
    updateLanguage(lang: string) {
      this.$store.commit("SET_LANGUAGE", lang);
      this.$i18n.locale = lang;
      localStorage.setItem("lang", lang);
    }
  },
  mounted() {
    console.log('mounted')
    const lang : string | null = localStorage.getItem("lang");
    if (lang) {
      console.log('mounted lang', lang)
      this.updateLanguage(lang);
    }
  },
});
</script>
<style src="./LanguageSelector.scss" lang="scss"></style>
