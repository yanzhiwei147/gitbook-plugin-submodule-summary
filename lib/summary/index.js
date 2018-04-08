'use strict';
const path = require('path');
const fs = require('fs');
const os = require('os');
const color = require('bash-color');

function Log(options, message) {
    // flag 
    const enableLog = options['debug'] || false;
    if (!enableLog) {
        return;
    }
    console.log(message);
}

function Summary(options) {
    // config
    var originRoot = options['root'] || process.cwd();
    originRoot = path.join(process.cwd(), originRoot);

    const backup = options['backup'] || false;

    const root = originRoot;
    const summaryPath = path.join(root, 'SUMMARY.md');
    if (!fs.existsSync(summaryPath)) {
        Log(options, color.red('Error, Can\'t found SUMMARY.md file, please check root path.'));
        return -1;
    }

    const newSummaryPath = path.join(root, 'SUMMARY.new.md');
    var finalSummaryContent = '';
    const readEachLineSync = require('read-each-line-sync');
    readEachLineSync(summaryPath, function(line) {
        const submoduleSummaryRegex = /(\s+){1,}(<!-- SUBMODULE-SUMMARY){1}(\s){1,}(.+){1,}(\s){1,}(-->){1}/;
        const found = line.match(submoduleSummaryRegex);
        if (!found) {
            finalSummaryContent = finalSummaryContent + line + os.EOL;
            return;
        }

        const prefixWhiteSpaces = found[1];
        const submoduleSummaryFilePath = found[4];
        const fullSubmoduleSummaryFilePath = path.join(root, submoduleSummaryFilePath);
        const submoduleSummaryFileExist = fs.existsSync(fullSubmoduleSummaryFilePath);
        if (!submoduleSummaryFileExist) {
            finalSummaryContent = finalSummaryContent + line + os.EOL;
            return;
        }

        const baseDir = path.dirname(submoduleSummaryFilePath);
        const linkRegex = /(\[(.*?)\]\()(.+?)(\))/;
        readEachLineSync(fullSubmoduleSummaryFilePath, function(line1) {
            var newLine = prefixWhiteSpaces;
            const found = line1.match(linkRegex);
            if (found) {
                const oldPath = found[3];
                const newPath = path.join(baseDir, oldPath);
                newLine = newLine + line1.replace(oldPath, newPath);
            } else {
                newLine = newLine + line1;
            }

            newLine = newLine + os.EOL;
            finalSummaryContent = finalSummaryContent + newLine;
        });
    });

    const finalSummaryPath = backup ? newSummaryPath : summaryPath;
    fs.writeFileSync(finalSummaryPath, finalSummaryContent);

    return [0, finalSummaryContent];
}

module.exports = {
    summary: Summary
};