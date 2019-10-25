import React from 'react'
import './index.styl'
const defaultColorList = [
  '#FFC1C1', '#9A32CD', '#00F57F', '#FFBBFF',
  '#32B90F', '#00FF7F'
]
export interface IColorPannelProps {
  setCurColor: (e: React.MouseEvent, color: string) => any;
  curColor: string;
  colorList?: string[];
}

const ColorPannel: React.FC<IColorPannelProps> = (props) => {
  const colorList = React.useMemo(() => props.colorList || defaultColorList, [props.colorList])
  return (
    <ul className='color-list'>
      {
        colorList.map(color => {
          return (
            <li className={`color-item ${color === props.curColor ? 'cur-color-item' : ''}`} key={color} onClick={(e) => {props.setCurColor(e, color)}}>
              <span className='color-item-content' style={{background: color}}></span>
            </li>
          )
        })
      }
    </ul>
  )
}

export default ColorPannel

