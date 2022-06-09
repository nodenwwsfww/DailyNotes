<template>
  <div class="level full-height">
    <div class="msg level-item has-text-centered">
      <div>
        <b-icon icon="dumpster-fire" size="is-large" class="huge center-icon" custom-class="huge-icon"></b-icon>
        <h1 class="title text-center">There was an error. Please go back and try again.</h1>
      </div>
    </div>
    <select
        v-model="$i18n.locale"
        @change="updateLanguage($event.target.value)"
    >
      <option
          v-for="(o, i) in LOCALES"
          :key="i"
          :value="o.value"
          :selected="o.value === defaultLocale"
      >{{ o.caption }}</option
      >
    </select>
  </div>
</template>

<script>
import { LOCALES, Locales } from "@/i18n/locales";
import { defaultLocale } from "@/i18n";
export default {
  name: "error",
  metaInfo: {
    title: 'Error',
  },
  data: () => ({ LOCALES, defaultLocale }),
  methods: {
    updateLanguage(lang: Locales) {
      this.$store.commit("SET_LANGUAGE", lang);
    }
  }
};
</script>
