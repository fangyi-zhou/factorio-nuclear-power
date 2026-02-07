import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Layout } from '../Layout';
import { renderWithProviders } from './test-utils';
import { defaultLayout, ReactorLayout } from '../ReactorLayout';

function renderLayout(
  overrides: {
    layout?: ReactorLayout;
    setLayout?: ReturnType<typeof vi.fn>;
    isAutoFillEnabled?: boolean;
    toggleAutoFill?: ReturnType<typeof vi.fn>;
  } = {}
) {
  const setLayout = overrides.setLayout ?? vi.fn();
  const toggleAutoFill = overrides.toggleAutoFill ?? vi.fn();
  const layout = overrides.layout ?? defaultLayout();
  const isAutoFillEnabled = overrides.isAutoFillEnabled ?? false;

  const result = renderWithProviders(
    <Layout
      layout={layout}
      setLayout={setLayout}
      isAutoFillEnabled={isAutoFillEnabled}
      toggleAutoFill={toggleAutoFill}
    />
  );

  return { ...result, setLayout, toggleAutoFill };
}

describe('Layout — button states', () => {
  it('disables - Row when there is only 1 row', () => {
    renderLayout({ layout: [[true, false, false]] });
    expect(screen.getByRole('button', { name: '- Row' })).toBeDisabled();
  });

  it('enables - Row when there are multiple rows', () => {
    renderLayout({ layout: [[true], [false]] });
    expect(screen.getByRole('button', { name: '- Row' })).not.toBeDisabled();
  });

  it('disables - Column when there is only 1 column', () => {
    renderLayout({ layout: [[true], [false], [false]] });
    expect(screen.getByRole('button', { name: '- Column' })).toBeDisabled();
  });

  it('enables - Column when there are multiple columns', () => {
    renderLayout({ layout: [[true, false]] });
    expect(screen.getByRole('button', { name: '- Column' })).not.toBeDisabled();
  });

  it('disables + Column at 8 columns', () => {
    const row = Array(8).fill(false);
    renderLayout({ layout: [row] });
    expect(screen.getByRole('button', { name: '+ Column' })).toBeDisabled();
  });

  it('enables + Column when under 8 columns', () => {
    const row = Array(7).fill(false);
    renderLayout({ layout: [row] });
    expect(screen.getByRole('button', { name: '+ Column' })).not.toBeDisabled();
  });
});

describe('Layout — cell rendering', () => {
  it('renders cells with correct aria labels', () => {
    renderLayout({
      layout: [
        [true, false],
        [false, true],
      ],
    });

    expect(
      screen.getByRole('button', { name: 'Cell 0, 0 (Occupied)' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Cell 0, 1 (Unoccupied)' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Cell 1, 0 (Unoccupied)' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Cell 1, 1 (Occupied)' })
    ).toBeInTheDocument();
  });

  it('shows SRE multiplier text for occupied cells', () => {
    renderLayout({
      layout: [[true, true]],
    });

    // Each has 1 neighbour, so sre = 1 + 1*1 = 2x
    expect(screen.getAllByText('2x')).toHaveLength(2);
  });
});

describe('Layout — interactions', () => {
  it('+ Row calls setLayout with an added row', async () => {
    const user = userEvent.setup();
    const { setLayout } = renderLayout({
      layout: [[true, false]],
    });

    await user.click(screen.getByRole('button', { name: '+ Row' }));
    expect(setLayout).toHaveBeenCalledWith([
      [true, false],
      [false, false],
    ]);
  });

  it('+ Row with auto-fill adds a filled row', async () => {
    const user = userEvent.setup();
    const { setLayout } = renderLayout({
      layout: [[true, false]],
      isAutoFillEnabled: true,
    });

    await user.click(screen.getByRole('button', { name: '+ Row' }));
    expect(setLayout).toHaveBeenCalledWith([
      [true, false],
      [true, true],
    ]);
  });

  it('- Row calls setLayout with last row removed', async () => {
    const user = userEvent.setup();
    const { setLayout } = renderLayout({
      layout: [
        [true, false],
        [false, true],
      ],
    });

    await user.click(screen.getByRole('button', { name: '- Row' }));
    expect(setLayout).toHaveBeenCalledWith([[true, false]]);
  });

  it('+ Column calls setLayout with an added column', async () => {
    const user = userEvent.setup();
    const { setLayout } = renderLayout({
      layout: [[true], [false]],
    });

    await user.click(screen.getByRole('button', { name: '+ Column' }));
    expect(setLayout).toHaveBeenCalledWith([
      [true, false],
      [false, false],
    ]);
  });

  it('+ Column with auto-fill adds filled columns', async () => {
    const user = userEvent.setup();
    const { setLayout } = renderLayout({
      layout: [[true], [false]],
      isAutoFillEnabled: true,
    });

    await user.click(screen.getByRole('button', { name: '+ Column' }));
    expect(setLayout).toHaveBeenCalledWith([
      [true, true],
      [false, true],
    ]);
  });

  it('- Column calls setLayout with last column removed', async () => {
    const user = userEvent.setup();
    const { setLayout } = renderLayout({
      layout: [
        [true, false],
        [false, true],
      ],
    });

    await user.click(screen.getByRole('button', { name: '- Column' }));
    expect(setLayout).toHaveBeenCalledWith([[true], [false]]);
  });

  it('clicking a cell toggles its state', async () => {
    const user = userEvent.setup();
    const { setLayout } = renderLayout({
      layout: [
        [true, false],
        [false, true],
      ],
    });

    // Click on occupied cell (0,0) to unoccupy it
    await user.click(
      screen.getByRole('button', { name: 'Cell 0, 0 (Occupied)' })
    );
    expect(setLayout).toHaveBeenCalledWith([
      [false, false],
      [false, true],
    ]);
  });

  it('clicking an unoccupied cell fills it', async () => {
    const user = userEvent.setup();
    const { setLayout } = renderLayout({
      layout: [
        [true, false],
        [false, true],
      ],
    });

    await user.click(
      screen.getByRole('button', { name: 'Cell 0, 1 (Unoccupied)' })
    );
    expect(setLayout).toHaveBeenCalledWith([
      [true, true],
      [false, true],
    ]);
  });

  it('Reset calls setLayout with default layout', async () => {
    const user = userEvent.setup();
    const { setLayout } = renderLayout({
      layout: [
        [true, true],
        [true, true],
      ],
    });

    await user.click(screen.getByRole('button', { name: 'Reset' }));
    expect(setLayout).toHaveBeenCalledWith(defaultLayout());
  });

  it('Auto Fill toggle calls toggleAutoFill', async () => {
    const user = userEvent.setup();
    const { toggleAutoFill } = renderLayout();

    await user.click(screen.getByRole('button', { name: 'Enable Auto Fill' }));
    expect(toggleAutoFill).toHaveBeenCalledTimes(1);
  });
});
