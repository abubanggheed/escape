function Command (binding, name, key) {
  this.binding = binding
  this.name = name
  this.key = key
  this.active = false
}

module.exports = Command
