import React from 'react'
// 实现可调节位置的
const MARGIN_HORIZON = 5
export interface IDropBoxProps {
  visible: boolean;
  setVisible: (visible: boolean) => any;
  marginTop?: string;
  wrapper?: string;
}
const IconPannel: React.FC<IDropBoxProps> = function (props) {
  React.useEffect(() => {
    const wrapper = document.querySelector<HTMLElement>(props.wrapper || 'body')
    const dropbox = document.querySelector<HTMLElement>('#dropbox')
    // @ts-ignore
    const outerRect = wrapper.getBoundingClientRect()
    // @ts-ignore
    const innerRect = dropbox.getBoundingClientRect()
    const leftOffset = innerRect.left - outerRect.left
    const rightOffset = outerRect.right - innerRect.right
    // 左侧与外容器的最小间隔是5px
    let toRight = leftOffset > MARGIN_HORIZON ? MARGIN_HORIZON - leftOffset : 0
    let toLeft = rightOffset > MARGIN_HORIZON ? rightOffset - MARGIN_HORIZON : 0
    // @ts-ignore
    dropbox.style.transform = `translate(0, ${toRight || toLeft}px)`
  }, [props.wrapper])

  return (
    <div className='dropbox-wrapper'>
      <div className='triangle'></div>
      <div id='dropbox'>
        {props.children}
      </div>
    </div>
    
  )
}

export default IconPannel