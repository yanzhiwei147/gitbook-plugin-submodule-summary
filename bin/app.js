#! /usr/bin/env node

'use strict';

const _ = require('lodash');
const program = require('commander');
const pkg = require('../package.json');
const summary = require('../lib/summary').summary;

program
    .version(pkg.version);

program
    .command('summary')
    .alias('sm')
    .description('Merge git submodule SUMMARY.md.')
    .option('-r, --root [string]', 'root folder, default is `.`')
    .option('-b, --backup', 'back up the SUMMARY.md file, default is overwritten.')
    .option('-d, --debug', 'show debug log, default is false.')
    .action(function(options) {
        summary(options);
    });

// Parse and fallback to help if no args
if (_.isEmpty(program.parse(process.argv).args) && process.argv.length === 2) {
    program.help();
}