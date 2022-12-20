import MovieSearch from '../components/MovieSearch.vue';

export default {
  name: 'MovieSearch',
  component: MovieSearch,
};

const Template = (args) => ({
  components: { MovieSearch },
  setup() {
    return { args };
  },
  template: '<MovieSearch />',
});

export const Default = Template.bind(null);
Default.args = {};
