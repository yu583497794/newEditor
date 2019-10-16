import React from 'react'
import { Editor as CoreEditor } from 'slate'
import { RenderMarkProps } from 'slate-react'
export default function renderMark (props: RenderMarkProps, editor: CoreEditor, next: () => any): any {
  const { children, mark, attributes } = props
  switch (mark.type) {
    case 'bold':
      return <strong { ...attributes}>{children}</strong>
    case 'italic':
      return <em {...attributes}>{children}</em>
    case 'underline':
      return <u {...attributes}>{children}</u>
    default:
      return next()
  }
}
