import AppButtonToggle from '../components/AppButtonToggle.vue';

export default {
  name: 'AppButtonToggle',
  component: AppButtonToggle,
  argTypes: {
    onChange: {},
  },
};

const Template = (args) => ({
  components: { AppButtonToggle },
  setup() {
    return { args };
  },
  template: '<AppButtonToggle :="args" />',
});

export const Default = Template.bind({});
Default.args = {
  inputName: 'search-by',
  buttons: [{ name: 'one' }, { name: 'two' }, { name: 'tree' }],
};

export const WithSelected = Template.bind({});
WithSelected.args = {
  ...Default.args,
  selected: Default.args.buttons[1].name,
};

export const WithTitle = Template.bind({});
WithTitle.args = {
  ...Default.args,
  title: 'search by',
};
