// eslint-disable-next-line
import React from 'react'
import MarkButton from '../plugins/mark/toolbar'
import EmojiButton from '../plugins/emojis/toolbar'
import EmojisContext from '../plugins/emojis/toolbar/emojisContext'
import CheckListButton from '../plugins/checkLists/toolbar'
import './toolbar.styl'
 
let marks = ['bold', 'italic', 'underline']

function Toolbar () {
  return (
    <div className='toolbar-wrapper'>
      {marks.map(mark =>
        (<MarkButton type={mark} key={mark}/>)
      )}
      <EmojisContext.Provider value={['😀', '😃', '😄']}>
        <EmojiButton/>
      </EmojisContext.Provider>
      <CheckListButton/>
    </div>
  )
}
export default Toolbar
