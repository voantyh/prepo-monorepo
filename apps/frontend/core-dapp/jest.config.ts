import type { Config } from '@jest/types'
// Disabling typescript here since it's a javascript config file that is being imported
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import base from 'config/jest-frontend'
import path from 'path'

const fromRoot = (directory: string): string => path.join(__dirname, directory)

process.env.TZ = 'UTC'

const config: Config.InitialOptions = {
  ...base,
  roots: [fromRoot('.')],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'ts-jest',
    'node_modules/@web3-onboard/.+\\.(j|t)s?$': 'ts-jest',
  },
  testRegex: '(/src/.*\\.(test|spec))\\.(jsx?|tsx?|ts|js)$',
  transformIgnorePatterns: ['node_modules/(?!@web3-onboard/(.*))'],
  displayName: 'Core dApp',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    d3: '<rootDir>../../../node_modules/d3/dist/d3.min.js', // Fixes issues with d3 - https://github.com/kulshekhar/ts-jest/issues/2629
    // When the environment is jsdom, the ESM version of nanoid is imported for some reason
    // Jest can't import ESM modules without enabling --experimental-vm-modules on Node
    // When the support for ESM modules in Jest stops being experimental, we'll be able to drop
    // this line and unpin nanoid from v3.
    nanoid:
      '<rootDir>../../../node_modules/@web3-onboard/core/node_modules/nanoid/index.browser.cjs',
  },
}

export default config
