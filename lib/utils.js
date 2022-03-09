import he from 'he'
import { siteTitle } from '../components/Layout'

export function calcAnimationDelay(index, limit = null) {
  index = index + 1;

  if (limit && (index >= limit + 1)) {
    let remainder = index % limit;
    index = (remainder === 0) ? limit : remainder;
  }

  if (index < 10) {
    return '0.' + index;
  } else if (index >= 10 && index < 100) {
    index = index.toString();
    return index[0] + '.' + index[1]; // add decimal in tenth position
  }
}

export function generatePageTitle(pageTitle) {
  return `${he.decode(pageTitle)} \u2022 ${siteTitle}`
}
