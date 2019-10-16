import createOnChangeFn from './handlers/onChange'
import onKeyDown from './handlers/onKeyDown'
import schema from './schemas'
import  renders from './renders'
const defaultUsers: IMention[] = require('./users.json')
export default {
  onChange: createOnChangeFn(defaultUsers),
  onKeyDown,
  schema,
  ...renders
}

export interface IMention {
  username: string;
  id: string;
}

export const CONTEXT_ANNOTATION_TYPE = 'mentionContext'
export const USER_MENTION_NODE_TYPE = 'userMention'