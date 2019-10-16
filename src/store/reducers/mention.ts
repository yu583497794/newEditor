export interface IMentionAction {
  type: string;
  load?: boolean
}

const mention = (state: boolean, action: IMentionAction) => {
  switch (action.type) {
    case 'SET_MENTION': return action.load
    default: return state
  }
}

export default mention
