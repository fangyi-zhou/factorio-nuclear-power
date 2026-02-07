import { screen } from '@testing-library/react';
import { Calculator } from '../Calculator';
import { renderWithProviders } from './test-utils';
import { EntityConfig } from '../Contexts';
import {
  Quality,
  getNuclearReactorProps,
  getHeatExchangerProps,
  getOffshorePumpProps,
  getSteamTurbineProps,
  nuclearReactorNeighbouringBonus,
} from '../Constants';

function getTableCells() {
  const table = screen.getByRole('table', { name: 'Building counts summary' });
  const rows = table.querySelectorAll('tbody tr');
  const dataRow = rows[rows.length - 1];
  const cells = dataRow.querySelectorAll('td');
  return {
    reactorCount: cells[0].textContent!,
    pumpCount: cells[1].textContent!,
    heCount: cells[2].textContent!,
    turbineCount: cells[3].textContent!,
    fuelUsage: cells[4].textContent!,
  };
}

describe('Calculator — wiki ratio verification (Normal quality)', () => {
  it.each([
    {
      label: '1 reactor',
      sre: 1,
      reactors: 1,
      heat: 40,
      he: 4,
      pumps: 1,
      turbines: 7,
    },
    {
      label: '2x1',
      sre: 4,
      reactors: 2,
      heat: 160,
      he: 16,
      pumps: 1,
      turbines: 28,
    },
    {
      label: '2x2',
      sre: 12,
      reactors: 4,
      heat: 480,
      he: 48,
      pumps: 1,
      turbines: 83,
    },
    {
      label: '2x3',
      sre: 20,
      reactors: 6,
      heat: 800,
      he: 80,
      pumps: 1,
      turbines: 138,
    },
  ])(
    '$label (sre=$sre): $heat MW, $he HE, $pumps pump(s), $turbines turbines',
    ({ sre, reactors, heat, he, pumps, turbines }) => {
      renderWithProviders(
        <Calculator sre={sre} nuclearReactorCount={reactors} />
      );

      // Verify heat output text
      expect(
        screen.getByText((_content, element) => {
          return (
            element?.tagName === 'P' &&
            !!element.textContent?.includes(`${heat} MW heat output`)
          );
        })
      ).toBeInTheDocument();

      // Verify table values
      const cells = getTableCells();
      expect(cells.reactorCount).toBe(String(reactors));
      expect(cells.pumpCount).toBe(String(pumps));
      expect(cells.heCount).toBe(String(he));
      expect(cells.turbineCount).toBe(String(turbines));
    }
  );
});

describe('Calculator — Legendary quality', () => {
  it('produces different results for legendary quality', () => {
    const legendaryConfig: EntityConfig = {
      nuclearReactorProps: {
        ...getNuclearReactorProps(Quality.Legendary),
        neighbouringBonus: nuclearReactorNeighbouringBonus,
      },
      heatExchangerProps: getHeatExchangerProps(Quality.Legendary),
      offshorePumpProps: getOffshorePumpProps(Quality.Legendary),
      steamTurbineProps: getSteamTurbineProps(Quality.Legendary),
    };

    // Single reactor: sre=1, heat=100MW
    // HE = 100/25 = 4, water = 4*25.8 = 103.2, pumps = 103.2/3000 = 0.0344 -> ceil 1
    // steam = 4*258 = 1032, turbines = 1032/150 = 6.88 -> ceil 7
    renderWithProviders(<Calculator sre={1} nuclearReactorCount={1} />, {
      entityConfig: legendaryConfig,
    });

    expect(
      screen.getByText((_content, element) => {
        return (
          element?.tagName === 'P' &&
          !!element.textContent?.includes('100 MW heat output')
        );
      })
    ).toBeInTheDocument();

    const cells = getTableCells();
    expect(cells.reactorCount).toBe('1');
    expect(cells.heCount).toBe('4');
    expect(cells.pumpCount).toBe('1');
    expect(cells.turbineCount).toBe('7');
  });
});

describe('Calculator — fuel consumption', () => {
  it('shows correct fuel usage for single reactor', () => {
    renderWithProviders(<Calculator sre={1} nuclearReactorCount={1} />);

    // fuelUsagePerMin = 1 / (8000 / (1 * 40) / 60) = 1 / (200/60) = 60/200 = 0.3
    const cells = getTableCells();
    expect(cells.fuelUsage).toBe('0.3/min');
  });

  it('shows correct fuel usage for 2x1 (2 reactors)', () => {
    renderWithProviders(<Calculator sre={4} nuclearReactorCount={2} />);

    // fuelUsagePerMin = 1 / (8000 / (2 * 40) / 60) = 1 / (100/60) = 60/100 = 0.6
    const cells = getTableCells();
    expect(cells.fuelUsage).toBe('0.6/min');
  });
});
