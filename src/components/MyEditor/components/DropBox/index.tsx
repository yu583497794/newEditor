import React from 'react'
import './index.styl'
// 实现可调节位置的
const MARGIN_HORIZON = 8
export interface IDropBoxProps {
  visible: boolean;
  setVisible: (visible: boolean) => any;
  marginTop?: string;
  wrapper?: string;
  hidePannel: (e: React.MouseEvent<HTMLDivElement>) => any
}
const IconPannel: React.FC<IDropBoxProps> = function (props) {
  const dropbox = React.useRef(null)
  React.useEffect(() => {
    if (dropbox.current === null) return
    let wrapper
    try {
      wrapper = document.querySelector<HTMLElement>(props.wrapper || 'body')
    } catch(e) {
      wrapper = document.querySelector<HTMLElement>('body')
    }
    // @ts-ignore
    const outerRect = wrapper.getBoundingClientRect()
    // @ts-ignore
    const innerRect = dropbox.current.getBoundingClientRect()
    const leftOffset = innerRect.left - outerRect.left
    const rightOffset = outerRect.right - innerRect.right
    // 左侧与外容器的最小间隔是5px
    let toRight = leftOffset < MARGIN_HORIZON ? MARGIN_HORIZON - leftOffset : 0
    let toLeft = rightOffset < MARGIN_HORIZON ? rightOffset - MARGIN_HORIZON : 0
    // @ts-ignore
    dropbox.current.style.transform = `translate(${toRight || toLeft}px, 0)`
  }, [props.wrapper])

  // const hidePannel = React.useCallback((e) => {
  //   e.preventDefault()
  //   e.stopPropagation()
  //   props.setVisible(false)
  //   // 会失去焦点
  // }, [props])

  return (
    <div className={`dropbox-wrapper ${props.visible ? '' : 'dropbox-wrapper-invisible'}`}>
      <div className='dropbox-mask' onClick={props.hidePannel}/>
      <div className='dropbox-content' ref={dropbox}>
        {props.children}
      </div>
      <div className='dropbox-triangle'/>
    </div>
  )
}

export default IconPannel