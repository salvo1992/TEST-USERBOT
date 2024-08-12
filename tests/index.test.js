"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const index_1 = require("../src/index");
describe('analyzeContent', () => {
    it('should correctly analyze content', () => {
        const content = 'hello world hello hello world world world world world world world world world world';
        const result = (0, index_1.analyzeContent)(content);
        (0, chai_1.expect)(result.totalWords).to.equal(14);
        (0, chai_1.expect)(result.totalLetters).to.equal(84);
        (0, chai_1.expect)(result.totalSpaces).to.equal(13);
        (0, chai_1.expect)(result.frequentWords).to.deep.equal([
            { word: 'world', count: 12 },
            { word: 'hello', count: 3 }
        ]);
    });
});
//# sourceMappingURL=index.test.js.map