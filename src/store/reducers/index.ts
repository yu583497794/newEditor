import { combineReducers } from 'redux'
import value from './value'
import users from './users'
import curIndex from './curIndex'
export default combineReducers({
  value,
  users,
  curIndex
})
