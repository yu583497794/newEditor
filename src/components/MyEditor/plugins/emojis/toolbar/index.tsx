import React from 'react'
import useEmojisPannel from './useEmojisPannel'
// import EmojisPannel from './emojisPannel'
import { Inline, Editor as CoreEditor, Value } from 'slate'
import IconButton from '../../components/IconButton'
import './index.styl'
import { connect } from 'react-redux'
import { IStoreState } from '../../../../../store'
import { setValue } from '../../../../../store/actions'
import { debounce } from 'lodash'

export interface IEmojisButtonProps {
  // editor: React.RefObject<CoreEditor>;
  value: Value;
  setValue: (value: Value) => any
}

const EmojisButton = ({value, setValue}: IEmojisButtonProps)  => {
  const [isVisible, setVisible] = React.useState(false)
  const togglePannel = React.useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setVisible(visible => !visible)
    const controller = new CoreEditor({value})
    setValue(controller.focus().value)
  }, [value, setValue])

  const clickEmojiHandler = React.useCallback((e, code) => {
    const newInline = Inline.create({
      data: {code},
      type: 'emoji'
    })
    // e.preventDefault()
    // e.stopPropagation()
    // 保留原始合成事件
    // 如果在react中想异步访问事件属性（如在setTimeout内），应该在是处理事件时调用event.persist()，
    // 这会从事件池中移除该合成函数并允许对该合成事件的引用被保留下来。
    e.persist()
    const controller = new CoreEditor({value})
    return setValue(controller.insertInline(newInline).moveToStartOfNextText().focus().value)
  }, [value, setValue])

  const clickEmojiHandlerDebounced = React.useCallback(debounce(clickEmojiHandler, 50), [clickEmojiHandler])

  const hidePannel = React.useCallback((e) => {
    e.stopPropagation()
    setVisible(false)
    const controller = new CoreEditor({value})
    setValue(controller.focus().value)
  }, [value, setValue])
  const EmojisPannel = useEmojisPannel(clickEmojiHandlerDebounced, hidePannel)
  return (
    <span className='emoji-btn-wrapper'>
      <IconButton className='emoji-toolbar-btn' isActive={isVisible} clickHandler={togglePannel}>
        <span><i className='iconfont'>&#xe783;</i></span>
      </IconButton>
      <div className={`emojis-pannel-wrapper ${isVisible ? 'emojis-pannel-wrapper-visible' : ''}`}>
        {/* <EmojisPannel clickEmojiHandler={clickEmojiHandler} hidePannel={hidePannel}/> */}
        {EmojisPannel}
      </div>
    </span>
  )
}

const mapStateToProps = (state: IStoreState) => {
  return {
    value: state.value
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setValue (value: Value) {
      dispatch(setValue(value))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EmojisButton)
