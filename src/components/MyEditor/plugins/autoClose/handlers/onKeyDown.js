import { isCouple } from '../utils'
// import  { EventHook } from 'slate-react'
const onKeyDown = (event, editor, next) => {
  const { value } = editor;
  const { selection, startText } = value;
  const { offset } = selection.anchor;
  const leftChar = startText.text[offset - 1];
  const rightChar = startText.text[offset];
  if (selection.isCollapsed && event.key === 'Backspace' && isCouple(leftChar, rightChar)) {
    event.preventDefault();
    return editor.deleteForward(1).deleteBackward(1);
  }
  return next();
}

export default onKeyDown