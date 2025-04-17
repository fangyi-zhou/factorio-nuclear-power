export enum Quality {
  Normal,
  Uncommon,
  Rare,
  Epic,
  Legendary,
}

// Nuclear Reactor
export interface NuclearReactorProps {
  heatOutput: number;
}

const normalNuclearReactor: NuclearReactorProps = {
  heatOutput: 40,
};

const uncommonNuclearReactor: NuclearReactorProps = {
  heatOutput: 52,
};

const rareNuclearReactor: NuclearReactorProps = {
  heatOutput: 64,
};

const epicNuclearReactor: NuclearReactorProps = {
  heatOutput: 76,
};

const legendaryNuclearReactor: NuclearReactorProps = {
  heatOutput: 100,
};

export const nuclearReactorNeighbouringBonus = 1;

export const getNuclearReactorProps = (quality: Quality) => {
  switch (quality) {
    case Quality.Normal:
      return normalNuclearReactor;
    case Quality.Uncommon:
      return uncommonNuclearReactor;
    case Quality.Rare:
      return rareNuclearReactor;
    case Quality.Epic:
      return epicNuclearReactor;
    case Quality.Legendary:
      return legendaryNuclearReactor;
  }
};

// Heat Exchanger
export interface HeatExchangerProps {
  energyConsumption: number;
  heatOutput: number;
  fluidConsumption: number;
}

const normalHeatExchanger: HeatExchangerProps = {
  energyConsumption: 10,
  heatOutput: 103,
  fluidConsumption: 10.3,
};

const uncommonHeatExchanger: HeatExchangerProps = {
  energyConsumption: 13,
  heatOutput: 134,
  fluidConsumption: 13.4,
};

const rareHeatExchanger: HeatExchangerProps = {
  energyConsumption: 16,
  heatOutput: 165,
  fluidConsumption: 16.5,
};

const epicHeatExchanger: HeatExchangerProps = {
  energyConsumption: 19,
  heatOutput: 196,
  fluidConsumption: 19.6,
};

const legendaryHeatExchanger: HeatExchangerProps = {
  energyConsumption: 25,
  heatOutput: 258,
  fluidConsumption: 25.8,
};

export const getHeatExchangerProps = (quality: Quality) => {
  switch (quality) {
    case Quality.Normal:
      return normalHeatExchanger;
    case Quality.Uncommon:
      return uncommonHeatExchanger;
    case Quality.Rare:
      return rareHeatExchanger;
    case Quality.Epic:
      return epicHeatExchanger;
    case Quality.Legendary:
      return legendaryHeatExchanger;
  }
};

// Offshore Pump
export interface OffshorePumpProps {
  pumpingSpeed: number;
}

const normalOffshorePump: OffshorePumpProps = {
  pumpingSpeed: 1200,
};

const uncommonOffshorePump: OffshorePumpProps = {
  pumpingSpeed: 1560,
};

const rareOffshorePump: OffshorePumpProps = {
  pumpingSpeed: 1920,
};

const epicOffshorePump: OffshorePumpProps = {
  pumpingSpeed: 2280,
};

const legendaryOffshorePump: OffshorePumpProps = {
  pumpingSpeed: 3000,
};

export const getOffshorePumpProps = (quality: Quality) => {
  switch (quality) {
    case Quality.Normal:
      return normalOffshorePump;
    case Quality.Uncommon:
      return uncommonOffshorePump;
    case Quality.Rare:
      return rareOffshorePump;
    case Quality.Epic:
      return epicOffshorePump;
    case Quality.Legendary:
      return legendaryOffshorePump;
  }
};

// Steam Turbine
export interface SteamTurbineProps {
  fluidConsumption: number;
  powerOutput: number;
}

const normalSteamTurbine: SteamTurbineProps = {
  fluidConsumption: 60,
  powerOutput: 5.82,
};

const uncommonSteamTurbine: SteamTurbineProps = {
  fluidConsumption: 78,
  powerOutput: 7.57,
};

const rareSteamTurbine: SteamTurbineProps = {
  fluidConsumption: 96,
  powerOutput: 9.31,
};

const epicSteamTurbine: SteamTurbineProps = {
  fluidConsumption: 114,
  powerOutput: 11.06,
};

const legendarySteamTurbine: SteamTurbineProps = {
  fluidConsumption: 150,
  powerOutput: 14.55,
};

export const getSteamTurbineProps = (quality: Quality) => {
  switch (quality) {
    case Quality.Normal:
      return normalSteamTurbine;
    case Quality.Uncommon:
      return uncommonSteamTurbine;
    case Quality.Rare:
      return rareSteamTurbine;
    case Quality.Epic:
      return epicSteamTurbine;
    case Quality.Legendary:
      return legendarySteamTurbine;
  }
};

export const nuclearFuelCellEnergyValue = 8000; // This is not subject to quality
