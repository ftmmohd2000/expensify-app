import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import LoginPage from "../components/LoginPage";
import ExpenseDashboardPage from "../components/ExpenseDashboardPage";
import AddExpensePage from "../components/AddExpensePage";
import EditExpensePage from "../components/EditExpensePage";
import ErrorPage from "../components/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <PublicRoute path="/" component={LoginPage} exact={true} />
      <PrivateRoute
        path="/dashboard"
        component={ExpenseDashboardPage}
        exact={true}
      />
      <PrivateRoute path="/create" component={AddExpensePage} />
      <PrivateRoute path="/edit/:id" component={EditExpensePage} />
      <Route component={ErrorPage} />
    </Switch>
  </Router>
);

export default AppRouter;
