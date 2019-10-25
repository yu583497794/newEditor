import React from 'react'
import './index.styl'
export interface IPannelBtnProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isVisible: boolean;
}
const PannelButton: React.FC<IPannelBtnProps> = (props) => {
  const toggleVisible = React.useCallback(() => {
    props.setVisible((visible) => !visible)
  }, [props])
  return (
    <div className='pannel-icon-wrapper'>
      <span className='pannel-icon'>
        {props.children}
      </span>
      <span className={`state-tip ${props.isVisible ? '' : 'down'}`} onClick={toggleVisible}>
        <span className='pannel-icon-triangle'/>
      </span>
    </div>
  ) 
}

export default PannelButton