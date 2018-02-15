# Episode 2.5; Building the calculator
After finishing [episode 2][episode2] you should have a small codebase
and test suite, with the following functions:

* add
* subtract
* times
* square

## Regression test
This means the following test should pass. Here we use a combination of the methods before we verify
the result. We can add it to `test/operations.spec.js`.

```js
describe("Regression tests", () => {
  it("combines different operations", () =>
    expect(times(minus(square(add(2, 3)), 5), 5)).to.eql(100)
  );
});
```

## Refactoring the add function
Now we know the code works, we could refactor the `functions` into a
version with [lamda][lamdas], this is the "Modern way" to define
functions. They have a slightly different way how the scope works, but
we get to that later 😅

In short, we will refactor this:

```js
export function add(left, right) {
  return left + right;
};
```

into this:

```js
export const add = (left, right) => left + right;
```

As you can see, the `return` statement is gone. This is because we don't
use the `{}` for the body, and thus is it a single statement. Single statements always have an
implicit return of its result. If there is no result to be returned, it will return `undefined`.

## Macro cycle of TDD
In the previous episodes we strictly used the red-green-refactor cycle of TDD.
Here we are refactoring our code even though we haven't written a failing test and made that pass first.

We are taking a step back from the nitty-gritty details for a moment and looking at our code as a
whole to see if there are opportunities to refactor. Ways to make our code look cleaner and more
readable. The lambda is a good example of that. We changed our code into a nice one liner that can
be read as: "`export` the thing named `add` that is a `const`ant that expects the parameters `(left, right)` and returns
`left + right`". With the `const` we mean that we cannot assign a different value or function to the
thing that is named `add`.

Of course we always make sure that our tests keep passing when refactoring. To recommended way to do
this is to make tiny changes to our implementation while running the tests after each change. As
soon as we do something wrong it will give us a signal and we can go back to the last change before
it started breaking. Commiting our code regularly helps a great deal! Just reset and try again.

Try avoiding refactoring the test code at the same time as the production code (implementation). My
experience has taught me that once it starts breaking it's very hard to tell if it's the test that
is broken or the implementation.

---- TODO -----


## Refactoring the square method
So, how did the `square` method ended up?

There are a lot of possible ways for it:

```js
const square = a => Math.pow(a, 2)
const square = a => times(a, a);
const square = a => a * a;
```

Now we can do "calculations". But its not a calculator *yet*.

The calculator we want should have a result, that is `0` by default.
each instruction should work upon that result.

Here are the first 'specs' for this calculator.

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

[episode2]: https://github.com/matthijsgroen/js-tdd/tree/master/episode2
[lamda]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
