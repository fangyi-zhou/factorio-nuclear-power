import React from 'react';
import {
  Checkbox,
  Container,
  Divider,
  Form,
  FormInput,
  Grid,
  GridColumn,
  GridRow,
  Header,
} from 'semantic-ui-react';
import Layout from './Layout';
import Calculator from './Calculator';
import {
  ReactorLayout,
  defaultLayout,
  getNeighbourCount,
} from './ReactorLayout';

const handleNumberInput = (
  event: React.ChangeEvent<HTMLInputElement>,
  dispatch: React.Dispatch<React.SetStateAction<number>>
) => {
  const number = Number(event.target.value);
  if (!Number.isNaN(number) && number >= 0) {
    dispatch(number);
  }
};

export const App = () => {
  const [layout, setLayout] = React.useState<ReactorLayout>(defaultLayout());
  const [isAutoFillEnabled, setIsAutoFillEnabled] = React.useState(false);
  const [isCustomisationEnabled, setIsCustomisationEnabled] =
    React.useState(false);
  const [reactorOutput, setReactorOutput] = React.useState(40);
  const [heatExchangerConsumption, setHeatExchangerConsumption] =
    React.useState(10);
  const [heatExchangerOutput, setHeatExchangerOutput] = React.useState(103.09);
  const [offshorePumpOutput, setOffshorePumpOutput] = React.useState(1200);
  const [steamTurbineConsumption, setSteamTurbineConsumption] =
    React.useState(60);
  const [neighbouringBonus, setNeighbouringBonus] = React.useState(1);

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
        accum += 1 + getNeighbourCount(layout, i, j) * neighbouringBonus;
      }
    }
    return accum;
  }, [layout, neighbouringBonus]);

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
            <Header size="huge">Factorio Nuclear Power Plant Calculator</Header>
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
              neighbouringBonus={neighbouringBonus}
            />
          </GridColumn>
          <GridColumn width={6}>
            <Calculator
              reactorCount={reactorCount}
              sre={sre}
              reactorOutput={reactorOutput}
              heatExchangerConsumption={heatExchangerConsumption}
              heatExchangerOutput={heatExchangerOutput}
              offshorePumpOutput={offshorePumpOutput}
              steamTurbineConsumption={steamTurbineConsumption}
            />
          </GridColumn>
        </GridRow>
        <GridRow>
          <Grid>
            <GridRow>
              <Checkbox
                toggle
                label="Customise Parameters"
                checked={isCustomisationEnabled}
                onChange={() =>
                  setIsCustomisationEnabled(!isCustomisationEnabled)
                }
              />
            </GridRow>
            {isCustomisationEnabled && (
              <Form>
                <FormInput
                  label="Reactor Output"
                  type="number"
                  value={reactorOutput}
                  onChange={(event) =>
                    handleNumberInput(event, setReactorOutput)
                  }
                />
                <FormInput
                  label="Heat Exchanger Consumption"
                  type="number"
                  value={heatExchangerConsumption}
                  onChange={(event) =>
                    handleNumberInput(event, setHeatExchangerConsumption)
                  }
                />
                <FormInput
                  label="Heat Exchanger Output"
                  type="number"
                  value={heatExchangerOutput}
                  onChange={(event) =>
                    handleNumberInput(event, setHeatExchangerOutput)
                  }
                />
                <FormInput
                  label="Offshore Pump Output"
                  type="number"
                  value={offshorePumpOutput}
                  onChange={(event) =>
                    handleNumberInput(event, setOffshorePumpOutput)
                  }
                />
                <FormInput
                  label="Steam Turbine Consumption"
                  type="number"
                  value={steamTurbineConsumption}
                  onChange={(event) =>
                    handleNumberInput(event, setSteamTurbineConsumption)
                  }
                />
                <FormInput
                  label="Neighbouring Bonus"
                  type="number"
                  value={neighbouringBonus}
                  onChange={(event) =>
                    handleNumberInput(event, setNeighbouringBonus)
                  }
                />
              </Form>
            )}
          </Grid>
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
