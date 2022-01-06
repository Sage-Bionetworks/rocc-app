// TODO: fix import from @sage-bionetworks/sage-angular
import { Section } from '@sage-bionetworks/sage-angular/src/lib/navbar/section';

export const SECTIONS: { [key: string]: Section } = {
  about: {
    name: 'About',
    summary: 'About ROCC',
  },
  search: {
    name: 'Search',
    summary: 'Search challenges',
  },
};
