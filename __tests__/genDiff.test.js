import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/genDiff.js';
import getParserType from '../src/getParserType.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('Два файла json, формат по умолчанию', () => {
  expect(
    genDiff(
      getParserType(getFixturePath('file1.json')),
      getParserType(getFixturePath('file2.json')),
    ),
  ).toBe(fs.readFileSync(getFixturePath('result.txt'), 'utf-8'));
});

test('Два файла json, формат plain', () => {
  expect(
    genDiff(
      getParserType(getFixturePath('file1.json')),
      getParserType(getFixturePath('file2.json')),
      'plain',
    ),
  ).toBe(fs.readFileSync(getFixturePath('result2.txt'), 'utf-8'));
});

test('Файл json и yml', () => {
  expect(
    genDiff(
      getParserType(getFixturePath('file1.json')),
      getParserType(getFixturePath('file3.yml')),
    ),
  ).toBe(fs.readFileSync(getFixturePath('result3.txt'), 'utf-8'));
});
