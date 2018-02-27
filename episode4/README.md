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

We are going to be using the same for our `add` method. So let's add a test that does this.

RED:

```js
it("can chain adding multiple numbers", () => {
  calculator.add(1).add(3).add(5)
  expect(calculator.result()).to.eql(9)
});
```

This will fail with a `TypeError` and there is a simple fix for this by returning `this` in the add
method. And hopefully this will also explain the cryptic explanation before. "the modifier methods
return the host object". Within an object `this` in Javascript refers to the host object. Another
way to look at it is that it refers to itself.

GREEN:

```js
add(number) {
  this.res = add(this.res, number);
  return this;
}
```

REFACTOR:

The "can add multiple numbers" test is now a duplicate of the chaining test, the chaining test just
does a little bit more. So let's remove the following test.

```js
it("can add multiple numbers", () => {
  calculator.add(2)
  calculator.add(6)
  expect(calculator.result()).to.eql(8)
});
```

Another refactor has to do with naming, which I came to realise later. But better late then never,
so here it goes. The internal variable that holds the result is called `res` now. This name is not
complete and might be confusing for someone who reads the code for the first time (or your futureself for that matter).
What is "res"? Is it short for something? Resolution? Resistencia International Airport? Renewable Energy Sources?

No! It's result! So let's call it `result`. Try to rename it to result and see what happens when you
run the tests?

Javascript has a conflict in naming between the method `result()` and the variable. A way around
this has became a convention to write internally used variables and methods with the underscore
prefix. So our result will become `_result`, so let's refactor to that.

## Getting the result
There are multiple ways of getting the result, so far we have defined it as a function. Another
option is to use a plain property and exposing it, like so:

```js
constructor() {
  this.result = 0;
}

// No result() method
```

Try that out in your code to see what happens. What can we not do with this property outside of the
calculator?

What if we do this in one of our tests:

```js
calculator.result = 4;
```

In our example we have used the function to indicate the internal attribute `_result` to be private.

```js
result() {
  return this._result;
}
```

Javascript doesn't have the concept of private, so we need to develop the discipline to handle it as such ourselves.
Technically we can still manipulate the `_result` however. But don't... just don't... you'll unleash
the wrath of Chtulu.

So, let's build a (temporary) test to demonstrate the differences. Tests are not only great ways to
verify your code, but also to experiment. Just make sure start without any other changes in your git
repository. This will make it very easy to go back.

In `test/calculator.spec.js` add the following code:

```js
it.only("can access the result", () => {
  calculator.add(2)

  expect(calculator._result).to.eql(2)
  expect(calculator.result()).to.eql(2)
  // expect(calculator.result).to.eql(2)
});
```

There are three things to note.

The first one is that the test starts with `it.only`. This means that
it will be the only test that runs. The second one is that last assertion is commented out. Try and
see what happens when you remove the comment.

Lastly, the first assertion shows that the `_result` attribute in the calculator object is exposed
and theoretically can be used outside the calculator object. But just because you can doesn't mean
that you should.

So what happens when we change the implementation of the result function to this:

```js
get result() {
  return this._result;
}
```

Which assertions do you have to comment / uncomment to still keep the test passing?

Since ES5 there is a way to define getters and setters. This will make the name of the method available
to be accessed as an attribute. So that the above example of the `result` getter can be accessed as:

```js
calculator.result
```

The use of getters and setters on *properties* of a class is common.

The lesson here is that there are multiple ways and each has it's advantages and drawbacks.
Experiment with your code. Even if you have decided to go one way initially, it doesn't mean that
you cannot change your mind later!

With tests and making tiny changes it should be relatively easy to go in a different direction.

## Exercise: Refactor to getter
Now refactor our code and test to use the getter. We would take tiny steps, changing it one test at
the time and see the first one pass. Then move on to the next. Try to avoid making a big change.

Hint: Revert your code to the point before the experimentation and make sure all tests are running.

## Exercise: Implement other operations
Add the other operations to the calculator class using TDD. Make sure you can chain the methods.

- Subtraction (minus)
- Multiplication (times)
- Square (square)

What if you implement one operation using a getter from the beginning? And what if you don't? Does
it have a large impact? Experiment with that.

When you are finished, you can add the following regression test. Is this passing? If not, find out
why and what test you have missed in your implementation of the operations.

```js
describe("Regression test", () => {
	it("can combine multiple chained commands", () => {
		calculator
			.add(7)
			.subtract(2)
			.square()
			.multiply(4)

		expect(calculator.result).to.eql(100)
	});
});
```

## Final words before we move on to the next episode
YAY! You have made it through 4 episodes (okay, technically 5, we started counting at 0 like true programmers ;) )
and you have a foundation in with ES6 classes and some JS basics. You have also learned the stepping
stones of TDD.

In the previous episodes we have spent a lot of time on the cycle of TDD and how to break it up in tiny pieces.
From now on we will move even faster and skip a few steps in the episode, because we trust that
you have a feeling about how to do this from now on.

If you want to know all about the ES6 features and syntax, you can look go [here][es6-features].

Also, if you want a more elaborate course on TDD you can visit [the online training by J.B. Rainsberger][tdd-training].

[es6-features]: http://es6-features.org
[es6-classes]: http://es6-features.org/#ClassDefinition
[es-getters]: http://es6-features.org/#GetterSetter
[4rosd]: https://www.theguild.nl/4-rules-of-simple-design/
[tdd-training]: https://online-training.jbrains.ca
