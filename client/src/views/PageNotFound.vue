<template>
  <div class="level full-height">
    <div class="msg level-item has-text-centered">
      <div>
        <b-icon icon="exclamation" size="is-large" class="huge center-icon" custom-class="huge-icon"></b-icon>
        <h1 class="title text-center">Page Not Found. Please go back and try again.</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { LOCALES, Locales } from "@/i18n/locales";
import { defaultLocale } from "@/i18n";

export default {
  name: "page-not-found",
  metaInfo: {
    title: '404',
  },
  data: () => ({ LOCALES, defaultLocale }),
};
</script>