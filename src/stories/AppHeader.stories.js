import AppHeader from '../components/AppHeader.vue';
import { useMovieStore } from '../stores/MovieStore';

const store = useMovieStore()

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
  template: '<AppHeader />',
  created() {
    store.selectMovie(args.withSearch ? {} : null);
  }
});

export const Default = Template.bind(null);
Default.args = {
  withSearch: false,
};

export const WithSearch = Template.bind(null);
WithSearch.args = {
  withSearch: true,
};
