
function Game() {
  this.paused = false
  this.stateCode = 0
  this.components = []
  this.scenes = []
  this.ctx = {}
  this.addComponents = (...newComps) => this.components.push(...newComps)
  this.removeComponents = (...targetIds) => this.components = this.components.filter(comp => !targetIds.includes(comp.id))
  this.removeFromScene = (i, ...targetIds) => this.scenes[i] = this.scenes[i].filter(comp => !targetIds.includes(comp.id))
  this.stack = () => this.scenes.push(this.components)
  this.pop = () => this.components = this.scenes.pop()
  this.clear = () => this.components = []
  this.removeScene = i => this.scenes = [...this.scenes.slice(0, i), ...this.scenes.slice(i + 1)]
  this.update = () => {
    for (let key in this.ctx) {
      this.ctx[key].rr()
    }
    this.components.forEach(comp => comp.update())
  }
  this.render = () => {
    for (let key in this.ctx) {
      this.ctx[key].clear()
    }
    this.components.forEach(comp => comp.render())
  }
}

module.exports = Game
