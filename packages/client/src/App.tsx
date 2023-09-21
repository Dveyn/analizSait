import React from 'react';
import AppRoutes from './components/routing/routing';
import { Theme, presetGpnDark  } from '@consta/uikit/Theme';
import "./app.css";

function App() {
  return (
  <Theme  className="App" preset={presetGpnDark}>
      <AppRoutes />
  </Theme>
  );
}

export default App;
