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
