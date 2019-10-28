import React from 'react'
import './emojisPannel.styl'
import EmojisContext from './emojisContext'

export interface IEmojisPannelProps {
  clickEmojiHandler: (e: React.MouseEvent, emoji: string) => any;
}
const EmojiPannel: React.FC<IEmojisPannelProps> = ({clickEmojiHandler}) => {
  const emojis = React.useContext(EmojisContext)
  return (
    <div className='emojis-pannel'>
      {emojis.map((emoji, index) => (
        <span className='emojis-pannel-item' key={index} onClick={e => { clickEmojiHandler(e, emoji) }}>{emoji}</span>
      ))}
    </div>
  )
}
export default EmojiPannel
