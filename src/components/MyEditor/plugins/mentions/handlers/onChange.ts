import { Value, Annotation, Point, Editor } from 'slate'
import { OnChangeParam, OnChangeFn } from 'slate-react'
import { IMention } from '../index'
import { CONTEXT_ANNOTATION_TYPE } from '../'
import { getInput } from '../utils'
import store from '../../../../../store'
import { setUsers, setValue } from '../../../../../store/actions'
function hasValidAncestors (value: Value) {
  // const { document, selection } = value
  // const parent = document.getParent(selection.start.path)
  // if (parent && parent.hasOwnProperty('type')) {
  //   return parent.type === 'paragraph'
  // } else {
  //   return false
  // }
  // ??? Text中不包含属性 type
  // return parent && (parent.type ?  parent.type === 'paragraph' : false)
  return true
}

function search (users: IMention[], searchQuery:string): IMention[] {
  if (!searchQuery) return users
  const regexp = new RegExp(searchQuery, 'ig')
  return users.filter(user => user.username.match(regexp)) || []
}

function createOnChangeFn (users: IMention[]): OnChangeFn {
  let lastInput = ''
  let n: number = 0
  let lastAnnotation: Annotation | null = null
  function getMention () {
    return `highlight_${n++}`
  }
  return function onChange ({value}: OnChangeParam) {
    const input = getInput(value) || ''
    
    if (input && input !== lastInput) {
      lastInput = input || ''
      if (hasValidAncestors(value)) {
        const maybeUsers: IMention[] = search(users, input)
        store.dispatch(setUsers(maybeUsers))

        const { selection } = value
        // filter(predicate: (value: V, key: K, iter: this) => any, context?: any): this
        // let annotations = value.annotations.filter(value => {
        //   // return value ? false : value.type !== CONTEXT_ANNOTATION_TYPE
        //   if (!value) return false
        //   return value.type !== CONTEXT_ANNOTATION_TYPE
        // }).toMap()

        // if (input && hasValidAncestors(value)) {
        //   const key = getMention()

        //   let newAnnotation: Annotation = Annotation.create({
        //     anchor: Point.create({
        //       key: selection.start.key,
        //       offset: selection.start.offset - input.length,
        //     }),
        //     focus: Point.create({
        //       key: selection.start.key,
        //       offset: selection.start.offset,
        //     }),
        //     type: CONTEXT_ANNOTATION_TYPE,
        //     key: getMention()
        //   })
        //   annotations = annotations.set(key, newAnnotation)
        // }
        let newAnnotation: Annotation = Annotation.create({
          anchor: Point.create({
            key: selection.start.key,
            offset: selection.start.offset - input.length,
          }),
          focus: Point.create({
            key: selection.start.key,
            offset: selection.start.offset,
          }),
          type: CONTEXT_ANNOTATION_TYPE,
          key: getMention()
        })
        const controller = new Editor({value})
        const newValue: Value = lastAnnotation
          ? controller.removeAnnotation(lastAnnotation).addAnnotation(newAnnotation).value
          : controller.addAnnotation(newAnnotation).value
        lastAnnotation = newAnnotation
        store.dispatch(setValue(newValue))
        return
      }
    }
    store.dispatch(setValue(value))
  }
}

export default createOnChangeFn