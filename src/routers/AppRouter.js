import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ExpenseDashboardPage from '../components/ExpenseDashboardPage'
import AddExpensePage from '../components/AddExpensePage'
import EditExpensePage from '../components/EditExpensePage'
import HelpPage from '../components/HelpPage'
import ErrorPage from '../components/ErrorPage'
import Header from '../components/Header'

const AppRouter = () => (
  <Router>
    <div>
      <Header />
    </div>
    <Switch>
      <Route
        path="/"
        component={ExpenseDashboardPage}
        exact={true}
      />
      <Route
        path="/create"
        component={AddExpensePage}
      />
      <Route
        path="/edit/:id"
        component={EditExpensePage}
      />
      <Route
        path="/help"
        component={HelpPage}
      />
      <Route
        component={ErrorPage}
      />
    </Switch>
  </Router >
)

export default AppRouter

