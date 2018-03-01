# Episode 5; Lazy evaluation

In the [previous episode][episode4] we have build a Calculator object. At the end of the episode we
concluded that the regression test does not give the correct mathematical answer, because we execute
the operation right away and remember the result. At the end of this episode we will not have fixed
the correctness of the answer, but we will work towards that. In this episode we will build
something that will enable us to delay the execution until the very end. This is called lazy
evaluation.

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
