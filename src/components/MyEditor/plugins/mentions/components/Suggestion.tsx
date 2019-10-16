import React from 'react'
import './suggestionItem.styl'
export interface ISuggestionProps {
  key: string;
  onSelect: () => any;
  isCurrent: boolean;
  // className: string
}

class Suggestion extends React.Component<ISuggestionProps> {
  state = {
    suggestionRef: React.createRef<HTMLLIElement>()
  }
  componentDidUpdate () {
    if (this.props.isCurrent) {
      const suggestion = this.state.suggestionRef.current
      suggestion && suggestion.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
        inline: 'nearest'
      })
    }
  }
  render () {
    return (
      <li
        onClick={this.props.onSelect}
        className={`suggestion-item ${this.props.isCurrent ? 'current-suggestion' : ''}`}
        ref={this.state.suggestionRef}
      >
          {this.props.children}
      </li>
    )
  }
}

export default Suggestion