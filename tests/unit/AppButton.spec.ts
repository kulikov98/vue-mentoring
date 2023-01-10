import AppButton from '@/components/AppButton.vue';
import { mount } from '@vue/test-utils';

const TEST_DATA = {
  btnText: 'test-button',
  bgColor: 'purple',
  defaultClass: 'button',
  mediumSizeClass: 'button--medium',
  largeSizeClass: 'button--large',
  emits: 'click',
};

describe('AppButton', () => {
  it('should show passed label', () => {
    const wrapper = mount(AppButton, {
      props: {
        label: TEST_DATA.btnText,
      }
    });

    expect(wrapper.text()).toBe(TEST_DATA.btnText);
  });

  it('should apply background color', () => {
    const wrapper = mount(AppButton, {
      props: {
        label: TEST_DATA.btnText,
        backgroundColor: TEST_DATA.bgColor,
      }
    });
    const btnEl = wrapper.get('button').element;
    expect(btnEl.style.backgroundColor).toBe(TEST_DATA.bgColor);
  });

  it(`should have class ${TEST_DATA.defaultClass} by default`, () => {
    const wrapper = mount(AppButton, {
      props: {
        label: TEST_DATA.btnText,
      }
    });
    const btn = wrapper.get('button');
    expect(btn.classes()).toContain(TEST_DATA.defaultClass);
  });

  it(`should have class ${TEST_DATA.mediumSizeClass} by default`, () => {
    const wrapper = mount(AppButton, {
      props: {
        label: TEST_DATA.btnText,
      }
    });
    const btn = wrapper.get('button');
    expect(btn.classes()).toContain(TEST_DATA.mediumSizeClass);
  });

  it(`should have class ${TEST_DATA.largeSizeClass} for large button`, () => {
    const wrapper = mount(AppButton, {
      props: {
        label: TEST_DATA.btnText,
        size: 'large',
      }
    });
    const btn = wrapper.get('button');
    expect(btn.classes()).toContain(TEST_DATA.largeSizeClass);
  });

  it(`should emit "${TEST_DATA.emits}" when the button is clicked`, () => {
    const wrapper = mount(AppButton, {
      props: {
        label: TEST_DATA.btnText,
      }
    });
    wrapper.get('button').trigger('click');
    expect(wrapper.emitted()).toHaveProperty(TEST_DATA.emits);
  });
})
