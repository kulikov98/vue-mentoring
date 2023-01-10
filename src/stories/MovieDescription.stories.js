import MovieDescription from '../components/MovieDescription.vue';
import { useMovieStore } from '../stores/MovieStore';
import { movies } from './test-data';

const store = useMovieStore();

export default {
  name: 'MovieDescription',
  component: MovieDescription,
};

const Template = (args) => ({
  components: { MovieDescription },
  setup() {
    return { args };
  },
  template: '<MovieDescription />',
  created() {
    store.selectMovie(args);
  },
});

export const Example1 = Template.bind(null);
Example1.args = {
  ...movies[0],
};

export const Example2 = Template.bind(null);
Example2.args = {
  ...movies[1],
};
