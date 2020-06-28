import React from 'react';
import { ThemeProvider } from '@material-ui/core';

import JobsPage from './pages/JobsPage';
import theme from './lib/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <JobsPage />
    </ThemeProvider>
  );
}

export default App;
