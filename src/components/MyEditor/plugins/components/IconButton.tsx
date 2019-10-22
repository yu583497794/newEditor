// eslint-disable-next-line
import React from 'react'
import './iconButton.styl'

export interface IIConButtonProps {
  children: Object;
  isActive: boolean;
  clickHandler: (e: any) => any;
  className?: string;
}
const IconButton: React.FC<IIConButtonProps> =  ({children, isActive, clickHandler}) => {
  const icon = React.useRef(null)
  // React.useEffect(() => {
  //   const eventHandler = (e) => {
  //     e.preventDefault()
  //     clickHandler(e)
  //   }
  //   icon.current.addEventListener('click', eventHandler)
  //   return () => {
  //     icon.current.removeEventListener('click', eventHandler)
  //   }
  // }, [icon, clickHandler])
  return (
    <span className={`toolbar-icon ${isActive ? 'active-toolbar-icon' : ''}`}
      onClick={e => {
        clickHandler(e)
        e.preventDefault()
      }}
      ref={icon}>
      {children}
    </span>
  )
}

export default IconButton
