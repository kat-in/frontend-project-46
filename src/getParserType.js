import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import path from 'node:path';
import yaml from 'js-yaml';

const getParserType = (filepath) => {
  const newPath = path.resolve(cwd(), filepath);

  if (filepath.endsWith('.json')) {
    return JSON.parse(readFileSync(newPath, { encoding: 'UTF-8' }));
  }
  if (filepath.endsWith('.yml')) {
    return yaml.load(readFileSync(newPath, { encoding: 'UTF-8' }));
  }
  throw new Error('file extension not supported');
};

export default getParserType;
