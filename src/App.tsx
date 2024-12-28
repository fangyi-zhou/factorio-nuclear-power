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
import { TextDisplayConfigContext } from './Contexts';

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
  const [layout, setLayout] = React.useState<ReactorLayout>(defaultLayout);
  const [isAutoFillEnabled, setIsAutoFillEnabled] = React.useState(false);
  const [isCustomisationEnabled, setIsCustomisationEnabled] =
    React.useState(false);
  const [shouldDisplayIcon, setShouldDisplayIcon] = React.useState(true);

  const [reactorOutput, setReactorOutput] = React.useState(40);
  const [heatExchangerConsumption, setHeatExchangerConsumption] =
    React.useState(10);
  const [heatExchangerOutput, setHeatExchangerOutput] = React.useState(103.09);
  const [heatExchangerOutputRatio, setHeatExchangerOutputRatio] =
    React.useState(10);
  const [offshorePumpOutput, setOffshorePumpOutput] = React.useState(1200);
  const [steamTurbineConsumption, setSteamTurbineConsumption] =
    React.useState(60);
  const [neighbouringBonus, setNeighbouringBonus] = React.useState(1);

  const sre = React.useMemo((): number => {
    const maxRow = layout.length;
    const maxCol = layout[0].length;
    let accum = 0;
    for (let i = 0; i < maxRow; i++) {
      for (let j = 0; j < maxCol; j++) {
        if (layout[i][j])
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

  const toggleAutoFill = React.useCallback(() => {
    setIsAutoFillEnabled(!isAutoFillEnabled);
  }, [isAutoFillEnabled]);

  return (
    <Container>
      <Grid stackable>
        <GridRow centered>
          <div style={{ padding: '15px' }} role="heading" aria-level={1}>
            <Header size="huge">Factorio Nuclear Power Plant Calculator</Header>
          </div>
        </GridRow>
        <GridRow centered>
          <GridColumn width={10}>
            <Layout
              layout={layout}
              setLayout={setLayout}
              isAutoFillEnabled={isAutoFillEnabled}
              toggleAutoFill={toggleAutoFill}
              neighbouringBonus={neighbouringBonus}
            />
          </GridColumn>
          <GridColumn width={6}>
            <TextDisplayConfigContext.Provider value={{ shouldDisplayIcon }}>
              <Calculator
                nuclearReactorCount={reactorCount}
                sre={sre}
                nuclearReactorProps={{
                  heatOutput: reactorOutput,
                }}
                heatExchangerProps={{
                  heatOutput: heatExchangerOutput,
                  energyConsumption: heatExchangerConsumption,
                  fluidConsumption:
                    heatExchangerOutput / heatExchangerOutputRatio,
                }}
                offshorePumpProps={{
                  pumpingSpeed: offshorePumpOutput,
                }}
                steamTurbineProps={{
                  fluidConsumption: steamTurbineConsumption,
                  powerOutput: 5.82,
                }}
              />
            </TextDisplayConfigContext.Provider>
          </GridColumn>
        </GridRow>
        <GridRow>
          <Grid>
            <GridRow>
              <Checkbox
                toggle
                label="Hide Inline Icons"
                checked={!shouldDisplayIcon}
                onChange={() => setShouldDisplayIcon(!shouldDisplayIcon)}
              />
            </GridRow>
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
                  label="Heat Exchanger Output Ratio"
                  type="number"
                  value={heatExchangerOutputRatio}
                  onChange={(event) =>
                    handleNumberInput(event, setHeatExchangerOutputRatio)
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
