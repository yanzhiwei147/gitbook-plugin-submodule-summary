'use strict';
const path = require('path');
const fs = require('fs');
const os = require('os');

module.exports = {
    hooks: {
        'init': function() {
            
            const root = this.resolve('');
            const summaryPath = path.join(root, 'SUMMARY.md');

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
            fs.writeFileSync(summaryPath, finalSummaryContent);
        }
    }
};