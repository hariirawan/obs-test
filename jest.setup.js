const matchers = require("@testing-library/jest-dom");
expect.extend(matchers);

afterEach(() => {
  jest.useRealTimers();
});
