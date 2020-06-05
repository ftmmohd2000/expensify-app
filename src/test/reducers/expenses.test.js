import moment from 'moment'
import expensesReducer from '../../reducers/expenses'
import expenses from '../fixtures/expenses'

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' })
  expect(state).toEqual([])
})

test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  }
  const state = expensesReducer(expenses, action)
  expect(state).toEqual([expenses[0], expenses[2]])
})

test('should not remove expenses if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '56'
  }
  const state = expensesReducer(expenses, action)
  expect(state).toEqual([expenses[0], expenses[1], expenses[2]])
})

test('should add an expense', () => {
  const newExpense = {
    id: '111',
    description: 'coffee',
    note: 'abcdef',
    createdAt: moment(0),
    amount: 42069
  }

  const action = {
    type: 'ADD_EXPENSE',
    expense: newExpense,
  }

  const state = expensesReducer(expenses, action)
  expect(state).toEqual([...expenses, newExpense])
})

test('should edit an expense', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[0].id,
    updates: {
      amount: 12345
    }
  }
  const state = expensesReducer(expenses, action)
  expect(state[0].amount).toBe(12345)
})

test('should not edit an expense if expense not found', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: 'abcd',
    updates: {
      amount: 12345
    }
  }
  const state = expensesReducer(expenses, action)
  expect(state).toEqual(expenses)
})