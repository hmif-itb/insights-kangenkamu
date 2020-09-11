import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { CookiesProvider } from 'react-cookie';

import { routes } from "./routes";
import "./App.css";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
  },
});

function App() {
  return (
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        <Router>
          {Object.keys(routes).map((route) => {
            return (
              <Route path={route} exact key={route}>
                {routes[route]}
              </Route>
            );
          })}
        </Router>
      </ThemeProvider>
    </CookiesProvider>
  );
}

export default App;
