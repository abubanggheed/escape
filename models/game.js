
function Game() {
  this.paused = false
  this.stateCode = 0
  this.components = []
  this.addComponent = newComp => this.components.push(newComp)
  this.update = () => {
    this.components.forEach(comp => comp.update())
  }
  this.render = () => {
    this.components.forEach(comp => comp.render())
  }
}

module.exports = Game
