import React from 'react'
import IconButton from '../../components/IconButton'
import { Editor, Value } from 'slate'
import { connect } from 'react-redux'
import { IStoreState } from '../../../../../store'
import { setValue } from '../../../../../store/actions'
// let markIconMap = {
//   bold: '\ue7f7',
//   italic: '\ue7fb',
//   underline: '\ue7fa'
// }
let markIconMap = new Map([['bold', '\ue7f7'], ['italic', '\ue7fb'], ['underline', '\ue7fa']])

type SetValueFn = (value: Value) => any

function clickHandler (type:string, value: Value, setValue: SetValueFn) {
  const controller = new Editor({value})
  setValue(controller.toggleMark(type).focus().value)
}
export interface IToolbarProps {
  value: Value;
  setValue: SetValueFn;
  // type: 'bold' | 'underline' | 'italic' | string;
  type: string;
}

const MarkButton = ({value, setValue, type}: IToolbarProps) => {
  const isActive = React.useMemo(() => {
    return value.activeMarks.some(mark => mark ? mark.type === type : false)
  }, [value, type])
  return (
    <IconButton clickHandler={() => { clickHandler(type, value, setValue) }} isActive={isActive}>
      <i className='iconfont'>{type && markIconMap.get(type)}</i>
    </IconButton>
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
export default connect(mapStateToProps, mapDispatchToProps)(MarkButton)
