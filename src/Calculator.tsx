import { Container, Segment } from 'fomantic-ui-react';
import React from 'react';

type P = {
  output: number;
};

class Calculator extends React.Component<P> {
  render() {
    const power = this.props.output;
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
        <Container text>
          <p>This layout produces {this.props.output} MW output.</p>
          <p>
            {power} MW of power output is consumed by {heatExchanger}{' '}
            <i>Heat Exchangers</i> (10MW per <i>Heat Exchanger</i>).
          </p>
          <p>
            {heatExchanger} <i>Heat Exchangers</i> boil {steamRounded}{' '}
            <i>Water</i> to <i>Steam</i> per second (103.09 per{' '}
            <i>Heat Exchanger</i>).
          </p>
          <p>
            {steamRounded} <i>Water</i> requires {Math.ceil(offshorePump)} (
            {offshorePumpRounded}) <i>Offshore Pumps</i> (1200 per{' '}
            <i>Offshore Pump</i>).
          </p>
          <p>
            {steamRounded} <i>Steam</i> is consumed by {Math.ceil(turbine)} (
            {turbineRounded}) <i>Steam Turbines</i> (60 per <i>Steam Turbine</i>
            ).
          </p>
        </Container>
      </div>
    );
  }
}

export default Calculator;
