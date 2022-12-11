import AppInput from '../components/AppInput.vue';

export default {
  name: 'AppInput',
  component: AppInput,
};

const Template = (args) => ({
  components: { AppInput },
  setup() {
    return { args };
  },
  template: `
        <div style="width: 300px">
            <AppInput :="args" />
        </div>
    `,
});

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Search...',
};
