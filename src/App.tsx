import React from 'react';
import {
  Checkbox,
  Container,
  Divider,
  Grid,
  GridColumn,
  GridRow,
  Header,
} from 'semantic-ui-react';
import Layout from './Layout';
import Calculator from './Calculator';
import {
  ReactorLayout,
  defaultLayout,
  getNeighbourCount,
} from './ReactorLayout';
import {
  defaultEntityConfig,
  defaultTextDisplayConfig,
  EntityConfig,
  EntityConfigContext,
  TextDisplayConfig,
  TextDisplayConfigContext,
} from './Contexts';
import { CustomisationPanel } from './CustomisationPanel';

interface State {
  entityConfig: EntityConfig;
  textDisplayConfig: TextDisplayConfig;
  layout: ReactorLayout;
}

const defaultAppState = () => ({
  entityConfig: defaultEntityConfig,
  textDisplayConfig: defaultTextDisplayConfig,
  layout: defaultLayout(),
});

type LayoutChangeAction = {
  change: 'layout';
  newLayout: ReactorLayout;
};

type ToggleDisplayIconsAction = {
  change: 'toggle_display_icon';
};

type EntityConfigChangeAction = {
  change: 'entity_config';
  newEntityConfig: EntityConfig;
};

type Action =
  | LayoutChangeAction
  | ToggleDisplayIconsAction
  | EntityConfigChangeAction;

const reducer = (prevState: State, action: Action): State => {
  switch (action.change) {
    case 'layout':
      return {
        ...prevState,
        layout: action.newLayout,
      };
    case 'toggle_display_icon':
      return {
        ...prevState,
        textDisplayConfig: {
          shouldDisplayIcon: !prevState.textDisplayConfig.shouldDisplayIcon,
        },
      };
    case 'entity_config':
      return {
        ...prevState,
        entityConfig: action.newEntityConfig,
      };
  }
};

export const App = () => {
  const [state, dispatch] = React.useReducer(reducer, defaultAppState());
  const { entityConfig, textDisplayConfig, layout } = state;

  const [isAutoFillEnabled, setIsAutoFillEnabled] = React.useState(false);
  const [isCustomisationEnabled, setIsCustomisationEnabled] =
    React.useState(false);
  const [isDarkThemeEnabled, setDarkThemeEnabled] = React.useState(true);

  const neighbouringBonus = entityConfig.nuclearReactorProps.neighbouringBonus;

  // single reactor equivalent
  const sre = React.useMemo(
    (): number =>
      layout.reduce(
        (oldSum, row, i) =>
          oldSum +
          row.reduce(
            (rowSum, cell, j) =>
              rowSum +
              (cell
                ? 1 + getNeighbourCount(layout, i, j) * neighbouringBonus
                : 0),
            0
          ),
        0
      ),
    [layout, neighbouringBonus]
  );

  const reactorCount = React.useMemo(
    (): number =>
      layout.reduce(
        (oldSum, row) =>
          oldSum + row.reduce((rowSum, cell) => rowSum + (cell ? 1 : 0), 0),
        0
      ),
    [layout]
  );

  const toggleAutoFill = React.useCallback(() => {
    setIsAutoFillEnabled(!isAutoFillEnabled);
  }, [isAutoFillEnabled]);

  return (
    <EntityConfigContext.Provider value={entityConfig}>
      <Container>
        <Grid stackable>
          <GridRow centered>
            <div style={{ padding: '15px' }} role="heading" aria-level={1}>
              <Header size="huge">
                Factorio Nuclear Power Plant Calculator
              </Header>
            </div>
          </GridRow>
          <GridRow centered>
            <GridColumn width={10}>
              <Layout
                layout={layout}
                setLayout={(newLayout) =>
                  dispatch({ change: 'layout', newLayout })
                }
                isAutoFillEnabled={isAutoFillEnabled}
                toggleAutoFill={toggleAutoFill}
              />
            </GridColumn>
            <GridColumn width={6}>
              <TextDisplayConfigContext.Provider value={textDisplayConfig}>
                <Calculator nuclearReactorCount={reactorCount} sre={sre} />
              </TextDisplayConfigContext.Provider>
            </GridColumn>
          </GridRow>
          <GridRow>
            <Grid>
              <GridRow>
                <Checkbox
                  toggle
                  label="Dark Theme"
                  checked={isDarkThemeEnabled}
                  onChange={() => {
                    setDarkThemeEnabled(!isDarkThemeEnabled);
                    document
                      .querySelector(':root')
                      ?.classList.toggle('light-theme');
                  }}
                />
              </GridRow>
              <GridRow>
                <Checkbox
                  toggle
                  label="Select Quality"
                  checked={isCustomisationEnabled}
                  onChange={() =>
                    setIsCustomisationEnabled(!isCustomisationEnabled)
                  }
                />
              </GridRow>
              {isCustomisationEnabled && (
                <CustomisationPanel
                  entityConfig={entityConfig}
                  setEntityConfig={(newEntityConfig) =>
                    dispatch({ change: 'entity_config', newEntityConfig })
                  }
                />
              )}
              <GridRow>
                <Checkbox
                  toggle
                  label="Hide Inline Icons"
                  checked={!textDisplayConfig.shouldDisplayIcon}
                  onChange={() => dispatch({ change: 'toggle_display_icon' })}
                />
              </GridRow>
            </Grid>
          </GridRow>
        </Grid>
        <br />
        <Divider />
        <div style={{ textAlign: 'center' }}>
          <p>
            This calculator is &nbsp;
            <a href="https://github.com/fangyi-zhou/factorio-nuclear-power/">
              open source
            </a>
            .
          </p>
          <p>
            See also: &nbsp;
            <a href="https://alt-f4.blog/ALTF4-57/">
              Alt-F4 #57 - Nuclear Energy and You
            </a>
          </p>
        </div>
      </Container>
    </EntityConfigContext.Provider>
  );
};

export default App;
