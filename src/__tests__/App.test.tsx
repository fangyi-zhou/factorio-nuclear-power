import { screen, render } from '@testing-library/react';
import { App } from '../App';

describe('App — integration', () => {
  it('renders the title', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', {
        name: 'Factorio Nuclear Power Plant Calculator',
      })
    ).toBeInTheDocument();
  });

  it('default layout (single reactor) shows 40 MW heat output', () => {
    render(<App />);
    expect(
      screen.getByText((_content, element) => {
        return (
          element?.tagName === 'P' &&
          !!element.textContent?.includes('40 MW heat output')
        );
      })
    ).toBeInTheDocument();
  });

  it('default layout shows correct table values for 1 reactor', () => {
    render(<App />);
    const table = screen.getByRole('table', {
      name: 'Building counts summary',
    });
    const rows = table.querySelectorAll('tbody tr');
    const dataRow = rows[rows.length - 1];
    const cells = dataRow.querySelectorAll('td');

    expect(cells[0].textContent).toBe('1'); // reactor count
    expect(cells[1].textContent).toBe('1'); // offshore pumps
    expect(cells[2].textContent).toBe('4'); // heat exchangers
    expect(cells[3].textContent).toBe('7'); // steam turbines
  });

  // Semantic UI Checkbox renders custom elements without standard ARIA roles,
  // so we fall back to getByText for these toggles.
  it('renders Dark Theme toggle', () => {
    render(<App />);
    expect(screen.getByText('Dark Theme')).toBeInTheDocument();
  });

  it('renders Hide Inline Icons toggle', () => {
    render(<App />);
    expect(screen.getByText('Hide Inline Icons')).toBeInTheDocument();
  });

  it('renders Select Quality toggle', () => {
    render(<App />);
    expect(screen.getByText('Select Quality')).toBeInTheDocument();

    // CustomisationPanel should not be visible initially
    expect(screen.queryByText('Neighbouring Bonus')).not.toBeInTheDocument();
  });
});
