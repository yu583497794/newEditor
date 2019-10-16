import { IMention } from '../../components/MyEditor/plugins/mentions'

export interface IUsersAction {
  type: string;
  users: IMention[]
}

const users = (state: IMention[] = [], action: IUsersAction) => {
  switch (action.type) {
    case 'SET_USERS':
      return action.users
    default:
      return state
  }
}

export default users