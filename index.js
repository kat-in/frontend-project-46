import path from 'node:path';
import fs from 'fs';
import parsers from './src/parsers.js';
import stylish from './src/stylish.js';
import buildTree from './src/buildTree.js';

const compareFiles = (file1, file2, format = 'stylish') => {
  const content1 = fs.readFileSync(path.resolve(file1), 'UTF-8');
  const content2 = fs.readFileSync(path.resolve(file2), 'UTF-8');
  const firstObject = parsers(content1, path.extname(file1));
  const secondObject = parsers(content2, path.extname(file2));
  const compareObject = buildTree(firstObject, secondObject);

  let data;
  switch (format) {
    case 'plain':
      break;
    default:
      data = stylish(compareObject);
      break;
  }
  return data;
  // return fs.writeFileSync("./__fixtures__/resultTree.txt", data);
};

export default compareFiles;
