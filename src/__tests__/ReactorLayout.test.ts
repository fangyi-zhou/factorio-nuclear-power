import { defaultLayout, getNeighbourCount, ReactorLayout } from '../ReactorLayout';

describe('defaultLayout', () => {
  it('returns a 3x3 grid', () => {
    const layout = defaultLayout();
    expect(layout).toHaveLength(3);
    layout.forEach((row) => expect(row).toHaveLength(3));
  });

  it('has only the center cell occupied', () => {
    const layout = defaultLayout();
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (r === 1 && c === 1) {
          expect(layout[r][c]).toBe(true);
        } else {
          expect(layout[r][c]).toBe(false);
        }
      }
    }
  });

  it('returns a new array each call', () => {
    const a = defaultLayout();
    const b = defaultLayout();
    expect(a).not.toBe(b);
    expect(a).toEqual(b);
  });
});

describe('getNeighbourCount', () => {
  it('returns 0 for an unoccupied cell', () => {
    const layout: ReactorLayout = [
      [false, true],
      [true, false],
    ];
    expect(getNeighbourCount(layout, 0, 0)).toBe(0);
    expect(getNeighbourCount(layout, 1, 1)).toBe(0);
  });

  it('returns 0 for an isolated reactor', () => {
    const layout: ReactorLayout = [
      [false, false, false],
      [false, true, false],
      [false, false, false],
    ];
    expect(getNeighbourCount(layout, 1, 1)).toBe(0);
  });

  it('returns 4 for a fully surrounded reactor', () => {
    const layout: ReactorLayout = [
      [false, true, false],
      [true, true, true],
      [false, true, false],
    ];
    expect(getNeighbourCount(layout, 1, 1)).toBe(4);
  });

  it('does not count diagonal neighbours', () => {
    const layout: ReactorLayout = [
      [true, false, true],
      [false, true, false],
      [true, false, true],
    ];
    expect(getNeighbourCount(layout, 1, 1)).toBe(0);
  });

  it('returns 2 for a corner reactor in a full 2x2 grid', () => {
    const layout: ReactorLayout = [
      [true, true],
      [true, true],
    ];
    expect(getNeighbourCount(layout, 0, 0)).toBe(2);
    expect(getNeighbourCount(layout, 0, 1)).toBe(2);
    expect(getNeighbourCount(layout, 1, 0)).toBe(2);
    expect(getNeighbourCount(layout, 1, 1)).toBe(2);
  });

  it('returns 3 for an edge reactor in a full 3x3 grid', () => {
    const layout: ReactorLayout = [
      [true, true, true],
      [true, true, true],
      [true, true, true],
    ];
    expect(getNeighbourCount(layout, 0, 1)).toBe(3);
    expect(getNeighbourCount(layout, 1, 0)).toBe(3);
    expect(getNeighbourCount(layout, 1, 2)).toBe(3);
    expect(getNeighbourCount(layout, 2, 1)).toBe(3);
  });

  it('handles a 1x1 grid', () => {
    const layout: ReactorLayout = [[true]];
    expect(getNeighbourCount(layout, 0, 0)).toBe(0);
  });

  it('handles a 1xN grid', () => {
    const layout: ReactorLayout = [[true, true, true]];
    expect(getNeighbourCount(layout, 0, 0)).toBe(1);
    expect(getNeighbourCount(layout, 0, 1)).toBe(2);
    expect(getNeighbourCount(layout, 0, 2)).toBe(1);
  });

  it('handles an Nx1 grid', () => {
    const layout: ReactorLayout = [[true], [true], [true]];
    expect(getNeighbourCount(layout, 0, 0)).toBe(1);
    expect(getNeighbourCount(layout, 1, 0)).toBe(2);
    expect(getNeighbourCount(layout, 2, 0)).toBe(1);
  });

  it('returns 1 for each reactor in a 2x1 layout', () => {
    const layout: ReactorLayout = [[true, true]];
    expect(getNeighbourCount(layout, 0, 0)).toBe(1);
    expect(getNeighbourCount(layout, 0, 1)).toBe(1);
  });

  it('returns correct counts for a 2x3 full grid', () => {
    const layout: ReactorLayout = [
      [true, true, true],
      [true, true, true],
    ];
    // corners have 2 neighbours, edges have 3
    expect(getNeighbourCount(layout, 0, 0)).toBe(2);
    expect(getNeighbourCount(layout, 0, 1)).toBe(3);
    expect(getNeighbourCount(layout, 0, 2)).toBe(2);
    expect(getNeighbourCount(layout, 1, 0)).toBe(2);
    expect(getNeighbourCount(layout, 1, 1)).toBe(3);
    expect(getNeighbourCount(layout, 1, 2)).toBe(2);
  });
});
