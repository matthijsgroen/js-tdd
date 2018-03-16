# Episode 5; Lazy evaluation

In the [previous episode][episode4] we have build a Calculator object. At the end of the episode we
concluded that the regression test does not give the correct mathematical answer, because we execute
the operation right away and remember the result. At the end of this episode we will not have fixed
the correctness of the answer, but we will work towards that. In this episode we will build
something that will enable us to delay the execution until the very end. This is called lazy
evaluation.

This episode also contains some links to external pages with documentation or explanations. Please
take a moment to study them. You will benefit from that later.

## Goal
The goal of our next piece of functionality is that we delay calculating the result. Only when the
result is asked we will evaluate the operations. But we do want to chain the operations that are
called. Let's clarify this with an example.

```js
calculator
  .add(2)
  .times(5)
  .minus(2)
  .square()

calculator.result
```

The first line of code will not actually calculate anything. Just keep track of what operations we
want to execute.
The second line actually gets the result. This is the moment we will execute the operations. The
user can then show the result.

So here is a list of things we need to do:
* Keep track of a list of operations with the parameters passed, if there are parameters present.
* When result is asked; loop over the operations and execute, return the final result

## Experimentation
There are multiple ways to achieve this technically, so let's experiment and try them out with some
examples. In these examples we will focus on the addition. We encourage you to work out the examples
for the other operations as well to see the effects on the code and learn from that.

On the outside there is no observable change in behaviour, so we can let our test set guide us
during our experimentations, by keeping them running. In that way we have a warning when the
calculator is not working as expected.

In these examples we are going to keep an array of operations we give the calculator.

### Traditional for-loop
In this example we will use the traditional for-loop to go over the commands to get the results.
Below is a code snippet that demonstrates the implementation for the add operation.

```js
export class Calculator {
  constructor() {
    this._commands = []
  }

  get result() {
    var res = 0
    for (let i = 0; i < this._commands.length; i++) {
      let command = this._commands[i]
      if (command.command === "add") {
        res = add(res, command.parameter)
      }
    }
    return res
  }

  add(number) {
    this._commands.push( { command: "add", parameter: number } )
    return this
  }
}
```

When you run the tests they are still passing. This is because on the outside there is no observable
change on the outside. This also means that when we change the implementation back to calculating it
right away we won't have a warning.

We also see that the `result` function is getting rather long. And we haven't even added the other
operations. That would grow the if-else statements (or switch, but that is basically the same thing).
Having a long method is a [code smell][codesmell]. Code smells increase over time. They seem
managable at first, but slowly become more painful to work with. A way to deal with [long
methods][longmethod] is to extract it into multiple methods. Let's do this:

```js
export class Calculator {
  constructor() {
    this._commands = []
  }

  get result() {
    var res = 0
    for (let i = 0; i < this._commands.length; i++) {
      res = this.execute(res, this._commands[i].command, this._commands[i].parameter)
    }
    return res
  }

  execute(previousResult, command, parameter) {
    if (command === "add") {
      return add(previousResult, parameter)
    }
  }

  add(number) {
    this._commands.push( { command: "add", parameter: number } )
    return this
  }
}
```

The problem with the growing if-else statements (or switch-cases) will still be there. We have just moved it.
So let's keep experimenting.

### More functional loop
Another way would be to replace the traditional for-loop with a more functional approach, using the
forEach method.

```js
get result() {
  var res = 0
  this._commands.forEach((command) =>
    res = this.execute(res, command.command, command.parameter)
  );
  return res
}
```

It looks cleaner than the previous example, but we have the same issues as before in the `execute`
method. A `forEach` is a nice way if you want to do something with each of the items in a list or
array, without expecting a result back. Just to call a method to do something. So keep that in mind.

### Reduce
The array object has a lot of nice methods by default. [Reduce][reduce] is one of those methods.
It's a way to accumulate all the values in an array. And this is similar to what we want to do. So
consider the following code:

```js
get result() {
  return this._commands.reduce((result, command) =>
    this.execute(result, command.command, command.parameter)
  , 0);
}
```

The `execute` function again is the same as with the others. I like the `reduce` because it reduces
the `result` method to a one-liner. Ok, technically it's more than one line because we format it in
a way that it's a bit cleaner to read. But there is no need to keep an extra variable.

Always check in the Javascript documentation if there is a function that does what you want. You can
still build the functionality with tests the traditional way and refactor it to a one-liner later.
This way you also make sure you have covered all the cases. For example, what would happen if we change the `0` to
`1`? It might sound trivial, but it would have a huge impact on our functionality!

### Exercise
Play with your `Calculator` class and experiment with each implementation. Try to get it working for
each operation. Ask yourself the question: "What would it take to implement another operation, e.g.
exponentiation? What needs to change in that situation?

Can you make a solution using recursion?

### Understanding the domain
Let's say we have implemented all the existing operations using the `reduce` method. Below is the
full version.

```js
import { add, subtract, multiply, square } from "./operations";

export class Calculator {
  constructor() {
    this._commands = []
  }

  get result() {
    return this._commands.reduce((result, command) =>
      this.execute(result, command.command, command.parameter)
    , 0);
  }

  execute(previousResult, command, parameter) {
    switch (command) {
      case "add":
        return add(previousResult, parameter);
        break;
      case "subtract":
        return subtract(previousResult, parameter);
        break;
      case "multiply":
        return multiply(previousResult, parameter);
        break;
      case "square":
        return square(previousResult);
        break;
      default:
        new Error("Unsupported operation");
        break;
    }
  }

  add(number) {
    this._commands.push( { command: "add", parameter: number } )
    return this
  }

  subtract(number) {
    this._commands.push( { command: "subtract", parameter: number } )
    return this
  }

  multiply(number) {
    this._commands.push( { command: "multiply", parameter: number } )
    return this
  }

  square() {
    this._commands.push( { command: "square" } )
    return this
  }
}
```

