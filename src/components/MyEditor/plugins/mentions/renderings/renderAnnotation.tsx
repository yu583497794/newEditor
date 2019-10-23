import React from 'react'
import { Editor as CoreEditor } from 'slate'
import { RenderAnnotationProps } from 'slate-react'
import { CONTEXT_ANNOTATION_TYPE } from '../'
const renderAnnotation: (props: RenderAnnotationProps, editor: CoreEditor, next: () => any) => any = (props, editor, next) => {
  if (props.annotation.type === CONTEXT_ANNOTATION_TYPE) {
    return (
      <span {...props.attributes} className="mention-context">
        {props.children}
      </span>
    )
  }
  return next()
}

export default renderAnnotation