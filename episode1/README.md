# Building a calculator, episode 1

## Setup a JS playground from scratch

We will setup a total blank [GIT][git] repo, with a JS project that can run tests,
and where you can use the latest ES standard.

Execute the following commands in the terminal to setup a minimal work
environment:

```sh
mkdir calculator
cd calculator
git init .
yarn init
# Press enter to use the defaults, or fill in your own details
```

We have created a directory, navigated into it and initiated an empty GIT repository. [Yarn][yarn] is
a package manager and keeps track of all the dependencies you have in your project.

Before we commit we will create a `.gitignore` file, with the following lines inside:

```sh
/node_modules
```

You can now make your first GIT commit.
```sh
git status
git add --all
git commit -m "Initial setup with yarn"
```

## Let's start coding!

```sh
mkdir test
mkdir src

yarn --dev add chai mocha babel-core babel-preset-latest babel-preset-stage-3
```

Here we have created a `test` directory for your tests and a `src` directory for your source code.
The last `yarn` command adds development packages as dependencies. You can find these back in the
`package.json` file.

[Babel][babel] is a Javascript compiler that compiles newer ES to browser-compatible Javascript.
This is necessary because not all browsers support the newer Javascript syntax yet and we do want
our application to work on those as well.

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

You can make sure this all works running `yarn` in the shell.

You can do another GIT commit, so there is always a point to go back to in case something goes
wrong. You can run `yarn test` in the shell and it will display a message that there are no tests to
run, which is correct. So let's add some code.

Add the following to `src/calculator-functions.js`

```js
export function add(a, b) {
  return a + b;
};
```
Add the following to `test/calculator-functions.spec.js`

```js
import { expect } from "chai";
import { add } from "../src/calculator-functions;

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

- times
- subtract
- square

Optional:
- divide
- square root
- exponentiation
- extract the nth root

Are there ways you can think of to make the tests passing, but without having the
desired implementation? Is there any duplication or repetition you can spot in your tests or code?

[git]: https://git-scm.com/
[yarn]: https://yarnpkg.com/
[babel]: https://babeljs.io/
[chai]: http://chaijs.com/
[mocha]: https://mochajs.org/
