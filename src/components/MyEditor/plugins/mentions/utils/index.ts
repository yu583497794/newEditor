import { Value } from 'slate'

const INPUT_REGEXP = /@(\S*)/
export function getInput (value: Value): string {
  if (!value.startText) return ''
  const startOffset = value.selection.start.offset
  const begin = value.startText.text.lastIndexOf('@', startOffset)
  const startText = value.startText.text.slice(begin, startOffset)
  const res = INPUT_REGEXP.exec(startText)
  return res ? res[1] : ''
}
