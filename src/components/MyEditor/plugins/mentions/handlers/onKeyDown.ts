import { EventHook } from 'slate-react'
import store from '../../../../../store/index'
import { setCurIndex } from '../../../../../store/actions'
import onSelect from '../handlers/onSelect'
const onKeyDown: EventHook =  (event, editor, next) => {
  const users = store.getState().users
  const curIndex= store.getState().curIndex
  // @ts-ignore
  switch(event.key) {
    case 'Down':
    case 'ArrowDown':
      store.dispatch(setCurIndex(Math.min(curIndex + 1, users.length)))
      return event.preventDefault()
    case 'Up':
    case 'ArrowUp':
        store.dispatch(setCurIndex(Math.max(curIndex - 1, 0)))
      return event.preventDefault()
    case 'Enter':
      return onSelect(users[curIndex])
    // case 'Esc:
    default:
      return next()
  }
}

export default onKeyDown