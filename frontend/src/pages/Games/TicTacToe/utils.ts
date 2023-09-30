export const includes = (arrs: number[][], search: number[]) =>
  arrs.some((arr) => arr.every((n, i) => search.includes(n)))
