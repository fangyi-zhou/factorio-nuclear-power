import { Button, Grid, Segment, Popup } from 'semantic-ui-react';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleRadiation,
  faWarning,
} from '@fortawesome/free-solid-svg-icons';
import { ReactorLayout, getOutputMultiplier } from './ReactorLayout';

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
};

export const Layout = (props: LayoutProps) => {
  const renderCell = (rowIdx: number, cellIdx: number) => {
    const count = getOutputMultiplier(props.layout, rowIdx, cellIdx);
    return (
      <Segment style={{ minHeight: '70px', minWidth: '70px' }}>
        <div
          onClick={() => {
            props.handleClick(rowIdx, cellIdx);
          }}
          style={{ textAlign: 'center', height: '100%' }}
        >
          {count !== 0 && (
            <>
              <FontAwesomeIcon icon={faCircleRadiation} size="2xl" />
              <br />
              {count >= 5 && (
                <Popup
                  content="This reactor cannot be refueled automatically"
                  trigger={<FontAwesomeIcon icon={faWarning} />}
                />
              )}
              {count + 'x'}
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
        <div style={{ padding: '10px' }}>
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
