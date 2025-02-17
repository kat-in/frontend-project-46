import { fileURLToPath } from "url";
import path, { dirname } from "path";
import fs from "fs";
import genDiff from "../src/genDiff.js";
import parsers from "../src/parsers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, "..", "__fixtures__", filename);

test("Два файла json, формат по умолчанию", () => {
  expect(
    genDiff(
      parsers(getFixturePath("file1.json")),
      parsers(getFixturePath("file2.json"))
    )
  ).toBe(fs.readFileSync(getFixturePath("result.txt"), "utf-8"));
});

test("Два файла yml, формат по умолчанию", () => {
  expect(
    genDiff(
      parsers(getFixturePath("file3.yml")),
      parsers(getFixturePath("file4.yml"))
    )
  ).toBe(fs.readFileSync(getFixturePath("result.txt"), "utf-8"));
});
