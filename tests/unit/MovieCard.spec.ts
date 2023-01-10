import MovieCard from '@/components/MovieCard.vue';
import { mount, VueWrapper } from '@vue/test-utils';
import { movies } from './test-data';

const SELECTORS = {
  title: '[data-testid="title"]',
  genre: '[data-testid="genre"]',
  year: '[data-testid="year"]'
};

describe('MovieCard', () => {
  let wrapper: VueWrapper;
  const movie = { ...movies[0] };

  beforeEach(() => {
    wrapper = mount(MovieCard, {
      props: movie,
      global: {
        directives: {
          image: {}
        }
      }
    });
  });

  afterEach(() => wrapper.unmount());

  it('should render image', () => {
    const img = wrapper.find('img');
    expect(img.exists()).toBeTruthy();
  });

  it('should render title', () => {
    const title = wrapper.find(SELECTORS.title);
    expect(title.text()).toBe(movie.title);
  });

  it('should render genre', () => {
    const genre = wrapper.find(SELECTORS.genre);
    expect(genre.text()).toBe(movie.genre_ids.toString());
  });

  it('should render year', () => {
    const year = wrapper.find(SELECTORS.year);
    expect(year.text()).toBe('1994');
  });
});
