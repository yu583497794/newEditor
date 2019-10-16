import React from 'react'
import { RenderInlineProps } from 'slate-react'
import { Editor as CoreEditor } from 'slate'
import { USER_MENTION_NODE_TYPE } from '../'
const renderInline: (props: RenderInlineProps, editor: CoreEditor, next: () => any) => any = (props, editor, next) => {
  const { attributes, node } = props
  if (node.type === USER_MENTION_NODE_TYPE) {
    return (
      <b
        {...attributes}
        contentEditable={false}
      >
        {'@ ' +node.data.get('username')}
      </b>
    )
  }
  return next()
}

export default renderInline