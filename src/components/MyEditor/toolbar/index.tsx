// eslint-disable-next-line
import React from 'react'
import MarkButton from '../plugins/mark/toolbar'
import EmojisContext from '../plugins/emojis/toolbar/emojisContext'
import CheckListButton from '../plugins/checkLists/toolbar'
import ColorButton from '../plugins/colors/toolbar'
import EmojiButton from '../plugins/emojis/toolbar'
import LinkButton from '../plugins/link/toolbar'
import './toolbar.styl'
 
let marks = ['bold', 'italic', 'underline']
const emojis = ['😀', '😃', '😄', '🥰', '🎃', '🙈', '🙉', '🙊']
function Toolbar () {
  return (
    <div className='toolbar-wrapper'>
      {marks.map(mark =>
        (<MarkButton type={mark} key={mark}/>)
      )}
      <CheckListButton/>
      <ColorButton/>
      <EmojisContext.Provider value={emojis}>
        <EmojiButton />
      </EmojisContext.Provider>
      <LinkButton/>
    </div>
  )
}
export default Toolbar
