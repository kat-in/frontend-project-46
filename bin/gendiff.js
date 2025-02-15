#!/usr/bin/env node
import { program } from "commander";
import { readFileSync } from "node:fs";
import { cwd } from "node:process";
import path from "node:path";
import genDiff from "./index.js";
import yaml from "js-yaml";

program
  .argument("<filepath1>")
  .argument("<filepath2>")
  .description("Compares two configuration files and shows a difference.")
  .version("0.0.1", "-V, --version", "output the version number")
  .option("-f, --format [type]", "output format")
  .action((filepath1, filepath2) => {
    const format = (filepath) => {
      const newPath = path.resolve(cwd(), filepath);
      let file;
      if (filepath.endsWith(".json")) {
        file = JSON.parse(readFileSync(newPath, { encoding: "UTF-8" }));
      }
      if (filepath.endsWith(".yml")) {
        file = yaml.load(readFileSync(newPath, { encoding: "UTF-8" }));
      }
      return file;
    };
    console.log(genDiff(format(filepath1), format(filepath2)));
  })
  .helpOption("-h, --help", "output usage information");

program.parse();
