const assert = require('assert').strict;
const app = require('./app');
const data = require('./data');

describe("CLI tests -> filter function", function() {
    it("filter function with pattern ry (2 elements expected)", function() {
        assert.strictEqual(app.filter('ry').length, 2);
    });
    it("filter function with pattern qs (0 elements expected)", function() {
        assert.strictEqual(app.filter('qs').length, 0);
    });

    it("filter function with pattern a (5 elements expected)", function() {
        assert.strictEqual(app.filter('a').length, 5);
    });
});

describe("CLI tests -> count function", function() {
    const countArray = app.count();
    const baseData = data.data;
    it("count function (Country Dillauti must have 5 peoples (Dillauti [5])", function() {
        assert.strictEqual(countArray[0].name, `Dillauti [${baseData[0].people.length}]`);
    });
    it("count function (People Winifred Graham must have 6 animals (Winifred Graham [6])", function() {
        assert.strictEqual(countArray[0].people[1].name, `Blanche Viciani [${baseData[0].people[1].animals.length}]`);
    });
    it("count function (People Blanche Viciani must have 8 animals (Blanche Viciani [8])", function() {
        assert.strictEqual(countArray[0].people[1].name, `Blanche Viciani [${baseData[0].people[1].animals.length}]`);
    });
});
