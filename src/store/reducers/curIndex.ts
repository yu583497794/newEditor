export interface ICurIndexAction {
  type: string,
  index: number
}

const curIndex = (state: number = 0, action: ICurIndexAction) => {
  switch (action.type) {
    case 'SET_CUR_INDEX':
      return action.index
    default:
      return state
  }
}

export default curIndex