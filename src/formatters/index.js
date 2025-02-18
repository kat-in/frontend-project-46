import plain from './plain.js';
import json from './json.js';
import stylish from './stylish.js';

const getFormat = (compare, format) => {
  switch (format) {
    case 'plain':
      return plain(compare);

    case 'stylish':
      return stylish(compare);

    case 'json':
      return json(compare);

    default:
      throw new Error('Неизвестный формат');
  }
};

export default getFormat;
