import AppInput from '@/components/AppInput.vue';
import { mount, VueWrapper } from '@vue/test-utils';

const TEST_DATA = {
  initValue: 'test-initValue',
  placeholder: 'test-placeholder',
};

describe('AppInput', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(AppInput);
  });

  afterEach(() => wrapper.unmount());

  it('should create with empty value by default', () => {
    const input = wrapper.find('input');
    expect(input.element.value).toBe('');
  });

  it('should set the initial value', async () => {
    wrapper = mount(AppInput, {
      props: {
        initValue: TEST_DATA.initValue,
      },
    });
    const input = wrapper.find('input');
    expect(input.element.value).toBe(TEST_DATA.initValue);
  });

  it('should set initial placeholder', async () => {
    await wrapper.setProps({
      placeholder: TEST_DATA.placeholder,
    });
    const input = wrapper.find('input');
    expect(input.element.placeholder).toBe(TEST_DATA.placeholder);
  });

  it('should emit on enter key press', async () => {
    const input = wrapper.find('input');
    await input.trigger('keydown', { key: 'enter' });

    expect(wrapper.emitted()).toHaveProperty('keydown-enter');
  });

  it('should emit value when typing', async () => {
    const input = wrapper.find('input');
    await input.setValue('abc');

    expect(wrapper.emitted()).toHaveProperty('input', [['abc']]);
  });
});
