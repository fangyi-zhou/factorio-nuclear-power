import { Button, Grid, Segment, Popup } from 'fomantic-ui-react';
import React from 'react';

type P = {
  layout: Array<Array<boolean>>;
  handleClick: (rowIdx: number, cellIdx: number) => void;
  getOutputMultiplier: (rowIdx: number, cellIdx: number) => number;
  addRow: () => void;
};

const nuclearEmoji = '☢️';
const warningEmoji = '⚠️';
const maxCol = 3;

class Layout extends React.Component<P, {}> {
  renderCell(rowIdx: number, cellIdx: number) {
    const count = this.props.getOutputMultiplier(rowIdx, cellIdx);
    const warningPopup =
      count >= 5 ? (
        <Popup
          content="This reactor cannot be refueled automatically"
          trigger={<div>{warningEmoji}</div>}
        />
      ) : (
        <div></div>
      );
    const inner =
      count === 0 ? (
        <div></div>
      ) : (
        <div>
          {nuclearEmoji}
          <br />
          {count + 'x'}
          {warningPopup}
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
          <div style={{ padding: '10px' }}>
            <p>Click on an empty cell to place a nuclear power plant.</p>
            <Button onClick={this.props.addRow}>Add a row</Button>
          </div>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Layout;
