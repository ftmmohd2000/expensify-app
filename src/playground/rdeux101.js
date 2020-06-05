import { createStore } from 'redux'

const incrementCount = ({ incrementBy = 1 } = {}) => (
  {
    type: 'INCREMENT',
    incrementBy
  }
)

const decrementCount = ({ decrementBy = 1 } = {}) => (
  {
    type: 'DECREMENT',
    decrementBy
  }
)

const resetCount = () => (
  {
    type: 'RESET'
  }
)

const setCount = ({ count = 0 } = {}) => (
  {
    type: 'SET',
    count
  }
)

const countReducer = (state = { count: 0 }, action) => {

  switch (action.type) {
    case 'INCREMENT':
      const inc = typeof action.incrementBy === 'number' ? action.incrementBy : 1
      return {
        count: state.count + inc
      }
    case 'DECREMENT':
      const dec = typeof action.decrementBy === 'number' ? action.decrementBy : 1
      return {
        count: state.count - dec
      }
    case 'RESET':
      return {
        count: 0
      }
    case 'SET':
      return {
        count: action.count
      }
    default:
      return state
  }
}

const store = createStore(countReducer)

const unsubscribe = store.subscribe(() => {
  console.log(store.getState())
})

store.dispatch(incrementCount({ incrementBy: 5000 }))

store.dispatch(decrementCount())

store.dispatch(incrementCount())

unsubscribe()

store.dispatch(resetCount())

store.dispatch(setCount({ count: 500 }))

store.dispatch(decrementCount({ decrementBy: 700 }))

console.log('lol state is ', store.getState())