import {
  isCoupleKey, isLeftCoupleKey, isRightBracket, getRightCoupleKey, isEnglishQuoteKey, isChineseQuoteKey, getChineseQuoteCP, isTextOrQuote,
} from '../utils';
// import { EventHook } from 'slate-react'
const onBeforeInput = function (event, editor, next){
  const { data } = event;
  if (!isCoupleKey(data)) {
    return next();
  }
  const { value } = editor;
  const { selection, startText } = value;
  const { offset } = selection.anchor;
  const leftChar = startText.text[offset - 1];
  const rightChar = startText.text[offset];                                      
  if (selection.isExpanded) {
    // 选中状态下处理中文引号,不管是左引号还是右引号都选中包裹
    if (isChineseQuoteKey(data)) {
      event.preventDefault();
      return editor.wrapText(...getChineseQuoteCP(data));
    }
    // 选中状态下处理键入英文左引号左括号，中文左括号
    if (isLeftCoupleKey(data)) {
      event.preventDefault();
      return editor.wrapText(data, getRightCoupleKey(data));
    }
    return next();
  } else {
    // 特殊处理对英文引号的键出和默认键入
    if (isEnglishQuoteKey(data)) {
      // 未选中状态下，处理英文引号的键出效果
      if (data === rightChar && isTextOrQuote(leftChar)) {
        event.preventDefault();
        return editor.moveForward(1);
      }
      // 未选中状态下，处理英文引号的默认效果
      if (isTextOrQuote(leftChar) || isTextOrQuote(rightChar)) {
        return next();
      }
    }
    // 未选中状态下，处理英文左引号左括号，中文左括号的自动补全效果
    if (isLeftCoupleKey(data)) {
      event.preventDefault();
      return editor.wrapText(data, getRightCoupleKey(data));
    }
    // 中文引号的自动补全
    // if (isChineseQuoteKey(data)) {
    //   event.preventDefault();
    //   return editor.wrapText(...getChineseQuoteCP(data));
    // }
    // 未选中状态下，处理中英文右括号
    if (isRightBracket(data) && rightChar === data) {
      event.preventDefault();
      return editor.moveForward(1);
    }
    return next();
  }
}

export default onBeforeInput