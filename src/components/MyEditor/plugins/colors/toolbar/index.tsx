import React from 'react'
import DropBox from '../../../components/DropBox'
import PannelButton from '../../../components/PannelButton'
import IconButton from '../../../components/IconButton'
import ColorPannel from '../components/ColorPannel'
import { Value, Editor } from 'slate'
import { setValue } from '../../../../../store/actions'
import { IStoreState } from '../../../../../store/index'
import { connect } from 'react-redux'
import './index.styl'

export type IColorBtnProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & {}

const ColorButton: React.FC<IColorBtnProps> = props => {
  const [ isVisible, setVisible ] =  React.useState(false)
  const [ curColor, setCurColor ] = React.useState('#000')

  const setTextCurColor = React.useCallback((e) => {
    const controller = new Editor({
      value: props.value
    })
    const newValue = controller.toggleMark({
      type: 'color',
      data: { 
        color: curColor
      }
    }).value
    return props.setValue(newValue)
  }, [props, curColor])

  const setTextNewColor = React.useCallback((color) => {
    const controller = new Editor({
      value: props.value
    })
    const newValue = controller.toggleMark({
      type: 'color',
      data: {
        color
      }
    }).value
    return props.setValue(newValue)
  }, [props])

  const clickHandler = React.useCallback((e, color) => {
    if (color !== curColor) {
      setCurColor(color)
    }
    setTextNewColor(color)
    
  }, [curColor, setTextNewColor])
  return (
    <div className='colors-btn-wrapper'>
      <PannelButton setVisible={setVisible} isVisible={isVisible}>
        <IconButton isActive={true} clickHandler={setTextCurColor}>
          <i className='iconfont' style={{color: curColor}}>&#xecda;</i>
        </IconButton>
      </PannelButton>
      <DropBox visible={isVisible} setVisible={setVisible} wrapper={'#editor-wrapper'}>
        <ColorPannel setCurColor={clickHandler} curColor={curColor} />
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