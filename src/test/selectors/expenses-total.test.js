import getExpensesTotal from '../../selectors/expenses-total'
import expenses from '../fixtures/expenses'

test('should return 0 if no expense', () => {
  const total = getExpensesTotal([])
  expect(total).toBe(0)
})

test('should correctly add up a single expense', () => {
  const total = getExpensesTotal([expenses[0]])
  expect(total).toBe(expenses[0].amount)
})

test('should correctly add up multiple expenses', () => {
  const total = getExpensesTotal(expenses)
  expect(total).toBe(expenses[0].amount + expenses[1].amount + expenses[2].amount)
})