We have not touched the tests and they should still be passing. We have added a `default` to the
switch case to get an error whenever there is an unssupported operation passed. This is not tested.

### Exercise
With help of [this site][refactoring] which code smells can you spot? Why would it be a code smell? Which
refactoring techniques would you use?

### Code smells
Let's go over the code above and sum up some code smells.

* Switch-case
* Long method
* Magic numbers / strings

> TODO: Work out the code smells.

### Lambdas to the rescue!
In one of the previous episodes we have talked about lambdas and used them as our operations
functions. But there is another way we can use them that will simplify our code tremendously!

```js
// Pseudo-code

this._commands = []
this._commands.push( () => this._calculator.add(4) )
```

We push the lambda `() => this._calculator.add(4)` to the `this._commands` array / stack. By
wrapping the actual code we want to execute in a lambda we delay the execution of that code. Until
the point we actually call the lambda when we want to get the result. Isn't that a simple and
elegant solution? With a bit of lambda magic we have eleminated the need for a switch case.

But now we need to implement it for the entire calculator. Before we do that we are going to take a
step back.

## How to test lazy evaluation?
We have done a lot of experimentation and learned a lot! From Javascript's traditional iterative
style to a more modern functional style, and we have learned what code smells are and the power of
lambdas.

But let's take a step back for the moment. We have different ways to implement lazy evaluation, but no
way to test it. This is a signal that should be taken seriously. Normally we don't refactor or write
new functionality unless there is a reason. If performance is a reason, then we should have something that shows that it is
the case in the form of a performance test. This also counts for the moment of evaluation. But we don't have something like that.
Or we refactor our code because a new requirement came in and our current code doesn't support it
yet. Normally you would add the new requirements using TDD and drive out the design from there,
using The 4 Rules of Simple Design as our guide.

## Approach
Normally with TDD you would let the code determine your design and make new classes and methods when
it is required. However in this case it's a bit difficult, because lazy evaluation is quite hard to
test from a functional point of view. That's because it's a technical requirement.
The only thing we can do is evaluate *when* a certain class or method was called. This is a technical approach and not a functional approach. Lazy evaluation is a
technical feature, not necessarily a domain feature. Why would a user care when the result was
calculated? As long as he/she gets a result in the end, right?

It's a good idea not to implement nice technical features because we might need it, or it's nice to
have. This also counts for the use of libraries. (One of the reasons we kept the use of libraries in
these episodes to a minimum) Always ask yourself the questions, do we really need it? How does the
customer benefit from this feature?

Unless...

## Undo feature
Our customer came to us and asked for the undo feature. When he added a number to his
formula he wants to be able to undo that, without having to start all over. He is a very busy person
and doesn't want to waste time. So let's help him.

Let's go back to our original implementation at the end of episode 4, before our experimentations.

What would it take to implement the undo feature? What needs to change?

What is an undo feature really? Is it a mathematical operation? Let's consider that for a moment and
go back to our childhood algebra and math lessons. Have you ever heard your math teacher say "Now we
add 8, do that times 3, minus 1 and now we undo that last one". I haven't and it sounds a bit weird.
That is because undo is not a mathematical operation! Which makes undo sightly different from add, subtract, etc.

**Tip**
Whenever you are not sure about something talk about it with other people and do some research.
This way you develop common understanding about domain you are working in. A great way to do that is
also to stand around a white board and brainstorm. This also works great for working out a technical
design!

Discussing the undo with other people, it became clear that it is more a meta-operation, or a command you can do.
Add, subtract, multiply and square are mathematical operations. We want to build something that keeps track of the commands that are given
before we actually execute it. Knowing how to get the result is already present in the `Calculator`
class. So let's build something separate from that. Note that we can always refactor and merge if
necessary.

Which still leaves one question that has been present in this episode. How do we test the moment of execution?
The answer to that is that we can stub the calculator and assert the calls that are done to the
calculator object. This includes the moment of the call.

## CommandStack class

```js
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

before(() => {
  chai.use(sinonChai)
});

const spy = sinon.spy(calculator, 'add')

stack.add(4)
expect(spy).not.to.be.called

expect(stack.execute()).to.eql(4)
expect(spy).to.be.calledWith(4)
```






> When in doubt about design or domain have a white board session with the team.

> There is a way to observe the behaviour and that is to implement undo / redo. Or making a builder
> and observe with stubs.

> Normally you let TDD guide your design using the 4r rules of design and the solid principles.

> Undo is a meta-operations or commands. They are not mathematical operations, but commands
> we want to do on our calculator. This makes them different from add, subtract. Have you ever heard
> your math teacher say; "Now we add 8, do that times 3, and now we undo that last one". Sounds a
> bit weird.

The ordering of this episode doesn't feel right. Maybe first go into the undo and redo feature and
as a result the lazy evaluation.

----------------------------------
> Observable results on the outside should be the same. Only an internal change.


[episode4]: https://github.com/matthijsgroen/js-tdd/tree/master/episode4
[codesmell]: https://sourcemaking.com/refactoring/smells
[longmethod]: https://sourcemaking.com/refactoring/smells/long-method
[reduce]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
[refactoring]: https://sourcemaking.com/refactoring
