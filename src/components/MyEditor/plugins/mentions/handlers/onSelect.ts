import store from '../../../../../store'
import { setValue, setUsers, setCurIndex } from '../../../../../store/actions'
import { Editor as CoreEditor } from 'slate'
import { IMention } from '../'
import { getInput } from '../utils'
import { USER_MENTION_NODE_TYPE } from '../'
const onSelect = (user: IMention) => {
  const value = store.getState().value
  const input = getInput(value)
  const controller = new CoreEditor({value})

  controller.deleteBackward(input.length + 1)

  const selectedRange = controller.value.selection
  const newValue = controller
    .insertText(' ')
    .insertInlineAtRange(selectedRange, {
      data: {
        userId: user.id,
        username: user.username
      },
      // nodes: [
      //   Text.create({
      //     text: `@${user.username}`
      //   })
      // ],
      type: USER_MENTION_NODE_TYPE
    })
    .value
  store.dispatch(setValue(newValue))
  store.dispatch(setUsers([]))
  store.dispatch(setCurIndex(0))
}

export default onSelect