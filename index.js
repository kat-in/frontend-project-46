import parsers from "./src/parsers.js";
import stylish from "./src/stylish.js";
import path from "node:path";
import fs from "fs";
import buildTree from "./src/buildTree.js";
import _ from "lodash";

const fileFormat = (filepath) => path.extname(filepath);

const compareFiles = (file1, file2, format) => {
  const content1 = fs.readFileSync(path.resolve(file1), "UTF-8");
  const content2 = fs.readFileSync(path.resolve(file2), "UTF-8");
  const firstObject = parsers(content1, fileFormat(file1));
  const secondObject = parsers(content2, fileFormat(file2));
  const compareObject = buildTree(firstObject, secondObject);
  let data;
  switch (format) {
    case "stylish":
      data = stylish(compareObject);
      break;
    case "plain":
      break;
  }
  console.log(data);
  return fs.writeFileSync("./__fixtures__/resultTree.txt", data);
};

export default compareFiles;
