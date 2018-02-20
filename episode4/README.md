## Episode 4: Calculator
In the previous episodes we have build the basic operations of a calculator, but we haven't build a
calculator yet. We've also learned how to build this taking tiny steps, writing our tests before we
write our code and commiting between each step.

In this episode we are going to build the calculator with the following
functionality.

- It returns a default result of 0
- It can add a number
- It can add numbers multiple times
- It can chain the commands

Also take a moment to study the syntax of [ES6 classes][es6-classes].

## Exercise
Build the calculator object with the functionality above. Try taking the tiniest steps you can
using the TDD cycle. What is the simplest thing that could possible work to make the test fail or
make it pass?

When you are done you can come back here and finish the rest of the episode.

## Creates an instance
We have an idea about what we want our calculator to do, but we have nothing so far. You have
already tried to implement those steps. Did you think about refactoring along the way?
So let's go over that with an example here. When using TDD we think about the tiniest, simplest test
we can think of that will fail.

What about creating a new test file `test/calculator.spec.js` with the following test?

```js
import { expect } from "chai";

describe("Calculator", () => {
  it("creates an instance", () => {
    new Calculator()
  });
});
```

There is nothing more we need to do in order to make the test fail. So let's move on to making that
test pass by doing the absolute minimum.

In `src/calculator.js`:

```js
// In test/calculator.spec.js
import { Calculator } from "../src/calculator";

// In src/calculator.js`
export class Calculator{}
```

From now on we go over the test and implementation a bit quicker.

## Has a default result

RED:

```js
// Add this test

it("has a default result", () => {
  const calculator = new Calculator()
  expect(calculator.result()).to.eql(0)
});
```

GREEN:

```js
export class Calculator{
  result() {
    return 0
  }
}
```

REFACTOR:
```js
describe("Calculator", () => {
  it("has a default result", () => {
    const calculator = new Calculator()
    expect(calculator.result()).to.eql(0)
  });
});
```

## Can add a number

RED:
```js
// Add this test
it("can add a number", () => {
  const calculator = new Calculator()
  calculator.add(2)
  expect(calculator.result()).to.eql(2)
});
```

GREEN:
```js
import { add } from "./operations";

export class Calculator{
  constructor() {
    this.res = 0;
  }

  result() {
    return this.res;
  }

  add() {
    this.res = add(0, 2)
  }
}
```

REFACTOR:
There is some duplication in the test now (Remember the [4 Rules of Simple Design][4rosd]?). It's creating an instance of a calculator for each test.
We do want to keep the two tests because they each verify different functionality.

```js
// test/calculator.spec.js
describe("Calculator", () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator()
  });

  it("has a default result", () => {
    expect(calculator.result()).to.eql(0)
  });

  it("can add a number", () => {
    calculator.add(2)
    expect(calculator.result()).to.eql(2)
  });
});
```

TODO: Explain 3A's
- Arrange
- Act
- Assert


TODO:
- Result method versus exposing a result attribute

```js
// test/calculator.js
import { expect } from "chai";

describe("Calculator", () => {

  // only run this test for now
  it.only("has a default result of 0", () =>
    expect(calculator.result).to.eql(0);
  );

  xit("can add numbers", () => {
    expect(calculator.result).to.eql(0);
    calculator.add(10)
    expect(calculator.result).to.eql(10);
  });

  xit("can chain commands", () => {
    expect(calculator.result).to.eql(0);
    calculator.times(2).add(10).times(2)
    expect(calculator.result).to.eql(20);
  });

});
```

This block of tests has no 'setup' structure. Normally a test has 3 A's.

- Arrange
- Act
- Assert

You can add a single setup block that is repeated for each test by creating a 'before' step.

```js
// test/calculator.js

describe("Calculator", () => {
  let calculator;

  beforeEach(() => {
    // ... setup the proper 'calculator' to make the tests pass.
  });
});
```

Focus only on making the first test pass.

There are actually a lot of ways to implement just enough to make the first test pass.
There are at least 4 different ways to create this 'object' needed to make this pass.
Just go with the most simplest form you can think of for now.

* Can you make all the tests pass?

[es6-classes]: http://es6-features.org/#ClassDefinition
[4rosd]: https://www.theguild.nl/4-rules-of-simple-design/
