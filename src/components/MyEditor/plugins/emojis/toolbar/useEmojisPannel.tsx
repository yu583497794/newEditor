import React from 'react'
import './emojisPannel.styl'
import EmojisContext from './emojisContext'

function useEmojisPannel (clickEmojiHandler: (e: React.MouseEvent, emoji: string) => any, hidePannel: React.MouseEventHandler) {
  const emojis = React.useContext(EmojisContext)
  // const EmojisPannel = React.useCallback(() => {
  //   return (
  //     <React.Fragment>
  //       <div className='emojis-pannel-mask' onClick={hidePannel}/>
  //       <div className='emojis-pannel'>
  //         {emojis.map((emoji, index) => (
  //           <span className='emojis-pannel-item' key={index} onClick={e => { clickEmojiHandler(e, emoji) }}>{emoji}</span>
  //         ))}
  //       </div>
  //     </React.Fragment>
  //   )
  // }, [emojis, clickEmojiHandler, hidePannel])
  const EmojisPannel = React.useMemo(() => {
    return (
      <React.Fragment>
        <div className='emojis-pannel-mask' onClick={hidePannel}/>
        <div className='emojis-pannel'>
          {emojis.map((emoji, index) => (
            <span className='emojis-pannel-item' key={index} onClick={e => clickEmojiHandler(e, emoji)}>{emoji}</span>
          ))}
        </div>
      </React.Fragment>)
  }, [emojis, clickEmojiHandler, hidePannel])
  return EmojisPannel
}

export default useEmojisPannel
