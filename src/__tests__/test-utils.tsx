import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import {
  EntityConfig,
  EntityConfigContext,
  TextDisplayConfig,
  TextDisplayConfigContext,
  defaultEntityConfig,
  defaultTextDisplayConfig,
} from '../Contexts';

interface WrapperProps {
  children: React.ReactNode;
}

interface ProviderOptions {
  entityConfig?: EntityConfig;
  textDisplayConfig?: TextDisplayConfig;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    entityConfig = defaultEntityConfig,
    textDisplayConfig = defaultTextDisplayConfig,
    ...renderOptions
  }: ProviderOptions & Omit<RenderOptions, 'wrapper'> = {}
) {
  function Wrapper({ children }: WrapperProps) {
    return (
      <EntityConfigContext.Provider value={entityConfig}>
        <TextDisplayConfigContext.Provider value={textDisplayConfig}>
          {children}
        </TextDisplayConfigContext.Provider>
      </EntityConfigContext.Provider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}
