import { Container, Popup, Table } from 'semantic-ui-react';
import React from 'react';

type P = {
  sre: number;
  reactors: number;
};

const baseOutput = 40;

class Calculator extends React.Component<P> {
  render() {
    const power = this.props.sre * baseOutput;
    const heatExchanger = power / 10;
    const steam = heatExchanger * 103.09;
    const steamRounded = Math.round(steam * 100) / 100;
    const offshorePump = steam / 1200; // water = steam
    const offshorePumpRounded = Math.round(offshorePump * 100) / 100;
    const turbine = steam / 60;
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
            This layout produces {power} MW output ({this.props.sre}{' '}
            <Popup content="Single Reactor Equivalent" trigger={<i>SRE</i>} />
            ).
          </p>
          <p>
            {power} MW of power output is consumed by <b>{heatExchanger}</b>{' '}
            <i>Heat Exchangers</i> (10MW per <i>Heat Exchanger</i>).
          </p>
          <p>
            {heatExchanger} <i>Heat Exchangers</i> boil {steamRounded}{' '}
            <i>Water</i> to <i>Steam</i> per second (103.09 per{' '}
            <i>Heat Exchanger</i>).
          </p>
          <p>
            {steamRounded} <i>Water</i> requires{' '}
            <b>{Math.ceil(offshorePump)}</b> ({offshorePumpRounded}){' '}
            <i>Offshore Pumps</i> (1200 per <i>Offshore Pump</i>).
          </p>
          <p>
            {steamRounded} <i>Steam</i> is consumed by{' '}
            <b>{Math.ceil(turbine)}</b> ({turbineRounded}) <i>Steam Turbines</i>{' '}
            (60 per <i>Steam Turbine</i>
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
                <Table.Cell>{this.props.reactors}</Table.Cell>
                <Table.Cell>{Math.ceil(offshorePumpRounded)}</Table.Cell>
                <Table.Cell>{heatExchanger}</Table.Cell>
                <Table.Cell>{Math.ceil(turbineRounded)}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Container>
      </div>
    );
  }
}

export default Calculator;
