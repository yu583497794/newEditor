// import { USER_MENTION_NODE_TYPE } from '../'

export default {
  inlines: {
    userMention: {
      isVoid: true,
      nodes: [{
        match: { object: 'text' }
      }]
    }
  }
}