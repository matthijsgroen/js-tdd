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

export class Calculator {
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

## The 3As of a Unit Test
The 3As stand for Arrange-Act-Assert. It's a pattern for arranging and formatting code of a test.
It clearly separates the what is being tested from the setup that is required and the verification
steps. It helps communicate the intention of the test to the reader and the behaviour of the code
under test.

- *Arrange* all necessary preconditions and inputs
- *Act* on the object or method under test
- *Assert* that the expected results have occured

In our previous test we see this pattern in the initial `it can add a number` in the RED stage.

- *Arrange*: First create a calculator object in order to call the method under test, namely add.
- *Act*: Call the method
- *Assert*: Verify the resulting behaviour of the test

(Technically there is an *Act* part in the `expect(...)` line of the test. Can you spot what that is?)

The refactor step also has the same pattern, but the duplication in the tests have been moved to the
`beforeEach`. When *all* the tests have the same setup you it pays off to refactor that. When you
then need to change something you only need to do that in one place.

Can you think of reasons why the setup would change? What would be the cost if you hadn't refactored
it?

## Adding multiple numbers

RED:

```js
it("can add multiple numbers", () => {
  calculator.add(2)
  calculator.add(6)
  expect(calculator.result()).to.eql(8)
});
```

GREEN:

```js
add(number) {
  this.res = add(this.res, number)
}
```

REFACTOR:

Right now there is nothing to refactor. You could say that there are two lines that do the same
thing in two different tests, `calculator.add(2)`. I do not call this duplication, because the *act*
part as a whole is different. Refactoring should generalize parts of the code or test. You cannot
really generalize adding 2.

## Method Chaining
In short Method Chaining is to make the modifier methods return the host object,
so that multiple modifiers can be invoked in a single expression. Let's explain that with an
example.

Compare the following code snippet:
```js
object.doThis();
object.doThat();
object.doSomething();
```

With this:
```js
object
  .doThis()
  .doThat()
  .doSomething();
```

We are going to be using the same for our `add` method.

----
Focus only on making the first test pass.

There are actually a lot of ways to implement just enough to make the first test pass.
There are at least 4 different ways to create this 'object' needed to make this pass.
Just go with the most simplest form you can think of for now.

* Can you make all the tests pass?

[es6-classes]: http://es6-features.org/#ClassDefinition
[4rosd]: https://www.theguild.nl/4-rules-of-simple-design/
