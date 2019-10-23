import React from 'react'
import './emojisPannel.styl'
import EmojisContext from './emojisContext'

export interface IEmojisPannelProps {
  clickEmojiHandler: (e: React.MouseEvent, emoji: string) => any;
  hidePannel: React.MouseEventHandler;
}
const EmojiPannel: React.FC<IEmojisPannelProps> = ({clickEmojiHandler, hidePannel}) => {
  const emojis = React.useContext(EmojisContext)
  return (
    <React.Fragment>
      <div className='emojis-pannel-mask' onClick={hidePannel}/>
      <div className='emojis-pannel'>
        {emojis.map((emoji, index) => (
          <span className='emojis-pannel-item' key={index} onClick={e => { clickEmojiHandler(e, emoji) }}>{emoji}</span>
        ))}
      </div>
    </React.Fragment>
  )
}
export default EmojiPannel
