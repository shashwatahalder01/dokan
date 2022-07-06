const Sequencer = require('@jest/test-sequencer').default

class CustomSequencer extends Sequencer {

  sort(tests) {
    const copyTests = Array.from(tests)

    const setupTests = copyTests.filter(test => test.path.includes('setup'))
    const exploratoryTests = copyTests.filter(test => test.path.includes('exploratory'))
    const actualTests = copyTests.filter(test => !test.path.includes('setup') && !test.path.includes('exploratory'))
    actualTests.sort((testA, testB) => (testA.path > testB.path ? 1 : -1))
    // console.log(setupTests, exploratoryTests, actualTests)
    const sortedTests = [...setupTests, ...actualTests, ...exploratoryTests]
    return sortedTests
  }
}

module.exports = CustomSequencer