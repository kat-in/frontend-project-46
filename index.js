import path from 'node:path';
import fs from 'fs';
import parsers from './src/parsers.js';
import stylish from './src/formatters/stylish.js';
import plain from './src/formatters/plain.js';
import json from './src/formatters/json.js';
import buildTree from './src/buildTree.js';

const compareFiles = (file1, file2, format = 'stylish') => {
  const content1 = fs.readFileSync(path.resolve(file1), 'UTF-8');
  const content2 = fs.readFileSync(path.resolve(file2), 'UTF-8');
  const firstObject = parsers(content1, path.extname(file1));
  const secondObject = parsers(content2, path.extname(file2));
  const compareObject = buildTree(firstObject, secondObject);

  switch (format) {
    case 'plain':
      return plain(compareObject);

    case 'stylish':
      return stylish(compareObject);

    case 'json':
      return json(compareObject);

    default:
      break;
  }
  // console.log(data);
  throw new Error('Неизвестный формат');
  // return fs.writeFileSync("./__fixtures__/resultJson.json", data);
};

export default compareFiles;
