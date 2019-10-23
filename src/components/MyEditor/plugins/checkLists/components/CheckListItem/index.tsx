import React from 'react'
import { RenderBlockProps } from 'slate-react'
import './index.styl'
class CheckListItem extends React.Component<RenderBlockProps> {
  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked
    const { editor, node } = this.props
    editor.setNodeByKey(node.key, { type: 'check-list', data: { checked } })
  }
  render () {
    const { attributes, children, node } = this.props
    const checked = node.data.get('checked')
    return (
      <div
        {...attributes}
        className='check-list-item'
      >
        <span className='check-list-item-btn'>
          <input type='checkbox' defaultChecked={checked} onChange={(e) => {this.onChange(e)}}/>
        </span>
        <span className={`check-list-item-text ${checked ? 'checked' : ''}`}>
          {children}
        </span>
      </div>
    )
  }
}

export default CheckListItem
