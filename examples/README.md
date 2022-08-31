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

## 4 - Rule 90

In the mathematical study of cellular automata, Rule 90 is an elementary cellular automaton based on the exclusive or function. It consists of a one-dimensional array of cells, each of which can hold either a 0 or a 1 value. In each time step all values are simultaneously replaced by the exclusive or of their two neighboring values. Martin, Odlyzko & Wolfram (1984) call it "the simplest non-trivial cellular automaton", and it is described extensively in Stephen Wolfram's 2002 book A New Kind of Science.

When started from a single live cell, Rule 90 has a time-space diagram in the form of a Sierpiński triangle. The behavior of any other configuration can be explained as a superposition of copies of this pattern, combined using the exclusive or function. Any configuration with only finitely many nonzero cells becomes a replicator that eventually fills the array with copies of itself. When Rule 90 is started from a random initial configuration, its configuration remains random at each time step. Its time-space diagram forms many triangular "windows" of different sizes, patterns that form when a consecutive row of cells becomes simultaneously zero and then cells with value 1 gradually move into this row from both ends.

Some of the earliest studies of Rule 90 were made in connection with an unsolved problem in number theory, Gilbreath's conjecture, on the differences of consecutive prime numbers. This rule is also connected to number theory in a different way, via Gould's sequence. This sequence counts the number of nonzero cells in each time step after starting Rule 90 with a single live cell. Its values are powers of two, with exponents equal to the number of nonzero digits in the binary representation of the step number. Other applications of Rule 90 have included the design of tapestries.

Every configuration of Rule 90 has exactly four predecessors, other configurations that form the given configuration after a single step. Therefore, in contrast to many other cellular automata such as Conway's Game of Life, Rule 90 has no Garden of Eden, a configuration with no predecessors. It provides an example of a cellular automaton that is surjective (each configuration has a predecessor) but not injective (it has sets of more than one configuration with the same successor). It follows from the Garden of Eden theorem that Rule 90 is locally injective (all configurations with the same successor vary at an infinite number of cells).

### 4.1 - Rules

Rule 90 is an elementary cellular automaton. That means that it consists of a one-dimensional array of cells, each of which holds a single binary value, either 0 or 1. An assignment of values to all of the cells is called a configuration. The automaton is given an initial configuration, and then progresses through other configurations in a sequence of discrete time steps. At each step, all cells are updated simultaneously. A pre-specified rule determines the new value of each cell as a function of its previous value and of the values in its two neighboring cells. All cells obey the same rule, which may be given either as a formula or as a rule table that specifies the new value for each possible combination of neighboring values.

In the case of Rule 90, each cell's new value is the exclusive or of the two neighboring values. Equivalently, the next state of this particular automaton is governed by the following rule table:

| Current pattern        	  | 111	| 110	| 101	| 100	| 011	| 010	| 001	| 000 |
|:-------------------------:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| New state for center cell	|  0	|  1 	|  0 	|  1 	|  1 	|  0	|  1	|  0  |

## 5 - Rule 110

The Rule 110 cellular automaton (often called simply Rule 110) is an elementary cellular automaton with interesting behavior on the boundary between stability and chaos. In this respect, it is similar to Conway's Game of Life. Like Life, Rule 110 with a particular repeating background pattern is known to be Turing complete. This implies that, in principle, any calculation or computer program can be simulated using this automaton.

### 5.1 - Rules

In an elementary cellular automaton, a one-dimensional pattern of 0s and 1s evolves according to a simple set of rules. Whether a point in the pattern will be 0 or 1 in the new generation depends on its current value, as well as on those of its two neighbors.

An animation of the way the rules of a 1D cellular automaton determine the next generation, using Rule 110.
The Rule 110 automaton has the following set of rules:

| Current pattern	          | 111 |	110 |	101 |	100 |	011 |	010 |	001 |	000 |
|:-------------------------:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| New state for center cell |	 0 	|  1  |	 1  |	 0  |	 1  |	 1	|  1	|  0  |

