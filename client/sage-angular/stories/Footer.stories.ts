import { moduleMetadata, Meta, Story } from '@storybook/angular';
import { FooterComponent, FooterModule } from '@sage-bionetworks/sage-angular/src/lib/footer';

export default {
  title: 'Sage Angular/Footer',
  component: FooterComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [FooterModule],
    }),
  ],
} as Meta;

const Template: Story<FooterComponent> = (args: FooterComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  version: '1.0.0'
};
