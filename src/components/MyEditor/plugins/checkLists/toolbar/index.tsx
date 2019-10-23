import React from 'react'
import IconButton from '../../components/IconButton'
import { connect } from 'react-redux'
import { setValue } from '../../../../../store/actions'
import { Value, Editor } from 'slate' 
import { IStoreState } from '../../../../../store'

export interface ICheckListProps {
  value: Value,
  setValue: (value: Value) => any
}
const CheckListButton: React.FunctionComponent<ICheckListProps> = (props) => {
  const clickHandler = React.useCallback(() => {
    const type = props.value.startBlock.type === 'check-list' ? 'paragraph' : 'check-list'
    const controller = new Editor({value: props.value})
    props.setValue(
      controller.setBlocks(type).value
    )

  }, [props])
  const isActive = React.useMemo(() => {
    return props.value.startBlock && props.value.startBlock.type === 'check-list'
  }, [props])
  return (
    <IconButton
      clickHandler={clickHandler}
      // 继续
      isActive={isActive}
    >
      <i className='iconfont'>&#xe8ad;</i>
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
    setValue: (value: Value) => {
      dispatch(setValue(value))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CheckListButton)