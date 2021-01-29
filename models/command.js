function Command (binding, name, key) {
  this.binding = binding
  this.name = name
  this.key = key
  this.active = false
  this.pressed = false
}

module.exports = Command
