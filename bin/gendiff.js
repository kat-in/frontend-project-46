#!/usr/bin/env node
import { program } from "commander";

program
  .argument("<filepath1>")
  .argument("<filepath2>")
  .description("Compares two configuration files and shows a difference.")
  .version("0.0.1", "-V, --version", "output the version number")
  .option("-f, --format [type]", "output format")
  .helpOption("-h, --help", "output usage information");

program.parse();
