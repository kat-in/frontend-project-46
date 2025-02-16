#!/usr/bin/env node
import { program } from "commander";
import { readFileSync } from "node:fs";
import { cwd } from "node:process";
import path from "node:path";
import yaml from "js-yaml";
import genDiff from "../index.js";

program
  .argument("<filepath1>")
  .argument("<filepath2>")
  .description("Compares two configuration files and shows a difference.")
  .version("0.0.1", "-V, --version", "output the version number")
  .option("-f, --format [type]", "output format")
  .action((filepath1, filepath2) => {
    const format = (filepath) => {
      const newPath = path.resolve(cwd(), filepath);
      if (filepath.endsWith(".json")) {
        return JSON.parse(readFileSync(newPath, { encoding: "UTF-8" }));
      }
      if (filepath.endsWith(".yml")) {
        return yaml.load(readFileSync(newPath, { encoding: "UTF-8" }));
      }
    };
    const options = program.opts();
    console.log(genDiff(format(filepath1), format(filepath2), options.format));
  })
  .helpOption("-h, --help", "output usage information");

program.parse();
