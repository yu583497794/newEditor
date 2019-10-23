import React from 'react'
import { RenderInlineProps } from 'slate-react' 
import { Editor as CoreEditor } from 'slate'
function renderInline (props: RenderInlineProps, editor: CoreEditor, next: () => any) {
  const {attributes, node} = props
  switch (node.type) {
    case 'emoji':
      return <span
        {...attributes}
        contentEditable={false}
        onDrop={(e) => e.preventDefault()}
      >
        {node.data.get('code')}
      </span>
    default:
      return next()
  }
}

export default renderInline
