import React from 'react';
import {
  getHeatExchangerProps,
  getNuclearReactorProps,
  getOffshorePumpProps,
  getSteamTurbineProps,
  HeatExchangerProps,
  nuclearReactorNeighbouringBonus,
  NuclearReactorProps,
  OffshorePumpProps,
  Quality,
  SteamTurbineProps,
} from './Constants';

export interface TextDisplayConfig {
  shouldDisplayIcon: boolean;
}

export const defaultTextDisplayConfig: TextDisplayConfig = {
  shouldDisplayIcon: true,
};

export const TextDisplayConfigContext = React.createContext<TextDisplayConfig>(
  defaultTextDisplayConfig
);

export interface EntityConfig {
  nuclearReactorProps: NuclearReactorProps & {
    neighbouringBonus: number;
  };
  heatExchangerProps: HeatExchangerProps;
  offshorePumpProps: OffshorePumpProps;
  steamTurbineProps: SteamTurbineProps;
}

export const defaultEntityConfig: EntityConfig = {
  nuclearReactorProps: {
    ...getNuclearReactorProps(Quality.Normal),
    neighbouringBonus: nuclearReactorNeighbouringBonus,
  },
  heatExchangerProps: getHeatExchangerProps(Quality.Normal),
  offshorePumpProps: getOffshorePumpProps(Quality.Normal),
  steamTurbineProps: getSteamTurbineProps(Quality.Normal),
};

export const EntityConfigContext =
  React.createContext<EntityConfig>(defaultEntityConfig);
