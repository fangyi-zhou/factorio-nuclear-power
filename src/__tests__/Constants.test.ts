import {
  Quality,
  getNuclearReactorProps,
  getHeatExchangerProps,
  getOffshorePumpProps,
  getSteamTurbineProps,
  nuclearReactorNeighbouringBonus,
  nuclearFuelCellEnergyValue,
} from '../Constants';

describe('nuclearReactorNeighbouringBonus', () => {
  it('equals 1', () => {
    expect(nuclearReactorNeighbouringBonus).toBe(1);
  });
});

describe('nuclearFuelCellEnergyValue', () => {
  it('equals 8000', () => {
    expect(nuclearFuelCellEnergyValue).toBe(8000);
  });
});

describe('getNuclearReactorProps', () => {
  it.each([
    [Quality.Normal, 40],
    [Quality.Uncommon, 52],
    [Quality.Rare, 64],
    [Quality.Epic, 76],
    [Quality.Legendary, 100],
  ])('quality %i returns heatOutput %i', (quality, heatOutput) => {
    expect(getNuclearReactorProps(quality).heatOutput).toBe(heatOutput);
  });
});

describe('getHeatExchangerProps', () => {
  it.each([
    [Quality.Normal, 10, 103, 10.3],
    [Quality.Uncommon, 13, 134, 13.4],
    [Quality.Rare, 16, 165, 16.5],
    [Quality.Epic, 19, 196, 19.6],
    [Quality.Legendary, 25, 258, 25.8],
  ])(
    'quality %i returns energyConsumption %i, heatOutput %i, fluidConsumption %f',
    (quality, energyConsumption, heatOutput, fluidConsumption) => {
      const props = getHeatExchangerProps(quality);
      expect(props.energyConsumption).toBe(energyConsumption);
      expect(props.heatOutput).toBe(heatOutput);
      expect(props.fluidConsumption).toBe(fluidConsumption);
    }
  );
});

describe('getOffshorePumpProps', () => {
  it.each([
    [Quality.Normal, 1200],
    [Quality.Uncommon, 1560],
    [Quality.Rare, 1920],
    [Quality.Epic, 2280],
    [Quality.Legendary, 3000],
  ])('quality %i returns pumpingSpeed %i', (quality, pumpingSpeed) => {
    expect(getOffshorePumpProps(quality).pumpingSpeed).toBe(pumpingSpeed);
  });
});

describe('getSteamTurbineProps', () => {
  it.each([
    [Quality.Normal, 60, 5.82],
    [Quality.Uncommon, 78, 7.57],
    [Quality.Rare, 96, 9.31],
    [Quality.Epic, 114, 11.06],
    [Quality.Legendary, 150, 14.55],
  ])(
    'quality %i returns fluidConsumption %i, powerOutput %f',
    (quality, fluidConsumption, powerOutput) => {
      const props = getSteamTurbineProps(quality);
      expect(props.fluidConsumption).toBe(fluidConsumption);
      expect(props.powerOutput).toBe(powerOutput);
    }
  );
});
