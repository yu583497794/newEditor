import { Editor } from 'slate'
const isEmpty = (editor: Editor) => {
  return editor.value.startBlock.type === 'paragraph' && editor.value.document.text === ''
} 

export default isEmpty