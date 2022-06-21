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
    updateLanguage(lang: Locales) {
      this.$store.commit("SET_LANGUAGE", lang);
    }
  },
  mounted() {
    console.log('mounted')
    if (localStorage.getItem("lang")) {
      const lang: Locales = localStorage.lang;
      console.log(lang)
      this.$store.commit("SET_LANGUAGE", lang);
    }
  },
});
</script>
<style src="./LanguageSelector.scss" lang="scss"></style>
