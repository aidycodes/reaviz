import { hasDataArray, hasDataArrayWithKeyUrl } from './hasDataArray';

export const isDate = (v: any): v is Date => v instanceof Date;

export function buildUrlMap(data: any[], isMultiSeries = false) {
  const map = new Map();

  if (!data) return map;
  if (!Array.isArray(data)) return map;

  if (isMultiSeries) {
    for (const d of data) {
      if (hasDataArrayWithKeyUrl(d)) {
        for (const { key, key_url } of d.data) {
          if (typeof key === 'string' && key_url) map.set(key, key_url);
          else if (isDate(key)) {
            map.set(key.getTime(), key_url);
          }
        }
      }
    }
  } else {
    for (const { key, key_url } of data) {
      if (typeof key === 'string' && key_url) map.set(key, key_url);
      else if (isDate(key)) {
        map.set(key.getTime(), key_url);
      }
    }
  }

  return map;
}
