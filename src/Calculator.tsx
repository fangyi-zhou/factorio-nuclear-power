import { Container, Popup, Table } from 'semantic-ui-react';
import React from 'react';

type CalculatorProps = {
  sre: number;
  reactorCount: number;
  reactorOutput: number;
  heatExchangerConsumption: number;
  heatExchangerOutput: number;
  heatExchangerOutputRatio: number;
  offshorePumpOutput: number;
  steamTurbineConsumption: number;
};

export const Calculator = (props: CalculatorProps) => {
  const power = props.sre * props.reactorOutput;
  const heatExchanger = power / props.heatExchangerConsumption;
  const steam = heatExchanger * props.heatExchangerOutput;
  const steamRounded = Math.round(steam * 100) / 100;
  const water = steam / props.heatExchangerOutputRatio; // water : steam = ratio
  const waterRounded = Math.round(water * 1000) / 1000;
  const offshorePump = water / props.offshorePumpOutput;
  const offshorePumpRounded = Math.round(offshorePump * 100) / 100;
  const turbine = steam / props.steamTurbineConsumption;
  const turbineRounded = Math.round(turbine * 100) / 100;

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
          This layout produces {power} MW output ({props.sre}{' '}
          <Popup content="Single Reactor Equivalent" trigger={<i>SRE</i>} />
          {', '}
          {props.reactorOutput} MW per reactor).
        </p>
        <p>
          {power} MW of power output is consumed by <b>{heatExchanger}</b>{' '}
          <i>Heat Exchangers</i> ({props.heatExchangerConsumption} MW per{' '}
          <i>Heat Exchanger</i>).
        </p>
        <p>
          {heatExchanger} <i>Heat Exchangers</i> boil {waterRounded}{' '}
          <i>Water</i> to {steamRounded} <i>Steam</i> per second (
          {props.heatExchangerOutput} per <i>Heat Exchanger</i>).
        </p>
        <p>
          {waterRounded} <i>Water</i> requires <b>{Math.ceil(offshorePump)}</b>{' '}
          ({offshorePumpRounded}) <i>Offshore Pumps</i> (
          {props.offshorePumpOutput} per <i>Offshore Pump</i>).
        </p>
        <p>
          {steamRounded} <i>Steam</i> is consumed by <b>{Math.ceil(turbine)}</b>{' '}
          ({turbineRounded}) <i>Steam Turbines</i> (
          {props.steamTurbineConsumption} per <i>Steam Turbine</i>
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
              <Table.Cell>{props.reactorCount}</Table.Cell>
              <Table.Cell>{Math.ceil(offshorePumpRounded)}</Table.Cell>
              <Table.Cell>{heatExchanger}</Table.Cell>
              <Table.Cell>{Math.ceil(turbineRounded)}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Container>
    </div>
  );
};

export default Calculator;
