const path = require('path')
const getTestMatchByEnv = () => {
  const matchMap = {
    unit: ['<rootDir>/packages/**/?(*.)+(spec|test).[jt]s?(x)'],
    snapshot_markup: ['<rootDir>/stories/storybook.markupsnapshot.test.js'],
    // can_text_output: ['<rootDir>/client/**/?(*.)+(spec|test).[jt]s?(x)', '<rootDir>/stories/storybook.markupsnapshot.test.js'],
    snapshot_visual: ['<rootDir>/stories/storybook.visualsnapshot.test.js'],
    all: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)']
  }
  return matchMap[process.env.TEST_TYPE || 'all']
}
module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  rootDir: path.resolve(__dirname, '../'),
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: './test/unit/coverage'
      }
    ]
  ],
  // The directory where Jest should output its coverage files
  // coverageDirectory: 'coverage',
  coverageDirectory: '<rootDir>/test/unit/coverage',
  coverageReporters: ['clover', 'lcov'],

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],
  // A set of global variables that need to be available in all test environments
  globals: {

  },
  // An array of file extensions your modules use
  moduleFileExtensions: [
    'js',
    'json',
    'jsx',
    'vue'
  ],
  // A map from regular expressions to module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    "\\.(css|less)$": "identity-obj-proxy",
    '^.+\\.mdx?$': '@storybook/addon-docs/jest-transform-mdx'
  },
  // roots: [
  //   '<rootDir>'
  // ],
  // The paths to modules that run some code to configure or set up the testing environment before each test
  // setupFiles: ['<rootDir>/tests/global.js'],
  // A list of paths to snapshot serializer modules Jest should use for snapshot testing
  snapshotSerializers: ['jest-serializer-vue'],
  // The test environment that will be used for testing
  testEnvironment: 'jsdom',
  // The glob patterns Jest uses to detect test files
  testMatch: getTestMatchByEnv(),
  // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
  testURL: 'http://localhost/',
  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.vue$': require.resolve('vue-jest'), // 告诉Jest用 vue-jest 处理 `*.vue` 文件
    '^.+\\.js?$': require.resolve('babel-jest'), //来告诉 Jest 用 babel-jest 处理 JavaScript 测试文件
    '^.+\\.mdx?$': require.resolve('babel-jest')
  },
  testPathIgnorePatterns: [
    '<rootDir>/test/e2e'
  ],
  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: [
    '/node_modules/(?!vant|@babel|mint-ui)'
  ],
  setupFiles: ['<rootDir>/test/setup.js'],
};