import AppButtonToggle from '@/components/AppButtonToggle.vue';
import { DOMWrapper, mount } from '@vue/test-utils';

const TEST_DATA = {
  inputName: 'inputName',
  buttons: [{ name: 'btn1' }, { name: 'btn2' }],
  title: 'test title',
  emits: 'selected',
};

const SELECTORS = {
  title: '[data-testid="title"]',
  inputRadio: '[data-testid="input-radio"]',
};

describe('AppButtonToggle', () => {
  it('should select the 1st button by default', () => {
    const wrapper = mount(AppButtonToggle, {
      props: {
        inputName: TEST_DATA.inputName,
        buttons: TEST_DATA.buttons,
      },
    });
    const firstBtn: DOMWrapper<HTMLInputElement> = wrapper.find(SELECTORS.inputRadio);

    expect(firstBtn.element.checked).toBe(true);
  });

  it('should select the specified button', () => {
    const selectedName = TEST_DATA.buttons[1].name;

    const wrapper = mount(AppButtonToggle, {
      props: {
        inputName: TEST_DATA.inputName,
        buttons: TEST_DATA.buttons,
        selected: selectedName,
      },
    });
    const selectedBtn: DOMWrapper<HTMLInputElement> = wrapper.find(`${SELECTORS.inputRadio}:checked`);
    expect(selectedBtn.element.value).toBe(selectedName);
  });

  it('should show title', () => {
    const wrapper = mount(AppButtonToggle, {
      props: {
        inputName: TEST_DATA.inputName,
        buttons: TEST_DATA.buttons,
        title: TEST_DATA.title,
      },
    });

    const title = wrapper.find(SELECTORS.title);
    expect(title.text()).toBe(TEST_DATA.title);
  });

  it('should not show title if not provided', () => {
    const wrapper = mount(AppButtonToggle, {
      props: {
        inputName: TEST_DATA.inputName,
        buttons: TEST_DATA.buttons,
      },
    });

    const title = wrapper.find(SELECTORS.title);
    expect(title.exists()).toBeFalsy();
  });

  it('should emit on click', async () => {
    const wrapper = mount(AppButtonToggle, {
      props: {
        inputName: TEST_DATA.inputName,
        buttons: TEST_DATA.buttons,
      },
    });
    const btn2 = wrapper.findAll(SELECTORS.inputRadio)[1] as DOMWrapper<HTMLInputElement>;
    await btn2.trigger('change');

    expect(wrapper.emitted()).toHaveProperty(TEST_DATA.emits);
  });
});
