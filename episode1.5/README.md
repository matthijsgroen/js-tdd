# Episode 1.5: Building a calculator using TDD
**I cut into line 73 of episode 1**

## What are we going to build?

- After each step in TDD  (red, green, refactor) we are doing a git commit.
- To prevent typing `yarn test` each time, we can use `yarn test --watch`
- Normally the following steps would take mere seconds! It's a micro cycle!

## Before we begin...
Before I even start writing anything I want to know if my environment is set up correctly by writing a very silly test and run it. If there is anything wrong I will get a warning or error.

We start by running `yarn test`. It will start running yarn but warn us that there are no test files
found. So let's create the first test file in the `test` directory.

In `test/calculator.spec.js` add the following code:

```js
import { expect } from "chai";

describe("Calculator", () => {
  it("runs the test and shows the result", () => {
    expect(true).to.eql(false)
  });
});
```

RED:
Of course I expect this to fail, but I make sure it fails for the right reason. Namely an `AssertionError`. It could be that I've forgotten to add chai as a library or forgotten to `import` it at the top.
Anything that can break the test, but has nothing to do with the functionality I want to work on. I want to make sure it works as expected.

GREEN:
After that I can make the test pass by changing it to `expect(true).to.eql(true)`. If it isn't passing then I need to find out what is wrong and correct it.

At this point in time I don't really care about the naming of my specific test, but I do want it to describe what the test and the desired outcome would be.

## The first test
What is the simplest thing that we can think of that would make a test fail? Keep in mind that
compilation failures are test failures too. It's very tempting to dive into writing an elaborate test here that handles many cases.

Let's take a step back for a moment and think about what we want to achieve.
We want to write some Javascript code that can handle doing simple arithmetics like addition, subtraction, multiplication and division. We don't know yet if it's going to be a set of functions, a library or even an object.

RED:

What would happen if we write the following test and run that with `yarn test`?

```js
it("calls the add function", () => {
  add();
});
```

It would fail, because we are trying to call a method that doesn't exist yet. So let's fix that!

GREEN:
We expect there is a function in a different file. Let's import that function by adding the
following line.

```js
import { add } from "../src/calculator";
```

If we run `yarn test` now it will show a different error. It expects a file, so let's create an
empty file `src/calculator.js` and run the test again. Now it will complain that we are missing a
function. So let's create it.

```js
export function add() {}
```

In `src/calculator.js` we add the following code. It does nothing more than just defining the
function, because that is all that is needed to make the test pass.

```js
export function add() {
}
```


Next:
- Adding two numbers, expect result
- adding two different numbers
- Can we think of other weird cases, decimals?

Exercise:
- Subtraction
- Multiplication
- Division
