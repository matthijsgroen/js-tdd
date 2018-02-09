# Building a calculator, Episode 4

Last episode was a bit of experimentation/investigation of several approaches to create an object instance and member functions.

This time, we are going to zoom in on function definitions and using them.

given the following functions:

```javascript
function myFunction1(name) {
  return "Hello " + name;
}

function myFunction2() {
  return "Hello " + this.name;
}

function myFunction3() {
  return "Hello " + this;
}

function myFunction4() {
  return "Hello " + arguments[2];
}

```

1. Can you call each function and produce the output "Hello H-U-M-A-N" for each call? 

Investigate the following resources:

- [function.apply](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
- [function.call](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
- [function.arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/arguments)

> Note: `arguments` is on its way 'out' in JS. But for learning purposes, Its still relevant to know what it does. The fact that is it going away will cause codebases to break. So when fixing these, its good to know what it did in the first place.
>
> The new lambda syntax, does not support `arguments`.

I would also like to do another experiment with objects:

The most mimimal thing you can do to work with an object is `{}`

```javascript
expect({}).to.have.property('foo') // fails
expect({ foo: 'bar' }).to.have.property('foo') // passes

const obj = {
  preDefinedProperty: "hello"
}

// assigning a property that did not exist will result in adding it.
obj.hello = "world;

// We need to use [] If we want to add properties with special characters
obj["my name with spaces"] = "awesome!";

// we can even use the value of a variable or constant to determine the name of a property.
const name = "anotherKey";
obj[name] = "value";

// in the newer JS syntax, you can also use 'splats' to merge in data
// from one object into another:

const obj1 = { a: "b" };
const key = "a";
const obj2 = {
  a: "a",
  ...obj1,
  [key] : "c"
}

```

Experiment with setting keys and values on objects using these 'splats' (...) and `[]` when setting keys. and values. Can you use numbers or even objects as keys aswell?

So now we can 'add' members to an object. Can you also figure out how to `delete` members of an object?

