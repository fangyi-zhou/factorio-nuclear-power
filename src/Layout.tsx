import { Button, Grid, Segment, Popup } from 'semantic-ui-react';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleRadiation,
  faWarning,
} from '@fortawesome/free-solid-svg-icons';
import {
  ReactorLayout,
  defaultLayout,
  getNeighbourCount,
} from './ReactorLayout';
import { EntityConfigContext } from './Contexts';

type LayoutProps = {
  layout: ReactorLayout;
  setLayout: React.Dispatch<ReactorLayout>;
  isAutoFillEnabled: boolean;
  toggleAutoFill: () => void;
};

export const Layout = ({
  layout,
  setLayout,
  isAutoFillEnabled,
  toggleAutoFill,
}: LayoutProps) => {
  const entityConfig = React.useContext(EntityConfigContext);
  const neighbouringBonus = entityConfig.nuclearReactorProps.neighbouringBonus;

  const addRow = React.useCallback(() => {
    const maxCol = layout[0].length;
    let emptyLine = Array(maxCol);
    emptyLine.fill(isAutoFillEnabled);
    setLayout([...layout, emptyLine]);
  }, [layout, setLayout, isAutoFillEnabled]);

  const removeRow = React.useCallback(() => {
    if (layout.length === 1) return;
    setLayout(layout.slice(0, layout.length - 1));
  }, [layout, setLayout]);

  const addCol = React.useCallback(() => {
    setLayout(layout.map((row) => [...row, isAutoFillEnabled]));
  }, [layout, setLayout, isAutoFillEnabled]);

  const removeCol = React.useCallback(() => {
    if (layout[0].length === 1) return;
    setLayout(layout.map((row) => row.slice(0, row.length - 1)));
  }, [layout, setLayout]);

  const reset = React.useCallback(() => {
    setLayout(defaultLayout());
  }, [setLayout]);

  const toggleCell = React.useCallback(
    (rowIdxToChange: number, cellIdxToChange: number) => {
      const maxRow = layout.length;
      const maxCol = layout[0].length;
      if (rowIdxToChange < 0 || rowIdxToChange >= maxRow) return;
      if (cellIdxToChange < 0 || cellIdxToChange >= maxCol) return;
      setLayout(
        layout.map((row, rowIdx) =>
          rowIdx !== rowIdxToChange
            ? row
            : row.map((cell, cellIdx) =>
                cellIdx !== cellIdxToChange ? cell : !cell
              )
        )
      );
    },
    [layout, setLayout]
  );

  const renderCell = (rowIdx: number, cellIdx: number) => {
    const count = getNeighbourCount(layout, rowIdx, cellIdx);
    const sre = 1 + count * neighbouringBonus;
    return (
      <Segment style={{ minHeight: '70px', minWidth: '70px' }}>
        <div
          onClick={() => {
            toggleCell(rowIdx, cellIdx);
          }}
          style={{ textAlign: 'center', height: '100%' }}
          role="button"
          aria-label={`Cell ${rowIdx}, ${cellIdx} (${
            layout[rowIdx][cellIdx] ? 'Occupied' : 'Unoccupied'
          })`}
        >
          {layout[rowIdx][cellIdx] && (
            <>
              <FontAwesomeIcon icon={faCircleRadiation} size="2xl" />
              <br />
              {count === 4 && (
                <Popup
                  content="This reactor cannot be refueled automatically"
                  trigger={<FontAwesomeIcon icon={faWarning} />}
                />
              )}
              {sre + 'x'}
            </>
          )}
        </div>
      </Segment>
    );
  };

  const maxCol = layout[0].length;
  return (
    <Grid celled relaxed columns={'equal'}>
      <Grid.Row centered>
        <div style={{ padding: '10px' }} role="toolbar">
          <p>Click on an empty cell to place a nuclear power plant.</p>
          <Button onClick={addRow}>+ Row</Button>
          <Button onClick={removeRow} disabled={layout.length === 1}>
            - Row
          </Button>
          <Button onClick={addCol} disabled={maxCol >= 6}>
            + Column
          </Button>
          <Button onClick={removeCol} disabled={maxCol === 1}>
            - Column
          </Button>
          <Button onClick={toggleAutoFill}>
            {isAutoFillEnabled ? 'Disable' : 'Enable'} Auto Fill
          </Button>
          <Button onClick={reset}>Reset</Button>
        </div>
      </Grid.Row>
      {layout.map((row, rowIdx) => (
        <Grid.Row stretched key={`Row-${rowIdx}`}>
          {row.map((cell, cellIdx) => (
            <Grid.Column
              key={`Cell-${rowIdx}-${cellIdx}`}
              style={{ padding: '1em' }}
            >
              {renderCell(rowIdx, cellIdx)}
            </Grid.Column>
          ))}
        </Grid.Row>
      ))}
    </Grid>
  );
};

export default Layout;
