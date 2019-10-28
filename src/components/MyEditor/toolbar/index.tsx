// eslint-disable-next-line
import React from 'react'
import MarkButton from '../plugins/mark/toolbar'
import EmojisContext from '../plugins/emojis/toolbar/emojisContext'
import CheckListButton from '../plugins/checkLists/toolbar'
import ColorButton from '../plugins/colors/toolbar'
import EmojiButtton from '../plugins/emojis/toolbar'
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
        <EmojiButtton />
      </EmojisContext.Provider>
    </div>
  )
}
export default Toolbar
