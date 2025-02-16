#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../index.js';
import parsers from '../src/parsers.js';

program
  .argument('<filepath1>')
  .argument('<filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const options = program.opts();
    console.log(
      genDiff(parsers(filepath1), parsers(filepath2), options.format),
    );
  })
  .helpOption('-h, --help', 'output usage information');

program.parse();
