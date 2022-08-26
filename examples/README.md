# Examples

## 1 - Brian's Brain

Brian's Brain is a cellular automaton devised by Brian Silverman, which is very similar to his Seeds rule.

### 1.1 - Rules

Brian's Brain consists of an infinite two-dimensional grid of cells, but unlike Seeds, each cell may be in one of three states: on, dying, or off. Each cell is considered to have eight neighbors (the Moore neighborhood), as in Seeds and Conway's Game of Life.

In each time step, a cell turns on if it was off but had exactly two neighbors that were on, just like the birth rule for Seeds. All cells that were "on" go into the "dying" state, which is not counted as an "on" cell in the neighbor count, and prevents any cell from being born there. Cells that were in the dying state go into the off state.

## 2 - Conway's Game Of Life

The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves. It is Turing complete and can simulate a universal constructor or any other Turing machine.

### 2.1 - Rules

The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, live or dead (or populated and unpopulated, respectively). Every cell interacts with its eight neighbours (the Moore neighborhood), which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:

1) Any live cell with fewer than two live neighbours dies, as if by underpopulation.

2) Any live cell with two or three live neighbours lives on to the next generation.

3) Any live cell with more than three live neighbours dies, as if by overpopulation.

4) Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

These rules, which compare the behavior of the automaton to real life, can be condensed into the following:

1) Any live cell with two or three live neighbours survives.

2) Any dead cell with three live neighbours becomes a live cell.

3) All other live cells die in the next generation. Similarly, all other dead cells stay dead.

The initial pattern constitutes the seed of the system. The first generation is created by applying the above rules simultaneously to every cell in the seed, live or dead; births and deaths occur simultaneously, and the discrete moment at which this happens is sometimes called a tick. Each generation is a pure function of the preceding one. The rules continue to be applied repeatedly to create further generations.

## 3 - Rule 30

Rule 30 is an elementary cellular automaton introduced by Stephen Wolfram in 1983. Using Wolfram's classification scheme, Rule 30 is a Class III rule, displaying aperiodic, chaotic behaviour.

This rule is of particular interest because it produces complex, seemingly random patterns from simple, well-defined rules. Because of this, Wolfram believes that Rule 30, and cellular automata in general, are the key to understanding how simple rules produce complex structures and behaviour in nature. For instance, a pattern resembling Rule 30 appears on the shell of the widespread cone snail species Conus textile. Rule 30 has also been used as a random number generator in Mathematica, and has also been proposed as a possible stream cipher for use in cryptography.

Rule 30 is so named because 30 is the smallest Wolfram code which describes its rule set (as described below). The mirror image, complement, and mirror complement of Rule 30 have Wolfram codes 86, 135, and 149, respectively.

### 3.1 - Rules

In all of Wolfram's elementary cellular automata, an infinite one-dimensional array of cellular automaton cells with only two states is considered, with each cell in some initial state. At discrete time intervals, every cell spontaneously changes state based on its current state and the state of its two neighbors. For Rule 30, the rule set which governs the next state of the automaton is:

| Current pattern        	  | 111	| 110	| 101	| 100	| 011	| 010	| 001	| 000 |
|:-------------------------:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| New state for center cell	|  0	|  0 	|  0 	|  1 	|  1 	|  1	|  1	|  0  |

## 4 - Rule 110

The Rule 110 cellular automaton (often called simply Rule 110) is an elementary cellular automaton with interesting behavior on the boundary between stability and chaos. In this respect, it is similar to Conway's Game of Life. Like Life, Rule 110 with a particular repeating background pattern is known to be Turing complete. This implies that, in principle, any calculation or computer program can be simulated using this automaton.

### 4.1 - Rules

In an elementary cellular automaton, a one-dimensional pattern of 0s and 1s evolves according to a simple set of rules. Whether a point in the pattern will be 0 or 1 in the new generation depends on its current value, as well as on those of its two neighbors.

An animation of the way the rules of a 1D cellular automaton determine the next generation, using Rule 110.
The Rule 110 automaton has the following set of rules:

| Current pattern	          | 111 |	110 |	101 |	100 |	011 |	010 |	001 |	000 |
|:-------------------------:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| New state for center cell |	 0 	|  1  |	 1  |	 0  |	 1  |	 1	|  1	|  0  |

The name "Rule 110" derives from the fact that this rule can be summarized in the binary sequence 01101110; interpreted as a binary number, this corresponds to the decimal value 110.

## 5 - Wireworld

Wireworld is a cellular automaton first proposed by Brian Silverman in 1987, as part of his program Phantom Fish Tank. It subsequently became more widely known as a result of an article in the "Computer Recreations" column of Scientific American. Wireworld is particularly suited to simulating transistors, and Wireworld is Turing-complete.

### 5.1 - Rules

A Wireworld cell can be in one of four different states, usually numbered 0–3 in software, modeled by colors in the examples here:

- empty,

- electron head,

- electron tail,

- conductor.

As in all cellular automata, time proceeds in discrete steps called generations (sometimes "gens" or "ticks"). Cells behave as follows:

1) empty → empty,

2) electron head → electron tail,

3) electron tail → conductor,

4) conductor → electron head if exactly one or two of the neighbouring cells are electron heads, otherwise remains conductor.

Wireworld uses what is called the Moore neighborhood, which means that in the rules above, neighbouring means one cell away (range value of one) in any direction, both orthogonal and diagonal.

## Moore neighborhood (`m`)

In cellular automata, the Moore neighborhood is defined on a two-dimensional square lattice and is composed of a central cell and the eight cells that surround it.

## Von Newmann neighborhood (`n`)

In cellular automata, the von Neumann neighborhood (or 4-neighborhood) is classically defined on a two-dimensional square lattice and is composed of a central cell and its four adjacent cells. The neighborhood is named after John von Neumann, who used it to define the von Neumann cellular automaton and the von Neumann universal constructor within it. It is one of the two most commonly used neighborhood types for two-dimensional cellular automata, the other one being the Moore neighborhood.

This neighbourhood can be used to define the notion of 4-connected pixels in computer graphics.

The von Neumann neighbourhood of a cell is the cell itself and the cells at a Manhattan distance of 1.

The concept can be extended to higher dimensions, for example forming a 6-cell octahedral neighborhood for a cubic cellular automaton in three dimensions.

## Sources

- Moore neighborhood: [Moore neighborhood - Wikipedia](https://en.wikipedia.org/wiki/Moore_neighborhood)

- Von Newmann neighborhood: [Von Neumann neighborhood - Wikipedia](https://en.wikipedia.org/wiki/Von_Neumann_neighborhood)

- Brian's Brain: [Brian's Brain - Wikipedia](https://en.wikipedia.org/wiki/Brian's_Brain)

- Conway's Game Of Life: [Conway's Game of Life - Wikipedia](https://en.wikipedia.org/wiki/Conway's_Game_of_Life)

- Rule 30: [Rule 30 - Wikipedia](https://en.wikipedia.org/wiki/Rule_30)

- Rule 110: [Rule 110 - Wikipedia](https://en.wikipedia.org/wiki/Rule_110)

- Wireworld: [Wireworld - Wikipedia](https://en.wikipedia.org/wiki/Wireworld)
