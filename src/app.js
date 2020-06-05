import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'
import { addExpense } from './actions/expenses'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import 'react-dates/lib/css/_datepicker.css'

const store = configureStore()

store.dispatch(addExpense({ description: 'water bill', amount: 4000, createdAt: 1000 }))
store.dispatch(addExpense({ description: 'sex bill', amount: 0, createdAt: 80000 }))
store.dispatch(addExpense({ description: 'ipl', amount: 18000, createdAt: -1000 }))

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'))
