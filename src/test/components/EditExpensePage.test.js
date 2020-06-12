import React from 'react'
import { shallow } from 'enzyme'
import { EditExpensePage } from '../../components/EditExpensePage'
import ExpenseForm from '../../components/ExpenseForm'
import expenses from '../fixtures/expenses'

let startRemoveExpense, startEditExpense, editExpense, history, wrapper

beforeEach(() => {
  startRemoveExpense = jest.fn()
  editExpense = jest.fn()
  startEditExpense = jest.fn()
  history = { push: jest.fn() }
  wrapper = shallow(
    <EditExpensePage
      startRemoveExpense={startRemoveExpense}
      startEditExpense={startEditExpense}
      history={history}
      expense={expenses[2]}
    />)
})

test('should render EditExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should handle onSubmit', () => {
  wrapper.find(ExpenseForm).prop('onSubmit')(expenses[2])
  expect(history.push).toHaveBeenLastCalledWith('/dashboard')
  expect(startEditExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2])
})

test('should handle removing an expense', () => {
  wrapper.find('button').simulate('click')
  expect(history.push).toHaveBeenLastCalledWith('/dashboard')
  expect(startRemoveExpense).toHaveBeenLastCalledWith(expenses[2].id)
})