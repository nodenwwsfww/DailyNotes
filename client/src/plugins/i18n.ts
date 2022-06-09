import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
  'en': {
    test: 'Hey!'
  },
  'ru': {},
  'tr': {
    test: 'Dyakuy'
  },
};

const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'tr', // set fallback locale
  messages, // set locale messages
});