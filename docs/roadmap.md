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

4. See result on display -> Interface

  - Interfaces / Ducktyping, separation of concerns, single responsibility

5. Customize commands. (define chains, execute chains, undo should undo last executed chain)

  - Scaling up architecture (instead of commands in a chain, we go from chains in a chain as well) 

6. Add battery. Each execute drains the battery.

  - This element turns it into a game, because a goal and lose scenario is added. But it hardly changes the core mechanics we established earlier

7. Create single level

  - Wrap up. Also thinking about: How to seperate code from content? (level contents, multiple levels)

