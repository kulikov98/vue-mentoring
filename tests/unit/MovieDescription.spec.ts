import MovieDescription from '@/components/MovieDescription.vue';
import { IMovie } from '@/helpers/types';
import { useMovieStore } from '@/stores/MovieStore';
import { createTestingPinia } from '@pinia/testing';
import { VueWrapper, mount } from '@vue/test-utils';
import { nextTick } from 'vue';

describe('MovieDescription', () => {
  let wrapper: VueWrapper;
  const pinia = createTestingPinia();
  const store = useMovieStore(pinia);

  beforeEach(() => {
    wrapper = mount(MovieDescription, {
      global: {
        plugins: [pinia],
        directives: {
          image: {},
        },
      },
    });
  });

  afterEach(() => wrapper.unmount());

  it('should hide if there is no selected movie', () => {
    store.selectedMovie = null;
    const container = wrapper.find('article');

    expect(container.exists()).toBeFalsy();
  });

  it('should show if there is selected movie', async () => {
    store.selectedMovie = {} as IMovie;
    await nextTick();
    const container = wrapper.find('article');

    expect(container.exists()).toBeTruthy();
  });
});
