import { config } from '../config';
import merge from 'lodash-es/merge';

var base = require('./base');

export var seeds = module.exports = config.dbSeedName
    ? merge(base, require(`./${config.dbSeedName}`) || {})
    : null;
