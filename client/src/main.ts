import Vue from 'vue';
import VueI18n from "vue-i18n";
import Buefy from 'buefy';
import VueMeta from 'vue-meta';
import VueMasonry from 'vue-masonry-css';

import App from './App.vue';
import router from './router';

Vue.use(VueI18n);
import i18n from '@/i18n';

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
