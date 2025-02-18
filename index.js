import path from 'node:path';
import fs from 'fs';
import parsers from './src/parsers.js';
import buildTree from './src/buildTree.js';
import getFormat from './src/formatters/index.js';

const compareFiles = (file1, file2, format = 'stylish') => {
  const content1 = fs.readFileSync(path.resolve(file1), 'UTF-8');
  const content2 = fs.readFileSync(path.resolve(file2), 'UTF-8');
  const firstObject = parsers(content1, path.extname(file1));
  const secondObject = parsers(content2, path.extname(file2));
  const compareObject = buildTree(firstObject, secondObject);
  return getFormat(compareObject, format);

  // return fs.writeFileSync("./__fixtures__/resultJson.json", data);
};

export default compareFiles;
