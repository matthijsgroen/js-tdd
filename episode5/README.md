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

## Iteration
In this example we will use the 'old-school' for-loop to go over the commands to get the results.
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

The problem with the growing if-else statements will still be there. We have just moved it.
So let's keep experimenting.

## More functional loop
Another way would be to replace the 'old-school' for-loop with a more functional approach, using the
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

## Reduce
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
still build the functionality with tests and refactor it to a one-liner later. This way you also
make sure you have covered all the cases. For example, what would happen if we change the `0` to
`1`? It might sound trivial, but it would have a huge impact on our functionality!




> There is a way to observe the behaviour and that is to implement undo / redo. Or making a builder
> and observe with stubs.

> Normally you let TDD guide your design using the 4r rules of design and the solid principles.

> Undo and redo are meta-operations or commands. They are not mathematical operations, but commands
> we want to do on our calculator. This makes them different from add, subtract. Have you ever heard
> your math teacher say; "Now we add 8, do that times 3, and now we undo that last one". Sounds a
> bit weird.








----------------------------------
> Observable results on the outside should be the same. Only an internal change.


```js
// Constructor
this._commands = []
this._lazy_result = 0

// get result()
this._commands.forEach(command => command() )

// add(number)
this._commands.push( () => add(this._lazy_result, number) )
```

This doesn't work because when the function is executed it doesn't know what this._lazy_result is.
What we really want here is the result of the previous command. So how can we get that?

So what about a for loop instead?

```js
// get result()
for (let i=0; i < this._commands.length; i++) {
  this._lazy_result = this._commands[i]();
}
return this._lazy_result;

// add(number)
this._commands.push( () => add(this._lazy_result, number) )
```

This also doesn't work, because it still doesn't know what this._lazy_result is. Just add a
console.log to the operation.

```js
export const add = (left, right) => { console.log(left, right); left + right }
```

What error message do you see and why?

[episode4]: https://github.com/matthijsgroen/js-tdd/tree/master/episode4
[codesmell]: https://sourcemaking.com/refactoring/smells
[longmethod]: https://sourcemaking.com/refactoring/smells/long-method
[reduce]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
