import { ButtonToggleFilterValue } from '@shared/filters/button-toggle-filter/button-toggle-filter-value';
import { FilterValue } from '@shared/filters/filter-value.model';

// tmp: hardcode input data types
// TO-DO: use enum when ontology is applied
const rawInputDataTypes = [
  'genomic',
  'proteomic',
  'other',
  'gene-expression',
  'microarray',
  'mass-spectrometry',
  'fluorescence',
  'demographic',
  'clinical',
  'survival',
  'mutation',
  'copy-number-variation',
  'whole-exome-sequencing',
  'rna-sequencing',
  'dna-methylation',
  'reverse-phase-protein-array',
  'protein-expression',
  'drug-response',
  'snp',
  'cytotoxicity',
  'metabolomic',
  'dna-sequencing',
  'chip-sequencing',
  'dosages',
  'genotype-probabilities',
  'whole-genome-sequencing',
  'gene-essentiality',
  'molecular-characterization',
  'gene-annotations',
  'nia-reagan-score',
  'mmse-score',
  'imaging',
  'mri',
  'odor-perceptual-ratings',
  'molecular-descriptors',
  'synergy',
  'molecular',
  'chemistry',
  'mono-therapies',
  'drug-target',
  'snv-calling',
  'granular-symptom',
  'microarry',
  'gene-and-protein-networks',
  'dnase-sequencing',
  'images-crosswalk',
  'digital-imaging',
  'workflow',
  'ehr',
  'walking-activity',
  'upper-limb-action',
  'upper-limb-resting',
  'copy-number-alteration',
  'chemical-structure',
  'scrna-sequencing',
  'cell-lineage',
  'dose-response',
  'suvival',
  'drug-sensitivity',
  'x-rays',
  'svh-score',
  'sensor',
  'tmb',
  'ihc',
];

const updateDate = (date: Date, year: number): Date =>
  new Date(date.setFullYear(date.getFullYear() + year));

const titleCase = (string: string, split: string): string =>
  string
    .split(split)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

export const sortByFilterValues: FilterValue[] = [
  {
    value: '-featured',
    title: 'Featured',
    active: true,
  },
  {
    value: '-startDate',
    title: 'Newest',
    active: false,
  },
  {
    value: 'startDate',
    title: 'Oldest',
    active: false,
  },
  {
    value: '-participantCount',
    title: 'Participants',
    active: false,
  },
  // {
  //   value: '-participantCount',
  //   title: 'Participants: Least to Most',
  //   active: false,
  // },
  {
    value: '-viewCount',
    title: 'Views',
    active: false,
  },
  {
    value: '-name',
    title: 'Alphabetic: Z to A',
    active: false,
  },
  {
    value: 'name',
    title: 'Alphabetic: A to Z',
    active: false,
  },
];

export const orderByFilterValues: FilterValue[] = [
  {
    value: '-createdAt',
    title: `Newest challenges`,
    active: true,
  },
  {
    value: 'createdAt',
    title: `Oldest challenges`,
    active: false,
  },
];

export const challengeTypeFilterValues: FilterValue[] = [
  {
    value: 'challenge',
    title: 'Challenge',
    active: true,
  },
  {
    value: 'benchmark',
    title: 'Benchmark',
    active: false,
  },
];

export const previewTypeFilterValues: ButtonToggleFilterValue[] = [
  {
    value: 'array',
    title: 'Array',
    icon: 'view_array',
    active: true,
  },
  {
    value: 'list',
    title: 'List',
    icon: 'view_list',
    active: false,
  },
];

export const challengeStatusFilterValues: FilterValue[] = [
  {
    value: 'active',
    title: `Active`,
    active: false,
  },
  {
    value: 'upcoming',
    title: `Upcoming`,
    active: false,
  },
  {
    value: 'completed',
    title: `Completed`,
    active: false,
  },
];

export const challengeStartYearRangeFilterValues: FilterValue[] = [
  {
    value: {
      start: updateDate(new Date(), -10),
      end: new Date(),
    },
    title: 'Last Ten Years',
    active: false,
  },
  {
    value: {
      start: updateDate(new Date(), -5),
      end: new Date(),
    },
    title: 'Last Five Years',
    active: false,
  },
  {
    value: {
      start: updateDate(new Date(), -1),
      end: new Date(),
    },
    title: 'Last Year',
    active: false,
  },
  {
    value: {
      start: new Date(new Date().getFullYear(), 0, 1),
      end: new Date(new Date().getFullYear(), 11, 31),
    },
    title: 'This Year',
    active: false,
  },
  {
    value: {
      start: new Date(),
      end: updateDate(new Date(), 1),
    },
    title: 'Next Year',
    active: false,
  },
  {
    value: {
      start: new Date(),
      end: updateDate(new Date(), 3),
    },
    title: 'Next Three years',
    active: false,
  },
];

export const challengeStartDateRangeFilterValues: FilterValue[] = [
  {
    value: {
      start: '2010-07-21',
      end: '2030-07-21',
    },
    title: '',
    active: true,
  },
];

export const challengeDifficultyFilterValues: FilterValue[] = [
  {
    value: 'GoodForBeginners',
    title: 'Good For Beginners',
    active: false,
  },
  {
    value: 'Intermediate',
    title: 'Intermediate',
    active: false,
  },
  {
    value: 'Advanced',
    title: 'Advanced',
    active: false,
  },
];

export const challengeSubmissionTypesFilterValues: FilterValue[] = [
  {
    value: 'DockerImage',
    title: 'Docker Image',
    active: false,
  },
  {
    value: 'PredictionFile',
    title: 'Prediction File',
    active: false,
  },
  {
    value: 'Other',
    title: 'Other',
    active: false,
  },
];

const inputDataTypes: FilterValue[] = [];

rawInputDataTypes.map((datatype) => {
  const x = {
    value: datatype,
    title: titleCase(datatype, '-'),
    active: false,
  };
  inputDataTypes.push(x);
});

export const challengeInputDataTypesFilterValues: FilterValue[] =
  inputDataTypes;

export const challengeIncentiveTypesFilterValues: FilterValue[] = [
  {
    value: 'Monetary',
    title: 'Monetary',
    active: false,
  },
  {
    value: 'Publication',
    title: 'Publication',
    active: false,
  },
  {
    value: 'SpeakingEngagement',
    title: 'Speaking Engagement',
    active: false,
  },
  {
    value: 'Other',
    title: 'Other',
    active: false,
  },
];

export const searchTermsFilterValues: FilterValue[] = [
  {
    value: '',
    title: '',
    active: true,
  },
];
