import AppHeader from '../components/AppHeader.vue';

export default {
  name: 'AppHeader',
  component: AppHeader,
  argTypes: {
    onClick: {},
  },
};

const Template = (args) => ({
  components: { AppHeader },
  setup() {
    return { args };
  },
  template: '<AppHeader :="args" />',
});

export const Default = Template.bind(null);
Default.args = {
  withSearch: false,
};

export const WithSearch = Template.bind(null);
WithSearch.args = {
  withSearch: true,
};
