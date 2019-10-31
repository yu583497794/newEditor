import React from 'react'

export interface ILinkPannelProps {
  clickHandler: (text: string, href: string) => any;
  onlyUrl: boolean;
}

const LinkPannel = (props: ILinkPannelProps) => {
  const text = React.useRef(null)
  const url = React.useRef(null)
  const clickHandler = React.useCallback((e) => {
    e.preventDefault()
    if (url.current) {
      if (text.current) {
        // @ts-ignore
        props.clickHandler(url.current.value, text.current.value || '链接')
      } else {
        // @ts-ignore
        props.clickHandler(url.current.value)
      }
    }
  }, [props])
  return (
    <div className='link-pannel-wrapper'>
      {
        !props.onlyUrl && (<label>
          <span>请输入链接的名称</span>
          <input type="text" ref={text}/>
        </label>)
      }
      <label>
        <span>请输入链接的url</span>
        <input type="text"  ref={url}/>
      </label>
      <button type='submit' onClick={clickHandler}>提交</button>
    </div>
  )
}

export default LinkPannel