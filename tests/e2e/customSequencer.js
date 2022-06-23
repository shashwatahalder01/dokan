const Sequencer = require('@jest/test-sequencer').default;

class CustomSequencer extends Sequencer {
  
  sort(tests) {
    const copyTests = Array.from(tests);

    const setupTests = copyTests.filter(test => test.path.includes('setup'));
    const actualTests = copyTests.filter(test => !test.path.includes('setup'));
    actualTests.sort((testA, testB) => (testA.path > testB.path ? 1 : -1));
    const sortedTests = [...setupTests, ...actualTests];
    return sortedTests
  }
}

module.exports = CustomSequencer;
