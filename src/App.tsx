import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";
import { CreateUser } from "./libs/users/views/create-user";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Users</Link>
          </li>
          <li>
            <Link to="/create">Create</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/create">
          <CreateUser />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
