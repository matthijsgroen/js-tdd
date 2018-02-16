# Building a Calculator, Episode 5

So far, we have explorer the following in the sake of building our calculator:

- Setting up tests and stand-alone calculator functions
- Ways of creating an object for our calculator object
- We make a calculator object with a `result` and operations that can be chained.
- We did some 'fake' performance testing to explore different approaches and how it could affect resource consumption
- We are able to manipulate objects after creation by adding and removing items
- We are able to call functions with different strategies.

So what is our next step in this journey?

I would like to introduce some concepts into our 'calculator' world.

We should have the file `calculator-fns` that contains a set of Javascript functions that do a pure calculation. (pure in: They don't have an own state: all input is directly affecting the output).

This is different how our Calculator 'Object' is working. We feed it with an instruction, but the output is always the Calculator 'Object'. This allows chaining for us. Reading the `.result` property will yield different results depending on the instructions we gave the calculator.

```javascript
import { add } from "calculator-fns";

class Calculator {
  constructor() {
    this.result = 0;
  }
  
  // Our operation
  add(number) {
    // Using the "pure" function, assigning output as our result
    this.result = add(this.result, number);
    // returning 'this' to allow chaining
    return this;
  }
}

const myCalculator = new Calculator();
myCalculator.add(10).add(5).result // result == 15
```

Can you add all known calculator functions into our calculator object?

Can you spot any duplication?

With all knowledge from previous episodes, could you refactor the code so that the Calculator Class can get a set of operations without duplication?
