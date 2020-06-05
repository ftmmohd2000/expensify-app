import React from 'react'
import { connect } from 'react-redux'
import ExpenseListItem from './ExpenseListItem'
import selectExpenses from '../selectors/expenses'

export const ExpenseList = (props) => {
  let a = 0
  return (
    <div>
      {
        props.expenses.length === 0 ? (
          <p>No Expenses</p>
        ) : (
            props.expenses.map((expense) => (
              <ExpenseListItem key={a++} {...expense} />
            ))
          )
      }
    </div>
  )
}

const mapStateToProps = (state) => ({
  expenses: selectExpenses(state)
})

export default connect(mapStateToProps)(ExpenseList)

