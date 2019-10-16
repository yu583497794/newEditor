import { Value } from 'slate'
import { IMention } from '../components/MyEditor/plugins/mentions'
export const setValue = function (value: Value) {
  return {
    type: 'SET_VALUE',
    value
  }
}

export const setUsers = function (users: IMention[]) {
  return {
    type: 'SET_USERS',
    users
  }
}

export const setMention = function (load: boolean) {
  return {
    type: 'SET_MENTION',
    load
  }
}

export const addIndex = function () {
  return {
    type: 'ADD_INDEX'
  }
}

export const minusIndex = function () {
  return {
    type: 'MINUS_INDEX'
  }
}

export const setCurIndex = function (index: number) {
  return {
    type: 'SET_CUR_INDEX',
    index
  }
}