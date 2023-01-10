import MovieList from '../components/MovieList.vue';
import { useMovieStore } from '../stores/MovieStore';
import { movies } from './test-data';

const store = useMovieStore();

export default {
  name: 'MovieList',
  component: MovieList,
};

const Template = (args) => ({
  components: { MovieList },
  setup() {
    return { args };
  },
  template: '<MovieList />',
  created() {
    store.isLoading = args.isLoading;
    store.data.results = args.movies;
  },
});

export const Default = Template.bind(null);
Default.args = {
  isLoading: false,
  movies,
};

export const NotFound = Template.bind(null);
NotFound.args = {
  isLoading: false,
  movies: [],
};
