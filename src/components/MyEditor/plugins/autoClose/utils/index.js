const chineseQuoteKeyMap = {
  '“': '',
  '”': true,
  '‘': true,
  '’': true,
};
const chineseLeftBracketKeyMap = {
  '｛': true,
  '【': true,
  '（': true,
};
const chineseRightBracketKeyMap = {
  '｝': true,
  '】': true,
  '）': true,
};
const englishQuoteKeyMap = {
  '\'': true,
  '"': true,
};
const englishLeftBracketKeyMap = {
  '{': true,
  '[': true,
  '(': true,
};
const englishRightBracketKeyMap = {
  '}': true,
  ']': true,
  ')': true,
};
const rightCoupleKeyMap = {
  '“': '”',
  '‘': '’',
  '｛': '｝',
  '【': '】',
  '（': '）',
  '{': '}',
  '[': ']',
  '(': ')',
  '\'': '\'',
  '"': '"',
};
const coupleKeyMap = {
  ...chineseQuoteKeyMap,
  ...chineseLeftBracketKeyMap,
  ...chineseRightBracketKeyMap,
  ...englishQuoteKeyMap,
  ...englishLeftBracketKeyMap,
  ...englishRightBracketKeyMap,
};
const rightBracketKeyMap = {
  ...chineseRightBracketKeyMap,
  ...englishRightBracketKeyMap,
};
const leftCoupleKeyMap = {
  ...englishQuoteKeyMap,
  ...englishLeftBracketKeyMap,
};
const chineseQuoteCPMap = {
  '‘': ['‘', '’'],
  '’': ['‘', '’'],
  '“': ['“', '”'],
  '”': ['“', '”'],
}
export function isCoupleKey (key) {
  return coupleKeyMap[key] || false;
};
export function isRightBracket (key) {
  return rightBracketKeyMap[key] || false;
};
export function getRightCoupleKey (key) {
  return rightCoupleKeyMap[key] || '';
};
export function isEnglishQuoteKey (key) {
  return englishQuoteKeyMap[key] || false;
};
export function isLeftCoupleKey (key) {
  return leftCoupleKeyMap[key] || false;
};
export function isChineseQuoteKey (key) {
  return chineseQuoteKeyMap[key] || false;
};
export function getChineseQuoteCP (key) {
  return chineseQuoteCPMap[key] || ['', ''];
};
export function isCouple (leftKey, rightKey) {
  return getRightCoupleKey(leftKey) === rightKey;
};

const chineseRegExp = /[\u4e00-\u9fa5\d\w]/;
export function isTextOrQuote(char) {
  return char && (chineseRegExp.test(char) || isEnglishQuoteKey(char));
}
