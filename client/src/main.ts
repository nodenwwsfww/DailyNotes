import Vue from 'vue';
import Buefy from 'buefy';
import VueMeta from 'vue-meta';
import VueMasonry from 'vue-masonry-css';

import App from './App.vue';
import router from './router';

import i18n from '@/i18n';

Vue.config.productionTip = false;

Vue.use(Buefy, {
  defaultIconPack: 'fas',
});
Vue.use(VueMeta);
Vue.use(VueMasonry);

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app');
