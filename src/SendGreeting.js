module.exports = (req) => {
  return {
    text: 'Hello ' + req.body.name,
    template: 'hello',
    params: {
      name: req.body.name
    }
  }
}
