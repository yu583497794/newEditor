// @ts-ignore
import PlaceholderPlugin from 'slate-react-placeholder'
import isEmpty from './queries/isEmpty'
export default [
  {
    queries: {
      isEmpty
    }
  },
  PlaceholderPlugin({
    placeholder: '请输入',
    when: isEmpty
  })
]