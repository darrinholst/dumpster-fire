/*
 * https://gist.github.com/timgit/7bc5896f5297301afb02
 */

import * as _ from 'lodash';

export function shorten(toShorten: number, fractionSize?: number) {
  if (toShorten === null) return null;
  if (toShorten === 0) return '0';
  if (!_.isNumber(fractionSize) || fractionSize < 0) fractionSize = 1;

  let abs = Math.abs(toShorten);
  let rounder = Math.pow(10, fractionSize);
  let isNegative = toShorten < 0;
  let key = '';

  let powers = [
    {key: 'Sp', value: Math.pow(10, 24)},
    {key: 'Sx', value: Math.pow(10, 21)},
    {key: 'Qd', value: Math.pow(10, 18)},
    {key: 'Qt', value: Math.pow(10, 15)},
    {key: 'Qd', value: Math.pow(10, 15)},
    {key: 'T', value: Math.pow(10, 12)},
    {key: 'B', value: Math.pow(10, 9)},
    {key: 'M', value: Math.pow(10, 6)},
    {key: 'K', value: 1000}
  ];

  _.forEach(powers, function(power, i) {
    let reduced = abs / power.value;
    reduced = Math.round(reduced * rounder) / rounder;

    if (reduced >= 1) {
      abs = reduced;
      key = powers[i].key;
      return false;
    } else {
      return true;
    }
  });

  return (isNegative ? '-' : '') + abs + key;
}
