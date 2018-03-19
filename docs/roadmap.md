# Uitschrijven 'design' calculator


Als uiteindelijk doel wil ik graag een spelletje tot uitkomst laten komen, in vergelijking met:

https://play.google.com/store/apps/details?id=com.sm.calculateme


Op die manier zou je dus een aantal componenten hebben:


1. tonen 'battery level'
2. tonen actieve getal
3. tonen doel getal
4. een panel hebben waar knoppen op toegevoegd kunnen worden
5. elke knop is in feite het aftrappen van een command chain op het huidige
   resultaat.

Voorbeeld:

```
Battery: [▓▓▓░░░░]
Display: [      5]
Goal: 125

Buttons:
┌────────────────┐
│ 1. (* 10, + 5) │
│ 2. (+ 10, * 2) │
│ 3. - 5         │
│ 4. Undo        │
└────────────────┘

Your choice: (1 - 4):

```

Elke button is dus in feite een 'command chain' die uitgevoerd wordt.

De code van een level zou dus zoiets kunnen zijn:

```js
let level = new Level();
level.setInitialResult(0);
level.setBatteryPower(3); // amount of 'moves'

let commandChain = new CommandChain() // ?
commandChain.times(10)
commandChain.add(5)
level.addButton(0, commandChain)

// ... other buttons

level.start() // ?

```

## To get there

Stories, backlog

1. Calculation operators (add, multiply, square, subtract)

  - Setup, TDD cycle, refactoring

2. Chain operations and see result

  - Objects, getters, privacy of object data

3. Undo operations

  - Lazy evaluation, spying, stubbing

4. As a user I want to see the result of my formula on the screen
  
  See result on display -> Interface

  - Interfaces / Ducktyping, separation of concerns, single responsibility

5. As user I want to manipulate the result using basic commands/operations

  Customize commands. (use simple commands with single operation, +3, *5, etc)

6. As User I want to get feedback when I reached the set goal.

7. As User I want to receive feedback if I do not reach the set goal within the allowed amount of moves.

  Add battery. Each execute drains the battery.

  - This element turns it into a game, because a goal and lose scenario is added. But it hardly changes the core mechanics we established earlier


8. As a user I want to append a number to the existing result

  - Scaling up architecture (instead of commands in a chain, we go from chains in a chain as well) 

9. Create single level

  - Wrap up. Also thinking about: How to seperate code from content? (level contents, multiple levels)

  > when every goes well, there should not be a lot of code for a nice functional game. This is also the perfect moment to discuss how a developer spends its time between thinking and actually writing code. This is a nice stepping stone to discuss the value of Pair programming.