# Episode 3; Taking a step back
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

What is [refactoring][refactoring]?
The process of refactoring is to structure software by applying a series of refactorings without changing its observable behaviour.
The last part is important, without changing its observable behaviour. Behaviour can be observed
with tests and this way we can make sure it does not change while we are structuring our code.

Now we know the code works, we could refactor the `functions` into a version with [lambdas][lambdas],
this is the "Modern way" to define functions. They have a slightly different way how the scope works,
but we get to that later 😅

For our `add` function we will refactor this:
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

## Exercise
Refactor the other functions in the same lambda style. Make sure you run the test while doing so.

## Macro cycle of TDD
In the previous episodes we strictly used the red-green-refactor cycle of TDD.
Here we are refactoring our code even though we haven't written a failing test and made that pass first.

We are taking a step back from the nitty-gritty details for a moment and looking at our code as a
whole to see if there are opportunities to refactor. Ways to make our code look cleaner and more
readable. The lambda is a good example of that. We changed our code into a nice one liner that can
be read as: "`export` the thing named `add` that is a `const`ant that expects the parameters `(left, right)` and returns
`left + right`". With the `const` we mean that we cannot assign a different value or function to the
thing that is named `add`.

Of course we always make sure that our tests keep passing when refactoring. The recommended way to do
this is to make tiny changes to our implementation while running the tests after each change. As
soon as we do something wrong it will give us a signal and we can go back to the last change before
it started breaking. Commiting our code regularly helps a great deal! Just reset and try again.

Try avoiding refactoring the test code at the same time as the production code (implementation). My
experience has taught me that once it starts breaking it's very hard to tell if it's the test that
is broken or the implementation.

## Refactoring the square method
So, how did the `square` method end up?

There are a few possible ways for it:

```js
Math.pow(number, 2)
number * number
times(number, number)
```

Let's go over each one.

The `Math.pow(number, 2)` is technically what the square of the number is. We are using the
`Math.pow` function that Javascript provides us. Which works great, but might be a bit overkill. A
square is basically `number * number`, so that seems like a good idea.

The `number * number` looks very similar to the implementation of the `times` function. In the blog
about the [4 Rules of Simple Design][4rosd] there is a rule about duplication. It states that an
application shouldn't contain any **knowledge** duplication. The implementation of the `square`
method is a knowledge duplication of the implementation of the `times` method. So let's refactor
that by calling the `times` method in our `square` method.

```js
export const square = (number) => times(number, number)
```

[episode2]: https://github.com/matthijsgroen/js-tdd/tree/master/episode2
[lambdas]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
[4rosd]: https://www.theguild.nl/4-rules-of-simple-design/
[refactoring]: https://refactoring.com/
