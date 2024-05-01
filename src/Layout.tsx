import { Button, Grid, Segment, Popup } from 'fomantic-ui-react';
import React from 'react';

type P = {
  layout: Array<Array<boolean>>;
  handleClick: (rowIdx: number, cellIdx: number) => void;
  getOutputMultiplier: (rowIdx: number, cellIdx: number) => number;
  addRow: () => void;
  addCol: () => void;
  removeRow: () => void;
  removeCol: () => void;
  autoFill: boolean;
  toggleAutoFill: () => void;
  reset: () => void;
};

const nuclearEmoji = '☢️';
const warningEmoji = '⚠️';

class Layout extends React.Component<P, {}> {
  renderCell(rowIdx: number, cellIdx: number) {
    const count = this.props.getOutputMultiplier(rowIdx, cellIdx);
    return (
      <Segment style={{ minHeight: '70px', minWidth: '70px' }}>
        <div
          onClick={() => {
            this.props.handleClick(rowIdx, cellIdx);
          }}
          style={{ textAlign: 'center', height: '100%' }}
        >
          {count !== 0 && (
            <>
              {nuclearEmoji}
              <br />
              {count + 'x'}
              {count >= 5 && (
                <Popup
                  content="This reactor cannot be refueled automatically"
                  trigger={<div>{warningEmoji}</div>}
                />
              )}
            </>
          )}
        </div>
      </Segment>
    );
  }

  render() {
    const maxCol = this.props.layout[0].length;
    return (
      <Grid celled relaxed columns={'equal'}>
        <Grid.Row centered>
          <div style={{ padding: '10px' }}>
            <p>Click on an empty cell to place a nuclear power plant.</p>
            <Button onClick={this.props.addRow}>+ Row</Button>
            <Button
              onClick={this.props.removeRow}
              disabled={this.props.layout.length === 1}
            >
              - Row
            </Button>
            <Button onClick={this.props.addCol} disabled={maxCol >= 6}>
              + Column
            </Button>
            <Button onClick={this.props.removeCol} disabled={maxCol === 1}>
              - Column
            </Button>
            <Button onClick={this.props.toggleAutoFill}>
              {this.props.autoFill ? 'Disable' : 'Enable'} Auto Fill
            </Button>
            <Button onClick={this.props.reset}>Reset</Button>
          </div>
        </Grid.Row>
        {this.props.layout.map((row, rowIdx) => (
          <Grid.Row stretched key={`Row-${rowIdx}`}>
            {row.map((cell, cellIdx) => (
              <Grid.Column
                key={`Cell-${rowIdx}-${cellIdx}`}
                style={{ padding: '1em' }}
              >
                {this.renderCell(rowIdx, cellIdx)}
              </Grid.Column>
            ))}
          </Grid.Row>
        ))}
      </Grid>
    );
  }
}

export default Layout;
