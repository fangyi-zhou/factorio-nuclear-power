import { Button, Grid, Segment, Popup } from 'semantic-ui-react';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleRadiation,
  faWarning,
} from '@fortawesome/free-solid-svg-icons';
import { ReactorLayout, getNeighbourCount } from './ReactorLayout';

type LayoutProps = {
  layout: ReactorLayout;
  handleClick: (rowIdx: number, cellIdx: number) => void;
  addRow: () => void;
  addCol: () => void;
  removeRow: () => void;
  removeCol: () => void;
  isAutoFillEnabled: boolean;
  toggleAutoFill: () => void;
  reset: () => void;
  neighbouringBonus: number;
};

export const Layout = (props: LayoutProps) => {
  const renderCell = (rowIdx: number, cellIdx: number) => {
    const count = getNeighbourCount(props.layout, rowIdx, cellIdx);
    const sre = 1 + count * props.neighbouringBonus;
    return (
      <Segment style={{ minHeight: '70px', minWidth: '70px' }}>
        <div
          onClick={() => {
            props.handleClick(rowIdx, cellIdx);
          }}
          style={{ textAlign: 'center', height: '100%' }}
          role="button"
          aria-label={`Cell ${rowIdx}, ${cellIdx} (${
            props.layout[rowIdx][cellIdx] ? 'Occupied' : 'Unoccupied'
          })`}
        >
          {props.layout[rowIdx][cellIdx] && (
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

  const maxCol = props.layout[0].length;
  return (
    <Grid celled relaxed columns={'equal'}>
      <Grid.Row centered>
        <div style={{ padding: '10px' }} role="toolbar">
          <p>Click on an empty cell to place a nuclear power plant.</p>
          <Button onClick={props.addRow}>+ Row</Button>
          <Button
            onClick={props.removeRow}
            disabled={props.layout.length === 1}
          >
            - Row
          </Button>
          <Button onClick={props.addCol} disabled={maxCol >= 6}>
            + Column
          </Button>
          <Button onClick={props.removeCol} disabled={maxCol === 1}>
            - Column
          </Button>
          <Button onClick={props.toggleAutoFill}>
            {props.isAutoFillEnabled ? 'Disable' : 'Enable'} Auto Fill
          </Button>
          <Button onClick={props.reset}>Reset</Button>
        </div>
      </Grid.Row>
      {props.layout.map((row, rowIdx) => (
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
