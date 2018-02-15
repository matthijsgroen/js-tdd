# Episode 1.5: Building a calculator using TDD
**I cut into line 73 of episode 1**

Please read the post that [explains the theory of TDD here][tdd-explained]

## What are we going to build?
Our goal is to build a calculator that can do basic arithmetics, like addition, subtraction,
multiplication and division. So we are going to build functions that implements those operations.

Here are some tips when building the operations:
- After each step (red, green, refactor) we are doing a git commit.
- To prevent typing `yarn test` each time, we can use `yarn test --watch`
- Normally the following steps would take mere seconds! It's a micro cycle! For now, please be
patient.

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

**RED**
Of course I expect this to fail, but I make sure it fails for the right reason. Namely an `AssertionError`. It could be that I've forgotten to add chai as a library or forgotten to `import` it at the top.
Anything that can break the test, but has nothing to do with the functionality I want to work on. I want to make sure it works as expected.

**GREEN**
After that I can make the test pass by changing it to `expect(true).to.eql(true)`. If it isn't passing then I need to find out what is wrong and correct it.

At this point in time I don't really care about the naming of my specific test, but I do want it to describe what the test and the desired outcome would be.

## The first test
What is the simplest thing that we can think of that would make a test fail? Keep in mind that
compilation failures are test failures too. It's very tempting to dive into writing an elaborate test here that handles many cases.

Let's take a step back for a moment and think about what we want to achieve.
We want to write some Javascript code that can handle doing simple arithmetics like addition, subtraction, multiplication and division. We don't know yet if it's going to be a set of functions, a library or even an object.

**RED**

What would happen if we write the following test and run that with `yarn test`?

```js
it("calls the add function", () => {
  add();
});
```

It would fail, because we are trying to call a method that doesn't exist yet. So let's fix that!

**GREEN**
We expect there is a function in a different file. Let's import that function by adding the
following line.

```js
import { add } from "../src/calculator";
```

If we run `yarn test` now it will show a different error. It expects a file, so let's create an
empty file `src/calculator.js` and run the test again. Now it will complain that we are missing a
function. So let's create it.

In `src/calculator.js` we add the following code. It does nothing more than just defining the
function, because that is all that is needed to make the test pass.

```js
export function add() {}
```

**REFACTOR**
Now that all the tests are passing we can look at refactor opportunities. In the previous paragraph
we have set up a test to make sure that our environment is running correctly. Now that we have a
second test we also prove that our environment is set up correctly. That means that we now have two
tests that have the same function (and a bit more). So we can remove the first one.

Remove the following test:

```js
it("runs the test and shows the result", () => {
  expect(true).to.eql(true)
});
```

## Adding two numbers

**RED**
The whole point of the `add` function is to add two numbers. This means we need to pass the
parameters and expect an result in return. So let's write a test for that. But keep in mind that we
are in the RED part of the cycle of TDD, so we cannot refactor the original test. So instead we
write a new one.

```js
it("adds 1 and 2 together", () => {
  expect(add(1, 2)).to.eql(3)
});
```

**GREEN**
Now what is the simplest thing we can do to make this test pass? The absolute simplest thing?
This means we need to look at what we expect. We expect a result of the number 3, but we currently
don't return a result at all. So consider this:

```js
export function add() {
  return 3;
}
```

Yay! The tests are passing! Let's ship it!

"But that's cheating!", I can hear you say. Well, technically no, because our tests are passing. Our
tests are the **leading indicator** that our application is doing what it is supposed to do. "But it
isn't doing anything at all!", you might say. That is correct! But that is not the fault of our
application. It's because we are missing a test. Doing Test Driven Development means that we use our
tests to drive out the desired behaviour. Step by step, tiny bits at the time, making sure we cover
each case. This requires a lot of discipline and patience!

There is something else here. We can make the tests green, because Javascript accepts that we pass
parameters even though the function doesn't define them. Other languages wouldn't accept this and
therefore you would write a slightly different test. A lesson here is that we also need to take into
account the quirks of the programming language we are using to make sure we cover as many possibilities as we can.

**REFACTOR**
Again we have a bit of duplication in functionality. The first test says that we call the add
function. The second test also calls the add function. So we can remove the first one.

When considering refactors we also take into account our test code. We treat the test code the same
as we would treat our production code.

Remove the following test:
```js
it("calls the add function", () => {
  add();
});
```

Technically the name of the other test is not correct, it doesn't add 1 and 3 together. The
functionality is that we have a result of 3. But for now we are going to leave that.

**RED**
What test can we now write that forces the implementation of the functionality in a direction that
it actually adds the two numbers? What failing test can we write for that?

The point is to write tests that take a tiny step in the direction of the expected functionality.

What about having a similar test as the one we have but expecting a different result.

```js
it("adds 2 and 3 together", () => {
  expect(add(2, 3)).to.eql(5)
});
```

