#!/usr/bin/env node
import { program } from 'commander';
import compareFiles from '../index.js';

program
  .argument('<filepath1>')
  .argument('<filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const difference = compareFiles(
      filepath1,
      filepath2,
      program.opts().format,
    );
    console.log(difference);
  })
  .helpOption('-h, --help', 'output usage information');

program.parse();
