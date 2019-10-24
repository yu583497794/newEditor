import React from 'react'
import './index.styl'
const defaultColorList = [
  '#FFC1C1', '#FFC125', '#FFC0CB', '#FFBBFF',
  '#FFB90F', '#FFB6C1', '#FFB5C5', '#FFAEB9',
  '#FFA54F', '#FFA500', '#FFA07A', '#FF8C69'
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

