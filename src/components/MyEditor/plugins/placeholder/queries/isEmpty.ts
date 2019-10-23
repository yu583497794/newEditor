import { Editor } from 'slate'
const isEmpty = (editor: Editor) => {
  return editor.value.startBlock.type === 'paragraph' && editor.value.document.text === '' && editor.value.document.getInlines().size === 0
} 

export default isEmpty