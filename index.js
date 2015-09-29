module.exports = intersection
module.exports.distance = distance

function intersection (out, ro, rd, aabb) {
  var d = distance(ro, rd, aabb)
  if (d === Infinity) return null

  out = out || []

  for (var i = 0, l = ro.length; i < l; i += 1) {
    out[i] = ro[i] + rd[i] * d
  }

  return out
}

function distance (ro, rd, aabb) {
  var dims = ro.length
  var lo = -Infinity
  var hi = +Infinity

  for (var i = 0; i < dims; i++) {
    var dimLo = (aabb[0][i] - ro[i]) / rd[i]
    var dimHi = (aabb[1][i] - ro[i]) / rd[i]

    if (dimLo > dimHi) {
      var tmp = dimLo
      dimLo = dimHi
      dimHi = tmp
    }

    if (dimHi < lo) return Infinity
    if (dimLo > hi) return Infinity

    lo = Math.max(lo, dimLo)
    hi = Math.min(hi, dimHi)
  }

  if (lo > hi) return Infinity

  return lo
}
