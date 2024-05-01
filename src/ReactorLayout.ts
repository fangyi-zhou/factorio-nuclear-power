// 2D matrix
export type ReactorLayout = boolean[][];
export const defaultLayout = (): ReactorLayout => [
  [false, false, false],
  [false, true, false],
  [false, false, false],
];

export const getNeighbourCount = (
  layout: ReactorLayout,
  rowIdx: number,
  cellIdx: number
): number => {
  const maxRow = layout.length;
  const maxCol = layout[0].length;
  if (!layout[rowIdx][cellIdx]) {
    return 0;
  }
  let count = 0;
  if (rowIdx > 0 && layout[rowIdx - 1][cellIdx]) count++;
  if (rowIdx < maxRow - 1 && layout[rowIdx + 1][cellIdx]) count++;
  if (cellIdx > 0 && layout[rowIdx][cellIdx - 1]) count++;
  if (cellIdx < maxCol - 1 && layout[rowIdx][cellIdx + 1]) count++;
  return count;
};
