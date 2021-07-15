import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterModule } from '@sage-bionetworks/sage-angular/src/lib/footer';
import { NavbarModule, Section } from '@sage-bionetworks/sage-angular/src/lib/navbar';

import Page from './components/page/page.component';

import * as NavbarStories from './Navbar.stories';
import * as FooterStories from './Footer.stories';

@Component({ template: 'Homepage' })
class HomepageComponent {}

@Component({ template: 'Lorem' })
class LoremComponent {}

@Component({ template: 'Ipsum' })
class IpsumComponent {}

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomepageComponent },
  { path: 'lorem', component: LoremComponent },
  { path: 'ipsum', component: IpsumComponent }
];

const sections: { [key: string]: Section } = {
  lorem: {
    name: 'Lorem',
    summary: 'Short summary of lorem.'
  },
  ipsum: {
    name: 'Ipsum',
    summary: 'Short summary of ipsum.'
  }
};

export default {
  title: 'Sage Angular/Page',
  component: Page,
  decorators: [
    moduleMetadata({
      declarations: [
        HomepageComponent,
        LoremComponent,
        IpsumComponent
      ],
      imports: [
        RouterModule.forRoot(routes, { useHash: true }),
        FooterModule,
        NavbarModule
      ],
    }),
  ],
} as Meta;

const Template: Story<Page> = (args: Page) => ({
  props: args,
});

export const SignedIn = Template.bind({});
SignedIn.args = {
  ...FooterStories.Default.args,
  ...NavbarStories.SignedIn.args
};

export const SignedOut = Template.bind({});
SignedOut.args = {
  ...FooterStories.Default.args,
  ...NavbarStories.SignedOut.args
};
