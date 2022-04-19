import { Grid, Segment } from 'fomantic-ui-react';
import React from 'react';
import update from 'immutability-helper';

type S = {
  layout: Array<Array<boolean>>;
};

const nuclearEmoji = '☢️';
const maxCol = 3;
const maxRow = 3;
const defaultLayout = [
  [false, false, false],
  [false, true, false],
  [false, false, false],
];

class Layout extends React.Component<{}, S> {
  constructor(props: {}) {
    super(props);
    this.state = {
      layout: defaultLayout,
    };
  }

  countNeighbour(rowIdx: number, cellIdx: number): number {
    const layout = this.state.layout;
    if (!layout[rowIdx][cellIdx]) {
      return 0;
    }
    let count = 1;
    console.log(rowIdx, cellIdx);
    if (rowIdx > 0 && layout[rowIdx - 1][cellIdx]) count++;
    if (rowIdx < maxRow - 1 && layout[rowIdx + 1][cellIdx]) count++;
    if (cellIdx > 0 && layout[rowIdx][cellIdx - 1]) count++;
    if (cellIdx < maxCol - 1 && layout[rowIdx][cellIdx + 1]) count++;
    return count;
  }

  handleClick(rowIdx: number, cellIdx: number) {
    console.log(rowIdx, cellIdx);
    if (rowIdx < 0 || rowIdx >= maxRow) return;
    if (cellIdx < 0 || cellIdx >= maxCol) return;
    this.setState(
      update(this.state, {
        layout: {
          [rowIdx]: {
            [cellIdx]: {
              $set: !this.state.layout[rowIdx][cellIdx],
            },
          },
        },
      })
    );
    this.state.layout[rowIdx][cellIdx] = !this.state.layout[rowIdx][cellIdx];
  }

  renderCell(rowIdx: number, cellIdx: number) {
    const count = this.countNeighbour(rowIdx, cellIdx);
    const inner =
      count === 0 ? (
        <div></div>
      ) : (
        <div>
          {nuclearEmoji}
          <br />
          {count + 'x'}
        </div>
      );
    return (
      <Segment style={{ minHeight: '70px' }}>
        <div
          onClick={() => {
            this.handleClick(rowIdx, cellIdx);
          }}
          style={{ textAlign: 'center', height: '100%' }}
        >
          {inner}
        </div>
      </Segment>
    );
  }

  render() {
    return (
      <Grid celled columns={maxCol}>
        {this.state.layout.map((row, rowIdx) => (
          <Grid.Row stretched key={`Row-${rowIdx}`}>
            {row.map((cell, cellIdx) => (
              <Grid.Column key={`Cell-${rowIdx}-${cellIdx}`}>
                {this.renderCell(rowIdx, cellIdx)}
              </Grid.Column>
            ))}
          </Grid.Row>
        ))}
        <Grid.Row centered>
          Click on an empty cell to place a nuclear power plant.
        </Grid.Row>
      </Grid>
    );
  }
}

export default Layout;
