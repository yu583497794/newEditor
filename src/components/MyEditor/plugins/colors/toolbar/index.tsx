import React from 'react'
import DropBox from '../../../components/DropBox'
import PannelButton from '../../../components/PannelButton'
import IconButton from '../../../components/IconButton'
import ColorsPannel from '../components/ColorPannel'
import { Value, Editor, Mark } from 'slate'
import { setValue } from '../../../../../store/actions'
import { IStoreState } from '../../../../../store/index'
import { connect } from 'react-redux'
import './index.styl'

export type IColorBtnProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & {}

const ColorButton: React.FC<IColorBtnProps> = props => {
  const [ isVisible, setVisible ] =  React.useState(false)
  const [ curColor, setCurColor ] = React.useState('#000')
  const setTextColor = React.useCallback((color) => {
    const { value, setValue } = props
    const { selection, document } = value
    const { start, end } = selection
    const controller = new Editor({
      value
    })
    const mark = Mark.create({
      type: 'color',
      data: {
        color
      }
    })
    // recode addMark
    if (selection.isExpanded) {
      controller.withoutNormalizing(() => {
        const texts = document.getTextsAtRange(selection)
        texts.forEach(node => {
          // @ts-ignore
          const { key } = node
          let index = 0
          let length = (node && node.text.length) || 0

          if (key === start.key) index = start.offset
          if (key === end.key) length = end.offset
          if (key === start.key && key === end.key)
            length = end.offset - start.offset
          
          // @ts-ignore
          const colorMarks = node.marks.filter(mark => mark.type === 'color')
          colorMarks.forEach(colorMark => {
            // @ts-ignore
            controller.removeMarkByKey(key, index, length, colorMark)
          })
        })
        controller.addMarkAtRange(selection, mark)
      }) 
    } else if (selection.marks) {
      // @ts-ignore
      const marks = selection.marks.filter(mark => mark.type !== 'color').add(mark)
      const sel = selection.set('marks', marks)
      // @ts-ignore
      controller.select(sel).focus()
    } else {
      // @ts-ignore
      const marks = document.getActiveMarksAtRange(selection).filter(mark => mark.type !== 'color').add(mark)
      const sel = selection.set('marks', marks)
      // @ts-ignore
      controller.select(sel).focus()
    }
    setValue(controller.value)
  }, [props])
  const setTextCurColor = React.useCallback((e) => {
    e.preventDefault()
    setTextColor(curColor)
  }, [setTextColor, curColor]) 

  const clickHandler = React.useCallback((color) => {
    if (color !== curColor) {
      setCurColor(color)
    }
    setVisible(false)
    setTextColor(color)
  }, [curColor, setTextColor])

  const hidePannel = React.useCallback((e) => {
    e.stopPropagation()
    setVisible(false)
    const newValue = new Editor({
      value: props.value
    }).focus().value
    props.setValue(newValue)
  }, [props])
  return (
    <div className='colors-btn-wrapper'>
      <PannelButton setVisible={setVisible} isVisible={isVisible}>
        <IconButton isActive={true} clickHandler={setTextCurColor}>
          <i className='iconfont' style={{color: curColor}}>&#xecda;</i>
        </IconButton>
      </PannelButton>
      <DropBox visible={isVisible} setVisible={setVisible} wrapper={'#editor-wrapper'} hidePannel={hidePannel}>
        <ColorsPannel setCurColor={clickHandler} curColor={curColor} />
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
export default connect(mapStateToProps, mapDispatchToProps)(ColorButton)