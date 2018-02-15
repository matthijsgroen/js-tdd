# TDD 101; Beginners Guide to Test-Driven Development

## What is Test-Driven Development?
TDD is a programming discipline whereby programmers drive the design and the implementation of their code by using tests. It all starts with the red-green-refactor cycle,
so I will explain it below.

![The Cycle of TDD][tdd-cycle]

### Red
Create a test and see it fail.

Don't forget the last part, to actually see it fail! You wouldn't be the first (and last) person to forget to run the tests. Or see it fail for a different reason than expected.
The lesson here is; don't assume, make sure!

### Green
Write the minimal amount of code to make the test pass.

The trick here is to write as little code as possible, even when it looks silly and you know it will not be the final implementation. Even if you have to copy-paste some code.
The goal here is to make the test pass, not to refactor your implementation. Especially when starting out with TDD and writing unit tests it's good practice to follow the cycle without skipping steps.

### Refactor
Clean up your code and test.

Is there any duplication in your production code or your test code. This is the time to change that!
In this step all tests should stay green and there shouldn't be any changes in functionality.
Take small baby steps, line by line. Resist the urge to rewrite everything. This way also prevents refactoring test code and production code at the same time.

A good guideline here is to use the [4 Rules of Simple Design](https://www.theguild.nl/4-rules-of-simple-design/).

## The Three Laws of TDD
These three laws describes the cycle in a different way, but in essence mean the same thing.

1. Write no code except to pass a failing test
2. Write only enough of a test to demonstrate a failure
3. Write only enough code to pass the test

## How long does one cycle take?
There are no strict rules here. The goal is to make small steps that don't take very long. Having said that, I've seen cycles of seconds,
but also longer because I had to think about which test to write next. When it takes me a long time to write a test or have to write the implementation
I see that as a sign that there might be a different simpler approach to take.

## Transformation Priority Premise (TPP)
The real challenge in TDD is to decide which test to write next. There is a list of code transformations that can be performed in order to drive an algorithm or piece of functionality further to its final implementation step by step.
The [Transformation Priority Premise](https://8thlight.com/blog/uncle-bob/2013/05/27/TheTransformationPriorityPremise.html) helps with changing the behavior of the code. This is different from refactoring, where the behavior stays the same, but the structure of the code is changed.

----- Explain the list -----

## TDD is a skill
It takes practice! A best way to start is to practise away from your daily work. E.g. by implementing [code katas](http://codekata.pragprog.com/). A code kata is a simple exercise to hone your skills. Keep in mind that it's not about the implementation, but practising.
You can experiment taking different small steps in a different order. What happens to your implementation when you choose a different transformation?

TDD is not about testing, despite its name. It's about the thought process, breaking it up in small chunks and taking every possible paths into account.

## Is TDD only for practice?
No, not at all! The more you get acquianted, the easier it becomes to use your skills in projects.
I find that it helps me break up a larger piece of functionality in smaller chunks to implement them. Often I discover corner cases in the process which I can then take into account.
And interruptions become easier to handle, because I only have to look back at the previous change and go from there. I usually take breaks when I have one red test. When I get back I only have to run the tests to know where I ended.
When deciding which step next to take I keep make a list of cases so that I don't forget one.

### Sources
http://www.jamesshore.com/Blog/Red-Green-Refactor.html

[tdd-cycle]: https://github.com/hacklor/js-tdd/tree/master/extras/tdd_cycle.jpg
