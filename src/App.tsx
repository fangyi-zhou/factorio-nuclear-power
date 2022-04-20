import React from 'react';
import { Container, Divider, Grid } from 'fomantic-ui-react';
import update from 'immutability-helper';
import Layout from './Layout';
import Calculator from './Calculator';

type S = {
  layout: Array<Array<boolean>>;
};

const maxCol = 3;
const maxRow = 4;
const defaultLayout = [
  [false, false, false],
  [false, true, false],
  [false, false, false],
  [false, false, false],
];
const baseOutput = 40;

class App extends React.Component<{}, S> {
  constructor(props: {}) {
    super(props);
    this.state = {
      layout: defaultLayout,
    };
  }
  handleClick(rowIdx: number, cellIdx: number) {
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
  }

  calculatePower(): number {
    let accum = 0;
    for (let i = 0; i < maxRow; i++) {
      for (let j = 0; j < maxCol; j++) {
        accum += this.getOutputMultiplier(i, j);
      }
    }
    return accum * baseOutput;
  }

  getOutputMultiplier(rowIdx: number, cellIdx: number): number {
    const layout = this.state.layout;
    if (!layout[rowIdx][cellIdx]) {
      return 0;
    }
    let count = 1;
    if (rowIdx > 0 && layout[rowIdx - 1][cellIdx]) count++;
    if (rowIdx < maxRow - 1 && layout[rowIdx + 1][cellIdx]) count++;
    if (cellIdx > 0 && layout[rowIdx][cellIdx - 1]) count++;
    if (cellIdx < maxCol - 1 && layout[rowIdx][cellIdx + 1]) count++;
    return count;
  }

  render() {
    return (
      <Container>
        <Grid columns={2} divided className="stackable">
          <Grid.Row centered>
            <div style={{ padding: '15px' }}>
              <h1>Factorio Nuclear Power Plant Calculator</h1>
            </div>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column>
              <Layout
                layout={this.state.layout}
                handleClick={this.handleClick.bind(this)}
                getOutputMultiplier={this.getOutputMultiplier.bind(this)}
              ></Layout>
            </Grid.Column>
            <Grid.Column>
              <Calculator output={this.calculatePower()}></Calculator>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <br />
        <Divider />
        <div style={{ textAlign: 'center' }}>
          <p>
            This calculator is &nbsp;
            <a href="https://github.com/fangyi-zhou/factorio-nuclear-power/">
              open source
            </a>
            .
          </p>
          <p>
            See also: &nbsp;
            <a href="https://alt-f4.blog/ALTF4-57/">
              Alt-F4 #57 - Nuclear Energy and You
            </a>
          </p>
        </div>
      </Container>
    );
  }
}

export default App;
