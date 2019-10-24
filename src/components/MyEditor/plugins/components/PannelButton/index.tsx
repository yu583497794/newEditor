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
      <div className='pannel-icon'>
        {props.children}
      </div>
      <span className={`state-tip ${props.isVisible ? '' : 'down'}`} onClick={toggleVisible}/>
    </div>
  ) 
}

export default PannelButton