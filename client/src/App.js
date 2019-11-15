import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import Login from "./routes/Login";
import PrivateRoute from "./components/PrivateRoute";
import Bubbles from "./components/BubblePage";
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <header className='App-header'>
          <nav>
            <Link to='/'>Login</Link>
            <Link to='/bubbles'>Bubbles</Link>
          </nav>
        </header>
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute path='/bubbles'>
            <Bubbles />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
