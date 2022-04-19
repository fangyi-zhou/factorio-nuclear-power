import { Grid } from 'fomantic-ui-react';
import React from 'react';

type S = {
  layout: Array<Array<boolean>>;
};

const maxCol = 3;
const maxRow = 3;
const emptyLayout = [
  [false, false, false],
  [false, false, false],
  [false, false, false],
];

class Layout extends React.Component<{}, S> {
  constructor(props: {}) {
    super(props);
    this.state = {
      layout: emptyLayout,
    };
  }

  countNeighbour(rowIdx: number, cellIdx: number): number {
    let count = 1;
    const layout = this.state.layout;
    if (rowIdx >= 0 && layout[rowIdx - 1][cellIdx]) count++;
    if (rowIdx < maxRow && layout[rowIdx + 1][cellIdx]) count++;
    if (cellIdx >= 0 && layout[rowIdx][cellIdx - 1]) count++;
    if (cellIdx < maxCol && layout[rowIdx][cellIdx + 1]) count++;
    return count;
  }

  render() {
    return (
      <Grid celled columns={3}>
        {this.state.layout.map((row, rowIdx) => (
          <Grid.Row centered key={`Row-${rowIdx}`}>
            {row.map((cell, cellIdx) => (
              <Grid.Column key={`Cell-${rowIdx}-${cellIdx}`}>
                {cell ? 1 + this.countNeighbour(rowIdx, cellIdx) : 0}
              </Grid.Column>
            ))}
          </Grid.Row>
        ))}
      </Grid>
    );
  }
}

export default Layout;
