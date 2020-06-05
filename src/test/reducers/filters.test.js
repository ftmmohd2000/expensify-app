import moment from 'moment';
import filtersReducer from '../../reducers/filters'

test('should setup default filter values', () => {
  const state = filtersReducer(undefined, { type: '@@INIT' })
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  })
})

test('should setup sortBy to amount', () => {
  const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' })
  expect(state.sortBy).toBe('amount')
})

test('should setup sortBy to date', () => {
  const currentState = {
    text: 'sexy',
    sortBy: 'amount',
    startDate: moment(),
    endDate: moment()
  }
  const action = {
    type: 'SORT_BY_DATE'
  }
  const state = filtersReducer(currentState, action)
  expect(state.sortBy).toBe('date')
})

test('should set text filter to given value', () => {
  const state = filtersReducer(undefined, { type: 'SET_TEXT_FILTER', text: 'mobile' })
  expect(state.text).toBe('mobile')
})

test('should set startDate to given value', () => {
  const time = moment()
  const state = filtersReducer(undefined, { type: 'SET_START_DATE', startDate: time })
  expect(state.startDate).toBe(time)
})

test('should set endDate to given value', () => {
  const time = moment()
  const state = filtersReducer(undefined, { type: 'SET_END_DATE', endDate: time })
  expect(state.endDate).toBe(time)
})