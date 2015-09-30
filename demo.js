const canvas = document.body.appendChild(document.createElement('canvas'))
const cursor = require('touch-position')(canvas)
const normalize = require('gl-vec3/normalize')
const ctx = canvas.getContext('2d')
const intersection = require('./')
const raf = require('raf')

const aabb = [
  [-1, -1],
  [+1, +1]
]

render()
function render () {
  raf(render)

  const width = canvas.width
  const height = canvas.height
  const scale = 15
  const o = [
    5 * Math.cos(Date.now() / 768),
    5 * Math.sin(Date.now() / 368)
  ]

  ctx.fillStyle = '#f00'
  ctx.fillRect(0, 0, width, height)

  ctx.save()
  ctx.translate(width / 2, height / 2)
  ctx.scale(15, 15)

  aabb[0][0] = (Math.sin(Date.now() / 1000) - 2) * 2
  aabb[0][1] = (Math.sin(Date.now() / 1000) - 2) * 2
  aabb[1][0] = -aabb[0][0]
  aabb[1][1] = -aabb[0][1]
  aabb[0][0] += o[0]
  aabb[0][1] += o[1]
  aabb[1][0] += o[0]
  aabb[1][1] += o[1]

  const t = [
    Math.abs(aabb[0][0] - aabb[1][0]),
    Math.abs(aabb[0][1] - aabb[1][1])
  ]

  ctx.fillStyle = '#000'
  ctx.fillRect(
    aabb[0][0],
    aabb[0][1],
    t[0], t[1]
  )

  var x = (cursor[0] - width / 2) / scale
  var y = (cursor[1] - height / 2) / scale

  ctx.fillStyle = '#ff0'
  ctx.fillRect(x - 0.5, y - 0.5, 1, 1)

  var ro = [x, y]
  var rd = normalize([-x, -y], [])

  var d = intersection.distance(ro, rd, aabb)
  if (d === Infinity) d = 100

  ctx.strokeStyle = '#ff0'
  ctx.lineWidth = 0.2
  ctx.beginPath()
  ctx.moveTo(ro[0], ro[1])
  ctx.lineTo(ro[0] += d * rd[0], ro[1] += d * rd[1])
  ctx.stroke()

  ctx.fillRect(ro[0] - 0.25, ro[1] - 0.25, 0.5, 0.5)

  ctx.restore()
}

window.addEventListener('resize'
  , require('canvas-fit')(canvas)
  , false
)

canvas.addEventListener('touchstart', function (ev) {
  ev.preventDefault()
})
