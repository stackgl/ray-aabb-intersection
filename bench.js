const intersect = require('./')
const Suite = require('benchmark').Suite

const suite = new Suite()
const tests = [
  {
    name: 'x axis 3d',
    aabb: [[-1, -1, -1], [+1, +1, +1]],
    ro: [-2, 0, 0],
    rd: [+1, 0, 0]
  },
  {
    name: 'y axis 3d',
    aabb: [[-1, -1, -1], [+1, +1, +1]],
    ro: [0, -2, 0],
    rd: [0, +1, 0]
  },
  {
    name: 'z axis 3d',
    aabb: [[-1, -1, -1], [+1, +1, +1]],
    ro: [0, 0, -2],
    rd: [0, 0, +1]
  },
  {
    name: 'miss 3d',
    aabb: [[-1, -1, -1], [+1, +1, +1]],
    ro: [0, 0, -2],
    rd: [0, 0, -1]
  }
]

tests.forEach(function (params) {
  const out = new Float32Array(3)
  const aabb = params.aabb
  const rd = params.rd
  const ro = params.ro

  suite.add(params.name + ' (distance)', function () {
    intersect.distance(ro, rd, aabb)
  })

  suite.add(params.name + ' (distance + calc)', function () {
    const d = intersect.distance(ro, rd, aabb)
    out[0] = ro[0] + d * rd[0]
    out[1] = ro[1] + d * rd[1]
    out[2] = ro[2] + d * rd[2]
  })

  suite.add(params.name + ' (out)', function () {
    intersect(out, ro, rd, aabb)
  })
})

suite.on('cycle', function (event) {
  console.log(String(event.target))
})

suite.on('complete', function () {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'))
})

suite.run()
