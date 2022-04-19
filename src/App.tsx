import React from 'react';
import { Container, Grid } from 'fomantic-ui-react';
import Layout from './Layout';

function App() {
  const layout = <Layout></Layout>;
  return (
    <Container>
      <Grid>
        <Grid.Row centered>
          <h1>Factorio Nuclear Power Plant Calculator</h1>
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column>{layout}</Grid.Column>
          <Grid.Column>Analysis</Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default App;
