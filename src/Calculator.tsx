import { Container, Popup, Table } from 'semantic-ui-react';
import React from 'react';
import { EntityConfigContext, TextDisplayConfigContext } from './Contexts';
import { nuclearFuelCellEnergyValue } from './Constants';

type CalculatorProps = {
  sre: number;
  nuclearReactorCount: number;
};

const inlineImageHeight = '25px';

interface InlineTextProps {
  text: string;
  altText: string;
  src: string;
}

const InlineText = ({ text, altText, src }: InlineTextProps) => {
  const textDisplayConfigContext = React.useContext(TextDisplayConfigContext);
  return (
    <>
      <i>{text}</i>
      {textDisplayConfigContext.shouldDisplayIcon && (
        <>
          &nbsp;
          <img height={inlineImageHeight} alt={altText} src={src} />
        </>
      )}
    </>
  );
};

interface InlineTextDisplayProps {
  plural?: boolean;
}

const NuclearReactorInlineText = ({ plural }: InlineTextDisplayProps) => (
  <InlineText
    text={'Nuclear Reactor' + (plural ? 's' : '')}
    altText="Nuclear Reactor"
    src="https://wiki.factorio.com/images/Nuclear_reactor.png"
  />
);

const HeatExchangerInlineText = ({ plural }: InlineTextDisplayProps) => (
  <InlineText
    text={'Heat Exchanger' + (plural ? 's' : '')}
    altText="Heat Exchanger"
    src="https://wiki.factorio.com/images/Heat_exchanger.png"
  />
);

const WaterInlineText = (props: InlineTextDisplayProps) => (
  <InlineText
    text="Water"
    altText="Water"
    src="https://wiki.factorio.com/images/Water.png"
  />
);

const SteamInlineText = (props: InlineTextDisplayProps) => (
  <InlineText
    text="Steam"
    altText="Steam"
    src="https://wiki.factorio.com/images/Steam.png"
  />
);

const OffshorePumpInlineText = ({ plural }: InlineTextDisplayProps) => (
  <InlineText
    text={'Offshore Pump' + (plural ? 's' : '')}
    altText="Offshore Pump"
    src="https://wiki.factorio.com/images/Offshore_pump.png"
  />
);

const SteamTurbineInlineText = ({ plural }: InlineTextDisplayProps) => (
  <InlineText
    text={'Steam Turbine' + (plural ? 's' : '')}
    altText="Steam Turbine"
    src="https://wiki.factorio.com/images/Steam_turbine.png"
  />
);

const FuelCellInlineText = ({ plural }: InlineTextDisplayProps) => (
  <InlineText
    text={'Fuel Cell' + (plural ? 's' : '')}
    altText="Fuel Cell"
    src="https://wiki.factorio.com/images/Uranium_fuel_cell.png"
  />
);

