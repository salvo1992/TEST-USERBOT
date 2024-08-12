// tests/index.test.ts
import { expect } from 'chai';
import { analyzeContent } from '../src/index';

describe('analyzeContent', () => {
  it('should correctly analyze content', () => {
    const content = 'hello world hello hello world world world world world world world world world world';
    const result = analyzeContent(content);
    
    expect(result.totalWords).to.equal(14);
    expect(result.totalLetters).to.equal(84);
    expect(result.totalSpaces).to.equal(13);
    expect(result.frequentWords).to.deep.equal([
      { word: 'world', count: 12 },
      { word: 'hello', count: 3 }
    ]);
  });
});
