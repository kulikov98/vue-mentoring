import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { createPinia } from 'pinia';
import { router } from './router';
import App from './App.vue';
import './styles.css';
import image from './directives/image';

library.add(faMagnifyingGlass);

createApp(App)
  .use(createPinia())
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
  .directive('image', image)
  .mount('#app');
