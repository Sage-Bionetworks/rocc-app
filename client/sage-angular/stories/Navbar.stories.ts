import { moduleMetadata, Meta, Story } from '@storybook/angular';
import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent, NavbarModule, Section } from '@sage-bionetworks/sage-angular/src/lib/navbar';

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
  title: 'Sage Angular/Navbar',
  component: NavbarComponent,
  decorators: [
    moduleMetadata({
      declarations: [
        HomepageComponent,
        LoremComponent,
        IpsumComponent
      ],
      imports: [
        RouterModule.forRoot(routes, { useHash: true }),
        NavbarModule
      ]
    }),
  ],
} as Meta;

const Template: Story<NavbarComponent> = (args: NavbarComponent) => ({
  props: {
    title: args.title,
    githubUrl: args.githubUrl,
    user: args.user,
    sections: args.sections
  }
});

export const SignedIn = Template.bind({});
SignedIn.args = {
  user: {},
  sections: sections
};

export const SignedOut = Template.bind({});
SignedOut.args = {
  user: null,
  sections: sections
};