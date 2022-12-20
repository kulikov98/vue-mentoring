import MovieParam from '../components/MovieParam.vue';

export default {
  name: 'MovieParam',
  component: MovieParam,
};

const Template = (args) => ({
  components: { MovieParam },
  setup() {
    return { args };
  },
  template: '<MovieParam :="args" />',
});

export const Default = Template.bind(null);
Default.args = {
  unit: 'year',
  value: '1994',
};
