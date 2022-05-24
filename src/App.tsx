import React from 'react';
import { Container, Divider, Grid } from 'fomantic-ui-react';
import update from 'immutability-helper';
import Layout from './Layout';
import Calculator from './Calculator';

type S = {
  layout: Array<Array<boolean>>;
  autoFill: boolean;
};

const defaultLayout = () => [
  [false, false, false],
  [false, true, false],
  [false, false, false],
];

class App extends React.Component<{}, S> {
  constructor(props: {}) {
    super(props);
    this.state = {
      layout: defaultLayout(),
      autoFill: false,
    };
  }
  handleClick(rowIdx: number, cellIdx: number) {
    const maxRow = this.state.layout.length;
    const maxCol = this.state.layout[0].length;
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

  calculateSre(): number {
    const maxRow = this.state.layout.length;
    const maxCol = this.state.layout[0].length;
    let accum = 0;
    for (let i = 0; i < maxRow; i++) {
      for (let j = 0; j < maxCol; j++) {
        accum += this.getOutputMultiplier(i, j);
      }
    }
    return accum;
  }

  getReactorCount(): number {
    const maxRow = this.state.layout.length;
    const maxCol = this.state.layout[0].length;
    let count = 0;
    for (let i = 0; i < maxRow; i++) {
      for (let j = 0; j < maxCol; j++) {
        if (this.state.layout[i][j]) count++;
      }
    }
    return count;
  }

  getOutputMultiplier(rowIdx: number, cellIdx: number): number {
    const layout = this.state.layout;
    const maxRow = layout.length;
    const maxCol = layout[0].length;
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

  addRow() {
    const maxCol = this.state.layout[0].length;
    let emptyLine = Array(maxCol);
    emptyLine.fill(this.state.autoFill);
    this.setState(
      update(this.state, {
        layout: {
          $push: [emptyLine],
        },
      })
    );
  }

  addCol() {
    this.setState(
      update(this.state, {
        layout: (oldLayout) =>
          oldLayout.map((oldRow) => {
            oldRow.push(this.state.autoFill);
            return oldRow;
          }),
      })
    );
  }

  reset() {
    this.setState(
      update(this.state, {
        layout: {
          $set: defaultLayout(),
        },
      })
    );
  }

  toggleAutoFill() {
    this.setState(
      update(this.state, { autoFill: { $set: !this.state.autoFill } })
    );
  }

  render() {
    return (
      <Container>
        <Grid className="stackable">
          <Grid.Row centered>
            <div style={{ padding: '15px' }}>
              <h1>Factorio Nuclear Power Plant Calculator</h1>
            </div>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column wide={10}>
              <Layout
                layout={this.state.layout}
                handleClick={this.handleClick.bind(this)}
                getOutputMultiplier={this.getOutputMultiplier.bind(this)}
                addRow={this.addRow.bind(this)}
                addCol={this.addCol.bind(this)}
                autoFill={this.state.autoFill}
                toggleAutoFill={this.toggleAutoFill.bind(this)}
                reset={this.reset.bind(this)}
              ></Layout>
            </Grid.Column>
            <Grid.Column wide={6}>
              <Calculator
                reactors={this.getReactorCount()}
                sre={this.calculateSre()}
              ></Calculator>
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
