import React from 'react'
import PannelButton from '../../../components/PannelButton'
import DropBox from '../../../components/DropBox'
import IconButton from '../../../components/IconButton'
import LinkPannel from './LinkPannel'
import { Value, Editor, Text } from 'slate'
import { setValue } from '../../../../../store/actions'
import { IStoreState } from '../../../../../store/index'
import { connect } from 'react-redux'
import './index.styl'
export type ILinkBtnProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & {}
const LinkButton = (props: ILinkBtnProps) => {
  const [isVisible, setVisible] = React.useState(false)
  const insertLink = React.useCallback((editor: Editor, href: string, text: string) => {
    return editor.insertInlineAtRange(editor.value.selection, {
      type: 'link',
      data: {
        href,
        text: text || '链接',
      }
    }).moveToEnd().focus()
  }, [])
  const getSelectionText = React.useCallback((value: Value) => {
    let res = ''
    const { selection } = value
    const { start, end } = selection
    const controller = new Editor({
      value
    })
    // 将选中部分的link inline先转化为text 
    value.inlines.forEach(inline => {
      // @ts-ignore
      if (inline.type === 'link') {
        // @ts-ignore
        controller.replaceNodeByKey(inline.key, Text.create(inline.data.get('text')))
      }
    })
    controller.value.texts.forEach(text => {
      // @ts-ignore
      if (start.key === text.key) {
        // @ts-ignore
        if (text.key === end.key) {
          //@ts-ignore
          res+= text.text.slice(start.offset, end.offset)
        } else {
          // @ts-ignore
          res+= text.text.slice(start.offset)
        }
      // @ts-ignore
      } else if (end.key === text.key) {
      // @ts-ignore
        res+= text.text.slice(0, end.offset)
      } else {
        res += (text ? text.text : '')
      }
    })
    return res
  }, [])
  const clickHandler = React.useCallback((href: string, text: string) => {
    const { value } = props
    const controller = new Editor({
      value
    })
    if (value.selection.isCollapsed) {
      controller.command(insertLink, href, text)
    } else {
      let selectedText = getSelectionText(value)
      controller.command(insertLink, href, selectedText)
    }
    props.setValue(controller.value)
    setVisible(false)
  }, [props, insertLink, getSelectionText])
  const onlyUrl = React.useMemo(() => {
    return props.value.selection.isExpanded
  }, [props.value.selection.isExpanded])
  return (
    <div className='link-btn-wrapper'>
      <PannelButton setVisible={setVisible} isVisible={isVisible}>
        <IconButton isActive={isVisible} clickHandler={() => setVisible(visible => !visible)}>
          <i className='iconfont'>&#xe623;</i>
        </IconButton>
      </PannelButton>
      <DropBox visible={isVisible} setVisible={setVisible} wrapper={'#editor-wrapper'} hidePannel={() => setVisible(false)}>
        <LinkPannel clickHandler={clickHandler} onlyUrl={onlyUrl}/>
      </DropBox>
    </div>
  )
}

const mapStateToProps = (state:IStoreState) => {
  return {
    value: state.value
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setValue: (value: Value) => dispatch(setValue(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkButton)