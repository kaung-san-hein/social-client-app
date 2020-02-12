import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./util/theme";
import jwtDecode from "jwt-decode";

// Components
import NavBar from "./components/NavBar";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthRoute from "./util/AuthRoute";

const theme = createMuiTheme(themeFile);

let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    authenticated = false;
  } else {
    authenticated = true;
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <NavBar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <AuthRoute
              path="/login"
              component={Login}
              authenticated={authenticated}
            />
            <AuthRoute
              path="/signup"
              component={Signup}
              authenticated={authenticated}
            />
          </Switch>
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
