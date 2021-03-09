const LL = require("../ll")


function EventChain (id, events = []) {
  this.id = id
  this.events = new LL(...events)
}

module.exports = EventChain
