import { expect } from "chai";

let perfCounter; // how many times is the 'addFunction' defined??

const makeAddFunction = () => {
  perfCounter += 1;

  return function(a) {
    this.result += a;
    return this;
  }
}


// Part 1: Different suppliers of the 'makeCalculator'

const reusableCalculator = () => {
  // Our method creates a 'create function'
  const calculator = {
    result: 0,
    add: makeAddFunction(),
    times: function(a) {
      this.result = this.result * a;
      return this;
    }
  }

  return () => calculator;
};

const makeStaticObjectCalculator = () => (
  // Our method creates a 'create function'
  () => ({
    result: 0,
    add: makeAddFunction(),
    times: function(a) {
      this.result = this.result * a;
      return this;
    }
  })
);

const makeConstructorObjectCalculator = () => {

  function Calculator() {
    this.result = 0;
    this.add = makeAddFunction();
    this.times = function(a) {
      this.result = this.result * a;
      return this;
    };
  }

  return () => new Calculator();
};

const makePrototypeObjectCalculator = () => {

  function Calculator() {
    this.result = 0;
  }
  Calculator.prototype.add = makeAddFunction();
  Calculator.prototype.times = function(a) {
    this.result = this.result * a;
    return this;
  };

  return () => new Calculator();
};


const makeES6ClassCalculator = () => {

  class Calculator {
    constructor() {
      this.result = 0;
    }

    add(a) {
      throw new Error("Whaaat");
    }

    times(a) {
      this.result = this.result * a;
      return this;
    }
  }
  console.log(Calculator.prototype.add)
  // Will this fix it??
  //Calculator.prototype.add = makeAddFunction();

  return () => new Calculator();
};

// Part 2: Pick an 'makeCalculator' implementation

//const makeCalculator = reusableCalculator()
//const makeCalculator = makeStaticObjectCalculator();
//const makeCalculator = makeConstructorObjectCalculator();
//const makeCalculator = makePrototypeObjectCalculator()
//const makeCalculator = makeES6ClassCalculator()


// Part 3: -- The tests!

describe("Calculator", () => {

  beforeEach(() => {
    perfCounter = 0;
  });

  describe("calculation abilities", () => {
    let calculator;

    beforeEach(() => {
      calculator = makeCalculator()
    });

    it("has a default result of 0", () => {
      expect(calculator.result).to.eql(0);
    });

    it("can add numbers", () => {
      expect(calculator.result).to.eql(0);
      calculator.add(10)
      expect(calculator.result).to.eql(10);
    });

    it("can chain commands", () => {
      expect(calculator.result).to.eql(0);
      calculator.times(2).add(10).times(2)
      expect(calculator.result).to.eql(20);
    });
  });

  describe("performance benchmark", () => {
    const AMOUNT_CALCULATORS = 10000;

    context(`When making ${AMOUNT_CALCULATORS} calculators`, () => {
      it("should not define an 'add' function every time again", () => {
        expect(perfCounter).to.eql(0);
        for(let i = 0; i < AMOUNT_CALCULATORS; i++) {
          let calculator = makeCalculator()
        };
        expect(perfCounter).to.eql(0);
      });
    });
  });
});

