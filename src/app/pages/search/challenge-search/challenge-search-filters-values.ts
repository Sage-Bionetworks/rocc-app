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

const titleCase = (string: string, split: string): string =>
  string
    .split(split)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

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

const thisYear = new Date().getFullYear();

const updateYear = (
  thisYear: number,
  startYearDiff: number,
  endYearDiff: number
) => {
  return {
    start: new Date(thisYear + startYearDiff, 0, 1),
    end: new Date(thisYear + endYearDiff, 11, 31),
  };
};

export const challengeStartYearRangeFilterValues: FilterValue[] = [
  {
    value: undefined,
    title: 'All',
    active: true,
  },
  {
    value: updateYear(thisYear, 1, 1),
    title: (thisYear + 1).toString(),
    active: false,
  },
  {
    value: updateYear(thisYear, 0, 0),
    title: thisYear.toString(),
    active: false,
  },
  {
    value: updateYear(thisYear, -1, -1),
    title: (thisYear - 1).toString(),
    active: false,
  },
  {
    value: updateYear(thisYear, -2, -2),
    title: (thisYear - 2).toString(),
    active: false,
  },
  {
    value: updateYear(thisYear, -6, -3),
    title: thisYear - 6 + ' - ' + (thisYear - 3),
    active: false,
  },
  {
    value: updateYear(thisYear, -11, -7),
    title: thisYear - 11 + ' - ' + (thisYear - 7),
    active: false,
  },
  {
    value: updateYear(thisYear, -17, -12),
    title: thisYear - 17 + ' - ' + (thisYear - 12),
    active: false,
  },
  {
    value: updateYear(thisYear, -28, -18),
    title: thisYear - 28 + ' - ' + (thisYear - 18),
    active: false,
  },
  {
    value: 'custom',
    title: 'Custom',
    active: false,
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

// export const tagFilterValues: FilterValue[] = [
//   {
//     value: 'a',
//     title: 'A',
//     active: false
//   },
//   {
//     value: 'b',
//     title: 'B',
//     active: false
//   }
// ];

export const searchTermsFilterValues: FilterValue[] = [
  {
    value: '',
    title: '',
    active: true,
  },
];
