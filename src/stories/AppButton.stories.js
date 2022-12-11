import AppButton from '../components/AppButton.vue';

export default {
  title: 'AppButton',
  component: AppButton,
  argTypes: {
    backgroundColor: { control: 'color' },
    onClick: {},
    size: {
      control: { type: 'select' },
      options: ['medium', 'large'],
    },
  },
};

const Template = (args) => ({
  components: { AppButton },
  setup() {
    return { args };
  },
  template: '<AppButton :="args" />',
});

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'SEARCH',
};

export const Large = Template.bind({});
Large.args = {
  primary: true,
  size: 'large',
  label: 'SEARCH',
};
