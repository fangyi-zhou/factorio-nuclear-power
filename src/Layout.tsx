import { Grid, Segment } from 'fomantic-ui-react';
import React from 'react';

type P = {
  layout: Array<Array<boolean>>;
  handleClick: (rowIdx: number, cellIdx: number) => void;
  getOutputMultiplier: (rowIdx: number, cellIdx: number) => number;
};

const nuclearEmoji = '☢️';
const maxCol = 3;

class Layout extends React.Component<P, {}> {
  renderCell(rowIdx: number, cellIdx: number) {
    const count = this.props.getOutputMultiplier(rowIdx, cellIdx);
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
            this.props.handleClick(rowIdx, cellIdx);
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
        {this.props.layout.map((row, rowIdx) => (
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
