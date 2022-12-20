import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import App from './App.vue';
import './styles.css';
import image from './directives/image';

library.add(faMagnifyingGlass);

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .directive('image', image)
  .mount('#app');
