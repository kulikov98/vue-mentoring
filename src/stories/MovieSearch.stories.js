import MovieSearch from '../components/MovieSearch.vue';
import { useMovieStore } from '../stores/MovieStore';

const store = useMovieStore();

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
  created() {
    store.searchQuery = args.initialQuery;
  },
});

export const Default = Template.bind(null);
Default.args = {
  initialQuery: '',
};
