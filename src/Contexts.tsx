import React from 'react';

export interface TextDisplayConfig {
  shouldDisplayIcon: boolean;
}

export const TextDisplayConfigContext = React.createContext<TextDisplayConfig>({
  shouldDisplayIcon: true,
});
