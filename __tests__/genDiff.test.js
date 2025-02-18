import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import compareFiles from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('Сравнение JSON', () => {
  const firstPath = getFixturePath('file1.json');
  const secondPath = getFixturePath('file2.json');

  test('Два файла json, формат по умолчанию', () => {
    expect(compareFiles(firstPath, secondPath)).toBe(
      fs.readFileSync(getFixturePath('result.txt'), 'utf-8'),
    );
  });

  test('Два файла json, формат plain', () => {
    expect(compareFiles(firstPath, secondPath, 'plain')).toBe(
      fs.readFileSync(getFixturePath('resultPlain.txt'), 'utf-8'),
    );
  });

  test('Два файла json, формат json', () => {
    expect(compareFiles(firstPath, secondPath, 'json')).toBe(
      fs.readFileSync(getFixturePath('resultJson.json'), 'utf-8'),
    );
  });
});

describe('Сравнение YML', () => {
  const firstPath = getFixturePath('file3.yml');
  const secondPath = getFixturePath('file4.yml');

  test('Два файла yml, формат по умолчанию', () => {
    expect(compareFiles(firstPath, secondPath)).toBe(
      fs.readFileSync(getFixturePath('result.txt'), 'utf-8'),
    );
  });

  test('Два файла yml, формат plain', () => {
    expect(compareFiles(firstPath, secondPath, 'plain')).toBe(
      fs.readFileSync(getFixturePath('resultPlain.txt'), 'utf-8'),
    );
  });
});
