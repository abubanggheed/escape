const values = require('./values')

window.onload = () => {
  let canvas = document.createElement('canvas')
  document.body.appendChild(canvas)
  canvas.id = 'canvas'
  canvas.width = values.canvasWidth
  canvas.height = values.canvasHeight
  values.canvas = canvas
  values.context = canvas.getContext('2d')
  console.log(document)
}
