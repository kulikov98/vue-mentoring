import MovieParam from '@/components/MovieParam.vue';
import { mount } from '@vue/test-utils';

const SELECTORS = {
  container: '[data-testid="movie-param"]'
};

describe('MovieParam', () => {
  it('should not show if only a value was specified', () => {
    const wrapper = mount(MovieParam, {
      props: {
        value: 'value',
      }
    });
    const container = wrapper.find(SELECTORS.container);
    expect(container.exists()).toBeFalsy();
  });

  it('should not show if only a unit was specified', () => {
    const wrapper = mount(MovieParam, {
      props: {
        unit: 'unit',
      }
    });
    const container = wrapper.find(SELECTORS.container);
    expect(container.exists()).toBeFalsy();
  });

  it('should show when both unit and value were specified', () => {
    const wrapper = mount(MovieParam, {
      props: {
        value: 'value',
        unit: 'unit',
      }
    });
    const container = wrapper.find(SELECTORS.container);
    expect(container.exists()).toBeTruthy();
  });

  it('should render unit and value', () => {
    const wrapper = mount(MovieParam, {
      props: {
        value: 'value',
        unit: 'unit',
      }
    });
    const container = wrapper.find(SELECTORS.container);
    const [value, unit] = container.findAll('span');
    expect(value.text()).toBe('value');
    expect(unit.text()).toBe('unit');
  })
});
