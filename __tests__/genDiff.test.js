import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import compareFiles from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('Два файла json, формат по умолчанию', () => {
  const firstPath = getFixturePath('file1.json');
  const secondPath = getFixturePath('file2.json');
  console.log(firstPath, secondPath);
  expect(compareFiles(firstPath, secondPath)).toBe(
    fs.readFileSync(getFixturePath('result.txt'), 'utf-8'),
  );
});

test('Два файла yml, формат по умолчанию', () => {
  const firstPath = getFixturePath('file3.yml');
  const secondPath = getFixturePath('file4.yml');
  console.log(firstPath, secondPath);
  expect(compareFiles(firstPath, secondPath)).toBe(
    fs.readFileSync(getFixturePath('result.txt'), 'utf-8'),
  );
});
