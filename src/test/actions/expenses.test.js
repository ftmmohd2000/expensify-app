import { addExpense, editExpense, removeExpense } from '../../actions/expenses'

test('should set up remove expense action object', () => {
  const action = removeExpense({ id: 'sexytimes' })
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: 'sexytimes'
  })
})

test('should set up edit expense action object', () => {
  const action = editExpense(56, { note: 'I want to kill Krish' })
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: 56,
    updates: {
      note: 'I want to kill Krish'
    }
  })
})

test('should set up add expense action object when nothing is passed in', () => {
  const action = addExpense()
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      description: '',
      amount: 0,
      note: '',
      createdAt: 0,
      id: expect.any(String)
    }
  })
})

test('should set up add expense action object when expense is passed in', () => {
  const expenseData = {
    description: 'A new house',
    amount: 70000000,
    note: 'I really dont know how much a house costs',
    createdAt: 1000
  }
  const action = addExpense(expenseData)
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  })
})