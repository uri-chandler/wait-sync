var should   = require('chai').should();
var waitSync = require('../index.js');

describe('wait-sync', () => {

    it('does not block the execution thread', () => {
        var isDone = false;
        setTimeout(() => isDone=true, 1500);

        waitSync(2);
        isDone.should.be.true;
    });

    it('runs the current execution block in non-async serial manner', () => {
        var fakeConsoleLog = [];

        fakeConsoleLog.push(1);

        setTimeout(() => fakeConsoleLog.push(2), 1500);
        waitSync(2);

        fakeConsoleLog.push(3);

        fakeConsoleLog.join('-').should.equal('1-2-3');
        fakeConsoleLog.join('-').should.not.equal('1-3-2');
    });
});