# Building a calculator, episode 2

After finishing [episode 1][episode1] you should have a small codebase
and test suite, with the following functions:

* add
* subtract
* times
* square

this means the following test should end up as *green*:

```js
describe("Episode 1 verification", () =>
  it("can add, subtract, times, and square numbers", () =>
    expect(times(subtract(square(add(2, 3)), 5), 5)).to.eql(100)
  )
)
```

now we know the code works, we could refactor the `functions` into a
version with [lamda][lamda]'s, this is the "Modern" way to define
functions. They have a slightly different way how their scope works, but
we get to that later 😅

In short, turn this:

```js
export function add(a, b) {
  return a + b;
};
```

into this:

```js
export const add = (a, b) => a + b;
```

as you can see, the `return` statement is gone. This is because we don't
use the `{}` for the body, and thus is it a single statement, that is an
implicit return of its result.

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

[episode1]: https://github.com/matthijsgroen/js-tdd/tree/master/episode1
[lamda]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
