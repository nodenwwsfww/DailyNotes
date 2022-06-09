import Vue from 'vue';
import VueI18n from "vue-i18n";
import Buefy from 'buefy';
import VueMeta from 'vue-meta';
import VueMasonry from 'vue-masonry-css';

import App from './App.vue';
import router from './router';
import {defaultLocale, messages} from "@/i18n";

Vue.use(VueI18n);

export const i18n = new VueI18n({
  messages,
  locale: defaultLocale,
  fallbackLocale: defaultLocale
});

Vue.config.productionTip = false;

Vue.use(Buefy, {
  defaultIconPack: 'fas',
});
Vue.use(VueMeta);
Vue.use(VueMasonry);


new Vue({
  i18n,
  router,
  render: h => h(App)
}).$mount('#app');
