import { Container, Popup, Table } from 'semantic-ui-react';
import React from 'react';
import {
  HeatExchangerProps,
  NuclearReactorProps,
  OffshorePumpProps,
  SteamTurbineProps,
} from './Constants';

type CalculatorProps = {
  sre: number;
  nuclearReactorCount: number;
  nuclearReactorProps: NuclearReactorProps;
  heatExchangerProps: HeatExchangerProps;
  offshorePumpProps: OffshorePumpProps;
  steamTurbineProps: SteamTurbineProps;
};

export const Calculator = (props: CalculatorProps) => {
  const heatOutput = props.sre * props.nuclearReactorProps.heatOutput;

  // Converts all heat from Nuclear Reactor using Heat Exchanger
  const heatExchangerCount =
    heatOutput / props.heatExchangerProps.energyConsumption;
  const heatExchangerCountRounded = Math.round(heatExchangerCount * 100) / 100;

  // Heat Exchanger produces steam
  const steam = heatExchangerCount * props.heatExchangerProps.heatOutput;
  const steamRounded = Math.round(steam * 100) / 100;

  // Heat Exchanger consumes water
  const water = heatExchangerCount * props.heatExchangerProps.fluidConsumption;
  const waterRounded = Math.round(water * 100) / 100;

  // Water comes from Offshore Pump
  const offshorePumpCount = water / props.offshorePumpProps.pumpingSpeed;
  const offshorePumpCountRounded = Math.round(offshorePumpCount * 100) / 100;

  // Steam Turbine consumes steam
  const steamTurbineCount = steam / props.steamTurbineProps.fluidConsumption;
  const steamTurbineCountRounded = Math.round(steamTurbineCount * 100) / 100;

  // Steam Turbine generates Electricity
  const electricityOutput =
    steamTurbineCount * props.steamTurbineProps.powerOutput;
  const electricityOutputRounded = Math.round(electricityOutput * 100) / 100;

  return (
    <div
      style={{
        justifyContent: 'space-around',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Container fluid text>
        <p>
          This layout produces {heatOutput} MW heat output ({props.sre}{' '}
          <Popup content="Single Reactor Equivalent" trigger={<i>SRE</i>} />
          {', '}
          {props.nuclearReactorProps.heatOutput} MW per <i>Nuclear Reactor</i>).
        </p>
        <p>
          {heatOutput} MW of heat output is consumed by{' '}
          <b>{Math.ceil(heatExchangerCount)}</b> (
          {Math.ceil(heatExchangerCountRounded)}) <i>Heat Exchangers</i> (
          {props.heatExchangerProps.energyConsumption} MW per{' '}
          <i>Heat Exchanger</i>).
        </p>
        <p>
          {heatExchangerCountRounded} <i>Heat Exchangers</i> boil {waterRounded}{' '}
          <i>Water</i> to {steamRounded} <i>Steam</i> per second (
          {props.heatExchangerProps.fluidConsumption} <i>Water</i> to{' '}
          {props.heatExchangerProps.heatOutput} <i>Steam</i> per{' '}
          <i>Heat Exchanger</i>
          ).
        </p>
        <p>
          {waterRounded} <i>Water</i> requires{' '}
          <b>{Math.ceil(offshorePumpCount)}</b> ({offshorePumpCountRounded}){' '}
          <i>Offshore Pumps</i> ({props.offshorePumpProps.pumpingSpeed}{' '}
          <i>Water</i>
          per second per <i>Offshore Pump</i>).
        </p>
        <p>
          {steamRounded} <i>Steam</i> is consumed by{' '}
          <b>{Math.ceil(steamTurbineCount)}</b> ({steamTurbineCountRounded}){' '}
          <i>Steam Turbines</i>, producing {electricityOutputRounded} MW
          electricity ({props.steamTurbineProps.fluidConsumption} Steam to{' '}
          {props.steamTurbineProps.powerOutput}MW electricity per{' '}
          <i>Steam Turbine</i>
          ).
        </p>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <img
                  alt="Nuclear Reactor"
                  src="https://wiki.factorio.com/images/thumb/Nuclear_reactor.png/32px-Nuclear_reactor.png"
                ></img>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <img
                  alt="Offshore Pump"
                  src="https://wiki.factorio.com/images/thumb/Offshore_pump.png/32px-Offshore_pump.png"
                ></img>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <img
                  alt="Heat Exchanger"
                  src="https://wiki.factorio.com/images/thumb/Heat_exchanger.png/32px-Heat_exchanger.png"
                ></img>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <img
                  alt="Steam Turbine"
                  src="https://wiki.factorio.com/images/thumb/Steam_turbine.png/32px-Steam_turbine.png"
                ></img>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>{props.nuclearReactorCount}</Table.Cell>
              <Table.Cell>{Math.ceil(offshorePumpCount)}</Table.Cell>
              <Table.Cell>{Math.ceil(heatExchangerCount)}</Table.Cell>
              <Table.Cell>{Math.ceil(steamTurbineCount)}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Container>
    </div>
  );
};

export default Calculator;
