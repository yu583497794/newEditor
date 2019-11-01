export default {
  inlines: {
    link: {
      isVoid: true,
      nodes: [{
        match: { object: 'text' }
      }]
    }
  }
}