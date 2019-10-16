import { Value } from 'slate'

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            text: '测试AutoClose',
          },
        ],
      },
    ],
  },
})

const value = (state: Value = initialValue, action: {type: string, value:Value}) => {
  switch(action.type) {
    case 'SET_VALUE':
      return action.value
    default:
      return state
  }
}

export default value