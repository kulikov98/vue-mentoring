import MovieDescription from '../components/MovieDescription.vue';
import { movies } from './test-data';

export default {
  name: 'MovieDescription',
  component: MovieDescription,
};

const Template = (args) => ({
  components: { MovieDescription },
  setup() {
    return { args };
  },
  template: '<MovieDescription :=args />',
});

export const Default = Template.bind(null);
Default.args = {
  ...movies[0],
};
