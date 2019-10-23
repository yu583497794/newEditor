function isInCheckList (value) {
  return value.startBlock.type === 'check-list'
}

const onKeyDown = (event, editor, next) => {
  // @ts-ignore
  const { key } = event
  const { value } = editor
  if (!isInCheckList(value)) {
    return next()
  }
  if (key === 'Enter') {
    return editor.insertBlock({
      type: 'check-list',
      data: {
        checked: false
      }
    })
    // setBlocks Set the properties of the Blocks in the current selection. 
    // Passing a string will set the blocks' type only.
    // editor.splitBlock().setBlocks({
    //   type: 'check-list',
    //   data: {
    //     checked: false
    //   }
    // })
  }
  // value.selection.startOffset
  // value.startBlock.getOffset(value.selection.start.path)
  // 应该是位于block 的offset为0
  const startPoint = value.selection.start
  const startBlock = value.startBlock
  if (key === 'Backspace' && value.selection.isCollapsed && startBlock && startBlock.getOffset(startPoint.key) === 0 && startBlock.getInlines().size === 0 && startPoint && startPoint.offset === 0) {
    // 需要对placeholder做处理
    return editor.setBlocks('paragraph')
    // 错误的
    // return editor.removeNodeByKey(value.startBlock.key)
  }
  return next()
}

export default onKeyDown

// import { EventHook } from 'slate-react'
// import { Value } from 'slate'

// function isInCheckList (value: Value): boolean {
//   return value.startBlock.type === 'check-list'
// }

// const onKeyDown: EventHook = (event, editor, next) => {
//   // @ts-ignore
//   const { key } = event
//   const { value } = editor
//   if (!isInCheckList(value)) {
//     return next()
//   }
//   if (key === 'Enter') {
//     return editor.insertBlock({
//       type: 'check-list',
//       data: {
//         checked: false
//       }
//     })
//     // setBlocks Set the properties of the Blocks in the current selection. 
//     // Passing a string will set the blocks' type only.
//     // editor.splitBlock().setBlocks({
//     //   type: 'check-list',
//     //   data: {
//     //     checked: false
//     //   }
//     // })
//   }
//   // value.selection.startOffset
//   if (key === 'Backspace' && value.selection.isCollapsed &&  value.startBlock.getOffset(value.selection.start.path) === 0) {
//     // return editor.removeNodeByKey(value.startBlock.key)
//     return editor.setBlocks('paragraph')
//   }
// }

// export default onKeyDown