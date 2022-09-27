import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

import { EditUser } from "./libs/users/views/edit-user";
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
          </ul>
        </nav>
        {/* CONTENT */}
        <div className="content-container">
          <Switch>
            <Route exact path="/">
              <UsersList />
            </Route>
            <Route exact path="/edit/:id">
              <EditUser />
            </Route>
          </Switch>
        </div>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
