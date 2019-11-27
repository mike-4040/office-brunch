import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Copyright from './components/Copyright'

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h1" component="h1" gutterBottom>
          Office Brunch
        </Typography>
        <Copyright />
      </Box>
    </Container>
  );
}
