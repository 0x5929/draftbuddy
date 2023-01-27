module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "collectCoverageFrom": [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts"
  ],
  "setupFiles": [
    "react-app-polyfill/jsdom"
  ],
  "setupFilesAfterEnv": [
    "<rootDir>/src/setupTests.js"
  ],
  "testMatch": [
    "**/?(*.)*(test)(s)?.js"
  ],
  "testEnvironment": "jsdom",
  "transform": {
    "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": "react-scripts/config/jest/babelTransform.js",
    "^.+\\.(css|scss|sass|less)$": "jest-preview/transforms/css",
    "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": "jest-preview/transforms/file"
  },
  "transformIgnorePatterns": [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$"
  ],
  "modulePaths": [],
  "moduleNameMapper": {
    "^@/(.*)$": "<rootDir>/src$1",
    "^@App(.*)$": "<rootDir>/src/app$1",
    "^@Assets(.*)$": "<rootDir>/src/assets$1",
    "^@Containers(.*)$": "<rootDir>/src/containers$1",
    "^@Components(.*)$": "<rootDir>/src/components$1",
    "^@Hooks(.*)$": "<rootDir>/src/hooks$1",
    "^@Utils(.*)$": "<rootDir>/src/utils$1"
  },
  "moduleFileExtensions": [
    "web.js",
    "js",
    "web.ts",
    "ts",
    "web.tsx",
    "tsx",
    "json",
    "web.jsx",
    "jsx",
    "node"
  ],
  // "watchPlugins": [
  //   "jest-watch-typeahead/filename",
  //   "jest-watch-typeahead/testname"
  // ],
  "resetMocks": true
}