export const Calculator = (props: CalculatorProps) => {
  const entityConfig = React.useContext(EntityConfigContext);
  const {
    nuclearReactorProps,
    heatExchangerProps,
    offshorePumpProps,
    steamTurbineProps,
  } = entityConfig;
  const heatOutput = props.sre * nuclearReactorProps.heatOutput;

  // Converts all heat from Nuclear Reactor using Heat Exchanger
  const heatExchangerCount = heatOutput / heatExchangerProps.energyConsumption;
  const heatExchangerCountRounded = Math.round(heatExchangerCount * 100) / 100;

  // Heat Exchanger produces steam
  const steam = heatExchangerCount * heatExchangerProps.heatOutput;
  const steamRounded = Math.round(steam * 100) / 100;

  // Heat Exchanger consumes water
  const water = heatExchangerCount * heatExchangerProps.fluidConsumption;
  const waterRounded = Math.round(water * 100) / 100;

  // Water comes from Offshore Pump
  const offshorePumpCount = water / offshorePumpProps.pumpingSpeed;
  const offshorePumpCountRounded = Math.round(offshorePumpCount * 100) / 100;

  // Steam Turbine consumes steam
  const steamTurbineCount = steam / steamTurbineProps.fluidConsumption;
  const steamTurbineCountRounded = Math.round(steamTurbineCount * 100) / 100;

  // Steam Turbine generates Electricity
  const electricityOutput = steamTurbineCount * steamTurbineProps.powerOutput;
  const electricityOutputRounded = Math.round(electricityOutput * 100) / 100;

  // Reactor fuel usage
  const fuelUsagePerMin =
    1 /
    (nuclearFuelCellEnergyValue /
      (props.nuclearReactorCount * nuclearReactorProps.heatOutput) /
      60);
  const fuelUsageRoundedPerMin = Math.round(fuelUsagePerMin * 100) / 100;

  return (
    <div
      style={{
        height: '100%',
      }}
    >
      <Container fluid text
        style={{
          top: '25px',
          position: 'sticky',
        }}>
        <p>
          This layout produces {heatOutput} MW heat output ({props.sre}{' '}
          <Popup content="Single Reactor Equivalent" trigger={<i>SRE</i>} />
          {', '}
          {nuclearReactorProps.heatOutput} MW per <NuclearReactorInlineText />
          ).
        </p>
        <p>
          {props.nuclearReactorCount}{' '}
          <NuclearReactorInlineText plural={props.nuclearReactorCount > 1} />{' '}
          use <b>{fuelUsageRoundedPerMin}</b>{' '}
          <FuelCellInlineText plural={fuelUsageRoundedPerMin > 1} /> (
          {Math.round(
            (fuelUsageRoundedPerMin / props.nuclearReactorCount) * 100
          ) / 100}{' '}
          <FuelCellInlineText /> per <NuclearReactorInlineText />
          ).
        </p>
        <p>
          {heatOutput} MW of heat output is consumed by{' '}
          <b>{Math.ceil(heatExchangerCount)}</b> (
          {Math.ceil(heatExchangerCountRounded)}){' '}
          <HeatExchangerInlineText plural={Math.ceil(heatExchangerCount) > 1} />{' '}
          ({heatExchangerProps.energyConsumption} MW per{' '}
          <HeatExchangerInlineText />
          ).
        </p>
        <p>
          {heatExchangerCountRounded}{' '}
          <HeatExchangerInlineText plural={Math.ceil(heatExchangerCount) > 1} />{' '}
          boil {waterRounded} <WaterInlineText />
          /s to {steamRounded} <SteamInlineText />
          /s ({heatExchangerProps.fluidConsumption} <WaterInlineText />
          /s to {heatExchangerProps.heatOutput} <SteamInlineText />
          /s per <HeatExchangerInlineText />
          ).
        </p>
        <p>
          {waterRounded} <WaterInlineText />
          /s requires <b>{Math.ceil(offshorePumpCount)}</b> (
          {offshorePumpCountRounded}){' '}
          <OffshorePumpInlineText plural={Math.ceil(offshorePumpCount) > 1} /> (
          {offshorePumpProps.pumpingSpeed} <WaterInlineText />
          /s per <OffshorePumpInlineText />
          ).
        </p>
        <p>
          {steamRounded} <SteamInlineText />
          /s is consumed by <b>{Math.ceil(steamTurbineCount)}</b> (
          {steamTurbineCountRounded}){' '}
          <SteamTurbineInlineText plural={Math.ceil(steamTurbineCount) > 1} />,
          producing {electricityOutputRounded} MW electricity (
          {steamTurbineProps.fluidConsumption} <SteamInlineText />
          /s to {steamTurbineProps.powerOutput} MW electricity per{' '}
          <SteamTurbineInlineText />
          ).
        </p>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <img
                  alt="Nuclear Reactor"
                  height="40px"
                  src="https://wiki.factorio.com/images/Nuclear_reactor.png"
                />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <img
                  alt="Offshore Pump"
                  height="40px"
                  src="https://wiki.factorio.com/images/Offshore_pump.png"
                />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <img
                  alt="Heat Exchanger"
                  height="40px"
                  src="https://wiki.factorio.com/images/Heat_exchanger.png"
                />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <img
                  alt="Steam Turbine"
                  height="40px"
                  src="https://wiki.factorio.com/images/Steam_turbine.png"
                />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <img
                  alt="Uranium Fuel Cell"
                  height="40px"
                  src="https://wiki.factorio.com/images/Uranium_fuel_cell.png"
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>{props.nuclearReactorCount}</Table.Cell>
              <Table.Cell>{Math.ceil(offshorePumpCount)}</Table.Cell>
              <Table.Cell>{Math.ceil(heatExchangerCount)}</Table.Cell>
              <Table.Cell>{Math.ceil(steamTurbineCount)}</Table.Cell>
              <Table.Cell>{fuelUsageRoundedPerMin}/min</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Container>
    </div>
  );
};

export default Calculator;