**GREEN**
We can no longer use the same trick to make the test pass. If we `return 5` now the other one will
fail. This means we need to use the parameters passed.

```js
export function add(a, b) {
  return a + b;
}
```

**REFACTOR**
There are a few things we can refactor. One of them is the naming of the parameters. In the previous
step we have named them `a` and `b`. This is very easy and short to type. It works, right?
Names have a meaning, and `a` and `b` as names doesn't mean much. Are we now adding alphabetical
letters together?

In [arithmetics][arithmetics] the order of the terms on the operand "+" is important. Technically "1 + 2" is not the same as "2 +
1", although they would give the same result. With other operands it's more important like "-". It's important which one is on the left and which one is on the right.

So let's rename the parameters to "left" and "right".

```js
export function add(left, right) {
  return left + right;
}
```

Another refactor we can do concerns the tests. They are very similar and there are multiple
directions we can go. One thing we can do is to extract a method to remove the duplication of
`expect(...).to.eql(...)`, but then we need to pass 3 parameters and it is confusing to see what is
what. The line `expect(...).to.eql(...)` actually reads quite nicely when saying it out loud.

Both tests add two numbers together and this gives use a clue. Why not name one test "adds two
numbers" but with different numbers? We combine the **same** functionality into one test.

```js
it("adds two numbers", () => {
  expect(add(1, 2)).to.eql(3)
  expect(add(2, 3)).to.eql(5)
});
```

When doing very strict refactoring we do this in two steps. Just like writing tests we do refactors
in very tiny steps making sure the tests pass. First, I copied the expectation in the second test to
the first and made sure that passed. What if we had forgotten to add the braces `{}` in the `it`?
Would it then still have passed? Remove them to see what happens. Only after that I removed the
other test. Then I changed the name of the test to better reflect when it does, because it doesn't
add 2 and 3 together anymore.

## Last steps
It seems that we are very close to the implementation of adding two numbers. So what else can we do
to make sure this works as expected and keeps working as expected in the future?

Do we expect our calculator to also work with decimal numbers, and not just integers? We called them
numbers now in our test. I would say "no" to that question for now, because handling decimals is
trickier than it is at first glance. Just try out the following:

```js
expect(add(2.1, 3.2)).to.eql(5.3)
```

Changes are that it fails, because we are dealing with floating point numbers. But it does trigger
me to consider the name of the test. It mentions **numbers**, but what we really mean are
**integers**. So let's rename it. (Only when the tests are passing)

Which leads me to another thing. It's not really a calculator. It see a calculator as a machine with
buttons that can do operations. The thing we are writing right now are the basic operations of
arithmetics. So let's rename the `describe` and even the files.

We want our code to reflect what it is and does as closely as we can!

One case I can think of is that "2 + 3" has the same result as "3 + 2", so let's make sure that
is the case by adding an expectation for that. It might not be very important for addition, but with
subtraction it is important. We do not accidently mix the parameters!

Also we can add a few expections on negative numbers. This builds a bit of a regression for the
future. Can you think of a reason why we would want to do that?

In case we start making bigger refactors we still want to make sure that all the
functionality works and we don't accidently make the result absolute. Or maybe 5 months from now a new requirement
comes in that all additions should return absolute results. We have already build functionality upon
the `add` method and expect it to work with negative numbers. Is it a good idea to just change it?
Maybe, maybe not. But at least we have a signal that we need to consider that!

```js
it("adds two integers", () => {
  expect(add(1, 2)).to.eql(3)
  expect(add(2, 3)).to.eql(5)
  expect(add(3, 2)).to.eql(5)
  expect(add(-2, 3)).to.eql(1)
  expect(add(2, -3)).to.eql(-1)
  expect(add(-5, -3)).to.eql(-8)
});
```

## Conclusion
This is quite an episode for something that seems very straight forward, but there are many
considerations here. For me it takes only a few minutes to do all the steps above with all the
considerations. It's like learning a skill, so it takes time and patience to learn it. Once
proficient it will take a lot less time. The key here is to practise.

Some things in this episode might sound very silly now, this is also because the use case is very
simply for now. This means you can spend your attention learning the steps and what to think about.
These steps and considerations become more important once it gets more complex!

So below are a few exercises you can do yourself. Try to take tiny steps seeing your tests fail and
pass each time. What helps is taking into account [the 4 rules of simple design][4rulesofsimpledesign].

## Exercises
Implement the following basic arithmetic functions strictly using the tiny steps as described above.
What special cases can you think of?

- Subtraction (minus)
- Multiplication (times)

You can find an implementation of the methods in [this repository][repository], where you can also
check if you have covered all the cases.

[tdd-explained]: https://github.com/matthijsgroen/js-tdd/tree/master/extras/tdd-explained.md
[arithmetic]: https://en.wikipedia.org/wiki/Arithmetic
[4rulesofsimpledesign]: https://www.theguild.nl/4-rules-of-simple-design/
[repository]: https://github.com/hacklor/calculator-tdd
