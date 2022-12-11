import MovieList from '../components/MovieList.vue';
import { movies } from './test-data';

export default {
  name: 'MovieList',
  component: MovieList,
};

const Template = (args) => ({
  components: { MovieList },
  setup() {
    return { args };
  },
  template: '<MovieList :="args" />',
});

export const Default = Template.bind(null);
Default.args = {
  movies,
};

export const NotFound = Template.bind(null);
NotFound.args = {
  movies: [],
};
