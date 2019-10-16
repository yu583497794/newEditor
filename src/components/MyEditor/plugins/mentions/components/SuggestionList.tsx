import React from 'react'
// import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import Suggestion from './Suggestion'
import { IMention } from '../'
import { IStoreState } from  '../../../../../store'
import './suggestionList.styl'
import onSelect from '../handlers/onSelect'
export interface ISuggestionListProps {
  users: IMention[];
  // onSelect: (user: IMention) => any;
  anchor: string;
  curIndex: number;
}
export interface ISuggestionListState {
  top: number;
  left: number;
  // curIndex: number;
}
const DEFAULT_POSITION = {
  top: -10000,
  left: -10000,
}

class SuggestionList extends React.PureComponent<ISuggestionListProps, ISuggestionListState> {
  constructor (props:ISuggestionListProps) {
    super(props)
    this.state = {
      ...DEFAULT_POSITION,
      // curIndex: 0
    }
  }
  componentDidUpdate () {
    this.updateMenu()
  }
  componentDidMount () {
    this.updateMenu()
  }
  updateMenu () {
    const anchor = window.document.querySelector(this.props.anchor)
    if (!anchor) {
      return this.setState(DEFAULT_POSITION)
    }
    const anchorRect = anchor.getBoundingClientRect()

    this.setState({
      top: anchorRect.bottom + window.pageYOffset,
      left: anchorRect.left + window.pageXOffset
    })
  }
  
  // render () {
  //   const root = window.document.getElementById('editor-wrapper')
  //   return ReactDOM.createPortal(
  //     <ul className='suggestion-list'  style={{top: this.state.top + 'px', left: this.state.left + 'px'}}>
  //       {this.props.users.map(user => {
  //         return (
  //           <Suggestion onSelect={() => {this.props.onSelect(user)}} key={user.id}>
  //             {user.username}
  //           </Suggestion>
  //         )
  //       })}
  //     </ul>,
  //     // @ts-ignore
  //     root
  //   )
  // }
  render () {
    const { users, curIndex } = this.props
    // const { curIndex } = this.state
    return users.length > 0 && (
      <ul
        className='suggestion-list'
        style={{top: this.state.top + 'px', left: this.state.left + 'px'}}
        // onKeyDown={(e) => {this.keydownHandler(e)}}
      >
        {users.map((user, index) => {
          return (
            <Suggestion
              onSelect={() => {onSelect(user)}}
              key={user.id}
              isCurrent={ curIndex === index}
            >
              {user.username}
            </Suggestion>
          )
        })}
      </ul>
    )
  }
}

const mapStateToProps = (state: IStoreState) => {
  return {
    users: state.users,
    curIndex: state.curIndex
  }
}
export default connect(mapStateToProps)(SuggestionList)