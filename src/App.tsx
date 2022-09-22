import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

import "./App.css";
import { CreateUser } from "./libs/users/views/create-user";
import { UsersList } from "./libs/users/views/users";

function App() {
  return (
    <Router>
      <div className="main-container">
        {/* NAVIGATION */}
        <nav className="navigation">
          <ul className="navigation-list">
            <li className="navigation-list-element">
              <NavLink exact activeClassName="selected" to="/">
                Users
              </NavLink>
            </li>
            <li className="navigation-list-element">
              <NavLink activeClassName="selected" to="/create">
                Create
              </NavLink>
            </li>
          </ul>
        </nav>
        {/* CONTENT */}
        <div className="content-container">
          <Switch>
            <Route path="/create">
              <CreateUser />
            </Route>
            <Route exact path="/">
              <UsersList />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
