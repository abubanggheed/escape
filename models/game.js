
function Game() {
  this.paused = false
  this.stateCode = 0
  this.components = []
  this.update = () => {
    this.components.forEach(comp => comp.update())
  }
}

module.exports = Game
