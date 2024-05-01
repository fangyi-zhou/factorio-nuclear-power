import React from 'react';
import {
  Container,
  Divider,
  Grid,
  GridColumn,
  GridRow,
} from 'semantic-ui-react';
import Layout from './Layout';
import Calculator from './Calculator';
import {
  ReactorLayout,
  defaultLayout,
  getOutputMultiplier,
} from './ReactorLayout';

export const App = () => {
  const [layout, setLayout] = React.useState<ReactorLayout>(defaultLayout());
  const [isAutoFillEnabled, setIsAutoFillEnabled] = React.useState(false);

  const handleClick = React.useCallback(
    (rowIdxToChange: number, cellIdxToChange: number) => {
      const maxRow = layout.length;
      const maxCol = layout[0].length;
      if (rowIdxToChange < 0 || rowIdxToChange >= maxRow) return;
      if (cellIdxToChange < 0 || cellIdxToChange >= maxCol) return;
      setLayout(
        layout.map((row, rowIdx) =>
          rowIdx !== rowIdxToChange
            ? row
            : row.map((cell, cellIdx) =>
                cellIdx !== cellIdxToChange ? cell : !cell
              )
        )
      );
    },
    [layout]
  );

  const sre = React.useMemo((): number => {
    const maxRow = layout.length;
    const maxCol = layout[0].length;
    let accum = 0;
    for (let i = 0; i < maxRow; i++) {
      for (let j = 0; j < maxCol; j++) {
        accum += getOutputMultiplier(layout, i, j);
      }
    }
    return accum;
  }, [layout]);

  const reactorCount = React.useMemo((): number => {
    const maxRow = layout.length;
    const maxCol = layout[0].length;
    let count = 0;
    for (let i = 0; i < maxRow; i++) {
      for (let j = 0; j < maxCol; j++) {
        if (layout[i][j]) count++;
      }
    }
    return count;
  }, [layout]);

  const addRow = React.useCallback(() => {
    const maxCol = layout[0].length;
    let emptyLine = Array(maxCol);
    emptyLine.fill(isAutoFillEnabled);
    setLayout([...layout, emptyLine]);
  }, [layout, isAutoFillEnabled]);

  const removeRow = React.useCallback(() => {
    if (layout.length === 1) return;
    setLayout(layout.slice(0, layout.length - 1));
  }, [layout]);

  const addCol = React.useCallback(() => {
    setLayout(layout.map((row) => [...row, isAutoFillEnabled]));
  }, [layout, isAutoFillEnabled]);

  const removeCol = React.useCallback(() => {
    if (layout[0].length === 1) return;
    setLayout(layout.map((row) => row.slice(0, row.length - 1)));
  }, [layout]);

  const reset = React.useCallback(() => {
    setLayout(defaultLayout());
  }, []);

  const toggleAutoFill = React.useCallback(() => {
    setIsAutoFillEnabled(!isAutoFillEnabled);
  }, [isAutoFillEnabled]);

  return (
    <Container>
      <Grid stackable>
        <GridRow centered>
          <div style={{ padding: '15px' }}>
            <h1>Factorio Nuclear Power Plant Calculator</h1>
          </div>
        </GridRow>
        <GridRow centered>
          <GridColumn width={10}>
            <Layout
              layout={layout}
              handleClick={handleClick}
              addRow={addRow}
              addCol={addCol}
              removeRow={removeRow}
              removeCol={removeCol}
              isAutoFillEnabled={isAutoFillEnabled}
              toggleAutoFill={toggleAutoFill}
              reset={reset}
            />
          </GridColumn>
          <GridColumn width={6}>
            <Calculator reactorCount={reactorCount} sre={sre} />
          </GridColumn>
        </GridRow>
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
};

export default App;
