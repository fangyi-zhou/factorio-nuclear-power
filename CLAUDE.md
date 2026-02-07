# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Factorio Nuclear Power Plant Calculator — a React/TypeScript single-page app that computes building ratios (heat exchangers, offshore pumps, steam turbines, fuel cells) for a given nuclear reactor grid layout. Deployed at https://factorio-nuclear-power-plant.netlify.app/.

## Commands

- **Dev server:** `yarn start`
- **Build:** `yarn build`
- **Test:** `yarn test` (Jest via react-scripts, watch mode by default; `yarn test --watchAll=false` for CI)
- **Lint:** `yarn lint` (ESLint on src/)
- **Format:** `yarn format` (Prettier on src/)

## Architecture

Built with Create React App (react-scripts). UI uses Semantic UI React + FontAwesome icons. No external state management library — uses `useReducer` + React Context API.

### Key files

- **App.tsx** — Root component. Owns global state via `useReducer` (layout, entity config, display config). Computes SRE (Single Reactor Equivalent) and reactor count, then passes them to Calculator. Provides EntityConfig and TextDisplayConfig via React contexts.
- **Layout.tsx** — Interactive 2D grid where users place/remove reactors. Handles add/remove row/column (max 8 cols), auto-fill mode, and displays neighbor counts per cell.
- **Calculator.tsx** — Pure calculation display. Takes SRE and reactor count as props, reads entity specs from context, computes required building counts and fuel consumption.
- **CustomisationPanel.tsx** — Quality tier selector (Normal through Legendary). Updates entity config with tier-specific values from Constants.
- **Constants.tsx** — All Factorio game data: entity specs for each quality tier (heat output, fluid rates, power output, etc.).
- **ReactorLayout.ts** — Grid utility types and functions. `ReactorLayout = boolean[][]`. Provides `defaultLayout()` and `getNeighbourCount()` (4-directional adjacency).
- **Contexts.tsx** — React context definitions and defaults for EntityConfig and TextDisplayConfig.
- **theme.css** — Dark/light theme using CSS custom properties and `light-dark()`.

### Data flow

User interaction → App reducer dispatches (`'layout'`, `'entity_config'`, `'toggle_display_icon'`) → updated state flows via props/context to Layout, Calculator, and CustomisationPanel.

## Code Style

- TypeScript strict mode
- Prettier: semicolons, single quotes, 2-space indent
- ESLint: extends `react-app` and `react-app/jest`
