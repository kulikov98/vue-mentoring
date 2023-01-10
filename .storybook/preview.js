import { app } from "@storybook/vue3";
import { createPinia } from 'pinia';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import image from '@/directives/image';
import "../src/styles.css";

library.add(faMagnifyingGlass);
app
  .component("font-awesome-icon", FontAwesomeIcon)
  .directive('image', image)
  .use(createPinia());

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: "dark",
  },
};
