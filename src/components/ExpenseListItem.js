import React from 'react'
import { removeExpense } from '../actions/expenses'
import { Link } from 'react-router-dom'

const ExpenseListItem = ({ id, description, amount, createdAt }) => {
  return (
    <div>
      <Link to={`/edit/${id}`}>{description}</Link>
      <p>{amount} - {createdAt}</p>
    </div>
  )
}

export default ExpenseListItem
