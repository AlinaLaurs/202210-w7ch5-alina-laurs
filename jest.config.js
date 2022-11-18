/** @type {import('ts-jest').JestConfigWithTsJest} */
const preset = 'ts-jest';
const testEnvironment = 'node';
const testPathIgnorePatterns = ['dist', 'node_modules'];
const resolver = 'jest-ts-webcompat-resolver';
export default {
    preset,
    testEnvironment,
    testPathIgnorePatterns,
    resolver,
};
