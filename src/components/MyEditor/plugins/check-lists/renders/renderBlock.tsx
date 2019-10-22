import React from 'react'
import { RenderBlockProps } from 'slate-react'
import { Editor as CoreEditor } from 'slate'
import CheckListItem from '../components/CheckListItem'
const renderBlock = (props: RenderBlockProps, editor: CoreEditor, next: () => any) => {
   const { node } = props
   if (node.type === 'check-list') {
    return (
       <CheckListItem {...props}/>
    )
   }
   return next()
}

export default renderBlock