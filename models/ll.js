
module.exports = function (...items) {
  this.first = items[0]
  this.last = items[items.length - 1]
  items.forEach((it, i) => {
    it.next = it[i + 1]
    it.prev = it[i - 1]
  })
  this.shift = () => {
    let first = this.first
    this.first = first && first.next
    this.first && (this.first.prev = undefined)
    return first
  }
  this.unshift = (...its) => {
    its.forEach(it => {
      it.next = this.first
      this.first && (this.first.prev = it)
      this.first = it
    })
  }
  this.pop = () => {
    let last = this.last
    this.last = last && last.prev
    this.last && (this.last.next = undefined)
    return last
  }
  this.push = (...its) => {
    its.forEach(it => {
      it.prev = this.last
      this.last && (this.last.next = it)
      this.last = it
    })
  }
}
