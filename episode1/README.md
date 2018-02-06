# Building a calculator, episode 1

## Setup a JS playground from scratch

We will setup a total blank GIT repo, with a JS project that can run tests,
and where you can use the latest ES standard.

Execute the following commands in the terminal to setup a minimal work
environment:

```sh
mkdir calculator
cd calculator
git init .
yarn init
# Fill in the details

mkdir test
mkdir src

yarn --dev add chai mocha babel-core babel-preset-latest babel-preset-stage-3

```

Add the following to the created `package.json`. This is needed to
run the tests. We use [mocha][mocha] to run the tests, and
[chai][chai] to write the test definitions (assertions).

```json
"scripts": {
    "test": "mocha --require babel-core/register"
  },
  "babel": {
    "presets": [
      "stage-3",
      "latest"
    ]
  },
```

Add the following to `src/calculator-fns.js`

```js
export function add(a, b) {
  return a + b;
};
```
Add the following to `test/calculator-fns.spec.js`

```js
import { expect } from "chai";
import { add } from "../src/calculator-fns";

describe("Calculator functions", () => {
  describe("adding numbers", () =>

    // This test should pass, since we have an implementation for
    // the `add` function
    it("1 + 1 = 2", () =>
      expect(add(1, 1)).to.eql(2)
    )
  );


  // This test should fail, since we have not yet implemented
  // the `times` function
  describe("multiplying numbers", () =>
    it("2 * 3 = 6", () =>
      expect(times(2, 3)).to.eql(6)
    )
  );

});
```

You should now be able to run the tests using `yarn test`. You can also run the tests in continues watch mode, so that you can change tests and code and the tests will run directly. `yarn test --watch`

## Exercise

Add the following functionality, by creating the tests first, watch them fail,
and add the implementation later. A failing test for `times` is already added.

Functions to implement:

- subtract
- times
- square

[chai]: http://chaijs.com/
[mocha]: https://mochajs.org/
