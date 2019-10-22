// import  { EventHook } from 'slate-react'
const onKeyDown =  (event, editor, next)  => {
  const {ctrlKey, key} = event
  if (!ctrlKey) return next()
  switch (key) {
    case 'b':
      event.preventDefault()
      return editor.toggleMark('bold')
    case 'u':
      event.preventDefault()
      return editor.toggleMark('underline')
    case 'i':
      event.preventDefault()
      return editor.toggleMark('italic')
    default:
      return next()
  }
}
export default onKeyDown