The name "Rule 110" derives from the fact that this rule can be summarized in the binary sequence 01101110; interpreted as a binary number, this corresponds to the decimal value 110.

## 6 - Rule 184

Rule 184 is a one-dimensional binary cellular automaton rule, notable for solving the majority problem as well as for its ability to simultaneously describe several, seemingly quite different, particle systems:

Rule 184 can be used as a simple model for traffic flow in a single lane of a highway, and forms the basis for many cellular automaton models of traffic flow with greater sophistication. In this model, particles (representing vehicles) move in a single direction, stopping and starting depending on the cars in front of them. The number of particles remains unchanged throughout the simulation. Because of this application, Rule 184 is sometimes called the "traffic rule".
Rule 184 also models a form of deposition of particles onto an irregular surface, in which each local minimum of the surface is filled with a particle in each step. At each step of the simulation, the number of particles increases. Once placed, a particle never moves.
Rule 184 can be understood in terms of ballistic annihilation, a system of particles moving both leftwards and rightwards through a one-dimensional medium. When two such particles collide, they annihilate each other, so that at each step the number of particles remains unchanged or decreases.
The apparent contradiction between these descriptions is resolved by different ways of associating features of the automaton's state with particles.

The name of Rule 184 is a Wolfram code that defines the evolution of its states. The earliest research on Rule 184 is by Li (1987) and Krug & Spohn (1988). In particular, Krug and Spohn already describe all three types of particle system modeled by Rule 184.

### 6.1 Rules

A state of the Rule 184 automaton consists of a one-dimensional array of cells, each containing a binary value (0 or 1). In each step of its evolution, the Rule 184 automaton applies the following rule to each of the cells in the array, simultaneously for all cells, to determine the new state of the cell:

| Current pattern	          | 111 |	110 |	101 |	100 |	011 |	010 |	001 |	000 |
|:-------------------------:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| New state for center cell |	 1 	|  0  |	 1  |	 1  |	 1  |	 0	|  0	|  0  |

## 7 - Wireworld

Wireworld is a cellular automaton first proposed by Brian Silverman in 1987, as part of his program Phantom Fish Tank. It subsequently became more widely known as a result of an article in the "Computer Recreations" column of Scientific American. Wireworld is particularly suited to simulating transistors, and Wireworld is Turing-complete.

### 7.1 - Rules

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

## 8 - Day and Night

Day and Night is a cellular automaton rule in the same family as Game of Life. It is defined by rule notation B3678/S34678, meaning that a dead cell becomes live (is born) if it has 3, 6, 7, or 8 live neighbors, and a live cell remains alive (survives) if it has 3, 4, 6, 7, or 8 live neighbors, out of the eight neighbors in the Moore neighborhood. It was invented and named by Nathan Thompson in 1997, and investigated extensively by David I. Bell. The rule is given the name "Day & Night" because its on and off states are symmetric: if all the cells in the Universe are inverted, the future states are the inversions of the future states of the original pattern. A pattern in which the entire universe consists of off cells except for finitely many on cells can equivalently be represented by a pattern in which the whole universe is covered in on cells except for finitely many off cells in congruent locations.

Although the detailed evolution of this cellular automaton is very different from Conway's Game of Life, it exhibits complex behavior similar to that rule: there are many known small oscillators and spaceships, and guns formed by combining oscillators in such a way that they periodically emit spaceships of various types.

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

- Rule 90: [Rule 90 - Wikipedia](https://en.wikipedia.org/wiki/Rule_90)

- Rule 110: [Rule 110 - Wikipedia](https://en.wikipedia.org/wiki/Rule_110)

- Rule 184: [Rule 184 - Wikipedia](https://en.wikipedia.org/wiki/Rule_184)

- Wireworld: [Wireworld - Wikipedia](https://en.wikipedia.org/wiki/Wireworld)

- Day and Night: [Day and Night - Wikipedia](https://en.wikipedia.org/wiki/Day_and_Night_(cellular_automaton))
