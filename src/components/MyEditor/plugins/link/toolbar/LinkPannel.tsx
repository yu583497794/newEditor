import React from 'react'
import './linkPannel.styl'
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
        // @ts-ignore
        text.current.value = ''
        // @ts-ignore
      } else {
        // @ts-ignore
        props.clickHandler(url.current.value)
      }
      // @ts-ignore
      url.current.value = ''
    }
  }, [props])
  return (
    <div className='link-pannel-wrapper'>
      <section className='link-form'>
        {
          !props.onlyUrl && (<label className='link-label'>
            <span className='link-text'>链接名称</span>
            <span className='link-input'>
              <input type="text" ref={text}/>
            </span>
          </label>)
        }
        <label className='link-label'>
          <span className='link-text'>链接url</span>
          <span className='link-input'>
            <input type="url"  required ref={url} className='link-input-url'/>
          </span>
        </label>
      </section>
      <section className='link-submit'>
        <button type='submit' onClick={clickHandler}>提交</button>
      </section>
    </div>
  )
}

export default LinkPannel