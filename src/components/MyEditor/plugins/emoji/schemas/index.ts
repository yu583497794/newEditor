export default {
  inlines: {
    emoji: {
      isVoid: true,
      nodes: [{
        match: { object: 'text' }
      }]
    }
  }
}
