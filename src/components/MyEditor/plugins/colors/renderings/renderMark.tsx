import React from 'react'
import { Editor as CoreEditor } from 'slate'
import { RenderMarkProps } from 'slate-react'
const renderMark = (props: RenderMarkProps, editor: CoreEditor, next: any) => {
  const { children, mark, attributes } = props
  if (mark.type === 'color') {
    return (
      <span {...attributes} style={{color: mark.data.get('color')}}>
        {children}
      </span>
    )
  }
  return next()
}

export default renderMark