import React from 'react';
import {
  getHeatExchangerProps,
  getNuclearReactorProps,
  getOffshorePumpProps,
  getSteamTurbineProps,
  Quality,
} from './Constants';
import { EntityConfig, EntityConfigContext } from './Contexts';
import {
  Radio,
  Table,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from 'semantic-ui-react';

interface QualitySelectorProps {
  quality: Quality;
  setQuality: React.Dispatch<Quality>;
}
const QualitySelector = ({ quality, setQuality }: QualitySelectorProps) => {
  return (
    <div>
      <Radio
        label="Normal"
        checked={quality === Quality.Normal}
        onClick={() => setQuality(Quality.Normal)}
      />
      &nbsp;
      <Radio
        label="Uncommon"
        checked={quality === Quality.Uncommon}
        onClick={() => setQuality(Quality.Uncommon)}
      />
      &nbsp;
      <Radio
        label="Rare"
        checked={quality === Quality.Rare}
        onClick={() => setQuality(Quality.Rare)}
      />
      &nbsp;
      <Radio
        label="Epic"
        checked={quality === Quality.Epic}
        onClick={() => setQuality(Quality.Epic)}
      />
      &nbsp;
      <Radio
        label="Legendary"
        checked={quality === Quality.Legendary}
        onClick={() => setQuality(Quality.Legendary)}
      />
    </div>
  );
};

interface CustomisationPanelProps {
  entityConfig: EntityConfig;
  setEntityConfig: React.Dispatch<EntityConfig>;
}

export const CustomisationPanel = ({
  setEntityConfig,
}: CustomisationPanelProps) => {
  const entityConfig = React.useContext(EntityConfigContext);
  const {
    nuclearReactorProps,
    heatExchangerProps,
    offshorePumpProps,
    steamTurbineProps,
  } = entityConfig;
  const [nuclearReactorQuality, setNuclearReactorQuality] = React.useState(
    Quality.Normal
  );
  React.useEffect(() => {
    setEntityConfig({
      ...entityConfig,
      nuclearReactorProps: {
        ...entityConfig.nuclearReactorProps,
        ...getNuclearReactorProps(nuclearReactorQuality),
      },
    });
  }, [nuclearReactorQuality, entityConfig, setEntityConfig]);
  const [heatExchangerQuality, setHeatExchangerQuality] = React.useState(
    Quality.Normal
  );
  React.useEffect(() => {
    setEntityConfig({
      ...entityConfig,
      heatExchangerProps: getHeatExchangerProps(heatExchangerQuality),
    });
  }, [heatExchangerQuality, entityConfig, setEntityConfig]);
  const [offshorePumpQuality, setOffshorePumpQuality] = React.useState(
    Quality.Normal
  );
  React.useEffect(() => {
    setEntityConfig({
      ...entityConfig,
      offshorePumpProps: getOffshorePumpProps(offshorePumpQuality),
    });
  }, [offshorePumpQuality, entityConfig, setEntityConfig]);
  const [steamTurbineQuality, setSteamTurbineQuality] = React.useState(
    Quality.Normal
  );
  React.useEffect(() => {
    setEntityConfig({
      ...entityConfig,
      steamTurbineProps: getSteamTurbineProps(steamTurbineQuality),
    });
  }, [steamTurbineQuality, entityConfig, setEntityConfig]);
  return (
    <>
      <Table structured>
        <TableHeader>
          <TableHeaderCell>Entity</TableHeaderCell>
          <TableHeaderCell>Quality</TableHeaderCell>
          <TableHeaderCell>Parameter</TableHeaderCell>
          <TableHeaderCell>Value</TableHeaderCell>
        </TableHeader>
        <TableRow>
          <TableCell rowSpan={2}>Nuclear Reactor</TableCell>
          <TableCell rowSpan={2}>
            <QualitySelector
              quality={nuclearReactorQuality}
              setQuality={setNuclearReactorQuality}
            />
          </TableCell>
          <TableCell>Heat Output</TableCell>
          <TableCell>{nuclearReactorProps.heatOutput} MW</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Neighbouring Bonus</TableCell>
          <TableCell>{nuclearReactorProps.neighbouringBonus * 100}%</TableCell>
        </TableRow>
        <TableRow>
          <TableCell rowSpan={3}>Heat Exchanger</TableCell>
          <TableCell rowSpan={3}>
            <QualitySelector
              quality={heatExchangerQuality}
              setQuality={setHeatExchangerQuality}
            />
          </TableCell>
          <TableCell>Energy Consumption</TableCell>
          <TableCell>{heatExchangerProps.energyConsumption} MW</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Fluid Consumption</TableCell>
          <TableCell>{heatExchangerProps.fluidConsumption} Water/s</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Heat Output</TableCell>
          <TableCell>{heatExchangerProps.heatOutput} Steam/s</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Offshore Pump</TableCell>
          <TableCell>
            <QualitySelector
              quality={offshorePumpQuality}
              setQuality={setOffshorePumpQuality}
            />
          </TableCell>
          <TableCell>Pumping Speed</TableCell>
          <TableCell>{offshorePumpProps.pumpingSpeed} Water/s</TableCell>
        </TableRow>
        <TableRow>
          <TableCell rowSpan={2}>Steam Turbine</TableCell>
          <TableCell rowSpan={2}>
            <QualitySelector
              quality={steamTurbineQuality}
              setQuality={setSteamTurbineQuality}
            />
          </TableCell>
          <TableCell>Fluid Consumption</TableCell>
          <TableCell>{steamTurbineProps.fluidConsumption} Steam/s</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Electricity Output</TableCell>
          <TableCell>{steamTurbineProps.powerOutput} MW</TableCell>
        </TableRow>
      </Table>
    </>
  );
};
