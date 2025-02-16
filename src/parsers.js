import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import path from 'node:path';
import yaml from 'js-yaml';

const parsers = (filepath) => {
  const format = path.extname(filepath);
  const newPath = path.resolve(cwd(), filepath);
  let parse;
  if (format === '.json') {
    parse = JSON.parse;
  }
  if (format === '.yml' || format === '.yaml') {
    parse = yaml.load;
  }
  return parse(readFileSync(newPath, { encoding: 'UTF-8' }));
};

export default parsers;
