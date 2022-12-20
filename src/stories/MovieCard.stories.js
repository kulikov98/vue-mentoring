import MovieCard from '../components/MovieCard.vue';
import { movies } from './test-data';

export default {
  name: 'MovieCard',
  component: MovieCard,
};

const Template = (args) => ({
  components: { MovieCard },
  setup() {
    return { args };
  },
  template: `
    <div style="max-width: 320px">
        <MovieCard :="args" />
    </div>
  `,
});

export const Default = Template.bind(null);
Default.args = {
  ...movies[0],
};
