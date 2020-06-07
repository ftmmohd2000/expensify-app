import React from 'react'
import { connect } from 'react-redux'
import numeral from 'numeral'
import getExpensesTotal from '../selectors/expenses-total'
import expenseSelector from '../selectors/expenses'

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => (
  <div>
    <p>You have {expenseCount} {`expense(s)`}</p>
    <p>With a total of {numeral(expensesTotal).format('$0,0.00')}</p>
  </div>
)

const mapStateToProps = (state) => {
  const filteredExpenses = expenseSelector(state)
  return {
    expenseCount: filteredExpenses.length,
    expensesTotal: getExpensesTotal(filteredExpenses) / 100
  }
}

export default connect(mapStateToProps)(ExpensesSummary)
