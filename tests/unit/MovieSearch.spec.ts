import MovieSearch from '@/components/MovieSearch.vue';
import { useMovieStore } from '@/stores/MovieStore';
import { createTestingPinia } from '@pinia/testing';
import { VueWrapper, mount } from '@vue/test-utils';
import { nextTick } from 'vue';

describe('MovieSearch', () => {
  let wrapper: VueWrapper;
  const pinia = createTestingPinia();
  const store = useMovieStore(pinia);

  beforeEach(() => {
    wrapper = mount(MovieSearch, {
      global: {
        plugins: [pinia],
      },
    });
  });

  afterEach(() => wrapper.unmount());

  it('should render h1', () => {
    const h1 = wrapper.find('h1');
    expect(h1.text()).toBe('Find your movie');
  });

  it('should pass searchQuery as a prop to AppInput component', async () => {
    store.searchQuery = 'some-query';
    await nextTick();
    const AppInput = wrapper.findComponent({ name: 'AppInput' });
    expect(AppInput.props().initValue).toBe('some-query');
  });

  it('should trigger search(text) on enter press', () => {
    store.searchQuery = 'some-query';
    // re-create component with new initial value
    wrapper = mount(MovieSearch, {
      global: {
        plugins: [pinia],
      },
    });
    const AppInput = wrapper.findComponent({ name: 'AppInput' });
    AppInput.vm.emit('keydown-enter');

    expect(store.search).toHaveBeenCalledWith('some-query');
  });

  it('should trigger search(text) on btn click', () => {
    store.searchQuery = 'some-query';
    // re-create component with new initial value
    wrapper = mount(MovieSearch, {
      global: {
        plugins: [pinia],
      },
    });
    const AppButton = wrapper.findComponent({ name: 'AppButton' });
    AppButton.trigger('click');

    expect(store.search).toHaveBeenCalledWith('some-query');
  });
});
