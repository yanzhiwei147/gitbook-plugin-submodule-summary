const assert = require('assert');
const summary = require('../lib/summary').summary;
const fs = require('fs');

describe('Summary', function() {
    it('should return -1 when not found SUMMARY.md', function() {
        assert.equal(summary({}), -1);
    });

    it('should return 0', function() {
        describe('return code equal 0', function() {
            const returnValue = summary({
                root: 'test/resources',
                backup: true
            });
            const returnCode = returnValue[0];
            assert.equal(returnCode, 0);

            const summaryContent = returnValue[1];
            const summaryFileContent = fs.readFileSync('test/resources/SUMMARY.final.md');
            assert.equal(summaryContent, summaryFileContent);
        });
    });
});