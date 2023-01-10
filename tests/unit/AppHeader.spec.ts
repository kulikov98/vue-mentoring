import AppHeader from '@/components/AppHeader.vue';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useMovieStore } from '@/stores/MovieStore';
import { nextTick } from 'vue';

describe('AppHeader', () => {
  let wrapper: VueWrapper;
  const pinia = createTestingPinia();
  const store = useMovieStore(pinia);

  beforeEach(() => {
    wrapper = shallowMount(AppHeader, {
      global: {
        plugins: [pinia],
        stubs: {
          'font-awesome-icon': true,
        }
      },
    });
  });

  afterEach(() => wrapper.unmount());

  it('should hide the search btn if no movie selected', async () => {
    // @ts-expect-error: getters are writable in tests
    store.withSearch = false;
    await nextTick();
    const btn = wrapper.find('button');
    expect(btn.exists()).toBeFalsy();
  });

  it('should show the search btn if a movie have been selected', async () => {
    // @ts-expect-error: getters are writable in tests
    store.withSearch = true;
    await nextTick();
    const btn = wrapper.find('button');
    expect(btn.exists()).toBeTruthy();
  });

  it('should trigger "selectMovie(null)" when the search btn clicked', async () => {
    // @ts-expect-error: getters are writable in tests
    store.withSearch = true;
    await nextTick();
    const btn = wrapper.find('button');
    btn.trigger('click');
    expect(store.selectMovie).toHaveBeenCalledWith(null);
  });
});
