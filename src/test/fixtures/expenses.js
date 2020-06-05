import moment from 'moment'

export default [
  {
    id: '1',
    description: 'books',
    note: '',
    amount: 30000,
    createdAt: 0
  }, {
    id: '2',
    description: 'hooks',
    note: '',
    amount: 1,
    createdAt: moment(0).subtract(4, 'day').valueOf()
  }, {
    id: '3',
    description: 'locks',
    note: '',
    amount: 300,
    createdAt: moment(0).add(1000, 'day').valueOf()
  }
]