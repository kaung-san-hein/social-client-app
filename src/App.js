import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

// Components
import NavBar from "./components/NavBar";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <NavBar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
