export const winPosition = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
]

export const defaultPosition = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
]

export const includes = (arrs: number[][], search: number[]) =>
  arrs.some((arr) => arr.every((n, i) => search.includes(n)))
