## Calculator
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

