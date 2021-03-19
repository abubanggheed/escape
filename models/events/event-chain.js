const LL = require('../ll')
const values = require('../../src/values')

function EventChain(id, events = []) {
  this.id = id
  this.events = new LL(...events)
  this.ce = this.events.pop()
  this.update = () => {
    if (!this.ce) return
    let { noWait } = this.ce
    this.ce && this.ce.update()
    this.ce.complete && (
      this.ce = this.events.pop(),
      noWait && this.ce && this.ce.update()
    )
  }
  this.render = () => {
    this.ce && this.ce.render()
  }
}

module.exports = EventChain
