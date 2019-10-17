import React from 'react'
import { Editor, OnChangeParam, EditorState } from 'slate-react'
// import { Value, Editor as CoreEditor } from 'slate'
import { Value } from 'slate'
import { connect } from 'react-redux'
import { setValue as updateValue, setUsers } from '../../store/actions'
import { IStoreState } from '../../store'
import plugins from './plugins'
import Toolbar from './toolbar'
import Suggestions from './plugins/mentions/components/SuggestionList'
// import { getInput } from './plugins/mentions/utils'
// import { USER_MENTION_NODE_TYPE, IMention } from './plugins/mentions'
import { IMention } from './plugins/mentions'

export interface IMyEditorProps extends EditorState {
  // onChange: OnChangeFn; 
  setValue: (value: Value) => any
  setUsers: (users: IMention[]) => any
}

class MyEditor extends React.Component<IMyEditorProps> {
  constructor (props: IMyEditorProps) {
    super(props)
    this.state = {
      value: props.value
    }
  }
  // insertMention (user: IMention) {
  //   const value = this.props.value
  //   const input = getInput(value)
  //   const controller = new CoreEditor({value})

  //   controller.deleteBackward(input.length + 1)

  //   const selectedRange = controller.value.selection
  //   const newValue = controller
  //     .insertText(' ')
  //     .insertInlineAtRange(selectedRange, {
  //       data: {
  //         userId: user.id,
  //         username: user.username
  //       },
  //       // nodes: [
  //       //   Text.create({
  //       //     text: `@${user.username}`
  //       //   })
  //       // ],
  //       type: USER_MENTION_NODE_TYPE
  //     })
  //     .value
  //   this.props.setValue(newValue)
  //   this.props.setUsers([])
  // }
  onChange = (change: OnChangeParam) => {
    this.props.setValue(change.value)
  }
  render () {
    return (
      <div id='editor-wrapper'>
        <Toolbar/>
        <Editor
          value={this.props.value}   
          placeholder={"请输入..."}
          plugins={plugins}
          // onChange={this.props.onChange}
          onChange={this.onChange}
        />
        <Suggestions
          // onSelect={(user) => {this.insertMention(user)}}
          anchor={'.mention-context'}
        />
      </div>
    ) 
  }
}

const mapStateToProps = (state: IStoreState) => {
  return {
    value: state.value
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    // onChange: (change: OnChangeParam) => {
    //   dispatch(setValue(change.value))
    // }
    // onChange: (change: OnChangeParam) => {
    //   dispatch(setValue(change.value))
    // }
    setValue: (value: Value) => {
      dispatch(updateValue(value))
    },
    setUsers: (users: IMention[]) => {
      dispatch(setUsers(users))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyEditor)