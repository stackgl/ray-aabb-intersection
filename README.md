# ray-aabb-intersection

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Determine the point of intersection between a ray and axis-aligned bounding box (AABB). Theoretically works in an arbitrary number of dimensions!

Many thanks to [**@BSVino**](http://github.com/BSVino) for providing the [original C++ implementation](https://github.com/BSVino/MathForGameDevelopers/blob/line-box-intersection/math/collision.cpp) and [accompanying](https://www.youtube.com/watch?v=USjbg5QXk3g) [videos](https://www.youtube.com/watch?v=3vONlLYtHUE).

[**view demo**](http://stack.gl/ray-aabb-intersection/)

## Usage

[![NPM](https://nodei.co/npm/ray-aabb-intersection.png)](https://www.npmjs.com/package/ray-aabb-intersection)

### `out = intersection(out, origin, dir, aabb)`

Determines if the given ray `(origin, direction)` intersects with the `aabb`.

If no intersection occurs, returns `null`. Otherwise, the intersection point is stored in `out` and then returned.

``` javascript
const origin = new Float32Array([0, 4, 0])
const dir = new Float32Array([0, 1, 0])
const out = new Float32Array(3)

const aabb = [
  [-1, -1, -1],
  [+1, +1, +1]
]

intersection(out, origin, dir, aabb)
```

### `d = intersection.distance(origin, dir, aabb)`

Returns the distance from the given ray `(origin, direction)` to the supplied `aabb`. If no intersection occurs, returns `Infinity`.

Note that the `direction` vector should be normalized.

## See Also

* [ray-aabb](http://github.com/tmpvar/ray-aabb) — faster, but doesn't provide the point of intersection.
* [ray-sphere-intersection](http://github.com/mattdesl/ray-sphere-intersection)
* [ray-plane-intersection](http://github.com/mattdesl/ray-plane-intersection)
* [ray-triangle-intersection](http://github.com/substack/ray-triangle-intersection)
* [camera-picking-ray](https://github.com/Jam3/camera-picking-ray)

## License

MIT, see [LICENSE.md](http://github.com/stackgl/ray-aabb-intersection/blob/master/LICENSE.md) for details.
