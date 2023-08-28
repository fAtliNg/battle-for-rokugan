export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

const getAvailableMoves = (position: string[][], whoMove: string) => {
  const availableMoves: any[] = []
  position.forEach((row: string[], rowIndex) => {
    row.forEach((item: string, itemIndex) => {
      if (!position[rowIndex][itemIndex]) {
        availableMoves.push([rowIndex, itemIndex])
      }
    })
  })
  return availableMoves
}

export const getMove = (position: string[][], whoMove: string) => {
  const availableMoves = getAvailableMoves(position, whoMove)
  const randomMove = availableMoves[getRandomInt(0, availableMoves.length - 1)]
  return randomMove
}
