
function Game() {
  this.paused = false
  this.stateCode = 0
  this.components = []
  this.addComponents = (...newComps) => this.components.push(...newComps)
  this.update = () => {
    this.components.forEach(comp => comp.update())
  }
  this.render = () => {
    this.components.forEach(comp => comp.render())
  }
}

module.exports = Game
