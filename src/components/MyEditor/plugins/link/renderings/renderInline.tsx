import React from 'react'
import { RenderInlineProps } from 'slate-react'
import { Editor } from 'slate'
import './renderInline.styl'
const renderInline = (props: RenderInlineProps, editor: Editor, next: any) => {
  const { node, attributes } = props
  if (node.type !== 'link') return next()
  return (
    <a {...attributes} className='editor-link' href={node.data.get('href') || '#'} contentEditable={false}>
      <i className='iconfont'>&#xe623;</i>
      { node.data.get('text') }
    </a>
  )
}

export default renderInline