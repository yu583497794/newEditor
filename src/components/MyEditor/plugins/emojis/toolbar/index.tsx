import React from 'react'
import DropBox from '../../../components/DropBox'
import PannelButton from '../../../components/PannelButton'
import IconButton from '../../../components/IconButton'
import EmojisPannel from './emojisPannel'
import { Inline, Editor as CoreEditor, Value } from 'slate'
import { setValue } from '../../../../../store/actions'
import { IStoreState } from '../../../../../store/index'
import { connect } from 'react-redux'
import { debounce } from 'lodash'
import './index.styl'

export type IEmojiBtnProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
const EmojiButton: React.FC<IEmojiBtnProps> = ({value, setValue}: IEmojiBtnProps) => {
  const [isVisible, setVisible] = React.useState(false)
  const hidePannel = React.useCallback(() => {
    setVisible(false)
  }, [])
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
  return (
    <div className='color-btn-wrapper'>
      <PannelButton setVisible={setVisible} isVisible={isVisible}>
        <IconButton isActive={isVisible} clickHandler={() => {setVisible((v) => !v)}}>
          <i className='iconfont'>&#xe783;</i>
        </IconButton>
      </PannelButton>
      <DropBox visible={isVisible} setVisible={setVisible} wrapper={'#editor-wrapper'} hidePannel={hidePannel}>
        <EmojisPannel clickEmojiHandler={clickEmojiHandlerDebounced}/>
      </DropBox>
    </div>
  )
}

const mapStateToProps = (state:IStoreState) => {
  return {
    value: state.value
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    setValue: (value: Value) => dispatch(setValue(value))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EmojiButton)