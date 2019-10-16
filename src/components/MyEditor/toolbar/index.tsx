// eslint-disable-next-line
import React from 'react'
import MarkButton from '../plugins/mark/toolbar'
import EmojiButton from '../plugins/emoji/toolbar'
import EmojisContext from '../plugins/emoji/toolbar/emojisContext'
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
    </div>
  )
}
export default Toolbar
