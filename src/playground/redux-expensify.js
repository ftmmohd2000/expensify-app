import { createStore, combineReducers } from 'redux'
import { v4 as uuid } from 'uuid'

const addExpense = (
  {
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
  } = {}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
})

const removeExpense = ({ id }) => ({
  type: 'REMOVE_EXPENSE',
  id
})

const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
})

const setTextFilter = (text) => ({
  type: 'SET_TEXT_FILTER',
  text
})

const sortByDate = () => ({
  type: 'SORT_BY_DATE',
})

const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
})

const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
})

const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
})

const expensesDefaultState = []

const filtersDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
}


const expensesReducer = (state = expensesDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [
        ...state,
        action.expense
      ]
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => (id !== action.id))
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id)
          return {
            ...expense,
            ...action.updates
          }
        else
          return expense
      })
    default:
      return state
  }
}

const filtersReducer = (state = filtersDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      }
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      }
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      }
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      }
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      }
    default:
      return state
  }
}

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
)

const getVisibleExpenses = ({ expenses, filters: { text, sortBy, startDate, endDate } }) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate === 'number' ? expense.createdAt >= startDate : true
    const endDateMatch = typeof endDate === 'number' ? expense.createdAt <= endDate : true
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())
    return startDateMatch && endDateMatch && textMatch
  }).sort((a, b) => {
    if (sortBy === 'date')
      return a.createdAt < b.createdAt ? 1 : -1
    else if (sortBy === 'amount')
      return a.amount < b.amount ? 1 : -1
  })
}

const unsubscribe = store.subscribe(() => {
  const state = store.getState()
  const visibleExpenses = getVisibleExpenses(state)
  console.log(visibleExpenses)
})


const itemOne = store.dispatch(addExpense({ description: 'Dildos', amount: '4000', createdAt: -1000 }))
const itemTwo = store.dispatch(addExpense({ description: 'strapOns', amount: '2000', note: 'What? we all have our needs', createdAt: 1000 }))

store.dispatch(setStartDate(-2000))
store.dispatch(setEndDate(1))
store.dispatch(setEndDate(5000))
store.dispatch(setEndDate())
store.dispatch(setTextFilter('Dil'))
store.dispatch(setTextFilter(''))
store.dispatch(sortByDate())
store.dispatch(sortByAmount())