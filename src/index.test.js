it("should pass", () => {
  expect(true).toEqual(true);
});

it("should not fail", () => {
  expect(false).toEqual(false);
});

// it("test description", function that has the body of the test to be executed)
// jest finds all the files that have .spec.ts or .test.ts extensions and execute all the tests for us.
// tests can be run using either
// - npm t or
// - npm run test or
// - npm test
// in the package.json test config, --watch with the jest setting only works with Git repositories
