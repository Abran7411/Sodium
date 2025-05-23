parcelRequire = function(e, r, t, n) {
	var i, o = "function" == typeof parcelRequire && parcelRequire,
		u = "function" == typeof require && require;

	function f(t, n) {
		if (!r[t]) {
			if (!e[t]) {
				var i = "function" == typeof parcelRequire && parcelRequire;
				if (!n && i) return i(t, !0);
				if (o) return o(t, !0);
				if (u && "string" == typeof t) return u(t);
				var c = new Error("Cannot find module '" + t + "'");
				throw c.code = "MODULE_NOT_FOUND", c
			}
			p.resolve = function(r) {
				return e[t][1][r] || r
			}, p.cache = {};
			var l = r[t] = new f.Module(t);
			e[t][0].call(l.exports, p, l, l.exports, this)
		}
		return r[t].exports;

		function p(e) {
			return f(p.resolve(e))
		}
	}
	f.isParcelRequire = !0, f.Module = function(e) {
		this.id = e, this.bundle = f, this.exports = {}
	}, f.modules = e, f.cache = r, f.parent = o, f.register = function(r, t) {
		e[r] = [function(e, r) {
			r.exports = t
		}, {}]
	};
	for (var c = 0; c < t.length; c++) try {
		f(t[c])
	} catch (e) {
		i || (i = e)
	}
	if (t.length) {
		var l = f(t[t.length - 1]);
		"object" == typeof exports && "undefined" != typeof module ? module.exports = l : "function" == typeof define && define.amd ? define(function() {
			return l
		}) : n && (this[n] = l)
	}
	if (parcelRequire = f, i) throw i;
	return f
}({
	"M5nx": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports._Math = void 0;
		var t = {
			DEG2RAD: Math.PI / 180,
			RAD2DEG: 180 / Math.PI,
			generateUUID: function() {
				for (var t = [], r = 0; r < 256; r++) t[r] = (r < 16 ? "0" : "") + r.toString(16);
				return function() {
					var r = 4294967295 * Math.random() | 0,
						n = 4294967295 * Math.random() | 0,
						o = 4294967295 * Math.random() | 0,
						a = 4294967295 * Math.random() | 0;
					return (t[255 & r] + t[r >> 8 & 255] + t[r >> 16 & 255] + t[r >> 24 & 255] + "-" + t[255 & n] + t[n >> 8 & 255] + "-" + t[n >> 16 & 15 | 64] + t[n >> 24 & 255] + "-" + t[63 & o | 128] + t[o >> 8 & 255] + "-" + t[o >> 16 & 255] + t[o >> 24 & 255] + t[255 & a] + t[a >> 8 & 255] + t[a >> 16 & 255] + t[a >> 24 & 255]).toUpperCase()
				}
			}(),
			clamp: function(t, r, n) {
				return Math.max(r, Math.min(n, t))
			},
			euclideanModulo: function(t, r) {
				return (t % r + r) % r
			},
			mapLinear: function(t, r, n, o, a) {
				return o + (t - r) * (a - o) / (n - r)
			},
			lerp: function(t, r, n) {
				return (1 - n) * t + n * r
			},
			smoothstep: function(t, r, n) {
				return t <= r ? 0 : t >= n ? 1 : (t = (t - r) / (n - r)) * t * (3 - 2 * t)
			},
			smootherstep: function(t, r, n) {
				return t <= r ? 0 : t >= n ? 1 : (t = (t - r) / (n - r)) * t * t * (t * (6 * t - 15) + 10)
			},
			randInt: function(t, r) {
				return t + Math.floor(Math.random() * (r - t + 1))
			},
			randFloat: function(t, r) {
				return t + Math.random() * (r - t)
			},
			randFloatSpread: function(t) {
				return t * (.5 - Math.random())
			},
			degToRad: function(r) {
				return r * t.DEG2RAD
			},
			radToDeg: function(r) {
				return r * t.RAD2DEG
			},
			isPowerOfTwo: function(t) {
				return 0 == (t & t - 1) && 0 !== t
			},
			ceilPowerOfTwo: function(t) {
				return Math.pow(2, Math.ceil(Math.log(t) / Math.LN2))
			},
			floorPowerOfTwo: function(t) {
				return Math.pow(2, Math.floor(Math.log(t) / Math.LN2))
			}
		};
		exports._Math = t;
	}, {}],
	"87fW": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.Quaternion = s;
		var t = require("./Math.js"),
			i = require("./Vector3.js");

		function s(t, i, s, h) {
			this._x = t || 0, this._y = i || 0, this._z = s || 0, this._w = void 0 !== h ? h : 1
		}
		Object.assign(s, {
			slerp: function(t, i, s, h) {
				return s.copy(t).slerp(i, h)
			},
			slerpFlat: function(t, i, s, h, n, _, r) {
				var e = s[h + 0],
					a = s[h + 1],
					o = s[h + 2],
					u = s[h + 3],
					c = n[_ + 0],
					l = n[_ + 1],
					y = n[_ + 2],
					x = n[_ + 3];
				if (u !== x || e !== c || a !== l || o !== y) {
					var w = 1 - r,
						z = e * c + a * l + o * y + u * x,
						f = z >= 0 ? 1 : -1,
						C = 1 - z * z;
					if (C > Number.EPSILON) {
						var g = Math.sqrt(C),
							p = Math.atan2(g, z * f);
						w = Math.sin(w * p) / g, r = Math.sin(r * p) / g
					}
					var M = r * f;
					if (e = e * w + c * M, a = a * w + l * M, o = o * w + y * M, u = u * w + x * M, w === 1 - r) {
						var b = 1 / Math.sqrt(e * e + a * a + o * o + u * u);
						e *= b, a *= b, o *= b, u *= b
					}
				}
				t[i] = e, t[i + 1] = a, t[i + 2] = o, t[i + 3] = u
			}
		}), Object.defineProperties(s.prototype, {
			x: {
				get: function() {
					return this._x
				},
				set: function(t) {
					this._x = t, this.onChangeCallback()
				}
			},
			y: {
				get: function() {
					return this._y
				},
				set: function(t) {
					this._y = t, this.onChangeCallback()
				}
			},
			z: {
				get: function() {
					return this._z
				},
				set: function(t) {
					this._z = t, this.onChangeCallback()
				}
			},
			w: {
				get: function() {
					return this._w
				},
				set: function(t) {
					this._w = t, this.onChangeCallback()
				}
			}
		}), Object.assign(s.prototype, {
			isQuaternion: !0,
			set: function(t, i, s, h) {
				return this._x = t, this._y = i, this._z = s, this._w = h, this.onChangeCallback(), this
			},
			clone: function() {
				return new this.constructor(this._x, this._y, this._z, this._w)
			},
			copy: function(t) {
				return this._x = t.x, this._y = t.y, this._z = t.z, this._w = t.w, this.onChangeCallback(), this
			},
			setFromEuler: function(t, i) {
				if (!t || !t.isEuler) throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");
				var s = t._x,
					h = t._y,
					n = t._z,
					_ = t.order,
					r = Math.cos,
					e = Math.sin,
					a = r(s / 2),
					o = r(h / 2),
					u = r(n / 2),
					c = e(s / 2),
					l = e(h / 2),
					y = e(n / 2);
				return "XYZ" === _ ? (this._x = c * o * u + a * l * y, this._y = a * l * u - c * o * y, this._z = a * o * y + c * l * u, this._w = a * o * u - c * l * y) : "YXZ" === _ ? (this._x = c * o * u + a * l * y, this._y = a * l * u - c * o * y, this._z = a * o * y - c * l * u, this._w = a * o * u + c * l * y) : "ZXY" === _ ? (this._x = c * o * u - a * l * y, this._y = a * l * u + c * o * y, this._z = a * o * y + c * l * u, this._w = a * o * u - c * l * y) : "ZYX" === _ ? (this._x = c * o * u - a * l * y, this._y = a * l * u + c * o * y, this._z = a * o * y - c * l * u, this._w = a * o * u + c * l * y) : "YZX" === _ ? (this._x = c * o * u + a * l * y, this._y = a * l * u + c * o * y, this._z = a * o * y - c * l * u, this._w = a * o * u - c * l * y) : "XZY" === _ && (this._x = c * o * u - a * l * y, this._y = a * l * u - c * o * y, this._z = a * o * y + c * l * u, this._w = a * o * u + c * l * y), !1 !== i && this.onChangeCallback(), this
			},
			setFromAxisAngle: function(t, i) {
				var s = i / 2,
					h = Math.sin(s);
				return this._x = t.x * h, this._y = t.y * h, this._z = t.z * h, this._w = Math.cos(s), this.onChangeCallback(), this
			},
			setFromRotationMatrix: function(t) {
				var i, s = t.elements,
					h = s[0],
					n = s[4],
					_ = s[8],
					r = s[1],
					e = s[5],
					a = s[9],
					o = s[2],
					u = s[6],
					c = s[10],
					l = h + e + c;
				return l > 0 ? (i = .5 / Math.sqrt(l + 1), this._w = .25 / i, this._x = (u - a) * i, this._y = (_ - o) * i, this._z = (r - n) * i) : h > e && h > c ? (i = 2 * Math.sqrt(1 + h - e - c), this._w = (u - a) / i, this._x = .25 * i, this._y = (n + r) / i, this._z = (_ + o) / i) : e > c ? (i = 2 * Math.sqrt(1 + e - h - c), this._w = (_ - o) / i, this._x = (n + r) / i, this._y = .25 * i, this._z = (a + u) / i) : (i = 2 * Math.sqrt(1 + c - h - e), this._w = (r - n) / i, this._x = (_ + o) / i, this._y = (a + u) / i, this._z = .25 * i), this.onChangeCallback(), this
			},
			setFromUnitVectors: function() {
				var t, s = new i.Vector3;
				return function(h, n) {
					return void 0 === s && (s = new i.Vector3), (t = h.dot(n) + 1) < 1e-6 ? (t = 0, Math.abs(h.x) > Math.abs(h.z) ? s.set(-h.y, h.x, 0) : s.set(0, -h.z, h.y)) : s.crossVectors(h, n), this._x = s.x, this._y = s.y, this._z = s.z, this._w = t, this.normalize()
				}
			}(),
			angleTo: function(i) {
				return 2 * Math.acos(Math.abs(t._Math.clamp(this.dot(i), -1, 1)))
			},
			rotateTowards: function(t, i) {
				var s = this.angleTo(t);
				if (0 === s) return this;
				var h = Math.min(1, i / s);
				return this.slerp(t, h), this
			},
			inverse: function() {
				return this.conjugate()
			},
			conjugate: function() {
				return this._x *= -1, this._y *= -1, this._z *= -1, this.onChangeCallback(), this
			},
			dot: function(t) {
				return this._x * t._x + this._y * t._y + this._z * t._z + this._w * t._w
			},
			lengthSq: function() {
				return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
			},
			length: function() {
				return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w)
			},
			normalize: function() {
				var t = this.length();
				return 0 === t ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (t = 1 / t, this._x = this._x * t, this._y = this._y * t, this._z = this._z * t, this._w = this._w * t), this.onChangeCallback(), this
			},
			multiply: function(t, i) {
				return void 0 !== i ? (console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."), this.multiplyQuaternions(t, i)) : this.multiplyQuaternions(this, t)
			},
			premultiply: function(t) {
				return this.multiplyQuaternions(t, this)
			},
			multiplyQuaternions: function(t, i) {
				var s = t._x,
					h = t._y,
					n = t._z,
					_ = t._w,
					r = i._x,
					e = i._y,
					a = i._z,
					o = i._w;
				return this._x = s * o + _ * r + h * a - n * e, this._y = h * o + _ * e + n * r - s * a, this._z = n * o + _ * a + s * e - h * r, this._w = _ * o - s * r - h * e - n * a, this.onChangeCallback(), this
			},
			slerp: function(t, i) {
				if (0 === i) return this;
				if (1 === i) return this.copy(t);
				var s = this._x,
					h = this._y,
					n = this._z,
					_ = this._w,
					r = _ * t._w + s * t._x + h * t._y + n * t._z;
				if (r < 0 ? (this._w = -t._w, this._x = -t._x, this._y = -t._y, this._z = -t._z, r = -r) : this.copy(t), r >= 1) return this._w = _, this._x = s, this._y = h, this._z = n, this;
				var e = 1 - r * r;
				if (e <= Number.EPSILON) {
					var a = 1 - i;
					return this._w = a * _ + i * this._w, this._x = a * s + i * this._x, this._y = a * h + i * this._y, this._z = a * n + i * this._z, this.normalize()
				}
				var o = Math.sqrt(e),
					u = Math.atan2(o, r),
					c = Math.sin((1 - i) * u) / o,
					l = Math.sin(i * u) / o;
				return this._w = _ * c + this._w * l, this._x = s * c + this._x * l, this._y = h * c + this._y * l, this._z = n * c + this._z * l, this.onChangeCallback(), this
			},
			equals: function(t) {
				return t._x === this._x && t._y === this._y && t._z === this._z && t._w === this._w
			},
			fromArray: function(t, i) {
				return void 0 === i && (i = 0), this._x = t[i], this._y = t[i + 1], this._z = t[i + 2], this._w = t[i + 3], this.onChangeCallback(), this
			},
			toArray: function(t, i) {
				return void 0 === t && (t = []), void 0 === i && (i = 0), t[i] = this._x, t[i + 1] = this._y, t[i + 2] = this._z, t[i + 3] = this._w, t
			},
			onChange: function(t) {
				return this.onChangeCallback = t, this
			},
			onChangeCallback: function() {}
		});
	}, {
		"./Math.js": "M5nx",
		"./Vector3.js": "QLQv"
	}],
	"QLQv": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.Vector3 = r;
		var t = require("./Math.js"),
			i = require("./Matrix4.js"),
			s = require("./Quaternion.js");

		function r(t, i, s) {
			this.x = t || 0, this.y = i || 0, this.z = s || 0
		}
		Object.assign(r.prototype, {
			isVector3: !0,
			set: function(t, i, s) {
				return this.x = t, this.y = i, this.z = s, this
			},
			setScalar: function(t) {
				return this.x = t, this.y = t, this.z = t, this
			},
			setX: function(t) {
				return this.x = t, this
			},
			setY: function(t) {
				return this.y = t, this
			},
			setZ: function(t) {
				return this.z = t, this
			},
			setComponent: function(t, i) {
				switch (t) {
					case 0:
						this.x = i;
						break;
					case 1:
						this.y = i;
						break;
					case 2:
						this.z = i;
						break;
					default:
						throw new Error("index is out of range: " + t)
				}
				return this
			},
			getComponent: function(t) {
				switch (t) {
					case 0:
						return this.x;
					case 1:
						return this.y;
					case 2:
						return this.z;
					default:
						throw new Error("index is out of range: " + t)
				}
			},
			clone: function() {
				return new this.constructor(this.x, this.y, this.z)
			},
			copy: function(t) {
				return this.x = t.x, this.y = t.y, this.z = t.z, this
			},
			add: function(t, i) {
				return void 0 !== i ? (console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(t, i)) : (this.x += t.x, this.y += t.y, this.z += t.z, this)
			},
			addScalar: function(t) {
				return this.x += t, this.y += t, this.z += t, this
			},
			addVectors: function(t, i) {
				return this.x = t.x + i.x, this.y = t.y + i.y, this.z = t.z + i.z, this
			},
			addScaledVector: function(t, i) {
				return this.x += t.x * i, this.y += t.y * i, this.z += t.z * i, this
			},
			sub: function(t, i) {
				return void 0 !== i ? (console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(t, i)) : (this.x -= t.x, this.y -= t.y, this.z -= t.z, this)
			},
			subScalar: function(t) {
				return this.x -= t, this.y -= t, this.z -= t, this
			},
			subVectors: function(t, i) {
				return this.x = t.x - i.x, this.y = t.y - i.y, this.z = t.z - i.z, this
			},
			multiply: function(t, i) {
				return void 0 !== i ? (console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."), this.multiplyVectors(t, i)) : (this.x *= t.x, this.y *= t.y, this.z *= t.z, this)
			},
			multiplyScalar: function(t) {
				return this.x *= t, this.y *= t, this.z *= t, this
			},
			multiplyVectors: function(t, i) {
				return this.x = t.x * i.x, this.y = t.y * i.y, this.z = t.z * i.z, this
			},
			applyEuler: function() {
				var t = new s.Quaternion;
				return function(i) {
					return i && i.isEuler || console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."), this.applyQuaternion(t.setFromEuler(i))
				}
			}(),
			applyAxisAngle: function() {
				var t = new s.Quaternion;
				return function(i, s) {
					return this.applyQuaternion(t.setFromAxisAngle(i, s))
				}
			}(),
			applyMatrix3: function(t) {
				var i = this.x,
					s = this.y,
					r = this.z,
					n = t.elements;
				return this.x = n[0] * i + n[3] * s + n[6] * r, this.y = n[1] * i + n[4] * s + n[7] * r, this.z = n[2] * i + n[5] * s + n[8] * r, this
			},
			applyMatrix4: function(t) {
				var i = this.x,
					s = this.y,
					r = this.z,
					n = t.elements,
					h = 1 / (n[3] * i + n[7] * s + n[11] * r + n[15]);
				return this.x = (n[0] * i + n[4] * s + n[8] * r + n[12]) * h, this.y = (n[1] * i + n[5] * s + n[9] * r + n[13]) * h, this.z = (n[2] * i + n[6] * s + n[10] * r + n[14]) * h, this
			},
			applyQuaternion: function(t) {
				var i = this.x,
					s = this.y,
					r = this.z,
					n = t.x,
					h = t.y,
					e = t.z,
					o = t.w,
					a = o * i + h * r - e * s,
					u = o * s + e * i - n * r,
					c = o * r + n * s - h * i,
					l = -n * i - h * s - e * r;
				return this.x = a * o + l * -n + u * -e - c * -h, this.y = u * o + l * -h + c * -n - a * -e, this.z = c * o + l * -e + a * -h - u * -n, this
			},
			project: function(t) {
				return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)
			},
			unproject: function() {
				var t = new i.Matrix4;
				return function(i) {
					return this.applyMatrix4(t.getInverse(i.projectionMatrix)).applyMatrix4(i.matrixWorld)
				}
			}(),
			transformDirection: function(t) {
				var i = this.x,
					s = this.y,
					r = this.z,
					n = t.elements;
				return this.x = n[0] * i + n[4] * s + n[8] * r, this.y = n[1] * i + n[5] * s + n[9] * r, this.z = n[2] * i + n[6] * s + n[10] * r, this.normalize()
			},
			divide: function(t) {
				return this.x /= t.x, this.y /= t.y, this.z /= t.z, this
			},
			divideScalar: function(t) {
				return this.multiplyScalar(1 / t)
			},
			min: function(t) {
				return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this
			},
			max: function(t) {
				return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this
			},
			clamp: function(t, i) {
				return this.x = Math.max(t.x, Math.min(i.x, this.x)), this.y = Math.max(t.y, Math.min(i.y, this.y)), this.z = Math.max(t.z, Math.min(i.z, this.z)), this
			},
			clampScalar: function() {
				var t = new r,
					i = new r;
				return function(s, r) {
					return t.set(s, s, s), i.set(r, r, r), this.clamp(t, i)
				}
			}(),
			clampLength: function(t, i) {
				var s = this.length();
				return this.divideScalar(s || 1).multiplyScalar(Math.max(t, Math.min(i, s)))
			},
			floor: function() {
				return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this
			},
			ceil: function() {
				return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this
			},
			round: function() {
				return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this
			},
			roundToZero: function() {
				return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this
			},
			negate: function() {
				return this.x = -this.x, this.y = -this.y, this.z = -this.z, this
			},
			dot: function(t) {
				return this.x * t.x + this.y * t.y + this.z * t.z
			},
			lengthSq: function() {
				return this.x * this.x + this.y * this.y + this.z * this.z
			},
			length: function() {
				return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
			},
			manhattanLength: function() {
				return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
			},
			normalize: function() {
				return this.divideScalar(this.length() || 1)
			},
			setLength: function(t) {
				return this.normalize().multiplyScalar(t)
			},
			lerp: function(t, i) {
				return this.x += (t.x - this.x) * i, this.y += (t.y - this.y) * i, this.z += (t.z - this.z) * i, this
			},
			lerpVectors: function(t, i, s) {
				return this.subVectors(i, t).multiplyScalar(s).add(t)
			},
			cross: function(t, i) {
				return void 0 !== i ? (console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."), this.crossVectors(t, i)) : this.crossVectors(this, t)
			},
			crossVectors: function(t, i) {
				var s = t.x,
					r = t.y,
					n = t.z,
					h = i.x,
					e = i.y,
					o = i.z;
				return this.x = r * o - n * e, this.y = n * h - s * o, this.z = s * e - r * h, this
			},
			projectOnVector: function(t) {
				var i = t.dot(this) / t.lengthSq();
				return this.copy(t).multiplyScalar(i)
			},
			projectOnPlane: function() {
				var t = new r;
				return function(i) {
					return t.copy(this).projectOnVector(i), this.sub(t)
				}
			}(),
			reflect: function() {
				var t = new r;
				return function(i) {
					return this.sub(t.copy(i).multiplyScalar(2 * this.dot(i)))
				}
			}(),
			angleTo: function(i) {
				var s = this.dot(i) / Math.sqrt(this.lengthSq() * i.lengthSq());
				return Math.acos(t._Math.clamp(s, -1, 1))
			},
			distanceTo: function(t) {
				return Math.sqrt(this.distanceToSquared(t))
			},
			distanceToSquared: function(t) {
				var i = this.x - t.x,
					s = this.y - t.y,
					r = this.z - t.z;
				return i * i + s * s + r * r
			},
			manhattanDistanceTo: function(t) {
				return Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z)
			},
			setFromSpherical: function(t) {
				return this.setFromSphericalCoords(t.radius, t.phi, t.theta)
			},
			setFromSphericalCoords: function(t, i, s) {
				var r = Math.sin(i) * t;
				return this.x = r * Math.sin(s), this.y = Math.cos(i) * t, this.z = r * Math.cos(s), this
			},
			setFromCylindrical: function(t) {
				return this.setFromCylindricalCoords(t.radius, t.theta, t.y)
			},
			setFromCylindricalCoords: function(t, i, s) {
				return this.x = t * Math.sin(i), this.y = s, this.z = t * Math.cos(i), this
			},
			setFromMatrixPosition: function(t) {
				var i = t.elements;
				return this.x = i[12], this.y = i[13], this.z = i[14], this
			},
			setFromMatrixScale: function(t) {
				var i = this.setFromMatrixColumn(t, 0).length(),
					s = this.setFromMatrixColumn(t, 1).length(),
					r = this.setFromMatrixColumn(t, 2).length();
				return this.x = i, this.y = s, this.z = r, this
			},
			setFromMatrixColumn: function(t, i) {
				return this.fromArray(t.elements, 4 * i)
			},
			equals: function(t) {
				return t.x === this.x && t.y === this.y && t.z === this.z
			},
			fromArray: function(t, i) {
				return void 0 === i && (i = 0), this.x = t[i], this.y = t[i + 1], this.z = t[i + 2], this
			},
			toArray: function(t, i) {
				return void 0 === t && (t = []), void 0 === i && (i = 0), t[i] = this.x, t[i + 1] = this.y, t[i + 2] = this.z, t
			},
			fromBufferAttribute: function(t, i, s) {
				return void 0 !== s && console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."), this.x = t.getX(i), this.y = t.getY(i), this.z = t.getZ(i), this
			}
		});
	}, {
		"./Math.js": "M5nx",
		"./Matrix4.js": "QUid",
		"./Quaternion.js": "87fW"
	}],
	"QUid": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.Matrix4 = e;
		var t = require("./Vector3.js");

		function e() {
			this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], arguments.length > 0 && console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")
		}
		Object.assign(e.prototype, {
			isMatrix4: !0,
			set: function(t, e, n, r, s, i, o, a, u, h, c, l, m, f, v, x) {
				var y = this.elements;
				return y[0] = t, y[4] = e, y[8] = n, y[12] = r, y[1] = s, y[5] = i, y[9] = o, y[13] = a, y[2] = u, y[6] = h, y[10] = c, y[14] = l, y[3] = m, y[7] = f, y[11] = v, y[15] = x, this
			},
			identity: function() {
				return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
			},
			clone: function() {
				return (new e).fromArray(this.elements)
			},
			copy: function(t) {
				var e = this.elements,
					n = t.elements;
				return e[0] = n[0], e[1] = n[1], e[2] = n[2], e[3] = n[3], e[4] = n[4], e[5] = n[5], e[6] = n[6], e[7] = n[7], e[8] = n[8], e[9] = n[9], e[10] = n[10], e[11] = n[11], e[12] = n[12], e[13] = n[13], e[14] = n[14], e[15] = n[15], this
			},
			copyPosition: function(t) {
				var e = this.elements,
					n = t.elements;
				return e[12] = n[12], e[13] = n[13], e[14] = n[14], this
			},
			extractBasis: function(t, e, n) {
				return t.setFromMatrixColumn(this, 0), e.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this
			},
			makeBasis: function(t, e, n) {
				return this.set(t.x, e.x, n.x, 0, t.y, e.y, n.y, 0, t.z, e.z, n.z, 0, 0, 0, 0, 1), this
			},
			extractRotation: function() {
				var e = new t.Vector3;
				return function(t) {
					var n = this.elements,
						r = t.elements,
						s = 1 / e.setFromMatrixColumn(t, 0).length(),
						i = 1 / e.setFromMatrixColumn(t, 1).length(),
						o = 1 / e.setFromMatrixColumn(t, 2).length();
					return n[0] = r[0] * s, n[1] = r[1] * s, n[2] = r[2] * s, n[3] = 0, n[4] = r[4] * i, n[5] = r[5] * i, n[6] = r[6] * i, n[7] = 0, n[8] = r[8] * o, n[9] = r[9] * o, n[10] = r[10] * o, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, this
				}
			}(),
			makeRotationFromEuler: function(t) {
				t && t.isEuler || console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
				var e = this.elements,
					n = t.x,
					r = t.y,
					s = t.z,
					i = Math.cos(n),
					o = Math.sin(n),
					a = Math.cos(r),
					u = Math.sin(r),
					h = Math.cos(s),
					c = Math.sin(s);
				if ("XYZ" === t.order) {
					var l = i * h,
						m = i * c,
						f = o * h,
						v = o * c;
					e[0] = a * h, e[4] = -a * c, e[8] = u, e[1] = m + f * u, e[5] = l - v * u, e[9] = -o * a, e[2] = v - l * u, e[6] = f + m * u, e[10] = i * a
				} else if ("YXZ" === t.order) {
					var x = a * h,
						y = a * c,
						M = u * h,
						p = u * c;
					e[0] = x + p * o, e[4] = M * o - y, e[8] = i * u, e[1] = i * c, e[5] = i * h, e[9] = -o, e[2] = y * o - M, e[6] = p + x * o, e[10] = i * a
				} else if ("ZXY" === t.order) {
					x = a * h, y = a * c, M = u * h, p = u * c;
					e[0] = x - p * o, e[4] = -i * c, e[8] = M + y * o, e[1] = y + M * o, e[5] = i * h, e[9] = p - x * o, e[2] = -i * u, e[6] = o, e[10] = i * a
				} else if ("ZYX" === t.order) {
					l = i * h, m = i * c, f = o * h, v = o * c;
					e[0] = a * h, e[4] = f * u - m, e[8] = l * u + v, e[1] = a * c, e[5] = v * u + l, e[9] = m * u - f, e[2] = -u, e[6] = o * a, e[10] = i * a
				} else if ("YZX" === t.order) {
					var d = i * a,
						z = i * u,
						g = o * a,
						w = o * u;
					e[0] = a * h, e[4] = w - d * c, e[8] = g * c + z, e[1] = c, e[5] = i * h, e[9] = -o * h, e[2] = -u * h, e[6] = z * c + g, e[10] = d - w * c
				} else if ("XZY" === t.order) {
					d = i * a, z = i * u, g = o * a, w = o * u;
					e[0] = a * h, e[4] = -c, e[8] = u * h, e[1] = d * c + w, e[5] = i * h, e[9] = z * c - g, e[2] = g * c - z, e[6] = o * h, e[10] = w * c + d
				}
				return e[3] = 0, e[7] = 0, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this
			},
			makeRotationFromQuaternion: function() {
				var e = new t.Vector3(0, 0, 0),
					n = new t.Vector3(1, 1, 1);
				return function(t) {
					return this.compose(e, t, n)
				}
			}(),
			lookAt: function() {
				var e = new t.Vector3,
					n = new t.Vector3,
					r = new t.Vector3;
				return function(t, s, i) {
					var o = this.elements;
					return r.subVectors(t, s), 0 === r.lengthSq() && (r.z = 1), r.normalize(), e.crossVectors(i, r), 0 === e.lengthSq() && (1 === Math.abs(i.z) ? r.x += 1e-4 : r.z += 1e-4, r.normalize(), e.crossVectors(i, r)), e.normalize(), n.crossVectors(r, e), o[0] = e.x, o[4] = n.x, o[8] = r.x, o[1] = e.y, o[5] = n.y, o[9] = r.y, o[2] = e.z, o[6] = n.z, o[10] = r.z, this
				}
			}(),
			multiply: function(t, e) {
				return void 0 !== e ? (console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."), this.multiplyMatrices(t, e)) : this.multiplyMatrices(this, t)
			},
			premultiply: function(t) {
				return this.multiplyMatrices(t, this)
			},
			multiplyMatrices: function(t, e) {
				var n = t.elements,
					r = e.elements,
					s = this.elements,
					i = n[0],
					o = n[4],
					a = n[8],
					u = n[12],
					h = n[1],
					c = n[5],
					l = n[9],
					m = n[13],
					f = n[2],
					v = n[6],
					x = n[10],
					y = n[14],
					M = n[3],
					p = n[7],
					d = n[11],
					z = n[15],
					g = r[0],
					w = r[4],
					k = r[8],
					E = r[12],
					R = r[1],
					V = r[5],
					F = r[9],
					X = r[13],
					Y = r[2],
					Z = r[6],
					b = r[10],
					A = r[14],
					T = r[3],
					C = r[7],
					P = r[11],
					S = r[15];
				return s[0] = i * g + o * R + a * Y + u * T, s[4] = i * w + o * V + a * Z + u * C, s[8] = i * k + o * F + a * b + u * P, s[12] = i * E + o * X + a * A + u * S, s[1] = h * g + c * R + l * Y + m * T, s[5] = h * w + c * V + l * Z + m * C, s[9] = h * k + c * F + l * b + m * P, s[13] = h * E + c * X + l * A + m * S, s[2] = f * g + v * R + x * Y + y * T, s[6] = f * w + v * V + x * Z + y * C, s[10] = f * k + v * F + x * b + y * P, s[14] = f * E + v * X + x * A + y * S, s[3] = M * g + p * R + d * Y + z * T, s[7] = M * w + p * V + d * Z + z * C, s[11] = M * k + p * F + d * b + z * P, s[15] = M * E + p * X + d * A + z * S, this
			},
			multiplyScalar: function(t) {
				var e = this.elements;
				return e[0] *= t, e[4] *= t, e[8] *= t, e[12] *= t, e[1] *= t, e[5] *= t, e[9] *= t, e[13] *= t, e[2] *= t, e[6] *= t, e[10] *= t, e[14] *= t, e[3] *= t, e[7] *= t, e[11] *= t, e[15] *= t, this
			},
			applyToBufferAttribute: function() {
				var e = new t.Vector3;
				return function(t) {
					for (var n = 0, r = t.count; n < r; n++) e.x = t.getX(n), e.y = t.getY(n), e.z = t.getZ(n), e.applyMatrix4(this), t.setXYZ(n, e.x, e.y, e.z);
					return t
				}
			}(),
			determinant: function() {
				var t = this.elements,
					e = t[0],
					n = t[4],
					r = t[8],
					s = t[12],
					i = t[1],
					o = t[5],
					a = t[9],
					u = t[13],
					h = t[2],
					c = t[6],
					l = t[10],
					m = t[14];
				return t[3] * (+s * a * c - r * u * c - s * o * l + n * u * l + r * o * m - n * a * m) + t[7] * (+e * a * m - e * u * l + s * i * l - r * i * m + r * u * h - s * a * h) + t[11] * (+e * u * c - e * o * m - s * i * c + n * i * m + s * o * h - n * u * h) + t[15] * (-r * o * h - e * a * c + e * o * l + r * i * c - n * i * l + n * a * h)
			},
			transpose: function() {
				var t, e = this.elements;
				return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this
			},
			setPosition: function(t) {
				var e = this.elements;
				return e[12] = t.x, e[13] = t.y, e[14] = t.z, this
			},
			getInverse: function(t, e) {
				var n = this.elements,
					r = t.elements,
					s = r[0],
					i = r[1],
					o = r[2],
					a = r[3],
					u = r[4],
					h = r[5],
					c = r[6],
					l = r[7],
					m = r[8],
					f = r[9],
					v = r[10],
					x = r[11],
					y = r[12],
					M = r[13],
					p = r[14],
					d = r[15],
					z = f * p * l - M * v * l + M * c * x - h * p * x - f * c * d + h * v * d,
					g = y * v * l - m * p * l - y * c * x + u * p * x + m * c * d - u * v * d,
					w = m * M * l - y * f * l + y * h * x - u * M * x - m * h * d + u * f * d,
					k = y * f * c - m * M * c - y * h * v + u * M * v + m * h * p - u * f * p,
					E = s * z + i * g + o * w + a * k;
				if (0 === E) {
					var R = "THREE.Matrix4: .getInverse() can't invert matrix, determinant is 0";
					if (!0 === e) throw new Error(R);
					return console.warn(R), this.identity()
				}
				var V = 1 / E;
				return n[0] = z * V, n[1] = (M * v * a - f * p * a - M * o * x + i * p * x + f * o * d - i * v * d) * V, n[2] = (h * p * a - M * c * a + M * o * l - i * p * l - h * o * d + i * c * d) * V, n[3] = (f * c * a - h * v * a - f * o * l + i * v * l + h * o * x - i * c * x) * V, n[4] = g * V, n[5] = (m * p * a - y * v * a + y * o * x - s * p * x - m * o * d + s * v * d) * V, n[6] = (y * c * a - u * p * a - y * o * l + s * p * l + u * o * d - s * c * d) * V, n[7] = (u * v * a - m * c * a + m * o * l - s * v * l - u * o * x + s * c * x) * V, n[8] = w * V, n[9] = (y * f * a - m * M * a - y * i * x + s * M * x + m * i * d - s * f * d) * V, n[10] = (u * M * a - y * h * a + y * i * l - s * M * l - u * i * d + s * h * d) * V, n[11] = (m * h * a - u * f * a - m * i * l + s * f * l + u * i * x - s * h * x) * V, n[12] = k * V, n[13] = (m * M * o - y * f * o + y * i * v - s * M * v - m * i * p + s * f * p) * V, n[14] = (y * h * o - u * M * o - y * i * c + s * M * c + u * i * p - s * h * p) * V, n[15] = (u * f * o - m * h * o + m * i * c - s * f * c - u * i * v + s * h * v) * V, this
			},
			scale: function(t) {
				var e = this.elements,
					n = t.x,
					r = t.y,
					s = t.z;
				return e[0] *= n, e[4] *= r, e[8] *= s, e[1] *= n, e[5] *= r, e[9] *= s, e[2] *= n, e[6] *= r, e[10] *= s, e[3] *= n, e[7] *= r, e[11] *= s, this
			},
			getMaxScaleOnAxis: function() {
				var t = this.elements,
					e = t[0] * t[0] + t[1] * t[1] + t[2] * t[2],
					n = t[4] * t[4] + t[5] * t[5] + t[6] * t[6],
					r = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
				return Math.sqrt(Math.max(e, n, r))
			},
			makeTranslation: function(t, e, n) {
				return this.set(1, 0, 0, t, 0, 1, 0, e, 0, 0, 1, n, 0, 0, 0, 1), this
			},
			makeRotationX: function(t) {
				var e = Math.cos(t),
					n = Math.sin(t);
				return this.set(1, 0, 0, 0, 0, e, -n, 0, 0, n, e, 0, 0, 0, 0, 1), this
			},
			makeRotationY: function(t) {
				var e = Math.cos(t),
					n = Math.sin(t);
				return this.set(e, 0, n, 0, 0, 1, 0, 0, -n, 0, e, 0, 0, 0, 0, 1), this
			},
			makeRotationZ: function(t) {
				var e = Math.cos(t),
					n = Math.sin(t);
				return this.set(e, -n, 0, 0, n, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
			},
			makeRotationAxis: function(t, e) {
				var n = Math.cos(e),
					r = Math.sin(e),
					s = 1 - n,
					i = t.x,
					o = t.y,
					a = t.z,
					u = s * i,
					h = s * o;
				return this.set(u * i + n, u * o - r * a, u * a + r * o, 0, u * o + r * a, h * o + n, h * a - r * i, 0, u * a - r * o, h * a + r * i, s * a * a + n, 0, 0, 0, 0, 1), this
			},
			makeScale: function(t, e, n) {
				return this.set(t, 0, 0, 0, 0, e, 0, 0, 0, 0, n, 0, 0, 0, 0, 1), this
			},
			makeShear: function(t, e, n) {
				return this.set(1, e, n, 0, t, 1, n, 0, t, e, 1, 0, 0, 0, 0, 1), this
			},
			compose: function(t, e, n) {
				var r = this.elements,
					s = e._x,
					i = e._y,
					o = e._z,
					a = e._w,
					u = s + s,
					h = i + i,
					c = o + o,
					l = s * u,
					m = s * h,
					f = s * c,
					v = i * h,
					x = i * c,
					y = o * c,
					M = a * u,
					p = a * h,
					d = a * c,
					z = n.x,
					g = n.y,
					w = n.z;
				return r[0] = (1 - (v + y)) * z, r[1] = (m + d) * z, r[2] = (f - p) * z, r[3] = 0, r[4] = (m - d) * g, r[5] = (1 - (l + y)) * g, r[6] = (x + M) * g, r[7] = 0, r[8] = (f + p) * w, r[9] = (x - M) * w, r[10] = (1 - (l + v)) * w, r[11] = 0, r[12] = t.x, r[13] = t.y, r[14] = t.z, r[15] = 1, this
			},
			decompose: function() {
				var n = new t.Vector3,
					r = new e;
				return function(t, e, s) {
					var i = this.elements,
						o = n.set(i[0], i[1], i[2]).length(),
						a = n.set(i[4], i[5], i[6]).length(),
						u = n.set(i[8], i[9], i[10]).length();
					this.determinant() < 0 && (o = -o), t.x = i[12], t.y = i[13], t.z = i[14], r.copy(this);
					var h = 1 / o,
						c = 1 / a,
						l = 1 / u;
					return r.elements[0] *= h, r.elements[1] *= h, r.elements[2] *= h, r.elements[4] *= c, r.elements[5] *= c, r.elements[6] *= c, r.elements[8] *= l, r.elements[9] *= l, r.elements[10] *= l, e.setFromRotationMatrix(r), s.x = o, s.y = a, s.z = u, this
				}
			}(),
			makePerspective: function(t, e, n, r, s, i) {
				void 0 === i && console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");
				var o = this.elements,
					a = 2 * s / (e - t),
					u = 2 * s / (n - r),
					h = (e + t) / (e - t),
					c = (n + r) / (n - r),
					l = -(i + s) / (i - s),
					m = -2 * i * s / (i - s);
				return o[0] = a, o[4] = 0, o[8] = h, o[12] = 0, o[1] = 0, o[5] = u, o[9] = c, o[13] = 0, o[2] = 0, o[6] = 0, o[10] = l, o[14] = m, o[3] = 0, o[7] = 0, o[11] = -1, o[15] = 0, this
			},
			makeOrthographic: function(t, e, n, r, s, i) {
				var o = this.elements,
					a = 1 / (e - t),
					u = 1 / (n - r),
					h = 1 / (i - s),
					c = (e + t) * a,
					l = (n + r) * u,
					m = (i + s) * h;
				return o[0] = 2 * a, o[4] = 0, o[8] = 0, o[12] = -c, o[1] = 0, o[5] = 2 * u, o[9] = 0, o[13] = -l, o[2] = 0, o[6] = 0, o[10] = -2 * h, o[14] = -m, o[3] = 0, o[7] = 0, o[11] = 0, o[15] = 1, this
			},
			equals: function(t) {
				for (var e = this.elements, n = t.elements, r = 0; r < 16; r++)
					if (e[r] !== n[r]) return !1;
				return !0
			},
			fromArray: function(t, e) {
				void 0 === e && (e = 0);
				for (var n = 0; n < 16; n++) this.elements[n] = t[n + e];
				return this
			},
			toArray: function(t, e) {
				void 0 === t && (t = []), void 0 === e && (e = 0);
				var n = this.elements;
				return t[e] = n[0], t[e + 1] = n[1], t[e + 2] = n[2], t[e + 3] = n[3], t[e + 4] = n[4], t[e + 5] = n[5], t[e + 6] = n[6], t[e + 7] = n[7], t[e + 8] = n[8], t[e + 9] = n[9], t[e + 10] = n[10], t[e + 11] = n[11], t[e + 12] = n[12], t[e + 13] = n[13], t[e + 14] = n[14], t[e + 15] = n[15], t
			}
		});
	}, {
		"./Vector3.js": "QLQv"
	}],
	"SLlv": [function(require, module, exports) {
		"use strict";

		function e() {}
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.EventDispatcher = e, Object.assign(e.prototype, {
			addEventListener: function(e, i) {
				void 0 === this._listeners && (this._listeners = {});
				var t = this._listeners;
				void 0 === t[e] && (t[e] = []), -1 === t[e].indexOf(i) && t[e].push(i)
			},
			hasEventListener: function(e, i) {
				if (void 0 === this._listeners) return !1;
				var t = this._listeners;
				return void 0 !== t[e] && -1 !== t[e].indexOf(i)
			},
			removeEventListener: function(e, i) {
				if (void 0 !== this._listeners) {
					var t = this._listeners[e];
					if (void 0 !== t) {
						var s = t.indexOf(i); - 1 !== s && t.splice(s, 1)
					}
				}
			},
			dispatchEvent: function(e) {
				if (void 0 !== this._listeners) {
					var i = this._listeners[e.type];
					if (void 0 !== i) {
						e.target = this;
						for (var t = i.slice(0), s = 0, n = t.length; s < n; s++) t[s].call(this, e)
					}
				}
			}
		});
	}, {}],
	"Ed5t": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.Euler = s;
		var t = require("./Quaternion.js"),
			i = require("./Vector3.js"),
			n = require("./Matrix4.js"),
			a = require("./Math.js");

		function s(t, i, n, a) {
			this._x = t || 0, this._y = i || 0, this._z = n || 0, this._order = a || s.DefaultOrder
		}
		s.RotationOrders = ["XYZ", "YZX", "ZXY", "XZY", "YXZ", "ZYX"], s.DefaultOrder = "XYZ", Object.defineProperties(s.prototype, {
			x: {
				get: function() {
					return this._x
				},
				set: function(t) {
					this._x = t, this.onChangeCallback()
				}
			},
			y: {
				get: function() {
					return this._y
				},
				set: function(t) {
					this._y = t, this.onChangeCallback()
				}
			},
			z: {
				get: function() {
					return this._z
				},
				set: function(t) {
					this._z = t, this.onChangeCallback()
				}
			},
			order: {
				get: function() {
					return this._order
				},
				set: function(t) {
					this._order = t, this.onChangeCallback()
				}
			}
		}), Object.assign(s.prototype, {
			isEuler: !0,
			set: function(t, i, n, a) {
				return this._x = t, this._y = i, this._z = n, this._order = a || this._order, this.onChangeCallback(), this
			},
			clone: function() {
				return new this.constructor(this._x, this._y, this._z, this._order)
			},
			copy: function(t) {
				return this._x = t._x, this._y = t._y, this._z = t._z, this._order = t._order, this.onChangeCallback(), this
			},
			setFromRotationMatrix: function(t, i, n) {
				var s = a._Math.clamp,
					h = t.elements,
					r = h[0],
					e = h[4],
					o = h[8],
					_ = h[1],
					u = h[5],
					c = h[9],
					M = h[2],
					l = h[6],
					x = h[10];
				return "XYZ" === (i = i || this._order) ? (this._y = Math.asin(s(o, -1, 1)), Math.abs(o) < .99999 ? (this._x = Math.atan2(-c, x), this._z = Math.atan2(-e, r)) : (this._x = Math.atan2(l, u), this._z = 0)) : "YXZ" === i ? (this._x = Math.asin(-s(c, -1, 1)), Math.abs(c) < .99999 ? (this._y = Math.atan2(o, x), this._z = Math.atan2(_, u)) : (this._y = Math.atan2(-M, r), this._z = 0)) : "ZXY" === i ? (this._x = Math.asin(s(l, -1, 1)), Math.abs(l) < .99999 ? (this._y = Math.atan2(-M, x), this._z = Math.atan2(-e, u)) : (this._y = 0, this._z = Math.atan2(_, r))) : "ZYX" === i ? (this._y = Math.asin(-s(M, -1, 1)), Math.abs(M) < .99999 ? (this._x = Math.atan2(l, x), this._z = Math.atan2(_, r)) : (this._x = 0, this._z = Math.atan2(-e, u))) : "YZX" === i ? (this._z = Math.asin(s(_, -1, 1)), Math.abs(_) < .99999 ? (this._x = Math.atan2(-c, u), this._y = Math.atan2(-M, r)) : (this._x = 0, this._y = Math.atan2(o, x))) : "XZY" === i ? (this._z = Math.asin(-s(e, -1, 1)), Math.abs(e) < .99999 ? (this._x = Math.atan2(l, u), this._y = Math.atan2(o, r)) : (this._x = Math.atan2(-c, x), this._y = 0)) : console.warn("THREE.Euler: .setFromRotationMatrix() given unsupported order: " + i), this._order = i, !1 !== n && this.onChangeCallback(), this
			},
			setFromQuaternion: function() {
				var t = new n.Matrix4;
				return function(i, n, a) {
					return t.makeRotationFromQuaternion(i), this.setFromRotationMatrix(t, n, a)
				}
			}(),
			setFromVector3: function(t, i) {
				return this.set(t.x, t.y, t.z, i || this._order)
			},
			reorder: function() {
				var i = new t.Quaternion;
				return function(t) {
					return i.setFromEuler(this), this.setFromQuaternion(i, t)
				}
			}(),
			equals: function(t) {
				return t._x === this._x && t._y === this._y && t._z === this._z && t._order === this._order
			},
			fromArray: function(t) {
				return this._x = t[0], this._y = t[1], this._z = t[2], void 0 !== t[3] && (this._order = t[3]), this.onChangeCallback(), this
			},
			toArray: function(t, i) {
				return void 0 === t && (t = []), void 0 === i && (i = 0), t[i] = this._x, t[i + 1] = this._y, t[i + 2] = this._z, t[i + 3] = this._order, t
			},
			toVector3: function(t) {
				return t ? t.set(this._x, this._y, this._z) : new i.Vector3(this._x, this._y, this._z)
			},
			onChange: function(t) {
				return this.onChangeCallback = t, this
			},
			onChangeCallback: function() {}
		});
	}, {
		"./Quaternion.js": "87fW",
		"./Vector3.js": "QLQv",
		"./Matrix4.js": "QUid",
		"./Math.js": "M5nx"
	}],
	"Iask": [function(require, module, exports) {
		"use strict";

		function t() {
			this.mask = 1
		}
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.Layers = t, Object.assign(t.prototype, {
			set: function(t) {
				this.mask = 1 << t | 0
			},
			enable: function(t) {
				this.mask |= 1 << t | 0
			},
			toggle: function(t) {
				this.mask ^= 1 << t | 0
			},
			disable: function(t) {
				this.mask &= ~(1 << t | 0)
			},
			test: function(t) {
				return 0 != (this.mask & t.mask)
			}
		});
	}, {}],
	"ecXo": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.Matrix3 = e;
		var t = require("./Vector3.js");

		function e() {
			this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1], arguments.length > 0 && console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")
		}
		Object.assign(e.prototype, {
			isMatrix3: !0,
			set: function(t, e, r, n, s, i, o, a, u) {
				var l = this.elements;
				return l[0] = t, l[1] = n, l[2] = o, l[3] = e, l[4] = s, l[5] = a, l[6] = r, l[7] = i, l[8] = u, this
			},
			identity: function() {
				return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this
			},
			clone: function() {
				return (new this.constructor).fromArray(this.elements)
			},
			copy: function(t) {
				var e = this.elements,
					r = t.elements;
				return e[0] = r[0], e[1] = r[1], e[2] = r[2], e[3] = r[3], e[4] = r[4], e[5] = r[5], e[6] = r[6], e[7] = r[7], e[8] = r[8], this
			},
			setFromMatrix4: function(t) {
				var e = t.elements;
				return this.set(e[0], e[4], e[8], e[1], e[5], e[9], e[2], e[6], e[10]), this
			},
			applyToBufferAttribute: function() {
				var e = new t.Vector3;
				return function(t) {
					for (var r = 0, n = t.count; r < n; r++) e.x = t.getX(r), e.y = t.getY(r), e.z = t.getZ(r), e.applyMatrix3(this), t.setXYZ(r, e.x, e.y, e.z);
					return t
				}
			}(),
			multiply: function(t) {
				return this.multiplyMatrices(this, t)
			},
			premultiply: function(t) {
				return this.multiplyMatrices(t, this)
			},
			multiplyMatrices: function(t, e) {
				var r = t.elements,
					n = e.elements,
					s = this.elements,
					i = r[0],
					o = r[3],
					a = r[6],
					u = r[1],
					l = r[4],
					h = r[7],
					c = r[2],
					m = r[5],
					f = r[8],
					v = n[0],
					p = n[3],
					y = n[6],
					M = n[1],
					x = n[4],
					g = n[7],
					d = n[2],
					E = n[5],
					w = n[8];
				return s[0] = i * v + o * M + a * d, s[3] = i * p + o * x + a * E, s[6] = i * y + o * g + a * w, s[1] = u * v + l * M + h * d, s[4] = u * p + l * x + h * E, s[7] = u * y + l * g + h * w, s[2] = c * v + m * M + f * d, s[5] = c * p + m * x + f * E, s[8] = c * y + m * g + f * w, this
			},
			multiplyScalar: function(t) {
				var e = this.elements;
				return e[0] *= t, e[3] *= t, e[6] *= t, e[1] *= t, e[4] *= t, e[7] *= t, e[2] *= t, e[5] *= t, e[8] *= t, this
			},
			determinant: function() {
				var t = this.elements,
					e = t[0],
					r = t[1],
					n = t[2],
					s = t[3],
					i = t[4],
					o = t[5],
					a = t[6],
					u = t[7],
					l = t[8];
				return e * i * l - e * o * u - r * s * l + r * o * a + n * s * u - n * i * a
			},
			getInverse: function(t, e) {
				t && t.isMatrix4 && console.error("THREE.Matrix3: .getInverse() no longer takes a Matrix4 argument.");
				var r = t.elements,
					n = this.elements,
					s = r[0],
					i = r[1],
					o = r[2],
					a = r[3],
					u = r[4],
					l = r[5],
					h = r[6],
					c = r[7],
					m = r[8],
					f = m * u - l * c,
					v = l * h - m * a,
					p = c * a - u * h,
					y = s * f + i * v + o * p;
				if (0 === y) {
					var M = "THREE.Matrix3: .getInverse() can't invert matrix, determinant is 0";
					if (!0 === e) throw new Error(M);
					return console.warn(M), this.identity()
				}
				var x = 1 / y;
				return n[0] = f * x, n[1] = (o * c - m * i) * x, n[2] = (l * i - o * u) * x, n[3] = v * x, n[4] = (m * s - o * h) * x, n[5] = (o * a - l * s) * x, n[6] = p * x, n[7] = (i * h - c * s) * x, n[8] = (u * s - i * a) * x, this
			},
			transpose: function() {
				var t, e = this.elements;
				return t = e[1], e[1] = e[3], e[3] = t, t = e[2], e[2] = e[6], e[6] = t, t = e[5], e[5] = e[7], e[7] = t, this
			},
			getNormalMatrix: function(t) {
				return this.setFromMatrix4(t).getInverse(this).transpose()
			},
			transposeIntoArray: function(t) {
				var e = this.elements;
				return t[0] = e[0], t[1] = e[3], t[2] = e[6], t[3] = e[1], t[4] = e[4], t[5] = e[7], t[6] = e[2], t[7] = e[5], t[8] = e[8], this
			},
			setUvTransform: function(t, e, r, n, s, i, o) {
				var a = Math.cos(s),
					u = Math.sin(s);
				this.set(r * a, r * u, -r * (a * i + u * o) + i + t, -n * u, n * a, -n * (-u * i + a * o) + o + e, 0, 0, 1)
			},
			scale: function(t, e) {
				var r = this.elements;
				return r[0] *= t, r[3] *= t, r[6] *= t, r[1] *= e, r[4] *= e, r[7] *= e, this
			},
			rotate: function(t) {
				var e = Math.cos(t),
					r = Math.sin(t),
					n = this.elements,
					s = n[0],
					i = n[3],
					o = n[6],
					a = n[1],
					u = n[4],
					l = n[7];
				return n[0] = e * s + r * a, n[3] = e * i + r * u, n[6] = e * o + r * l, n[1] = -r * s + e * a, n[4] = -r * i + e * u, n[7] = -r * o + e * l, this
			},
			translate: function(t, e) {
				var r = this.elements;
				return r[0] += t * r[2], r[3] += t * r[5], r[6] += t * r[8], r[1] += e * r[2], r[4] += e * r[5], r[7] += e * r[8], this
			},
			equals: function(t) {
				for (var e = this.elements, r = t.elements, n = 0; n < 9; n++)
					if (e[n] !== r[n]) return !1;
				return !0
			},
			fromArray: function(t, e) {
				void 0 === e && (e = 0);
				for (var r = 0; r < 9; r++) this.elements[r] = t[r + e];
				return this
			},
			toArray: function(t, e) {
				void 0 === t && (t = []), void 0 === e && (e = 0);
				var r = this.elements;
				return t[e] = r[0], t[e + 1] = r[1], t[e + 2] = r[2], t[e + 3] = r[3], t[e + 4] = r[4], t[e + 5] = r[5], t[e + 6] = r[6], t[e + 7] = r[7], t[e + 8] = r[8], t
			}
		});
	}, {
		"./Vector3.js": "QLQv"
	}],
	"y6Nk": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.RGBA_S3TC_DXT5_Format = exports.RGBA_S3TC_DXT3_Format = exports.RGBA_S3TC_DXT1_Format = exports.RGB_S3TC_DXT1_Format = exports.RedFormat = exports.DepthStencilFormat = exports.DepthFormat = exports.RGBEFormat = exports.LuminanceAlphaFormat = exports.LuminanceFormat = exports.RGBAFormat = exports.RGBFormat = exports.AlphaFormat = exports.UnsignedInt248Type = exports.UnsignedShort565Type = exports.UnsignedShort5551Type = exports.UnsignedShort4444Type = exports.HalfFloatType = exports.FloatType = exports.UnsignedIntType = exports.IntType = exports.UnsignedShortType = exports.ShortType = exports.ByteType = exports.UnsignedByteType = exports.LinearMipMapLinearFilter = exports.LinearMipMapNearestFilter = exports.LinearFilter = exports.NearestMipMapLinearFilter = exports.NearestMipMapNearestFilter = exports.NearestFilter = exports.MirroredRepeatWrapping = exports.ClampToEdgeWrapping = exports.RepeatWrapping = exports.CubeUVRefractionMapping = exports.CubeUVReflectionMapping = exports.SphericalReflectionMapping = exports.EquirectangularRefractionMapping = exports.EquirectangularReflectionMapping = exports.CubeRefractionMapping = exports.CubeReflectionMapping = exports.UVMapping = exports.ACESFilmicToneMapping = exports.CineonToneMapping = exports.Uncharted2ToneMapping = exports.ReinhardToneMapping = exports.LinearToneMapping = exports.NoToneMapping = exports.AddOperation = exports.MixOperation = exports.MultiplyOperation = exports.NotEqualDepth = exports.GreaterDepth = exports.GreaterEqualDepth = exports.EqualDepth = exports.LessEqualDepth = exports.LessDepth = exports.AlwaysDepth = exports.NeverDepth = exports.SrcAlphaSaturateFactor = exports.OneMinusDstColorFactor = exports.DstColorFactor = exports.OneMinusDstAlphaFactor = exports.DstAlphaFactor = exports.OneMinusSrcAlphaFactor = exports.SrcAlphaFactor = exports.OneMinusSrcColorFactor = exports.SrcColorFactor = exports.OneFactor = exports.ZeroFactor = exports.MaxEquation = exports.MinEquation = exports.ReverseSubtractEquation = exports.SubtractEquation = exports.AddEquation = exports.CustomBlending = exports.MultiplyBlending = exports.SubtractiveBlending = exports.AdditiveBlending = exports.NormalBlending = exports.NoBlending = exports.VertexColors = exports.FaceColors = exports.NoColors = exports.SmoothShading = exports.FlatShading = exports.DoubleSide = exports.BackSide = exports.FrontSide = exports.PCFSoftShadowMap = exports.PCFShadowMap = exports.BasicShadowMap = exports.FrontFaceDirectionCCW = exports.FrontFaceDirectionCW = exports.CullFaceFrontBack = exports.CullFaceFront = exports.CullFaceBack = exports.CullFaceNone = exports.MOUSE = exports.REVISION = void 0, exports.ObjectSpaceNormalMap = exports.TangentSpaceNormalMap = exports.RGBADepthPacking = exports.BasicDepthPacking = exports.RGBDEncoding = exports.RGBM16Encoding = exports.RGBM7Encoding = exports.LogLuvEncoding = exports.RGBEEncoding = exports.GammaEncoding = exports.sRGBEncoding = exports.LinearEncoding = exports.TriangleFanDrawMode = exports.TriangleStripDrawMode = exports.TrianglesDrawMode = exports.WrapAroundEnding = exports.ZeroSlopeEnding = exports.ZeroCurvatureEnding = exports.InterpolateSmooth = exports.InterpolateLinear = exports.InterpolateDiscrete = exports.LoopPingPong = exports.LoopRepeat = exports.LoopOnce = exports.RGBA_ASTC_12x12_Format = exports.RGBA_ASTC_12x10_Format = exports.RGBA_ASTC_10x10_Format = exports.RGBA_ASTC_10x8_Format = exports.RGBA_ASTC_10x6_Format = exports.RGBA_ASTC_10x5_Format = exports.RGBA_ASTC_8x8_Format = exports.RGBA_ASTC_8x6_Format = exports.RGBA_ASTC_8x5_Format = exports.RGBA_ASTC_6x6_Format = exports.RGBA_ASTC_6x5_Format = exports.RGBA_ASTC_5x5_Format = exports.RGBA_ASTC_5x4_Format = exports.RGBA_ASTC_4x4_Format = exports.RGB_ETC1_Format = exports.RGBA_PVRTC_2BPPV1_Format = exports.RGBA_PVRTC_4BPPV1_Format = exports.RGB_PVRTC_2BPPV1_Format = exports.RGB_PVRTC_4BPPV1_Format = void 0;
		var r = "101";
		exports.REVISION = r;
		var e = {
			LEFT: 0,
			MIDDLE: 1,
			RIGHT: 2
		};
		exports.MOUSE = e;
		var t = 0;
		exports.CullFaceNone = t;
		var o = 1;
		exports.CullFaceBack = o;
		var p = 2;
		exports.CullFaceFront = p;
		var a = 3;
		exports.CullFaceFrontBack = a;
		var s = 0;
		exports.FrontFaceDirectionCW = s;
		var x = 1;
		exports.FrontFaceDirectionCCW = x;
		var n = 0;
		exports.BasicShadowMap = n;
		var i = 1;
		exports.PCFShadowMap = i;
		var v = 2;
		exports.PCFSoftShadowMap = v;
		var l = 0;
		exports.FrontSide = l;
		var _ = 1;
		exports.BackSide = _;
		var F = 2;
		exports.DoubleSide = F;
		var c = 1;
		exports.FlatShading = c;
		var g = 2;
		exports.SmoothShading = g;
		var S = 0;
		exports.NoColors = S;
		var T = 1;
		exports.FaceColors = T;
		var R = 2;
		exports.VertexColors = R;
		var d = 0;
		exports.NoBlending = d;
		var B = 1;
		exports.NormalBlending = B;
		var A = 2;
		exports.AdditiveBlending = A;
		var C = 3;
		exports.SubtractiveBlending = C;
		var m = 4;
		exports.MultiplyBlending = m;
		var M = 5;
		exports.CustomBlending = M;
		var u = 100;
		exports.AddEquation = u;
		var G = 101;
		exports.SubtractEquation = G;
		var h = 102;
		exports.ReverseSubtractEquation = h;
		var E = 103;
		exports.MinEquation = E;
		var D = 104;
		exports.MaxEquation = D;
		var P = 200;
		exports.ZeroFactor = P;
		var L = 201;
		exports.OneFactor = L;
		var y = 202;
		exports.SrcColorFactor = y;
		var N = 203;
		exports.OneMinusSrcColorFactor = N;
		var V = 204;
		exports.SrcAlphaFactor = V;
		var O = 205;
		exports.OneMinusSrcAlphaFactor = O;
		var U = 206;
		exports.DstAlphaFactor = U;
		var q = 207;
		exports.OneMinusDstAlphaFactor = q;
		var b = 208;
		exports.DstColorFactor = b;
		var f = 209;
		exports.OneMinusDstColorFactor = f;
		var I = 210;
		exports.SrcAlphaSaturateFactor = I;
		var w = 0;
		exports.NeverDepth = w;
		var W = 1;
		exports.AlwaysDepth = W;
		var k = 2;
		exports.LessDepth = k;
		var X = 3;
		exports.LessEqualDepth = X;
		var Z = 4;
		exports.EqualDepth = Z;
		var j = 5;
		exports.GreaterEqualDepth = j;
		var H = 6;
		exports.GreaterDepth = H;
		var z = 7;
		exports.NotEqualDepth = z;
		var J = 0;
		exports.MultiplyOperation = J;
		var K = 1;
		exports.MixOperation = K;
		var Q = 2;
		exports.AddOperation = Q;
		var Y = 0;
		exports.NoToneMapping = Y;
		var $ = 1;
		exports.LinearToneMapping = $;
		var rr = 2;
		exports.ReinhardToneMapping = rr;
		var er = 3;
		exports.Uncharted2ToneMapping = er;
		var tr = 4;
		exports.CineonToneMapping = tr;
		var or = 5;
		exports.ACESFilmicToneMapping = or;
		var pr = 300;
		exports.UVMapping = pr;
		var ar = 301;
		exports.CubeReflectionMapping = ar;
		var sr = 302;
		exports.CubeRefractionMapping = sr;
		var xr = 303;
		exports.EquirectangularReflectionMapping = xr;
		var nr = 304;
		exports.EquirectangularRefractionMapping = nr;
		var ir = 305;
		exports.SphericalReflectionMapping = ir;
		var vr = 306;
		exports.CubeUVReflectionMapping = vr;
		var lr = 307;
		exports.CubeUVRefractionMapping = lr;
		var _r = 1e3;
		exports.RepeatWrapping = _r;
		var Fr = 1001;
		exports.ClampToEdgeWrapping = Fr;
		var cr = 1002;
		exports.MirroredRepeatWrapping = cr;
		var gr = 1003;
		exports.NearestFilter = gr;
		var Sr = 1004;
		exports.NearestMipMapNearestFilter = Sr;
		var Tr = 1005;
		exports.NearestMipMapLinearFilter = Tr;
		var Rr = 1006;
		exports.LinearFilter = Rr;
		var dr = 1007;
		exports.LinearMipMapNearestFilter = dr;
		var Br = 1008;
		exports.LinearMipMapLinearFilter = Br;
		var Ar = 1009;
		exports.UnsignedByteType = Ar;
		var Cr = 1010;
		exports.ByteType = Cr;
		var mr = 1011;
		exports.ShortType = mr;
		var Mr = 1012;
		exports.UnsignedShortType = Mr;
		var ur = 1013;
		exports.IntType = ur;
		var Gr = 1014;
		exports.UnsignedIntType = Gr;
		var hr = 1015;
		exports.FloatType = hr;
		var Er = 1016;
		exports.HalfFloatType = Er;
		var Dr = 1017;
		exports.UnsignedShort4444Type = Dr;
		var Pr = 1018;
		exports.UnsignedShort5551Type = Pr;
		var Lr = 1019;
		exports.UnsignedShort565Type = Lr;
		var yr = 1020;
		exports.UnsignedInt248Type = yr;
		var Nr = 1021;
		exports.AlphaFormat = Nr;
		var Vr = 1022;
		exports.RGBFormat = Vr;
		var Or = 1023;
		exports.RGBAFormat = Or;
		var Ur = 1024;
		exports.LuminanceFormat = Ur;
		var qr = 1025;
		exports.LuminanceAlphaFormat = qr;
		var br = Or;
		exports.RGBEFormat = br;
		var fr = 1026;
		exports.DepthFormat = fr;
		var Ir = 1027;
		exports.DepthStencilFormat = Ir;
		var wr = 1028;
		exports.RedFormat = wr;
		var Wr = 33776;
		exports.RGB_S3TC_DXT1_Format = Wr;
		var kr = 33777;
		exports.RGBA_S3TC_DXT1_Format = kr;
		var Xr = 33778;
		exports.RGBA_S3TC_DXT3_Format = Xr;
		var Zr = 33779;
		exports.RGBA_S3TC_DXT5_Format = Zr;
		var jr = 35840;
		exports.RGB_PVRTC_4BPPV1_Format = jr;
		var Hr = 35841;
		exports.RGB_PVRTC_2BPPV1_Format = Hr;
		var zr = 35842;
		exports.RGBA_PVRTC_4BPPV1_Format = zr;
		var Jr = 35843;
		exports.RGBA_PVRTC_2BPPV1_Format = Jr;
		var Kr = 36196;
		exports.RGB_ETC1_Format = Kr;
		var Qr = 37808;
		exports.RGBA_ASTC_4x4_Format = Qr;
		var Yr = 37809;
		exports.RGBA_ASTC_5x4_Format = Yr;
		var $r = 37810;
		exports.RGBA_ASTC_5x5_Format = $r;
		var re = 37811;
		exports.RGBA_ASTC_6x5_Format = re;
		var ee = 37812;
		exports.RGBA_ASTC_6x6_Format = ee;
		var te = 37813;
		exports.RGBA_ASTC_8x5_Format = te;
		var oe = 37814;
		exports.RGBA_ASTC_8x6_Format = oe;
		var pe = 37815;
		exports.RGBA_ASTC_8x8_Format = pe;
		var ae = 37816;
		exports.RGBA_ASTC_10x5_Format = ae;
		var se = 37817;
		exports.RGBA_ASTC_10x6_Format = se;
		var xe = 37818;
		exports.RGBA_ASTC_10x8_Format = xe;
		var ne = 37819;
		exports.RGBA_ASTC_10x10_Format = ne;
		var ie = 37820;
		exports.RGBA_ASTC_12x10_Format = ie;
		var ve = 37821;
		exports.RGBA_ASTC_12x12_Format = ve;
		var le = 2200;
		exports.LoopOnce = le;
		var _e = 2201;
		exports.LoopRepeat = _e;
		var Fe = 2202;
		exports.LoopPingPong = Fe;
		var ce = 2300;
		exports.InterpolateDiscrete = ce;
		var ge = 2301;
		exports.InterpolateLinear = ge;
		var Se = 2302;
		exports.InterpolateSmooth = Se;
		var Te = 2400;
		exports.ZeroCurvatureEnding = Te;
		var Re = 2401;
		exports.ZeroSlopeEnding = Re;
		var de = 2402;
		exports.WrapAroundEnding = de;
		var Be = 0;
		exports.TrianglesDrawMode = Be;
		var Ae = 1;
		exports.TriangleStripDrawMode = Ae;
		var Ce = 2;
		exports.TriangleFanDrawMode = Ce;
		var me = 3e3;
		exports.LinearEncoding = me;
		var Me = 3001;
		exports.sRGBEncoding = Me;
		var ue = 3007;
		exports.GammaEncoding = ue;
		var Ge = 3002;
		exports.RGBEEncoding = Ge;
		var he = 3003;
		exports.LogLuvEncoding = he;
		var Ee = 3004;
		exports.RGBM7Encoding = Ee;
		var De = 3005;
		exports.RGBM16Encoding = De;
		var Pe = 3006;
		exports.RGBDEncoding = Pe;
		var Le = 3200;
		exports.BasicDepthPacking = Le;
		var ye = 3201;
		exports.RGBADepthPacking = ye;
		var Ne = 0;
		exports.TangentSpaceNormalMap = Ne;
		var Ve = 1;
		exports.ObjectSpaceNormalMap = Ve;
	}, {}],
	"Nnue": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.Object3D = l;
		var t = require("../math/Quaternion.js"),
			e = require("../math/Vector3.js"),
			r = require("../math/Matrix4.js"),
			i = require("./EventDispatcher.js"),
			n = require("../math/Euler.js"),
			a = require("./Layers.js"),
			s = require("../math/Matrix3.js"),
			o = require("../math/Math.js"),
			u = require("../constants.js"),
			h = 0;

		function l() {
			Object.defineProperty(this, "id", {
				value: h++
			}), this.uuid = o._Math.generateUUID(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = l.DefaultUp.clone();
			var i = new e.Vector3,
				u = new n.Euler,
				c = new t.Quaternion,
				d = new e.Vector3(1, 1, 1);
			u.onChange(function() {
				c.setFromEuler(u, !1)
			}), c.onChange(function() {
				u.setFromQuaternion(c, void 0, !1)
			}), Object.defineProperties(this, {
				position: {
					configurable: !0,
					enumerable: !0,
					value: i
				},
				rotation: {
					configurable: !0,
					enumerable: !0,
					value: u
				},
				quaternion: {
					configurable: !0,
					enumerable: !0,
					value: c
				},
				scale: {
					configurable: !0,
					enumerable: !0,
					value: d
				},
				modelViewMatrix: {
					value: new r.Matrix4
				},
				normalMatrix: {
					value: new s.Matrix3
				}
			}), this.matrix = new r.Matrix4, this.matrixWorld = new r.Matrix4, this.matrixAutoUpdate = l.DefaultMatrixAutoUpdate, this.matrixWorldNeedsUpdate = !1, this.layers = new a.Layers, this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.userData = {}
		}
		l.DefaultUp = new e.Vector3(0, 1, 0), l.DefaultMatrixAutoUpdate = !0, l.prototype = Object.assign(Object.create(i.EventDispatcher.prototype), {
			constructor: l,
			isObject3D: !0,
			onBeforeRender: function() {},
			onAfterRender: function() {},
			applyMatrix: function(t) {
				this.matrix.multiplyMatrices(t, this.matrix), this.matrix.decompose(this.position, this.quaternion, this.scale)
			},
			applyQuaternion: function(t) {
				return this.quaternion.premultiply(t), this
			},
			setRotationFromAxisAngle: function(t, e) {
				this.quaternion.setFromAxisAngle(t, e)
			},
			setRotationFromEuler: function(t) {
				this.quaternion.setFromEuler(t, !0)
			},
			setRotationFromMatrix: function(t) {
				this.quaternion.setFromRotationMatrix(t)
			},
			setRotationFromQuaternion: function(t) {
				this.quaternion.copy(t)
			},
			rotateOnAxis: function() {
				var e = new t.Quaternion;
				return function(t, r) {
					return e.setFromAxisAngle(t, r), this.quaternion.multiply(e), this
				}
			}(),
			rotateOnWorldAxis: function() {
				var e = new t.Quaternion;
				return function(t, r) {
					return e.setFromAxisAngle(t, r), this.quaternion.premultiply(e), this
				}
			}(),
			rotateX: function() {
				var t = new e.Vector3(1, 0, 0);
				return function(e) {
					return this.rotateOnAxis(t, e)
				}
			}(),
			rotateY: function() {
				var t = new e.Vector3(0, 1, 0);
				return function(e) {
					return this.rotateOnAxis(t, e)
				}
			}(),
			rotateZ: function() {
				var t = new e.Vector3(0, 0, 1);
				return function(e) {
					return this.rotateOnAxis(t, e)
				}
			}(),
			translateOnAxis: function() {
				var t = new e.Vector3;
				return function(e, r) {
					return t.copy(e).applyQuaternion(this.quaternion), this.position.add(t.multiplyScalar(r)), this
				}
			}(),
			translateX: function() {
				var t = new e.Vector3(1, 0, 0);
				return function(e) {
					return this.translateOnAxis(t, e)
				}
			}(),
			translateY: function() {
				var t = new e.Vector3(0, 1, 0);
				return function(e) {
					return this.translateOnAxis(t, e)
				}
			}(),
			translateZ: function() {
				var t = new e.Vector3(0, 0, 1);
				return function(e) {
					return this.translateOnAxis(t, e)
				}
			}(),
			localToWorld: function(t) {
				return t.applyMatrix4(this.matrixWorld)
			},
			worldToLocal: function() {
				var t = new r.Matrix4;
				return function(e) {
					return e.applyMatrix4(t.getInverse(this.matrixWorld))
				}
			}(),
			lookAt: function() {
				var i = new t.Quaternion,
					n = new r.Matrix4,
					a = new e.Vector3,
					s = new e.Vector3;
				return function(t, e, r) {
					t.isVector3 ? a.copy(t) : a.set(t, e, r);
					var o = this.parent;
					this.updateWorldMatrix(!0, !1), s.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? n.lookAt(s, a, this.up) : n.lookAt(a, s, this.up), this.quaternion.setFromRotationMatrix(n), o && (n.extractRotation(o.matrixWorld), i.setFromRotationMatrix(n), this.quaternion.premultiply(i.inverse()))
				}
			}(),
			add: function(t) {
				if (arguments.length > 1) {
					for (var e = 0; e < arguments.length; e++) this.add(arguments[e]);
					return this
				}
				return t === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", t), this) : (t && t.isObject3D ? (null !== t.parent && t.parent.remove(t), t.parent = this, t.dispatchEvent({
					type: "added"
				}), this.children.push(t)) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", t), this)
			},
			remove: function(t) {
				if (arguments.length > 1) {
					for (var e = 0; e < arguments.length; e++) this.remove(arguments[e]);
					return this
				}
				var r = this.children.indexOf(t);
				return -1 !== r && (t.parent = null, t.dispatchEvent({
					type: "removed"
				}), this.children.splice(r, 1)), this
			},
			getObjectById: function(t) {
				return this.getObjectByProperty("id", t)
			},
			getObjectByName: function(t) {
				return this.getObjectByProperty("name", t)
			},
			getObjectByProperty: function(t, e) {
				if (this[t] === e) return this;
				for (var r = 0, i = this.children.length; r < i; r++) {
					var n = this.children[r].getObjectByProperty(t, e);
					if (void 0 !== n) return n
				}
			},
			getWorldPosition: function(t) {
				return void 0 === t && (console.warn("THREE.Object3D: .getWorldPosition() target is now required"), t = new e.Vector3), this.updateMatrixWorld(!0), t.setFromMatrixPosition(this.matrixWorld)
			},
			getWorldQuaternion: function() {
				var r = new e.Vector3,
					i = new e.Vector3;
				return function(e) {
					return void 0 === e && (console.warn("THREE.Object3D: .getWorldQuaternion() target is now required"), e = new t.Quaternion), this.updateMatrixWorld(!0), this.matrixWorld.decompose(r, e, i), e
				}
			}(),
			getWorldScale: function() {
				var r = new e.Vector3,
					i = new t.Quaternion;
				return function(t) {
					return void 0 === t && (console.warn("THREE.Object3D: .getWorldScale() target is now required"), t = new e.Vector3), this.updateMatrixWorld(!0), this.matrixWorld.decompose(r, i, t), t
				}
			}(),
			getWorldDirection: function(t) {
				void 0 === t && (console.warn("THREE.Object3D: .getWorldDirection() target is now required"), t = new e.Vector3), this.updateMatrixWorld(!0);
				var r = this.matrixWorld.elements;
				return t.set(r[8], r[9], r[10]).normalize()
			},
			raycast: function() {},
			traverse: function(t) {
				t(this);
				for (var e = this.children, r = 0, i = e.length; r < i; r++) e[r].traverse(t)
			},
			traverseVisible: function(t) {
				if (!1 !== this.visible) {
					t(this);
					for (var e = this.children, r = 0, i = e.length; r < i; r++) e[r].traverseVisible(t)
				}
			},
			traverseAncestors: function(t) {
				var e = this.parent;
				null !== e && (t(e), e.traverseAncestors(t))
			},
			updateMatrix: function() {
				this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0
			},
			updateMatrixWorld: function(t) {
				this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || t) && (null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1, t = !0);
				for (var e = this.children, r = 0, i = e.length; r < i; r++) e[r].updateMatrixWorld(t)
			},
			updateWorldMatrix: function(t, e) {
				var r = this.parent;
				if (!0 === t && null !== r && r.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), !0 === e)
					for (var i = this.children, n = 0, a = i.length; n < a; n++) i[n].updateWorldMatrix(!1, !0)
			},
			toJSON: function(t) {
				var e = void 0 === t || "string" == typeof t,
					r = {};
				e && (t = {
					geometries: {},
					materials: {},
					textures: {},
					images: {},
					shapes: {}
				}, r.metadata = {
					version: 4.5,
					type: "Object",
					generator: "Object3D.toJSON"
				});
				var i = {};

				function n(e, r) {
					return void 0 === e[r.uuid] && (e[r.uuid] = r.toJSON(t)), r.uuid
				}
				if (i.uuid = this.uuid, i.type = this.type, "" !== this.name && (i.name = this.name), !0 === this.castShadow && (i.castShadow = !0), !0 === this.receiveShadow && (i.receiveShadow = !0), !1 === this.visible && (i.visible = !1), !1 === this.frustumCulled && (i.frustumCulled = !1), 0 !== this.renderOrder && (i.renderOrder = this.renderOrder), "{}" !== JSON.stringify(this.userData) && (i.userData = this.userData), i.layers = this.layers.mask, i.matrix = this.matrix.toArray(), !1 === this.matrixAutoUpdate && (i.matrixAutoUpdate = !1), this.isMesh && this.drawMode !== u.TrianglesDrawMode && (i.drawMode = this.drawMode), this.isMesh || this.isLine || this.isPoints) {
					i.geometry = n(t.geometries, this.geometry);
					var a = this.geometry.parameters;
					if (void 0 !== a && void 0 !== a.shapes) {
						var s = a.shapes;
						if (Array.isArray(s))
							for (var o = 0, h = s.length; o < h; o++) {
								var l = s[o];
								n(t.shapes, l)
							} else n(t.shapes, s)
					}
				}
				if (void 0 !== this.material)
					if (Array.isArray(this.material)) {
						var c = [];
						for (o = 0, h = this.material.length; o < h; o++) c.push(n(t.materials, this.material[o]));
						i.material = c
					} else i.material = n(t.materials, this.material);
				if (this.children.length > 0) {
					i.children = [];
					for (o = 0; o < this.children.length; o++) i.children.push(this.children[o].toJSON(t).object)
				}
				if (e) {
					var d = x(t.geometries),
						m = x(t.materials),
						p = x(t.textures),
						f = x(t.images);
					s = x(t.shapes);
					d.length > 0 && (r.geometries = d), m.length > 0 && (r.materials = m), p.length > 0 && (r.textures = p), f.length > 0 && (r.images = f), s.length > 0 && (r.shapes = s)
				}
				return r.object = i, r;

				function x(t) {
					var e = [];
					for (var r in t) {
						var i = t[r];
						delete i.metadata, e.push(i)
					}
					return e
				}
			},
			clone: function(t) {
				return (new this.constructor).copy(this, t)
			},
			copy: function(t, e) {
				if (void 0 === e && (e = !0), this.name = t.name, this.up.copy(t.up), this.position.copy(t.position), this.quaternion.copy(t.quaternion), this.scale.copy(t.scale), this.matrix.copy(t.matrix), this.matrixWorld.copy(t.matrixWorld), this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate, this.layers.mask = t.layers.mask, this.visible = t.visible, this.castShadow = t.castShadow, this.receiveShadow = t.receiveShadow, this.frustumCulled = t.frustumCulled, this.renderOrder = t.renderOrder, this.userData = JSON.parse(JSON.stringify(t.userData)), !0 === e)
					for (var r = 0; r < t.children.length; r++) {
						var i = t.children[r];
						this.add(i.clone())
					}
				return this
			}
		});
	}, {
		"../math/Quaternion.js": "87fW",
		"../math/Vector3.js": "QLQv",
		"../math/Matrix4.js": "QUid",
		"./EventDispatcher.js": "SLlv",
		"../math/Euler.js": "Ed5t",
		"./Layers.js": "Iask",
		"../math/Matrix3.js": "ecXo",
		"../math/Math.js": "M5nx",
		"../constants.js": "y6Nk"
	}],
	"xGoW": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.Camera = i;
		var t = require("../math/Matrix4.js"),
			r = require("../core/Object3D.js"),
			e = require("../math/Vector3.js");

		function i() {
			r.Object3D.call(this), this.type = "Camera", this.matrixWorldInverse = new t.Matrix4, this.projectionMatrix = new t.Matrix4, this.projectionMatrixInverse = new t.Matrix4
		}
		i.prototype = Object.assign(Object.create(r.Object3D.prototype), {
			constructor: i,
			isCamera: !0,
			copy: function(t, e) {
				return r.Object3D.prototype.copy.call(this, t, e), this.matrixWorldInverse.copy(t.matrixWorldInverse), this.projectionMatrix.copy(t.projectionMatrix), this.projectionMatrixInverse.copy(t.projectionMatrixInverse), this
			},
			getWorldDirection: function(t) {
				void 0 === t && (console.warn("THREE.Camera: .getWorldDirection() target is now required"), t = new e.Vector3), this.updateMatrixWorld(!0);
				var r = this.matrixWorld.elements;
				return t.set(-r[8], -r[9], -r[10]).normalize()
			},
			updateMatrixWorld: function(t) {
				r.Object3D.prototype.updateMatrixWorld.call(this, t), this.matrixWorldInverse.getInverse(this.matrixWorld)
			},
			clone: function() {
				return (new this.constructor).copy(this)
			}
		});
	}, {
		"../math/Matrix4.js": "QUid",
		"../core/Object3D.js": "Nnue",
		"../math/Vector3.js": "QLQv"
	}],
	"iz3s": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.PerspectiveCamera = s;
		var t = require("./Camera.js"),
			i = require("../core/Object3D.js"),
			e = require("../math/Math.js");

		function s(i, e, s, h) {
			t.Camera.call(this), this.type = "PerspectiveCamera", this.fov = void 0 !== i ? i : 50, this.zoom = 1, this.near = void 0 !== s ? s : .1, this.far = void 0 !== h ? h : 2e3, this.focus = 10, this.aspect = void 0 !== e ? e : 1, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix()
		}
		s.prototype = Object.assign(Object.create(t.Camera.prototype), {
			constructor: s,
			isPerspectiveCamera: !0,
			copy: function(i, e) {
				return t.Camera.prototype.copy.call(this, i, e), this.fov = i.fov, this.zoom = i.zoom, this.near = i.near, this.far = i.far, this.focus = i.focus, this.aspect = i.aspect, this.view = null === i.view ? null : Object.assign({}, i.view), this.filmGauge = i.filmGauge, this.filmOffset = i.filmOffset, this
			},
			setFocalLength: function(t) {
				var i = .5 * this.getFilmHeight() / t;
				this.fov = 2 * e._Math.RAD2DEG * Math.atan(i), this.updateProjectionMatrix()
			},
			getFocalLength: function() {
				var t = Math.tan(.5 * e._Math.DEG2RAD * this.fov);
				return .5 * this.getFilmHeight() / t
			},
			getEffectiveFOV: function() {
				return 2 * e._Math.RAD2DEG * Math.atan(Math.tan(.5 * e._Math.DEG2RAD * this.fov) / this.zoom)
			},
			getFilmWidth: function() {
				return this.filmGauge * Math.min(this.aspect, 1)
			},
			getFilmHeight: function() {
				return this.filmGauge / Math.max(this.aspect, 1)
			},
			setViewOffset: function(t, i, e, s, h, a) {
				this.aspect = t / i, null === this.view && (this.view = {
					enabled: !0,
					fullWidth: 1,
					fullHeight: 1,
					offsetX: 0,
					offsetY: 0,
					width: 1,
					height: 1
				}), this.view.enabled = !0, this.view.fullWidth = t, this.view.fullHeight = i, this.view.offsetX = e, this.view.offsetY = s, this.view.width = h, this.view.height = a, this.updateProjectionMatrix()
			},
			clearViewOffset: function() {
				null !== this.view && (this.view.enabled = !1), this.updateProjectionMatrix()
			},
			updateProjectionMatrix: function() {
				var t = this.near,
					i = t * Math.tan(.5 * e._Math.DEG2RAD * this.fov) / this.zoom,
					s = 2 * i,
					h = this.aspect * s,
					a = -.5 * h,
					o = this.view;
				if (null !== this.view && this.view.enabled) {
					var f = o.fullWidth,
						r = o.fullHeight;
					a += o.offsetX * h / f, i -= o.offsetY * s / r, h *= o.width / f, s *= o.height / r
				}
				var n = this.filmOffset;
				0 !== n && (a += t * n / this.getFilmWidth()), this.projectionMatrix.makePerspective(a, a + h, i, i - s, t, this.far), this.projectionMatrixInverse.getInverse(this.projectionMatrix)
			},
			toJSON: function(t) {
				var e = i.Object3D.prototype.toJSON.call(this, t);
				return e.object.fov = this.fov, e.object.zoom = this.zoom, e.object.near = this.near, e.object.far = this.far, e.object.focus = this.focus, e.object.aspect = this.aspect, null !== this.view && (e.object.view = Object.assign({}, this.view)), e.object.filmGauge = this.filmGauge, e.object.filmOffset = this.filmOffset, e
			}
		});
	}, {
		"./Camera.js": "xGoW",
		"../core/Object3D.js": "Nnue",
		"../math/Math.js": "M5nx"
	}],
	"E4Pr": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.Scene = e;
		var t = require("../core/Object3D.js");

		function e() {
			t.Object3D.call(this), this.type = "Scene", this.background = null, this.fog = null, this.overrideMaterial = null, this.autoUpdate = !0
		}
		e.prototype = Object.assign(Object.create(t.Object3D.prototype), {
			constructor: e,
			isScene: !0,
			copy: function(e, o) {
				return t.Object3D.prototype.copy.call(this, e, o), null !== e.background && (this.background = e.background.clone()), null !== e.fog && (this.fog = e.fog.clone()), null !== e.overrideMaterial && (this.overrideMaterial = e.overrideMaterial.clone()), this.autoUpdate = e.autoUpdate, this.matrixAutoUpdate = e.matrixAutoUpdate, this
			},
			toJSON: function(e) {
				var o = t.Object3D.prototype.toJSON.call(this, e);
				return null !== this.background && (o.object.background = this.background.toJSON(e)), null !== this.fog && (o.object.fog = this.fog.toJSON()), o
			},
			dispose: function() {
				this.dispatchEvent({
					type: "dispose"
				})
			}
		});
	}, {
		"../core/Object3D.js": "Nnue"
	}],
	"vOoB": [function(require, module, exports) {
		"use strict";

		function t(t, i) {
			this.x = t || 0, this.y = i || 0
		}
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.Vector2 = t, Object.defineProperties(t.prototype, {
			width: {
				get: function() {
					return this.x
				},
				set: function(t) {
					this.x = t
				}
			},
			height: {
				get: function() {
					return this.y
				},
				set: function(t) {
					this.y = t
				}
			}
		}), Object.assign(t.prototype, {
			isVector2: !0,
			set: function(t, i) {
				return this.x = t, this.y = i, this
			},
			setScalar: function(t) {
				return this.x = t, this.y = t, this
			},
			setX: function(t) {
				return this.x = t, this
			},
			setY: function(t) {
				return this.y = t, this
			},
			setComponent: function(t, i) {
				switch (t) {
					case 0:
						this.x = i;
						break;
					case 1:
						this.y = i;
						break;
					default:
						throw new Error("index is out of range: " + t)
				}
				return this
			},
			getComponent: function(t) {
				switch (t) {
					case 0:
						return this.x;
					case 1:
						return this.y;
					default:
						throw new Error("index is out of range: " + t)
				}
			},
			clone: function() {
				return new this.constructor(this.x, this.y)
			},
			copy: function(t) {
				return this.x = t.x, this.y = t.y, this
			},
			add: function(t, i) {
				return void 0 !== i ? (console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(t, i)) : (this.x += t.x, this.y += t.y, this)
			},
			addScalar: function(t) {
				return this.x += t, this.y += t, this
			},
			addVectors: function(t, i) {
				return this.x = t.x + i.x, this.y = t.y + i.y, this
			},
			addScaledVector: function(t, i) {
				return this.x += t.x * i, this.y += t.y * i, this
			},
			sub: function(t, i) {
				return void 0 !== i ? (console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(t, i)) : (this.x -= t.x, this.y -= t.y, this)
			},
			subScalar: function(t) {
				return this.x -= t, this.y -= t, this
			},
			subVectors: function(t, i) {
				return this.x = t.x - i.x, this.y = t.y - i.y, this
			},
			multiply: function(t) {
				return this.x *= t.x, this.y *= t.y, this
			},
			multiplyScalar: function(t) {
				return this.x *= t, this.y *= t, this
			},
			divide: function(t) {
				return this.x /= t.x, this.y /= t.y, this
			},
			divideScalar: function(t) {
				return this.multiplyScalar(1 / t)
			},
			applyMatrix3: function(t) {
				var i = this.x,
					n = this.y,
					s = t.elements;
				return this.x = s[0] * i + s[3] * n + s[6], this.y = s[1] * i + s[4] * n + s[7], this
			},
			min: function(t) {
				return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this
			},
			max: function(t) {
				return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this
			},
			clamp: function(t, i) {
				return this.x = Math.max(t.x, Math.min(i.x, this.x)), this.y = Math.max(t.y, Math.min(i.y, this.y)), this
			},
			clampScalar: function() {
				var i = new t,
					n = new t;
				return function(t, s) {
					return i.set(t, t), n.set(s, s), this.clamp(i, n)
				}
			}(),
			clampLength: function(t, i) {
				var n = this.length();
				return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(i, n)))
			},
			floor: function() {
				return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
			},
			ceil: function() {
				return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this
			},
			round: function() {
				return this.x = Math.round(this.x), this.y = Math.round(this.y), this
			},
			roundToZero: function() {
				return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this
			},
			negate: function() {
				return this.x = -this.x, this.y = -this.y, this
			},
			dot: function(t) {
				return this.x * t.x + this.y * t.y
			},
			cross: function(t) {
				return this.x * t.y - this.y * t.x
			},
			lengthSq: function() {
				return this.x * this.x + this.y * this.y
			},
			length: function() {
				return Math.sqrt(this.x * this.x + this.y * this.y)
			},
			manhattanLength: function() {
				return Math.abs(this.x) + Math.abs(this.y)
			},
			normalize: function() {
				return this.divideScalar(this.length() || 1)
			},
			angle: function() {
				var t = Math.atan2(this.y, this.x);
				return t < 0 && (t += 2 * Math.PI), t
			},
			distanceTo: function(t) {
				return Math.sqrt(this.distanceToSquared(t))
			},
			distanceToSquared: function(t) {
				var i = this.x - t.x,
					n = this.y - t.y;
				return i * i + n * n
			},
			manhattanDistanceTo: function(t) {
				return Math.abs(this.x - t.x) + Math.abs(this.y - t.y)
			},
			setLength: function(t) {
				return this.normalize().multiplyScalar(t)
			},
			lerp: function(t, i) {
				return this.x += (t.x - this.x) * i, this.y += (t.y - this.y) * i, this
			},
			lerpVectors: function(t, i, n) {
				return this.subVectors(i, t).multiplyScalar(n).add(t)
			},
			equals: function(t) {
				return t.x === this.x && t.y === this.y
			},
			fromArray: function(t, i) {
				return void 0 === i && (i = 0), this.x = t[i], this.y = t[i + 1], this
			},
			toArray: function(t, i) {
				return void 0 === t && (t = []), void 0 === i && (i = 0), t[i] = this.x, t[i + 1] = this.y, t
			},
			fromBufferAttribute: function(t, i, n) {
				return void 0 !== n && console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute()."), this.x = t.getX(i), this.y = t.getY(i), this
			},
			rotateAround: function(t, i) {
				var n = Math.cos(i),
					s = Math.sin(i),
					h = this.x - t.x,
					r = this.y - t.y;
				return this.x = h * n - r * s + t.x, this.y = h * s + r * n + t.y, this
			}
		});
	}, {}],
	"oLt8": [function(require, module, exports) {
		"use strict";
		var e;
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.ImageUtils = void 0;
		var t = {
			getDataURL: function(t) {
				var a;
				if ("undefined" == typeof HTMLCanvasElement) return t.src;
				if (t instanceof HTMLCanvasElement) a = t;
				else {
					void 0 === e && (e = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas")), e.width = t.width, e.height = t.height;
					var i = e.getContext("2d");
					t instanceof ImageData ? i.putImageData(t, 0, 0) : i.drawImage(t, 0, 0, t.width, t.height), a = e
				}
				return a.width > 2048 || a.height > 2048 ? a.toDataURL("image/jpeg", .6) : a.toDataURL("image/png")
			}
		};
		exports.ImageUtils = t;
	}, {}],
	"L5Pf": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.Texture = n;
		var t = require("../core/EventDispatcher.js"),
			i = require("../constants.js"),
			e = require("../math/Math.js"),
			r = require("../math/Vector2.js"),
			a = require("../math/Matrix3.js"),
			s = require("../extras/ImageUtils.js"),
			p = 0;

		function n(t, s, o, h, u, m, c, l, g, d) {
			Object.defineProperty(this, "id", {
				value: p++
			}), this.uuid = e._Math.generateUUID(), this.name = "", this.image = void 0 !== t ? t : n.DEFAULT_IMAGE, this.mipmaps = [], this.mapping = void 0 !== s ? s : n.DEFAULT_MAPPING, this.wrapS = void 0 !== o ? o : i.ClampToEdgeWrapping, this.wrapT = void 0 !== h ? h : i.ClampToEdgeWrapping, this.magFilter = void 0 !== u ? u : i.LinearFilter, this.minFilter = void 0 !== m ? m : i.LinearMipMapLinearFilter, this.anisotropy = void 0 !== g ? g : 1, this.format = void 0 !== c ? c : i.RGBAFormat, this.type = void 0 !== l ? l : i.UnsignedByteType, this.offset = new r.Vector2(0, 0), this.repeat = new r.Vector2(1, 1), this.center = new r.Vector2(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new a.Matrix3, this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.encoding = void 0 !== d ? d : i.LinearEncoding, this.version = 0, this.onUpdate = null
		}
		n.DEFAULT_IMAGE = void 0, n.DEFAULT_MAPPING = i.UVMapping, n.prototype = Object.assign(Object.create(t.EventDispatcher.prototype), {
			constructor: n,
			isTexture: !0,
			updateMatrix: function() {
				this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y)
			},
			clone: function() {
				return (new this.constructor).copy(this)
			},
			copy: function(t) {
				return this.name = t.name, this.image = t.image, this.mipmaps = t.mipmaps.slice(0), this.mapping = t.mapping, this.wrapS = t.wrapS, this.wrapT = t.wrapT, this.magFilter = t.magFilter, this.minFilter = t.minFilter, this.anisotropy = t.anisotropy, this.format = t.format, this.type = t.type, this.offset.copy(t.offset), this.repeat.copy(t.repeat), this.center.copy(t.center), this.rotation = t.rotation, this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrix.copy(t.matrix), this.generateMipmaps = t.generateMipmaps, this.premultiplyAlpha = t.premultiplyAlpha, this.flipY = t.flipY, this.unpackAlignment = t.unpackAlignment, this.encoding = t.encoding, this
			},
			toJSON: function(t) {
				var i = void 0 === t || "string" == typeof t;
				if (!i && void 0 !== t.textures[this.uuid]) return t.textures[this.uuid];
				var r = {
					metadata: {
						version: 4.5,
						type: "Texture",
						generator: "Texture.toJSON"
					},
					uuid: this.uuid,
					name: this.name,
					mapping: this.mapping,
					repeat: [this.repeat.x, this.repeat.y],
					offset: [this.offset.x, this.offset.y],
					center: [this.center.x, this.center.y],
					rotation: this.rotation,
					wrap: [this.wrapS, this.wrapT],
					format: this.format,
					type: this.type,
					encoding: this.encoding,
					minFilter: this.minFilter,
					magFilter: this.magFilter,
					anisotropy: this.anisotropy,
					flipY: this.flipY,
					premultiplyAlpha: this.premultiplyAlpha,
					unpackAlignment: this.unpackAlignment
				};
				if (void 0 !== this.image) {
					var a = this.image;
					if (void 0 === a.uuid && (a.uuid = e._Math.generateUUID()), !i && void 0 === t.images[a.uuid]) {
						var p;
						if (Array.isArray(a)) {
							p = [];
							for (var n = 0, o = a.length; n < o; n++) p.push(s.ImageUtils.getDataURL(a[n]))
						} else p = s.ImageUtils.getDataURL(a);
						t.images[a.uuid] = {
							uuid: a.uuid,
							url: p
						}
					}
					r.image = a.uuid
				}
				return i || (t.textures[this.uuid] = r), r
			},
			dispose: function() {
				this.dispatchEvent({
					type: "dispose"
				})
			},
			transformUv: function(t) {
				if (this.mapping !== i.UVMapping) return t;
				if (t.applyMatrix3(this.matrix), t.x < 0 || t.x > 1) switch (this.wrapS) {
					case i.RepeatWrapping:
						t.x = t.x - Math.floor(t.x);
						break;
					case i.ClampToEdgeWrapping:
						t.x = t.x < 0 ? 0 : 1;
						break;
					case i.MirroredRepeatWrapping:
						1 === Math.abs(Math.floor(t.x) % 2) ? t.x = Math.ceil(t.x) - t.x : t.x = t.x - Math.floor(t.x)
				}
				if (t.y < 0 || t.y > 1) switch (this.wrapT) {
					case i.RepeatWrapping:
						t.y = t.y - Math.floor(t.y);
						break;
					case i.ClampToEdgeWrapping:
						t.y = t.y < 0 ? 0 : 1;
						break;
					case i.MirroredRepeatWrapping:
						1 === Math.abs(Math.floor(t.y) % 2) ? t.y = Math.ceil(t.y) - t.y : t.y = t.y - Math.floor(t.y)
				}
				return this.flipY && (t.y = 1 - t.y), t
			}
		}), Object.defineProperty(n.prototype, "needsUpdate", {
			set: function(t) {
				!0 === t && this.version++
			}
		});
	}, {
		"../core/EventDispatcher.js": "SLlv",
		"../constants.js": "y6Nk",
		"../math/Math.js": "M5nx",
		"../math/Vector2.js": "vOoB",
		"../math/Matrix3.js": "ecXo",
		"../extras/ImageUtils.js": "oLt8"
	}],
	"loYk": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.DataTexture = r;
		var t = require("./Texture.js"),
			e = require("../constants.js");

		function r(r, i, s, a, o, p, u, l, n, c, h, x) {
			t.Texture.call(this, null, p, u, l, n, c, a, o, h, x), this.image = {
				data: r,
				width: i,
				height: s
			}, this.magFilter = void 0 !== n ? n : e.NearestFilter, this.minFilter = void 0 !== c ? c : e.NearestFilter, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1
		}
		r.prototype = Object.create(t.Texture.prototype), r.prototype.constructor = r, r.prototype.isDataTexture = !0;
	}, {
		"./Texture.js": "L5Pf",
		"../constants.js": "y6Nk"
	}],
	"Xu2q": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.Box3 = n;
		var t = require("./Vector3.js"),
			i = require("./Sphere.js");

		function n(i, n) {
			this.min = void 0 !== i ? i : new t.Vector3(1 / 0, 1 / 0, 1 / 0), this.max = void 0 !== n ? n : new t.Vector3(-1 / 0, -1 / 0, -1 / 0)
		}
		Object.assign(n.prototype, {
			isBox3: !0,
			set: function(t, i) {
				return this.min.copy(t), this.max.copy(i), this
			},
			setFromArray: function(t) {
				for (var i = 1 / 0, n = 1 / 0, e = 1 / 0, r = -1 / 0, s = -1 / 0, a = -1 / 0, o = 0, m = t.length; o < m; o += 3) {
					var h = t[o],
						x = t[o + 1],
						c = t[o + 2];
					h < i && (i = h), x < n && (n = x), c < e && (e = c), h > r && (r = h), x > s && (s = x), c > a && (a = c)
				}
				return this.min.set(i, n, e), this.max.set(r, s, a), this
			},
			setFromBufferAttribute: function(t) {
				for (var i = 1 / 0, n = 1 / 0, e = 1 / 0, r = -1 / 0, s = -1 / 0, a = -1 / 0, o = 0, m = t.count; o < m; o++) {
					var h = t.getX(o),
						x = t.getY(o),
						c = t.getZ(o);
					h < i && (i = h), x < n && (n = x), c < e && (e = c), h > r && (r = h), x > s && (s = x), c > a && (a = c)
				}
				return this.min.set(i, n, e), this.max.set(r, s, a), this
			},
			setFromPoints: function(t) {
				this.makeEmpty();
				for (var i = 0, n = t.length; i < n; i++) this.expandByPoint(t[i]);
				return this
			},
			setFromCenterAndSize: function() {
				var i = new t.Vector3;
				return function(t, n) {
					var e = i.copy(n).multiplyScalar(.5);
					return this.min.copy(t).sub(e), this.max.copy(t).add(e), this
				}
			}(),
			setFromObject: function(t) {
				return this.makeEmpty(), this.expandByObject(t)
			},
			clone: function() {
				return (new this.constructor).copy(this)
			},
			copy: function(t) {
				return this.min.copy(t.min), this.max.copy(t.max), this
			},
			makeEmpty: function() {
				return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this
			},
			isEmpty: function() {
				return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
			},
			getCenter: function(i) {
				return void 0 === i && (console.warn("THREE.Box3: .getCenter() target is now required"), i = new t.Vector3), this.isEmpty() ? i.set(0, 0, 0) : i.addVectors(this.min, this.max).multiplyScalar(.5)
			},
			getSize: function(i) {
				return void 0 === i && (console.warn("THREE.Box3: .getSize() target is now required"), i = new t.Vector3), this.isEmpty() ? i.set(0, 0, 0) : i.subVectors(this.max, this.min)
			},
			expandByPoint: function(t) {
				return this.min.min(t), this.max.max(t), this
			},
			expandByVector: function(t) {
				return this.min.sub(t), this.max.add(t), this
			},
			expandByScalar: function(t) {
				return this.min.addScalar(-t), this.max.addScalar(t), this
			},
			expandByObject: function() {
				var i, n, e, r = new t.Vector3;

				function s(t) {
					var s = t.geometry;
					if (void 0 !== s)
						if (s.isGeometry) {
							var a = s.vertices;
							for (n = 0, e = a.length; n < e; n++) r.copy(a[n]), r.applyMatrix4(t.matrixWorld), i.expandByPoint(r)
						} else if (s.isBufferGeometry) {
						var o = s.attributes.position;
						if (void 0 !== o)
							for (n = 0, e = o.count; n < e; n++) r.fromBufferAttribute(o, n).applyMatrix4(t.matrixWorld), i.expandByPoint(r)
					}
				}
				return function(t) {
					return i = this, t.updateMatrixWorld(!0), t.traverse(s), this
				}
			}(),
			containsPoint: function(t) {
				return !(t.x < this.min.x || t.x > this.max.x || t.y < this.min.y || t.y > this.max.y || t.z < this.min.z || t.z > this.max.z)
			},
			containsBox: function(t) {
				return this.min.x <= t.min.x && t.max.x <= this.max.x && this.min.y <= t.min.y && t.max.y <= this.max.y && this.min.z <= t.min.z && t.max.z <= this.max.z
			},
			getParameter: function(i, n) {
				return void 0 === n && (console.warn("THREE.Box3: .getParameter() target is now required"), n = new t.Vector3), n.set((i.x - this.min.x) / (this.max.x - this.min.x), (i.y - this.min.y) / (this.max.y - this.min.y), (i.z - this.min.z) / (this.max.z - this.min.z))
			},
			intersectsBox: function(t) {
				return !(t.max.x < this.min.x || t.min.x > this.max.x || t.max.y < this.min.y || t.min.y > this.max.y || t.max.z < this.min.z || t.min.z > this.max.z)
			},
			intersectsSphere: function() {
				var i = new t.Vector3;
				return function(t) {
					return this.clampPoint(t.center, i), i.distanceToSquared(t.center) <= t.radius * t.radius
				}
			}(),
			intersectsPlane: function(t) {
				var i, n;
				return t.normal.x > 0 ? (i = t.normal.x * this.min.x, n = t.normal.x * this.max.x) : (i = t.normal.x * this.max.x, n = t.normal.x * this.min.x), t.normal.y > 0 ? (i += t.normal.y * this.min.y, n += t.normal.y * this.max.y) : (i += t.normal.y * this.max.y, n += t.normal.y * this.min.y), t.normal.z > 0 ? (i += t.normal.z * this.min.z, n += t.normal.z * this.max.z) : (i += t.normal.z * this.max.z, n += t.normal.z * this.min.z), i <= -t.constant && n >= -t.constant
			},
			intersectsTriangle: function() {
				var i = new t.Vector3,
					n = new t.Vector3,
					e = new t.Vector3,
					r = new t.Vector3,
					s = new t.Vector3,
					a = new t.Vector3,
					o = new t.Vector3,
					m = new t.Vector3,
					h = new t.Vector3,
					x = new t.Vector3;

				function c(t) {
					var r, s;
					for (r = 0, s = t.length - 3; r <= s; r += 3) {
						o.fromArray(t, r);
						var a = h.x * Math.abs(o.x) + h.y * Math.abs(o.y) + h.z * Math.abs(o.z),
							m = i.dot(o),
							x = n.dot(o),
							c = e.dot(o);
						if (Math.max(-Math.max(m, x, c), Math.min(m, x, c)) > a) return !1
					}
					return !0
				}
				return function(t) {
					if (this.isEmpty()) return !1;
					this.getCenter(m), h.subVectors(this.max, m), i.subVectors(t.a, m), n.subVectors(t.b, m), e.subVectors(t.c, m), r.subVectors(n, i), s.subVectors(e, n), a.subVectors(i, e);
					var o = [0, -r.z, r.y, 0, -s.z, s.y, 0, -a.z, a.y, r.z, 0, -r.x, s.z, 0, -s.x, a.z, 0, -a.x, -r.y, r.x, 0, -s.y, s.x, 0, -a.y, a.x, 0];
					return !!c(o) && (!!c(o = [1, 0, 0, 0, 1, 0, 0, 0, 1]) && (x.crossVectors(r, s), c(o = [x.x, x.y, x.z])))
				}
			}(),
			clampPoint: function(i, n) {
				return void 0 === n && (console.warn("THREE.Box3: .clampPoint() target is now required"), n = new t.Vector3), n.copy(i).clamp(this.min, this.max)
			},
			distanceToPoint: function() {
				var i = new t.Vector3;
				return function(t) {
					return i.copy(t).clamp(this.min, this.max).sub(t).length()
				}
			}(),
			getBoundingSphere: function() {
				var n = new t.Vector3;
				return function(t) {
					return void 0 === t && (console.warn("THREE.Box3: .getBoundingSphere() target is now required"), t = new i.Sphere), this.getCenter(t.center), t.radius = .5 * this.getSize(n).length(), t
				}
			}(),
			intersect: function(t) {
				return this.min.max(t.min), this.max.min(t.max), this.isEmpty() && this.makeEmpty(), this
			},
			union: function(t) {
				return this.min.min(t.min), this.max.max(t.max), this
			},
			applyMatrix4: function() {
				var i = [new t.Vector3, new t.Vector3, new t.Vector3, new t.Vector3, new t.Vector3, new t.Vector3, new t.Vector3, new t.Vector3];
				return function(t) {
					return this.isEmpty() ? this : (i[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t), i[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t), i[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t), i[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t), i[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t), i[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t), i[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t), i[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t), this.setFromPoints(i), this)
				}
			}(),
			translate: function(t) {
				return this.min.add(t), this.max.add(t), this
			},
			equals: function(t) {
				return t.min.equals(this.min) && t.max.equals(this.max)
			}
		});
	}, {
		"./Vector3.js": "QLQv",
		"./Sphere.js": "Jw30"
	}],
	"Jw30": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.Sphere = r;
		var t = require("./Box3.js"),
			e = require("./Vector3.js");

		function r(t, r) {
			this.center = void 0 !== t ? t : new e.Vector3, this.radius = void 0 !== r ? r : 0
		}
		Object.assign(r.prototype, {
			set: function(t, e) {
				return this.center.copy(t), this.radius = e, this
			},
			setFromPoints: function() {
				var e = new t.Box3;
				return function(t, r) {
					var i = this.center;
					void 0 !== r ? i.copy(r) : e.setFromPoints(t).getCenter(i);
					for (var n = 0, s = 0, o = t.length; s < o; s++) n = Math.max(n, i.distanceToSquared(t[s]));
					return this.radius = Math.sqrt(n), this
				}
			}(),
			clone: function() {
				return (new this.constructor).copy(this)
			},
			copy: function(t) {
				return this.center.copy(t.center), this.radius = t.radius, this
			},
			empty: function() {
				return this.radius <= 0
			},
			containsPoint: function(t) {
				return t.distanceToSquared(this.center) <= this.radius * this.radius
			},
			distanceToPoint: function(t) {
				return t.distanceTo(this.center) - this.radius
			},
			intersectsSphere: function(t) {
				var e = this.radius + t.radius;
				return t.center.distanceToSquared(this.center) <= e * e
			},
			intersectsBox: function(t) {
				return t.intersectsSphere(this)
			},
			intersectsPlane: function(t) {
				return Math.abs(t.distanceToPoint(this.center)) <= this.radius
			},
			clampPoint: function(t, r) {
				var i = this.center.distanceToSquared(t);
				return void 0 === r && (console.warn("THREE.Sphere: .clampPoint() target is now required"), r = new e.Vector3), r.copy(t), i > this.radius * this.radius && (r.sub(this.center).normalize(), r.multiplyScalar(this.radius).add(this.center)), r
			},
			getBoundingBox: function(e) {
				return void 0 === e && (console.warn("THREE.Sphere: .getBoundingBox() target is now required"), e = new t.Box3), e.set(this.center, this.center), e.expandByScalar(this.radius), e
			},
			applyMatrix4: function(t) {
				return this.center.applyMatrix4(t), this.radius = this.radius * t.getMaxScaleOnAxis(), this
			},
			translate: function(t) {
				return this.center.add(t), this
			},
			equals: function(t) {
				return t.center.equals(this.center) && t.radius === this.radius
			}
		});
	}, {
		"./Box3.js": "Xu2q",
		"./Vector3.js": "QLQv"
	}],
	"9GNh": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.Plane = r;
		var t = require("./Matrix3.js"),
			n = require("./Vector3.js");

		function r(t, r) {
			this.normal = void 0 !== t ? t : new n.Vector3(1, 0, 0), this.constant = void 0 !== r ? r : 0
		}
		Object.assign(r.prototype, {
			set: function(t, n) {
				return this.normal.copy(t), this.constant = n, this
			},
			setComponents: function(t, n, r, o) {
				return this.normal.set(t, n, r), this.constant = o, this
			},
			setFromNormalAndCoplanarPoint: function(t, n) {
				return this.normal.copy(t), this.constant = -n.dot(this.normal), this
			},
			setFromCoplanarPoints: function() {
				var t = new n.Vector3,
					r = new n.Vector3;
				return function(n, o, i) {
					var e = t.subVectors(i, o).cross(r.subVectors(n, o)).normalize();
					return this.setFromNormalAndCoplanarPoint(e, n), this
				}
			}(),
			clone: function() {
				return (new this.constructor).copy(this)
			},
			copy: function(t) {
				return this.normal.copy(t.normal), this.constant = t.constant, this
			},
			normalize: function() {
				var t = 1 / this.normal.length();
				return this.normal.multiplyScalar(t), this.constant *= t, this
			},
			negate: function() {
				return this.constant *= -1, this.normal.negate(), this
			},
			distanceToPoint: function(t) {
				return this.normal.dot(t) + this.constant
			},
			distanceToSphere: function(t) {
				return this.distanceToPoint(t.center) - t.radius
			},
			projectPoint: function(t, r) {
				return void 0 === r && (console.warn("THREE.Plane: .projectPoint() target is now required"), r = new n.Vector3), r.copy(this.normal).multiplyScalar(-this.distanceToPoint(t)).add(t)
			},
			intersectLine: function() {
				var t = new n.Vector3;
				return function(r, o) {
					void 0 === o && (console.warn("THREE.Plane: .intersectLine() target is now required"), o = new n.Vector3);
					var i = r.delta(t),
						e = this.normal.dot(i);
					if (0 === e) return 0 === this.distanceToPoint(r.start) ? o.copy(r.start) : void 0;
					var s = -(r.start.dot(this.normal) + this.constant) / e;
					return s < 0 || s > 1 ? void 0 : o.copy(i).multiplyScalar(s).add(r.start)
				}
			}(),
			intersectsLine: function(t) {
				var n = this.distanceToPoint(t.start),
					r = this.distanceToPoint(t.end);
				return n < 0 && r > 0 || r < 0 && n > 0
			},
			intersectsBox: function(t) {
				return t.intersectsPlane(this)
			},
			intersectsSphere: function(t) {
				return t.intersectsPlane(this)
			},
			coplanarPoint: function(t) {
				return void 0 === t && (console.warn("THREE.Plane: .coplanarPoint() target is now required"), t = new n.Vector3), t.copy(this.normal).multiplyScalar(-this.constant)
			},
			applyMatrix4: function() {
				var r = new n.Vector3,
					o = new t.Matrix3;
				return function(t, n) {
					var i = n || o.getNormalMatrix(t),
						e = this.coplanarPoint(r).applyMatrix4(t),
						s = this.normal.applyMatrix3(i).normalize();
					return this.constant = -e.dot(s), this
				}
			}(),
			translate: function(t) {
				return this.constant -= t.dot(this.normal), this
			},
			equals: function(t) {
				return t.normal.equals(this.normal) && t.constant === this.constant
			}
		});
	}, {
		"./Matrix3.js": "ecXo",
		"./Vector3.js": "QLQv"
	}],
	"MSmz": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.Frustum = r;
		var e = require("./Vector3.js"),
			n = require("./Sphere.js"),
			t = require("./Plane.js");

		function r(e, n, r, o, i, s) {
			this.planes = [void 0 !== e ? e : new t.Plane, void 0 !== n ? n : new t.Plane, void 0 !== r ? r : new t.Plane, void 0 !== o ? o : new t.Plane, void 0 !== i ? i : new t.Plane, void 0 !== s ? s : new t.Plane]
		}
		Object.assign(r.prototype, {
			set: function(e, n, t, r, o, i) {
				var s = this.planes;
				return s[0].copy(e), s[1].copy(n), s[2].copy(t), s[3].copy(r), s[4].copy(o), s[5].copy(i), this
			},
			clone: function() {
				return (new this.constructor).copy(this)
			},
			copy: function(e) {
				for (var n = this.planes, t = 0; t < 6; t++) n[t].copy(e.planes[t]);
				return this
			},
			setFromMatrix: function(e) {
				var n = this.planes,
					t = e.elements,
					r = t[0],
					o = t[1],
					i = t[2],
					s = t[3],
					a = t[4],
					c = t[5],
					p = t[6],
					u = t[7],
					l = t[8],
					m = t[9],
					h = t[10],
					f = t[11],
					v = t[12],
					y = t[13],
					d = t[14],
					x = t[15];
				return n[0].setComponents(s - r, u - a, f - l, x - v).normalize(), n[1].setComponents(s + r, u + a, f + l, x + v).normalize(), n[2].setComponents(s + o, u + c, f + m, x + y).normalize(), n[3].setComponents(s - o, u - c, f - m, x - y).normalize(), n[4].setComponents(s - i, u - p, f - h, x - d).normalize(), n[5].setComponents(s + i, u + p, f + h, x + d).normalize(), this
			},
			intersectsObject: function() {
				var e = new n.Sphere;
				return function(n) {
					var t = n.geometry;
					return null === t.boundingSphere && t.computeBoundingSphere(), e.copy(t.boundingSphere).applyMatrix4(n.matrixWorld), this.intersectsSphere(e)
				}
			}(),
			intersectsSprite: function() {
				var e = new n.Sphere;
				return function(n) {
					return e.center.set(0, 0, 0), e.radius = .7071067811865476, e.applyMatrix4(n.matrixWorld), this.intersectsSphere(e)
				}
			}(),
			intersectsSphere: function(e) {
				for (var n = this.planes, t = e.center, r = -e.radius, o = 0; o < 6; o++) {
					if (n[o].distanceToPoint(t) < r) return !1
				}
				return !0
			},
			intersectsBox: function() {
				var n = new e.Vector3;
				return function(e) {
					for (var t = this.planes, r = 0; r < 6; r++) {
						var o = t[r];
						if (n.x = o.normal.x > 0 ? e.max.x : e.min.x, n.y = o.normal.y > 0 ? e.max.y : e.min.y, n.z = o.normal.z > 0 ? e.max.z : e.min.z, o.distanceToPoint(n) < 0) return !1
					}
					return !0
				}
			}(),
			containsPoint: function(e) {
				for (var n = this.planes, t = 0; t < 6; t++)
					if (n[t].distanceToPoint(e) < 0) return !1;
				return !0
			}
		});
	}, {
		"./Vector3.js": "QLQv",
		"./Sphere.js": "Jw30",
		"./Plane.js": "9GNh"
	}],
	"31x9": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#ifdef USE_ALPHAMAP\n\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n\n#endif\n";
		exports.default = e;
	}, {}],
	"IROn": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#ifdef USE_ALPHAMAP\n\n\tuniform sampler2D alphaMap;\n\n#endif\n";
		exports.default = e;
	}, {}],
	"85uz": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#ifdef ALPHATEST\n\n\tif ( diffuseColor.a < ALPHATEST ) discard;\n\n#endif\n";
		exports.default = e;
	}, {}],
	"lg2/": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#ifdef USE_AOMAP\n\n\t// reads channel R, compatible with a combined OcclusionRoughnessMetallic (RGB) texture\n\tfloat ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\n\t#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );\n\n\t#endif\n\n#endif\n";
		exports.default = e;
	}, {}],
	"fz7o": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#ifdef USE_AOMAP\n\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n\n#endif\n";
		exports.default = e;
	}, {}],
	"7vyU": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\nvec3 transformed = vec3( position );\n";
		exports.default = e;
	}, {}],
	"Hpp2": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\nvec3 objectNormal = vec3( normal );\n";
		exports.default = e;
	}, {}],
	"X9qh": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var t = '\n\n// Analytical approximation of the DFG LUT, one half of the\n// split-sum approximation used in indirect specular lighting.\n// via \'environmentBRDF\' from "Physically Based Shading on Mobile"\n// https://www.unrealengine.com/blog/physically-based-shading-on-mobile - environmentBRDF for GGX on mobile\nvec2 integrateSpecularBRDF( const in float dotNV, const in float roughness ) {\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\n\tvec4 r = roughness * c0 + c1;\n\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\n\treturn vec2( -1.04, 1.04 ) * a004 + r.zw;\n\n}\n\nfloat punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\n#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n\n\t// based upon Frostbite 3 Moving to Physically-based Rendering\n\t// page 32, equation 26: E[window1]\n\t// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf\n\t// this is intended to be used on spot and point lights who are represented as luminous intensity\n\t// but who must be converted to luminous irradiance for surface lighting calculation\n\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\n\tif( cutoffDistance > 0.0 ) {\n\n\t\tdistanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\n\t}\n\n\treturn distanceFalloff;\n\n#else\n\n\tif( cutoffDistance > 0.0 && decayExponent > 0.0 ) {\n\n\t\treturn pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\n\t}\n\n\treturn 1.0;\n\n#endif\n\n}\n\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n\n\treturn RECIPROCAL_PI * diffuseColor;\n\n} // validated\n\nvec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {\n\n\t// Original approximation by Christophe Schlick \'94\n\t// float fresnel = pow( 1.0 - dotLH, 5.0 );\n\n\t// Optimized variant (presented by Epic at SIGGRAPH \'13)\n\t// https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf\n\tfloat fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );\n\n\treturn ( 1.0 - specularColor ) * fresnel + specularColor;\n\n} // validated\n\n// Microfacet Models for Refraction through Rough Surfaces - equation (34)\n// http://graphicrants.blogspot.com/2013/08/specular-brdf-reference.html\n// alpha is "roughness squared" in Disneyâ€™s reparameterization\nfloat G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {\n\n\t// geometry term (normalized) = G(l)â‹…G(v) / 4(nâ‹…l)(nâ‹…v)\n\t// also see #12151\n\n\tfloat a2 = pow2( alpha );\n\n\tfloat gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\tfloat gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\n\treturn 1.0 / ( gl * gv );\n\n} // validated\n\n// Moving Frostbite to Physically Based Rendering 3.0 - page 12, listing 2\n// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf\nfloat G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\n\tfloat a2 = pow2( alpha );\n\n\t// dotNL and dotNV are explicitly swapped. This is not a mistake.\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\n\treturn 0.5 / max( gv + gl, EPSILON );\n\n}\n\n// Microfacet Models for Refraction through Rough Surfaces - equation (33)\n// http://graphicrants.blogspot.com/2013/08/specular-brdf-reference.html\n// alpha is "roughness squared" in Disneyâ€™s reparameterization\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\n\tfloat a2 = pow2( alpha );\n\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0; // avoid alpha = 0 with dotNH = 1\n\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n\n}\n\n// GGX Distribution, Schlick Fresnel, GGX-Smith Visibility\nvec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\n\tfloat alpha = pow2( roughness ); // UE4\'s roughness\n\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\n\tfloat dotNL = saturate( dot( geometry.normal, incidentLight.direction ) );\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\n\tfloat G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\n\tfloat D = D_GGX( alpha, dotNH );\n\n\treturn F * ( G * D );\n\n} // validated\n\n// Rect Area Light\n\n// Real-Time Polygonal-Light Shading with Linearly Transformed Cosines\n// by Eric Heitz, Jonathan Dupuy, Stephen Hill and David Neubelt\n// code: https://github.com/selfshadow/ltc_code/\n\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\n\tconst float LUT_SIZE  = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS  = 0.5 / LUT_SIZE;\n\n\tfloat dotNV = saturate( dot( N, V ) );\n\n\t// texture parameterized by sqrt( GGX alpha ) and sqrt( 1 - cos( theta ) )\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\n\treturn uv;\n\n}\n\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\n\t// Real-Time Area Lighting: a Journey from Research to Production (p.102)\n\t// An approximation of the form factor of a horizon-clipped rectangle.\n\n\tfloat l = length( f );\n\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n\n}\n\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\n\tfloat x = dot( v1, v2 );\n\n\tfloat y = abs( x );\n\n\t// rational polynomial approximation to theta / sin( theta ) / 2PI\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\n\treturn cross( v1, v2 ) * theta_sintheta;\n\n}\n\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\n\t// bail if point is on back side of plane of light\n\t// assumes ccw winding order of light vertices\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\n\t// construct orthonormal basis around N\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 ); // negated from paper; possibly due to a different handedness of world coordinate system\n\n\t// compute transform\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\n\t// transform rect\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\n\t// project rect onto sphere\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\n\t// calculate vector form factor\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\n\t// adjust for horizon clipping\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\n/*\n\t// alternate method of adjusting for horizon clipping (see referece)\n\t// refactoring required\n\tfloat len = length( vectorFormFactor );\n\tfloat z = vectorFormFactor.z / len;\n\n\tconst float LUT_SIZE  = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS  = 0.5 / LUT_SIZE;\n\n\t// tabulated horizon-clipped sphere, apparently...\n\tvec2 uv = vec2( z * 0.5 + 0.5, len );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\n\tfloat scale = texture2D( ltc_2, uv ).w;\n\n\tfloat result = len * scale;\n*/\n\n\treturn vec3( result );\n\n}\n\n// End Rect Area Light\n\n// ref: https://www.unrealengine.com/blog/physically-based-shading-on-mobile - environmentBRDF for GGX on mobile\nvec3 BRDF_Specular_GGX_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\n\tvec2 brdf = integrateSpecularBRDF( dotNV, roughness );\n\n\treturn specularColor * brdf.x + brdf.y;\n\n} // validated\n\n// Fdez-AgÃ¼era\'s "Multiple-Scattering Microfacet Model for Real-Time Image Based Lighting"\n// Approximates multiscattering in order to preserve energy.\n// http://www.jcgt.org/published/0008/01/03/\nvoid BRDF_Specular_Multiscattering_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\n\tvec3 F = F_Schlick( specularColor, dotNV );\n\tvec2 brdf = integrateSpecularBRDF( dotNV, roughness );\n\tvec3 FssEss = F * brdf.x + brdf.y;\n\n\tfloat Ess = brdf.x + brdf.y;\n\tfloat Ems = 1.0 - Ess;\n\n\t// Paper incorrect indicates coefficient is PI/21, and will\n\t// be corrected to 1/21 in future updates.\n\tvec3 Favg = specularColor + ( 1.0 - specularColor ) * 0.047619; // 1/21\n\tvec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n\n\tsingleScatter += FssEss;\n\tmultiScatter += Fms * Ems;\n\n}\n\nfloat G_BlinnPhong_Implicit( /* const in float dotNL, const in float dotNV */ ) {\n\n\t// geometry term is (n dot l)(n dot v) / 4(n dot l)(n dot v)\n\treturn 0.25;\n\n}\n\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n\n}\n\nvec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\n\t//float dotNL = saturate( dot( geometry.normal, incidentLight.direction ) );\n\t//float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\n\tfloat G = G_BlinnPhong_Implicit( /* dotNL, dotNV */ );\n\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\n\treturn F * ( G * D );\n\n} // validated\n\n// source: http://simonstechblog.blogspot.ca/2011/12/microfacet-brdf.html\nfloat GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {\n\treturn ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );\n}\n\nfloat BlinnExponentToGGXRoughness( const in float blinnExponent ) {\n\treturn sqrt( 2.0 / ( blinnExponent + 2.0 ) );\n}\n';
		exports.default = t;
	}, {}],
	"muv2": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var t = "\n#ifdef USE_BUMPMAP\n\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\n\t// Bump Mapping Unparametrized Surfaces on the GPU by Morten S. Mikkelsen\n\t// http://api.unrealengine.com/attachments/Engine/Rendering/LightingAndShadows/BumpMappingWithoutTangentSpace/mm_sfgrad_bump.pdf\n\n\t// Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)\n\n\tvec2 dHdxy_fwd() {\n\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\n\t\treturn vec2( dBx, dBy );\n\n\t}\n\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\n\t\t// Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988\n\n\t\tvec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );\n\t\tvec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );\n\t\tvec3 vN = surf_norm;\t\t// normalized\n\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\n\t\tfloat fDet = dot( vSigmaX, R1 );\n\n\t\tfDet *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\n\t}\n\n#endif\n";
		exports.default = t;
	}, {}],
	"83Dv": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var n = "\n#if NUM_CLIPPING_PLANES > 0\n\n\tvec4 plane;\n\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\n\t\tplane = clippingPlanes[ i ];\n\t\tif ( dot( vViewPosition, plane.xyz ) > plane.w ) discard;\n\n\t}\n\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\n\t\tbool clipped = true;\n\n\t\t#pragma unroll_loop\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vViewPosition, plane.xyz ) > plane.w ) && clipped;\n\n\t\t}\n\n\t\tif ( clipped ) discard;\n\n\t#endif\n\n#endif\n";
		exports.default = n;
	}, {}],
	"Krgv": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#if NUM_CLIPPING_PLANES > 0\n\n\t#if ! defined( PHYSICAL ) && ! defined( PHONG ) && ! defined( MATCAP )\n\t\tvarying vec3 vViewPosition;\n\t#endif\n\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n\n#endif\n";
		exports.default = e;
	}, {}],
	"bu9w": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG ) && ! defined( MATCAP )\n\tvarying vec3 vViewPosition;\n#endif\n";
		exports.default = e;
	}, {}],
	"1zjk": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG ) && ! defined( MATCAP )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n";
		exports.default = e;
	}, {}],
	"Ccdo": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#ifdef USE_COLOR\n\n\tdiffuseColor.rgb *= vColor;\n\n#endif\n";
		exports.default = e;
	}, {}],
	"5tg7": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#ifdef USE_COLOR\n\n\tvarying vec3 vColor;\n\n#endif\n";
		exports.default = e;
	}, {}],
	"PLg+": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#ifdef USE_COLOR\n\n\tvColor.xyz = color.xyz;\n\n#endif\n";
		exports.default = e;
	}, {}],
	"2spA": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var n = "\n#define PI 3.14159265359\n#define PI2 6.28318530718\n#define PI_HALF 1.5707963267949\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#define whiteCompliment(a) ( 1.0 - saturate( a ) )\n\nfloat pow2( const in float x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\n// expects values in the range of [0,1]x[0,1], returns values in the [0,1] range.\n// do not collapse into a single function per: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract(sin(sn) * c);\n}\n\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\n\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\n\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n};\n\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n\n}\n\n// http://en.wikibooks.org/wiki/GLSL_Programming/Applying_Matrix_Transformations\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n\n}\n\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\n\tfloat distance = dot( planeNormal, point - pointOnPlane );\n\n\treturn - distance * planeNormal + point;\n\n}\n\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\n\treturn sign( dot( point - pointOnPlane, planeNormal ) );\n\n}\n\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\n\treturn lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;\n\n}\n\nmat3 transposeMat3( const in mat3 m ) {\n\n\tmat3 tmp;\n\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\n\treturn tmp;\n\n}\n\n// https://en.wikipedia.org/wiki/Relative_luminance\nfloat linearToRelativeLuminance( const in vec3 color ) {\n\n\tvec3 weights = vec3( 0.2126, 0.7152, 0.0722 );\n\n\treturn dot( weights, color.rgb );\n\n}\n";
		exports.default = n;
	}, {}],
	"nnMz": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#ifdef ENVMAP_TYPE_CUBE_UV\n\n#define cubeUV_textureSize (1024.0)\n\nint getFaceFromDirection(vec3 direction) {\n\tvec3 absDirection = abs(direction);\n\tint face = -1;\n\tif( absDirection.x > absDirection.z ) {\n\t\tif(absDirection.x > absDirection.y )\n\t\t\tface = direction.x > 0.0 ? 0 : 3;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\telse {\n\t\tif(absDirection.z > absDirection.y )\n\t\t\tface = direction.z > 0.0 ? 2 : 5;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\treturn face;\n}\n#define cubeUV_maxLods1  (log2(cubeUV_textureSize*0.25) - 1.0)\n#define cubeUV_rangeClamp (exp2((6.0 - 1.0) * 2.0))\n\nvec2 MipLevelInfo( vec3 vec, float roughnessLevel, float roughness ) {\n\tfloat scale = exp2(cubeUV_maxLods1 - roughnessLevel);\n\tfloat dxRoughness = dFdx(roughness);\n\tfloat dyRoughness = dFdy(roughness);\n\tvec3 dx = dFdx( vec * scale * dxRoughness );\n\tvec3 dy = dFdy( vec * scale * dyRoughness );\n\tfloat d = max( dot( dx, dx ), dot( dy, dy ) );\n\t// Clamp the value to the max mip level counts. hard coded to 6 mips\n\td = clamp(d, 1.0, cubeUV_rangeClamp);\n\tfloat mipLevel = 0.5 * log2(d);\n\treturn vec2(floor(mipLevel), fract(mipLevel));\n}\n\n#define cubeUV_maxLods2 (log2(cubeUV_textureSize*0.25) - 2.0)\n#define cubeUV_rcpTextureSize (1.0 / cubeUV_textureSize)\n\nvec2 getCubeUV(vec3 direction, float roughnessLevel, float mipLevel) {\n\tmipLevel = roughnessLevel > cubeUV_maxLods2 - 3.0 ? 0.0 : mipLevel;\n\tfloat a = 16.0 * cubeUV_rcpTextureSize;\n\n\tvec2 exp2_packed = exp2( vec2( roughnessLevel, mipLevel ) );\n\tvec2 rcp_exp2_packed = vec2( 1.0 ) / exp2_packed;\n\t// float powScale = exp2(roughnessLevel + mipLevel);\n\tfloat powScale = exp2_packed.x * exp2_packed.y;\n\t// float scale =  1.0 / exp2(roughnessLevel + 2.0 + mipLevel);\n\tfloat scale = rcp_exp2_packed.x * rcp_exp2_packed.y * 0.25;\n\t// float mipOffset = 0.75*(1.0 - 1.0/exp2(mipLevel))/exp2(roughnessLevel);\n\tfloat mipOffset = 0.75*(1.0 - rcp_exp2_packed.y) * rcp_exp2_packed.x;\n\n\tbool bRes = mipLevel == 0.0;\n\tscale =  bRes && (scale < a) ? a : scale;\n\n\tvec3 r;\n\tvec2 offset;\n\tint face = getFaceFromDirection(direction);\n\n\tfloat rcpPowScale = 1.0 / powScale;\n\n\tif( face == 0) {\n\t\tr = vec3(direction.x, -direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 1) {\n\t\tr = vec3(direction.y, direction.x, direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 2) {\n\t\tr = vec3(direction.z, direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 3) {\n\t\tr = vec3(direction.x, direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\telse if( face == 4) {\n\t\tr = vec3(direction.y, direction.x, -direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\telse {\n\t\tr = vec3(direction.z, -direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\tr = normalize(r);\n\tfloat texelOffset = 0.5 * cubeUV_rcpTextureSize;\n\tvec2 s = ( r.yz / abs( r.x ) + vec2( 1.0 ) ) * 0.5;\n\tvec2 base = offset + vec2( texelOffset );\n\treturn base + s * ( scale - 2.0 * texelOffset );\n}\n\n#define cubeUV_maxLods3 (log2(cubeUV_textureSize*0.25) - 3.0)\n\nvec4 textureCubeUV( sampler2D envMap, vec3 reflectedDirection, float roughness ) {\n\tfloat roughnessVal = roughness* cubeUV_maxLods3;\n\tfloat r1 = floor(roughnessVal);\n\tfloat r2 = r1 + 1.0;\n\tfloat t = fract(roughnessVal);\n\tvec2 mipInfo = MipLevelInfo(reflectedDirection, r1, roughness);\n\tfloat s = mipInfo.y;\n\tfloat level0 = mipInfo.x;\n\tfloat level1 = level0 + 1.0;\n\tlevel1 = level1 > 5.0 ? 5.0 : level1;\n\n\t// round to nearest mipmap if we are not interpolating.\n\tlevel0 += min( floor( s + 0.5 ), 5.0 );\n\n\t// Tri linear interpolation.\n\tvec2 uv_10 = getCubeUV(reflectedDirection, r1, level0);\n\tvec4 color10 = envMapTexelToLinear(texture2D(envMap, uv_10));\n\n\tvec2 uv_20 = getCubeUV(reflectedDirection, r2, level0);\n\tvec4 color20 = envMapTexelToLinear(texture2D(envMap, uv_20));\n\n\tvec4 result = mix(color10, color20, t);\n\n\treturn vec4(result.rgb, 1.0);\n}\n\n#endif\n";
		exports.default = e;
	}, {}],
	"Ea/M": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\nvec3 transformedNormal = normalMatrix * objectNormal;\n\n#ifdef FLIP_SIDED\n\n\ttransformedNormal = - transformedNormal;\n\n#endif\n";
		exports.default = e;
	}, {}],
	"KoLT": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#ifdef USE_DISPLACEMENTMAP\n\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n\n#endif\n";
		exports.default = e;
	}, {}],
	"VMr0": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#ifdef USE_DISPLACEMENTMAP\n\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, uv ).x * displacementScale + displacementBias );\n\n#endif\n";
		exports.default = e;
	}, {}],
	"emlO": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#ifdef USE_EMISSIVEMAP\n\n\tvec4 emissiveColor = texture2D( emissiveMap, vUv );\n\n\temissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;\n\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n\n#endif\n";
		exports.default = e;
	}, {}],
	"wPJe": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#ifdef USE_EMISSIVEMAP\n\n\tuniform sampler2D emissiveMap;\n\n#endif\n";
		exports.default = e;
	}, {}],
	"JgPF": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n  gl_FragColor = linearToOutputTexel( gl_FragColor );\n";
		exports.default = e;
	}, {}],
	"107/": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n// For a discussion of what this is, please read this: http://lousodrome.net/blog/light/2013/05/26/gamma-correct-and-hdr-rendering-in-a-32-bits-buffer/\n\nvec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\n\nvec4 GammaToLinear( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( gammaFactor ) ), value.a );\n}\n\nvec4 LinearToGamma( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( 1.0 / gammaFactor ) ), value.a );\n}\n\nvec4 sRGBToLinear( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\n\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}\n\nvec4 RGBEToLinear( in vec4 value ) {\n\treturn vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );\n}\n\nvec4 LinearToRGBE( in vec4 value ) {\n\tfloat maxComponent = max( max( value.r, value.g ), value.b );\n\tfloat fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );\n\treturn vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );\n//  return vec4( value.brg, ( 3.0 + 128.0 ) / 256.0 );\n}\n\n// reference: http://iwasbeingirony.blogspot.ca/2010/06/difference-between-rgbm-and-rgbd.html\nvec4 RGBMToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * value.a * maxRange, 1.0 );\n}\n\nvec4 LinearToRGBM( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat M = clamp( maxRGB / maxRange, 0.0, 1.0 );\n\tM = ceil( M * 255.0 ) / 255.0;\n\treturn vec4( value.rgb / ( M * maxRange ), M );\n}\n\n// reference: http://iwasbeingirony.blogspot.ca/2010/06/difference-between-rgbm-and-rgbd.html\nvec4 RGBDToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );\n}\n\nvec4 LinearToRGBD( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat D = max( maxRange / maxRGB, 1.0 );\n\tD = min( floor( D ) / 255.0, 1.0 );\n\treturn vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );\n}\n\n// LogLuv reference: http://graphicrants.blogspot.ca/2009/04/rgbm-color-encoding.html\n\n// M matrix, for encoding\nconst mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );\nvec4 LinearToLogLuv( in vec4 value )  {\n\tvec3 Xp_Y_XYZp = cLogLuvM * value.rgb;\n\tXp_Y_XYZp = max( Xp_Y_XYZp, vec3( 1e-6, 1e-6, 1e-6 ) );\n\tvec4 vResult;\n\tvResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;\n\tfloat Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;\n\tvResult.w = fract( Le );\n\tvResult.z = ( Le - ( floor( vResult.w * 255.0 ) ) / 255.0 ) / 255.0;\n\treturn vResult;\n}\n\n// Inverse M matrix, for decoding\nconst mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );\nvec4 LogLuvToLinear( in vec4 value ) {\n\tfloat Le = value.z * 255.0 + value.w;\n\tvec3 Xp_Y_XYZp;\n\tXp_Y_XYZp.y = exp2( ( Le - 127.0 ) / 2.0 );\n\tXp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;\n\tXp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;\n\tvec3 vRGB = cLogLuvInverseM * Xp_Y_XYZp.rgb;\n\treturn vec4( max( vRGB, 0.0 ), 1.0 );\n}\n";
		exports.default = e;
	}, {}],
	"glyF": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#ifdef USE_ENVMAP\n\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\n\t\tvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n\n\t\t// Transforming Normal Vectors with the Inverse Transformation\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\n\t\t\tvec3 reflectVec = reflect( cameraToVertex, worldNormal );\n\n\t\t#else\n\n\t\t\tvec3 reflectVec = refract( cameraToVertex, worldNormal, refractionRatio );\n\n\t\t#endif\n\n\t#else\n\n\t\tvec3 reflectVec = vReflect;\n\n\t#endif\n\n\t#ifdef ENVMAP_TYPE_CUBE\n\n\t\tvec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\n\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\n\t\tvec2 sampleUV;\n\n\t\treflectVec = normalize( reflectVec );\n\n\t\tsampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\n\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\n\t\tvec4 envColor = texture2D( envMap, sampleUV );\n\n\t#elif defined( ENVMAP_TYPE_SPHERE )\n\n\t\treflectVec = normalize( reflectVec );\n\n\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0, 0.0, 1.0 ) );\n\n\t\tvec4 envColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5 );\n\n\t#else\n\n\t\tvec4 envColor = vec4( 0.0 );\n\n\t#endif\n\n\tenvColor = envMapTexelToLinear( envColor );\n\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\n\t#endif\n\n#endif\n";
		exports.default = e;
	}, {}],
	"uwsT": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var n = "\n#if defined( USE_ENVMAP ) || defined( PHYSICAL )\n\tuniform float reflectivity;\n\tuniform float envMapIntensity;\n#endif\n\n#ifdef USE_ENVMAP\n\n\t#if ! defined( PHYSICAL ) && ( defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) )\n\t\tvarying vec3 vWorldPosition;\n\t#endif\n\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\tuniform float flipEnvMap;\n\tuniform int maxMipLevel;\n\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( PHYSICAL )\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n\n#endif\n";
		exports.default = n;
	}, {}],
	"ziqe": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#ifdef USE_ENVMAP\n\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvarying vec3 vWorldPosition;\n\n\t#else\n\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\n\t#endif\n\n#endif\n";
		exports.default = e;
	}, {}],
	"V5Xu": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#ifdef USE_ENVMAP\n\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\n\t\tvWorldPosition = worldPosition.xyz;\n\n\t#else\n\n\t\tvec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\n\t\t#else\n\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\n\t\t#endif\n\n\t#endif\n\n#endif\n";
		exports.default = e;
	}, {}],
	"5IW2": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#ifdef USE_FOG\n\n\tfogDepth = -mvPosition.z;\n\n#endif\n";
		exports.default = e;
	}, {}],
	"zz+4": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#ifdef USE_FOG\n\n\tvarying float fogDepth;\n\n#endif\n";
		exports.default = e;
	}, {}],
	"0c7f": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var o = "\n#ifdef USE_FOG\n\n\t#ifdef FOG_EXP2\n\n\t\tfloat fogFactor = whiteCompliment( exp2( - fogDensity * fogDensity * fogDepth * fogDepth * LOG2 ) );\n\n\t#else\n\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, fogDepth );\n\n\t#endif\n\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n\n#endif\n";
		exports.default = o;
	}, {}],
	"41h5": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var n = "\n#ifdef USE_FOG\n\n\tuniform vec3 fogColor;\n\tvarying float fogDepth;\n\n\t#ifdef FOG_EXP2\n\n\t\tuniform float fogDensity;\n\n\t#else\n\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\n\t#endif\n\n#endif\n";
		exports.default = n;
	}, {}],
	"3H/6": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var t = "\n#ifdef TOON\n\n\tuniform sampler2D gradientMap;\n\n\tvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\n\t\t// dotNL will be from -1.0 to 1.0\n\t\tfloat dotNL = dot( normal, lightDirection );\n\t\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\n\t\t#ifdef USE_GRADIENTMAP\n\n\t\t\treturn texture2D( gradientMap, coord ).rgb;\n\n\t\t#else\n\n\t\t\treturn ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );\n\n\t\t#endif\n\n\n\t}\n\n#endif\n";
		exports.default = t;
	}, {}],
	"n0t+": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#ifdef USE_LIGHTMAP\n\n\treflectedLight.indirectDiffuse += PI * texture2D( lightMap, vUv2 ).xyz * lightMapIntensity; // factor of PI should not be present; included here to prevent breakage\n\n#endif\n";
		exports.default = e;
	}, {}],
	"MjPv": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#ifdef USE_LIGHTMAP\n\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n\n#endif\n";
		exports.default = e;
	}, {}],
	"EbdY": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var t = "\nvec3 diffuse = vec3( 1.0 );\n\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = normalize( -mvPosition.xyz );\n\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\n\nvLightFront = vec3( 0.0 );\nvIndirectFront = vec3( 0.0 );\n\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n\tvIndirectBack = vec3( 0.0 );\n#endif\n\nIncidentLight directLight;\nfloat dotNL;\nvec3 directLightColor_Diffuse;\n\n#if NUM_POINT_LIGHTS > 0\n\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\n\t\tgetPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );\n\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\n\t\t#ifdef DOUBLE_SIDED\n\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\n\t\t#endif\n\n\t}\n\n#endif\n\n#if NUM_SPOT_LIGHTS > 0\n\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\n\t\tgetSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );\n\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\n\t\t#ifdef DOUBLE_SIDED\n\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\n\t\t#endif\n\t}\n\n#endif\n\n/*\n#if NUM_RECT_AREA_LIGHTS > 0\n\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\n\t\t// TODO (abelnation): implement\n\n\t}\n\n#endif\n*/\n\n#if NUM_DIR_LIGHTS > 0\n\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\n\t\tgetDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );\n\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\n\t\t#ifdef DOUBLE_SIDED\n\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\n\t\t#endif\n\n\t}\n\n#endif\n\n#if NUM_HEMI_LIGHTS > 0\n\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\n\t\tvIndirectFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\n\t\t#ifdef DOUBLE_SIDED\n\n\t\t\tvIndirectBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );\n\n\t\t#endif\n\n\t}\n\n#endif\n";
		exports.default = t;
	}, {}],
	"fj1N": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var t = "\nuniform vec3 ambientLightColor;\n\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\n\tvec3 irradiance = ambientLightColor;\n\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\n\t\tirradiance *= PI;\n\n\t#endif\n\n\treturn irradiance;\n\n}\n\n#if NUM_DIR_LIGHTS > 0\n\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\n\tvoid getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\tdirectLight.visible = true;\n\n\t}\n\n#endif\n\n\n#if NUM_POINT_LIGHTS > 0\n\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t\tfloat shadowCameraNear;\n\t\tfloat shadowCameraFar;\n\t};\n\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\n\t// directLight is an out parameter as having it as a return value caused compiler errors on some devices\n\tvoid getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\n\t\tfloat lightDistance = length( lVector );\n\n\t\tdirectLight.color = pointLight.color;\n\t\tdirectLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n\t\tdirectLight.visible = ( directLight.color != vec3( 0.0 ) );\n\n\t}\n\n#endif\n\n\n#if NUM_SPOT_LIGHTS > 0\n\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\n\t// directLight is an out parameter as having it as a return value caused compiler errors on some devices\n\tvoid getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight  ) {\n\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\n\t\tfloat lightDistance = length( lVector );\n\t\tfloat angleCos = dot( directLight.direction, spotLight.direction );\n\n\t\tif ( angleCos > spotLight.coneCos ) {\n\n\t\t\tfloat spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tdirectLight.visible = true;\n\n\t\t} else {\n\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\n\t\t}\n\t}\n\n#endif\n\n\n#if NUM_RECT_AREA_LIGHTS > 0\n\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\n\t// Pre-computed values of LinearTransformedCosine approximation of BRDF\n\t// BRDF approximation Texture is 64x64\n\tuniform sampler2D ltc_1; // RGBA Float\n\tuniform sampler2D ltc_2; // RGBA Float\n\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n\n#endif\n\n\n#if NUM_HEMI_LIGHTS > 0\n\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {\n\n\t\tfloat dotNL = dot( geometry.normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\n\t\t\tirradiance *= PI;\n\n\t\t#endif\n\n\t\treturn irradiance;\n\n\t}\n\n#endif\n";
		exports.default = t;
	}, {}],
	"xbdD": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\n\tvec3 getLightProbeIndirectIrradiance( /*const in SpecularLightProbe specularLightProbe,*/ const in GeometricContext geometry, const in int maxMIPLevel ) {\n\n\t\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\n\t\t\t// TODO: replace with properly filtered cubemaps and access the irradiance LOD level, be it the last LOD level\n\t\t\t// of a specular cubemap, or just the default level of a specially created irradiance cubemap.\n\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );\n\n\t\t\t#else\n\n\t\t\t\t// force the bias high to get the last LOD level as it is the most blurred.\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );\n\n\t\t\t#endif\n\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, queryVec, 1.0 );\n\n\t\t#else\n\n\t\t\tvec4 envMapColor = vec4( 0.0 );\n\n\t\t#endif\n\n\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\n\t}\n\n\t// taken from here: http://casual-effects.blogspot.ca/2011/08/plausible-environment-lighting-in-two.html\n\tfloat getSpecularMIPLevel( const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\n\t\t//float envMapWidth = pow( 2.0, maxMIPLevelScalar );\n\t\t//float desiredMIPLevel = log2( envMapWidth * sqrt( 3.0 ) ) - 0.5 * log2( pow2( blinnShininessExponent ) + 1.0 );\n\n\t\tfloat maxMIPLevelScalar = float( maxMIPLevel );\n\t\tfloat desiredMIPLevel = maxMIPLevelScalar + 0.79248 - 0.5 * log2( pow2( blinnShininessExponent ) + 1.0 );\n\n\t\t// clamp to allowable LOD ranges.\n\t\treturn clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );\n\n\t}\n\n\tvec3 getLightProbeIndirectRadiance( /*const in SpecularLightProbe specularLightProbe,*/ const in GeometricContext geometry, const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\n\t\t\tvec3 reflectVec = reflect( -geometry.viewDir, geometry.normal );\n\n\t\t#else\n\n\t\t\tvec3 reflectVec = refract( -geometry.viewDir, geometry.normal, refractionRatio );\n\n\t\t#endif\n\n\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\n\t\tfloat specularMIPLevel = getSpecularMIPLevel( blinnShininessExponent, maxMIPLevel );\n\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );\n\n\t\t\t#else\n\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );\n\n\t\t\t#endif\n\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, queryReflectVec, BlinnExponentToGGXRoughness(blinnShininessExponent ));\n\n\t\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\n\t\t\tvec2 sampleUV;\n\t\t\tsampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\t\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, sampleUV, specularMIPLevel );\n\n\t\t\t#else\n\n\t\t\t\tvec4 envMapColor = texture2D( envMap, sampleUV, specularMIPLevel );\n\n\t\t\t#endif\n\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\n\t\t#elif defined( ENVMAP_TYPE_SPHERE )\n\n\t\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0,0.0,1.0 ) );\n\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\n\t\t\t#else\n\n\t\t\t\tvec4 envMapColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\n\t\t\t#endif\n\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\n\t\t#endif\n\n\t\treturn envMapColor.rgb * envMapIntensity;\n\n\t}\n\n#endif\n";
		exports.default = e;
	}, {}],
	"BgaW": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\nBlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;\n";
		exports.default = e;
	}, {}],
	"ii0z": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n#endif\n\n\nstruct BlinnPhongMaterial {\n\n\tvec3\tdiffuseColor;\n\tvec3\tspecularColor;\n\tfloat\tspecularShininess;\n\tfloat\tspecularStrength;\n\n};\n\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\n\t#ifdef TOON\n\n\t\tvec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n\n\t#else\n\n\t\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\t\tvec3 irradiance = dotNL * directLight.color;\n\n\t#endif\n\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\n\t\tirradiance *= PI; // punctual light\n\n\t#endif\n\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n\n}\n\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\n}\n\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n\n#define Material_LightProbeLOD( material )\t(0)\n";
		exports.default = e;
	}, {}],
	"jfq1": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\nPhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nmaterial.specularRoughness = clamp( roughnessFactor, 0.04, 1.0 );\n#ifdef STANDARD\n\tmaterial.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );\n\tmaterial.clearCoat = saturate( clearCoat ); // Burley clearcoat model\n\tmaterial.clearCoatRoughness = clamp( clearCoatRoughness, 0.04, 1.0 );\n#endif\n";
		exports.default = e;
	}, {}],
	"wdgC": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var t = "\nstruct PhysicalMaterial {\n\n\tvec3\tdiffuseColor;\n\tfloat\tspecularRoughness;\n\tvec3\tspecularColor;\n\n\t#ifndef STANDARD\n\t\tfloat clearCoat;\n\t\tfloat clearCoatRoughness;\n\t#endif\n\n};\n\n#define MAXIMUM_SPECULAR_COEFFICIENT 0.16\n#define DEFAULT_SPECULAR_COEFFICIENT 0.04\n\n// Clear coat directional hemishperical reflectance (this approximation should be improved)\nfloat clearCoatDHRApprox( const in float roughness, const in float dotNL ) {\n\n\treturn DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );\n\n}\n\n#if NUM_RECT_AREA_LIGHTS > 0\n\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\n\t\tvec3 normal = geometry.normal;\n\t\tvec3 viewDir = geometry.viewDir;\n\t\tvec3 position = geometry.position;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.specularRoughness;\n\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos + halfWidth - halfHeight; // counterclockwise; light shines in local neg z direction\n\t\trectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(    0, 1,    0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\n\t\t// LTC Fresnel Approximation by Stephen Hill\n\t\t// http://blog.selfshadow.com/publications/s2016-advances/s2016_ltc_fresnel.pdf\n\t\tvec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\n\t}\n\n#endif\n\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\n\tvec3 irradiance = dotNL * directLight.color;\n\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\n\t\tirradiance *= PI; // punctual light\n\n\t#endif\n\n\t#ifndef STANDARD\n\t\tfloat clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n\t#else\n\t\tfloat clearCoatDHR = 0.0;\n\t#endif\n\n\treflectedLight.directSpecular += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry, material.specularColor, material.specularRoughness );\n\n\treflectedLight.directDiffuse += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\n\t#ifndef STANDARD\n\n\t\treflectedLight.directSpecular += irradiance * material.clearCoat * BRDF_Specular_GGX( directLight, geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\n\t#endif\n\n}\n\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\n\t// Defer to the IndirectSpecular function to compute\n\t// the indirectDiffuse if energy preservation is enabled.\n\t#ifndef ENVMAP_TYPE_CUBE_UV\n\n\t\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\n\t#endif\n\n}\n\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearCoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n\n\t#ifndef STANDARD\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\tfloat dotNL = dotNV;\n\t\tfloat clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n\t#else\n\t\tfloat clearCoatDHR = 0.0;\n\t#endif\n\n\tfloat clearCoatInv = 1.0 - clearCoatDHR;\n\n\t// Both indirect specular and diffuse light accumulate here\n\t// if energy preservation enabled, and PMREM provided.\n\t#if defined( ENVMAP_TYPE_CUBE_UV )\n\n\t\tvec3 singleScattering = vec3( 0.0 );\n\t\tvec3 multiScattering = vec3( 0.0 );\n\t\tvec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n\n\t\tBRDF_Specular_Multiscattering_Environment( geometry, material.specularColor, material.specularRoughness, singleScattering, multiScattering );\n\n\t\t// The multiscattering paper uses the below formula for calculating diffuse \n\t\t// for dielectrics, but this is already handled when initially computing the \n\t\t// specular and diffuse color, so we can just use the diffuseColor directly.\n\t\t//vec3 diffuse = material.diffuseColor * ( 1.0 - ( singleScattering + multiScattering ) );\n\t\tvec3 diffuse = material.diffuseColor;\n\n\t\treflectedLight.indirectSpecular += clearCoatInv * radiance * singleScattering;\n\t\treflectedLight.indirectDiffuse += multiScattering * cosineWeightedIrradiance;\n\t\treflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;\n\n\t#else\n\n\t\treflectedLight.indirectSpecular += clearCoatInv * radiance * BRDF_Specular_GGX_Environment( geometry, material.specularColor, material.specularRoughness );\n\n\t#endif\n\n\t#ifndef STANDARD\n\n\t\treflectedLight.indirectSpecular += clearCoatRadiance * material.clearCoat * BRDF_Specular_GGX_Environment( geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\n\t#endif\n}\n\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\n\n#define Material_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.specularRoughness )\n#define Material_ClearCoat_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.clearCoatRoughness )\n\n// ref: https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n\n}\n";
		exports.default = t;
	}, {}],
	"3W06": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var t = "\n/**\n * This is a template that can be used to light a material, it uses pluggable\n * RenderEquations (RE)for specific lighting scenarios.\n *\n * Instructions for use:\n * - Ensure that both RE_Direct, RE_IndirectDiffuse and RE_IndirectSpecular are defined\n * - If you have defined an RE_IndirectSpecular, you need to also provide a Material_LightProbeLOD. <---- ???\n * - Create a material parameter that is to be passed as the third parameter to your lighting functions.\n *\n * TODO:\n * - Add area light support.\n * - Add sphere light support.\n * - Add diffuse light probe (irradiance cubemap) support.\n */\n\nGeometricContext geometry;\n\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = normalize( vViewPosition );\n\nIncidentLight directLight;\n\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\n\tPointLight pointLight;\n\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\n\t\tpointLight = pointLights[ i ];\n\n\t\tgetPointDirectLightIrradiance( pointLight, geometry, directLight );\n\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( pointLight.shadow, directLight.visible ) ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t\t#endif\n\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\n\t}\n\n#endif\n\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\n\tSpotLight spotLight;\n\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\n\t\tspotLight = spotLights[ i ];\n\n\t\tgetSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( spotLight.shadow, directLight.visible ) ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\n\t}\n\n#endif\n\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\n\tDirectionalLight directionalLight;\n\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\n\t\tdirectionalLight = directionalLights[ i ];\n\n\t\tgetDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( directionalLight.shadow, directLight.visible ) ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\n\t}\n\n#endif\n\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\n\tRectAreaLight rectAreaLight;\n\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\n\t}\n\n#endif\n\n#if defined( RE_IndirectDiffuse )\n\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\n\t\t#pragma unroll_loop\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\n\t\t}\n\n\t#endif\n\n#endif\n\n#if defined( RE_IndirectSpecular )\n\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearCoatRadiance = vec3( 0.0 );\n\n#endif\n";
		exports.default = t;
	}, {}],
	"y9ac": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#if defined( RE_IndirectDiffuse )\n\n\t#ifdef USE_LIGHTMAP\n\n\t\tvec3 lightMapIrradiance = texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\n\t\t\tlightMapIrradiance *= PI; // factor of PI should not be present; included here to prevent breakage\n\n\t\t#endif\n\n\t\tirradiance += lightMapIrradiance;\n\n\t#endif\n\n\t#if defined( USE_ENVMAP ) && defined( PHYSICAL ) && defined( ENVMAP_TYPE_CUBE_UV )\n\n\t\tirradiance += getLightProbeIndirectIrradiance( /*lightProbe,*/ geometry, maxMipLevel );\n\n\t#endif\n\n#endif\n\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\n\tradiance += getLightProbeIndirectRadiance( /*specularLightProbe,*/ geometry, Material_BlinnShininessExponent( material ), maxMipLevel );\n\n\t#ifndef STANDARD\n\t\tclearCoatRadiance += getLightProbeIndirectRadiance( /*specularLightProbe,*/ geometry, Material_ClearCoat_BlinnShininessExponent( material ), maxMipLevel );\n\t#endif\n\n#endif\n";
		exports.default = e;
	}, {}],
	"cWGb": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#if defined( RE_IndirectDiffuse )\n\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n\n#endif\n\n#if defined( RE_IndirectSpecular )\n\n\tRE_IndirectSpecular( radiance, irradiance, clearCoatRadiance, geometry, material, reflectedLight );\n\n#endif\n";
		exports.default = e;
	}, {}],
	"s43h": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\n\tgl_FragDepthEXT = log2( vFragDepth ) * logDepthBufFC * 0.5;\n\n#endif\n";
		exports.default = e;
	}, {}],
	"Fgh6": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\n\tuniform float logDepthBufFC;\n\tvarying float vFragDepth;\n\n#endif\n";
		exports.default = e;
	}, {}],
	"szSE": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#ifdef USE_LOGDEPTHBUF\n\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\n\t\tvarying float vFragDepth;\n\n\t#else\n\n\t\tuniform float logDepthBufFC;\n\n\t#endif\n\n#endif\n";
		exports.default = e;
	}, {}],
	"tfam": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var t = "\n#ifdef USE_LOGDEPTHBUF\n\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\n\t#else\n\n\t\tgl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n\n\t\tgl_Position.z *= gl_Position.w;\n\n\t#endif\n\n#endif\n";
		exports.default = t;
	}, {}],
	"0CAl": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#ifdef USE_MAP\n\n\tvec4 texelColor = texture2D( map, vUv );\n\n\ttexelColor = mapTexelToLinear( texelColor );\n\tdiffuseColor *= texelColor;\n\n#endif\n";
		exports.default = e;
	}, {}],
	"WNl/": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#ifdef USE_MAP\n\n\tuniform sampler2D map;\n\n#endif\n";
		exports.default = e;
	}, {}],
	"kiVj": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#ifdef USE_MAP\n\n\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n\tvec4 mapTexel = texture2D( map, uv );\n\tdiffuseColor *= mapTexelToLinear( mapTexel );\n\n#endif\n";
		exports.default = e;
	}, {}],
	"CNAk": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#ifdef USE_MAP\n\n\tuniform mat3 uvTransform;\n\tuniform sampler2D map;\n\n#endif\n";
		exports.default = e;
	}, {}],
	"b1TL": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\nfloat metalnessFactor = metalness;\n\n#ifdef USE_METALNESSMAP\n\n\tvec4 texelMetalness = texture2D( metalnessMap, vUv );\n\n\t// reads channel B, compatible with a combined OcclusionRoughnessMetallic (RGB) texture\n\tmetalnessFactor *= texelMetalness.b;\n\n#endif\n";
		exports.default = e;
	}, {}],
	"TN3G": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#ifdef USE_METALNESSMAP\n\n\tuniform sampler2D metalnessMap;\n\n#endif\n";
		exports.default = e;
	}, {}],
	"IYeK": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#ifdef USE_MORPHNORMALS\n\n\tobjectNormal += ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\n\tobjectNormal += ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\n\tobjectNormal += ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\n\tobjectNormal += ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\n\n#endif\n";
		exports.default = e;
	}, {}],
	"6RZ8": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#ifdef USE_MORPHTARGETS\n\n\t#ifndef USE_MORPHNORMALS\n\n\tuniform float morphTargetInfluences[ 8 ];\n\n\t#else\n\n\tuniform float morphTargetInfluences[ 4 ];\n\n\t#endif\n\n#endif\n";
		exports.default = e;
	}, {}],
	"P9HM": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#ifdef USE_MORPHTARGETS\n\n\ttransformed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\n\ttransformed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\n\ttransformed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\n\ttransformed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n\n\t#ifndef USE_MORPHNORMALS\n\n\ttransformed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\n\ttransformed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\n\ttransformed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\n\ttransformed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n\n\t#endif\n\n#endif\n";
		exports.default = e;
	}, {}],
	"N8Je": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var n = "\n#ifdef FLAT_SHADED\n\n\t// Workaround for Adreno/Nexus5 not able able to do dFdx( vViewPosition ) ...\n\n\tvec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n\tvec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n\n#else\n\n\tvec3 normal = normalize( vNormal );\n\n\t#ifdef DOUBLE_SIDED\n\n\t\tnormal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\n\t#endif\n\n#endif\n";
		exports.default = n;
	}, {}],
	"PXKH": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var n = "\n#ifdef USE_NORMALMAP\n\n\t#ifdef OBJECTSPACE_NORMALMAP\n\n\t\tnormal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals\n\n\t\t#ifdef FLIP_SIDED\n\n\t\t\tnormal = - normal;\n\n\t\t#endif\n\n\t\t#ifdef DOUBLE_SIDED\n\n\t\t\tnormal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\n\t\t#endif\n\n\t\tnormal = normalize( normalMatrix * normal );\n\n\t#else // tangent-space normal map\n\n\t\tnormal = perturbNormal2Arb( -vViewPosition, normal );\n\n\t#endif\n\n#elif defined( USE_BUMPMAP )\n\n\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n\n#endif\n";
		exports.default = n;
	}, {}],
	"ZclL": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var t = "\n#ifdef USE_NORMALMAP\n\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n\n\t#ifdef OBJECTSPACE_NORMALMAP\n\n\t\tuniform mat3 normalMatrix;\n\n\t#else\n\n\t\t// Per-Pixel Tangent Space Normal Mapping\n\t\t// http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html\n\n\t\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\n\n\t\t\t// Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988\n\n\t\t\tvec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n\t\t\tvec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n\t\t\tvec2 st0 = dFdx( vUv.st );\n\t\t\tvec2 st1 = dFdy( vUv.st );\n\n\t\t\tfloat scale = sign( st1.t * st0.s - st0.t * st1.s ); // we do not care about the magnitude\n\n\t\t\tvec3 S = normalize( ( q0 * st1.t - q1 * st0.t ) * scale );\n\t\t\tvec3 T = normalize( ( - q0 * st1.s + q1 * st0.s ) * scale );\n\t\t\tvec3 N = normalize( surf_norm );\n\t\t\tmat3 tsn = mat3( S, T, N );\n\n\t\t\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\n\t\t\tmapN.xy *= normalScale;\n\t\t\tmapN.xy *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\n\t\t\treturn normalize( tsn * mapN );\n\n\t\t}\n\n\t#endif\n\n#endif\n";
		exports.default = t;
	}, {}],
	"LBFV": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var n = "\nvec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\n\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\n\nconst float PackUpscale = 256. / 255.; // fraction -> 0..1 (including 1)\nconst float UnpackDownscale = 255. / 256.; // 0..1 -> fraction (excluding 1)\n\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256.,  256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\n\nconst float ShiftRight8 = 1. / 256.;\n\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8; // tidy overflow\n\treturn r * PackUpscale;\n}\n\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\n\n// NOTE: viewZ/eyeZ is < 0 when in front of the camera per OpenGL conventions\n\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n\treturn linearClipZ * ( near - far ) - near;\n}\n\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn (( near + viewZ ) * far ) / (( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * invClipZ - far );\n}\n";
		exports.default = n;
	}, {}],
	"iTI/": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#ifdef PREMULTIPLIED_ALPHA\n\n\t// Get get normal blending with premultipled, use with CustomBlending, OneFactor, OneMinusSrcAlphaFactor, AddEquation.\n\tgl_FragColor.rgb *= gl_FragColor.a;\n\n#endif\n";
		exports.default = e;
	}, {}],
	"GIRi": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\nvec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );\n\ngl_Position = projectionMatrix * mvPosition;\n";
		exports.default = e;
	}, {}],
	"0uqi": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#if defined( DITHERING )\n\n  gl_FragColor.rgb = dithering( gl_FragColor.rgb );\n\n#endif\n";
		exports.default = e;
	}, {}],
	"TOu0": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var t = "\n#if defined( DITHERING )\n\n\t// based on https://www.shadertoy.com/view/MslGR8\n\tvec3 dithering( vec3 color ) {\n\t\t//Calculate grid position\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\n\t\t//Shift the individual colors differently, thus making it even harder to see the dithering pattern\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\n\t\t//modify shift acording to grid position.\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\n\t\t//shift the color by dither_shift\n\t\treturn color + dither_shift_RGB;\n\t}\n\n#endif\n";
		exports.default = t;
	}, {}],
	"hP8T": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\nfloat roughnessFactor = roughness;\n\n#ifdef USE_ROUGHNESSMAP\n\n\tvec4 texelRoughness = texture2D( roughnessMap, vUv );\n\n\t// reads channel G, compatible with a combined OcclusionRoughnessMetallic (RGB) texture\n\troughnessFactor *= texelRoughness.g;\n\n#endif\n";
		exports.default = e;
	}, {}],
	"sKyf": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#ifdef USE_ROUGHNESSMAP\n\n\tuniform sampler2D roughnessMap;\n\n#endif\n";
		exports.default = e;
	}, {}],
	"Q0/5": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var t = "\n#ifdef USE_SHADOWMAP\n\n\t#if NUM_DIR_LIGHTS > 0\n\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHTS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\n\t#endif\n\n\t#if NUM_SPOT_LIGHTS > 0\n\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHTS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\n\t#endif\n\n\t#if NUM_POINT_LIGHTS > 0\n\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHTS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\n\t#endif\n\n\t/*\n\t#if NUM_RECT_AREA_LIGHTS > 0\n\n\t\t// TODO (abelnation): create uniforms for area light shadows\n\n\t#endif\n\t*/\n\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\n\t}\n\n\tfloat texture2DShadowLerp( sampler2D depths, vec2 size, vec2 uv, float compare ) {\n\n\t\tconst vec2 offset = vec2( 0.0, 1.0 );\n\n\t\tvec2 texelSize = vec2( 1.0 ) / size;\n\t\tvec2 centroidUV = floor( uv * size + 0.5 ) / size;\n\n\t\tfloat lb = texture2DCompare( depths, centroidUV + texelSize * offset.xx, compare );\n\t\tfloat lt = texture2DCompare( depths, centroidUV + texelSize * offset.xy, compare );\n\t\tfloat rb = texture2DCompare( depths, centroidUV + texelSize * offset.yx, compare );\n\t\tfloat rt = texture2DCompare( depths, centroidUV + texelSize * offset.yy, compare );\n\n\t\tvec2 f = fract( uv * size + 0.5 );\n\n\t\tfloat a = mix( lb, lt, f.y );\n\t\tfloat b = mix( rb, rt, f.y );\n\t\tfloat c = mix( a, b, f.x );\n\n\t\treturn c;\n\n\t}\n\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\n\t\tfloat shadow = 1.0;\n\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\n\t\t// if ( something && something ) breaks ATI OpenGL shader compiler\n\t\t// if ( all( something, something ) ) using this instead\n\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\n\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\n\t\tbool frustumTest = all( frustumTestVec );\n\n\t\tif ( frustumTest ) {\n\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\n\t\t\tshadow = (\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\n\t\t#else // no percentage-closer filtering:\n\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\n\t\t#endif\n\n\t\t}\n\n\t\treturn shadow;\n\n\t}\n\n\t// cubeToUV() maps a 3D direction vector suitable for cube texture mapping to a 2D\n\t// vector suitable for 2D texture mapping. This code uses the following layout for the\n\t// 2D texture:\n\t//\n\t// xzXZ\n\t//  y Y\n\t//\n\t// Y - Positive y direction\n\t// y - Negative y direction\n\t// X - Positive x direction\n\t// x - Negative x direction\n\t// Z - Positive z direction\n\t// z - Negative z direction\n\t//\n\t// Source and test bed:\n\t// https://gist.github.com/tschw/da10c43c467ce8afd0c4\n\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\n\t\t// Number of texels to avoid at the edge of each square\n\n\t\tvec3 absV = abs( v );\n\n\t\t// Intersect unit cube\n\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\n\t\t// Apply scale to avoid seams\n\n\t\t// two texels less per square (one texel will do for NEAREST)\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\n\t\t// Unwrap\n\n\t\t// space: -1 ... 1 range for each square\n\t\t//\n\t\t// #X##\t\tdim    := ( 4 , 2 )\n\t\t//  # #\t\tcenter := ( 1 , 1 )\n\n\t\tvec2 planar = v.xy;\n\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\n\t\tif ( absV.z >= almostOne ) {\n\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\n\t\t} else if ( absV.x >= almostOne ) {\n\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\n\t\t} else if ( absV.y >= almostOne ) {\n\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\n\t\t}\n\n\t\t// Transform to UV space\n\n\t\t// scale := 0.5 / dim\n\t\t// translate := ( center + 0.5 ) / dim\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\n\t}\n\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\n\t\t// for point lights, the uniform @vShadowCoord is re-purposed to hold\n\t\t// the vector from the light to the world-space position of the fragment.\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\n\t\t// dp = normalized distance from light to fragment position\n\t\tfloat dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear ); // need to clamp?\n\t\tdp += shadowBias;\n\n\t\t// bd3D = base direction 3D\n\t\tvec3 bd3D = normalize( lightToPosition );\n\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT )\n\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\n\t\t#else // no percentage-closer filtering\n\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\n\t\t#endif\n\n\t}\n\n#endif\n";
		exports.default = t;
	}, {}],
	"k83A": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var n = "\n#ifdef USE_SHADOWMAP\n\n\t#if NUM_DIR_LIGHTS > 0\n\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHTS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\n\t#endif\n\n\t#if NUM_SPOT_LIGHTS > 0\n\n\t\tuniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHTS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\n\t#endif\n\n\t#if NUM_POINT_LIGHTS > 0\n\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHTS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\n\t#endif\n\n\t/*\n\t#if NUM_RECT_AREA_LIGHTS > 0\n\n\t\t// TODO (abelnation): uniforms for area light shadows\n\n\t#endif\n\t*/\n\n#endif\n";
		exports.default = n;
	}, {}],
	"B5tx": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var n = "\n#ifdef USE_SHADOWMAP\n\n\t#if NUM_DIR_LIGHTS > 0\n\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\n\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * worldPosition;\n\n\t}\n\n\t#endif\n\n\t#if NUM_SPOT_LIGHTS > 0\n\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\n\t\tvSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * worldPosition;\n\n\t}\n\n\t#endif\n\n\t#if NUM_POINT_LIGHTS > 0\n\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\n\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * worldPosition;\n\n\t}\n\n\t#endif\n\n\t/*\n\t#if NUM_RECT_AREA_LIGHTS > 0\n\n\t\t// TODO (abelnation): update vAreaShadowCoord with area light info\n\n\t#endif\n\t*/\n\n#endif\n";
		exports.default = n;
	}, {}],
	"aeev": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var t = "\nfloat getShadowMask() {\n\n\tfloat shadow = 1.0;\n\n\t#ifdef USE_SHADOWMAP\n\n\t#if NUM_DIR_LIGHTS > 0\n\n\tDirectionalLight directionalLight;\n\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tshadow *= bool( directionalLight.shadow ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\n\t}\n\n\t#endif\n\n\t#if NUM_SPOT_LIGHTS > 0\n\n\tSpotLight spotLight;\n\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\n\t\tspotLight = spotLights[ i ];\n\t\tshadow *= bool( spotLight.shadow ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\n\t}\n\n\t#endif\n\n\t#if NUM_POINT_LIGHTS > 0\n\n\tPointLight pointLight;\n\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\n\t\tpointLight = pointLights[ i ];\n\t\tshadow *= bool( pointLight.shadow ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\n\t}\n\n\t#endif\n\n\t/*\n\t#if NUM_RECT_AREA_LIGHTS > 0\n\n\t\t// TODO (abelnation): update shadow for Area light\n\n\t#endif\n\t*/\n\n\t#endif\n\n\treturn shadow;\n\n}\n";
		exports.default = t;
	}, {}],
	"wuqw": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#ifdef USE_SKINNING\n\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n\n#endif\n";
		exports.default = e;
	}, {}],
	"4c6R": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var t = "\n#ifdef USE_SKINNING\n\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\n\t#ifdef BONE_TEXTURE\n\n\t\tuniform sampler2D boneTexture;\n\t\tuniform int boneTextureSize;\n\n\t\tmat4 getBoneMatrix( const in float i ) {\n\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureSize ) );\n\t\t\tfloat y = floor( j / float( boneTextureSize ) );\n\n\t\t\tfloat dx = 1.0 / float( boneTextureSize );\n\t\t\tfloat dy = 1.0 / float( boneTextureSize );\n\n\t\t\ty = dy * ( y + 0.5 );\n\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\n\t\t\treturn bone;\n\n\t\t}\n\n\t#else\n\n\t\tuniform mat4 boneMatrices[ MAX_BONES ];\n\n\t\tmat4 getBoneMatrix( const in float i ) {\n\n\t\t\tmat4 bone = boneMatrices[ int(i) ];\n\t\t\treturn bone;\n\n\t\t}\n\n\t#endif\n\n#endif\n";
		exports.default = t;
	}, {}],
	"2NsV": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#ifdef USE_SKINNING\n\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n\n#endif\n";
		exports.default = e;
	}, {}],
	"NKe9": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var t = "\n#ifdef USE_SKINNING\n\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n\n#endif\n";
		exports.default = t;
	}, {}],
	"crqp": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\nfloat specularStrength;\n\n#ifdef USE_SPECULARMAP\n\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n\n#else\n\n\tspecularStrength = 1.0;\n\n#endif\n";
		exports.default = e;
	}, {}],
	"PEgM": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#ifdef USE_SPECULARMAP\n\n\tuniform sampler2D specularMap;\n\n#endif\n";
		exports.default = e;
	}, {}],
	"frUn": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#if defined( TONE_MAPPING )\n\n  gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n\n#endif\n";
		exports.default = e;
	}, {}],
	"Cu6j": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var n = "\n#ifndef saturate\n\t#define saturate(a) clamp( a, 0.0, 1.0 )\n#endif\n\nuniform float toneMappingExposure;\nuniform float toneMappingWhitePoint;\n\n// exposure only\nvec3 LinearToneMapping( vec3 color ) {\n\n\treturn toneMappingExposure * color;\n\n}\n\n// source: https://www.cs.utah.edu/~reinhard/cdrom/\nvec3 ReinhardToneMapping( vec3 color ) {\n\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n\n}\n\n// source: http://filmicgames.com/archives/75\n#define Uncharted2Helper( x ) max( ( ( x * ( 0.15 * x + 0.10 * 0.50 ) + 0.20 * 0.02 ) / ( x * ( 0.15 * x + 0.50 ) + 0.20 * 0.30 ) ) - 0.02 / 0.30, vec3( 0.0 ) )\nvec3 Uncharted2ToneMapping( vec3 color ) {\n\n\t// John Hable's filmic operator from Uncharted 2 video game\n\tcolor *= toneMappingExposure;\n\treturn saturate( Uncharted2Helper( color ) / Uncharted2Helper( vec3( toneMappingWhitePoint ) ) );\n\n}\n\n// source: http://filmicgames.com/archives/75\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\n\t// optimized filmic operator by Jim Hejl and Richard Burgess-Dawson\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n\n}\n\n// source: https://knarkowicz.wordpress.com/2016/01/06/aces-filmic-tone-mapping-curve/\nvec3 ACESFilmicToneMapping( vec3 color ) {\n\n\tcolor *= toneMappingExposure;\n\treturn saturate( ( color * ( 2.51 * color + 0.03 ) ) / ( color * ( 2.43 * color + 0.59 ) + 0.14 ) );\n\n}\n";
		exports.default = n;
	}, {}],
	"f0HG": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\n\tvarying vec2 vUv;\n\n#endif\n";
		exports.default = e;
	}, {}],
	"9Uwb": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\n\tvarying vec2 vUv;\n\tuniform mat3 uvTransform;\n\n#endif\n";
		exports.default = e;
	}, {}],
	"FSWZ": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\n#endif\n";
		exports.default = e;
	}, {}],
	"k1uW": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\n\tvarying vec2 vUv2;\n\n#endif\n";
		exports.default = e;
	}, {}],
	"NX/S": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n\n#endif\n";
		exports.default = e;
	}, {}],
	"pR+l": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\n\tvUv2 = uv2;\n\n#endif\n";
		exports.default = e;
	}, {}],
	"NG+N": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )\n\n\tvec4 worldPosition = modelMatrix * vec4( transformed, 1.0 );\n\n#endif\n";
		exports.default = e;
	}, {}],
	"W/89": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\nuniform sampler2D t2D;\n\nvarying vec2 vUv;\n\nvoid main() {\n\n\tvec4 texColor = texture2D( t2D, vUv );\n\n\tgl_FragColor = mapTexelToLinear( texColor );\n\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\n}\n";
		exports.default = e;
	}, {}],
	"sEdp": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var n = "\nvarying vec2 vUv;\nuniform mat3 uvTransform;\n\nvoid main() {\n\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\n\tgl_Position = vec4( position.xy, 1.0, 1.0 );\n\n}\n";
		exports.default = n;
	}, {}],
	"seRw": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\nuniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\n\nvarying vec3 vWorldDirection;\n\nvoid main() {\n\n\tvec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );\n\n\tgl_FragColor = mapTexelToLinear( texColor );\n\tgl_FragColor.a *= opacity;\n\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\n}\n";
		exports.default = e;
	}, {}],
	"+KuW": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var n = "\nvarying vec3 vWorldDirection;\n\n#include <common>\n\nvoid main() {\n\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\n\tgl_Position.z = gl_Position.w; // set z to camera.far\n\n}\n";
		exports.default = n;
	}, {}],
	"L29b": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var n = "\n#if DEPTH_PACKING == 3200\n\n\tuniform float opacity;\n\n#endif\n\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( 1.0 );\n\n\t#if DEPTH_PACKING == 3200\n\n\t\tdiffuseColor.a = opacity;\n\n\t#endif\n\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\n\t#include <logdepthbuf_fragment>\n\n\t#if DEPTH_PACKING == 3200\n\n\t\tgl_FragColor = vec4( vec3( 1.0 - gl_FragCoord.z ), opacity );\n\n\t#elif DEPTH_PACKING == 3201\n\n\t\tgl_FragColor = packDepthToRGBA( gl_FragCoord.z );\n\n\t#endif\n\n}\n";
		exports.default = n;
	}, {}],
	"Uehs": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\n\t#include <skinbase_vertex>\n\n\t#ifdef USE_DISPLACEMENTMAP\n\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\n\t#endif\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n}\n";
		exports.default = e;
	}, {}],
	"7IQG": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var n = "\n#define DISTANCE\n\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main () {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( 1.0 );\n\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist ); // clamp to [ 0, 1 ]\n\n\tgl_FragColor = packDepthToRGBA( dist );\n\n}\n";
		exports.default = n;
	}, {}],
	"MdLs": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var n = "\n#define DISTANCE\n\nvarying vec3 vWorldPosition;\n\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\n\t#include <skinbase_vertex>\n\n\t#ifdef USE_DISPLACEMENTMAP\n\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\n\t#endif\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\n\tvWorldPosition = worldPosition.xyz;\n\n}\n";
		exports.default = n;
	}, {}],
	"4zqw": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var n = "\nuniform sampler2D tEquirect;\n\nvarying vec3 vWorldDirection;\n\n#include <common>\n\nvoid main() {\n\n\tvec3 direction = normalize( vWorldDirection );\n\n\tvec2 sampleUV;\n\n\tsampleUV.y = asin( clamp( direction.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\n\tsampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;\n\n\tvec4 texColor = texture2D( tEquirect, sampleUV );\n\n\tgl_FragColor = mapTexelToLinear( texColor );\n\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\n}\n";
		exports.default = n;
	}, {}],
	"18yK": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\nvarying vec3 vWorldDirection;\n\n#include <common>\n\nvoid main() {\n\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\n}\n";
		exports.default = e;
	}, {}],
	"7/+d": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var n = "\nuniform vec3 diffuse;\nuniform float opacity;\n\nuniform float dashSize;\nuniform float totalSize;\n\nvarying float vLineDistance;\n\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\n\t\tdiscard;\n\n\t}\n\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\n\t#include <logdepthbuf_fragment>\n\t#include <color_fragment>\n\n\toutgoingLight = diffuseColor.rgb; // simple shader\n\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\n}\n";
		exports.default = n;
	}, {}],
	"Ks/Y": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\nuniform float scale;\nattribute float lineDistance;\n\nvarying float vLineDistance;\n\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <color_vertex>\n\n\tvLineDistance = scale * lineDistance;\n\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\tgl_Position = projectionMatrix * mvPosition;\n\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\n}\n";
		exports.default = e;
	}, {}],
	"FpsI": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var n = "\nuniform vec3 diffuse;\nuniform float opacity;\n\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n#endif\n\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\n\t// accumulation (baked indirect lighting only)\n\t#ifdef USE_LIGHTMAP\n\n\t\treflectedLight.indirectDiffuse += texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\n\t#else\n\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\n\t#endif\n\n\t// modulation\n\t#include <aomap_fragment>\n\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\n\t#include <envmap_fragment>\n\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\n}\n";
		exports.default = n;
	}, {}],
	"wRoG": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <skinbase_vertex>\n\n\t#ifdef USE_ENVMAP\n\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\n\t#endif\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n\n}\n";
		exports.default = e;
	}, {}],
	"Ryzq": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var n = "\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n\nvarying vec3 vLightFront;\nvarying vec3 vIndirectFront;\n\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n\tvarying vec3 vIndirectBack;\n#endif\n\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <emissivemap_fragment>\n\n\t// accumulation\n\treflectedLight.indirectDiffuse = getAmbientLightIrradiance( ambientLightColor );\n\n\t#ifdef DOUBLE_SIDED\n\n\t\treflectedLight.indirectDiffuse += ( gl_FrontFacing ) ? vIndirectFront : vIndirectBack;\n\n\t#else\n\n\t\treflectedLight.indirectDiffuse += vIndirectFront;\n\n\t#endif\n\n\t#include <lightmap_fragment>\n\n\treflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n\n\t#ifdef DOUBLE_SIDED\n\n\t\treflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\n\t#else\n\n\t\treflectedLight.directDiffuse = vLightFront;\n\n\t#endif\n\n\treflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n\n\t// modulation\n\t#include <aomap_fragment>\n\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\n\t#include <envmap_fragment>\n\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}\n";
		exports.default = n;
	}, {}],
	"QB48": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#define LAMBERT\n\nvarying vec3 vLightFront;\nvarying vec3 vIndirectFront;\n\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n\tvarying vec3 vIndirectBack;\n#endif\n\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <lights_lambert_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n";
		exports.default = e;
	}, {}],
	"Lksu": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var n = "\n#define MATCAP\n\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\n\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n#endif\n\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n\n#include <fog_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\n\tvec3 viewDir = normalize( vViewPosition );\n\tvec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n\tvec3 y = cross( viewDir, x );\n\tvec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5; // 0.495 to remove artifacts caused by undersized matcap disks\n\n\t#ifdef USE_MATCAP\n\n\t\tvec4 matcapColor = texture2D( matcap, uv );\n\t\tmatcapColor = matcapTexelToLinear( matcapColor );\n\n\t#else\n\n\t\tvec4 matcapColor = vec4( 1.0 );\n\n\t#endif\n\n\tvec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\n}\n";
		exports.default = n;
	}, {}],
	"VDGU": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#define MATCAP\n\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n#endif\n\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\n\t#ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED\n\n\t\tvNormal = normalize( transformedNormal );\n\n\t#endif\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\n\tvViewPosition = - mvPosition.xyz;\n\n}\n";
		exports.default = e;
	}, {}],
	"yk5v": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var n = "\n#define PHONG\n\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\n\t// accumulation\n\t#include <lights_phong_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\n\t// modulation\n\t#include <aomap_fragment>\n\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\n\t#include <envmap_fragment>\n\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n\n}\n";
		exports.default = n;
	}, {}],
	"Ouav": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#define PHONG\n\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n#endif\n\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\n#ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED\n\n\tvNormal = normalize( transformedNormal );\n\n#endif\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n\tvViewPosition = - mvPosition.xyz;\n\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n\n}\n";
		exports.default = e;
	}, {}],
	"bLBf": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var n = "\n#define PHYSICAL\n\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n\n#ifndef STANDARD\n\tuniform float clearCoat;\n\tuniform float clearCoatRoughness;\n#endif\n\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n#endif\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <envmap_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <lights_physical_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\n\t// accumulation\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\n\t// modulation\n\t#include <aomap_fragment>\n\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n\n}\n";
		exports.default = n;
	}, {}],
	"pBqN": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#define PHYSICAL\n\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n#endif\n\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\n#ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED\n\n\tvNormal = normalize( transformedNormal );\n\n#endif\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n\tvViewPosition = - mvPosition.xyz;\n\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n\n}\n";
		exports.default = e;
	}, {}],
	"jBEy": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var n = "\n#define NORMAL\n\nuniform float opacity;\n\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || ( defined( USE_NORMALMAP ) && ! defined( OBJECTSPACE_NORMALMAP ) )\n\n\tvarying vec3 vViewPosition;\n\n#endif\n\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n#endif\n\n#include <packing>\n#include <uv_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n\nvoid main() {\n\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n\n}\n";
		exports.default = n;
	}, {}],
	"6bAy": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#define NORMAL\n\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || ( defined( USE_NORMALMAP ) && ! defined( OBJECTSPACE_NORMALMAP ) )\n\n\tvarying vec3 vViewPosition;\n\n#endif\n\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n#endif\n\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\n#ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED\n\n\tvNormal = normalize( transformedNormal );\n\n#endif\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || ( defined( USE_NORMALMAP ) && ! defined( OBJECTSPACE_NORMALMAP ) )\n\n\tvViewPosition = - mvPosition.xyz;\n\n#endif\n\n}\n";
		exports.default = e;
	}, {}],
	"9JyC": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var n = "\nuniform vec3 diffuse;\nuniform float opacity;\n\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\n\toutgoingLight = diffuseColor.rgb;\n\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\n}\n";
		exports.default = n;
	}, {}],
	"rgZF": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\nuniform float size;\nuniform float scale;\n\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\n\tgl_PointSize = size;\n\n\t#ifdef USE_SIZEATTENUATION\n\n\t\tbool isPerspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 );\n\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\n\t#endif\n\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <fog_vertex>\n\n}\n";
		exports.default = e;
	}, {}],
	"wNhP": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var n = "\nuniform vec3 color;\nuniform float opacity;\n\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n\nvoid main() {\n\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\n\t#include <fog_fragment>\n\n}\n";
		exports.default = n;
	}, {}],
	"U9Nr": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var e = "\n#include <fog_pars_vertex>\n#include <shadowmap_pars_vertex>\n\nvoid main() {\n\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n\n}\n";
		exports.default = e;
	}, {}],
	"2R0I": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var n = "\nuniform vec3 diffuse;\nuniform float opacity;\n\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphatest_fragment>\n\n\toutgoingLight = diffuseColor.rgb;\n\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\n}\n";
		exports.default = n;
	}, {}],
	"zwY1": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.default = void 0;
		var n = "\nuniform float rotation;\nuniform vec2 center;\n\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\n\tvec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\n\n\tvec2 scale;\n\tscale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );\n\tscale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );\n\n\t#ifndef USE_SIZEATTENUATION\n\n\t\tbool isPerspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 );\n\n\t\tif ( isPerspective ) scale *= - mvPosition.z;\n\n\t#endif\n\n\tvec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\n\tmvPosition.xy += rotatedPosition;\n\n\tgl_Position = projectionMatrix * mvPosition;\n\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\n}\n";
		exports.default = n;
	}, {}],
	"oHDJ": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.ShaderChunk = void 0;
		var e = dr(require("./ShaderChunk/alphamap_fragment.glsl.js")),
			r = dr(require("./ShaderChunk/alphamap_pars_fragment.glsl.js")),
			a = dr(require("./ShaderChunk/alphatest_fragment.glsl.js")),
			l = dr(require("./ShaderChunk/aomap_fragment.glsl.js")),
			s = dr(require("./ShaderChunk/aomap_pars_fragment.glsl.js")),
			t = dr(require("./ShaderChunk/begin_vertex.glsl.js")),
			u = dr(require("./ShaderChunk/beginnormal_vertex.glsl.js")),
			_ = dr(require("./ShaderChunk/bsdfs.glsl.js")),
			g = dr(require("./ShaderChunk/bumpmap_pars_fragment.glsl.js")),
			n = dr(require("./ShaderChunk/clipping_planes_fragment.glsl.js")),
			h = dr(require("./ShaderChunk/clipping_planes_pars_fragment.glsl.js")),
			d = dr(require("./ShaderChunk/clipping_planes_pars_vertex.glsl.js")),
			i = dr(require("./ShaderChunk/clipping_planes_vertex.glsl.js")),
			f = dr(require("./ShaderChunk/color_fragment.glsl.js")),
			p = dr(require("./ShaderChunk/color_pars_fragment.glsl.js")),
			m = dr(require("./ShaderChunk/color_pars_vertex.glsl.js")),
			v = dr(require("./ShaderChunk/color_vertex.glsl.js")),
			q = dr(require("./ShaderChunk/common.glsl.js")),
			j = dr(require("./ShaderChunk/cube_uv_reflection_fragment.glsl.js")),
			S = dr(require("./ShaderChunk/defaultnormal_vertex.glsl.js")),
			o = dr(require("./ShaderChunk/displacementmap_pars_vertex.glsl.js")),
			k = dr(require("./ShaderChunk/displacementmap_vertex.glsl.js")),
			C = dr(require("./ShaderChunk/emissivemap_fragment.glsl.js")),
			c = dr(require("./ShaderChunk/emissivemap_pars_fragment.glsl.js")),
			b = dr(require("./ShaderChunk/encodings_fragment.glsl.js")),
			x = dr(require("./ShaderChunk/encodings_pars_fragment.glsl.js")),
			L = dr(require("./ShaderChunk/envmap_fragment.glsl.js")),
			w = dr(require("./ShaderChunk/envmap_pars_fragment.glsl.js")),
			y = dr(require("./ShaderChunk/envmap_pars_vertex.glsl.js")),
			A = dr(require("./ShaderChunk/envmap_vertex.glsl.js")),
			B = dr(require("./ShaderChunk/fog_vertex.glsl.js")),
			G = dr(require("./ShaderChunk/fog_pars_vertex.glsl.js")),
			R = dr(require("./ShaderChunk/fog_fragment.glsl.js")),
			M = dr(require("./ShaderChunk/fog_pars_fragment.glsl.js")),
			O = dr(require("./ShaderChunk/gradientmap_pars_fragment.glsl.js")),
			P = dr(require("./ShaderChunk/lightmap_fragment.glsl.js")),
			z = dr(require("./ShaderChunk/lightmap_pars_fragment.glsl.js")),
			D = dr(require("./ShaderChunk/lights_lambert_vertex.glsl.js")),
			E = dr(require("./ShaderChunk/lights_pars_begin.glsl.js")),
			F = dr(require("./ShaderChunk/envmap_physical_pars_fragment.glsl.js")),
			H = dr(require("./ShaderChunk/lights_phong_fragment.glsl.js")),
			I = dr(require("./ShaderChunk/lights_phong_pars_fragment.glsl.js")),
			J = dr(require("./ShaderChunk/lights_physical_fragment.glsl.js")),
			K = dr(require("./ShaderChunk/lights_physical_pars_fragment.glsl.js")),
			N = dr(require("./ShaderChunk/lights_fragment_begin.glsl.js")),
			Q = dr(require("./ShaderChunk/lights_fragment_maps.glsl.js")),
			T = dr(require("./ShaderChunk/lights_fragment_end.glsl.js")),
			U = dr(require("./ShaderChunk/logdepthbuf_fragment.glsl.js")),
			V = dr(require("./ShaderChunk/logdepthbuf_pars_fragment.glsl.js")),
			W = dr(require("./ShaderChunk/logdepthbuf_pars_vertex.glsl.js")),
			X = dr(require("./ShaderChunk/logdepthbuf_vertex.glsl.js")),
			Y = dr(require("./ShaderChunk/map_fragment.glsl.js")),
			Z = dr(require("./ShaderChunk/map_pars_fragment.glsl.js")),
			$ = dr(require("./ShaderChunk/map_particle_fragment.glsl.js")),
			ee = dr(require("./ShaderChunk/map_particle_pars_fragment.glsl.js")),
			re = dr(require("./ShaderChunk/metalnessmap_fragment.glsl.js")),
			ae = dr(require("./ShaderChunk/metalnessmap_pars_fragment.glsl.js")),
			le = dr(require("./ShaderChunk/morphnormal_vertex.glsl.js")),
			se = dr(require("./ShaderChunk/morphtarget_pars_vertex.glsl.js")),
			te = dr(require("./ShaderChunk/morphtarget_vertex.glsl.js")),
			ue = dr(require("./ShaderChunk/normal_fragment_begin.glsl.js")),
			_e = dr(require("./ShaderChunk/normal_fragment_maps.glsl.js")),
			ge = dr(require("./ShaderChunk/normalmap_pars_fragment.glsl.js")),
			ne = dr(require("./ShaderChunk/packing.glsl.js")),
			he = dr(require("./ShaderChunk/premultiplied_alpha_fragment.glsl.js")),
			de = dr(require("./ShaderChunk/project_vertex.glsl.js")),
			ie = dr(require("./ShaderChunk/dithering_fragment.glsl.js")),
			fe = dr(require("./ShaderChunk/dithering_pars_fragment.glsl.js")),
			pe = dr(require("./ShaderChunk/roughnessmap_fragment.glsl.js")),
			me = dr(require("./ShaderChunk/roughnessmap_pars_fragment.glsl.js")),
			ve = dr(require("./ShaderChunk/shadowmap_pars_fragment.glsl.js")),
			qe = dr(require("./ShaderChunk/shadowmap_pars_vertex.glsl.js")),
			je = dr(require("./ShaderChunk/shadowmap_vertex.glsl.js")),
			Se = dr(require("./ShaderChunk/shadowmask_pars_fragment.glsl.js")),
			oe = dr(require("./ShaderChunk/skinbase_vertex.glsl.js")),
			ke = dr(require("./ShaderChunk/skinning_pars_vertex.glsl.js")),
			Ce = dr(require("./ShaderChunk/skinning_vertex.glsl.js")),
			ce = dr(require("./ShaderChunk/skinnormal_vertex.glsl.js")),
			be = dr(require("./ShaderChunk/specularmap_fragment.glsl.js")),
			xe = dr(require("./ShaderChunk/specularmap_pars_fragment.glsl.js")),
			Le = dr(require("./ShaderChunk/tonemapping_fragment.glsl.js")),
			we = dr(require("./ShaderChunk/tonemapping_pars_fragment.glsl.js")),
			ye = dr(require("./ShaderChunk/uv_pars_fragment.glsl.js")),
			Ae = dr(require("./ShaderChunk/uv_pars_vertex.glsl.js")),
			Be = dr(require("./ShaderChunk/uv_vertex.glsl.js")),
			Ge = dr(require("./ShaderChunk/uv2_pars_fragment.glsl.js")),
			Re = dr(require("./ShaderChunk/uv2_pars_vertex.glsl.js")),
			Me = dr(require("./ShaderChunk/uv2_vertex.glsl.js")),
			Oe = dr(require("./ShaderChunk/worldpos_vertex.glsl.js")),
			Pe = dr(require("./ShaderLib/background_frag.glsl.js")),
			ze = dr(require("./ShaderLib/background_vert.glsl.js")),
			De = dr(require("./ShaderLib/cube_frag.glsl.js")),
			Ee = dr(require("./ShaderLib/cube_vert.glsl.js")),
			Fe = dr(require("./ShaderLib/depth_frag.glsl.js")),
			He = dr(require("./ShaderLib/depth_vert.glsl.js")),
			Ie = dr(require("./ShaderLib/distanceRGBA_frag.glsl.js")),
			Je = dr(require("./ShaderLib/distanceRGBA_vert.glsl.js")),
			Ke = dr(require("./ShaderLib/equirect_frag.glsl.js")),
			Ne = dr(require("./ShaderLib/equirect_vert.glsl.js")),
			Qe = dr(require("./ShaderLib/linedashed_frag.glsl.js")),
			Te = dr(require("./ShaderLib/linedashed_vert.glsl.js")),
			Ue = dr(require("./ShaderLib/meshbasic_frag.glsl.js")),
			Ve = dr(require("./ShaderLib/meshbasic_vert.glsl.js")),
			We = dr(require("./ShaderLib/meshlambert_frag.glsl.js")),
			Xe = dr(require("./ShaderLib/meshlambert_vert.glsl.js")),
			Ye = dr(require("./ShaderLib/meshmatcap_frag.glsl.js")),
			Ze = dr(require("./ShaderLib/meshmatcap_vert.glsl.js")),
			$e = dr(require("./ShaderLib/meshphong_frag.glsl.js")),
			er = dr(require("./ShaderLib/meshphong_vert.glsl.js")),
			rr = dr(require("./ShaderLib/meshphysical_frag.glsl.js")),
			ar = dr(require("./ShaderLib/meshphysical_vert.glsl.js")),
			lr = dr(require("./ShaderLib/normal_frag.glsl.js")),
			sr = dr(require("./ShaderLib/normal_vert.glsl.js")),
			tr = dr(require("./ShaderLib/points_frag.glsl.js")),
			ur = dr(require("./ShaderLib/points_vert.glsl.js")),
			_r = dr(require("./ShaderLib/shadow_frag.glsl.js")),
			gr = dr(require("./ShaderLib/shadow_vert.glsl.js")),
			nr = dr(require("./ShaderLib/sprite_frag.glsl.js")),
			hr = dr(require("./ShaderLib/sprite_vert.glsl.js"));

		function dr(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var ir = {
			alphamap_fragment: e.default,
			alphamap_pars_fragment: r.default,
			alphatest_fragment: a.default,
			aomap_fragment: l.default,
			aomap_pars_fragment: s.default,
			begin_vertex: t.default,
			beginnormal_vertex: u.default,
			bsdfs: _.default,
			bumpmap_pars_fragment: g.default,
			clipping_planes_fragment: n.default,
			clipping_planes_pars_fragment: h.default,
			clipping_planes_pars_vertex: d.default,
			clipping_planes_vertex: i.default,
			color_fragment: f.default,
			color_pars_fragment: p.default,
			color_pars_vertex: m.default,
			color_vertex: v.default,
			common: q.default,
			cube_uv_reflection_fragment: j.default,
			defaultnormal_vertex: S.default,
			displacementmap_pars_vertex: o.default,
			displacementmap_vertex: k.default,
			emissivemap_fragment: C.default,
			emissivemap_pars_fragment: c.default,
			encodings_fragment: b.default,
			encodings_pars_fragment: x.default,
			envmap_fragment: L.default,
			envmap_pars_fragment: w.default,
			envmap_pars_vertex: y.default,
			envmap_physical_pars_fragment: F.default,
			envmap_vertex: A.default,
			fog_vertex: B.default,
			fog_pars_vertex: G.default,
			fog_fragment: R.default,
			fog_pars_fragment: M.default,
			gradientmap_pars_fragment: O.default,
			lightmap_fragment: P.default,
			lightmap_pars_fragment: z.default,
			lights_lambert_vertex: D.default,
			lights_pars_begin: E.default,
			lights_phong_fragment: H.default,
			lights_phong_pars_fragment: I.default,
			lights_physical_fragment: J.default,
			lights_physical_pars_fragment: K.default,
			lights_fragment_begin: N.default,
			lights_fragment_maps: Q.default,
			lights_fragment_end: T.default,
			logdepthbuf_fragment: U.default,
			logdepthbuf_pars_fragment: V.default,
			logdepthbuf_pars_vertex: W.default,
			logdepthbuf_vertex: X.default,
			map_fragment: Y.default,
			map_pars_fragment: Z.default,
			map_particle_fragment: $.default,
			map_particle_pars_fragment: ee.default,
			metalnessmap_fragment: re.default,
			metalnessmap_pars_fragment: ae.default,
			morphnormal_vertex: le.default,
			morphtarget_pars_vertex: se.default,
			morphtarget_vertex: te.default,
			normal_fragment_begin: ue.default,
			normal_fragment_maps: _e.default,
			normalmap_pars_fragment: ge.default,
			packing: ne.default,
			premultiplied_alpha_fragment: he.default,
			project_vertex: de.default,
			dithering_fragment: ie.default,
			dithering_pars_fragment: fe.default,
			roughnessmap_fragment: pe.default,
			roughnessmap_pars_fragment: me.default,
			shadowmap_pars_fragment: ve.default,
			shadowmap_pars_vertex: qe.default,
			shadowmap_vertex: je.default,
			shadowmask_pars_fragment: Se.default,
			skinbase_vertex: oe.default,
			skinning_pars_vertex: ke.default,
			skinning_vertex: Ce.default,
			skinnormal_vertex: ce.default,
			specularmap_fragment: be.default,
			specularmap_pars_fragment: xe.default,
			tonemapping_fragment: Le.default,
			tonemapping_pars_fragment: we.default,
			uv_pars_fragment: ye.default,
			uv_pars_vertex: Ae.default,
			uv_vertex: Be.default,
			uv2_pars_fragment: Ge.default,
			uv2_pars_vertex: Re.default,
			uv2_vertex: Me.default,
			worldpos_vertex: Oe.default,
			background_frag: Pe.default,
			background_vert: ze.default,
			cube_frag: De.default,
			cube_vert: Ee.default,
			depth_frag: Fe.default,
			depth_vert: He.default,
			distanceRGBA_frag: Ie.default,
			distanceRGBA_vert: Je.default,
			equirect_frag: Ke.default,
			equirect_vert: Ne.default,
			linedashed_frag: Qe.default,
			linedashed_vert: Te.default,
			meshbasic_frag: Ue.default,
			meshbasic_vert: Ve.default,
			meshlambert_frag: We.default,
			meshlambert_vert: Xe.default,
			meshmatcap_frag: Ye.default,
			meshmatcap_vert: Ze.default,
			meshphong_frag: $e.default,
			meshphong_vert: er.default,
			meshphysical_frag: rr.default,
			meshphysical_vert: ar.default,
			normal_frag: lr.default,
			normal_vert: sr.default,
			points_frag: tr.default,
			points_vert: ur.default,
			shadow_frag: _r.default,
			shadow_vert: gr.default,
			sprite_frag: nr.default,
			sprite_vert: hr.default
		};
		exports.ShaderChunk = ir;
	}, {
		"./ShaderChunk/alphamap_fragment.glsl.js": "31x9",
		"./ShaderChunk/alphamap_pars_fragment.glsl.js": "IROn",
		"./ShaderChunk/alphatest_fragment.glsl.js": "85uz",
		"./ShaderChunk/aomap_fragment.glsl.js": "lg2/",
		"./ShaderChunk/aomap_pars_fragment.glsl.js": "fz7o",
		"./ShaderChunk/begin_vertex.glsl.js": "7vyU",
		"./ShaderChunk/beginnormal_vertex.glsl.js": "Hpp2",
		"./ShaderChunk/bsdfs.glsl.js": "X9qh",
		"./ShaderChunk/bumpmap_pars_fragment.glsl.js": "muv2",
		"./ShaderChunk/clipping_planes_fragment.glsl.js": "83Dv",
		"./ShaderChunk/clipping_planes_pars_fragment.glsl.js": "Krgv",
		"./ShaderChunk/clipping_planes_pars_vertex.glsl.js": "bu9w",
		"./ShaderChunk/clipping_planes_vertex.glsl.js": "1zjk",
		"./ShaderChunk/color_fragment.glsl.js": "Ccdo",
		"./ShaderChunk/color_pars_fragment.glsl.js": "5tg7",
		"./ShaderChunk/color_pars_vertex.glsl.js": "5tg7",
		"./ShaderChunk/color_vertex.glsl.js": "PLg+",
		"./ShaderChunk/common.glsl.js": "2spA",
		"./ShaderChunk/cube_uv_reflection_fragment.glsl.js": "nnMz",
		"./ShaderChunk/defaultnormal_vertex.glsl.js": "Ea/M",
		"./ShaderChunk/displacementmap_pars_vertex.glsl.js": "KoLT",
		"./ShaderChunk/displacementmap_vertex.glsl.js": "VMr0",
		"./ShaderChunk/emissivemap_fragment.glsl.js": "emlO",
		"./ShaderChunk/emissivemap_pars_fragment.glsl.js": "wPJe",
		"./ShaderChunk/encodings_fragment.glsl.js": "JgPF",
		"./ShaderChunk/encodings_pars_fragment.glsl.js": "107/",
		"./ShaderChunk/envmap_fragment.glsl.js": "glyF",
		"./ShaderChunk/envmap_pars_fragment.glsl.js": "uwsT",
		"./ShaderChunk/envmap_pars_vertex.glsl.js": "ziqe",
		"./ShaderChunk/envmap_vertex.glsl.js": "V5Xu",
		"./ShaderChunk/fog_vertex.glsl.js": "5IW2",
		"./ShaderChunk/fog_pars_vertex.glsl.js": "zz+4",
		"./ShaderChunk/fog_fragment.glsl.js": "0c7f",
		"./ShaderChunk/fog_pars_fragment.glsl.js": "41h5",
		"./ShaderChunk/gradientmap_pars_fragment.glsl.js": "3H/6",
		"./ShaderChunk/lightmap_fragment.glsl.js": "n0t+",
		"./ShaderChunk/lightmap_pars_fragment.glsl.js": "MjPv",
		"./ShaderChunk/lights_lambert_vertex.glsl.js": "EbdY",
		"./ShaderChunk/lights_pars_begin.glsl.js": "fj1N",
		"./ShaderChunk/envmap_physical_pars_fragment.glsl.js": "xbdD",
		"./ShaderChunk/lights_phong_fragment.glsl.js": "BgaW",
		"./ShaderChunk/lights_phong_pars_fragment.glsl.js": "ii0z",
		"./ShaderChunk/lights_physical_fragment.glsl.js": "jfq1",
		"./ShaderChunk/lights_physical_pars_fragment.glsl.js": "wdgC",
		"./ShaderChunk/lights_fragment_begin.glsl.js": "3W06",
		"./ShaderChunk/lights_fragment_maps.glsl.js": "y9ac",
		"./ShaderChunk/lights_fragment_end.glsl.js": "cWGb",
		"./ShaderChunk/logdepthbuf_fragment.glsl.js": "s43h",
		"./ShaderChunk/logdepthbuf_pars_fragment.glsl.js": "Fgh6",
		"./ShaderChunk/logdepthbuf_pars_vertex.glsl.js": "szSE",
		"./ShaderChunk/logdepthbuf_vertex.glsl.js": "tfam",
		"./ShaderChunk/map_fragment.glsl.js": "0CAl",
		"./ShaderChunk/map_pars_fragment.glsl.js": "WNl/",
		"./ShaderChunk/map_particle_fragment.glsl.js": "kiVj",
		"./ShaderChunk/map_particle_pars_fragment.glsl.js": "CNAk",
		"./ShaderChunk/metalnessmap_fragment.glsl.js": "b1TL",
		"./ShaderChunk/metalnessmap_pars_fragment.glsl.js": "TN3G",
		"./ShaderChunk/morphnormal_vertex.glsl.js": "IYeK",
		"./ShaderChunk/morphtarget_pars_vertex.glsl.js": "6RZ8",
		"./ShaderChunk/morphtarget_vertex.glsl.js": "P9HM",
		"./ShaderChunk/normal_fragment_begin.glsl.js": "N8Je",
		"./ShaderChunk/normal_fragment_maps.glsl.js": "PXKH",
		"./ShaderChunk/normalmap_pars_fragment.glsl.js": "ZclL",
		"./ShaderChunk/packing.glsl.js": "LBFV",
		"./ShaderChunk/premultiplied_alpha_fragment.glsl.js": "iTI/",
		"./ShaderChunk/project_vertex.glsl.js": "GIRi",
		"./ShaderChunk/dithering_fragment.glsl.js": "0uqi",
		"./ShaderChunk/dithering_pars_fragment.glsl.js": "TOu0",
		"./ShaderChunk/roughnessmap_fragment.glsl.js": "hP8T",
		"./ShaderChunk/roughnessmap_pars_fragment.glsl.js": "sKyf",
		"./ShaderChunk/shadowmap_pars_fragment.glsl.js": "Q0/5",
		"./ShaderChunk/shadowmap_pars_vertex.glsl.js": "k83A",
		"./ShaderChunk/shadowmap_vertex.glsl.js": "B5tx",
		"./ShaderChunk/shadowmask_pars_fragment.glsl.js": "aeev",
		"./ShaderChunk/skinbase_vertex.glsl.js": "wuqw",
		"./ShaderChunk/skinning_pars_vertex.glsl.js": "4c6R",
		"./ShaderChunk/skinning_vertex.glsl.js": "2NsV",
		"./ShaderChunk/skinnormal_vertex.glsl.js": "NKe9",
		"./ShaderChunk/specularmap_fragment.glsl.js": "crqp",
		"./ShaderChunk/specularmap_pars_fragment.glsl.js": "PEgM",
		"./ShaderChunk/tonemapping_fragment.glsl.js": "frUn",
		"./ShaderChunk/tonemapping_pars_fragment.glsl.js": "Cu6j",
		"./ShaderChunk/uv_pars_fragment.glsl.js": "f0HG",
		"./ShaderChunk/uv_pars_vertex.glsl.js": "9Uwb",
		"./ShaderChunk/uv_vertex.glsl.js": "FSWZ",
		"./ShaderChunk/uv2_pars_fragment.glsl.js": "k1uW",
		"./ShaderChunk/uv2_pars_vertex.glsl.js": "NX/S",
		"./ShaderChunk/uv2_vertex.glsl.js": "pR+l",
		"./ShaderChunk/worldpos_vertex.glsl.js": "NG+N",
		"./ShaderLib/background_frag.glsl.js": "W/89",
		"./ShaderLib/background_vert.glsl.js": "sEdp",
		"./ShaderLib/cube_frag.glsl.js": "seRw",
		"./ShaderLib/cube_vert.glsl.js": "+KuW",
		"./ShaderLib/depth_frag.glsl.js": "L29b",
		"./ShaderLib/depth_vert.glsl.js": "Uehs",
		"./ShaderLib/distanceRGBA_frag.glsl.js": "7IQG",
		"./ShaderLib/distanceRGBA_vert.glsl.js": "MdLs",
		"./ShaderLib/equirect_frag.glsl.js": "4zqw",
		"./ShaderLib/equirect_vert.glsl.js": "18yK",
		"./ShaderLib/linedashed_frag.glsl.js": "7/+d",
		"./ShaderLib/linedashed_vert.glsl.js": "Ks/Y",
		"./ShaderLib/meshbasic_frag.glsl.js": "FpsI",
		"./ShaderLib/meshbasic_vert.glsl.js": "wRoG",
		"./ShaderLib/meshlambert_frag.glsl.js": "Ryzq",
		"./ShaderLib/meshlambert_vert.glsl.js": "QB48",
		"./ShaderLib/meshmatcap_frag.glsl.js": "Lksu",
		"./ShaderLib/meshmatcap_vert.glsl.js": "VDGU",
		"./ShaderLib/meshphong_frag.glsl.js": "yk5v",
		"./ShaderLib/meshphong_vert.glsl.js": "Ouav",
		"./ShaderLib/meshphysical_frag.glsl.js": "bLBf",
		"./ShaderLib/meshphysical_vert.glsl.js": "pBqN",
		"./ShaderLib/normal_frag.glsl.js": "jBEy",
		"./ShaderLib/normal_vert.glsl.js": "6bAy",
		"./ShaderLib/points_frag.glsl.js": "9JyC",
		"./ShaderLib/points_vert.glsl.js": "rgZF",
		"./ShaderLib/shadow_frag.glsl.js": "wNhP",
		"./ShaderLib/shadow_vert.glsl.js": "U9Nr",
		"./ShaderLib/sprite_frag.glsl.js": "2R0I",
		"./ShaderLib/sprite_vert.glsl.js": "zwY1"
	}],
	"LbN/": [function(require, module, exports) {
		"use strict";

		function r(r) {
			var e = {};
			for (var o in r)
				for (var i in e[o] = {}, r[o]) {
					var s = r[o][i];
					s && (s.isColor || s.isMatrix3 || s.isMatrix4 || s.isVector2 || s.isVector3 || s.isVector4 || s.isTexture) ? e[o][i] = s.clone() : Array.isArray(s) ? e[o][i] = s.slice() : e[o][i] = s
				}
			return e
		}

		function e(e) {
			for (var o = {}, i = 0; i < e.length; i++) {
				var s = r(e[i]);
				for (var t in s) o[t] = s[t]
			}
			return o
		}
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.cloneUniforms = r, exports.mergeUniforms = e, exports.UniformsUtils = void 0;
		var o = {
			clone: r,
			merge: e
		};
		exports.UniformsUtils = o;
	}, {}],
	"TFdP": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.Color = r;
		var t = require("./Math.js"),
			e = {
				aliceblue: 15792383,
				antiquewhite: 16444375,
				aqua: 65535,
				aquamarine: 8388564,
				azure: 15794175,
				beige: 16119260,
				bisque: 16770244,
				black: 0,
				blanchedalmond: 16772045,
				blue: 255,
				blueviolet: 9055202,
				brown: 10824234,
				burlywood: 14596231,
				cadetblue: 6266528,
				chartreuse: 8388352,
				chocolate: 13789470,
				coral: 16744272,
				cornflowerblue: 6591981,
				cornsilk: 16775388,
				crimson: 14423100,
				cyan: 65535,
				darkblue: 139,
				darkcyan: 35723,
				darkgoldenrod: 12092939,
				darkgray: 11119017,
				darkgreen: 25600,
				darkgrey: 11119017,
				darkkhaki: 12433259,
				darkmagenta: 9109643,
				darkolivegreen: 5597999,
				darkorange: 16747520,
				darkorchid: 10040012,
				darkred: 9109504,
				darksalmon: 15308410,
				darkseagreen: 9419919,
				darkslateblue: 4734347,
				darkslategray: 3100495,
				darkslategrey: 3100495,
				darkturquoise: 52945,
				darkviolet: 9699539,
				deeppink: 16716947,
				deepskyblue: 49151,
				dimgray: 6908265,
				dimgrey: 6908265,
				dodgerblue: 2003199,
				firebrick: 11674146,
				floralwhite: 16775920,
				forestgreen: 2263842,
				fuchsia: 16711935,
				gainsboro: 14474460,
				ghostwhite: 16316671,
				gold: 16766720,
				goldenrod: 14329120,
				gray: 8421504,
				green: 32768,
				greenyellow: 11403055,
				grey: 8421504,
				honeydew: 15794160,
				hotpink: 16738740,
				indianred: 13458524,
				indigo: 4915330,
				ivory: 16777200,
				khaki: 15787660,
				lavender: 15132410,
				lavenderblush: 16773365,
				lawngreen: 8190976,
				lemonchiffon: 16775885,
				lightblue: 11393254,
				lightcoral: 15761536,
				lightcyan: 14745599,
				lightgoldenrodyellow: 16448210,
				lightgray: 13882323,
				lightgreen: 9498256,
				lightgrey: 13882323,
				lightpink: 16758465,
				lightsalmon: 16752762,
				lightseagreen: 2142890,
				lightskyblue: 8900346,
				lightslategray: 7833753,
				lightslategrey: 7833753,
				lightsteelblue: 11584734,
				lightyellow: 16777184,
				lime: 65280,
				limegreen: 3329330,
				linen: 16445670,
				magenta: 16711935,
				maroon: 8388608,
				mediumaquamarine: 6737322,
				mediumblue: 205,
				mediumorchid: 12211667,
				mediumpurple: 9662683,
				mediumseagreen: 3978097,
				mediumslateblue: 8087790,
				mediumspringgreen: 64154,
				mediumturquoise: 4772300,
				mediumvioletred: 13047173,
				midnightblue: 1644912,
				mintcream: 16121850,
				mistyrose: 16770273,
				moccasin: 16770229,
				navajowhite: 16768685,
				navy: 128,
				oldlace: 16643558,
				olive: 8421376,
				olivedrab: 7048739,
				orange: 16753920,
				orangered: 16729344,
				orchid: 14315734,
				palegoldenrod: 15657130,
				palegreen: 10025880,
				paleturquoise: 11529966,
				palevioletred: 14381203,
				papayawhip: 16773077,
				peachpuff: 16767673,
				peru: 13468991,
				pink: 16761035,
				plum: 14524637,
				powderblue: 11591910,
				purple: 8388736,
				rebeccapurple: 6697881,
				red: 16711680,
				rosybrown: 12357519,
				royalblue: 4286945,
				saddlebrown: 9127187,
				salmon: 16416882,
				sandybrown: 16032864,
				seagreen: 3050327,
				seashell: 16774638,
				sienna: 10506797,
				silver: 12632256,
				skyblue: 8900331,
				slateblue: 6970061,
				slategray: 7372944,
				slategrey: 7372944,
				snow: 16775930,
				springgreen: 65407,
				steelblue: 4620980,
				tan: 13808780,
				teal: 32896,
				thistle: 14204888,
				tomato: 16737095,
				turquoise: 4251856,
				violet: 15631086,
				wheat: 16113331,
				white: 16777215,
				whitesmoke: 16119285,
				yellow: 16776960,
				yellowgreen: 10145074
			};

		function r(t, e, r) {
			return void 0 === e && void 0 === r ? this.set(t) : this.setRGB(t, e, r)
		}
		Object.assign(r.prototype, {
			isColor: !0,
			r: 1,
			g: 1,
			b: 1,
			set: function(t) {
				return t && t.isColor ? this.copy(t) : "number" == typeof t ? this.setHex(t) : "string" == typeof t && this.setStyle(t), this
			},
			setScalar: function(t) {
				return this.r = t, this.g = t, this.b = t, this
			},
			setHex: function(t) {
				return t = Math.floor(t), this.r = (t >> 16 & 255) / 255, this.g = (t >> 8 & 255) / 255, this.b = (255 & t) / 255, this
			},
			setRGB: function(t, e, r) {
				return this.r = t, this.g = e, this.b = r, this
			},
			setHSL: function() {
				function e(t, e, r) {
					return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? t + 6 * (e - t) * r : r < .5 ? e : r < 2 / 3 ? t + 6 * (e - t) * (2 / 3 - r) : t
				}
				return function(r, i, s) {
					if (r = t._Math.euclideanModulo(r, 1), i = t._Math.clamp(i, 0, 1), s = t._Math.clamp(s, 0, 1), 0 === i) this.r = this.g = this.b = s;
					else {
						var n = s <= .5 ? s * (1 + i) : s + i - s * i,
							a = 2 * s - n;
						this.r = e(a, n, r + 1 / 3), this.g = e(a, n, r), this.b = e(a, n, r - 1 / 3)
					}
					return this
				}
			}(),
			setStyle: function(t) {
				function r(e) {
					void 0 !== e && parseFloat(e) < 1 && console.warn("THREE.Color: Alpha component of " + t + " will be ignored.")
				}
				var i;
				if (i = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(t)) {
					var s, n = i[1],
						a = i[2];
					switch (n) {
						case "rgb":
						case "rgba":
							if (s = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(a)) return this.r = Math.min(255, parseInt(s[1], 10)) / 255, this.g = Math.min(255, parseInt(s[2], 10)) / 255, this.b = Math.min(255, parseInt(s[3], 10)) / 255, r(s[5]), this;
							if (s = /^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(a)) return this.r = Math.min(100, parseInt(s[1], 10)) / 100, this.g = Math.min(100, parseInt(s[2], 10)) / 100, this.b = Math.min(100, parseInt(s[3], 10)) / 100, r(s[5]), this;
							break;
						case "hsl":
						case "hsla":
							if (s = /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(a)) {
								var h = parseFloat(s[1]) / 360,
									o = parseInt(s[2], 10) / 100,
									l = parseInt(s[3], 10) / 100;
								return r(s[5]), this.setHSL(h, o, l)
							}
					}
				} else if (i = /^\#([A-Fa-f0-9]+)$/.exec(t)) {
					var u, c = (u = i[1]).length;
					if (3 === c) return this.r = parseInt(u.charAt(0) + u.charAt(0), 16) / 255, this.g = parseInt(u.charAt(1) + u.charAt(1), 16) / 255, this.b = parseInt(u.charAt(2) + u.charAt(2), 16) / 255, this;
					if (6 === c) return this.r = parseInt(u.charAt(0) + u.charAt(1), 16) / 255, this.g = parseInt(u.charAt(2) + u.charAt(3), 16) / 255, this.b = parseInt(u.charAt(4) + u.charAt(5), 16) / 255, this
				}
				t && t.length > 0 && (void 0 !== (u = e[t]) ? this.setHex(u) : console.warn("THREE.Color: Unknown color " + t));
				return this
			},
			clone: function() {
				return new this.constructor(this.r, this.g, this.b)
			},
			copy: function(t) {
				return this.r = t.r, this.g = t.g, this.b = t.b, this
			},
			copyGammaToLinear: function(t, e) {
				return void 0 === e && (e = 2), this.r = Math.pow(t.r, e), this.g = Math.pow(t.g, e), this.b = Math.pow(t.b, e), this
			},
			copyLinearToGamma: function(t, e) {
				void 0 === e && (e = 2);
				var r = e > 0 ? 1 / e : 1;
				return this.r = Math.pow(t.r, r), this.g = Math.pow(t.g, r), this.b = Math.pow(t.b, r), this
			},
			convertGammaToLinear: function(t) {
				return this.copyGammaToLinear(this, t), this
			},
			convertLinearToGamma: function(t) {
				return this.copyLinearToGamma(this, t), this
			},
			copySRGBToLinear: function() {
				function t(t) {
					return t < .04045 ? .0773993808 * t : Math.pow(.9478672986 * t + .0521327014, 2.4)
				}
				return function(e) {
					return this.r = t(e.r), this.g = t(e.g), this.b = t(e.b), this
				}
			}(),
			copyLinearToSRGB: function() {
				function t(t) {
					return t < .0031308 ? 12.92 * t : 1.055 * Math.pow(t, .41666) - .055
				}
				return function(e) {
					return this.r = t(e.r), this.g = t(e.g), this.b = t(e.b), this
				}
			}(),
			convertSRGBToLinear: function() {
				return this.copySRGBToLinear(this), this
			},
			convertLinearToSRGB: function() {
				return this.copyLinearToSRGB(this), this
			},
			getHex: function() {
				return 255 * this.r << 16 ^ 255 * this.g << 8 ^ 255 * this.b << 0
			},
			getHexString: function() {
				return ("000000" + this.getHex().toString(16)).slice(-6)
			},
			getHSL: function(t) {
				void 0 === t && (console.warn("THREE.Color: .getHSL() target is now required"), t = {
					h: 0,
					s: 0,
					l: 0
				});
				var e, r, i = this.r,
					s = this.g,
					n = this.b,
					a = Math.max(i, s, n),
					h = Math.min(i, s, n),
					o = (h + a) / 2;
				if (h === a) e = 0, r = 0;
				else {
					var l = a - h;
					switch (r = o <= .5 ? l / (a + h) : l / (2 - a - h), a) {
						case i:
							e = (s - n) / l + (s < n ? 6 : 0);
							break;
						case s:
							e = (n - i) / l + 2;
							break;
						case n:
							e = (i - s) / l + 4
					}
					e /= 6
				}
				return t.h = e, t.s = r, t.l = o, t
			},
			getStyle: function() {
				return "rgb(" + (255 * this.r | 0) + "," + (255 * this.g | 0) + "," + (255 * this.b | 0) + ")"
			},
			offsetHSL: function() {
				var t = {};
				return function(e, r, i) {
					return this.getHSL(t), t.h += e, t.s += r, t.l += i, this.setHSL(t.h, t.s, t.l), this
				}
			}(),
			add: function(t) {
				return this.r += t.r, this.g += t.g, this.b += t.b, this
			},
			addColors: function(t, e) {
				return this.r = t.r + e.r, this.g = t.g + e.g, this.b = t.b + e.b, this
			},
			addScalar: function(t) {
				return this.r += t, this.g += t, this.b += t, this
			},
			sub: function(t) {
				return this.r = Math.max(0, this.r - t.r), this.g = Math.max(0, this.g - t.g), this.b = Math.max(0, this.b - t.b), this
			},
			multiply: function(t) {
				return this.r *= t.r, this.g *= t.g, this.b *= t.b, this
			},
			multiplyScalar: function(t) {
				return this.r *= t, this.g *= t, this.b *= t, this
			},
			lerp: function(t, e) {
				return this.r += (t.r - this.r) * e, this.g += (t.g - this.g) * e, this.b += (t.b - this.b) * e, this
			},
			lerpHSL: function() {
				var e = {
						h: 0,
						s: 0,
						l: 0
					},
					r = {
						h: 0,
						s: 0,
						l: 0
					};
				return function(i, s) {
					this.getHSL(e), i.getHSL(r);
					var n = t._Math.lerp(e.h, r.h, s),
						a = t._Math.lerp(e.s, r.s, s),
						h = t._Math.lerp(e.l, r.l, s);
					return this.setHSL(n, a, h), this
				}
			}(),
			equals: function(t) {
				return t.r === this.r && t.g === this.g && t.b === this.b
			},
			fromArray: function(t, e) {
				return void 0 === e && (e = 0), this.r = t[e], this.g = t[e + 1], this.b = t[e + 2], this
			},
			toArray: function(t, e) {
				return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this.r, t[e + 1] = this.g, t[e + 2] = this.b, t
			},
			toJSON: function() {
				return this.getHex()
			}
		});
	}, {
		"./Math.js": "M5nx"
	}],
	"qSlY": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.UniformsLib = void 0;
		var a = require("../../math/Color.js"),
			e = require("../../math/Vector2.js"),
			l = require("../../math/Matrix3.js"),
			o = {
				common: {
					diffuse: {
						value: new a.Color(15658734)
					},
					opacity: {
						value: 1
					},
					map: {
						value: null
					},
					uvTransform: {
						value: new l.Matrix3
					},
					alphaMap: {
						value: null
					}
				},
				specularmap: {
					specularMap: {
						value: null
					}
				},
				envmap: {
					envMap: {
						value: null
					},
					flipEnvMap: {
						value: -1
					},
					reflectivity: {
						value: 1
					},
					refractionRatio: {
						value: .98
					},
					maxMipLevel: {
						value: 0
					}
				},
				aomap: {
					aoMap: {
						value: null
					},
					aoMapIntensity: {
						value: 1
					}
				},
				lightmap: {
					lightMap: {
						value: null
					},
					lightMapIntensity: {
						value: 1
					}
				},
				emissivemap: {
					emissiveMap: {
						value: null
					}
				},
				bumpmap: {
					bumpMap: {
						value: null
					},
					bumpScale: {
						value: 1
					}
				},
				normalmap: {
					normalMap: {
						value: null
					},
					normalScale: {
						value: new e.Vector2(1, 1)
					}
				},
				displacementmap: {
					displacementMap: {
						value: null
					},
					displacementScale: {
						value: 1
					},
					displacementBias: {
						value: 0
					}
				},
				roughnessmap: {
					roughnessMap: {
						value: null
					}
				},
				metalnessmap: {
					metalnessMap: {
						value: null
					}
				},
				gradientmap: {
					gradientMap: {
						value: null
					}
				},
				fog: {
					fogDensity: {
						value: 25e-5
					},
					fogNear: {
						value: 1
					},
					fogFar: {
						value: 2e3
					},
					fogColor: {
						value: new a.Color(16777215)
					}
				},
				lights: {
					ambientLightColor: {
						value: []
					},
					directionalLights: {
						value: [],
						properties: {
							direction: {},
							color: {},
							shadow: {},
							shadowBias: {},
							shadowRadius: {},
							shadowMapSize: {}
						}
					},
					directionalShadowMap: {
						value: []
					},
					directionalShadowMatrix: {
						value: []
					},
					spotLights: {
						value: [],
						properties: {
							color: {},
							position: {},
							direction: {},
							distance: {},
							coneCos: {},
							penumbraCos: {},
							decay: {},
							shadow: {},
							shadowBias: {},
							shadowRadius: {},
							shadowMapSize: {}
						}
					},
					spotShadowMap: {
						value: []
					},
					spotShadowMatrix: {
						value: []
					},
					pointLights: {
						value: [],
						properties: {
							color: {},
							position: {},
							decay: {},
							distance: {},
							shadow: {},
							shadowBias: {},
							shadowRadius: {},
							shadowMapSize: {},
							shadowCameraNear: {},
							shadowCameraFar: {}
						}
					},
					pointShadowMap: {
						value: []
					},
					pointShadowMatrix: {
						value: []
					},
					hemisphereLights: {
						value: [],
						properties: {
							direction: {},
							skyColor: {},
							groundColor: {}
						}
					},
					rectAreaLights: {
						value: [],
						properties: {
							color: {},
							position: {},
							width: {},
							height: {}
						}
					}
				},
				points: {
					diffuse: {
						value: new a.Color(15658734)
					},
					opacity: {
						value: 1
					},
					size: {
						value: 1
					},
					scale: {
						value: 1
					},
					map: {
						value: null
					},
					uvTransform: {
						value: new l.Matrix3
					}
				},
				sprite: {
					diffuse: {
						value: new a.Color(15658734)
					},
					opacity: {
						value: 1
					},
					center: {
						value: new e.Vector2(.5, .5)
					},
					rotation: {
						value: 0
					},
					map: {
						value: null
					},
					uvTransform: {
						value: new l.Matrix3
					}
				}
			};
		exports.UniformsLib = o;
	}, {
		"../../math/Color.js": "TFdP",
		"../../math/Vector2.js": "vOoB",
		"../../math/Matrix3.js": "ecXo"
	}],
	"SyA9": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.ShaderLib = void 0;
		var e = require("./ShaderChunk.js"),
			r = require("./UniformsUtils.js"),
			a = require("../../math/Vector3.js"),
			i = require("./UniformsLib.js"),
			m = require("../../math/Color.js"),
			n = require("../../math/Matrix3.js"),
			s = {
				basic: {
					uniforms: (0, r.mergeUniforms)([i.UniformsLib.common, i.UniformsLib.specularmap, i.UniformsLib.envmap, i.UniformsLib.aomap, i.UniformsLib.lightmap, i.UniformsLib.fog]),
					vertexShader: e.ShaderChunk.meshbasic_vert,
					fragmentShader: e.ShaderChunk.meshbasic_frag
				},
				lambert: {
					uniforms: (0, r.mergeUniforms)([i.UniformsLib.common, i.UniformsLib.specularmap, i.UniformsLib.envmap, i.UniformsLib.aomap, i.UniformsLib.lightmap, i.UniformsLib.emissivemap, i.UniformsLib.fog, i.UniformsLib.lights, {
						emissive: {
							value: new m.Color(0)
						}
					}]),
					vertexShader: e.ShaderChunk.meshlambert_vert,
					fragmentShader: e.ShaderChunk.meshlambert_frag
				},
				phong: {
					uniforms: (0, r.mergeUniforms)([i.UniformsLib.common, i.UniformsLib.specularmap, i.UniformsLib.envmap, i.UniformsLib.aomap, i.UniformsLib.lightmap, i.UniformsLib.emissivemap, i.UniformsLib.bumpmap, i.UniformsLib.normalmap, i.UniformsLib.displacementmap, i.UniformsLib.gradientmap, i.UniformsLib.fog, i.UniformsLib.lights, {
						emissive: {
							value: new m.Color(0)
						},
						specular: {
							value: new m.Color(1118481)
						},
						shininess: {
							value: 30
						}
					}]),
					vertexShader: e.ShaderChunk.meshphong_vert,
					fragmentShader: e.ShaderChunk.meshphong_frag
				},
				standard: {
					uniforms: (0, r.mergeUniforms)([i.UniformsLib.common, i.UniformsLib.envmap, i.UniformsLib.aomap, i.UniformsLib.lightmap, i.UniformsLib.emissivemap, i.UniformsLib.bumpmap, i.UniformsLib.normalmap, i.UniformsLib.displacementmap, i.UniformsLib.roughnessmap, i.UniformsLib.metalnessmap, i.UniformsLib.fog, i.UniformsLib.lights, {
						emissive: {
							value: new m.Color(0)
						},
						roughness: {
							value: .5
						},
						metalness: {
							value: .5
						},
						envMapIntensity: {
							value: 1
						}
					}]),
					vertexShader: e.ShaderChunk.meshphysical_vert,
					fragmentShader: e.ShaderChunk.meshphysical_frag
				},
				matcap: {
					uniforms: (0, r.mergeUniforms)([i.UniformsLib.common, i.UniformsLib.bumpmap, i.UniformsLib.normalmap, i.UniformsLib.displacementmap, i.UniformsLib.fog, {
						matcap: {
							value: null
						}
					}]),
					vertexShader: e.ShaderChunk.meshmatcap_vert,
					fragmentShader: e.ShaderChunk.meshmatcap_frag
				},
				points: {
					uniforms: (0, r.mergeUniforms)([i.UniformsLib.points, i.UniformsLib.fog]),
					vertexShader: e.ShaderChunk.points_vert,
					fragmentShader: e.ShaderChunk.points_frag
				},
				dashed: {
					uniforms: (0, r.mergeUniforms)([i.UniformsLib.common, i.UniformsLib.fog, {
						scale: {
							value: 1
						},
						dashSize: {
							value: 1
						},
						totalSize: {
							value: 2
						}
					}]),
					vertexShader: e.ShaderChunk.linedashed_vert,
					fragmentShader: e.ShaderChunk.linedashed_frag
				},
				depth: {
					uniforms: (0, r.mergeUniforms)([i.UniformsLib.common, i.UniformsLib.displacementmap]),
					vertexShader: e.ShaderChunk.depth_vert,
					fragmentShader: e.ShaderChunk.depth_frag
				},
				normal: {
					uniforms: (0, r.mergeUniforms)([i.UniformsLib.common, i.UniformsLib.bumpmap, i.UniformsLib.normalmap, i.UniformsLib.displacementmap, {
						opacity: {
							value: 1
						}
					}]),
					vertexShader: e.ShaderChunk.normal_vert,
					fragmentShader: e.ShaderChunk.normal_frag
				},
				sprite: {
					uniforms: (0, r.mergeUniforms)([i.UniformsLib.sprite, i.UniformsLib.fog]),
					vertexShader: e.ShaderChunk.sprite_vert,
					fragmentShader: e.ShaderChunk.sprite_frag
				},
				background: {
					uniforms: {
						uvTransform: {
							value: new n.Matrix3
						},
						t2D: {
							value: null
						}
					},
					vertexShader: e.ShaderChunk.background_vert,
					fragmentShader: e.ShaderChunk.background_frag
				},
				cube: {
					uniforms: {
						tCube: {
							value: null
						},
						tFlip: {
							value: -1
						},
						opacity: {
							value: 1
						}
					},
					vertexShader: e.ShaderChunk.cube_vert,
					fragmentShader: e.ShaderChunk.cube_frag
				},
				equirect: {
					uniforms: {
						tEquirect: {
							value: null
						}
					},
					vertexShader: e.ShaderChunk.equirect_vert,
					fragmentShader: e.ShaderChunk.equirect_frag
				},
				distanceRGBA: {
					uniforms: (0, r.mergeUniforms)([i.UniformsLib.common, i.UniformsLib.displacementmap, {
						referencePosition: {
							value: new a.Vector3
						},
						nearDistance: {
							value: 1
						},
						farDistance: {
							value: 1e3
						}
					}]),
					vertexShader: e.ShaderChunk.distanceRGBA_vert,
					fragmentShader: e.ShaderChunk.distanceRGBA_frag
				},
				shadow: {
					uniforms: (0, r.mergeUniforms)([i.UniformsLib.lights, i.UniformsLib.fog, {
						color: {
							value: new m.Color(0)
						},
						opacity: {
							value: 1
						}
					}]),
					vertexShader: e.ShaderChunk.shadow_vert,
					fragmentShader: e.ShaderChunk.shadow_frag
				}
			};
		exports.ShaderLib = s, s.physical = {
			uniforms: (0, r.mergeUniforms)([s.standard.uniforms, {
				clearCoat: {
					value: 0
				},
				clearCoatRoughness: {
					value: 0
				}
			}]),
			vertexShader: e.ShaderChunk.meshphysical_vert,
			fragmentShader: e.ShaderChunk.meshphysical_frag
		};
	}, {
		"./ShaderChunk.js": "oHDJ",
		"./UniformsUtils.js": "LbN/",
		"../../math/Vector3.js": "QLQv",
		"./UniformsLib.js": "qSlY",
		"../../math/Color.js": "TFdP",
		"../../math/Matrix3.js": "ecXo"
	}],
	"PTKN": [function(require, module, exports) {
		"use strict";

		function t(t, i, s, h) {
			this.x = t || 0, this.y = i || 0, this.z = s || 0, this.w = void 0 !== h ? h : 1
		}
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.Vector4 = t, Object.assign(t.prototype, {
			isVector4: !0,
			set: function(t, i, s, h) {
				return this.x = t, this.y = i, this.z = s, this.w = h, this
			},
			setScalar: function(t) {
				return this.x = t, this.y = t, this.z = t, this.w = t, this
			},
			setX: function(t) {
				return this.x = t, this
			},
			setY: function(t) {
				return this.y = t, this
			},
			setZ: function(t) {
				return this.z = t, this
			},
			setW: function(t) {
				return this.w = t, this
			},
			setComponent: function(t, i) {
				switch (t) {
					case 0:
						this.x = i;
						break;
					case 1:
						this.y = i;
						break;
					case 2:
						this.z = i;
						break;
					case 3:
						this.w = i;
						break;
					default:
						throw new Error("index is out of range: " + t)
				}
				return this
			},
			getComponent: function(t) {
				switch (t) {
					case 0:
						return this.x;
					case 1:
						return this.y;
					case 2:
						return this.z;
					case 3:
						return this.w;
					default:
						throw new Error("index is out of range: " + t)
				}
			},
			clone: function() {
				return new this.constructor(this.x, this.y, this.z, this.w)
			},
			copy: function(t) {
				return this.x = t.x, this.y = t.y, this.z = t.z, this.w = void 0 !== t.w ? t.w : 1, this
			},
			add: function(t, i) {
				return void 0 !== i ? (console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(t, i)) : (this.x += t.x, this.y += t.y, this.z += t.z, this.w += t.w, this)
			},
			addScalar: function(t) {
				return this.x += t, this.y += t, this.z += t, this.w += t, this
			},
			addVectors: function(t, i) {
				return this.x = t.x + i.x, this.y = t.y + i.y, this.z = t.z + i.z, this.w = t.w + i.w, this
			},
			addScaledVector: function(t, i) {
				return this.x += t.x * i, this.y += t.y * i, this.z += t.z * i, this.w += t.w * i, this
			},
			sub: function(t, i) {
				return void 0 !== i ? (console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(t, i)) : (this.x -= t.x, this.y -= t.y, this.z -= t.z, this.w -= t.w, this)
			},
			subScalar: function(t) {
				return this.x -= t, this.y -= t, this.z -= t, this.w -= t, this
			},
			subVectors: function(t, i) {
				return this.x = t.x - i.x, this.y = t.y - i.y, this.z = t.z - i.z, this.w = t.w - i.w, this
			},
			multiplyScalar: function(t) {
				return this.x *= t, this.y *= t, this.z *= t, this.w *= t, this
			},
			applyMatrix4: function(t) {
				var i = this.x,
					s = this.y,
					h = this.z,
					n = this.w,
					r = t.elements;
				return this.x = r[0] * i + r[4] * s + r[8] * h + r[12] * n, this.y = r[1] * i + r[5] * s + r[9] * h + r[13] * n, this.z = r[2] * i + r[6] * s + r[10] * h + r[14] * n, this.w = r[3] * i + r[7] * s + r[11] * h + r[15] * n, this
			},
			divideScalar: function(t) {
				return this.multiplyScalar(1 / t)
			},
			setAxisAngleFromQuaternion: function(t) {
				this.w = 2 * Math.acos(t.w);
				var i = Math.sqrt(1 - t.w * t.w);
				return i < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = t.x / i, this.y = t.y / i, this.z = t.z / i), this
			},
			setAxisAngleFromRotationMatrix: function(t) {
				var i, s, h, n, r = t.elements,
					e = r[0],
					a = r[4],
					o = r[8],
					u = r[1],
					c = r[5],
					x = r[9],
					w = r[2],
					y = r[6],
					f = r[10];
				if (Math.abs(a - u) < .01 && Math.abs(o - w) < .01 && Math.abs(x - y) < .01) {
					if (Math.abs(a + u) < .1 && Math.abs(o + w) < .1 && Math.abs(x + y) < .1 && Math.abs(e + c + f - 3) < .1) return this.set(1, 0, 0, 0), this;
					i = Math.PI;
					var l = (e + 1) / 2,
						z = (c + 1) / 2,
						M = (f + 1) / 2,
						d = (a + u) / 4,
						m = (o + w) / 4,
						b = (x + y) / 4;
					return l > z && l > M ? l < .01 ? (s = 0, h = .707106781, n = .707106781) : (h = d / (s = Math.sqrt(l)), n = m / s) : z > M ? z < .01 ? (s = .707106781, h = 0, n = .707106781) : (s = d / (h = Math.sqrt(z)), n = b / h) : M < .01 ? (s = .707106781, h = .707106781, n = 0) : (s = m / (n = Math.sqrt(M)), h = b / n), this.set(s, h, n, i), this
				}
				var p = Math.sqrt((y - x) * (y - x) + (o - w) * (o - w) + (u - a) * (u - a));
				return Math.abs(p) < .001 && (p = 1), this.x = (y - x) / p, this.y = (o - w) / p, this.z = (u - a) / p, this.w = Math.acos((e + c + f - 1) / 2), this
			},
			min: function(t) {
				return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this.w = Math.min(this.w, t.w), this
			},
			max: function(t) {
				return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this.w = Math.max(this.w, t.w), this
			},
			clamp: function(t, i) {
				return this.x = Math.max(t.x, Math.min(i.x, this.x)), this.y = Math.max(t.y, Math.min(i.y, this.y)), this.z = Math.max(t.z, Math.min(i.z, this.z)), this.w = Math.max(t.w, Math.min(i.w, this.w)), this
			},
			clampScalar: function() {
				var i, s;
				return function(h, n) {
					return void 0 === i && (i = new t, s = new t), i.set(h, h, h, h), s.set(n, n, n, n), this.clamp(i, s)
				}
			}(),
			clampLength: function(t, i) {
				var s = this.length();
				return this.divideScalar(s || 1).multiplyScalar(Math.max(t, Math.min(i, s)))
			},
			floor: function() {
				return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this
			},
			ceil: function() {
				return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this
			},
			round: function() {
				return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this
			},
			roundToZero: function() {
				return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this.w = this.w < 0 ? Math.ceil(this.w) : Math.floor(this.w), this
			},
			negate: function() {
				return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this
			},
			dot: function(t) {
				return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w
			},
			lengthSq: function() {
				return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
			},
			length: function() {
				return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
			},
			manhattanLength: function() {
				return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
			},
			normalize: function() {
				return this.divideScalar(this.length() || 1)
			},
			setLength: function(t) {
				return this.normalize().multiplyScalar(t)
			},
			lerp: function(t, i) {
				return this.x += (t.x - this.x) * i, this.y += (t.y - this.y) * i, this.z += (t.z - this.z) * i, this.w += (t.w - this.w) * i, this
			},
			lerpVectors: function(t, i, s) {
				return this.subVectors(i, t).multiplyScalar(s).add(t)
			},
			equals: function(t) {
				return t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w
			},
			fromArray: function(t, i) {
				return void 0 === i && (i = 0), this.x = t[i], this.y = t[i + 1], this.z = t[i + 2], this.w = t[i + 3], this
			},
			toArray: function(t, i) {
				return void 0 === t && (t = []), void 0 === i && (i = 0), t[i] = this.x, t[i + 1] = this.y, t[i + 2] = this.z, t[i + 3] = this.w, t
			},
			fromBufferAttribute: function(t, i, s) {
				return void 0 !== s && console.warn("THREE.Vector4: offset has been removed from .fromBufferAttribute()."), this.x = t.getX(i), this.y = t.getY(i), this.z = t.getZ(i), this.w = t.getW(i), this
			}
		});
	}, {}],
	"yP7M": [function(require, module, exports) {
		"use strict";

		function n() {
			var n = null,
				t = !1,
				e = null;

			function o(i, u) {
				!1 !== t && (e(i, u), n.requestAnimationFrame(o))
			}
			return {
				start: function() {
					!0 !== t && null !== e && (n.requestAnimationFrame(o), t = !0)
				},
				stop: function() {
					t = !1
				},
				setAnimationLoop: function(n) {
					e = n
				},
				setContext: function(t) {
					n = t
				}
			}
		}
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.WebGLAnimation = n;
	}, {}],
	"geZY": [function(require, module, exports) {
		"use strict";

		function e(e) {
			var t = new WeakMap;
			return {
				get: function(e) {
					return e.isInterleavedBufferAttribute && (e = e.data), t.get(e)
				},
				remove: function(r) {
					r.isInterleavedBufferAttribute && (r = r.data);
					var a = t.get(r);
					a && (e.deleteBuffer(a.buffer), t.delete(r))
				},
				update: function(r, a) {
					r.isInterleavedBufferAttribute && (r = r.data);
					var n = t.get(r);
					void 0 === n ? t.set(r, function(t, r) {
						var a = t.array,
							n = t.dynamic ? e.DYNAMIC_DRAW : e.STATIC_DRAW,
							f = e.createBuffer();
						e.bindBuffer(r, f), e.bufferData(r, a, n), t.onUploadCallback();
						var u = e.FLOAT;
						return a instanceof Float32Array ? u = e.FLOAT : a instanceof Float64Array ? console.warn("THREE.WebGLAttributes: Unsupported data buffer format: Float64Array.") : a instanceof Uint16Array ? u = e.UNSIGNED_SHORT : a instanceof Int16Array ? u = e.SHORT : a instanceof Uint32Array ? u = e.UNSIGNED_INT : a instanceof Int32Array ? u = e.INT : a instanceof Int8Array ? u = e.BYTE : a instanceof Uint8Array && (u = e.UNSIGNED_BYTE), {
							buffer: f,
							type: u,
							bytesPerElement: a.BYTES_PER_ELEMENT,
							version: t.version
						}
					}(r, a)) : n.version < r.version && (function(t, r, a) {
						var n = r.array,
							f = r.updateRange;
						e.bindBuffer(a, t), !1 === r.dynamic ? e.bufferData(a, n, e.STATIC_DRAW) : -1 === f.count ? e.bufferSubData(a, 0, n) : 0 === f.count ? console.error("THREE.WebGLObjects.updateBuffer: dynamic THREE.BufferAttribute marked as needsUpdate but updateRange.count is 0, ensure you are using set methods or updating manually.") : (e.bufferSubData(a, f.offset * n.BYTES_PER_ELEMENT, n.subarray(f.offset, f.offset + f.count)), f.count = -1)
					}(n.buffer, r, a), n.version = r.version)
				}
			}
		}
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.WebGLAttributes = e;
	}, {}],
	"Abar": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.Face3 = e;
		var r = require("../math/Color.js"),
			t = require("../math/Vector3.js");

		function e(e, o, s, i, a, l) {
			this.a = e, this.b = o, this.c = s, this.normal = i && i.isVector3 ? i : new t.Vector3, this.vertexNormals = Array.isArray(i) ? i : [], this.color = a && a.isColor ? a : new r.Color, this.vertexColors = Array.isArray(a) ? a : [], this.materialIndex = void 0 !== l ? l : 0
		}
		Object.assign(e.prototype, {
			clone: function() {
				return (new this.constructor).copy(this)
			},
			copy: function(r) {
				this.a = r.a, this.b = r.b, this.c = r.c, this.normal.copy(r.normal), this.color.copy(r.color), this.materialIndex = r.materialIndex;
				for (var t = 0, e = r.vertexNormals.length; t < e; t++) this.vertexNormals[t] = r.vertexNormals[t].clone();
				for (t = 0, e = r.vertexColors.length; t < e; t++) this.vertexColors[t] = r.vertexColors[t].clone();
				return this
			}
		});
	}, {
		"../math/Color.js": "TFdP",
		"../math/Vector3.js": "QLQv"
	}],
	"RhDg": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.Geometry = v;
		var e = require("./EventDispatcher.js"),
			r = require("./Face3.js"),
			t = require("../math/Matrix3.js"),
			o = require("../math/Sphere.js"),
			s = require("../math/Box3.js"),
			i = require("../math/Vector3.js"),
			a = require("../math/Matrix4.js"),
			n = require("../math/Vector2.js"),
			h = require("../math/Color.js"),
			c = require("./Object3D.js"),
			l = require("../math/Math.js"),
			u = 0;

		function v() {
			Object.defineProperty(this, "id", {
				value: u += 2
			}), this.uuid = l._Math.generateUUID(), this.name = "", this.type = "Geometry", this.vertices = [], this.colors = [], this.faces = [], this.faceVertexUvs = [
				[]
			], this.morphTargets = [], this.morphNormals = [], this.skinWeights = [], this.skinIndices = [], this.lineDistances = [], this.boundingBox = null, this.boundingSphere = null, this.elementsNeedUpdate = !1, this.verticesNeedUpdate = !1, this.uvsNeedUpdate = !1, this.normalsNeedUpdate = !1, this.colorsNeedUpdate = !1, this.lineDistancesNeedUpdate = !1, this.groupsNeedUpdate = !1
		}
		v.prototype = Object.assign(Object.create(e.EventDispatcher.prototype), {
			constructor: v,
			isGeometry: !0,
			applyMatrix: function(e) {
				for (var r = (new t.Matrix3).getNormalMatrix(e), o = 0, s = this.vertices.length; o < s; o++) {
					this.vertices[o].applyMatrix4(e)
				}
				for (o = 0, s = this.faces.length; o < s; o++) {
					var i = this.faces[o];
					i.normal.applyMatrix3(r).normalize();
					for (var a = 0, n = i.vertexNormals.length; a < n; a++) i.vertexNormals[a].applyMatrix3(r).normalize()
				}
				return null !== this.boundingBox && this.computeBoundingBox(), null !== this.boundingSphere && this.computeBoundingSphere(), this.verticesNeedUpdate = !0, this.normalsNeedUpdate = !0, this
			},
			rotateX: function() {
				var e = new a.Matrix4;
				return function(r) {
					return e.makeRotationX(r), this.applyMatrix(e), this
				}
			}(),
			rotateY: function() {
				var e = new a.Matrix4;
				return function(r) {
					return e.makeRotationY(r), this.applyMatrix(e), this
				}
			}(),
			rotateZ: function() {
				var e = new a.Matrix4;
				return function(r) {
					return e.makeRotationZ(r), this.applyMatrix(e), this
				}
			}(),
			translate: function() {
				var e = new a.Matrix4;
				return function(r, t, o) {
					return e.makeTranslation(r, t, o), this.applyMatrix(e), this
				}
			}(),
			scale: function() {
				var e = new a.Matrix4;
				return function(r, t, o) {
					return e.makeScale(r, t, o), this.applyMatrix(e), this
				}
			}(),
			lookAt: function() {
				var e = new c.Object3D;
				return function(r) {
					e.lookAt(r), e.updateMatrix(), this.applyMatrix(e.matrix)
				}
			}(),
			fromBufferGeometry: function(e) {
				var t = this,
					o = null !== e.index ? e.index.array : void 0,
					s = e.attributes,
					a = s.position.array,
					c = void 0 !== s.normal ? s.normal.array : void 0,
					l = void 0 !== s.color ? s.color.array : void 0,
					u = void 0 !== s.uv ? s.uv.array : void 0,
					v = void 0 !== s.uv2 ? s.uv2.array : void 0;
				void 0 !== v && (this.faceVertexUvs[1] = []);
				for (var m = 0, p = 0; m < a.length; m += 3, p += 2) t.vertices.push((new i.Vector3).fromArray(a, m)), void 0 !== l && t.colors.push((new h.Color).fromArray(l, m));

				function f(e, o, s, a) {
					var h = void 0 === l ? [] : [t.colors[e].clone(), t.colors[o].clone(), t.colors[s].clone()],
						m = void 0 === c ? [] : [(new i.Vector3).fromArray(c, 3 * e), (new i.Vector3).fromArray(c, 3 * o), (new i.Vector3).fromArray(c, 3 * s)],
						p = new r.Face3(e, o, s, m, h, a);
					t.faces.push(p), void 0 !== u && t.faceVertexUvs[0].push([(new n.Vector2).fromArray(u, 2 * e), (new n.Vector2).fromArray(u, 2 * o), (new n.Vector2).fromArray(u, 2 * s)]), void 0 !== v && t.faceVertexUvs[1].push([(new n.Vector2).fromArray(v, 2 * e), (new n.Vector2).fromArray(v, 2 * o), (new n.Vector2).fromArray(v, 2 * s)])
				}
				var d = e.groups;
				if (d.length > 0)
					for (m = 0; m < d.length; m++)
						for (var g = d[m], x = g.start, N = (p = x, x + g.count); p < N; p += 3) void 0 !== o ? f(o[p], o[p + 1], o[p + 2], g.materialIndex) : f(p, p + 1, p + 2, g.materialIndex);
				else if (void 0 !== o)
					for (m = 0; m < o.length; m += 3) f(o[m], o[m + 1], o[m + 2]);
				else
					for (m = 0; m < a.length / 3; m += 3) f(m, m + 1, m + 2);
				return this.computeFaceNormals(), null !== e.boundingBox && (this.boundingBox = e.boundingBox.clone()), null !== e.boundingSphere && (this.boundingSphere = e.boundingSphere.clone()), this
			},
			center: function() {
				var e = new i.Vector3;
				return function() {
					return this.computeBoundingBox(), this.boundingBox.getCenter(e).negate(), this.translate(e.x, e.y, e.z), this
				}
			}(),
			normalize: function() {
				this.computeBoundingSphere();
				var e = this.boundingSphere.center,
					r = this.boundingSphere.radius,
					t = 0 === r ? 1 : 1 / r,
					o = new a.Matrix4;
				return o.set(t, 0, 0, -t * e.x, 0, t, 0, -t * e.y, 0, 0, t, -t * e.z, 0, 0, 0, 1), this.applyMatrix(o), this
			},
			computeFaceNormals: function() {
				for (var e = new i.Vector3, r = new i.Vector3, t = 0, o = this.faces.length; t < o; t++) {
					var s = this.faces[t],
						a = this.vertices[s.a],
						n = this.vertices[s.b],
						h = this.vertices[s.c];
					e.subVectors(h, n), r.subVectors(a, n), e.cross(r), e.normalize(), s.normal.copy(e)
				}
			},
			computeVertexNormals: function(e) {
				var r, t, o, s, a, n;
				for (void 0 === e && (e = !0), n = new Array(this.vertices.length), r = 0, t = this.vertices.length; r < t; r++) n[r] = new i.Vector3;
				if (e) {
					var h, c, l, u = new i.Vector3,
						v = new i.Vector3;
					for (o = 0, s = this.faces.length; o < s; o++) a = this.faces[o], h = this.vertices[a.a], c = this.vertices[a.b], l = this.vertices[a.c], u.subVectors(l, c), v.subVectors(h, c), u.cross(v), n[a.a].add(u), n[a.b].add(u), n[a.c].add(u)
				} else
					for (this.computeFaceNormals(), o = 0, s = this.faces.length; o < s; o++) n[(a = this.faces[o]).a].add(a.normal), n[a.b].add(a.normal), n[a.c].add(a.normal);
				for (r = 0, t = this.vertices.length; r < t; r++) n[r].normalize();
				for (o = 0, s = this.faces.length; o < s; o++) {
					var m = (a = this.faces[o]).vertexNormals;
					3 === m.length ? (m[0].copy(n[a.a]), m[1].copy(n[a.b]), m[2].copy(n[a.c])) : (m[0] = n[a.a].clone(), m[1] = n[a.b].clone(), m[2] = n[a.c].clone())
				}
				this.faces.length > 0 && (this.normalsNeedUpdate = !0)
			},
			computeFlatVertexNormals: function() {
				var e, r, t;
				for (this.computeFaceNormals(), e = 0, r = this.faces.length; e < r; e++) {
					var o = (t = this.faces[e]).vertexNormals;
					3 === o.length ? (o[0].copy(t.normal), o[1].copy(t.normal), o[2].copy(t.normal)) : (o[0] = t.normal.clone(), o[1] = t.normal.clone(), o[2] = t.normal.clone())
				}
				this.faces.length > 0 && (this.normalsNeedUpdate = !0)
			},
			computeMorphNormals: function() {
				var e, r, t, o, s;
				for (t = 0, o = this.faces.length; t < o; t++)
					for ((s = this.faces[t]).__originalFaceNormal ? s.__originalFaceNormal.copy(s.normal) : s.__originalFaceNormal = s.normal.clone(), s.__originalVertexNormals || (s.__originalVertexNormals = []), e = 0, r = s.vertexNormals.length; e < r; e++) s.__originalVertexNormals[e] ? s.__originalVertexNormals[e].copy(s.vertexNormals[e]) : s.__originalVertexNormals[e] = s.vertexNormals[e].clone();
				var a = new v;
				for (a.faces = this.faces, e = 0, r = this.morphTargets.length; e < r; e++) {
					if (!this.morphNormals[e]) {
						this.morphNormals[e] = {}, this.morphNormals[e].faceNormals = [], this.morphNormals[e].vertexNormals = [];
						var n = this.morphNormals[e].faceNormals,
							h = this.morphNormals[e].vertexNormals;
						for (t = 0, o = this.faces.length; t < o; t++) c = new i.Vector3, l = {
							a: new i.Vector3,
							b: new i.Vector3,
							c: new i.Vector3
						}, n.push(c), h.push(l)
					}
					var c, l, u = this.morphNormals[e];
					for (a.vertices = this.morphTargets[e].vertices, a.computeFaceNormals(), a.computeVertexNormals(), t = 0, o = this.faces.length; t < o; t++) s = this.faces[t], c = u.faceNormals[t], l = u.vertexNormals[t], c.copy(s.normal), l.a.copy(s.vertexNormals[0]), l.b.copy(s.vertexNormals[1]), l.c.copy(s.vertexNormals[2])
				}
				for (t = 0, o = this.faces.length; t < o; t++)(s = this.faces[t]).normal = s.__originalFaceNormal, s.vertexNormals = s.__originalVertexNormals
			},
			computeBoundingBox: function() {
				null === this.boundingBox && (this.boundingBox = new s.Box3), this.boundingBox.setFromPoints(this.vertices)
			},
			computeBoundingSphere: function() {
				null === this.boundingSphere && (this.boundingSphere = new o.Sphere), this.boundingSphere.setFromPoints(this.vertices)
			},
			merge: function(e, o, s) {
				if (e && e.isGeometry) {
					var i, a = this.vertices.length,
						n = this.vertices,
						h = e.vertices,
						c = this.faces,
						l = e.faces,
						u = this.faceVertexUvs[0],
						v = e.faceVertexUvs[0],
						m = this.colors,
						p = e.colors;
					void 0 === s && (s = 0), void 0 !== o && (i = (new t.Matrix3).getNormalMatrix(o));
					for (var f = 0, d = h.length; f < d; f++) {
						var g = h[f].clone();
						void 0 !== o && g.applyMatrix4(o), n.push(g)
					}
					for (f = 0, d = p.length; f < d; f++) m.push(p[f].clone());
					for (f = 0, d = l.length; f < d; f++) {
						var x, N, y, V = l[f],
							b = V.vertexNormals,
							U = V.vertexColors;
						(x = new r.Face3(V.a + a, V.b + a, V.c + a)).normal.copy(V.normal), void 0 !== i && x.normal.applyMatrix3(i).normalize();
						for (var M = 0, w = b.length; M < w; M++) N = b[M].clone(), void 0 !== i && N.applyMatrix3(i).normalize(), x.vertexNormals.push(N);
						x.color.copy(V.color);
						for (M = 0, w = U.length; M < w; M++) y = U[M], x.vertexColors.push(y.clone());
						x.materialIndex = V.materialIndex + s, c.push(x)
					}
					for (f = 0, d = v.length; f < d; f++) {
						var S = v[f],
							_ = [];
						if (void 0 !== S) {
							for (M = 0, w = S.length; M < w; M++) _.push(S[M].clone());
							u.push(_)
						}
					}
				} else console.error("THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.", e)
			},
			mergeMesh: function(e) {
				e && e.isMesh ? (e.matrixAutoUpdate && e.updateMatrix(), this.merge(e.geometry, e.matrix)) : console.error("THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.", e)
			},
			mergeVertices: function() {
				var e, r, t, o, s, i, a, n, h = {},
					c = [],
					l = [],
					u = Math.pow(10, 4);
				for (t = 0, o = this.vertices.length; t < o; t++) e = this.vertices[t], void 0 === h[r = Math.round(e.x * u) + "_" + Math.round(e.y * u) + "_" + Math.round(e.z * u)] ? (h[r] = t, c.push(this.vertices[t]), l[t] = c.length - 1) : l[t] = l[h[r]];
				var v = [];
				for (t = 0, o = this.faces.length; t < o; t++) {
					(s = this.faces[t]).a = l[s.a], s.b = l[s.b], s.c = l[s.c], i = [s.a, s.b, s.c];
					for (var m = 0; m < 3; m++)
						if (i[m] === i[(m + 1) % 3]) {
							v.push(t);
							break
						}
				}
				for (t = v.length - 1; t >= 0; t--) {
					var p = v[t];
					for (this.faces.splice(p, 1), a = 0, n = this.faceVertexUvs.length; a < n; a++) this.faceVertexUvs[a].splice(p, 1)
				}
				var f = this.vertices.length - c.length;
				return this.vertices = c, f
			},
			setFromPoints: function(e) {
				this.vertices = [];
				for (var r = 0, t = e.length; r < t; r++) {
					var o = e[r];
					this.vertices.push(new i.Vector3(o.x, o.y, o.z || 0))
				}
				return this
			},
			sortFacesByMaterialIndex: function() {
				for (var e = this.faces, r = e.length, t = 0; t < r; t++) e[t]._id = t;
				e.sort(function(e, r) {
					return e.materialIndex - r.materialIndex
				});
				var o, s, i = this.faceVertexUvs[0],
					a = this.faceVertexUvs[1];
				i && i.length === r && (o = []), a && a.length === r && (s = []);
				for (t = 0; t < r; t++) {
					var n = e[t]._id;
					o && o.push(i[n]), s && s.push(a[n])
				}
				o && (this.faceVertexUvs[0] = o), s && (this.faceVertexUvs[1] = s)
			},
			toJSON: function() {
				var e = {
					metadata: {
						version: 4.5,
						type: "Geometry",
						generator: "Geometry.toJSON"
					}
				};
				if (e.uuid = this.uuid, e.type = this.type, "" !== this.name && (e.name = this.name), void 0 !== this.parameters) {
					var r = this.parameters;
					for (var t in r) void 0 !== r[t] && (e[t] = r[t]);
					return e
				}
				for (var o = [], s = 0; s < this.vertices.length; s++) {
					var i = this.vertices[s];
					o.push(i.x, i.y, i.z)
				}
				var a = [],
					n = [],
					h = {},
					c = [],
					l = {},
					u = [],
					v = {};
				for (s = 0; s < this.faces.length; s++) {
					var m = this.faces[s],
						p = void 0 !== this.faceVertexUvs[0][s],
						f = m.normal.length() > 0,
						d = m.vertexNormals.length > 0,
						g = 1 !== m.color.r || 1 !== m.color.g || 1 !== m.color.b,
						x = m.vertexColors.length > 0,
						N = 0;
					if (N = U(N, 0, 0), N = U(N, 1, !0), N = U(N, 2, !1), N = U(N, 3, p), N = U(N, 4, f), N = U(N, 5, d), N = U(N, 6, g), N = U(N, 7, x), a.push(N), a.push(m.a, m.b, m.c), a.push(m.materialIndex), p) {
						var y = this.faceVertexUvs[0][s];
						a.push(S(y[0]), S(y[1]), S(y[2]))
					}
					if (f && a.push(M(m.normal)), d) {
						var V = m.vertexNormals;
						a.push(M(V[0]), M(V[1]), M(V[2]))
					}
					if (g && a.push(w(m.color)), x) {
						var b = m.vertexColors;
						a.push(w(b[0]), w(b[1]), w(b[2]))
					}
				}

				function U(e, r, t) {
					return t ? e | 1 << r : e & ~(1 << r)
				}

				function M(e) {
					var r = e.x.toString() + e.y.toString() + e.z.toString();
					return void 0 !== h[r] ? h[r] : (h[r] = n.length / 3, n.push(e.x, e.y, e.z), h[r])
				}

				function w(e) {
					var r = e.r.toString() + e.g.toString() + e.b.toString();
					return void 0 !== l[r] ? l[r] : (l[r] = c.length, c.push(e.getHex()), l[r])
				}

				function S(e) {
					var r = e.x.toString() + e.y.toString();
					return void 0 !== v[r] ? v[r] : (v[r] = u.length / 2, u.push(e.x, e.y), v[r])
				}
				return e.data = {}, e.data.vertices = o, e.data.normals = n, c.length > 0 && (e.data.colors = c), u.length > 0 && (e.data.uvs = [u]), e.data.faces = a, e
			},
			clone: function() {
				return (new v).copy(this)
			},
			copy: function(e) {
				var r, t, o, s, i, a;
				this.vertices = [], this.colors = [], this.faces = [], this.faceVertexUvs = [
					[]
				], this.morphTargets = [], this.morphNormals = [], this.skinWeights = [], this.skinIndices = [], this.lineDistances = [], this.boundingBox = null, this.boundingSphere = null, this.name = e.name;
				var n = e.vertices;
				for (r = 0, t = n.length; r < t; r++) this.vertices.push(n[r].clone());
				var h = e.colors;
				for (r = 0, t = h.length; r < t; r++) this.colors.push(h[r].clone());
				var c = e.faces;
				for (r = 0, t = c.length; r < t; r++) this.faces.push(c[r].clone());
				for (r = 0, t = e.faceVertexUvs.length; r < t; r++) {
					var l = e.faceVertexUvs[r];
					for (void 0 === this.faceVertexUvs[r] && (this.faceVertexUvs[r] = []), o = 0, s = l.length; o < s; o++) {
						var u = l[o],
							v = [];
						for (i = 0, a = u.length; i < a; i++) {
							var m = u[i];
							v.push(m.clone())
						}
						this.faceVertexUvs[r].push(v)
					}
				}
				var p = e.morphTargets;
				for (r = 0, t = p.length; r < t; r++) {
					var f = {};
					if (f.name = p[r].name, void 0 !== p[r].vertices)
						for (f.vertices = [], o = 0, s = p[r].vertices.length; o < s; o++) f.vertices.push(p[r].vertices[o].clone());
					if (void 0 !== p[r].normals)
						for (f.normals = [], o = 0, s = p[r].normals.length; o < s; o++) f.normals.push(p[r].normals[o].clone());
					this.morphTargets.push(f)
				}
				var d = e.morphNormals;
				for (r = 0, t = d.length; r < t; r++) {
					var g = {};
					if (void 0 !== d[r].vertexNormals)
						for (g.vertexNormals = [], o = 0, s = d[r].vertexNormals.length; o < s; o++) {
							var x = d[r].vertexNormals[o],
								N = {};
							N.a = x.a.clone(), N.b = x.b.clone(), N.c = x.c.clone(), g.vertexNormals.push(N)
						}
					if (void 0 !== d[r].faceNormals)
						for (g.faceNormals = [], o = 0, s = d[r].faceNormals.length; o < s; o++) g.faceNormals.push(d[r].faceNormals[o].clone());
					this.morphNormals.push(g)
				}
				var y = e.skinWeights;
				for (r = 0, t = y.length; r < t; r++) this.skinWeights.push(y[r].clone());
				var V = e.skinIndices;
				for (r = 0, t = V.length; r < t; r++) this.skinIndices.push(V[r].clone());
				var b = e.lineDistances;
				for (r = 0, t = b.length; r < t; r++) this.lineDistances.push(b[r]);
				var U = e.boundingBox;
				null !== U && (this.boundingBox = U.clone());
				var M = e.boundingSphere;
				return null !== M && (this.boundingSphere = M.clone()), this.elementsNeedUpdate = e.elementsNeedUpdate, this.verticesNeedUpdate = e.verticesNeedUpdate, this.uvsNeedUpdate = e.uvsNeedUpdate, this.normalsNeedUpdate = e.normalsNeedUpdate, this.colorsNeedUpdate = e.colorsNeedUpdate, this.lineDistancesNeedUpdate = e.lineDistancesNeedUpdate, this.groupsNeedUpdate = e.groupsNeedUpdate, this
			},
			dispose: function() {
				this.dispatchEvent({
					type: "dispose"
				})
			}
		});
	}, {
		"./EventDispatcher.js": "SLlv",
		"./Face3.js": "Abar",
		"../math/Matrix3.js": "ecXo",
		"../math/Sphere.js": "Jw30",
		"../math/Box3.js": "Xu2q",
		"../math/Vector3.js": "QLQv",
		"../math/Matrix4.js": "QUid",
		"../math/Vector2.js": "vOoB",
		"../math/Color.js": "TFdP",
		"./Object3D.js": "Nnue",
		"../math/Math.js": "M5nx"
	}],
	"v7ZT": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.Float64BufferAttribute = f, exports.Float32BufferAttribute = p, exports.Uint32BufferAttribute = h, exports.Int32BufferAttribute = y, exports.Uint16BufferAttribute = u, exports.Int16BufferAttribute = c, exports.Uint8ClampedBufferAttribute = s, exports.Uint8BufferAttribute = a, exports.Int8BufferAttribute = n, exports.BufferAttribute = o;
		var t = require("../math/Vector4.js"),
			r = require("../math/Vector3.js"),
			e = require("../math/Vector2.js"),
			i = require("../math/Color.js");

		function o(t, r, e) {
			if (Array.isArray(t)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
			this.name = "", this.array = t, this.itemSize = r, this.count = void 0 !== t ? t.length / r : 0, this.normalized = !0 === e, this.dynamic = !1, this.updateRange = {
				offset: 0,
				count: -1
			}, this.version = 0
		}

		function n(t, r, e) {
			o.call(this, new Int8Array(t), r, e)
		}

		function a(t, r, e) {
			o.call(this, new Uint8Array(t), r, e)
		}

		function s(t, r, e) {
			o.call(this, new Uint8ClampedArray(t), r, e)
		}

		function c(t, r, e) {
			o.call(this, new Int16Array(t), r, e)
		}

		function u(t, r, e) {
			o.call(this, new Uint16Array(t), r, e)
		}

		function y(t, r, e) {
			o.call(this, new Int32Array(t), r, e)
		}

		function h(t, r, e) {
			o.call(this, new Uint32Array(t), r, e)
		}

		function p(t, r, e) {
			o.call(this, new Float32Array(t), r, e)
		}

		function f(t, r, e) {
			o.call(this, new Float64Array(t), r, e)
		}
		Object.defineProperty(o.prototype, "needsUpdate", {
			set: function(t) {
				!0 === t && this.version++
			}
		}), Object.assign(o.prototype, {
			isBufferAttribute: !0,
			onUploadCallback: function() {},
			setArray: function(t) {
				if (Array.isArray(t)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
				return this.count = void 0 !== t ? t.length / this.itemSize : 0, this.array = t, this
			},
			setDynamic: function(t) {
				return this.dynamic = t, this
			},
			copy: function(t) {
				return this.name = t.name, this.array = new t.array.constructor(t.array), this.itemSize = t.itemSize, this.count = t.count, this.normalized = t.normalized, this.dynamic = t.dynamic, this
			},
			copyAt: function(t, r, e) {
				t *= this.itemSize, e *= r.itemSize;
				for (var i = 0, o = this.itemSize; i < o; i++) this.array[t + i] = r.array[e + i];
				return this
			},
			copyArray: function(t) {
				return this.array.set(t), this
			},
			copyColorsArray: function(t) {
				for (var r = this.array, e = 0, o = 0, n = t.length; o < n; o++) {
					var a = t[o];
					void 0 === a && (console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined", o), a = new i.Color), r[e++] = a.r, r[e++] = a.g, r[e++] = a.b
				}
				return this
			},
			copyVector2sArray: function(t) {
				for (var r = this.array, i = 0, o = 0, n = t.length; o < n; o++) {
					var a = t[o];
					void 0 === a && (console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined", o), a = new e.Vector2), r[i++] = a.x, r[i++] = a.y
				}
				return this
			},
			copyVector3sArray: function(t) {
				for (var e = this.array, i = 0, o = 0, n = t.length; o < n; o++) {
					var a = t[o];
					void 0 === a && (console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined", o), a = new r.Vector3), e[i++] = a.x, e[i++] = a.y, e[i++] = a.z
				}
				return this
			},
			copyVector4sArray: function(r) {
				for (var e = this.array, i = 0, o = 0, n = r.length; o < n; o++) {
					var a = r[o];
					void 0 === a && (console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined", o), a = new t.Vector4), e[i++] = a.x, e[i++] = a.y, e[i++] = a.z, e[i++] = a.w
				}
				return this
			},
			set: function(t, r) {
				return void 0 === r && (r = 0), this.array.set(t, r), this
			},
			getX: function(t) {
				return this.array[t * this.itemSize]
			},
			setX: function(t, r) {
				return this.array[t * this.itemSize] = r, this
			},
			getY: function(t) {
				return this.array[t * this.itemSize + 1]
			},
			setY: function(t, r) {
				return this.array[t * this.itemSize + 1] = r, this
			},
			getZ: function(t) {
				return this.array[t * this.itemSize + 2]
			},
			setZ: function(t, r) {
				return this.array[t * this.itemSize + 2] = r, this
			},
			getW: function(t) {
				return this.array[t * this.itemSize + 3]
			},
			setW: function(t, r) {
				return this.array[t * this.itemSize + 3] = r, this
			},
			setXY: function(t, r, e) {
				return t *= this.itemSize, this.array[t + 0] = r, this.array[t + 1] = e, this
			},
			setXYZ: function(t, r, e, i) {
				return t *= this.itemSize, this.array[t + 0] = r, this.array[t + 1] = e, this.array[t + 2] = i, this
			},
			setXYZW: function(t, r, e, i, o) {
				return t *= this.itemSize, this.array[t + 0] = r, this.array[t + 1] = e, this.array[t + 2] = i, this.array[t + 3] = o, this
			},
			onUpload: function(t) {
				return this.onUploadCallback = t, this
			},
			clone: function() {
				return new this.constructor(this.array, this.itemSize).copy(this)
			}
		}), n.prototype = Object.create(o.prototype), n.prototype.constructor = n, a.prototype = Object.create(o.prototype), a.prototype.constructor = a, s.prototype = Object.create(o.prototype), s.prototype.constructor = s, c.prototype = Object.create(o.prototype), c.prototype.constructor = c, u.prototype = Object.create(o.prototype), u.prototype.constructor = u, y.prototype = Object.create(o.prototype), y.prototype.constructor = y, h.prototype = Object.create(o.prototype), h.prototype.constructor = h, p.prototype = Object.create(o.prototype), p.prototype.constructor = p, f.prototype = Object.create(o.prototype), f.prototype.constructor = f;
	}, {
		"../math/Vector4.js": "PTKN",
		"../math/Vector3.js": "QLQv",
		"../math/Vector2.js": "vOoB",
		"../math/Color.js": "TFdP"
	}],
	"mLvc": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.DirectGeometry = t;
		var e = require("../math/Vector2.js");

		function t() {
			this.vertices = [], this.normals = [], this.colors = [], this.uvs = [], this.uvs2 = [], this.groups = [], this.morphTargets = {}, this.skinWeights = [], this.skinIndices = [], this.boundingBox = null, this.boundingSphere = null, this.verticesNeedUpdate = !1, this.normalsNeedUpdate = !1, this.colorsNeedUpdate = !1, this.uvsNeedUpdate = !1, this.groupsNeedUpdate = !1
		}
		Object.assign(t.prototype, {
			computeGroups: function(e) {
				for (var t, s = [], r = void 0, o = e.faces, i = 0; i < o.length; i++) {
					var a = o[i];
					a.materialIndex !== r && (r = a.materialIndex, void 0 !== t && (t.count = 3 * i - t.start, s.push(t)), t = {
						start: 3 * i,
						materialIndex: r
					})
				}
				void 0 !== t && (t.count = 3 * i - t.start, s.push(t)), this.groups = s
			},
			fromGeometry: function(t) {
				var s, r = t.faces,
					o = t.vertices,
					i = t.faceVertexUvs,
					a = i[0] && i[0].length > 0,
					h = i[1] && i[1].length > 0,
					n = t.morphTargets,
					d = n.length;
				if (d > 0) {
					s = [];
					for (var p = 0; p < d; p++) s[p] = {
						name: n[p].name,
						data: []
					};
					this.morphTargets.position = s
				}
				var c, l = t.morphNormals,
					u = l.length;
				if (u > 0) {
					c = [];
					for (p = 0; p < u; p++) c[p] = {
						name: l[p].name,
						data: []
					};
					this.morphTargets.normal = c
				}
				var v = t.skinIndices,
					m = t.skinWeights,
					g = v.length === o.length,
					f = m.length === o.length;
				o.length > 0 && 0 === r.length && console.error("THREE.DirectGeometry: Faceless geometries are not supported.");
				for (p = 0; p < r.length; p++) {
					var U = r[p];
					this.vertices.push(o[U.a], o[U.b], o[U.c]);
					var N = U.vertexNormals;
					if (3 === N.length) this.normals.push(N[0], N[1], N[2]);
					else {
						var x = U.normal;
						this.normals.push(x, x, x)
					}
					var b, y = U.vertexColors;
					if (3 === y.length) this.colors.push(y[0], y[1], y[2]);
					else {
						var G = U.color;
						this.colors.push(G, G, G)
					}
					if (!0 === a) void 0 !== (b = i[0][p]) ? this.uvs.push(b[0], b[1], b[2]) : (console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv ", p), this.uvs.push(new e.Vector2, new e.Vector2, new e.Vector2));
					if (!0 === h) void 0 !== (b = i[1][p]) ? this.uvs2.push(b[0], b[1], b[2]) : (console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv2 ", p), this.uvs2.push(new e.Vector2, new e.Vector2, new e.Vector2));
					for (var w = 0; w < d; w++) {
						var V = n[w].vertices;
						s[w].data.push(V[U.a], V[U.b], V[U.c])
					}
					for (w = 0; w < u; w++) {
						var T = l[w].vertexNormals[p];
						c[w].data.push(T.a, T.b, T.c)
					}
					g && this.skinIndices.push(v[U.a], v[U.b], v[U.c]), f && this.skinWeights.push(m[U.a], m[U.b], m[U.c])
				}
				return this.computeGroups(t), this.verticesNeedUpdate = t.verticesNeedUpdate, this.normalsNeedUpdate = t.normalsNeedUpdate, this.colorsNeedUpdate = t.colorsNeedUpdate, this.uvsNeedUpdate = t.uvsNeedUpdate, this.groupsNeedUpdate = t.groupsNeedUpdate, this
			}
		});
	}, {
		"../math/Vector2.js": "vOoB"
	}],
	"51SM": [function(require, module, exports) {
		"use strict";

		function r(r) {
			if (0 === r.length) return 1 / 0;
			for (var e = r[0], t = 1, n = r.length; t < n; ++t) r[t] < e && (e = r[t]);
			return e
		}

		function e(r) {
			if (0 === r.length) return -1 / 0;
			for (var e = r[0], t = 1, n = r.length; t < n; ++t) r[t] > e && (e = r[t]);
			return e
		}
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.arrayMin = r, exports.arrayMax = e;
	}, {}],
	"UUET": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.BufferGeometry = c;
		var t = require("../math/Vector3.js"),
			e = require("../math/Box3.js"),
			r = require("./EventDispatcher.js"),
			i = require("./BufferAttribute.js"),
			n = require("../math/Sphere.js"),
			o = require("./DirectGeometry.js"),
			a = require("./Object3D.js"),
			s = require("../math/Matrix4.js"),
			u = require("../math/Matrix3.js"),
			d = require("../math/Math.js"),
			h = require("../utils.js"),
			l = 1;

		function c() {
			Object.defineProperty(this, "id", {
				value: l += 2
			}), this.uuid = d._Math.generateUUID(), this.name = "", this.type = "BufferGeometry", this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = {
				start: 0,
				count: 1 / 0
			}, this.userData = {}
		}
		c.prototype = Object.assign(Object.create(r.EventDispatcher.prototype), {
			constructor: c,
			isBufferGeometry: !0,
			getIndex: function() {
				return this.index
			},
			setIndex: function(t) {
				Array.isArray(t) ? this.index = new((0, h.arrayMax)(t) > 65535 ? i.Uint32BufferAttribute : i.Uint16BufferAttribute)(t, 1) : this.index = t
			},
			addAttribute: function(t, e) {
				return e && e.isBufferAttribute || e && e.isInterleavedBufferAttribute ? "index" === t ? (console.warn("THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute."), this.setIndex(e), this) : (this.attributes[t] = e, this) : (console.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."), this.addAttribute(t, new i.BufferAttribute(arguments[1], arguments[2])))
			},
			getAttribute: function(t) {
				return this.attributes[t]
			},
			removeAttribute: function(t) {
				return delete this.attributes[t], this
			},
			addGroup: function(t, e, r) {
				this.groups.push({
					start: t,
					count: e,
					materialIndex: void 0 !== r ? r : 0
				})
			},
			clearGroups: function() {
				this.groups = []
			},
			setDrawRange: function(t, e) {
				this.drawRange.start = t, this.drawRange.count = e
			},
			applyMatrix: function(t) {
				var e = this.attributes.position;
				void 0 !== e && (t.applyToBufferAttribute(e), e.needsUpdate = !0);
				var r = this.attributes.normal;
				void 0 !== r && ((new u.Matrix3).getNormalMatrix(t).applyToBufferAttribute(r), r.needsUpdate = !0);
				return null !== this.boundingBox && this.computeBoundingBox(), null !== this.boundingSphere && this.computeBoundingSphere(), this
			},
			rotateX: function() {
				var t = new s.Matrix4;
				return function(e) {
					return t.makeRotationX(e), this.applyMatrix(t), this
				}
			}(),
			rotateY: function() {
				var t = new s.Matrix4;
				return function(e) {
					return t.makeRotationY(e), this.applyMatrix(t), this
				}
			}(),
			rotateZ: function() {
				var t = new s.Matrix4;
				return function(e) {
					return t.makeRotationZ(e), this.applyMatrix(t), this
				}
			}(),
			translate: function() {
				var t = new s.Matrix4;
				return function(e, r, i) {
					return t.makeTranslation(e, r, i), this.applyMatrix(t), this
				}
			}(),
			scale: function() {
				var t = new s.Matrix4;
				return function(e, r, i) {
					return t.makeScale(e, r, i), this.applyMatrix(t), this
				}
			}(),
			lookAt: function() {
				var t = new a.Object3D;
				return function(e) {
					t.lookAt(e), t.updateMatrix(), this.applyMatrix(t.matrix)
				}
			}(),
			center: function() {
				var e = new t.Vector3;
				return function() {
					return this.computeBoundingBox(), this.boundingBox.getCenter(e).negate(), this.translate(e.x, e.y, e.z), this
				}
			}(),
			setFromObject: function(t) {
				var e = t.geometry;
				if (t.isPoints || t.isLine) {
					var r = new i.Float32BufferAttribute(3 * e.vertices.length, 3),
						n = new i.Float32BufferAttribute(3 * e.colors.length, 3);
					if (this.addAttribute("position", r.copyVector3sArray(e.vertices)), this.addAttribute("color", n.copyColorsArray(e.colors)), e.lineDistances && e.lineDistances.length === e.vertices.length) {
						var o = new i.Float32BufferAttribute(e.lineDistances.length, 1);
						this.addAttribute("lineDistance", o.copyArray(e.lineDistances))
					}
					null !== e.boundingSphere && (this.boundingSphere = e.boundingSphere.clone()), null !== e.boundingBox && (this.boundingBox = e.boundingBox.clone())
				} else t.isMesh && e && e.isGeometry && this.fromGeometry(e);
				return this
			},
			setFromPoints: function(t) {
				for (var e = [], r = 0, n = t.length; r < n; r++) {
					var o = t[r];
					e.push(o.x, o.y, o.z || 0)
				}
				return this.addAttribute("position", new i.Float32BufferAttribute(e, 3)), this
			},
			updateFromObject: function(t) {
				var e, r = t.geometry;
				if (t.isMesh) {
					var i = r.__directGeometry;
					if (!0 === r.elementsNeedUpdate && (i = void 0, r.elementsNeedUpdate = !1), void 0 === i) return this.fromGeometry(r);
					i.verticesNeedUpdate = r.verticesNeedUpdate, i.normalsNeedUpdate = r.normalsNeedUpdate, i.colorsNeedUpdate = r.colorsNeedUpdate, i.uvsNeedUpdate = r.uvsNeedUpdate, i.groupsNeedUpdate = r.groupsNeedUpdate, r.verticesNeedUpdate = !1, r.normalsNeedUpdate = !1, r.colorsNeedUpdate = !1, r.uvsNeedUpdate = !1, r.groupsNeedUpdate = !1, r = i
				}
				return !0 === r.verticesNeedUpdate && (void 0 !== (e = this.attributes.position) && (e.copyVector3sArray(r.vertices), e.needsUpdate = !0), r.verticesNeedUpdate = !1), !0 === r.normalsNeedUpdate && (void 0 !== (e = this.attributes.normal) && (e.copyVector3sArray(r.normals), e.needsUpdate = !0), r.normalsNeedUpdate = !1), !0 === r.colorsNeedUpdate && (void 0 !== (e = this.attributes.color) && (e.copyColorsArray(r.colors), e.needsUpdate = !0), r.colorsNeedUpdate = !1), r.uvsNeedUpdate && (void 0 !== (e = this.attributes.uv) && (e.copyVector2sArray(r.uvs), e.needsUpdate = !0), r.uvsNeedUpdate = !1), r.lineDistancesNeedUpdate && (void 0 !== (e = this.attributes.lineDistance) && (e.copyArray(r.lineDistances), e.needsUpdate = !0), r.lineDistancesNeedUpdate = !1), r.groupsNeedUpdate && (r.computeGroups(t.geometry), this.groups = r.groups, r.groupsNeedUpdate = !1), this
			},
			fromGeometry: function(t) {
				return t.__directGeometry = (new o.DirectGeometry).fromGeometry(t), this.fromDirectGeometry(t.__directGeometry)
			},
			fromDirectGeometry: function(t) {
				var e = new Float32Array(3 * t.vertices.length);
				if (this.addAttribute("position", new i.BufferAttribute(e, 3).copyVector3sArray(t.vertices)), t.normals.length > 0) {
					var r = new Float32Array(3 * t.normals.length);
					this.addAttribute("normal", new i.BufferAttribute(r, 3).copyVector3sArray(t.normals))
				}
				if (t.colors.length > 0) {
					var n = new Float32Array(3 * t.colors.length);
					this.addAttribute("color", new i.BufferAttribute(n, 3).copyColorsArray(t.colors))
				}
				if (t.uvs.length > 0) {
					var o = new Float32Array(2 * t.uvs.length);
					this.addAttribute("uv", new i.BufferAttribute(o, 2).copyVector2sArray(t.uvs))
				}
				if (t.uvs2.length > 0) {
					var a = new Float32Array(2 * t.uvs2.length);
					this.addAttribute("uv2", new i.BufferAttribute(a, 2).copyVector2sArray(t.uvs2))
				}
				for (var s in this.groups = t.groups, t.morphTargets) {
					for (var u = [], d = t.morphTargets[s], h = 0, l = d.length; h < l; h++) {
						var c = d[h],
							p = new i.Float32BufferAttribute(3 * c.data.length, 3);
						p.name = c.name, u.push(p.copyVector3sArray(c.data))
					}
					this.morphAttributes[s] = u
				}
				if (t.skinIndices.length > 0) {
					var f = new i.Float32BufferAttribute(4 * t.skinIndices.length, 4);
					this.addAttribute("skinIndex", f.copyVector4sArray(t.skinIndices))
				}
				if (t.skinWeights.length > 0) {
					var m = new i.Float32BufferAttribute(4 * t.skinWeights.length, 4);
					this.addAttribute("skinWeight", m.copyVector4sArray(t.skinWeights))
				}
				return null !== t.boundingSphere && (this.boundingSphere = t.boundingSphere.clone()), null !== t.boundingBox && (this.boundingBox = t.boundingBox.clone()), this
			},
			computeBoundingBox: function() {
				null === this.boundingBox && (this.boundingBox = new e.Box3);
				var t = this.attributes.position;
				void 0 !== t ? this.boundingBox.setFromBufferAttribute(t) : this.boundingBox.makeEmpty(), (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this)
			},
			computeBoundingSphere: function() {
				var r = new e.Box3,
					i = new t.Vector3;
				return function() {
					null === this.boundingSphere && (this.boundingSphere = new n.Sphere);
					var t = this.attributes.position;
					if (t) {
						var e = this.boundingSphere.center;
						r.setFromBufferAttribute(t), r.getCenter(e);
						for (var o = 0, a = 0, s = t.count; a < s; a++) i.x = t.getX(a), i.y = t.getY(a), i.z = t.getZ(a), o = Math.max(o, e.distanceToSquared(i));
						this.boundingSphere.radius = Math.sqrt(o), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this)
					}
				}
			}(),
			computeFaceNormals: function() {},
			computeVertexNormals: function() {
				var e = this.index,
					r = this.attributes;
				if (r.position) {
					var n = r.position.array;
					if (void 0 === r.normal) this.addAttribute("normal", new i.BufferAttribute(new Float32Array(n.length), 3));
					else
						for (var o = r.normal.array, a = 0, s = o.length; a < s; a++) o[a] = 0;
					var u, d, h, l = r.normal.array,
						c = new t.Vector3,
						p = new t.Vector3,
						f = new t.Vector3,
						m = new t.Vector3,
						y = new t.Vector3;
					if (e) {
						var g = e.array;
						for (a = 0, s = e.count; a < s; a += 3) u = 3 * g[a + 0], d = 3 * g[a + 1], h = 3 * g[a + 2], c.fromArray(n, u), p.fromArray(n, d), f.fromArray(n, h), m.subVectors(f, p), y.subVectors(c, p), m.cross(y), l[u] += m.x, l[u + 1] += m.y, l[u + 2] += m.z, l[d] += m.x, l[d + 1] += m.y, l[d + 2] += m.z, l[h] += m.x, l[h + 1] += m.y, l[h + 2] += m.z
					} else
						for (a = 0, s = n.length; a < s; a += 9) c.fromArray(n, a), p.fromArray(n, a + 3), f.fromArray(n, a + 6), m.subVectors(f, p), y.subVectors(c, p), m.cross(y), l[a] = m.x, l[a + 1] = m.y, l[a + 2] = m.z, l[a + 3] = m.x, l[a + 4] = m.y, l[a + 5] = m.z, l[a + 6] = m.x, l[a + 7] = m.y, l[a + 8] = m.z;
					this.normalizeNormals(), r.normal.needsUpdate = !0
				}
			},
			merge: function(t, e) {
				if (t && t.isBufferGeometry) {
					void 0 === e && (e = 0, console.warn("THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge."));
					var r = this.attributes;
					for (var i in r)
						if (void 0 !== t.attributes[i])
							for (var n = r[i].array, o = t.attributes[i], a = o.array, s = 0, u = o.itemSize * e; s < a.length; s++, u++) n[u] = a[s];
					return this
				}
				console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.", t)
			},
			normalizeNormals: function() {
				var e = new t.Vector3;
				return function() {
					for (var t = this.attributes.normal, r = 0, i = t.count; r < i; r++) e.x = t.getX(r), e.y = t.getY(r), e.z = t.getZ(r), e.normalize(), t.setXYZ(r, e.x, e.y, e.z)
				}
			}(),
			toNonIndexed: function() {
				function t(t, e) {
					for (var r = t.array, n = t.itemSize, o = new r.constructor(e.length * n), a = 0, s = 0, u = 0, d = e.length; u < d; u++) {
						a = e[u] * n;
						for (var h = 0; h < n; h++) o[s++] = r[a++]
					}
					return new i.BufferAttribute(o, n)
				}
				if (null === this.index) return console.warn("THREE.BufferGeometry.toNonIndexed(): Geometry is already non-indexed."), this;
				var e = new c,
					r = this.index.array,
					n = this.attributes;
				for (var o in n) {
					var a = t(n[o], r);
					e.addAttribute(o, a)
				}
				var s = this.morphAttributes;
				for (o in s) {
					for (var u = [], d = s[o], h = 0, l = d.length; h < l; h++) {
						a = t(d[h], r);
						u.push(a)
					}
					e.morphAttributes[o] = u
				}
				for (var p = this.groups, f = (h = 0, p.length); h < f; h++) {
					var m = p[h];
					e.addGroup(m.start, m.count, m.materialIndex)
				}
				return e
			},
			toJSON: function() {
				var t = {
					metadata: {
						version: 4.5,
						type: "BufferGeometry",
						generator: "BufferGeometry.toJSON"
					}
				};
				if (t.uuid = this.uuid, t.type = this.type, "" !== this.name && (t.name = this.name), Object.keys(this.userData).length > 0 && (t.userData = this.userData), void 0 !== this.parameters) {
					var e = this.parameters;
					for (var r in e) void 0 !== e[r] && (t[r] = e[r]);
					return t
				}
				t.data = {
					attributes: {}
				};
				var i = this.index;
				if (null !== i) {
					var n = Array.prototype.slice.call(i.array);
					t.data.index = {
						type: i.array.constructor.name,
						array: n
					}
				}
				var o = this.attributes;
				for (var r in o) {
					var a = o[r];
					n = Array.prototype.slice.call(a.array);
					t.data.attributes[r] = {
						itemSize: a.itemSize,
						type: a.array.constructor.name,
						array: n,
						normalized: a.normalized
					}
				}
				var s = this.groups;
				s.length > 0 && (t.data.groups = JSON.parse(JSON.stringify(s)));
				var u = this.boundingSphere;
				return null !== u && (t.data.boundingSphere = {
					center: u.center.toArray(),
					radius: u.radius
				}), t
			},
			clone: function() {
				return (new c).copy(this)
			},
			copy: function(t) {
				var e, r, i;
				this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.name = t.name;
				var n = t.index;
				null !== n && this.setIndex(n.clone());
				var o = t.attributes;
				for (e in o) {
					var a = o[e];
					this.addAttribute(e, a.clone())
				}
				var s = t.morphAttributes;
				for (e in s) {
					var u = [],
						d = s[e];
					for (r = 0, i = d.length; r < i; r++) u.push(d[r].clone());
					this.morphAttributes[e] = u
				}
				var h = t.groups;
				for (r = 0, i = h.length; r < i; r++) {
					var l = h[r];
					this.addGroup(l.start, l.count, l.materialIndex)
				}
				var c = t.boundingBox;
				null !== c && (this.boundingBox = c.clone());
				var p = t.boundingSphere;
				return null !== p && (this.boundingSphere = p.clone()), this.drawRange.start = t.drawRange.start, this.drawRange.count = t.drawRange.count, this.userData = t.userData, this
			},
			dispose: function() {
				this.dispatchEvent({
					type: "dispose"
				})
			}
		});
	}, {
		"../math/Vector3.js": "QLQv",
		"../math/Box3.js": "Xu2q",
		"./EventDispatcher.js": "SLlv",
		"./BufferAttribute.js": "v7ZT",
		"../math/Sphere.js": "Jw30",
		"./DirectGeometry.js": "mLvc",
		"./Object3D.js": "Nnue",
		"../math/Matrix4.js": "QUid",
		"../math/Matrix3.js": "ecXo",
		"../math/Math.js": "M5nx",
		"../utils.js": "51SM"
	}],
	"NcD6": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.BoxGeometry = s, exports.BoxBufferGeometry = i;
		var e = require("../core/Geometry.js"),
			t = require("../core/BufferGeometry.js"),
			r = require("../core/BufferAttribute.js"),
			o = require("../math/Vector3.js");

		function s(t, r, o, s, h, u) {
			e.Geometry.call(this), this.type = "BoxGeometry", this.parameters = {
				width: t,
				height: r,
				depth: o,
				widthSegments: s,
				heightSegments: h,
				depthSegments: u
			}, this.fromBufferGeometry(new i(t, r, o, s, h, u)), this.mergeVertices()
		}

		function i(e, s, i, h, u, f) {
			t.BufferGeometry.call(this), this.type = "BoxBufferGeometry", this.parameters = {
				width: e,
				height: s,
				depth: i,
				widthSegments: h,
				heightSegments: u,
				depthSegments: f
			};
			var p = this;
			e = e || 1, s = s || 1, i = i || 1, h = Math.floor(h) || 1, u = Math.floor(u) || 1, f = Math.floor(f) || 1;
			var a = [],
				y = [],
				m = [],
				n = [],
				c = 0,
				d = 0;

			function x(e, t, r, s, i, h, u, f, x, B, l) {
				var G, g, b = h / x,
					v = u / B,
					w = h / 2,
					z = u / 2,
					j = f / 2,
					A = x + 1,
					S = B + 1,
					q = 0,
					M = 0,
					F = new o.Vector3;
				for (g = 0; g < S; g++) {
					var O = g * v - z;
					for (G = 0; G < A; G++) {
						var V = G * b - w;
						F[e] = V * s, F[t] = O * i, F[r] = j, y.push(F.x, F.y, F.z), F[e] = 0, F[t] = 0, F[r] = f > 0 ? 1 : -1, m.push(F.x, F.y, F.z), n.push(G / x), n.push(1 - g / B), q += 1
					}
				}
				for (g = 0; g < B; g++)
					for (G = 0; G < x; G++) {
						var _ = c + G + A * g,
							I = c + G + A * (g + 1),
							P = c + (G + 1) + A * (g + 1),
							k = c + (G + 1) + A * g;
						a.push(_, I, k), a.push(I, P, k), M += 6
					}
				p.addGroup(d, M, l), d += M, c += q
			}
			x("z", "y", "x", -1, -1, i, s, e, f, u, 0), x("z", "y", "x", 1, -1, i, s, -e, f, u, 1), x("x", "z", "y", 1, 1, e, i, s, h, f, 2), x("x", "z", "y", 1, -1, e, i, -s, h, f, 3), x("x", "y", "z", 1, -1, e, s, i, h, u, 4), x("x", "y", "z", -1, -1, e, s, -i, h, u, 5), this.setIndex(a), this.addAttribute("position", new r.Float32BufferAttribute(y, 3)), this.addAttribute("normal", new r.Float32BufferAttribute(m, 3)), this.addAttribute("uv", new r.Float32BufferAttribute(n, 2))
		}
		s.prototype = Object.create(e.Geometry.prototype), s.prototype.constructor = s, i.prototype = Object.create(t.BufferGeometry.prototype), i.prototype.constructor = i;
	}, {
		"../core/Geometry.js": "RhDg",
		"../core/BufferGeometry.js": "UUET",
		"../core/BufferAttribute.js": "v7ZT",
		"../math/Vector3.js": "QLQv"
	}],
	"TPAv": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.PlaneGeometry = o, exports.PlaneBufferGeometry = s;
		var e = require("../core/Geometry.js"),
			t = require("../core/BufferGeometry.js"),
			r = require("../core/BufferAttribute.js");

		function o(t, r, o, i) {
			e.Geometry.call(this), this.type = "PlaneGeometry", this.parameters = {
				width: t,
				height: r,
				widthSegments: o,
				heightSegments: i
			}, this.fromBufferGeometry(new s(t, r, o, i)), this.mergeVertices()
		}

		function s(e, o, s, i) {
			t.BufferGeometry.call(this), this.type = "PlaneBufferGeometry", this.parameters = {
				width: e,
				height: o,
				widthSegments: s,
				heightSegments: i
			};
			var u, h, f = (e = e || 1) / 2,
				a = (o = o || 1) / 2,
				p = Math.floor(s) || 1,
				n = Math.floor(i) || 1,
				m = p + 1,
				y = n + 1,
				c = e / p,
				l = o / n,
				d = [],
				G = [],
				b = [],
				B = [];
			for (h = 0; h < y; h++) {
				var g = h * l - a;
				for (u = 0; u < m; u++) {
					var w = u * c - f;
					G.push(w, -g, 0), b.push(0, 0, 1), B.push(u / p), B.push(1 - h / n)
				}
			}
			for (h = 0; h < n; h++)
				for (u = 0; u < p; u++) {
					var v = u + m * h,
						A = u + m * (h + 1),
						j = u + 1 + m * (h + 1),
						P = u + 1 + m * h;
					d.push(v, A, P), d.push(A, j, P)
				}
			this.setIndex(d), this.addAttribute("position", new r.Float32BufferAttribute(G, 3)), this.addAttribute("normal", new r.Float32BufferAttribute(b, 3)), this.addAttribute("uv", new r.Float32BufferAttribute(B, 2))
		}
		o.prototype = Object.create(e.Geometry.prototype), o.prototype.constructor = o, s.prototype = Object.create(t.BufferGeometry.prototype), s.prototype.constructor = s;
	}, {
		"../core/Geometry.js": "RhDg",
		"../core/BufferGeometry.js": "UUET",
		"../core/BufferAttribute.js": "v7ZT"
	}],
	"xEl1": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.Material = a;
		var i = require("../core/EventDispatcher.js"),
			t = require("../constants.js"),
			s = require("../math/Math.js"),
			e = 0;

		function a() {
			Object.defineProperty(this, "id", {
				value: e++
			}), this.uuid = s._Math.generateUUID(), this.name = "", this.type = "Material", this.fog = !0, this.lights = !0, this.blending = t.NormalBlending, this.side = t.FrontSide, this.flatShading = !1, this.vertexColors = t.NoColors, this.opacity = 1, this.transparent = !1, this.blendSrc = t.SrcAlphaFactor, this.blendDst = t.OneMinusSrcAlphaFactor, this.blendEquation = t.AddEquation, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.depthFunc = t.LessEqualDepth, this.depthTest = !0, this.depthWrite = !0, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaTest = 0, this.premultipliedAlpha = !1, this.visible = !0, this.userData = {}, this.needsUpdate = !0
		}
		a.prototype = Object.assign(Object.create(i.EventDispatcher.prototype), {
			constructor: a,
			isMaterial: !0,
			onBeforeCompile: function() {},
			setValues: function(i) {
				if (void 0 !== i)
					for (var s in i) {
						var e = i[s];
						if (void 0 !== e)
							if ("shading" !== s) {
								var a = this[s];
								void 0 !== a ? a && a.isColor ? a.set(e) : a && a.isVector3 && e && e.isVector3 ? a.copy(e) : this[s] = e : console.warn("THREE." + this.type + ": '" + s + "' is not a property of this material.")
							} else console.warn("THREE." + this.type + ": .shading has been removed. Use the boolean .flatShading instead."), this.flatShading = e === t.FlatShading;
						else console.warn("THREE.Material: '" + s + "' parameter is undefined.")
					}
			},
			toJSON: function(i) {
				var s = void 0 === i || "string" == typeof i;
				s && (i = {
					textures: {},
					images: {}
				});
				var e = {
					metadata: {
						version: 4.5,
						type: "Material",
						generator: "Material.toJSON"
					}
				};

				function a(i) {
					var t = [];
					for (var s in i) {
						var e = i[s];
						delete e.metadata, t.push(e)
					}
					return t
				}
				if (e.uuid = this.uuid, e.type = this.type, "" !== this.name && (e.name = this.name), this.color && this.color.isColor && (e.color = this.color.getHex()), void 0 !== this.roughness && (e.roughness = this.roughness), void 0 !== this.metalness && (e.metalness = this.metalness), this.emissive && this.emissive.isColor && (e.emissive = this.emissive.getHex()), 1 !== this.emissiveIntensity && (e.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (e.specular = this.specular.getHex()), void 0 !== this.shininess && (e.shininess = this.shininess), void 0 !== this.clearCoat && (e.clearCoat = this.clearCoat), void 0 !== this.clearCoatRoughness && (e.clearCoatRoughness = this.clearCoatRoughness), this.map && this.map.isTexture && (e.map = this.map.toJSON(i).uuid), this.alphaMap && this.alphaMap.isTexture && (e.alphaMap = this.alphaMap.toJSON(i).uuid), this.lightMap && this.lightMap.isTexture && (e.lightMap = this.lightMap.toJSON(i).uuid), this.aoMap && this.aoMap.isTexture && (e.aoMap = this.aoMap.toJSON(i).uuid, e.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (e.bumpMap = this.bumpMap.toJSON(i).uuid, e.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (e.normalMap = this.normalMap.toJSON(i).uuid, e.normalMapType = this.normalMapType, e.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (e.displacementMap = this.displacementMap.toJSON(i).uuid, e.displacementScale = this.displacementScale, e.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (e.roughnessMap = this.roughnessMap.toJSON(i).uuid), this.metalnessMap && this.metalnessMap.isTexture && (e.metalnessMap = this.metalnessMap.toJSON(i).uuid), this.emissiveMap && this.emissiveMap.isTexture && (e.emissiveMap = this.emissiveMap.toJSON(i).uuid), this.specularMap && this.specularMap.isTexture && (e.specularMap = this.specularMap.toJSON(i).uuid), this.envMap && this.envMap.isTexture && (e.envMap = this.envMap.toJSON(i).uuid, e.reflectivity = this.reflectivity, void 0 !== this.combine && (e.combine = this.combine), void 0 !== this.envMapIntensity && (e.envMapIntensity = this.envMapIntensity)), this.gradientMap && this.gradientMap.isTexture && (e.gradientMap = this.gradientMap.toJSON(i).uuid), void 0 !== this.size && (e.size = this.size), void 0 !== this.sizeAttenuation && (e.sizeAttenuation = this.sizeAttenuation), this.blending !== t.NormalBlending && (e.blending = this.blending), !0 === this.flatShading && (e.flatShading = this.flatShading), this.side !== t.FrontSide && (e.side = this.side), this.vertexColors !== t.NoColors && (e.vertexColors = this.vertexColors), this.opacity < 1 && (e.opacity = this.opacity), !0 === this.transparent && (e.transparent = this.transparent), e.depthFunc = this.depthFunc, e.depthTest = this.depthTest, e.depthWrite = this.depthWrite, 0 !== this.rotation && (e.rotation = this.rotation), !0 === this.polygonOffset && (e.polygonOffset = !0), 0 !== this.polygonOffsetFactor && (e.polygonOffsetFactor = this.polygonOffsetFactor), 0 !== this.polygonOffsetUnits && (e.polygonOffsetUnits = this.polygonOffsetUnits), 1 !== this.linewidth && (e.linewidth = this.linewidth), void 0 !== this.dashSize && (e.dashSize = this.dashSize), void 0 !== this.gapSize && (e.gapSize = this.gapSize), void 0 !== this.scale && (e.scale = this.scale), !0 === this.dithering && (e.dithering = !0), this.alphaTest > 0 && (e.alphaTest = this.alphaTest), !0 === this.premultipliedAlpha && (e.premultipliedAlpha = this.premultipliedAlpha), !0 === this.wireframe && (e.wireframe = this.wireframe), this.wireframeLinewidth > 1 && (e.wireframeLinewidth = this.wireframeLinewidth), "round" !== this.wireframeLinecap && (e.wireframeLinecap = this.wireframeLinecap), "round" !== this.wireframeLinejoin && (e.wireframeLinejoin = this.wireframeLinejoin), !0 === this.morphTargets && (e.morphTargets = !0), !0 === this.skinning && (e.skinning = !0), !1 === this.visible && (e.visible = !1), "{}" !== JSON.stringify(this.userData) && (e.userData = this.userData), s) {
					var h = a(i.textures),
						n = a(i.images);
					h.length > 0 && (e.textures = h), n.length > 0 && (e.images = n)
				}
				return e
			},
			clone: function() {
				return (new this.constructor).copy(this)
			},
			copy: function(i) {
				this.name = i.name, this.fog = i.fog, this.lights = i.lights, this.blending = i.blending, this.side = i.side, this.flatShading = i.flatShading, this.vertexColors = i.vertexColors, this.opacity = i.opacity, this.transparent = i.transparent, this.blendSrc = i.blendSrc, this.blendDst = i.blendDst, this.blendEquation = i.blendEquation, this.blendSrcAlpha = i.blendSrcAlpha, this.blendDstAlpha = i.blendDstAlpha, this.blendEquationAlpha = i.blendEquationAlpha, this.depthFunc = i.depthFunc, this.depthTest = i.depthTest, this.depthWrite = i.depthWrite, this.colorWrite = i.colorWrite, this.precision = i.precision, this.polygonOffset = i.polygonOffset, this.polygonOffsetFactor = i.polygonOffsetFactor, this.polygonOffsetUnits = i.polygonOffsetUnits, this.dithering = i.dithering, this.alphaTest = i.alphaTest, this.premultipliedAlpha = i.premultipliedAlpha, this.visible = i.visible, this.userData = JSON.parse(JSON.stringify(i.userData)), this.clipShadows = i.clipShadows, this.clipIntersection = i.clipIntersection;
				var t = i.clippingPlanes,
					s = null;
				if (null !== t) {
					var e = t.length;
					s = new Array(e);
					for (var a = 0; a !== e; ++a) s[a] = t[a].clone()
				}
				return this.clippingPlanes = s, this.shadowSide = i.shadowSide, this
			},
			dispose: function() {
				this.dispatchEvent({
					type: "dispose"
				})
			}
		});
	}, {
		"../core/EventDispatcher.js": "SLlv",
		"../constants.js": "y6Nk",
		"../math/Math.js": "M5nx"
	}],
	"Kxey": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.ShaderMaterial = i;
		var e = require("./Material.js"),
			t = require("../renderers/shaders/UniformsUtils.js");

		function i(t) {
			e.Material.call(this), this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.vertexShader = "void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}", this.fragmentShader = "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}", this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.extensions = {
				derivatives: !1,
				fragDepth: !1,
				drawBuffers: !1,
				shaderTextureLOD: !1
			}, this.defaultAttributeValues = {
				color: [1, 1, 1],
				uv: [0, 0],
				uv2: [0, 0]
			}, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, void 0 !== t && (void 0 !== t.attributes && console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."), this.setValues(t))
		}
		i.prototype = Object.create(e.Material.prototype), i.prototype.constructor = i, i.prototype.isShaderMaterial = !0, i.prototype.copy = function(i) {
			return e.Material.prototype.copy.call(this, i), this.fragmentShader = i.fragmentShader, this.vertexShader = i.vertexShader, this.uniforms = (0, t.cloneUniforms)(i.uniforms), this.defines = Object.assign({}, i.defines), this.wireframe = i.wireframe, this.wireframeLinewidth = i.wireframeLinewidth, this.lights = i.lights, this.clipping = i.clipping, this.skinning = i.skinning, this.morphTargets = i.morphTargets, this.morphNormals = i.morphNormals, this.extensions = i.extensions, this
		}, i.prototype.toJSON = function(t) {
			var i = e.Material.prototype.toJSON.call(this, t);
			for (var r in i.uniforms = {}, this.uniforms) {
				var s = this.uniforms[r].value;
				s && s.isTexture ? i.uniforms[r] = {
					type: "t",
					value: s.toJSON(t).uuid
				} : s && s.isColor ? i.uniforms[r] = {
					type: "c",
					value: s.getHex()
				} : s && s.isVector2 ? i.uniforms[r] = {
					type: "v2",
					value: s.toArray()
				} : s && s.isVector3 ? i.uniforms[r] = {
					type: "v3",
					value: s.toArray()
				} : s && s.isVector4 ? i.uniforms[r] = {
					type: "v4",
					value: s.toArray()
				} : s && s.isMatrix3 ? i.uniforms[r] = {
					type: "m3",
					value: s.toArray()
				} : s && s.isMatrix4 ? i.uniforms[r] = {
					type: "m4",
					value: s.toArray()
				} : i.uniforms[r] = {
					value: s
				}
			}
			Object.keys(this.defines).length > 0 && (i.defines = this.defines), i.vertexShader = this.vertexShader, i.fragmentShader = this.fragmentShader;
			var o = {};
			for (var a in this.extensions) !0 === this.extensions[a] && (o[a] = !0);
			return Object.keys(o).length > 0 && (i.extensions = o), i
		};
	}, {
		"./Material.js": "xEl1",
		"../renderers/shaders/UniformsUtils.js": "LbN/"
	}],
	"fISg": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.Ray = i;
		var t = require("./Vector3.js");

		function i(i, n) {
			this.origin = void 0 !== i ? i : new t.Vector3, this.direction = void 0 !== n ? n : new t.Vector3
		}
		Object.assign(i.prototype, {
			set: function(t, i) {
				return this.origin.copy(t), this.direction.copy(i), this
			},
			clone: function() {
				return (new this.constructor).copy(this)
			},
			copy: function(t) {
				return this.origin.copy(t.origin), this.direction.copy(t.direction), this
			},
			at: function(i, n) {
				return void 0 === n && (console.warn("THREE.Ray: .at() target is now required"), n = new t.Vector3), n.copy(this.direction).multiplyScalar(i).add(this.origin)
			},
			lookAt: function(t) {
				return this.direction.copy(t).sub(this.origin).normalize(), this
			},
			recast: function() {
				var i = new t.Vector3;
				return function(t) {
					return this.origin.copy(this.at(t, i)), this
				}
			}(),
			closestPointToPoint: function(i, n) {
				void 0 === n && (console.warn("THREE.Ray: .closestPointToPoint() target is now required"), n = new t.Vector3), n.subVectors(i, this.origin);
				var r = n.dot(this.direction);
				return r < 0 ? n.copy(this.origin) : n.copy(this.direction).multiplyScalar(r).add(this.origin)
			},
			distanceToPoint: function(t) {
				return Math.sqrt(this.distanceSqToPoint(t))
			},
			distanceSqToPoint: function() {
				var i = new t.Vector3;
				return function(t) {
					var n = i.subVectors(t, this.origin).dot(this.direction);
					return n < 0 ? this.origin.distanceToSquared(t) : (i.copy(this.direction).multiplyScalar(n).add(this.origin), i.distanceToSquared(t))
				}
			}(),
			distanceSqToSegment: function() {
				var i = new t.Vector3,
					n = new t.Vector3,
					r = new t.Vector3;
				return function(t, o, e, s) {
					i.copy(t).add(o).multiplyScalar(.5), n.copy(o).sub(t).normalize(), r.copy(this.origin).sub(i);
					var c, a, u, h, l = .5 * t.distanceTo(o),
						d = -this.direction.dot(n),
						f = r.dot(this.direction),
						y = -r.dot(n),
						m = r.lengthSq(),
						p = Math.abs(1 - d * d);
					if (p > 0)
						if (a = d * f - y, h = l * p, (c = d * y - f) >= 0)
							if (a >= -h)
								if (a <= h) {
									var g = 1 / p;
									u = (c *= g) * (c + d * (a *= g) + 2 * f) + a * (d * c + a + 2 * y) + m
								} else a = l, u = -(c = Math.max(0, -(d * a + f))) * c + a * (a + 2 * y) + m;
					else a = -l, u = -(c = Math.max(0, -(d * a + f))) * c + a * (a + 2 * y) + m;
					else a <= -h ? u = -(c = Math.max(0, -(-d * l + f))) * c + (a = c > 0 ? -l : Math.min(Math.max(-l, -y), l)) * (a + 2 * y) + m : a <= h ? (c = 0, u = (a = Math.min(Math.max(-l, -y), l)) * (a + 2 * y) + m) : u = -(c = Math.max(0, -(d * l + f))) * c + (a = c > 0 ? l : Math.min(Math.max(-l, -y), l)) * (a + 2 * y) + m;
					else a = d > 0 ? -l : l, u = -(c = Math.max(0, -(d * a + f))) * c + a * (a + 2 * y) + m;
					return e && e.copy(this.direction).multiplyScalar(c).add(this.origin), s && s.copy(n).multiplyScalar(a).add(i), u
				}
			}(),
			intersectSphere: function() {
				var i = new t.Vector3;
				return function(t, n) {
					i.subVectors(t.center, this.origin);
					var r = i.dot(this.direction),
						o = i.dot(i) - r * r,
						e = t.radius * t.radius;
					if (o > e) return null;
					var s = Math.sqrt(e - o),
						c = r - s,
						a = r + s;
					return c < 0 && a < 0 ? null : c < 0 ? this.at(a, n) : this.at(c, n)
				}
			}(),
			intersectsSphere: function(t) {
				return this.distanceSqToPoint(t.center) <= t.radius * t.radius
			},
			distanceToPlane: function(t) {
				var i = t.normal.dot(this.direction);
				if (0 === i) return 0 === t.distanceToPoint(this.origin) ? 0 : null;
				var n = -(this.origin.dot(t.normal) + t.constant) / i;
				return n >= 0 ? n : null
			},
			intersectPlane: function(t, i) {
				var n = this.distanceToPlane(t);
				return null === n ? null : this.at(n, i)
			},
			intersectsPlane: function(t) {
				var i = t.distanceToPoint(this.origin);
				return 0 === i || t.normal.dot(this.direction) * i < 0
			},
			intersectBox: function(t, i) {
				var n, r, o, e, s, c, a = 1 / this.direction.x,
					u = 1 / this.direction.y,
					h = 1 / this.direction.z,
					l = this.origin;
				return a >= 0 ? (n = (t.min.x - l.x) * a, r = (t.max.x - l.x) * a) : (n = (t.max.x - l.x) * a, r = (t.min.x - l.x) * a), u >= 0 ? (o = (t.min.y - l.y) * u, e = (t.max.y - l.y) * u) : (o = (t.max.y - l.y) * u, e = (t.min.y - l.y) * u), n > e || o > r ? null : ((o > n || n != n) && (n = o), (e < r || r != r) && (r = e), h >= 0 ? (s = (t.min.z - l.z) * h, c = (t.max.z - l.z) * h) : (s = (t.max.z - l.z) * h, c = (t.min.z - l.z) * h), n > c || s > r ? null : ((s > n || n != n) && (n = s), (c < r || r != r) && (r = c), r < 0 ? null : this.at(n >= 0 ? n : r, i)))
			},
			intersectsBox: function() {
				var i = new t.Vector3;
				return function(t) {
					return null !== this.intersectBox(t, i)
				}
			}(),
			intersectTriangle: function() {
				var i = new t.Vector3,
					n = new t.Vector3,
					r = new t.Vector3,
					o = new t.Vector3;
				return function(t, e, s, c, a) {
					n.subVectors(e, t), r.subVectors(s, t), o.crossVectors(n, r);
					var u, h = this.direction.dot(o);
					if (h > 0) {
						if (c) return null;
						u = 1
					} else {
						if (!(h < 0)) return null;
						u = -1, h = -h
					}
					i.subVectors(this.origin, t);
					var l = u * this.direction.dot(r.crossVectors(i, r));
					if (l < 0) return null;
					var d = u * this.direction.dot(n.cross(i));
					if (d < 0) return null;
					if (l + d > h) return null;
					var f = -u * i.dot(o);
					return f < 0 ? null : this.at(f / h, a)
				}
			}(),
			applyMatrix4: function(t) {
				return this.origin.applyMatrix4(t), this.direction.transformDirection(t), this
			},
			equals: function(t) {
				return t.origin.equals(this.origin) && t.direction.equals(this.direction)
			}
		});
	}, {
		"./Vector3.js": "QLQv"
	}],
	"cKHs": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.Triangle = e;
		var t = require("./Vector3.js");

		function e(e, r, o) {
			this.a = void 0 !== e ? e : new t.Vector3, this.b = void 0 !== r ? r : new t.Vector3, this.c = void 0 !== o ? o : new t.Vector3
		}
		Object.assign(e, {
			getNormal: function() {
				var e = new t.Vector3;
				return function(r, o, n, c) {
					void 0 === c && (console.warn("THREE.Triangle: .getNormal() target is now required"), c = new t.Vector3), c.subVectors(n, o), e.subVectors(r, o), c.cross(e);
					var i = c.lengthSq();
					return i > 0 ? c.multiplyScalar(1 / Math.sqrt(i)) : c.set(0, 0, 0)
				}
			}(),
			getBarycoord: function() {
				var e = new t.Vector3,
					r = new t.Vector3,
					o = new t.Vector3;
				return function(n, c, i, s, a) {
					e.subVectors(s, c), r.subVectors(i, c), o.subVectors(n, c);
					var u = e.dot(e),
						d = e.dot(r),
						h = e.dot(o),
						V = r.dot(r),
						l = r.dot(o),
						g = u * V - d * d;
					if (void 0 === a && (console.warn("THREE.Triangle: .getBarycoord() target is now required"), a = new t.Vector3), 0 === g) return a.set(-2, -1, -1);
					var f = 1 / g,
						w = (V * h - d * l) * f,
						b = (u * l - d * h) * f;
					return a.set(1 - w - b, b, w)
				}
			}(),
			containsPoint: function() {
				var r = new t.Vector3;
				return function(t, o, n, c) {
					return e.getBarycoord(t, o, n, c, r), r.x >= 0 && r.y >= 0 && r.x + r.y <= 1
				}
			}(),
			getUV: function() {
				var e = new t.Vector3;
				return function(t, r, o, n, c, i, s, a) {
					return this.getBarycoord(t, r, o, n, e), a.set(0, 0), a.addScaledVector(c, e.x), a.addScaledVector(i, e.y), a.addScaledVector(s, e.z), a
				}
			}()
		}), Object.assign(e.prototype, {
			set: function(t, e, r) {
				return this.a.copy(t), this.b.copy(e), this.c.copy(r), this
			},
			setFromPointsAndIndices: function(t, e, r, o) {
				return this.a.copy(t[e]), this.b.copy(t[r]), this.c.copy(t[o]), this
			},
			clone: function() {
				return (new this.constructor).copy(this)
			},
			copy: function(t) {
				return this.a.copy(t.a), this.b.copy(t.b), this.c.copy(t.c), this
			},
			getArea: function() {
				var e = new t.Vector3,
					r = new t.Vector3;
				return function() {
					return e.subVectors(this.c, this.b), r.subVectors(this.a, this.b), .5 * e.cross(r).length()
				}
			}(),
			getMidpoint: function(e) {
				return void 0 === e && (console.warn("THREE.Triangle: .getMidpoint() target is now required"), e = new t.Vector3), e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3)
			},
			getNormal: function(t) {
				return e.getNormal(this.a, this.b, this.c, t)
			},
			getPlane: function(e) {
				return void 0 === e && (console.warn("THREE.Triangle: .getPlane() target is now required"), e = new t.Vector3), e.setFromCoplanarPoints(this.a, this.b, this.c)
			},
			getBarycoord: function(t, r) {
				return e.getBarycoord(t, this.a, this.b, this.c, r)
			},
			containsPoint: function(t) {
				return e.containsPoint(t, this.a, this.b, this.c)
			},
			getUV: function(t, r, o, n, c) {
				return e.getUV(t, this.a, this.b, this.c, r, o, n, c)
			},
			intersectsBox: function(t) {
				return t.intersectsTriangle(this)
			},
			closestPointToPoint: function() {
				var e = new t.Vector3,
					r = new t.Vector3,
					o = new t.Vector3,
					n = new t.Vector3,
					c = new t.Vector3,
					i = new t.Vector3;
				return function(s, a) {
					void 0 === a && (console.warn("THREE.Triangle: .closestPointToPoint() target is now required"), a = new t.Vector3);
					var u, d, h = this.a,
						V = this.b,
						l = this.c;
					e.subVectors(V, h), r.subVectors(l, h), n.subVectors(s, h);
					var g = e.dot(n),
						f = r.dot(n);
					if (g <= 0 && f <= 0) return a.copy(h);
					c.subVectors(s, V);
					var w = e.dot(c),
						b = r.dot(c);
					if (w >= 0 && b <= w) return a.copy(V);
					var y = g * b - w * f;
					if (y <= 0 && g >= 0 && w <= 0) return u = g / (g - w), a.copy(h).addScaledVector(e, u);
					i.subVectors(s, l);
					var p = e.dot(i),
						v = r.dot(i);
					if (v >= 0 && p <= v) return a.copy(l);
					var T = p * f - g * v;
					if (T <= 0 && f >= 0 && v <= 0) return d = f / (f - v), a.copy(h).addScaledVector(r, d);
					var q = w * v - p * b;
					if (q <= 0 && b - w >= 0 && p - v >= 0) return o.subVectors(l, V), d = (b - w) / (b - w + (p - v)), a.copy(V).addScaledVector(o, d);
					var P = 1 / (q + T + y);
					return u = T * P, d = y * P, a.copy(h).addScaledVector(e, u).addScaledVector(r, d)
				}
			}(),
			equals: function(t) {
				return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c)
			}
		});
	}, {
		"./Vector3.js": "QLQv"
	}],
	"5+Do": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.MeshBasicMaterial = a;
		var i = require("./Material.js"),
			t = require("../constants.js"),
			e = require("../math/Color.js");

		function a(a) {
			i.Material.call(this), this.type = "MeshBasicMaterial", this.color = new e.Color(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = t.MultiplyOperation, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.skinning = !1, this.morphTargets = !1, this.lights = !1, this.setValues(a)
		}
		a.prototype = Object.create(i.Material.prototype), a.prototype.constructor = a, a.prototype.isMeshBasicMaterial = !0, a.prototype.copy = function(t) {
			return i.Material.prototype.copy.call(this, t), this.color.copy(t.color), this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.combine = t.combine, this.reflectivity = t.reflectivity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.skinning = t.skinning, this.morphTargets = t.morphTargets, this
		};
	}, {
		"./Material.js": "xEl1",
		"../constants.js": "y6Nk",
		"../math/Color.js": "TFdP"
	}],
	"RvMr": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.Mesh = f;
		var e = require("../math/Vector3.js"),
			r = require("../math/Vector2.js"),
			t = require("../math/Sphere.js"),
			a = require("../math/Ray.js"),
			o = require("../math/Matrix4.js"),
			i = require("../core/Object3D.js"),
			n = require("../math/Triangle.js"),
			s = require("../core/Face3.js"),
			c = require("../constants.js"),
			u = require("../materials/MeshBasicMaterial.js"),
			h = require("../core/BufferGeometry.js");

		function f(e, r) {
			i.Object3D.call(this), this.type = "Mesh", this.geometry = void 0 !== e ? e : new h.BufferGeometry, this.material = void 0 !== r ? r : new u.MeshBasicMaterial({
				color: 16777215 * Math.random()
			}), this.drawMode = c.TrianglesDrawMode, this.updateMorphTargets()
		}
		f.prototype = Object.assign(Object.create(i.Object3D.prototype), {
			constructor: f,
			isMesh: !0,
			setDrawMode: function(e) {
				this.drawMode = e
			},
			copy: function(e) {
				return i.Object3D.prototype.copy.call(this, e), this.drawMode = e.drawMode, void 0 !== e.morphTargetInfluences && (this.morphTargetInfluences = e.morphTargetInfluences.slice()), void 0 !== e.morphTargetDictionary && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)), this
			},
			updateMorphTargets: function() {
				var e, r, t, a = this.geometry;
				if (a.isBufferGeometry) {
					var o = a.morphAttributes,
						i = Object.keys(o);
					if (i.length > 0) {
						var n = o[i[0]];
						if (void 0 !== n)
							for (this.morphTargetInfluences = [], this.morphTargetDictionary = {}, e = 0, r = n.length; e < r; e++) t = n[e].name || String(e), this.morphTargetInfluences.push(0), this.morphTargetDictionary[t] = e
					}
				} else {
					var s = a.morphTargets;
					void 0 !== s && s.length > 0 && console.error("THREE.Mesh.updateMorphTargets() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")
				}
			},
			raycast: function() {
				var i = new o.Matrix4,
					u = new a.Ray,
					h = new t.Sphere,
					f = new e.Vector3,
					l = new e.Vector3,
					d = new e.Vector3,
					m = new e.Vector3,
					p = new e.Vector3,
					g = new e.Vector3,
					y = new r.Vector2,
					v = new r.Vector2,
					M = new r.Vector2,
					x = new e.Vector3,
					b = new e.Vector3;

				function T(e, r, t, a, o, i, n, s) {
					if (null === (r.side === c.BackSide ? a.intersectTriangle(n, i, o, !0, s) : a.intersectTriangle(o, i, n, r.side !== c.DoubleSide, s))) return null;
					b.copy(s), b.applyMatrix4(e.matrixWorld);
					var u = t.ray.origin.distanceTo(b);
					return u < t.near || u > t.far ? null : {
						distance: u,
						point: b.clone(),
						object: e
					}
				}

				function w(e, t, a, o, i, c, u, h, m) {
					f.fromBufferAttribute(i, u), l.fromBufferAttribute(i, h), d.fromBufferAttribute(i, m);
					var p = T(e, t, a, o, f, l, d, x);
					if (p) {
						c && (y.fromBufferAttribute(c, u), v.fromBufferAttribute(c, h), M.fromBufferAttribute(c, m), p.uv = n.Triangle.getUV(x, f, l, d, y, v, M, new r.Vector2));
						var g = new s.Face3(u, h, m);
						n.Triangle.getNormal(f, l, d, g.normal), p.face = g
					}
					return p
				}
				return function(e, t) {
					var a, o = this.geometry,
						s = this.material,
						c = this.matrixWorld;
					if (void 0 !== s && (null === o.boundingSphere && o.computeBoundingSphere(), h.copy(o.boundingSphere), h.applyMatrix4(c), !1 !== e.ray.intersectsSphere(h) && (i.getInverse(c), u.copy(e.ray).applyMatrix4(i), null === o.boundingBox || !1 !== u.intersectsBox(o.boundingBox))))
						if (o.isBufferGeometry) {
							var b, V, j, I, B, A, D, S, q, O = o.index,
								G = o.attributes.position,
								E = o.attributes.uv,
								R = o.groups,
								X = o.drawRange;
							if (null !== O)
								if (Array.isArray(s))
									for (I = 0, A = R.length; I < A; I++)
										for (q = s[(S = R[I]).materialIndex], B = Math.max(S.start, X.start), D = Math.min(S.start + S.count, X.start + X.count); B < D; B += 3) b = O.getX(B), V = O.getX(B + 1), j = O.getX(B + 2), (a = w(this, q, e, u, G, E, b, V, j)) && (a.faceIndex = Math.floor(B / 3), a.face.materialIndex = S.materialIndex, t.push(a));
								else
									for (I = Math.max(0, X.start), A = Math.min(O.count, X.start + X.count); I < A; I += 3) b = O.getX(I), V = O.getX(I + 1), j = O.getX(I + 2), (a = w(this, s, e, u, G, E, b, V, j)) && (a.faceIndex = Math.floor(I / 3), t.push(a));
							else if (void 0 !== G)
								if (Array.isArray(s))
									for (I = 0, A = R.length; I < A; I++)
										for (q = s[(S = R[I]).materialIndex], B = Math.max(S.start, X.start), D = Math.min(S.start + S.count, X.start + X.count); B < D; B += 3)(a = w(this, q, e, u, G, E, b = B, V = B + 1, j = B + 2)) && (a.faceIndex = Math.floor(B / 3), a.face.materialIndex = S.materialIndex, t.push(a));
								else
									for (I = Math.max(0, X.start), A = Math.min(G.count, X.start + X.count); I < A; I += 3)(a = w(this, s, e, u, G, E, b = I, V = I + 1, j = I + 2)) && (a.faceIndex = Math.floor(I / 3), t.push(a))
						} else if (o.isGeometry) {
						var U, H, k, F, W = Array.isArray(s),
							_ = o.vertices,
							N = o.faces,
							P = o.faceVertexUvs[0];
						P.length > 0 && (F = P);
						for (var z = 0, C = N.length; z < C; z++) {
							var J = N[z],
								K = W ? s[J.materialIndex] : s;
							if (void 0 !== K) {
								if (U = _[J.a], H = _[J.b], k = _[J.c], !0 === K.morphTargets) {
									var L = o.morphTargets,
										Q = this.morphTargetInfluences;
									f.set(0, 0, 0), l.set(0, 0, 0), d.set(0, 0, 0);
									for (var Y = 0, Z = L.length; Y < Z; Y++) {
										var $ = Q[Y];
										if (0 !== $) {
											var ee = L[Y].vertices;
											f.addScaledVector(m.subVectors(ee[J.a], U), $), l.addScaledVector(p.subVectors(ee[J.b], H), $), d.addScaledVector(g.subVectors(ee[J.c], k), $)
										}
									}
									f.add(U), l.add(H), d.add(k), U = f, H = l, k = d
								}
								if (a = T(this, K, e, u, U, H, k, x)) {
									if (F && F[z]) {
										var re = F[z];
										y.copy(re[0]), v.copy(re[1]), M.copy(re[2]), a.uv = n.Triangle.getUV(x, U, H, k, y, v, M, new r.Vector2)
									}
									a.face = J, a.faceIndex = z, t.push(a)
								}
							}
						}
					}
				}
			}(),
			clone: function() {
				return new this.constructor(this.geometry, this.material).copy(this)
			}
		});
	}, {
		"../math/Vector3.js": "QLQv",
		"../math/Vector2.js": "vOoB",
		"../math/Sphere.js": "Jw30",
		"../math/Ray.js": "fISg",
		"../math/Matrix4.js": "QUid",
		"../core/Object3D.js": "Nnue",
		"../math/Triangle.js": "cKHs",
		"../core/Face3.js": "Abar",
		"../constants.js": "y6Nk",
		"../materials/MeshBasicMaterial.js": "5+Do",
		"../core/BufferGeometry.js": "UUET"
	}],
	"27qX": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.WebGLBackground = s;
		var e = require("../../constants.js"),
			r = require("../../geometries/BoxGeometry.js"),
			t = require("../../geometries/PlaneGeometry.js"),
			a = require("../../materials/ShaderMaterial.js"),
			i = require("../../math/Color.js"),
			o = require("../../objects/Mesh.js"),
			n = require("../shaders/ShaderLib.js"),
			u = require("../shaders/UniformsUtils.js");

		function s(s, l, d, m) {
			var f, h, b = new i.Color(0),
				c = 0,
				g = null,
				v = 0;

			function p(e, r) {
				l.buffers.color.setClear(e.r, e.g, e.b, r, m)
			}
			return {
				getClearColor: function() {
					return b
				},
				setClearColor: function(e, r) {
					b.set(e), p(b, c = void 0 !== r ? r : 1)
				},
				getClearAlpha: function() {
					return c
				},
				setClearAlpha: function(e) {
					p(b, c = e)
				},
				render: function(i, l, m, C) {
					var S = l.background;
					if (null === S ? (p(b, c), g = null, v = 0) : S && S.isColor && (p(S, 1), C = !0, g = null, v = 0), (s.autoClear || C) && s.clear(s.autoClearColor, s.autoClearDepth, s.autoClearStencil), S && (S.isCubeTexture || S.isWebGLRenderTargetCube)) {
						void 0 === h && ((h = new o.Mesh(new r.BoxBufferGeometry(1, 1, 1), new a.ShaderMaterial({
							type: "BackgroundCubeMaterial",
							uniforms: (0, u.cloneUniforms)(n.ShaderLib.cube.uniforms),
							vertexShader: n.ShaderLib.cube.vertexShader,
							fragmentShader: n.ShaderLib.cube.fragmentShader,
							side: e.BackSide,
							depthTest: !1,
							depthWrite: !1,
							fog: !1
						}))).geometry.removeAttribute("normal"), h.geometry.removeAttribute("uv"), h.onBeforeRender = function(e, r, t) {
							this.matrixWorld.copyPosition(t.matrixWorld)
						}, Object.defineProperty(h.material, "map", {
							get: function() {
								return this.uniforms.tCube.value
							}
						}), d.update(h));
						var x = S.isWebGLRenderTargetCube ? S.texture : S;
						h.material.uniforms.tCube.value = x, h.material.uniforms.tFlip.value = S.isWebGLRenderTargetCube ? 1 : -1, g === S && v === x.version || (h.material.needsUpdate = !0, g = S, v = x.version), i.unshift(h, h.geometry, h.material, 0, 0, null)
					} else S && S.isTexture && (void 0 === f && ((f = new o.Mesh(new t.PlaneBufferGeometry(2, 2), new a.ShaderMaterial({
						type: "BackgroundMaterial",
						uniforms: (0, u.cloneUniforms)(n.ShaderLib.background.uniforms),
						vertexShader: n.ShaderLib.background.vertexShader,
						fragmentShader: n.ShaderLib.background.fragmentShader,
						side: e.FrontSide,
						depthTest: !1,
						depthWrite: !1,
						fog: !1
					}))).geometry.removeAttribute("normal"), Object.defineProperty(f.material, "map", {
						get: function() {
							return this.uniforms.t2D.value
						}
					}), d.update(f)), f.material.uniforms.t2D.value = S, !0 === S.matrixAutoUpdate && S.updateMatrix(), f.material.uniforms.uvTransform.value.copy(S.matrix), g === S && v === S.version || (f.material.needsUpdate = !0, g = S, v = S.version), i.unshift(f, f.geometry, f.material, 0, 0, null))
				}
			}
		}
	}, {
		"../../constants.js": "y6Nk",
		"../../geometries/BoxGeometry.js": "NcD6",
		"../../geometries/PlaneGeometry.js": "TPAv",
		"../../materials/ShaderMaterial.js": "Kxey",
		"../../math/Color.js": "TFdP",
		"../../objects/Mesh.js": "RvMr",
		"../shaders/ShaderLib.js": "SyA9",
		"../shaders/UniformsUtils.js": "LbN/"
	}],
	"/GhI": [function(require, module, exports) {
		"use strict";

		function e(e, r, n, t) {
			var s;
			this.setMode = function(e) {
				s = e
			}, this.render = function(r, t) {
				e.drawArrays(s, r, t), n.update(t, s)
			}, this.renderInstances = function(a, d, o) {
				var u;
				if (t.isWebGL2) u = e;
				else if (null === (u = r.get("ANGLE_instanced_arrays"))) return void console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
				u[t.isWebGL2 ? "drawArraysInstanced" : "drawArraysInstancedANGLE"](s, d, o, a.maxInstancedCount), n.update(o, s, a.maxInstancedCount)
			}
		}
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.WebGLBufferRenderer = e;
	}, {}],
	"Go6o": [function(require, module, exports) {
		"use strict";

		function e(e, r, t) {
			var i;

			function a(r) {
				if ("highp" === r) {
					if (e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).precision > 0 && e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).precision > 0) return "highp";
					r = "mediump"
				}
				return "mediump" === r && e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).precision > 0 && e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp"
			}
			var n = "undefined" != typeof WebGL2RenderingContext && e instanceof WebGL2RenderingContext,
				o = void 0 !== t.precision ? t.precision : "highp",
				E = a(o);
			E !== o && (console.warn("THREE.WebGLRenderer:", o, "not supported, using", E, "instead."), o = E);
			var _ = !0 === t.logarithmicDepthBuffer,
				T = e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),
				m = e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
				s = e.getParameter(e.MAX_TEXTURE_SIZE),
				A = e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),
				u = e.getParameter(e.MAX_VERTEX_ATTRIBS),
				g = e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),
				R = e.getParameter(e.MAX_VARYING_VECTORS),
				p = e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),
				x = m > 0,
				M = n || !!r.get("OES_texture_float");
			return {
				isWebGL2: n,
				getMaxAnisotropy: function() {
					if (void 0 !== i) return i;
					var t = r.get("EXT_texture_filter_anisotropic");
					return i = null !== t ? e.getParameter(t.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0
				},
				getMaxPrecision: a,
				precision: o,
				logarithmicDepthBuffer: _,
				maxTextures: T,
				maxVertexTextures: m,
				maxTextureSize: s,
				maxCubemapSize: A,
				maxAttributes: u,
				maxVertexUniforms: g,
				maxVaryings: R,
				maxFragmentUniforms: p,
				vertexTextures: x,
				floatFragmentTextures: M,
				floatVertexTextures: x && M,
				maxSamples: n ? e.getParameter(e.MAX_SAMPLES) : 0
			}
		}
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.WebGLCapabilities = e;
	}, {}],
	"pVD3": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.WebGLClipping = t;
		var n = require("../../math/Matrix3.js"),
			e = require("../../math/Plane.js");

		function t() {
			var t = this,
				l = null,
				a = 0,
				i = !1,
				r = !1,
				u = new e.Plane,
				s = new n.Matrix3,
				o = {
					value: null,
					needsUpdate: !1
				};

			function h() {
				o.value !== l && (o.value = l, o.needsUpdate = a > 0), t.numPlanes = a, t.numIntersection = 0
			}

			function c(n, e, l, a) {
				var i = null !== n ? n.length : 0,
					r = null;
				if (0 !== i) {
					if (r = o.value, !0 !== a || null === r) {
						var h = l + 4 * i,
							c = e.matrixWorldInverse;
						s.getNormalMatrix(c), (null === r || r.length < h) && (r = new Float32Array(h));
						for (var v = 0, p = l; v !== i; ++v, p += 4) u.copy(n[v]).applyMatrix4(c, s), u.normal.toArray(r, p), r[p + 3] = u.constant
					}
					o.value = r, o.needsUpdate = !0
				}
				return t.numPlanes = i, r
			}
			this.uniform = o, this.numPlanes = 0, this.numIntersection = 0, this.init = function(n, e, t) {
				var r = 0 !== n.length || e || 0 !== a || i;
				return i = e, l = c(n, t, 0), a = n.length, r
			}, this.beginShadows = function() {
				r = !0, c(null)
			}, this.endShadows = function() {
				r = !1, h()
			}, this.setState = function(n, e, t, u, s, v) {
				if (!i || null === n || 0 === n.length || r && !t) r ? c(null) : h();
				else {
					var p = r ? 0 : a,
						f = 4 * p,
						m = s.clippingState || null;
					o.value = m, m = c(n, u, f, v);
					for (var d = 0; d !== f; ++d) m[d] = l[d];
					s.clippingState = m, this.numIntersection = e ? this.numPlanes : 0, this.numPlanes += p
				}
			}
		}
	}, {
		"../../math/Matrix3.js": "ecXo",
		"../../math/Plane.js": "9GNh"
	}],
	"u8K6": [function(require, module, exports) {
		"use strict";

		function e(e) {
			var t = {};
			return {
				get: function(r) {
					if (void 0 !== t[r]) return t[r];
					var _;
					switch (r) {
						case "WEBGL_depth_texture":
							_ = e.getExtension("WEBGL_depth_texture") || e.getExtension("MOZ_WEBGL_depth_texture") || e.getExtension("WEBKIT_WEBGL_depth_texture");
							break;
						case "EXT_texture_filter_anisotropic":
							_ = e.getExtension("EXT_texture_filter_anisotropic") || e.getExtension("MOZ_EXT_texture_filter_anisotropic") || e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
							break;
						case "WEBGL_compressed_texture_s3tc":
							_ = e.getExtension("WEBGL_compressed_texture_s3tc") || e.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
							break;
						case "WEBGL_compressed_texture_pvrtc":
							_ = e.getExtension("WEBGL_compressed_texture_pvrtc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
							break;
						default:
							_ = e.getExtension(r)
					}
					return null === _ && console.warn("THREE.WebGLRenderer: " + r + " extension not supported."), t[r] = _, _
				}
			}
		}
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.WebGLExtensions = e;
	}, {}],
	"R0jI": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.WebGLGeometries = i;
		var e = require("../../core/BufferAttribute.js"),
			r = require("../../core/BufferGeometry.js"),
			t = require("../../utils.js");

		function i(i, u, o) {
			var n = {},
				a = {};

			function f(e) {
				var r = e.target,
					t = n[r.id];
				for (var i in null !== t.index && u.remove(t.index), t.attributes) u.remove(t.attributes[i]);
				r.removeEventListener("dispose", f), delete n[r.id];
				var s = a[t.id];
				s && (u.remove(s), delete a[t.id]), o.memory.geometries--
			}
			return {
				get: function(e, t) {
					var i = n[t.id];
					return i || (t.addEventListener("dispose", f), t.isBufferGeometry ? i = t : t.isGeometry && (void 0 === t._bufferGeometry && (t._bufferGeometry = (new r.BufferGeometry).setFromObject(e)), i = t._bufferGeometry), n[t.id] = i, o.memory.geometries++, i)
				},
				update: function(e) {
					var r = e.index,
						t = e.attributes;
					for (var o in null !== r && u.update(r, i.ELEMENT_ARRAY_BUFFER), t) u.update(t[o], i.ARRAY_BUFFER);
					var n = e.morphAttributes;
					for (var o in n)
						for (var a = n[o], f = 0, s = a.length; f < s; f++) u.update(a[f], i.ARRAY_BUFFER)
				},
				getWireframeAttribute: function(r) {
					var o = a[r.id];
					if (o) return o;
					var n, f = [],
						s = r.index,
						d = r.attributes;
					if (null !== s)
						for (var v = 0, m = (n = s.array).length; v < m; v += 3) {
							var b = n[v + 0],
								l = n[v + 1],
								p = n[v + 2];
							f.push(b, l, l, p, p, b)
						} else
							for (v = 0, m = (n = d.position.array).length / 3 - 1; v < m; v += 3) b = v + 0, l = v + 1, p = v + 2, f.push(b, l, l, p, p, b);
					return o = new((0, t.arrayMax)(f) > 65535 ? e.Uint32BufferAttribute : e.Uint16BufferAttribute)(f, 1), u.update(o, i.ELEMENT_ARRAY_BUFFER), a[r.id] = o, o
				}
			}
		}
	}, {
		"../../core/BufferAttribute.js": "v7ZT",
		"../../core/BufferGeometry.js": "UUET",
		"../../utils.js": "51SM"
	}],
	"0b0h": [function(require, module, exports) {
		"use strict";

		function e(e, n, t, r) {
			var s, d, a;
			this.setMode = function(e) {
				s = e
			}, this.setIndex = function(e) {
				d = e.type, a = e.bytesPerElement
			}, this.render = function(n, r) {
				e.drawElements(s, r, d, n * a), t.update(r, s)
			}, this.renderInstances = function(o, i, u) {
				var c;
				if (r.isWebGL2) c = e;
				else if (null === (c = n.get("ANGLE_instanced_arrays"))) return void console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
				c[r.isWebGL2 ? "drawElementsInstanced" : "drawElementsInstancedANGLE"](s, u, d, i * a, o.maxInstancedCount), t.update(u, s, o.maxInstancedCount)
			}
		}
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.WebGLIndexedBufferRenderer = e;
	}, {}],
	"LE8w": [function(require, module, exports) {
		"use strict";

		function e(e) {
			var s = {
				frame: 0,
				calls: 0,
				triangles: 0,
				points: 0,
				lines: 0
			};
			return {
				memory: {
					geometries: 0,
					textures: 0
				},
				render: s,
				programs: null,
				autoReset: !0,
				reset: function() {
					s.frame++, s.calls = 0, s.triangles = 0, s.points = 0, s.lines = 0
				},
				update: function(r, a, n) {
					switch (n = n || 1, s.calls++, a) {
						case e.TRIANGLES:
							s.triangles += n * (r / 3);
							break;
						case e.TRIANGLE_STRIP:
						case e.TRIANGLE_FAN:
							s.triangles += n * (r - 2);
							break;
						case e.LINES:
							s.lines += n * (r / 2);
							break;
						case e.LINE_STRIP:
							s.lines += n * (r - 1);
							break;
						case e.LINE_LOOP:
							s.lines += n * r;
							break;
						case e.POINTS:
							s.points += n * r;
							break;
						default:
							console.error("THREE.WebGLInfo: Unknown draw mode:", a)
					}
				}
			}
		}
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.WebGLInfo = e;
	}, {}],
	"ig93": [function(require, module, exports) {
		"use strict";

		function r(r, t) {
			return Math.abs(t[1]) - Math.abs(r[1])
		}

		function t(t) {
			var e = {},
				o = new Float32Array(8);
			return {
				update: function(a, i, n, u) {
					var s = a.morphTargetInfluences,
						m = s.length,
						p = e[i.id];
					if (void 0 === p) {
						p = [];
						for (var f = 0; f < m; f++) p[f] = [f, 0];
						e[i.id] = p
					}
					var h = n.morphTargets && i.morphAttributes.position,
						l = n.morphNormals && i.morphAttributes.normal;
					for (f = 0; f < m; f++) 0 !== (b = p[f])[1] && (h && i.removeAttribute("morphTarget" + f), l && i.removeAttribute("morphNormal" + f));
					for (f = 0; f < m; f++)(b = p[f])[0] = f, b[1] = s[f];
					for (p.sort(r), f = 0; f < 8; f++) {
						var b;
						if (b = p[f]) {
							var d = b[0],
								v = b[1];
							if (v) {
								h && i.addAttribute("morphTarget" + f, h[d]), l && i.addAttribute("morphNormal" + f, l[d]), o[f] = v;
								continue
							}
						}
						o[f] = 0
					}
					u.getUniforms().setValue(t, "morphTargetInfluences", o)
				}
			}
		}
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.WebGLMorphtargets = t;
	}, {}],
	"2rwW": [function(require, module, exports) {
		"use strict";

		function e(e, t) {
			var r = {};
			return {
				update: function(o) {
					var u = t.render.frame,
						n = o.geometry,
						d = e.get(o, n);
					return r[d.id] !== u && (n.isGeometry && d.updateFromObject(o), e.update(d), r[d.id] = u), d
				},
				dispose: function() {
					r = {}
				}
			}
		}
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.WebGLObjects = e;
	}, {}],
	"sdJ8": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.CubeTexture = r;
		var e = require("./Texture.js"),
			t = require("../constants.js");

		function r(r, o, i, u, p, s, n, c, a, f) {
			r = void 0 !== r ? r : [], o = void 0 !== o ? o : t.CubeReflectionMapping, e.Texture.call(this, r, o, i, u, p, s, n, c, a, f), this.flipY = !1
		}
		r.prototype = Object.create(e.Texture.prototype), r.prototype.constructor = r, r.prototype.isCubeTexture = !0, Object.defineProperty(r.prototype, "images", {
			get: function() {
				return this.image
			},
			set: function(e) {
				this.image = e
			}
		});
	}, {
		"./Texture.js": "L5Pf",
		"../constants.js": "y6Nk"
	}],
	"Kc3e": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.DataTexture3D = r;
		var e = require("./Texture.js"),
			t = require("../constants.js");

		function r(r, i, s, a) {
			e.Texture.call(this, null), this.image = {
				data: r,
				width: i,
				height: s,
				depth: a
			}, this.magFilter = t.NearestFilter, this.minFilter = t.NearestFilter, this.generateMipmaps = !1, this.flipY = !1
		}
		r.prototype = Object.create(e.Texture.prototype), r.prototype.constructor = r, r.prototype.isDataTexture3D = !0;
	}, {
		"./Texture.js": "L5Pf",
		"../constants.js": "y6Nk"
	}],
	"tYce": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.WebGLUniforms = K;
		var e = require("../../textures/CubeTexture.js"),
			t = require("../../textures/Texture.js"),
			r = require("../../textures/DataTexture3D.js"),
			i = new t.Texture,
			a = new r.DataTexture3D,
			n = new e.CubeTexture;

		function s() {
			this.seq = [], this.map = {}
		}
		var u = [],
			c = [],
			h = new Float32Array(16),
			f = new Float32Array(9),
			o = new Float32Array(4);

		function d(e, t, r) {
			var i = e[0];
			if (i <= 0 || i > 0) return e;
			var a = t * r,
				n = u[a];
			if (void 0 === n && (n = new Float32Array(a), u[a] = n), 0 !== t) {
				i.toArray(n, 0);
				for (var s = 1, c = 0; s !== t; ++s) c += r, e[s].toArray(n, c)
			}
			return n
		}

		function v(e, t) {
			if (e.length !== t.length) return !1;
			for (var r = 0, i = e.length; r < i; r++)
				if (e[r] !== t[r]) return !1;
			return !0
		}

		function l(e, t) {
			for (var r = 0, i = t.length; r < i; r++) e[r] = t[r]
		}

		function m(e, t) {
			var r = c[t];
			void 0 === r && (r = new Int32Array(t), c[t] = r);
			for (var i = 0; i !== t; ++i) r[i] = e.allocTextureUnit();
			return r
		}

		function x(e, t) {
			var r = this.cache;
			r[0] !== t && (e.uniform1f(this.addr, t), r[0] = t)
		}

		function p(e, t) {
			var r = this.cache;
			r[0] !== t && (e.uniform1i(this.addr, t), r[0] = t)
		}

		function y(e, t) {
			var r = this.cache;
			if (void 0 !== t.x) r[0] === t.x && r[1] === t.y || (e.uniform2f(this.addr, t.x, t.y), r[0] = t.x, r[1] = t.y);
			else {
				if (v(r, t)) return;
				e.uniform2fv(this.addr, t), l(r, t)
			}
		}

		function g(e, t) {
			var r = this.cache;
			if (void 0 !== t.x) r[0] === t.x && r[1] === t.y && r[2] === t.z || (e.uniform3f(this.addr, t.x, t.y, t.z), r[0] = t.x, r[1] = t.y, r[2] = t.z);
			else if (void 0 !== t.r) r[0] === t.r && r[1] === t.g && r[2] === t.b || (e.uniform3f(this.addr, t.r, t.g, t.b), r[0] = t.r, r[1] = t.g, r[2] = t.b);
			else {
				if (v(r, t)) return;
				e.uniform3fv(this.addr, t), l(r, t)
			}
		}

		function w(e, t) {
			var r = this.cache;
			if (void 0 !== t.x) r[0] === t.x && r[1] === t.y && r[2] === t.z && r[3] === t.w || (e.uniform4f(this.addr, t.x, t.y, t.z, t.w), r[0] = t.x, r[1] = t.y, r[2] = t.z, r[3] = t.w);
			else {
				if (v(r, t)) return;
				e.uniform4fv(this.addr, t), l(r, t)
			}
		}

		function T(e, t) {
			var r = this.cache,
				i = t.elements;
			if (void 0 === i) {
				if (v(r, t)) return;
				e.uniformMatrix2fv(this.addr, !1, t), l(r, t)
			} else {
				if (v(r, i)) return;
				o.set(i), e.uniformMatrix2fv(this.addr, !1, o), l(r, i)
			}
		}

		function z(e, t) {
			var r = this.cache,
				i = t.elements;
			if (void 0 === i) {
				if (v(r, t)) return;
				e.uniformMatrix3fv(this.addr, !1, t), l(r, t)
			} else {
				if (v(r, i)) return;
				f.set(i), e.uniformMatrix3fv(this.addr, !1, f), l(r, i)
			}
		}

		function C(e, t) {
			var r = this.cache,
				i = t.elements;
			if (void 0 === i) {
				if (v(r, t)) return;
				e.uniformMatrix4fv(this.addr, !1, t), l(r, t)
			} else {
				if (v(r, i)) return;
				h.set(i), e.uniformMatrix4fv(this.addr, !1, h), l(r, i)
			}
		}

		function A(e, t, r) {
			var a = this.cache,
				n = r.allocTextureUnit();
			a[0] !== n && (e.uniform1i(this.addr, n), a[0] = n), r.setTexture2D(t || i, n)
		}

		function M(e, t, r) {
			var i = this.cache,
				n = r.allocTextureUnit();
			i[0] !== n && (e.uniform1i(this.addr, n), i[0] = n), r.setTexture3D(t || a, n)
		}

		function b(e, t, r) {
			var i = this.cache,
				a = r.allocTextureUnit();
			i[0] !== a && (e.uniform1i(this.addr, a), i[0] = a), r.setTextureCube(t || n, a)
		}

		function V(e, t) {
			var r = this.cache;
			v(r, t) || (e.uniform2iv(this.addr, t), l(r, t))
		}

		function U(e, t) {
			var r = this.cache;
			v(r, t) || (e.uniform3iv(this.addr, t), l(r, t))
		}

		function q(e, t) {
			var r = this.cache;
			v(r, t) || (e.uniform4iv(this.addr, t), l(r, t))
		}

		function D(e) {
			switch (e) {
				case 5126:
					return x;
				case 35664:
					return y;
				case 35665:
					return g;
				case 35666:
					return w;
				case 35674:
					return T;
				case 35675:
					return z;
				case 35676:
					return C;
				case 35678:
				case 36198:
					return A;
				case 35679:
					return M;
				case 35680:
					return b;
				case 5124:
				case 35670:
					return p;
				case 35667:
				case 35671:
					return V;
				case 35668:
				case 35672:
					return U;
				case 35669:
				case 35673:
					return q
			}
		}

		function F(e, t) {
			var r = this.cache;
			v(r, t) || (e.uniform1fv(this.addr, t), l(r, t))
		}

		function I(e, t) {
			var r = this.cache;
			v(r, t) || (e.uniform1iv(this.addr, t), l(r, t))
		}

		function j(e, t) {
			var r = this.cache,
				i = d(t, this.size, 2);
			v(r, i) || (e.uniform2fv(this.addr, i), this.updateCache(i))
		}

		function _(e, t) {
			var r = this.cache,
				i = d(t, this.size, 3);
			v(r, i) || (e.uniform3fv(this.addr, i), this.updateCache(i))
		}

		function O(e, t) {
			var r = this.cache,
				i = d(t, this.size, 4);
			v(r, i) || (e.uniform4fv(this.addr, i), this.updateCache(i))
		}

		function P(e, t) {
			var r = this.cache,
				i = d(t, this.size, 4);
			v(r, i) || (e.uniformMatrix2fv(this.addr, !1, i), this.updateCache(i))
		}

		function L(e, t) {
			var r = this.cache,
				i = d(t, this.size, 9);
			v(r, i) || (e.uniformMatrix3fv(this.addr, !1, i), this.updateCache(i))
		}

		function W(e, t) {
			var r = this.cache,
				i = d(t, this.size, 16);
			v(r, i) || (e.uniformMatrix4fv(this.addr, !1, i), this.updateCache(i))
		}

		function k(e, t, r) {
			var a = this.cache,
				n = t.length,
				s = m(r, n);
			!1 === v(a, s) && (e.uniform1iv(this.addr, s), l(a, s));
			for (var u = 0; u !== n; ++u) r.setTexture2D(t[u] || i, s[u])
		}

		function E(e, t, r) {
			var i = this.cache,
				a = t.length,
				s = m(r, a);
			!1 === v(i, s) && (e.uniform1iv(this.addr, s), l(i, s));
			for (var u = 0; u !== a; ++u) r.setTextureCube(t[u] || n, s[u])
		}

		function G(e) {
			switch (e) {
				case 5126:
					return F;
				case 35664:
					return j;
				case 35665:
					return _;
				case 35666:
					return O;
				case 35674:
					return P;
				case 35675:
					return L;
				case 35676:
					return W;
				case 35678:
					return k;
				case 35680:
					return E;
				case 5124:
				case 35670:
					return I;
				case 35667:
				case 35671:
					return V;
				case 35668:
				case 35672:
					return U;
				case 35669:
				case 35673:
					return q
			}
		}

		function N(e, t, r) {
			this.id = e, this.addr = r, this.cache = [], this.setValue = D(t.type)
		}

		function R(e, t, r) {
			this.id = e, this.addr = r, this.cache = [], this.size = t.size, this.setValue = G(t.type)
		}

		function S(e) {
			this.id = e, s.call(this)
		}
		R.prototype.updateCache = function(e) {
			var t = this.cache;
			e instanceof Float32Array && t.length !== e.length && (this.cache = new Float32Array(e.length)), l(t, e)
		}, S.prototype.setValue = function(e, t, r) {
			for (var i = this.seq, a = 0, n = i.length; a !== n; ++a) {
				var s = i[a];
				s.setValue(e, t[s.id], r)
			}
		};
		var B = /([\w\d_]+)(\])?(\[|\.)?/g;

		function H(e, t) {
			e.seq.push(t), e.map[t.id] = t
		}

		function J(e, t, r) {
			var i = e.name,
				a = i.length;
			for (B.lastIndex = 0;;) {
				var n = B.exec(i),
					s = B.lastIndex,
					u = n[1],
					c = "]" === n[2],
					h = n[3];
				if (c && (u |= 0), void 0 === h || "[" === h && s + 2 === a) {
					H(r, void 0 === h ? new N(u, e, t) : new R(u, e, t));
					break
				}
				var f = r.map[u];
				void 0 === f && H(r, f = new S(u)), r = f
			}
		}

		function K(e, t, r) {
			s.call(this), this.renderer = r;
			for (var i = e.getProgramParameter(t, e.ACTIVE_UNIFORMS), a = 0; a < i; ++a) {
				var n = e.getActiveUniform(t, a);
				J(n, e.getUniformLocation(t, n.name), this)
			}
		}
		K.prototype.setValue = function(e, t, r) {
			var i = this.map[t];
			void 0 !== i && i.setValue(e, r, this.renderer)
		}, K.prototype.setOptional = function(e, t, r) {
			var i = t[r];
			void 0 !== i && this.setValue(e, r, i)
		}, K.upload = function(e, t, r, i) {
			for (var a = 0, n = t.length; a !== n; ++a) {
				var s = t[a],
					u = r[s.id];
				!1 !== u.needsUpdate && s.setValue(e, u.value, i)
			}
		}, K.seqWithValue = function(e, t) {
			for (var r = [], i = 0, a = e.length; i !== a; ++i) {
				var n = e[i];
				n.id in t && r.push(n)
			}
			return r
		};
	}, {
		"../../textures/CubeTexture.js": "sdJ8",
		"../../textures/Texture.js": "L5Pf",
		"../../textures/DataTexture3D.js": "Kc3e"
	}],
	"zho1": [function(require, module, exports) {
		"use strict";

		function e(e) {
			for (var r = e.split("\n"), o = 0; o < r.length; o++) r[o] = o + 1 + ": " + r[o];
			return r.join("\n")
		}

		function r(r, o, t) {
			var a = r.createShader(o);
			return r.shaderSource(a, t), r.compileShader(a), !1 === r.getShaderParameter(a, r.COMPILE_STATUS) && console.error("THREE.WebGLShader: Shader couldn't compile."), "" !== r.getShaderInfoLog(a) && console.warn("THREE.WebGLShader: gl.getShaderInfoLog()", o === r.VERTEX_SHADER ? "vertex" : "fragment", r.getShaderInfoLog(a), e(t)), a
		}
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.WebGLShader = r;
	}, {}],
	"WxtD": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.WebGLProgram = l;
		var e = require("./WebGLUniforms.js"),
			n = require("./WebGLShader.js"),
			r = require("../shaders/ShaderChunk.js"),
			t = require("../../constants.js"),
			i = 0;

		function a(e) {
			switch (e) {
				case t.LinearEncoding:
					return ["Linear", "( value )"];
				case t.sRGBEncoding:
					return ["sRGB", "( value )"];
				case t.RGBEEncoding:
					return ["RGBE", "( value )"];
				case t.RGBM7Encoding:
					return ["RGBM", "( value, 7.0 )"];
				case t.RGBM16Encoding:
					return ["RGBM", "( value, 16.0 )"];
				case t.RGBDEncoding:
					return ["RGBD", "( value, 256.0 )"];
				case t.GammaEncoding:
					return ["Gamma", "( value, float( GAMMA_FACTOR ) )"];
				default:
					throw new Error("unsupported encoding: " + e)
			}
		}

		function o(e, n) {
			var r = a(n);
			return "vec4 " + e + "( vec4 value ) { return " + r[0] + "ToLinear" + r[1] + "; }"
		}

		function d(e, n) {
			var r = a(n);
			return "vec4 " + e + "( vec4 value ) { return LinearTo" + r[0] + r[1] + "; }"
		}

		function p(e, n) {
			var r;
			switch (n) {
				case t.LinearToneMapping:
					r = "Linear";
					break;
				case t.ReinhardToneMapping:
					r = "Reinhard";
					break;
				case t.Uncharted2ToneMapping:
					r = "Uncharted2";
					break;
				case t.CineonToneMapping:
					r = "OptimizedCineon";
					break;
				case t.ACESFilmicToneMapping:
					r = "ACESFilmic";
					break;
				default:
					throw new Error("unsupported toneMapping: " + n)
			}
			return "vec3 " + e + "( vec3 color ) { return " + r + "ToneMapping( color ); }"
		}

		function E(e, n, r) {
			return [(e = e || {}).derivatives || n.envMapCubeUV || n.bumpMap || n.normalMap && !n.objectSpaceNormalMap || n.flatShading ? "#extension GL_OES_standard_derivatives : enable" : "", (e.fragDepth || n.logarithmicDepthBuffer) && r.get("EXT_frag_depth") ? "#extension GL_EXT_frag_depth : enable" : "", e.drawBuffers && r.get("WEBGL_draw_buffers") ? "#extension GL_EXT_draw_buffers : require" : "", (e.shaderTextureLOD || n.envMap) && r.get("EXT_shader_texture_lod") ? "#extension GL_EXT_shader_texture_lod : enable" : ""].filter(u).join("\n")
		}

		function f(e) {
			var n = [];
			for (var r in e) {
				var t = e[r];
				!1 !== t && n.push("#define " + r + " " + t)
			}
			return n.join("\n")
		}

		function s(e, n) {
			for (var r = {}, t = e.getProgramParameter(n, e.ACTIVE_ATTRIBUTES), i = 0; i < t; i++) {
				var a = e.getActiveAttrib(n, i).name;
				r[a] = e.getAttribLocation(n, a)
			}
			return r
		}

		function u(e) {
			return "" !== e
		}

		function c(e, n) {
			return e.replace(/NUM_DIR_LIGHTS/g, n.numDirLights).replace(/NUM_SPOT_LIGHTS/g, n.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g, n.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, n.numPointLights).replace(/NUM_HEMI_LIGHTS/g, n.numHemiLights)
		}

		function g(e, n) {
			return e.replace(/NUM_CLIPPING_PLANES/g, n.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, n.numClippingPlanes - n.numClipIntersection)
		}

		function M(e) {
			return e.replace(/^[ \t]*#include +<([\w\d.\/]+)>/gm, function(e, n) {
				var t = r.ShaderChunk[n];
				if (void 0 === t) throw new Error("Can not resolve #include <" + n + ">");
				return M(t)
			})
		}

		function _(e) {
			return e.replace(/#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g, function(e, n, r, t) {
				for (var i = "", a = parseInt(n); a < parseInt(r); a++) i += t.replace(/\[ i \]/g, "[ " + a + " ]");
				return i
			})
		}

		function l(a, l, m, S, T, h, A) {
			var P = a.context,
				L = S.defines,
				v = T.vertexShader,
				U = T.fragmentShader,
				b = "SHADOWMAP_TYPE_BASIC";
			h.shadowMapType === t.PCFShadowMap ? b = "SHADOWMAP_TYPE_PCF" : h.shadowMapType === t.PCFSoftShadowMap && (b = "SHADOWMAP_TYPE_PCF_SOFT");
			var N = "ENVMAP_TYPE_CUBE",
				G = "ENVMAP_MODE_REFLECTION",
				R = "ENVMAP_BLENDING_MULTIPLY";
			if (h.envMap) {
				switch (S.envMap.mapping) {
					case t.CubeReflectionMapping:
					case t.CubeRefractionMapping:
						N = "ENVMAP_TYPE_CUBE";
						break;
					case t.CubeUVReflectionMapping:
					case t.CubeUVRefractionMapping:
						N = "ENVMAP_TYPE_CUBE_UV";
						break;
					case t.EquirectangularReflectionMapping:
					case t.EquirectangularRefractionMapping:
						N = "ENVMAP_TYPE_EQUIREC";
						break;
					case t.SphericalReflectionMapping:
						N = "ENVMAP_TYPE_SPHERE"
				}
				switch (S.envMap.mapping) {
					case t.CubeRefractionMapping:
					case t.EquirectangularRefractionMapping:
						G = "ENVMAP_MODE_REFRACTION"
				}
				switch (S.combine) {
					case t.MultiplyOperation:
						R = "ENVMAP_BLENDING_MULTIPLY";
						break;
					case t.MixOperation:
						R = "ENVMAP_BLENDING_MIX";
						break;
					case t.AddOperation:
						R = "ENVMAP_BLENDING_ADD"
				}
			}
			var I, x, D = a.gammaFactor > 0 ? a.gammaFactor : 1,
				O = A.isWebGL2 ? "" : E(S.extensions, h, l),
				C = f(L),
				H = P.createProgram();
			if (S.isRawShaderMaterial ? ((I = [C].filter(u).join("\n")).length > 0 && (I += "\n"), (x = [O, C].filter(u).join("\n")).length > 0 && (x += "\n")) : (I = ["precision " + h.precision + " float;", "precision " + h.precision + " int;", "#define SHADER_NAME " + T.name, C, h.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "", "#define GAMMA_FACTOR " + D, "#define MAX_BONES " + h.maxBones, h.useFog && h.fog ? "#define USE_FOG" : "", h.useFog && h.fogExp ? "#define FOG_EXP2" : "", h.map ? "#define USE_MAP" : "", h.envMap ? "#define USE_ENVMAP" : "", h.envMap ? "#define " + G : "", h.lightMap ? "#define USE_LIGHTMAP" : "", h.aoMap ? "#define USE_AOMAP" : "", h.emissiveMap ? "#define USE_EMISSIVEMAP" : "", h.bumpMap ? "#define USE_BUMPMAP" : "", h.normalMap ? "#define USE_NORMALMAP" : "", h.normalMap && h.objectSpaceNormalMap ? "#define OBJECTSPACE_NORMALMAP" : "", h.displacementMap && h.supportsVertexTextures ? "#define USE_DISPLACEMENTMAP" : "", h.specularMap ? "#define USE_SPECULARMAP" : "", h.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", h.metalnessMap ? "#define USE_METALNESSMAP" : "", h.alphaMap ? "#define USE_ALPHAMAP" : "", h.vertexColors ? "#define USE_COLOR" : "", h.flatShading ? "#define FLAT_SHADED" : "", h.skinning ? "#define USE_SKINNING" : "", h.useVertexTexture ? "#define BONE_TEXTURE" : "", h.morphTargets ? "#define USE_MORPHTARGETS" : "", h.morphNormals && !1 === h.flatShading ? "#define USE_MORPHNORMALS" : "", h.doubleSided ? "#define DOUBLE_SIDED" : "", h.flipSided ? "#define FLIP_SIDED" : "", h.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", h.shadowMapEnabled ? "#define " + b : "", h.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", h.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", h.logarithmicDepthBuffer && (A.isWebGL2 || l.get("EXT_frag_depth")) ? "#define USE_LOGDEPTHBUF_EXT" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_COLOR", "\tattribute vec3 color;", "#endif", "#ifdef USE_MORPHTARGETS", "\tattribute vec3 morphTarget0;", "\tattribute vec3 morphTarget1;", "\tattribute vec3 morphTarget2;", "\tattribute vec3 morphTarget3;", "\t#ifdef USE_MORPHNORMALS", "\t\tattribute vec3 morphNormal0;", "\t\tattribute vec3 morphNormal1;", "\t\tattribute vec3 morphNormal2;", "\t\tattribute vec3 morphNormal3;", "\t#else", "\t\tattribute vec3 morphTarget4;", "\t\tattribute vec3 morphTarget5;", "\t\tattribute vec3 morphTarget6;", "\t\tattribute vec3 morphTarget7;", "\t#endif", "#endif", "#ifdef USE_SKINNING", "\tattribute vec4 skinIndex;", "\tattribute vec4 skinWeight;", "#endif", "\n"].filter(u).join("\n"), x = [O, "precision " + h.precision + " float;", "precision " + h.precision + " int;", "#define SHADER_NAME " + T.name, C, h.alphaTest ? "#define ALPHATEST " + h.alphaTest + (h.alphaTest % 1 ? "" : ".0") : "", "#define GAMMA_FACTOR " + D, h.useFog && h.fog ? "#define USE_FOG" : "", h.useFog && h.fogExp ? "#define FOG_EXP2" : "", h.map ? "#define USE_MAP" : "", h.matcap ? "#define USE_MATCAP" : "", h.envMap ? "#define USE_ENVMAP" : "", h.envMap ? "#define " + N : "", h.envMap ? "#define " + G : "", h.envMap ? "#define " + R : "", h.lightMap ? "#define USE_LIGHTMAP" : "", h.aoMap ? "#define USE_AOMAP" : "", h.emissiveMap ? "#define USE_EMISSIVEMAP" : "", h.bumpMap ? "#define USE_BUMPMAP" : "", h.normalMap ? "#define USE_NORMALMAP" : "", h.normalMap && h.objectSpaceNormalMap ? "#define OBJECTSPACE_NORMALMAP" : "", h.specularMap ? "#define USE_SPECULARMAP" : "", h.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", h.metalnessMap ? "#define USE_METALNESSMAP" : "", h.alphaMap ? "#define USE_ALPHAMAP" : "", h.vertexColors ? "#define USE_COLOR" : "", h.gradientMap ? "#define USE_GRADIENTMAP" : "", h.flatShading ? "#define FLAT_SHADED" : "", h.doubleSided ? "#define DOUBLE_SIDED" : "", h.flipSided ? "#define FLIP_SIDED" : "", h.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", h.shadowMapEnabled ? "#define " + b : "", h.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "", h.physicallyCorrectLights ? "#define PHYSICALLY_CORRECT_LIGHTS" : "", h.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", h.logarithmicDepthBuffer && (A.isWebGL2 || l.get("EXT_frag_depth")) ? "#define USE_LOGDEPTHBUF_EXT" : "", h.envMap && (A.isWebGL2 || l.get("EXT_shader_texture_lod")) ? "#define TEXTURE_LOD_EXT" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", h.toneMapping !== t.NoToneMapping ? "#define TONE_MAPPING" : "", h.toneMapping !== t.NoToneMapping ? r.ShaderChunk.tonemapping_pars_fragment : "", h.toneMapping !== t.NoToneMapping ? p("toneMapping", h.toneMapping) : "", h.dithering ? "#define DITHERING" : "", h.outputEncoding || h.mapEncoding || h.matcapEncoding || h.envMapEncoding || h.emissiveMapEncoding ? r.ShaderChunk.encodings_pars_fragment : "", h.mapEncoding ? o("mapTexelToLinear", h.mapEncoding) : "", h.matcapEncoding ? o("matcapTexelToLinear", h.matcapEncoding) : "", h.envMapEncoding ? o("envMapTexelToLinear", h.envMapEncoding) : "", h.emissiveMapEncoding ? o("emissiveMapTexelToLinear", h.emissiveMapEncoding) : "", h.outputEncoding ? d("linearToOutputTexel", h.outputEncoding) : "", h.depthPacking ? "#define DEPTH_PACKING " + S.depthPacking : "", "\n"].filter(u).join("\n")), v = g(v = c(v = M(v), h), h), U = g(U = c(U = M(U), h), h), v = _(v), U = _(U), A.isWebGL2 && !S.isRawShaderMaterial) {
				var B = !1,
					w = /^\s*#version\s+300\s+es\s*\n/;
				S.isShaderMaterial && null !== v.match(w) && null !== U.match(w) && (B = !0, v = v.replace(w, ""), U = U.replace(w, "")), I = ["#version 300 es\n", "#define attribute in", "#define varying out", "#define texture2D texture"].join("\n") + "\n" + I, x = ["#version 300 es\n", "#define varying in", B ? "" : "out highp vec4 pc_fragColor;", B ? "" : "#define gl_FragColor pc_fragColor", "#define gl_FragDepthEXT gl_FragDepth", "#define texture2D texture", "#define textureCube texture", "#define texture2DProj textureProj", "#define texture2DLodEXT textureLod", "#define texture2DProjLodEXT textureProjLod", "#define textureCubeLodEXT textureLod", "#define texture2DGradEXT textureGrad", "#define texture2DProjGradEXT textureProjGrad", "#define textureCubeGradEXT textureGrad"].join("\n") + "\n" + x
			}
			var F = I + v,
				V = x + U,
				X = (0, n.WebGLShader)(P, P.VERTEX_SHADER, F),
				j = (0, n.WebGLShader)(P, P.FRAGMENT_SHADER, V);
			P.attachShader(H, X), P.attachShader(H, j), void 0 !== S.index0AttributeName ? P.bindAttribLocation(H, 0, S.index0AttributeName) : !0 === h.morphTargets && P.bindAttribLocation(H, 0, "position"), P.linkProgram(H);
			var W, k, Y = P.getProgramInfoLog(H).trim(),
				y = P.getShaderInfoLog(X).trim(),
				q = P.getShaderInfoLog(j).trim(),
				K = !0,
				z = !0;
			return !1 === P.getProgramParameter(H, P.LINK_STATUS) ? (K = !1, console.error("THREE.WebGLProgram: shader error: ", P.getError(), "gl.VALIDATE_STATUS", P.getProgramParameter(H, P.VALIDATE_STATUS), "gl.getProgramInfoLog", Y, y, q)) : "" !== Y ? console.warn("THREE.WebGLProgram: gl.getProgramInfoLog()", Y) : "" !== y && "" !== q || (z = !1), z && (this.diagnostics = {
				runnable: K,
				material: S,
				programLog: Y,
				vertexShader: {
					log: y,
					prefix: I
				},
				fragmentShader: {
					log: q,
					prefix: x
				}
			}), P.deleteShader(X), P.deleteShader(j), this.getUniforms = function() {
				return void 0 === W && (W = new e.WebGLUniforms(P, H, a)), W
			}, this.getAttributes = function() {
				return void 0 === k && (k = s(P, H)), k
			}, this.destroy = function() {
				P.deleteProgram(H), this.program = void 0
			}, Object.defineProperties(this, {
				uniforms: {
					get: function() {
						return console.warn("THREE.WebGLProgram: .uniforms is now .getUniforms()."), this.getUniforms()
					}
				},
				attributes: {
					get: function() {
						return console.warn("THREE.WebGLProgram: .attributes is now .getAttributes()."), this.getAttributes()
					}
				}
			}), this.name = T.name, this.id = i++, this.code = m, this.usedTimes = 1, this.program = H, this.vertexShader = X, this.fragmentShader = j, this
		}
	}, {
		"./WebGLUniforms.js": "tYce",
		"./WebGLShader.js": "zho1",
		"../shaders/ShaderChunk.js": "oHDJ",
		"../../constants.js": "y6Nk"
	}],
	"sSRB": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.WebGLPrograms = t;
		var e = require("../../constants.js"),
			a = require("./WebGLProgram.js");

		function t(t, n, i) {
			var r = [],
				p = {
					MeshDepthMaterial: "depth",
					MeshDistanceMaterial: "distanceRGBA",
					MeshNormalMaterial: "normal",
					MeshBasicMaterial: "basic",
					MeshLambertMaterial: "lambert",
					MeshPhongMaterial: "phong",
					MeshToonMaterial: "phong",
					MeshStandardMaterial: "physical",
					MeshPhysicalMaterial: "physical",
					MeshMatcapMaterial: "matcap",
					LineBasicMaterial: "basic",
					LineDashedMaterial: "dashed",
					PointsMaterial: "points",
					ShadowMaterial: "shadow",
					SpriteMaterial: "sprite"
				},
				s = ["precision", "supportsVertexTextures", "map", "mapEncoding", "matcap", "matcapEncoding", "envMap", "envMapMode", "envMapEncoding", "lightMap", "aoMap", "emissiveMap", "emissiveMapEncoding", "bumpMap", "normalMap", "objectSpaceNormalMap", "displacementMap", "specularMap", "roughnessMap", "metalnessMap", "gradientMap", "alphaMap", "combine", "vertexColors", "fog", "useFog", "fogExp", "flatShading", "sizeAttenuation", "logarithmicDepthBuffer", "skinning", "maxBones", "useVertexTexture", "morphTargets", "morphNormals", "maxMorphTargets", "maxMorphNormals", "premultipliedAlpha", "numDirLights", "numPointLights", "numSpotLights", "numHemiLights", "numRectAreaLights", "shadowMapEnabled", "shadowMapType", "toneMapping", "physicallyCorrectLights", "alphaTest", "doubleSided", "flipSided", "numClippingPlanes", "numClipIntersection", "depthPacking", "dithering"];

			function o(a, t) {
				var n;
				return a ? a.isTexture ? n = a.encoding : a.isWebGLRenderTarget && (console.warn("THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead."), n = a.texture.encoding) : n = e.LinearEncoding, n === e.LinearEncoding && t && (n = e.GammaEncoding), n
			}
			this.getParameters = function(a, n, r, s, h, m, g) {
				var l = p[a.type],
					M = g.isSkinnedMesh ? function(e) {
						var a = e.skeleton.bones;
						if (i.floatVertexTextures) return 1024;
						var t = i.maxVertexUniforms,
							n = Math.floor((t - 20) / 4),
							r = Math.min(n, a.length);
						return r < a.length ? (console.warn("THREE.WebGLRenderer: Skeleton has " + a.length + " bones. This GPU supports " + r + "."), 0) : r
					}(g) : 0,
					u = i.precision;
				null !== a.precision && (u = i.getMaxPrecision(a.precision)) !== a.precision && console.warn("THREE.WebGLProgram.getParameters:", a.precision, "not supported, using", u, "instead.");
				var d = t.getRenderTarget();
				return {
					shaderID: l,
					precision: u,
					supportsVertexTextures: i.vertexTextures,
					outputEncoding: o(d ? d.texture : null, t.gammaOutput),
					map: !!a.map,
					mapEncoding: o(a.map, t.gammaInput),
					matcap: !!a.matcap,
					matcapEncoding: o(a.matcap, t.gammaInput),
					envMap: !!a.envMap,
					envMapMode: a.envMap && a.envMap.mapping,
					envMapEncoding: o(a.envMap, t.gammaInput),
					envMapCubeUV: !!a.envMap && (a.envMap.mapping === e.CubeUVReflectionMapping || a.envMap.mapping === e.CubeUVRefractionMapping),
					lightMap: !!a.lightMap,
					aoMap: !!a.aoMap,
					emissiveMap: !!a.emissiveMap,
					emissiveMapEncoding: o(a.emissiveMap, t.gammaInput),
					bumpMap: !!a.bumpMap,
					normalMap: !!a.normalMap,
					objectSpaceNormalMap: a.normalMapType === e.ObjectSpaceNormalMap,
					displacementMap: !!a.displacementMap,
					roughnessMap: !!a.roughnessMap,
					metalnessMap: !!a.metalnessMap,
					specularMap: !!a.specularMap,
					alphaMap: !!a.alphaMap,
					gradientMap: !!a.gradientMap,
					combine: a.combine,
					vertexColors: a.vertexColors,
					fog: !!s,
					useFog: a.fog,
					fogExp: s && s.isFogExp2,
					flatShading: a.flatShading,
					sizeAttenuation: a.sizeAttenuation,
					logarithmicDepthBuffer: i.logarithmicDepthBuffer,
					skinning: a.skinning && M > 0,
					maxBones: M,
					useVertexTexture: i.floatVertexTextures,
					morphTargets: a.morphTargets,
					morphNormals: a.morphNormals,
					maxMorphTargets: t.maxMorphTargets,
					maxMorphNormals: t.maxMorphNormals,
					numDirLights: n.directional.length,
					numPointLights: n.point.length,
					numSpotLights: n.spot.length,
					numRectAreaLights: n.rectArea.length,
					numHemiLights: n.hemi.length,
					numClippingPlanes: h,
					numClipIntersection: m,
					dithering: a.dithering,
					shadowMapEnabled: t.shadowMap.enabled && g.receiveShadow && r.length > 0,
					shadowMapType: t.shadowMap.type,
					toneMapping: t.toneMapping,
					physicallyCorrectLights: t.physicallyCorrectLights,
					premultipliedAlpha: a.premultipliedAlpha,
					alphaTest: a.alphaTest,
					doubleSided: a.side === e.DoubleSide,
					flipSided: a.side === e.BackSide,
					depthPacking: void 0 !== a.depthPacking && a.depthPacking
				}
			}, this.getProgramCode = function(e, a) {
				var n = [];
				if (a.shaderID ? n.push(a.shaderID) : (n.push(e.fragmentShader), n.push(e.vertexShader)), void 0 !== e.defines)
					for (var i in e.defines) n.push(i), n.push(e.defines[i]);
				for (var r = 0; r < s.length; r++) n.push(a[s[r]]);
				return n.push(e.onBeforeCompile.toString()), n.push(t.gammaOutput), n.push(t.gammaFactor), n.join()
			}, this.acquireProgram = function(e, p, s, o) {
				for (var h, m = 0, g = r.length; m < g; m++) {
					var l = r[m];
					if (l.code === o) {
						++(h = l).usedTimes;
						break
					}
				}
				return void 0 === h && (h = new a.WebGLProgram(t, n, o, e, p, s, i), r.push(h)), h
			}, this.releaseProgram = function(e) {
				if (0 == --e.usedTimes) {
					var a = r.indexOf(e);
					r[a] = r[r.length - 1], r.pop(), e.destroy()
				}
			}, this.programs = r
		}
	}, {
		"../../constants.js": "y6Nk",
		"./WebGLProgram.js": "WxtD"
	}],
	"mMuI": [function(require, module, exports) {
		"use strict";

		function e() {
			var e = new WeakMap;
			return {
				get: function(t) {
					var n = e.get(t);
					return void 0 === n && (n = {}, e.set(t, n)), n
				},
				remove: function(t) {
					e.delete(t)
				},
				update: function(t, n, r) {
					e.get(t)[n] = r
				},
				dispose: function() {
					e = new WeakMap
				}
			}
		}
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.WebGLProperties = e;
	}, {}],
	"1t6l": [function(require, module, exports) {
		"use strict";

		function r(r, e) {
			return r.groupOrder !== e.groupOrder ? r.groupOrder - e.groupOrder : r.renderOrder !== e.renderOrder ? r.renderOrder - e.renderOrder : r.program && e.program && r.program !== e.program ? r.program.id - e.program.id : r.material.id !== e.material.id ? r.material.id - e.material.id : r.z !== e.z ? r.z - e.z : r.id - e.id
		}

		function e(r, e) {
			return r.groupOrder !== e.groupOrder ? r.groupOrder - e.groupOrder : r.renderOrder !== e.renderOrder ? r.renderOrder - e.renderOrder : r.z !== e.z ? e.z - r.z : r.id - e.id
		}

		function d() {
			var d = [],
				n = 0,
				t = [],
				i = [];

			function o(r, e, t, i, o, a) {
				var u = d[n];
				return void 0 === u ? (u = {
					id: r.id,
					object: r,
					geometry: e,
					material: t,
					program: t.program,
					groupOrder: i,
					renderOrder: r.renderOrder,
					z: o,
					group: a
				}, d[n] = u) : (u.id = r.id, u.object = r, u.geometry = e, u.material = t, u.program = t.program, u.groupOrder = i, u.renderOrder = r.renderOrder, u.z = o, u.group = a), n++, u
			}
			return {
				opaque: t,
				transparent: i,
				init: function() {
					n = 0, t.length = 0, i.length = 0
				},
				push: function(r, e, d, n, a, u) {
					var p = o(r, e, d, n, a, u);
					(!0 === d.transparent ? i : t).push(p)
				},
				unshift: function(r, e, d, n, a, u) {
					var p = o(r, e, d, n, a, u);
					(!0 === d.transparent ? i : t).unshift(p)
				},
				sort: function() {
					t.length > 1 && t.sort(r), i.length > 1 && i.sort(e)
				}
			}
		}

		function n() {
			var r = {};

			function e(d) {
				var n = d.target;
				n.removeEventListener("dispose", e), delete r[n.id]
			}
			return {
				get: function(n, t) {
					var i, o = r[n.id];
					return void 0 === o ? (i = new d, r[n.id] = {}, r[n.id][t.id] = i, n.addEventListener("dispose", e)) : void 0 === (i = o[t.id]) && (i = new d, o[t.id] = i), i
				},
				dispose: function() {
					r = {}
				}
			}
		}
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.WebGLRenderLists = n;
	}, {}],
	"PL23": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.WebGLLights = s;
		var a = require("../../math/Color.js"),
			o = require("../../math/Matrix4.js"),
			t = require("../../math/Vector2.js"),
			i = require("../../math/Vector3.js");

		function e() {
			var o = {};
			return {
				get: function(e) {
					if (void 0 !== o[e.id]) return o[e.id];
					var r;
					switch (e.type) {
						case "DirectionalLight":
							r = {
								direction: new i.Vector3,
								color: new a.Color,
								shadow: !1,
								shadowBias: 0,
								shadowRadius: 1,
								shadowMapSize: new t.Vector2
							};
							break;
						case "SpotLight":
							r = {
								position: new i.Vector3,
								direction: new i.Vector3,
								color: new a.Color,
								distance: 0,
								coneCos: 0,
								penumbraCos: 0,
								decay: 0,
								shadow: !1,
								shadowBias: 0,
								shadowRadius: 1,
								shadowMapSize: new t.Vector2
							};
							break;
						case "PointLight":
							r = {
								position: new i.Vector3,
								color: new a.Color,
								distance: 0,
								decay: 0,
								shadow: !1,
								shadowBias: 0,
								shadowRadius: 1,
								shadowMapSize: new t.Vector2,
								shadowCameraNear: 1,
								shadowCameraFar: 1e3
							};
							break;
						case "HemisphereLight":
							r = {
								direction: new i.Vector3,
								skyColor: new a.Color,
								groundColor: new a.Color
							};
							break;
						case "RectAreaLight":
							r = {
								color: new a.Color,
								position: new i.Vector3,
								halfWidth: new i.Vector3,
								halfHeight: new i.Vector3
							}
					}
					return o[e.id] = r, r
				}
			}
		}
		var r = 0;

		function s() {
			var a = new e,
				t = {
					id: r++,
					hash: {
						stateID: -1,
						directionalLength: -1,
						pointLength: -1,
						spotLength: -1,
						rectAreaLength: -1,
						hemiLength: -1,
						shadowsLength: -1
					},
					ambient: [0, 0, 0],
					directional: [],
					directionalShadowMap: [],
					directionalShadowMatrix: [],
					spot: [],
					spotShadowMap: [],
					spotShadowMatrix: [],
					rectArea: [],
					point: [],
					pointShadowMap: [],
					pointShadowMatrix: [],
					hemi: []
				},
				s = new i.Vector3,
				n = new o.Matrix4,
				h = new o.Matrix4;
			return {
				setup: function(o, i, e) {
					for (var r = 0, d = 0, c = 0, l = 0, p = 0, w = 0, m = 0, g = 0, u = e.matrixWorldInverse, x = 0, M = o.length; x < M; x++) {
						var S = o[x],
							y = S.color,
							L = S.intensity,
							f = S.distance,
							b = S.shadow && S.shadow.map ? S.shadow.map.texture : null;
						if (S.isAmbientLight) r += y.r * L, d += y.g * L, c += y.b * L;
						else if (S.isDirectionalLight) {
							if ((V = a.get(S)).color.copy(S.color).multiplyScalar(S.intensity), V.direction.setFromMatrixPosition(S.matrixWorld), s.setFromMatrixPosition(S.target.matrixWorld), V.direction.sub(s), V.direction.transformDirection(u), V.shadow = S.castShadow, S.castShadow) {
								var C = S.shadow;
								V.shadowBias = C.bias, V.shadowRadius = C.radius, V.shadowMapSize = C.mapSize
							}
							t.directionalShadowMap[l] = b, t.directionalShadowMatrix[l] = S.shadow.matrix, t.directional[l] = V, l++
						} else if (S.isSpotLight)(V = a.get(S)).position.setFromMatrixPosition(S.matrixWorld), V.position.applyMatrix4(u), V.color.copy(y).multiplyScalar(L), V.distance = f, V.direction.setFromMatrixPosition(S.matrixWorld), s.setFromMatrixPosition(S.target.matrixWorld), V.direction.sub(s), V.direction.transformDirection(u), V.coneCos = Math.cos(S.angle), V.penumbraCos = Math.cos(S.angle * (1 - S.penumbra)), V.decay = S.decay, V.shadow = S.castShadow, S.castShadow && (C = S.shadow, V.shadowBias = C.bias, V.shadowRadius = C.radius, V.shadowMapSize = C.mapSize), t.spotShadowMap[w] = b, t.spotShadowMatrix[w] = S.shadow.matrix, t.spot[w] = V, w++;
						else if (S.isRectAreaLight)(V = a.get(S)).color.copy(y).multiplyScalar(L), V.position.setFromMatrixPosition(S.matrixWorld), V.position.applyMatrix4(u), h.identity(), n.copy(S.matrixWorld), n.premultiply(u), h.extractRotation(n), V.halfWidth.set(.5 * S.width, 0, 0), V.halfHeight.set(0, .5 * S.height, 0), V.halfWidth.applyMatrix4(h), V.halfHeight.applyMatrix4(h), t.rectArea[m] = V, m++;
						else if (S.isPointLight)(V = a.get(S)).position.setFromMatrixPosition(S.matrixWorld), V.position.applyMatrix4(u), V.color.copy(S.color).multiplyScalar(S.intensity), V.distance = S.distance, V.decay = S.decay, V.shadow = S.castShadow, S.castShadow && (C = S.shadow, V.shadowBias = C.bias, V.shadowRadius = C.radius, V.shadowMapSize = C.mapSize, V.shadowCameraNear = C.camera.near, V.shadowCameraFar = C.camera.far), t.pointShadowMap[p] = b, t.pointShadowMatrix[p] = S.shadow.matrix, t.point[p] = V, p++;
						else if (S.isHemisphereLight) {
							var V;
							(V = a.get(S)).direction.setFromMatrixPosition(S.matrixWorld), V.direction.transformDirection(u), V.direction.normalize(), V.skyColor.copy(S.color).multiplyScalar(L), V.groundColor.copy(S.groundColor).multiplyScalar(L), t.hemi[g] = V, g++
						}
					}
					t.ambient[0] = r, t.ambient[1] = d, t.ambient[2] = c, t.directional.length = l, t.spot.length = w, t.rectArea.length = m, t.point.length = p, t.hemi.length = g, t.hash.stateID = t.id, t.hash.directionalLength = l, t.hash.pointLength = p, t.hash.spotLength = w, t.hash.rectAreaLength = m, t.hash.hemiLength = g, t.hash.shadowsLength = i.length
				},
				state: t
			}
		}
	}, {
		"../../math/Color.js": "TFdP",
		"../../math/Matrix4.js": "QUid",
		"../../math/Vector2.js": "vOoB",
		"../../math/Vector3.js": "QLQv"
	}],
	"lPZD": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.WebGLRenderStates = i;
		var e = require("./WebGLLights.js");

		function t() {
			var t = new e.WebGLLights,
				i = [],
				n = [];
			return {
				init: function() {
					i.length = 0, n.length = 0
				},
				state: {
					lightsArray: i,
					shadowsArray: n,
					lights: t
				},
				setupLights: function(e) {
					t.setup(i, n, e)
				},
				pushLight: function(e) {
					i.push(e)
				},
				pushShadow: function(e) {
					n.push(e)
				}
			}
		}

		function i() {
			var e = {};

			function i(t) {
				var n = t.target;
				n.removeEventListener("dispose", i), delete e[n.id]
			}
			return {
				get: function(n, s) {
					var r;
					return void 0 === e[n.id] ? (r = new t, e[n.id] = {}, e[n.id][s.id] = r, n.addEventListener("dispose", i)) : void 0 === e[n.id][s.id] ? (r = new t, e[n.id][s.id] = r) : r = e[n.id][s.id], r
				},
				dispose: function() {
					e = {}
				}
			}
		}
	}, {
		"./WebGLLights.js": "PL23"
	}],
	"TrW5": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.WebGLRenderTarget = s;
		var e = require("../core/EventDispatcher.js"),
			t = require("../textures/Texture.js"),
			i = require("../constants.js"),
			r = require("../math/Vector4.js");

		function s(e, s, h) {
			this.width = e, this.height = s, this.scissor = new r.Vector4(0, 0, e, s), this.scissorTest = !1, this.viewport = new r.Vector4(0, 0, e, s), h = h || {}, this.texture = new t.Texture(void 0, void 0, h.wrapS, h.wrapT, h.magFilter, h.minFilter, h.format, h.type, h.anisotropy, h.encoding), this.texture.generateMipmaps = void 0 !== h.generateMipmaps && h.generateMipmaps, this.texture.minFilter = void 0 !== h.minFilter ? h.minFilter : i.LinearFilter, this.depthBuffer = void 0 === h.depthBuffer || h.depthBuffer, this.stencilBuffer = void 0 === h.stencilBuffer || h.stencilBuffer, this.depthTexture = void 0 !== h.depthTexture ? h.depthTexture : null
		}
		s.prototype = Object.assign(Object.create(e.EventDispatcher.prototype), {
			constructor: s,
			isWebGLRenderTarget: !0,
			setSize: function(e, t) {
				this.width === e && this.height === t || (this.width = e, this.height = t, this.dispose()), this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t)
			},
			clone: function() {
				return (new this.constructor).copy(this)
			},
			copy: function(e) {
				return this.width = e.width, this.height = e.height, this.viewport.copy(e.viewport), this.texture = e.texture.clone(), this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.depthTexture = e.depthTexture, this
			},
			dispose: function() {
				this.dispatchEvent({
					type: "dispose"
				})
			}
		});
	}, {
		"../core/EventDispatcher.js": "SLlv",
		"../textures/Texture.js": "L5Pf",
		"../constants.js": "y6Nk",
		"../math/Vector4.js": "PTKN"
	}],
	"LkmK": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.MeshDepthMaterial = i;
		var t = require("./Material.js"),
			e = require("../constants.js");

		function i(i) {
			t.Material.call(this), this.type = "MeshDepthMaterial", this.depthPacking = e.BasicDepthPacking, this.skinning = !1, this.morphTargets = !1, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.setValues(i)
		}
		i.prototype = Object.create(t.Material.prototype), i.prototype.constructor = i, i.prototype.isMeshDepthMaterial = !0, i.prototype.copy = function(e) {
			return t.Material.prototype.copy.call(this, e), this.depthPacking = e.depthPacking, this.skinning = e.skinning, this.morphTargets = e.morphTargets, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this
		};
	}, {
		"./Material.js": "xEl1",
		"../constants.js": "y6Nk"
	}],
	"idue": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.MeshDistanceMaterial = i;
		var e = require("./Material.js"),
			t = require("../math/Vector3.js");

		function i(i) {
			e.Material.call(this), this.type = "MeshDistanceMaterial", this.referencePosition = new t.Vector3, this.nearDistance = 1, this.farDistance = 1e3, this.skinning = !1, this.morphTargets = !1, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.fog = !1, this.lights = !1, this.setValues(i)
		}
		i.prototype = Object.create(e.Material.prototype), i.prototype.constructor = i, i.prototype.isMeshDistanceMaterial = !0, i.prototype.copy = function(t) {
			return e.Material.prototype.copy.call(this, t), this.referencePosition.copy(t.referencePosition), this.nearDistance = t.nearDistance, this.farDistance = t.farDistance, this.skinning = t.skinning, this.morphTargets = t.morphTargets, this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this
		};
	}, {
		"./Material.js": "xEl1",
		"../math/Vector3.js": "QLQv"
	}],
	"qGYu": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.WebGLShadowMap = c;
		var e = require("../../constants.js"),
			r = require("../WebGLRenderTarget.js"),
			t = require("../../materials/MeshDepthMaterial.js"),
			i = require("../../materials/MeshDistanceMaterial.js"),
			a = require("../../math/Vector4.js"),
			n = require("../../math/Vector3.js"),
			s = require("../../math/Vector2.js"),
			o = require("../../math/Matrix4.js"),
			l = require("../../math/Frustum.js");

		function c(c, d, p) {
			for (var h = new l.Frustum, m = new o.Matrix4, u = new s.Vector2, w = new s.Vector2(p, p), f = new n.Vector3, v = new n.Vector3, M = 1, g = 2, x = 1 + (M | g), V = new Array(x), y = new Array(x), b = {}, S = {
					0: e.BackSide,
					1: e.FrontSide,
					2: e.DoubleSide
				}, j = [new n.Vector3(1, 0, 0), new n.Vector3(-1, 0, 0), new n.Vector3(0, 0, 1), new n.Vector3(0, 0, -1), new n.Vector3(0, 1, 0), new n.Vector3(0, -1, 0)], k = [new n.Vector3(0, 1, 0), new n.Vector3(0, 1, 0), new n.Vector3(0, 1, 0), new n.Vector3(0, 1, 0), new n.Vector3(0, 0, 1), new n.Vector3(0, 0, -1)], T = [new a.Vector4, new a.Vector4, new a.Vector4, new a.Vector4, new a.Vector4, new a.Vector4], D = 0; D !== x; ++D) {
				var P = 0 != (D & M),
					W = 0 != (D & g),
					F = new t.MeshDepthMaterial({
						depthPacking: e.RGBADepthPacking,
						morphTargets: P,
						skinning: W
					});
				V[D] = F;
				var A = new i.MeshDistanceMaterial({
					morphTargets: P,
					skinning: W
				});
				y[D] = A
			}
			var L = this;

			function q(e, r, t, i, a, n) {
				var s = e.geometry,
					o = null,
					l = V,
					d = e.customDepthMaterial;
				if (t && (l = y, d = e.customDistanceMaterial), d) o = d;
				else {
					var p = !1;
					r.morphTargets && (s && s.isBufferGeometry ? p = s.morphAttributes && s.morphAttributes.position && s.morphAttributes.position.length > 0 : s && s.isGeometry && (p = s.morphTargets && s.morphTargets.length > 0)), e.isSkinnedMesh && !1 === r.skinning && console.warn("THREE.WebGLShadowMap: THREE.SkinnedMesh with material.skinning set to false:", e);
					var h = e.isSkinnedMesh && r.skinning,
						m = 0;
					p && (m |= M), h && (m |= g), o = l[m]
				}
				if (c.localClippingEnabled && !0 === r.clipShadows && 0 !== r.clippingPlanes.length) {
					var u = o.uuid,
						w = r.uuid,
						f = b[u];
					void 0 === f && (f = {}, b[u] = f);
					var v = f[w];
					void 0 === v && (v = o.clone(), f[w] = v), o = v
				}
				return o.visible = r.visible, o.wireframe = r.wireframe, o.side = null != r.shadowSide ? r.shadowSide : S[r.side], o.clipShadows = r.clipShadows, o.clippingPlanes = r.clippingPlanes, o.clipIntersection = r.clipIntersection, o.wireframeLinewidth = r.wireframeLinewidth, o.linewidth = r.linewidth, t && o.isMeshDistanceMaterial && (o.referencePosition.copy(i), o.nearDistance = a, o.farDistance = n), o
			}

			function G(e, r, t, i) {
				if (!1 !== e.visible) {
					if (e.layers.test(r.layers) && (e.isMesh || e.isLine || e.isPoints) && e.castShadow && (!e.frustumCulled || h.intersectsObject(e))) {
						e.modelViewMatrix.multiplyMatrices(t.matrixWorldInverse, e.matrixWorld);
						var a = d.update(e),
							n = e.material;
						if (Array.isArray(n))
							for (var s = a.groups, o = 0, l = s.length; o < l; o++) {
								var p = s[o],
									m = n[p.materialIndex];
								if (m && m.visible) {
									var u = q(e, m, i, v, t.near, t.far);
									c.renderBufferDirect(t, null, a, u, e, p)
								}
							} else if (n.visible) {
								u = q(e, n, i, v, t.near, t.far);
								c.renderBufferDirect(t, null, a, u, e, null)
							}
					}
					for (var w = e.children, f = 0, M = w.length; f < M; f++) G(w[f], r, t, i)
				}
			}
			this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = e.PCFShadowMap, this.render = function(t, i, a) {
				if (!1 !== L.enabled && (!1 !== L.autoUpdate || !1 !== L.needsUpdate) && 0 !== t.length) {
					var n, s = c.state;
					s.setBlending(e.NoBlending), s.buffers.color.setClear(1, 1, 1, 1), s.buffers.depth.setTest(!0), s.setScissorTest(!1);
					for (var o = 0, l = t.length; o < l; o++) {
						var d = t[o],
							p = d.shadow,
							M = d && d.isPointLight;
						if (void 0 !== p) {
							var g = p.camera;
							if (u.copy(p.mapSize), u.min(w), M) {
								var x = u.x,
									V = u.y;
								T[0].set(2 * x, V, x, V), T[1].set(0, V, x, V), T[2].set(3 * x, V, x, V), T[3].set(x, V, x, V), T[4].set(3 * x, 0, x, V), T[5].set(x, 0, x, V), u.x *= 4, u.y *= 2
							}
							if (null === p.map) {
								var y = {
									minFilter: e.NearestFilter,
									magFilter: e.NearestFilter,
									format: e.RGBAFormat
								};
								p.map = new r.WebGLRenderTarget(u.x, u.y, y), p.map.texture.name = d.name + ".shadowMap", g.updateProjectionMatrix()
							}
							p.isSpotLightShadow && p.update(d);
							var b = p.map,
								S = p.matrix;
							v.setFromMatrixPosition(d.matrixWorld), g.position.copy(v), M ? (n = 6, S.makeTranslation(-v.x, -v.y, -v.z)) : (n = 1, f.setFromMatrixPosition(d.target.matrixWorld), g.lookAt(f), g.updateMatrixWorld(), S.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1), S.multiply(g.projectionMatrix), S.multiply(g.matrixWorldInverse)), c.setRenderTarget(b), c.clear();
							for (var D = 0; D < n; D++) {
								if (M) {
									f.copy(g.position), f.add(j[D]), g.up.copy(k[D]), g.lookAt(f), g.updateMatrixWorld();
									var P = T[D];
									s.viewport(P)
								}
								m.multiplyMatrices(g.projectionMatrix, g.matrixWorldInverse), h.setFromMatrix(m), G(i, a, g, M)
							}
						} else console.warn("THREE.WebGLShadowMap:", d, "has no shadow.")
					}
					L.needsUpdate = !1
				}
			}
		}
	}, {
		"../../constants.js": "y6Nk",
		"../WebGLRenderTarget.js": "TrW5",
		"../../materials/MeshDepthMaterial.js": "LkmK",
		"../../materials/MeshDistanceMaterial.js": "idue",
		"../../math/Vector4.js": "PTKN",
		"../../math/Vector3.js": "QLQv",
		"../../math/Vector2.js": "vOoB",
		"../../math/Matrix4.js": "QUid",
		"../../math/Frustum.js": "MSmz"
	}],
	"Vqte": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.WebGLState = n;
		var e = require("../../constants.js"),
			t = require("../../math/Vector4.js");

		function n(n, l, r, a) {
			var u = new function() {
					var e = !1,
						l = new t.Vector4,
						r = null,
						a = new t.Vector4(0, 0, 0, 0);
					return {
						setMask: function(t) {
							r === t || e || (n.colorMask(t, t, t, t), r = t)
						},
						setLocked: function(t) {
							e = t
						},
						setClear: function(e, t, r, u, c) {
							!0 === c && (e *= u, t *= u, r *= u), l.set(e, t, r, u), !1 === a.equals(l) && (n.clearColor(e, t, r, u), a.copy(l))
						},
						reset: function() {
							e = !1, r = null, a.set(-1, 0, 0, 0)
						}
					}
				},
				c = new function() {
					var t = !1,
						l = null,
						r = null,
						a = null;
					return {
						setTest: function(e) {
							e ? w(n.DEPTH_TEST) : q(n.DEPTH_TEST)
						},
						setMask: function(e) {
							l === e || t || (n.depthMask(e), l = e)
						},
						setFunc: function(t) {
							if (r !== t) {
								if (t) switch (t) {
									case e.NeverDepth:
										n.depthFunc(n.NEVER);
										break;
									case e.AlwaysDepth:
										n.depthFunc(n.ALWAYS);
										break;
									case e.LessDepth:
										n.depthFunc(n.LESS);
										break;
									case e.LessEqualDepth:
										n.depthFunc(n.LEQUAL);
										break;
									case e.EqualDepth:
										n.depthFunc(n.EQUAL);
										break;
									case e.GreaterEqualDepth:
										n.depthFunc(n.GEQUAL);
										break;
									case e.GreaterDepth:
										n.depthFunc(n.GREATER);
										break;
									case e.NotEqualDepth:
										n.depthFunc(n.NOTEQUAL);
										break;
									default:
										n.depthFunc(n.LEQUAL)
								} else n.depthFunc(n.LEQUAL);
								r = t
							}
						},
						setLocked: function(e) {
							t = e
						},
						setClear: function(e) {
							a !== e && (n.clearDepth(e), a = e)
						},
						reset: function() {
							t = !1, l = null, r = null, a = null
						}
					}
				},
				i = new function() {
					var e = !1,
						t = null,
						l = null,
						r = null,
						a = null,
						u = null,
						c = null,
						i = null,
						s = null;
					return {
						setTest: function(e) {
							e ? w(n.STENCIL_TEST) : q(n.STENCIL_TEST)
						},
						setMask: function(l) {
							t === l || e || (n.stencilMask(l), t = l)
						},
						setFunc: function(e, t, u) {
							l === e && r === t && a === u || (n.stencilFunc(e, t, u), l = e, r = t, a = u)
						},
						setOp: function(e, t, l) {
							u === e && c === t && i === l || (n.stencilOp(e, t, l), u = e, c = t, i = l)
						},
						setLocked: function(t) {
							e = t
						},
						setClear: function(e) {
							s !== e && (n.clearStencil(e), s = e)
						},
						reset: function() {
							e = !1, t = null, l = null, r = null, a = null, u = null, c = null, i = null, s = null
						}
					}
				},
				s = n.getParameter(n.MAX_VERTEX_ATTRIBS),
				o = new Uint8Array(s),
				E = new Uint8Array(s),
				d = new Uint8Array(s),
				_ = {},
				f = null,
				p = null,
				A = null,
				T = null,
				b = null,
				S = null,
				L = null,
				F = null,
				R = null,
				C = null,
				O = !1,
				N = null,
				g = null,
				h = null,
				v = null,
				U = null,
				D = n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),
				x = !1,
				B = 0,
				I = n.getParameter(n.VERSION); - 1 !== I.indexOf("WebGL") ? (B = parseFloat(/^WebGL\ ([0-9])/.exec(I)[1]), x = B >= 1) : -1 !== I.indexOf("OpenGL ES") && (B = parseFloat(/^OpenGL\ ES\ ([0-9])/.exec(I)[1]), x = B >= 2);
			var y = null,
				k = {},
				M = new t.Vector4,
				m = new t.Vector4;

			function G(e, t, l) {
				var r = new Uint8Array(4),
					a = n.createTexture();
				n.bindTexture(e, a), n.texParameteri(e, n.TEXTURE_MIN_FILTER, n.NEAREST), n.texParameteri(e, n.TEXTURE_MAG_FILTER, n.NEAREST);
				for (var u = 0; u < l; u++) n.texImage2D(t + u, 0, n.RGBA, 1, 1, 0, n.RGBA, n.UNSIGNED_BYTE, r);
				return a
			}
			var P = {};

			function W(e, t) {
				(o[e] = 1, 0 === E[e] && (n.enableVertexAttribArray(e), E[e] = 1), d[e] !== t) && ((a.isWebGL2 ? n : l.get("ANGLE_instanced_arrays"))[a.isWebGL2 ? "vertexAttribDivisor" : "vertexAttribDivisorANGLE"](e, t), d[e] = t)
			}

			function w(e) {
				!0 !== _[e] && (n.enable(e), _[e] = !0)
			}

			function q(e) {
				!1 !== _[e] && (n.disable(e), _[e] = !1)
			}

			function H(t, l, a, u, c, i, s, o) {
				if (t !== e.NoBlending) {
					if (A || (w(n.BLEND), A = !0), t === e.CustomBlending) c = c || l, i = i || a, s = s || u, l === b && c === F || (n.blendEquationSeparate(r.convert(l), r.convert(c)), b = l, F = c), a === S && u === L && i === R && s === C || (n.blendFuncSeparate(r.convert(a), r.convert(u), r.convert(i), r.convert(s)), S = a, L = u, R = i, C = s), T = t, O = null;
					else if (t !== T || o !== O) {
						if (b === e.AddEquation && F === e.AddEquation || (n.blendEquation(n.FUNC_ADD), b = e.AddEquation, F = e.AddEquation), o) switch (t) {
							case e.NormalBlending:
								n.blendFuncSeparate(n.ONE, n.ONE_MINUS_SRC_ALPHA, n.ONE, n.ONE_MINUS_SRC_ALPHA);
								break;
							case e.AdditiveBlending:
								n.blendFunc(n.ONE, n.ONE);
								break;
							case e.SubtractiveBlending:
								n.blendFuncSeparate(n.ZERO, n.ZERO, n.ONE_MINUS_SRC_COLOR, n.ONE_MINUS_SRC_ALPHA);
								break;
							case e.MultiplyBlending:
								n.blendFuncSeparate(n.ZERO, n.SRC_COLOR, n.ZERO, n.SRC_ALPHA);
								break;
							default:
								console.error("THREE.WebGLState: Invalid blending: ", t)
						} else switch (t) {
							case e.NormalBlending:
								n.blendFuncSeparate(n.SRC_ALPHA, n.ONE_MINUS_SRC_ALPHA, n.ONE, n.ONE_MINUS_SRC_ALPHA);
								break;
							case e.AdditiveBlending:
								n.blendFunc(n.SRC_ALPHA, n.ONE);
								break;
							case e.SubtractiveBlending:
								n.blendFunc(n.ZERO, n.ONE_MINUS_SRC_COLOR);
								break;
							case e.MultiplyBlending:
								n.blendFunc(n.ZERO, n.SRC_COLOR);
								break;
							default:
								console.error("THREE.WebGLState: Invalid blending: ", t)
						}
						S = null, L = null, R = null, C = null, T = t, O = o
					}
				} else A && (q(n.BLEND), A = !1)
			}

			function X(e) {
				N !== e && (e ? n.frontFace(n.CW) : n.frontFace(n.CCW), N = e)
			}

			function V(t) {
				t !== e.CullFaceNone ? (w(n.CULL_FACE), t !== g && (t === e.CullFaceBack ? n.cullFace(n.BACK) : t === e.CullFaceFront ? n.cullFace(n.FRONT) : n.cullFace(n.FRONT_AND_BACK))) : q(n.CULL_FACE), g = t
			}

			function Q(e, t, l) {
				e ? (w(n.POLYGON_OFFSET_FILL), v === t && U === l || (n.polygonOffset(t, l), v = t, U = l)) : q(n.POLYGON_OFFSET_FILL)
			}

			function Z(e) {
				void 0 === e && (e = n.TEXTURE0 + D - 1), y !== e && (n.activeTexture(e), y = e)
			}
			return P[n.TEXTURE_2D] = G(n.TEXTURE_2D, n.TEXTURE_2D, 1), P[n.TEXTURE_CUBE_MAP] = G(n.TEXTURE_CUBE_MAP, n.TEXTURE_CUBE_MAP_POSITIVE_X, 6), u.setClear(0, 0, 0, 1), c.setClear(1), i.setClear(0), w(n.DEPTH_TEST), c.setFunc(e.LessEqualDepth), X(!1), V(e.CullFaceBack), w(n.CULL_FACE), H(e.NoBlending), {
				buffers: {
					color: u,
					depth: c,
					stencil: i
				},
				initAttributes: function() {
					for (var e = 0, t = o.length; e < t; e++) o[e] = 0
				},
				enableAttribute: function(e) {
					W(e, 0)
				},
				enableAttributeAndDivisor: W,
				disableUnusedAttributes: function() {
					for (var e = 0, t = E.length; e !== t; ++e) E[e] !== o[e] && (n.disableVertexAttribArray(e), E[e] = 0)
				},
				enable: w,
				disable: q,
				getCompressedTextureFormats: function() {
					if (null === f && (f = [], l.get("WEBGL_compressed_texture_pvrtc") || l.get("WEBGL_compressed_texture_s3tc") || l.get("WEBGL_compressed_texture_etc1") || l.get("WEBGL_compressed_texture_astc")))
						for (var e = n.getParameter(n.COMPRESSED_TEXTURE_FORMATS), t = 0; t < e.length; t++) f.push(e[t]);
					return f
				},
				useProgram: function(e) {
					return p !== e && (n.useProgram(e), p = e, !0)
				},
				setBlending: H,
				setMaterial: function(t, l) {
					t.side === e.DoubleSide ? q(n.CULL_FACE) : w(n.CULL_FACE);
					var r = t.side === e.BackSide;
					l && (r = !r), X(r), t.blending === e.NormalBlending && !1 === t.transparent ? H(e.NoBlending) : H(t.blending, t.blendEquation, t.blendSrc, t.blendDst, t.blendEquationAlpha, t.blendSrcAlpha, t.blendDstAlpha, t.premultipliedAlpha), c.setFunc(t.depthFunc), c.setTest(t.depthTest), c.setMask(t.depthWrite), u.setMask(t.colorWrite), Q(t.polygonOffset, t.polygonOffsetFactor, t.polygonOffsetUnits)
				},
				setFlipSided: X,
				setCullFace: V,
				setLineWidth: function(e) {
					e !== h && (x && n.lineWidth(e), h = e)
				},
				setPolygonOffset: Q,
				setScissorTest: function(e) {
					e ? w(n.SCISSOR_TEST) : q(n.SCISSOR_TEST)
				},
				activeTexture: Z,
				bindTexture: function(e, t) {
					null === y && Z();
					var l = k[y];
					void 0 === l && (l = {
						type: void 0,
						texture: void 0
					}, k[y] = l), l.type === e && l.texture === t || (n.bindTexture(e, t || P[e]), l.type = e, l.texture = t)
				},
				compressedTexImage2D: function() {
					try {
						n.compressedTexImage2D.apply(n, arguments)
					} catch (e) {
						console.error("THREE.WebGLState:", e)
					}
				},
				texImage2D: function() {
					try {
						n.texImage2D.apply(n, arguments)
					} catch (e) {
						console.error("THREE.WebGLState:", e)
					}
				},
				texImage3D: function() {
					try {
						n.texImage3D.apply(n, arguments)
					} catch (e) {
						console.error("THREE.WebGLState:", e)
					}
				},
				scissor: function(e) {
					!1 === M.equals(e) && (n.scissor(e.x, e.y, e.z, e.w), M.copy(e))
				},
				viewport: function(e) {
					!1 === m.equals(e) && (n.viewport(e.x, e.y, e.z, e.w), m.copy(e))
				},
				reset: function() {
					for (var e = 0; e < E.length; e++) 1 === E[e] && (n.disableVertexAttribArray(e), E[e] = 0);
					_ = {}, f = null, y = null, k = {}, p = null, T = null, N = null, g = null, u.reset(), c.reset(), i.reset()
				}
			}
		}
	}, {
		"../../constants.js": "y6Nk",
		"../../math/Vector4.js": "PTKN"
	}],
	"QhjG": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.WebGLTextures = r;
		var e = require("../../constants.js"),
			t = require("../../math/Math.js");

		function r(r, i, a, n, T, u, E) {
			var f, _ = {};

			function o(e, r, i, a) {
				var n = 1;
				if ((e.width > a || e.height > a) && (n = a / Math.max(e.width, e.height)), n < 1 || !0 === r) {
					if (e instanceof HTMLImageElement || e instanceof HTMLCanvasElement || e instanceof ImageBitmap) {
						void 0 === f && (f = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas"));
						var T = i ? document.createElementNS("http://www.w3.org/1999/xhtml", "canvas") : f,
							u = r ? t._Math.floorPowerOfTwo : Math.floor;
						return T.width = u(n * e.width), T.height = u(n * e.height), T.getContext("2d").drawImage(e, 0, 0, T.width, T.height), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + e.width + "x" + e.height + ") to (" + T.width + "x" + T.height + ")."), T
					}
					return "data" in e && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + e.width + "x" + e.height + ")."), e
				}
				return e
			}

			function l(e) {
				return t._Math.isPowerOfTwo(e.width) && t._Math.isPowerOfTwo(e.height)
			}

			function d(t, r) {
				return t.generateMipmaps && r && t.minFilter !== e.NearestFilter && t.minFilter !== e.LinearFilter
			}

			function R(e, t, i, a) {
				r.generateMipmap(e), n.get(t).__maxMipLevel = Math.log(Math.max(i, a)) * Math.LOG2E
			}

			function s(e, t) {
				if (!T.isWebGL2) return e;
				var a = e;
				return e === r.RED && (t === r.FLOAT && (a = r.R32F), t === r.HALF_FLOAT && (a = r.R16F), t === r.UNSIGNED_BYTE && (a = r.R8)), e === r.RGB && (t === r.FLOAT && (a = r.RGB32F), t === r.HALF_FLOAT && (a = r.RGB16F), t === r.UNSIGNED_BYTE && (a = r.RGB8)), e === r.RGBA && (t === r.FLOAT && (a = r.RGBA32F), t === r.HALF_FLOAT && (a = r.RGBA16F), t === r.UNSIGNED_BYTE && (a = r.RGBA8)), a === r.R16F || a === r.R32F || a === r.RGBA16F || a === r.RGBA32F ? i.get("EXT_color_buffer_float") : a !== r.RGB16F && a !== r.RGB32F || console.warn("THREE.WebGLRenderer: Floating point textures with RGB format not supported. Please use RGBA instead."), a
			}

			function g(t) {
				return t === e.NearestFilter || t === e.NearestMipMapNearestFilter || t === e.NearestMipMapLinearFilter ? r.NEAREST : r.LINEAR
			}

			function b(e) {
				var t = e.target;
				t.removeEventListener("dispose", b),
					function(e) {
						var t = n.get(e);
						if (e.image && t.__image__webglTextureCube) r.deleteTexture(t.__image__webglTextureCube);
						else {
							if (void 0 === t.__webglInit) return;
							r.deleteTexture(t.__webglTexture)
						}
						n.remove(e)
					}(t), t.isVideoTexture && delete _[t.id], E.memory.textures--
			}

			function m(e) {
				var t = e.target;
				t.removeEventListener("dispose", m),
					function(e) {
						var t = n.get(e),
							i = n.get(e.texture);
						if (!e) return;
						void 0 !== i.__webglTexture && r.deleteTexture(i.__webglTexture);
						e.depthTexture && e.depthTexture.dispose();
						if (e.isWebGLRenderTargetCube)
							for (var a = 0; a < 6; a++) r.deleteFramebuffer(t.__webglFramebuffer[a]), t.__webglDepthbuffer && r.deleteRenderbuffer(t.__webglDepthbuffer[a]);
						else r.deleteFramebuffer(t.__webglFramebuffer), t.__webglDepthbuffer && r.deleteRenderbuffer(t.__webglDepthbuffer);
						n.remove(e.texture), n.remove(e)
					}(t), E.memory.textures--
			}

			function h(e, t) {
				var i = n.get(e);
				if (e.isVideoTexture && function(e) {
						var t = e.id,
							r = E.render.frame;
						_[t] !== r && (_[t] = r, e.update())
					}(e), e.version > 0 && i.__version !== e.version) {
					var T = e.image;
					if (void 0 === T) console.warn("THREE.WebGLRenderer: Texture marked for update but image is undefined");
					else {
						if (!1 !== T.complete) return void F(i, e, t);
						console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")
					}
				}
				a.activeTexture(r.TEXTURE0 + t), a.bindTexture(r.TEXTURE_2D, i.__webglTexture)
			}

			function p(t, a, E) {
				var f;
				if (E ? (r.texParameteri(t, r.TEXTURE_WRAP_S, u.convert(a.wrapS)), r.texParameteri(t, r.TEXTURE_WRAP_T, u.convert(a.wrapT)), r.texParameteri(t, r.TEXTURE_MAG_FILTER, u.convert(a.magFilter)), r.texParameteri(t, r.TEXTURE_MIN_FILTER, u.convert(a.minFilter))) : (r.texParameteri(t, r.TEXTURE_WRAP_S, r.CLAMP_TO_EDGE), r.texParameteri(t, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE), a.wrapS === e.ClampToEdgeWrapping && a.wrapT === e.ClampToEdgeWrapping || console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."), r.texParameteri(t, r.TEXTURE_MAG_FILTER, g(a.magFilter)), r.texParameteri(t, r.TEXTURE_MIN_FILTER, g(a.minFilter)), a.minFilter !== e.NearestFilter && a.minFilter !== e.LinearFilter && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")), f = i.get("EXT_texture_filter_anisotropic")) {
					if (a.type === e.FloatType && null === i.get("OES_texture_float_linear")) return;
					if (a.type === e.HalfFloatType && null === (T.isWebGL2 || i.get("OES_texture_half_float_linear"))) return;
					(a.anisotropy > 1 || n.get(a).__currentAnisotropy) && (r.texParameterf(t, f.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(a.anisotropy, T.getMaxAnisotropy())), n.get(a).__currentAnisotropy = a.anisotropy)
				}
			}

			function F(t, i, n) {
				var f;
				f = i.isDataTexture3D ? r.TEXTURE_3D : r.TEXTURE_2D, void 0 === t.__webglInit && (t.__webglInit = !0, i.addEventListener("dispose", b), t.__webglTexture = r.createTexture(), E.memory.textures++), a.activeTexture(r.TEXTURE0 + n), a.bindTexture(f, t.__webglTexture), r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, i.flipY), r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, i.premultiplyAlpha), r.pixelStorei(r.UNPACK_ALIGNMENT, i.unpackAlignment);
				var _ = function(t) {
						return !T.isWebGL2 && (t.wrapS !== e.ClampToEdgeWrapping || t.wrapT !== e.ClampToEdgeWrapping || t.minFilter !== e.NearestFilter && t.minFilter !== e.LinearFilter)
					}(i) && !1 === l(i.image),
					g = o(i.image, _, !1, T.maxTextureSize),
					m = l(g) || T.isWebGL2,
					h = u.convert(i.format),
					F = u.convert(i.type),
					x = s(h, F);
				p(f, i, m);
				var w, U = i.mipmaps;
				if (i.isDepthTexture) {
					if (x = r.DEPTH_COMPONENT, i.type === e.FloatType) {
						if (!T.isWebGL2) throw new Error("Float Depth Texture only supported in WebGL2.0");
						x = r.DEPTH_COMPONENT32F
					} else T.isWebGL2 && (x = r.DEPTH_COMPONENT16);
					i.format === e.DepthFormat && x === r.DEPTH_COMPONENT && i.type !== e.UnsignedShortType && i.type !== e.UnsignedIntType && (console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."), i.type = e.UnsignedShortType, F = u.convert(i.type)), i.format === e.DepthStencilFormat && (x = r.DEPTH_STENCIL, i.type !== e.UnsignedInt248Type && (console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."), i.type = e.UnsignedInt248Type, F = u.convert(i.type))), a.texImage2D(r.TEXTURE_2D, 0, x, g.width, g.height, 0, h, F, null)
				} else if (i.isDataTexture)
					if (U.length > 0 && m) {
						for (var D = 0, c = U.length; D < c; D++) w = U[D], a.texImage2D(r.TEXTURE_2D, D, x, w.width, w.height, 0, h, F, w.data);
						i.generateMipmaps = !1, t.__maxMipLevel = U.length - 1
					} else a.texImage2D(r.TEXTURE_2D, 0, x, g.width, g.height, 0, h, F, g.data), t.__maxMipLevel = 0;
				else if (i.isCompressedTexture) {
					for (D = 0, c = U.length; D < c; D++) w = U[D], i.format !== e.RGBAFormat && i.format !== e.RGBFormat ? a.getCompressedTextureFormats().indexOf(h) > -1 ? a.compressedTexImage2D(r.TEXTURE_2D, D, x, w.width, w.height, 0, w.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : a.texImage2D(r.TEXTURE_2D, D, x, w.width, w.height, 0, h, F, w.data);
					t.__maxMipLevel = U.length - 1
				} else if (i.isDataTexture3D) a.texImage3D(r.TEXTURE_3D, 0, x, g.width, g.height, g.depth, 0, h, F, g.data), t.__maxMipLevel = 0;
				else if (U.length > 0 && m) {
					for (D = 0, c = U.length; D < c; D++) w = U[D], a.texImage2D(r.TEXTURE_2D, D, x, h, F, w);
					i.generateMipmaps = !1, t.__maxMipLevel = U.length - 1
				} else a.texImage2D(r.TEXTURE_2D, 0, x, h, F, g), t.__maxMipLevel = 0;
				d(i, m) && R(r.TEXTURE_2D, i, g.width, g.height), t.__version = i.version, i.onUpdate && i.onUpdate(i)
			}

			function x(e, t, i, T) {
				var E = u.convert(t.texture.format),
					f = u.convert(t.texture.type),
					_ = s(E, f);
				a.texImage2D(T, 0, _, t.width, t.height, 0, E, f, null), r.bindFramebuffer(r.FRAMEBUFFER, e), r.framebufferTexture2D(r.FRAMEBUFFER, i, T, n.get(t.texture).__webglTexture, 0), r.bindFramebuffer(r.FRAMEBUFFER, null)
			}

			function w(e, t, i) {
				if (r.bindRenderbuffer(r.RENDERBUFFER, e), t.depthBuffer && !t.stencilBuffer) {
					if (i) {
						var a = D(t);
						r.renderbufferStorageMultisample(r.RENDERBUFFER, a, r.DEPTH_COMPONENT16, t.width, t.height)
					} else r.renderbufferStorage(r.RENDERBUFFER, r.DEPTH_COMPONENT16, t.width, t.height);
					r.framebufferRenderbuffer(r.FRAMEBUFFER, r.DEPTH_ATTACHMENT, r.RENDERBUFFER, e)
				} else if (t.depthBuffer && t.stencilBuffer) {
					if (i) {
						a = D(t);
						r.renderbufferStorageMultisample(r.RENDERBUFFER, a, r.DEPTH_STENCIL, t.width, t.height)
					} else r.renderbufferStorage(r.RENDERBUFFER, r.DEPTH_STENCIL, t.width, t.height);
					r.framebufferRenderbuffer(r.FRAMEBUFFER, r.DEPTH_STENCIL_ATTACHMENT, r.RENDERBUFFER, e)
				} else {
					var n = s(u.convert(t.texture.format), u.convert(t.texture.type));
					if (i) {
						a = D(t);
						r.renderbufferStorageMultisample(r.RENDERBUFFER, a, n, t.width, t.height)
					} else r.renderbufferStorage(r.RENDERBUFFER, n, t.width, t.height)
				}
				r.bindRenderbuffer(r.RENDERBUFFER, null)
			}

			function U(t) {
				var i = n.get(t),
					a = !0 === t.isWebGLRenderTargetCube;
				if (t.depthTexture) {
					if (a) throw new Error("target.depthTexture not supported in Cube render targets");
					! function(t, i) {
						if (i && i.isWebGLRenderTargetCube) throw new Error("Depth Texture with cube render targets is not supported");
						if (r.bindFramebuffer(r.FRAMEBUFFER, t), !i.depthTexture || !i.depthTexture.isDepthTexture) throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
						n.get(i.depthTexture).__webglTexture && i.depthTexture.image.width === i.width && i.depthTexture.image.height === i.height || (i.depthTexture.image.width = i.width, i.depthTexture.image.height = i.height, i.depthTexture.needsUpdate = !0), h(i.depthTexture, 0);
						var a = n.get(i.depthTexture).__webglTexture;
						if (i.depthTexture.format === e.DepthFormat) r.framebufferTexture2D(r.FRAMEBUFFER, r.DEPTH_ATTACHMENT, r.TEXTURE_2D, a, 0);
						else {
							if (i.depthTexture.format !== e.DepthStencilFormat) throw new Error("Unknown depthTexture format");
							r.framebufferTexture2D(r.FRAMEBUFFER, r.DEPTH_STENCIL_ATTACHMENT, r.TEXTURE_2D, a, 0)
						}
					}(i.__webglFramebuffer, t)
				} else if (a) {
					i.__webglDepthbuffer = [];
					for (var T = 0; T < 6; T++) r.bindFramebuffer(r.FRAMEBUFFER, i.__webglFramebuffer[T]), i.__webglDepthbuffer[T] = r.createRenderbuffer(), w(i.__webglDepthbuffer[T], t)
				} else r.bindFramebuffer(r.FRAMEBUFFER, i.__webglFramebuffer), i.__webglDepthbuffer = r.createRenderbuffer(), w(i.__webglDepthbuffer, t);
				r.bindFramebuffer(r.FRAMEBUFFER, null)
			}

			function D(e) {
				return T.isWebGL2 && e.isWebGLMultisampleRenderTarget ? Math.min(T.maxSamples, e.samples) : 0
			}
			this.setTexture2D = h, this.setTexture3D = function(e, t) {
				var i = n.get(e);
				e.version > 0 && i.__version !== e.version ? F(i, e, t) : (a.activeTexture(r.TEXTURE0 + t), a.bindTexture(r.TEXTURE_3D, i.__webglTexture))
			}, this.setTextureCube = function(t, i) {
				var f = n.get(t);
				if (6 === t.image.length)
					if (t.version > 0 && f.__version !== t.version) {
						f.__image__webglTextureCube || (t.addEventListener("dispose", b), f.__image__webglTextureCube = r.createTexture(), E.memory.textures++), a.activeTexture(r.TEXTURE0 + i), a.bindTexture(r.TEXTURE_CUBE_MAP, f.__image__webglTextureCube), r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, t.flipY);
						for (var _ = t && t.isCompressedTexture, g = t.image[0] && t.image[0].isDataTexture, m = [], h = 0; h < 6; h++) m[h] = _ || g ? g ? t.image[h].image : t.image[h] : o(t.image[h], !1, !0, T.maxCubemapSize);
						var F = m[0],
							x = l(F) || T.isWebGL2,
							w = u.convert(t.format),
							U = u.convert(t.type),
							D = s(w, U);
						for (p(r.TEXTURE_CUBE_MAP, t, x), h = 0; h < 6; h++)
							if (_)
								for (var c, v = m[h].mipmaps, M = 0, L = v.length; M < L; M++) c = v[M], t.format !== e.RGBAFormat && t.format !== e.RGBFormat ? a.getCompressedTextureFormats().indexOf(w) > -1 ? a.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X + h, M, D, c.width, c.height, 0, c.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : a.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X + h, M, D, c.width, c.height, 0, w, U, c.data);
							else g ? a.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X + h, 0, D, m[h].width, m[h].height, 0, w, U, m[h].data) : a.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X + h, 0, D, w, U, m[h]);
						f.__maxMipLevel = _ ? v.length - 1 : 0, d(t, x) && R(r.TEXTURE_CUBE_MAP, t, F.width, F.height), f.__version = t.version, t.onUpdate && t.onUpdate(t)
					} else a.activeTexture(r.TEXTURE0 + i), a.bindTexture(r.TEXTURE_CUBE_MAP, f.__image__webglTextureCube)
			}, this.setTextureCubeDynamic = function(e, t) {
				a.activeTexture(r.TEXTURE0 + t), a.bindTexture(r.TEXTURE_CUBE_MAP, n.get(e).__webglTexture)
			}, this.setupRenderTarget = function(e) {
				var t = n.get(e),
					i = n.get(e.texture);
				e.addEventListener("dispose", m), i.__webglTexture = r.createTexture(), E.memory.textures++;
				var f = !0 === e.isWebGLRenderTargetCube,
					_ = !0 === e.isWebGLMultisampleRenderTarget,
					o = l(e) || T.isWebGL2;
				if (f) {
					t.__webglFramebuffer = [];
					for (var g = 0; g < 6; g++) t.__webglFramebuffer[g] = r.createFramebuffer()
				} else if (t.__webglFramebuffer = r.createFramebuffer(), _)
					if (T.isWebGL2) {
						t.__webglMultisampledFramebuffer = r.createFramebuffer(), t.__webglColorRenderbuffer = r.createRenderbuffer(), r.bindRenderbuffer(r.RENDERBUFFER, t.__webglColorRenderbuffer);
						var b = s(u.convert(e.texture.format), u.convert(e.texture.type)),
							h = D(e);
						r.renderbufferStorageMultisample(r.RENDERBUFFER, h, b, e.width, e.height), r.bindFramebuffer(r.FRAMEBUFFER, t.__webglMultisampledFramebuffer), r.framebufferRenderbuffer(r.FRAMEBUFFER, r.COLOR_ATTACHMENT0, r.RENDERBUFFER, t.__webglColorRenderbuffer), r.bindRenderbuffer(r.RENDERBUFFER, null), e.depthBuffer && (t.__webglDepthRenderbuffer = r.createRenderbuffer(), w(t.__webglDepthRenderbuffer, e, !0)), r.bindFramebuffer(r.FRAMEBUFFER, null)
					} else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.");
				if (f) {
					for (a.bindTexture(r.TEXTURE_CUBE_MAP, i.__webglTexture), p(r.TEXTURE_CUBE_MAP, e.texture, o), g = 0; g < 6; g++) x(t.__webglFramebuffer[g], e, r.COLOR_ATTACHMENT0, r.TEXTURE_CUBE_MAP_POSITIVE_X + g);
					d(e.texture, o) && R(r.TEXTURE_CUBE_MAP, e.texture, e.width, e.height), a.bindTexture(r.TEXTURE_CUBE_MAP, null)
				} else a.bindTexture(r.TEXTURE_2D, i.__webglTexture), p(r.TEXTURE_2D, e.texture, o), x(t.__webglFramebuffer, e, r.COLOR_ATTACHMENT0, r.TEXTURE_2D), d(e.texture, o) && R(r.TEXTURE_2D, e.texture, e.width, e.height), a.bindTexture(r.TEXTURE_2D, null);
				e.depthBuffer && U(e)
			}, this.updateRenderTargetMipmap = function(e) {
				var t = e.texture;
				if (d(t, l(e) || T.isWebGL2)) {
					var i = e.isWebGLRenderTargetCube ? r.TEXTURE_CUBE_MAP : r.TEXTURE_2D,
						u = n.get(t).__webglTexture;
					a.bindTexture(i, u), R(i, t, e.width, e.height), a.bindTexture(i, null)
				}
			}, this.updateMultisampleRenderTarget = function(e) {
				if (e.isWebGLMultisampleRenderTarget)
					if (T.isWebGL2) {
						var t = n.get(e);
						r.bindFramebuffer(r.READ_FRAMEBUFFER, t.__webglMultisampledFramebuffer), r.bindFramebuffer(r.DRAW_FRAMEBUFFER, t.__webglFramebuffer);
						var i = e.width,
							a = e.height,
							u = r.COLOR_BUFFER_BIT;
						e.depthBuffer && (u |= r.DEPTH_BUFFER_BIT), e.stencilBuffer && (u |= r.STENCIL_BUFFER_BIT), r.blitFramebuffer(0, 0, i, a, 0, 0, i, a, u, r.NEAREST)
					} else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.")
			}
		}
	}, {
		"../../constants.js": "y6Nk",
		"../../math/Math.js": "M5nx"
	}],
	"itKU": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.WebGLUtils = _;
		var r = require("../../constants.js");

		function _(_, t, e) {
			return {
				convert: function(n) {
					var i;
					if (n === r.RepeatWrapping) return _.REPEAT;
					if (n === r.ClampToEdgeWrapping) return _.CLAMP_TO_EDGE;
					if (n === r.MirroredRepeatWrapping) return _.MIRRORED_REPEAT;
					if (n === r.NearestFilter) return _.NEAREST;
					if (n === r.NearestMipMapNearestFilter) return _.NEAREST_MIPMAP_NEAREST;
					if (n === r.NearestMipMapLinearFilter) return _.NEAREST_MIPMAP_LINEAR;
					if (n === r.LinearFilter) return _.LINEAR;
					if (n === r.LinearMipMapNearestFilter) return _.LINEAR_MIPMAP_NEAREST;
					if (n === r.LinearMipMapLinearFilter) return _.LINEAR_MIPMAP_LINEAR;
					if (n === r.UnsignedByteType) return _.UNSIGNED_BYTE;
					if (n === r.UnsignedShort4444Type) return _.UNSIGNED_SHORT_4_4_4_4;
					if (n === r.UnsignedShort5551Type) return _.UNSIGNED_SHORT_5_5_5_1;
					if (n === r.UnsignedShort565Type) return _.UNSIGNED_SHORT_5_6_5;
					if (n === r.ByteType) return _.BYTE;
					if (n === r.ShortType) return _.SHORT;
					if (n === r.UnsignedShortType) return _.UNSIGNED_SHORT;
					if (n === r.IntType) return _.INT;
					if (n === r.UnsignedIntType) return _.UNSIGNED_INT;
					if (n === r.FloatType) return _.FLOAT;
					if (n === r.HalfFloatType) {
						if (e.isWebGL2) return _.HALF_FLOAT;
						if (null !== (i = t.get("OES_texture_half_float"))) return i.HALF_FLOAT_OES
					}
					if (n === r.AlphaFormat) return _.ALPHA;
					if (n === r.RGBFormat) return _.RGB;
					if (n === r.RGBAFormat) return _.RGBA;
					if (n === r.LuminanceFormat) return _.LUMINANCE;
					if (n === r.LuminanceAlphaFormat) return _.LUMINANCE_ALPHA;
					if (n === r.DepthFormat) return _.DEPTH_COMPONENT;
					if (n === r.DepthStencilFormat) return _.DEPTH_STENCIL;
					if (n === r.RedFormat) return _.RED;
					if (n === r.AddEquation) return _.FUNC_ADD;
					if (n === r.SubtractEquation) return _.FUNC_SUBTRACT;
					if (n === r.ReverseSubtractEquation) return _.FUNC_REVERSE_SUBTRACT;
					if (n === r.ZeroFactor) return _.ZERO;
					if (n === r.OneFactor) return _.ONE;
					if (n === r.SrcColorFactor) return _.SRC_COLOR;
					if (n === r.OneMinusSrcColorFactor) return _.ONE_MINUS_SRC_COLOR;
					if (n === r.SrcAlphaFactor) return _.SRC_ALPHA;
					if (n === r.OneMinusSrcAlphaFactor) return _.ONE_MINUS_SRC_ALPHA;
					if (n === r.DstAlphaFactor) return _.DST_ALPHA;
					if (n === r.OneMinusDstAlphaFactor) return _.ONE_MINUS_DST_ALPHA;
					if (n === r.DstColorFactor) return _.DST_COLOR;
					if (n === r.OneMinusDstColorFactor) return _.ONE_MINUS_DST_COLOR;
					if (n === r.SrcAlphaSaturateFactor) return _.SRC_ALPHA_SATURATE;
					if ((n === r.RGB_S3TC_DXT1_Format || n === r.RGBA_S3TC_DXT1_Format || n === r.RGBA_S3TC_DXT3_Format || n === r.RGBA_S3TC_DXT5_Format) && null !== (i = t.get("WEBGL_compressed_texture_s3tc"))) {
						if (n === r.RGB_S3TC_DXT1_Format) return i.COMPRESSED_RGB_S3TC_DXT1_EXT;
						if (n === r.RGBA_S3TC_DXT1_Format) return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;
						if (n === r.RGBA_S3TC_DXT3_Format) return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;
						if (n === r.RGBA_S3TC_DXT5_Format) return i.COMPRESSED_RGBA_S3TC_DXT5_EXT
					}
					if ((n === r.RGB_PVRTC_4BPPV1_Format || n === r.RGB_PVRTC_2BPPV1_Format || n === r.RGBA_PVRTC_4BPPV1_Format || n === r.RGBA_PVRTC_2BPPV1_Format) && null !== (i = t.get("WEBGL_compressed_texture_pvrtc"))) {
						if (n === r.RGB_PVRTC_4BPPV1_Format) return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
						if (n === r.RGB_PVRTC_2BPPV1_Format) return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
						if (n === r.RGBA_PVRTC_4BPPV1_Format) return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
						if (n === r.RGBA_PVRTC_2BPPV1_Format) return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
					}
					if (n === r.RGB_ETC1_Format && null !== (i = t.get("WEBGL_compressed_texture_etc1"))) return i.COMPRESSED_RGB_ETC1_WEBGL;
					if ((n === r.RGBA_ASTC_4x4_Format || n === r.RGBA_ASTC_5x4_Format || n === r.RGBA_ASTC_5x5_Format || n === r.RGBA_ASTC_6x5_Format || n === r.RGBA_ASTC_6x6_Format || n === r.RGBA_ASTC_8x5_Format || n === r.RGBA_ASTC_8x6_Format || n === r.RGBA_ASTC_8x8_Format || n === r.RGBA_ASTC_10x5_Format || n === r.RGBA_ASTC_10x6_Format || n === r.RGBA_ASTC_10x8_Format || n === r.RGBA_ASTC_10x10_Format || n === r.RGBA_ASTC_12x10_Format || n === r.RGBA_ASTC_12x12_Format) && null !== (i = t.get("WEBGL_compressed_texture_astc"))) return n;
					if (n === r.MinEquation || n === r.MaxEquation) {
						if (e.isWebGL2) {
							if (n === r.MinEquation) return _.MIN;
							if (n === r.MaxEquation) return _.MAX
						}
						if (null !== (i = t.get("EXT_blend_minmax"))) {
							if (n === r.MinEquation) return i.MIN_EXT;
							if (n === r.MaxEquation) return i.MAX_EXT
						}
					}
					if (n === r.UnsignedInt248Type) {
						if (e.isWebGL2) return _.UNSIGNED_INT_24_8;
						if (null !== (i = t.get("WEBGL_depth_texture"))) return i.UNSIGNED_INT_24_8_WEBGL
					}
					return 0
				}
			}
		}
	}, {
		"../../constants.js": "y6Nk"
	}],
	"tUmb": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.Group = t;
		var e = require("../core/Object3D.js");

		function t() {
			e.Object3D.call(this), this.type = "Group"
		}
		t.prototype = Object.assign(Object.create(e.Object3D.prototype), {
			constructor: t,
			isGroup: !0
		});
	}, {
		"../core/Object3D.js": "Nnue"
	}],
	"b1fc": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.ArrayCamera = r;
		var e = require("./PerspectiveCamera.js");

		function r(r) {
			e.PerspectiveCamera.call(this), this.cameras = r || []
		}
		r.prototype = Object.assign(Object.create(e.PerspectiveCamera.prototype), {
			constructor: r,
			isArrayCamera: !0
		});
	}, {
		"./PerspectiveCamera.js": "iz3s"
	}],
	"9FfE": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.setProjectionFromUnion = o;
		var e = require("../../math/Vector3.js"),
			r = new e.Vector3,
			t = new e.Vector3;

		function o(e, o, i) {
			r.setFromMatrixPosition(o.matrixWorld), t.setFromMatrixPosition(i.matrixWorld);
			var a = r.distanceTo(t),
				n = o.projectionMatrix.elements,
				s = i.projectionMatrix.elements,
				c = n[14] / (n[10] - 1),
				m = n[14] / (n[10] + 1),
				l = (n[9] + 1) / n[5],
				x = (n[9] - 1) / n[5],
				p = (n[8] - 1) / n[0],
				d = (s[8] + 1) / s[0],
				u = c * p,
				v = c * d,
				j = a / (-p + d),
				M = j * -p;
			o.matrixWorld.decompose(e.position, e.quaternion, e.scale), e.translateX(M), e.translateZ(j), e.matrixWorld.compose(e.position, e.quaternion, e.scale), e.matrixWorldInverse.getInverse(e.matrixWorld);
			var W = c + j,
				P = m + j,
				q = u - M,
				F = v + (a - M),
				V = l * m / P * W,
				f = x * m / P * W;
			e.projectionMatrix.makePerspective(q, F, V, f, W, P)
		}
	}, {
		"../../math/Vector3.js": "QLQv"
	}],
	"Xve9": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.WebVRManager = u;
		var e = require("../../objects/Group.js"),
			r = require("../../math/Matrix4.js"),
			t = require("../../math/Vector3.js"),
			i = require("../../math/Vector4.js"),
			n = require("../../math/Quaternion.js"),
			a = require("../../cameras/ArrayCamera.js"),
			o = require("../../cameras/PerspectiveCamera.js"),
			s = require("../webgl/WebGLAnimation.js"),
			l = require("./WebVRUtils.js");

		function u(u) {
			var d = this,
				m = null,
				p = null,
				f = null,
				c = [],
				v = new r.Matrix4,
				g = new r.Matrix4,
				h = 1,
				y = "stage";
			"undefined" != typeof window && "VRFrameData" in window && (p = new window.VRFrameData, window.addEventListener("vrdisplaypresentchange", C, !1));
			var x = new r.Matrix4,
				w = new n.Quaternion,
				b = new t.Vector3,
				W = new o.PerspectiveCamera;
			W.bounds = new i.Vector4(0, 0, .5, 1), W.layers.enable(1);
			var A = new o.PerspectiveCamera;
			A.bounds = new i.Vector4(.5, 0, .5, 1), A.layers.enable(2);
			var j, M, P = new a.ArrayCamera([W, A]);

			function q() {
				return null !== m && !0 === m.isPresenting
			}

			function C() {
				if (q()) {
					var e = m.getEyeParameters("left"),
						r = e.renderWidth * h,
						t = e.renderHeight * h;
					M = u.getPixelRatio(), j = u.getSize(), u.setDrawingBufferSize(2 * r, t, 1), F.start()
				} else d.enabled && u.setDrawingBufferSize(j.width, j.height, M), F.stop()
			}
			P.layers.enable(1), P.layers.enable(2);
			var V = [];

			function I(e) {
				for (var r = navigator.getGamepads && navigator.getGamepads(), t = 0, i = 0, n = r.length; t < n; t++) {
					var a = r[t];
					if (a && ("Daydream Controller" === a.id || "Gear VR Controller" === a.id || "Oculus Go Controller" === a.id || "OpenVR Gamepad" === a.id || a.id.startsWith("Oculus Touch") || a.id.startsWith("Spatial Controller"))) {
						if (i === e) return a;
						i++
					}
				}
			}
			this.enabled = !1, this.getController = function(r) {
				var t = c[r];
				return void 0 === t && ((t = new e.Group).matrixAutoUpdate = !1, t.visible = !1, c[r] = t), t
			}, this.getDevice = function() {
				return m
			}, this.setDevice = function(e) {
				void 0 !== e && (m = e), F.setContext(e)
			}, this.setFramebufferScaleFactor = function(e) {
				h = e
			}, this.setFrameOfReferenceType = function(e) {
				y = e
			}, this.setPoseTarget = function(e) {
				void 0 !== e && (f = e)
			}, this.getCamera = function(e) {
				var r = "stage" === y ? 1.6 : 0;
				if (null === m) return e.position.set(0, r, 0), e;
				if (m.depthNear = e.near, m.depthFar = e.far, m.getFrameData(p), "stage" === y) {
					var t = m.stageParameters;
					t ? v.fromArray(t.sittingToStandingTransform) : v.makeTranslation(0, r, 0)
				}
				var i = p.pose,
					n = null !== f ? f : e;
				if (n.matrix.copy(v), n.matrix.decompose(n.position, n.quaternion, n.scale), null !== i.orientation && (w.fromArray(i.orientation), n.quaternion.multiply(w)), null !== i.position && (w.setFromRotationMatrix(v), b.fromArray(i.position), b.applyQuaternion(w), n.position.add(b)), n.updateMatrixWorld(), !1 === m.isPresenting) return e;
				W.near = e.near, A.near = e.near, W.far = e.far, A.far = e.far, W.matrixWorldInverse.fromArray(p.leftViewMatrix), A.matrixWorldInverse.fromArray(p.rightViewMatrix), g.getInverse(v), "stage" === y && (W.matrixWorldInverse.multiply(g), A.matrixWorldInverse.multiply(g));
				var a = n.parent;
				null !== a && (x.getInverse(a.matrixWorld), W.matrixWorldInverse.multiply(x), A.matrixWorldInverse.multiply(x)), W.matrixWorld.getInverse(W.matrixWorldInverse), A.matrixWorld.getInverse(A.matrixWorldInverse), W.projectionMatrix.fromArray(p.leftProjectionMatrix), A.projectionMatrix.fromArray(p.rightProjectionMatrix), (0, l.setProjectionFromUnion)(P, W, A);
				var o = m.getLayers();
				if (o.length) {
					var s = o[0];
					null !== s.leftBounds && 4 === s.leftBounds.length && W.bounds.fromArray(s.leftBounds), null !== s.rightBounds && 4 === s.rightBounds.length && A.bounds.fromArray(s.rightBounds)
				}
				return function() {
					for (var e = 0; e < c.length; e++) {
						var r = c[e],
							t = I(e);
						if (void 0 !== t && void 0 !== t.pose) {
							if (null === t.pose) return;
							var i = t.pose;
							!1 === i.hasPosition && r.position.set(.2, -.6, -.05), null !== i.position && r.position.fromArray(i.position), null !== i.orientation && r.quaternion.fromArray(i.orientation), r.matrix.compose(r.position, r.quaternion, r.scale), r.matrix.premultiply(v), r.matrix.decompose(r.position, r.quaternion, r.scale), r.matrixWorldNeedsUpdate = !0, r.visible = !0;
							var n = "Daydream Controller" === t.id ? 0 : 1;
							V[e] !== t.buttons[n].pressed && (V[e] = t.buttons[n].pressed, !0 === V[e] ? r.dispatchEvent({
								type: "selectstart"
							}) : (r.dispatchEvent({
								type: "selectend"
							}), r.dispatchEvent({
								type: "select"
							})))
						} else r.visible = !1
					}
				}(), P
			}, this.getStandingMatrix = function() {
				return v
			}, this.isPresenting = q;
			var F = new s.WebGLAnimation;
			this.setAnimationLoop = function(e) {
				F.setAnimationLoop(e)
			}, this.submitFrame = function() {
				q() && m.submitFrame()
			}, this.dispose = function() {
				"undefined" != typeof window && window.removeEventListener("vrdisplaypresentchange", C)
			}
		}
	}, {
		"../../objects/Group.js": "tUmb",
		"../../math/Matrix4.js": "QUid",
		"../../math/Vector3.js": "QLQv",
		"../../math/Vector4.js": "PTKN",
		"../../math/Quaternion.js": "87fW",
		"../../cameras/ArrayCamera.js": "b1fc",
		"../../cameras/PerspectiveCamera.js": "iz3s",
		"../webgl/WebGLAnimation.js": "yP7M",
		"./WebVRUtils.js": "9FfE"
	}],
	"hAeI": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.WebXRManager = o;
		var e = require("../../objects/Group.js"),
			t = require("../../math/Vector4.js"),
			r = require("../../cameras/ArrayCamera.js"),
			n = require("../../cameras/PerspectiveCamera.js"),
			i = require("../webgl/WebGLAnimation.js"),
			a = require("./WebVRUtils.js");

		function o(o) {
			var s = o.context,
				l = null,
				u = null,
				c = 1,
				f = null,
				m = "stage",
				v = null,
				p = [],
				d = [];

			function x() {
				return null !== u && null !== f
			}
			var g = new n.PerspectiveCamera;
			g.layers.enable(1), g.viewport = new t.Vector4;
			var b = new n.PerspectiveCamera;
			b.layers.enable(2), b.viewport = new t.Vector4;
			var h = new r.ArrayCamera([g, b]);

			function y(e) {
				var t = p[d.indexOf(e.inputSource)];
				t && t.dispatchEvent({
					type: e.type
				})
			}

			function w() {
				o.setFramebuffer(null), W.stop()
			}

			function L(e, t) {
				null === t ? e.matrixWorld.copy(e.matrix) : e.matrixWorld.multiplyMatrices(t.matrixWorld, e.matrix), e.matrixWorldInverse.getInverse(e.matrixWorld)
			}
			h.layers.enable(1), h.layers.enable(2), this.enabled = !1, this.getController = function(t) {
				var r = p[t];
				return void 0 === r && ((r = new e.Group).matrixAutoUpdate = !1, r.visible = !1, p[t] = r), r
			}, this.getDevice = function() {
				return l
			}, this.setDevice = function(e) {
				void 0 !== e && (l = e), e instanceof XRDevice && s.setCompatibleXRDevice(e)
			}, this.setFramebufferScaleFactor = function(e) {
				c = e
			}, this.setFrameOfReferenceType = function(e) {
				m = e
			}, this.setSession = function(e) {
				null !== (u = e) && (u.addEventListener("select", y), u.addEventListener("selectstart", y), u.addEventListener("selectend", y), u.addEventListener("end", w), u.baseLayer = new XRWebGLLayer(u, s, {
					framebufferScaleFactor: c
				}), u.requestFrameOfReference(m).then(function(e) {
					f = e, o.setFramebuffer(u.baseLayer.framebuffer), W.setContext(u), W.start()
				}), d = u.getInputSources(), u.addEventListener("inputsourceschange", function() {
					d = u.getInputSources(), console.log(d);
					for (var e = 0; e < p.length; e++) {
						p[e].userData.inputSource = d[e]
					}
				}))
			}, this.getCamera = function(e) {
				if (x()) {
					var t = e.parent,
						r = h.cameras;
					L(h, t);
					for (var n = 0; n < r.length; n++) L(r[n], t);
					e.matrixWorld.copy(h.matrixWorld);
					for (var i = e.children, o = (n = 0, i.length); n < o; n++) i[n].updateMatrixWorld(!0);
					return (0, a.setProjectionFromUnion)(h, g, b), h
				}
				return e
			}, this.isPresenting = x;
			var M = null;
			var W = new i.WebGLAnimation;
			W.setAnimationLoop(function(e, t) {
				if (null !== (v = t.getDevicePose(f)))
					for (var r = u.baseLayer, n = t.views, i = 0; i < n.length; i++) {
						var a = n[i],
							o = r.getViewport(a),
							s = v.getViewMatrix(a),
							l = h.cameras[i];
						l.matrix.fromArray(s).getInverse(l.matrix), l.projectionMatrix.fromArray(a.projectionMatrix), l.viewport.set(o.x, o.y, o.width, o.height), 0 === i && h.matrix.copy(l.matrix)
					}
				for (i = 0; i < p.length; i++) {
					var c = p[i],
						m = d[i];
					if (m) {
						var x = t.getInputPose(m, f);
						if (null !== x) {
							"targetRay" in x ? c.matrix.elements = x.targetRay.transformMatrix : "pointerMatrix" in x && (c.matrix.elements = x.pointerMatrix), c.matrix.decompose(c.position, c.rotation, c.scale), c.visible = !0;
							continue
						}
					}
					c.visible = !1
				}
				M && M(e)
			}), this.setAnimationLoop = function(e) {
				M = e
			}, this.dispose = function() {}, this.getStandingMatrix = function() {
				return console.warn("THREE.WebXRManager: getStandingMatrix() is no longer needed."), new THREE.Matrix4
			}, this.submitFrame = function() {}
		}
	}, {
		"../../objects/Group.js": "tUmb",
		"../../math/Vector4.js": "PTKN",
		"../../cameras/ArrayCamera.js": "b1fc",
		"../../cameras/PerspectiveCamera.js": "iz3s",
		"../webgl/WebGLAnimation.js": "yP7M",
		"./WebVRUtils.js": "9FfE"
	}],
	"BXu0": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.WebGLRenderer = C;
		var e = require("../constants.js"),
			t = require("../math/Math.js"),
			a = require("../textures/DataTexture.js"),
			r = require("../math/Frustum.js"),
			i = require("../math/Matrix4.js"),
			n = require("./shaders/ShaderLib.js"),
			s = require("./shaders/UniformsLib.js"),
			o = require("./shaders/UniformsUtils.js"),
			l = require("../math/Vector3.js"),
			u = require("../math/Vector4.js"),
			p = require("./webgl/WebGLAnimation.js"),
			d = require("./webgl/WebGLAttributes.js"),
			c = require("./webgl/WebGLBackground.js"),
			m = require("./webgl/WebGLBufferRenderer.js"),
			h = require("./webgl/WebGLCapabilities.js"),
			f = require("./webgl/WebGLClipping.js"),
			g = require("./webgl/WebGLExtensions.js"),
			v = require("./webgl/WebGLGeometries.js"),
			b = require("./webgl/WebGLIndexedBufferRenderer.js"),
			M = require("./webgl/WebGLInfo.js"),
			L = require("./webgl/WebGLMorphtargets.js"),
			x = require("./webgl/WebGLObjects.js"),
			w = require("./webgl/WebGLPrograms.js"),
			R = require("./webgl/WebGLProperties.js"),
			S = require("./webgl/WebGLRenderLists.js"),
			T = require("./webgl/WebGLRenderStates.js"),
			A = require("./webgl/WebGLShadowMap.js"),
			E = require("./webgl/WebGLState.js"),
			y = require("./webgl/WebGLTextures.js"),
			W = require("./webgl/WebGLUniforms.js"),
			_ = require("./webgl/WebGLUtils.js"),
			G = require("./webvr/WebVRManager.js"),
			B = require("./webvr/WebXRManager.js");

		function C(C) {
			console.log("THREE.WebGLRenderer", e.REVISION);
			var F = void 0 !== (C = C || {}).canvas ? C.canvas : document.createElementNS("http://www.w3.org/1999/xhtml", "canvas"),
				I = void 0 !== C.context ? C.context : null,
				P = void 0 !== C.alpha && C.alpha,
				D = void 0 === C.depth || C.depth,
				U = void 0 === C.stencil || C.stencil,
				j = void 0 !== C.antialias && C.antialias,
				O = void 0 === C.premultipliedAlpha || C.premultipliedAlpha,
				N = void 0 !== C.preserveDrawingBuffer && C.preserveDrawingBuffer,
				q = void 0 !== C.powerPreference ? C.powerPreference : "default",
				V = null,
				z = null;
			this.domElement = F, this.context = null, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.gammaFactor = 2, this.gammaInput = !1, this.gammaOutput = !1, this.physicallyCorrectLights = !1, this.toneMapping = e.LinearToneMapping, this.toneMappingExposure = 1, this.toneMappingWhitePoint = 1, this.maxMorphTargets = 8, this.maxMorphNormals = 4;
			var H, k, Y, X, J, K, Q, Z, $, ee, te, ae, re, ie, ne, se, oe, le, ue = this,
				pe = !1,
				de = null,
				ce = null,
				me = null,
				he = -1,
				fe = {
					geometry: null,
					program: null,
					wireframe: !1
				},
				ge = null,
				ve = null,
				be = new u.Vector4,
				Me = new u.Vector4,
				Le = null,
				xe = 0,
				we = F.width,
				Re = F.height,
				Se = 1,
				Te = new u.Vector4(0, 0, we, Re),
				Ae = new u.Vector4(0, 0, we, Re),
				Ee = !1,
				ye = new r.Frustum,
				We = new f.WebGLClipping,
				_e = !1,
				Ge = !1,
				Be = new i.Matrix4,
				Ce = new l.Vector3;

			function Fe() {
				return null === ce ? Se : 1
			}
			try {
				var Ie = {
					alpha: P,
					depth: D,
					stencil: U,
					antialias: j,
					premultipliedAlpha: O,
					preserveDrawingBuffer: N,
					powerPreference: q
				};
				if (F.addEventListener("webglcontextlost", je, !1), F.addEventListener("webglcontextrestored", Oe, !1), null === (H = I || F.getContext("webgl", Ie) || F.getContext("experimental-webgl", Ie))) throw null !== F.getContext("webgl") ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
				void 0 === H.getShaderPrecisionFormat && (H.getShaderPrecisionFormat = function() {
					return {
						rangeMin: 1,
						rangeMax: 1,
						precision: 1
					}
				})
			} catch ($e) {
				console.error("THREE.WebGLRenderer: " + $e.message)
			}

			function Pe() {
				k = new g.WebGLExtensions(H), (Y = new h.WebGLCapabilities(H, k, C)).isWebGL2 || (k.get("WEBGL_depth_texture"), k.get("OES_texture_float"), k.get("OES_texture_half_float"), k.get("OES_texture_half_float_linear"), k.get("OES_standard_derivatives"), k.get("OES_element_index_uint"), k.get("ANGLE_instanced_arrays")), k.get("OES_texture_float_linear"), le = new _.WebGLUtils(H, k, Y), (X = new E.WebGLState(H, k, le, Y)).scissor(Me.copy(Ae).multiplyScalar(Se)), X.viewport(be.copy(Te).multiplyScalar(Se)), J = new M.WebGLInfo(H), K = new R.WebGLProperties, Q = new y.WebGLTextures(H, k, X, K, Y, le, J), Z = new d.WebGLAttributes(H), $ = new v.WebGLGeometries(H, Z, J), ee = new x.WebGLObjects($, J), ne = new L.WebGLMorphtargets(H), te = new w.WebGLPrograms(ue, k, Y), ae = new S.WebGLRenderLists, re = new T.WebGLRenderStates, ie = new c.WebGLBackground(ue, X, ee, O), se = new m.WebGLBufferRenderer(H, k, J, Y), oe = new b.WebGLIndexedBufferRenderer(H, k, J, Y), J.programs = te.programs, ue.context = H, ue.capabilities = Y, ue.extensions = k, ue.properties = K, ue.renderLists = ae, ue.state = X, ue.info = J
			}
			Pe();
			var De = null;
			"undefined" != typeof navigator && (De = "xr" in navigator ? new B.WebXRManager(ue) : new G.WebVRManager(ue)), this.vr = De;
			var Ue = new A.WebGLShadowMap(ue, ee, Y.maxTextureSize);

			function je(e) {
				e.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), pe = !0
			}

			function Oe() {
				console.log("THREE.WebGLRenderer: Context Restored."), pe = !1, Pe()
			}

			function Ne(e) {
				var t = e.target;
				t.removeEventListener("dispose", Ne),
					function(e) {
						qe(e), K.remove(e)
					}(t)
			}

			function qe(e) {
				var t = K.get(e).program;
				e.program = void 0, void 0 !== t && te.releaseProgram(t)
			}
			this.shadowMap = Ue, this.getContext = function() {
				return H
			}, this.getContextAttributes = function() {
				return H.getContextAttributes()
			}, this.forceContextLoss = function() {
				var e = k.get("WEBGL_lose_context");
				e && e.loseContext()
			}, this.forceContextRestore = function() {
				var e = k.get("WEBGL_lose_context");
				e && e.restoreContext()
			}, this.getPixelRatio = function() {
				return Se
			}, this.setPixelRatio = function(e) {
				void 0 !== e && (Se = e, this.setSize(we, Re, !1))
			}, this.getSize = function() {
				return {
					width: we,
					height: Re
				}
			}, this.setSize = function(e, t, a) {
				De.isPresenting() ? console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.") : (we = e, Re = t, F.width = e * Se, F.height = t * Se, !1 !== a && (F.style.width = e + "px", F.style.height = t + "px"), this.setViewport(0, 0, e, t))
			}, this.getDrawingBufferSize = function() {
				return {
					width: we * Se,
					height: Re * Se
				}
			}, this.setDrawingBufferSize = function(e, t, a) {
				we = e, Re = t, Se = a, F.width = e * a, F.height = t * a, this.setViewport(0, 0, e, t)
			}, this.getCurrentViewport = function() {
				return be
			}, this.setViewport = function(e, t, a, r) {
				Te.set(e, Re - t - r, a, r), X.viewport(be.copy(Te).multiplyScalar(Se))
			}, this.setScissor = function(e, t, a, r) {
				Ae.set(e, Re - t - r, a, r), X.scissor(Me.copy(Ae).multiplyScalar(Se))
			}, this.setScissorTest = function(e) {
				X.setScissorTest(Ee = e)
			}, this.getClearColor = function() {
				return ie.getClearColor()
			}, this.setClearColor = function() {
				ie.setClearColor.apply(ie, arguments)
			}, this.getClearAlpha = function() {
				return ie.getClearAlpha()
			}, this.setClearAlpha = function() {
				ie.setClearAlpha.apply(ie, arguments)
			}, this.clear = function(e, t, a) {
				var r = 0;
				(void 0 === e || e) && (r |= H.COLOR_BUFFER_BIT), (void 0 === t || t) && (r |= H.DEPTH_BUFFER_BIT), (void 0 === a || a) && (r |= H.STENCIL_BUFFER_BIT), H.clear(r)
			}, this.clearColor = function() {
				this.clear(!0, !1, !1)
			}, this.clearDepth = function() {
				this.clear(!1, !0, !1)
			}, this.clearStencil = function() {
				this.clear(!1, !1, !0)
			}, this.dispose = function() {
				F.removeEventListener("webglcontextlost", je, !1), F.removeEventListener("webglcontextrestored", Oe, !1), ae.dispose(), re.dispose(), K.dispose(), ee.dispose(), De.dispose(), He.stop()
			}, this.renderBufferImmediate = function(e, t) {
				X.initAttributes();
				var a = K.get(e);
				e.hasPositions && !a.position && (a.position = H.createBuffer()), e.hasNormals && !a.normal && (a.normal = H.createBuffer()), e.hasUvs && !a.uv && (a.uv = H.createBuffer()), e.hasColors && !a.color && (a.color = H.createBuffer());
				var r = t.getAttributes();
				e.hasPositions && (H.bindBuffer(H.ARRAY_BUFFER, a.position), H.bufferData(H.ARRAY_BUFFER, e.positionArray, H.DYNAMIC_DRAW), X.enableAttribute(r.position), H.vertexAttribPointer(r.position, 3, H.FLOAT, !1, 0, 0)), e.hasNormals && (H.bindBuffer(H.ARRAY_BUFFER, a.normal), H.bufferData(H.ARRAY_BUFFER, e.normalArray, H.DYNAMIC_DRAW), X.enableAttribute(r.normal), H.vertexAttribPointer(r.normal, 3, H.FLOAT, !1, 0, 0)), e.hasUvs && (H.bindBuffer(H.ARRAY_BUFFER, a.uv), H.bufferData(H.ARRAY_BUFFER, e.uvArray, H.DYNAMIC_DRAW), X.enableAttribute(r.uv), H.vertexAttribPointer(r.uv, 2, H.FLOAT, !1, 0, 0)), e.hasColors && (H.bindBuffer(H.ARRAY_BUFFER, a.color), H.bufferData(H.ARRAY_BUFFER, e.colorArray, H.DYNAMIC_DRAW), X.enableAttribute(r.color), H.vertexAttribPointer(r.color, 3, H.FLOAT, !1, 0, 0)), X.disableUnusedAttributes(), H.drawArrays(H.TRIANGLES, 0, e.count), e.count = 0
			}, this.renderBufferDirect = function(t, a, r, i, n, s) {
				var o = n.isMesh && n.normalMatrix.determinant() < 0;
				X.setMaterial(i, o);
				var l = Je(t, a, i, n),
					u = !1;
				fe.geometry === r.id && fe.program === l.id && fe.wireframe === (!0 === i.wireframe) || (fe.geometry = r.id, fe.program = l.id, fe.wireframe = !0 === i.wireframe, u = !0), n.morphTargetInfluences && (ne.update(n, r, i, l), u = !0);
				var p, d = r.index,
					c = r.attributes.position,
					m = 1;
				!0 === i.wireframe && (d = $.getWireframeAttribute(r), m = 2);
				var h = se;
				null !== d && (p = Z.get(d), (h = oe).setIndex(p)), u && (! function(e, t, a) {
					if (a && a.isInstancedBufferGeometry & !Y.isWebGL2 && null === k.get("ANGLE_instanced_arrays")) return void console.error("THREE.WebGLRenderer.setupVertexAttributes: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
					X.initAttributes();
					var r = a.attributes,
						i = t.getAttributes(),
						n = e.defaultAttributeValues;
					for (var s in i) {
						var o = i[s];
						if (o >= 0) {
							var l = r[s];
							if (void 0 !== l) {
								var u = l.normalized,
									p = l.itemSize,
									d = Z.get(l);
								if (void 0 === d) continue;
								var c = d.buffer,
									m = d.type,
									h = d.bytesPerElement;
								if (l.isInterleavedBufferAttribute) {
									var f = l.data,
										g = f.stride,
										v = l.offset;
									f && f.isInstancedInterleavedBuffer ? (X.enableAttributeAndDivisor(o, f.meshPerAttribute), void 0 === a.maxInstancedCount && (a.maxInstancedCount = f.meshPerAttribute * f.count)) : X.enableAttribute(o), H.bindBuffer(H.ARRAY_BUFFER, c), H.vertexAttribPointer(o, p, m, u, g * h, v * h)
								} else l.isInstancedBufferAttribute ? (X.enableAttributeAndDivisor(o, l.meshPerAttribute), void 0 === a.maxInstancedCount && (a.maxInstancedCount = l.meshPerAttribute * l.count)) : X.enableAttribute(o), H.bindBuffer(H.ARRAY_BUFFER, c), H.vertexAttribPointer(o, p, m, u, 0, 0)
							} else if (void 0 !== n) {
								var b = n[s];
								if (void 0 !== b) switch (b.length) {
									case 2:
										H.vertexAttrib2fv(o, b);
										break;
									case 3:
										H.vertexAttrib3fv(o, b);
										break;
									case 4:
										H.vertexAttrib4fv(o, b);
										break;
									default:
										H.vertexAttrib1fv(o, b)
								}
							}
						}
					}
					X.disableUnusedAttributes()
				}(i, l, r), null !== d && H.bindBuffer(H.ELEMENT_ARRAY_BUFFER, p.buffer));
				var f = 1 / 0;
				null !== d ? f = d.count : void 0 !== c && (f = c.count);
				var g = r.drawRange.start * m,
					v = r.drawRange.count * m,
					b = null !== s ? s.start * m : 0,
					M = null !== s ? s.count * m : 1 / 0,
					L = Math.max(g, b),
					x = Math.min(f, g + v, b + M) - 1,
					w = Math.max(0, x - L + 1);
				if (0 !== w) {
					if (n.isMesh)
						if (!0 === i.wireframe) X.setLineWidth(i.wireframeLinewidth * Fe()), h.setMode(H.LINES);
						else switch (n.drawMode) {
							case e.TrianglesDrawMode:
								h.setMode(H.TRIANGLES);
								break;
							case e.TriangleStripDrawMode:
								h.setMode(H.TRIANGLE_STRIP);
								break;
							case e.TriangleFanDrawMode:
								h.setMode(H.TRIANGLE_FAN)
						} else if (n.isLine) {
							var R = i.linewidth;
							void 0 === R && (R = 1), X.setLineWidth(R * Fe()), n.isLineSegments ? h.setMode(H.LINES) : n.isLineLoop ? h.setMode(H.LINE_LOOP) : h.setMode(H.LINE_STRIP)
						} else n.isPoints ? h.setMode(H.POINTS) : n.isSprite && h.setMode(H.TRIANGLES);
					r && r.isInstancedBufferGeometry ? r.maxInstancedCount > 0 && h.renderInstances(r, L, w) : h.render(L, w)
				}
			}, this.compile = function(e, t) {
				(z = re.get(e, t)).init(), e.traverse(function(e) {
					e.isLight && (z.pushLight(e), e.castShadow && z.pushShadow(e))
				}), z.setupLights(t), e.traverse(function(t) {
					if (t.material)
						if (Array.isArray(t.material))
							for (var a = 0; a < t.material.length; a++) Xe(t.material[a], e.fog, t);
						else Xe(t.material, e.fog, t)
				})
			};
			var Ve = null;
			var ze, He = new p.WebGLAnimation;

			function ke(e, t, a, r) {
				for (var i = 0, n = e.length; i < n; i++) {
					var s = e[i],
						o = s.object,
						l = s.geometry,
						u = void 0 === r ? s.material : r,
						p = s.group;
					if (a.isArrayCamera) {
						ve = a;
						for (var d = a.cameras, c = 0, m = d.length; c < m; c++) {
							var h = d[c];
							if (o.layers.test(h.layers)) {
								if ("viewport" in h) X.viewport(be.copy(h.viewport));
								else {
									var f = h.bounds,
										g = f.x * we,
										v = f.y * Re,
										b = f.z * we,
										M = f.w * Re;
									X.viewport(be.set(g, v, b, M).multiplyScalar(Se))
								}
								z.setupLights(h), Ye(o, t, h, l, u, p)
							}
						}
					} else ve = null, Ye(o, t, a, l, u, p)
				}
			}

			function Ye(e, t, a, r, i, n) {
				if (e.onBeforeRender(ue, t, a, r, i, n), z = re.get(t, ve || a), e.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse, e.matrixWorld), e.normalMatrix.getNormalMatrix(e.modelViewMatrix), e.isImmediateRenderObject) {
					X.setMaterial(i);
					var s = Je(a, t.fog, i, e);
					fe.geometry = null, fe.program = null, fe.wireframe = !1,
						function(e, t) {
							e.render(function(e) {
								ue.renderBufferImmediate(e, t)
							})
						}(e, s)
				} else ue.renderBufferDirect(a, t.fog, r, i, e, n);
				e.onAfterRender(ue, t, a, r, i, n), z = re.get(t, ve || a)
			}

			function Xe(e, t, a) {
				var r = K.get(e),
					i = z.state.lights,
					s = z.state.shadowsArray,
					l = r.lightsHash,
					u = i.state.hash,
					p = te.getParameters(e, i.state, s, t, We.numPlanes, We.numIntersection, a),
					d = te.getProgramCode(e, p),
					c = r.program,
					m = !0;
				if (void 0 === c) e.addEventListener("dispose", Ne);
				else if (c.code !== d) qe(e);
				else if (l.stateID !== u.stateID || l.directionalLength !== u.directionalLength || l.pointLength !== u.pointLength || l.spotLength !== u.spotLength || l.rectAreaLength !== u.rectAreaLength || l.hemiLength !== u.hemiLength || l.shadowsLength !== u.shadowsLength) l.stateID = u.stateID, l.directionalLength = u.directionalLength, l.pointLength = u.pointLength, l.spotLength = u.spotLength, l.rectAreaLength = u.rectAreaLength, l.hemiLength = u.hemiLength, l.shadowsLength = u.shadowsLength, m = !1;
				else {
					if (void 0 !== p.shaderID) return;
					m = !1
				}
				if (m) {
					if (p.shaderID) {
						var h = n.ShaderLib[p.shaderID];
						r.shader = {
							name: e.type,
							uniforms: (0, o.cloneUniforms)(h.uniforms),
							vertexShader: h.vertexShader,
							fragmentShader: h.fragmentShader
						}
					} else r.shader = {
						name: e.type,
						uniforms: e.uniforms,
						vertexShader: e.vertexShader,
						fragmentShader: e.fragmentShader
					};
					e.onBeforeCompile(r.shader, ue), d = te.getProgramCode(e, p), c = te.acquireProgram(e, r.shader, p, d), r.program = c, e.program = c
				}
				var f = c.getAttributes();
				if (e.morphTargets) {
					e.numSupportedMorphTargets = 0;
					for (var g = 0; g < ue.maxMorphTargets; g++) f["morphTarget" + g] >= 0 && e.numSupportedMorphTargets++
				}
				if (e.morphNormals) {
					e.numSupportedMorphNormals = 0;
					for (g = 0; g < ue.maxMorphNormals; g++) f["morphNormal" + g] >= 0 && e.numSupportedMorphNormals++
				}
				var v = r.shader.uniforms;
				(e.isShaderMaterial || e.isRawShaderMaterial) && !0 !== e.clipping || (r.numClippingPlanes = We.numPlanes, r.numIntersection = We.numIntersection, v.clippingPlanes = We.uniform), r.fog = t, void 0 === l && (r.lightsHash = l = {}), l.stateID = u.stateID, l.directionalLength = u.directionalLength, l.pointLength = u.pointLength, l.spotLength = u.spotLength, l.rectAreaLength = u.rectAreaLength, l.hemiLength = u.hemiLength, l.shadowsLength = u.shadowsLength, e.lights && (v.ambientLightColor.value = i.state.ambient, v.directionalLights.value = i.state.directional, v.spotLights.value = i.state.spot, v.rectAreaLights.value = i.state.rectArea, v.pointLights.value = i.state.point, v.hemisphereLights.value = i.state.hemi, v.directionalShadowMap.value = i.state.directionalShadowMap, v.directionalShadowMatrix.value = i.state.directionalShadowMatrix, v.spotShadowMap.value = i.state.spotShadowMap, v.spotShadowMatrix.value = i.state.spotShadowMatrix, v.pointShadowMap.value = i.state.pointShadowMap, v.pointShadowMatrix.value = i.state.pointShadowMatrix);
				var b = r.program.getUniforms(),
					M = W.WebGLUniforms.seqWithValue(b.seq, v);
				r.uniformsList = M
			}

			function Je(r, i, n, o) {
				xe = 0;
				var l = K.get(n),
					u = z.state.lights,
					p = l.lightsHash,
					d = u.state.hash;
				if (_e && (Ge || r !== ge)) {
					var c = r === ge && n.id === he;
					We.setState(n.clippingPlanes, n.clipIntersection, n.clipShadows, r, l, c)
				}!1 === n.needsUpdate && (void 0 === l.program ? n.needsUpdate = !0 : n.fog && l.fog !== i ? n.needsUpdate = !0 : (!n.lights || p.stateID === d.stateID && p.directionalLength === d.directionalLength && p.pointLength === d.pointLength && p.spotLength === d.spotLength && p.rectAreaLength === d.rectAreaLength && p.hemiLength === d.hemiLength && p.shadowsLength === d.shadowsLength) && (void 0 === l.numClippingPlanes || l.numClippingPlanes === We.numPlanes && l.numIntersection === We.numIntersection) || (n.needsUpdate = !0)), n.needsUpdate && (Xe(n, i, o), n.needsUpdate = !1);
				var m, h, f = !1,
					g = !1,
					v = !1,
					b = l.program,
					M = b.getUniforms(),
					L = l.shader.uniforms;
				if (X.useProgram(b.program) && (f = !0, g = !0, v = !0), n.id !== he && (he = n.id, g = !0), f || ge !== r) {
					if (M.setValue(H, "projectionMatrix", r.projectionMatrix), Y.logarithmicDepthBuffer && M.setValue(H, "logDepthBufFC", 2 / (Math.log(r.far + 1) / Math.LN2)), ge !== r && (ge = r, g = !0, v = !0), n.isShaderMaterial || n.isMeshPhongMaterial || n.isMeshStandardMaterial || n.envMap) {
						var x = M.map.cameraPosition;
						void 0 !== x && x.setValue(H, Ce.setFromMatrixPosition(r.matrixWorld))
					}(n.isMeshPhongMaterial || n.isMeshLambertMaterial || n.isMeshBasicMaterial || n.isMeshStandardMaterial || n.isShaderMaterial || n.skinning) && M.setValue(H, "viewMatrix", r.matrixWorldInverse)
				}
				if (n.skinning) {
					M.setOptional(H, o, "bindMatrix"), M.setOptional(H, o, "bindMatrixInverse");
					var w = o.skeleton;
					if (w) {
						var R = w.bones;
						if (Y.floatVertexTextures) {
							if (void 0 === w.boneTexture) {
								var S = Math.sqrt(4 * R.length);
								S = t._Math.ceilPowerOfTwo(S), S = Math.max(S, 4);
								var T = new Float32Array(S * S * 4);
								T.set(w.boneMatrices);
								var A = new a.DataTexture(T, S, S, e.RGBAFormat, e.FloatType);
								A.needsUpdate = !0, w.boneMatrices = T, w.boneTexture = A, w.boneTextureSize = S
							}
							M.setValue(H, "boneTexture", w.boneTexture), M.setValue(H, "boneTextureSize", w.boneTextureSize)
						} else M.setOptional(H, w, "boneMatrices")
					}
				}
				return g && (M.setValue(H, "toneMappingExposure", ue.toneMappingExposure), M.setValue(H, "toneMappingWhitePoint", ue.toneMappingWhitePoint), n.lights && (h = v, (m = L).ambientLightColor.needsUpdate = h, m.directionalLights.needsUpdate = h, m.pointLights.needsUpdate = h, m.spotLights.needsUpdate = h, m.rectAreaLights.needsUpdate = h, m.hemisphereLights.needsUpdate = h), i && n.fog && function(e, t) {
					e.fogColor.value = t.color, t.isFog ? (e.fogNear.value = t.near, e.fogFar.value = t.far) : t.isFogExp2 && (e.fogDensity.value = t.density)
				}(L, i), n.isMeshBasicMaterial ? Ke(L, n) : n.isMeshLambertMaterial ? (Ke(L, n), function(e, t) {
					t.emissiveMap && (e.emissiveMap.value = t.emissiveMap)
				}(L, n)) : n.isMeshPhongMaterial ? (Ke(L, n), n.isMeshToonMaterial ? function(e, t) {
					Qe(e, t), t.gradientMap && (e.gradientMap.value = t.gradientMap)
				}(L, n) : Qe(L, n)) : n.isMeshStandardMaterial ? (Ke(L, n), n.isMeshPhysicalMaterial ? function(e, t) {
					Ze(e, t), e.reflectivity.value = t.reflectivity, e.clearCoat.value = t.clearCoat, e.clearCoatRoughness.value = t.clearCoatRoughness
				}(L, n) : Ze(L, n)) : n.isMeshMatcapMaterial ? (Ke(L, n), function(t, a) {
					a.matcap && (t.matcap.value = a.matcap);
					a.bumpMap && (t.bumpMap.value = a.bumpMap, t.bumpScale.value = a.bumpScale, a.side === e.BackSide && (t.bumpScale.value *= -1));
					a.normalMap && (t.normalMap.value = a.normalMap, t.normalScale.value.copy(a.normalScale), a.side === e.BackSide && t.normalScale.value.negate());
					a.displacementMap && (t.displacementMap.value = a.displacementMap, t.displacementScale.value = a.displacementScale, t.displacementBias.value = a.displacementBias)
				}(L, n)) : n.isMeshDepthMaterial ? (Ke(L, n), function(e, t) {
					t.displacementMap && (e.displacementMap.value = t.displacementMap, e.displacementScale.value = t.displacementScale, e.displacementBias.value = t.displacementBias)
				}(L, n)) : n.isMeshDistanceMaterial ? (Ke(L, n), function(e, t) {
					t.displacementMap && (e.displacementMap.value = t.displacementMap, e.displacementScale.value = t.displacementScale, e.displacementBias.value = t.displacementBias);
					e.referencePosition.value.copy(t.referencePosition), e.nearDistance.value = t.nearDistance, e.farDistance.value = t.farDistance
				}(L, n)) : n.isMeshNormalMaterial ? (Ke(L, n), function(t, a) {
					a.bumpMap && (t.bumpMap.value = a.bumpMap, t.bumpScale.value = a.bumpScale, a.side === e.BackSide && (t.bumpScale.value *= -1));
					a.normalMap && (t.normalMap.value = a.normalMap, t.normalScale.value.copy(a.normalScale), a.side === e.BackSide && t.normalScale.value.negate());
					a.displacementMap && (t.displacementMap.value = a.displacementMap, t.displacementScale.value = a.displacementScale, t.displacementBias.value = a.displacementBias)
				}(L, n)) : n.isLineBasicMaterial ? (function(e, t) {
					e.diffuse.value = t.color, e.opacity.value = t.opacity
				}(L, n), n.isLineDashedMaterial && function(e, t) {
					e.dashSize.value = t.dashSize, e.totalSize.value = t.dashSize + t.gapSize, e.scale.value = t.scale
				}(L, n)) : n.isPointsMaterial ? function(e, t) {
					e.diffuse.value = t.color, e.opacity.value = t.opacity, e.size.value = t.size * Se, e.scale.value = .5 * Re, e.map.value = t.map, null !== t.map && (!0 === t.map.matrixAutoUpdate && t.map.updateMatrix(), e.uvTransform.value.copy(t.map.matrix))
				}(L, n) : n.isSpriteMaterial ? function(e, t) {
					e.diffuse.value = t.color, e.opacity.value = t.opacity, e.rotation.value = t.rotation, e.map.value = t.map, null !== t.map && (!0 === t.map.matrixAutoUpdate && t.map.updateMatrix(), e.uvTransform.value.copy(t.map.matrix))
				}(L, n) : n.isShadowMaterial && (L.color.value = n.color, L.opacity.value = n.opacity), void 0 !== L.ltc_1 && (L.ltc_1.value = s.UniformsLib.LTC_1), void 0 !== L.ltc_2 && (L.ltc_2.value = s.UniformsLib.LTC_2), W.WebGLUniforms.upload(H, l.uniformsList, L, ue)), n.isShaderMaterial && !0 === n.uniformsNeedUpdate && (W.WebGLUniforms.upload(H, l.uniformsList, L, ue), n.uniformsNeedUpdate = !1), n.isSpriteMaterial && M.setValue(H, "center", o.center), M.setValue(H, "modelViewMatrix", o.modelViewMatrix), M.setValue(H, "normalMatrix", o.normalMatrix), M.setValue(H, "modelMatrix", o.matrixWorld), b
			}

			function Ke(e, t) {
				var a;
				e.opacity.value = t.opacity, t.color && (e.diffuse.value = t.color), t.emissive && e.emissive.value.copy(t.emissive).multiplyScalar(t.emissiveIntensity), t.map && (e.map.value = t.map), t.alphaMap && (e.alphaMap.value = t.alphaMap), t.specularMap && (e.specularMap.value = t.specularMap), t.envMap && (e.envMap.value = t.envMap, e.flipEnvMap.value = t.envMap.isCubeTexture ? -1 : 1, e.reflectivity.value = t.reflectivity, e.refractionRatio.value = t.refractionRatio, e.maxMipLevel.value = K.get(t.envMap).__maxMipLevel), t.lightMap && (e.lightMap.value = t.lightMap, e.lightMapIntensity.value = t.lightMapIntensity), t.aoMap && (e.aoMap.value = t.aoMap, e.aoMapIntensity.value = t.aoMapIntensity), t.map ? a = t.map : t.specularMap ? a = t.specularMap : t.displacementMap ? a = t.displacementMap : t.normalMap ? a = t.normalMap : t.bumpMap ? a = t.bumpMap : t.roughnessMap ? a = t.roughnessMap : t.metalnessMap ? a = t.metalnessMap : t.alphaMap ? a = t.alphaMap : t.emissiveMap && (a = t.emissiveMap), void 0 !== a && (a.isWebGLRenderTarget && (a = a.texture), !0 === a.matrixAutoUpdate && a.updateMatrix(), e.uvTransform.value.copy(a.matrix))
			}

			function Qe(t, a) {
				t.specular.value = a.specular, t.shininess.value = Math.max(a.shininess, 1e-4), a.emissiveMap && (t.emissiveMap.value = a.emissiveMap), a.bumpMap && (t.bumpMap.value = a.bumpMap, t.bumpScale.value = a.bumpScale, a.side === e.BackSide && (t.bumpScale.value *= -1)), a.normalMap && (t.normalMap.value = a.normalMap, t.normalScale.value.copy(a.normalScale), a.side === e.BackSide && t.normalScale.value.negate()), a.displacementMap && (t.displacementMap.value = a.displacementMap, t.displacementScale.value = a.displacementScale, t.displacementBias.value = a.displacementBias)
			}

			function Ze(t, a) {
				t.roughness.value = a.roughness, t.metalness.value = a.metalness, a.roughnessMap && (t.roughnessMap.value = a.roughnessMap), a.metalnessMap && (t.metalnessMap.value = a.metalnessMap), a.emissiveMap && (t.emissiveMap.value = a.emissiveMap), a.bumpMap && (t.bumpMap.value = a.bumpMap, t.bumpScale.value = a.bumpScale, a.side === e.BackSide && (t.bumpScale.value *= -1)), a.normalMap && (t.normalMap.value = a.normalMap, t.normalScale.value.copy(a.normalScale), a.side === e.BackSide && t.normalScale.value.negate()), a.displacementMap && (t.displacementMap.value = a.displacementMap, t.displacementScale.value = a.displacementScale, t.displacementBias.value = a.displacementBias), a.envMap && (t.envMapIntensity.value = a.envMapIntensity)
			}
			He.setAnimationLoop(function(e) {
				De.isPresenting() || Ve && Ve(e)
			}), "undefined" != typeof window && He.setContext(window), this.setAnimationLoop = function(e) {
				Ve = e, De.setAnimationLoop(e), He.start()
			}, this.render = function(e, t, a, r) {
				if (t && t.isCamera) {
					if (!pe) {
						fe.geometry = null, fe.program = null, fe.wireframe = !1, he = -1, ge = null, !0 === e.autoUpdate && e.updateMatrixWorld(), null === t.parent && t.updateMatrixWorld(), De.enabled && (t = De.getCamera(t)), (z = re.get(e, t)).init(), e.onBeforeRender(ue, e, t, a), Be.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), ye.setFromMatrix(Be), Ge = this.localClippingEnabled, _e = We.init(this.clippingPlanes, Ge, t), (V = ae.get(e, t)).init(),
							function e(t, a, r, i) {
								if (!1 === t.visible) return;
								var n = t.layers.test(a.layers);
								if (n)
									if (t.isGroup) r = t.renderOrder;
									else if (t.isLight) z.pushLight(t), t.castShadow && z.pushShadow(t);
								else if (t.isSprite) {
									if (!t.frustumCulled || ye.intersectsSprite(t)) {
										i && Ce.setFromMatrixPosition(t.matrixWorld).applyMatrix4(Be);
										var s = ee.update(t),
											o = t.material;
										V.push(t, s, o, r, Ce.z, null)
									}
								} else if (t.isImmediateRenderObject) i && Ce.setFromMatrixPosition(t.matrixWorld).applyMatrix4(Be), V.push(t, null, t.material, r, Ce.z, null);
								else if ((t.isMesh || t.isLine || t.isPoints) && (t.isSkinnedMesh && t.skeleton.update(), !t.frustumCulled || ye.intersectsObject(t))) {
									i && Ce.setFromMatrixPosition(t.matrixWorld).applyMatrix4(Be);
									var s = ee.update(t),
										o = t.material;
									if (Array.isArray(o))
										for (var l = s.groups, u = 0, p = l.length; u < p; u++) {
											var d = l[u],
												c = o[d.materialIndex];
											c && c.visible && V.push(t, s, c, r, Ce.z, d)
										} else o.visible && V.push(t, s, o, r, Ce.z, null)
								}
								var m = t.children;
								for (var u = 0, p = m.length; u < p; u++) e(m[u], a, r, i)
							}(e, t, 0, ue.sortObjects), !0 === ue.sortObjects && V.sort(), _e && We.beginShadows();
						var i = z.state.shadowsArray;
						Ue.render(i, e, t), z.setupLights(t), _e && We.endShadows(), this.info.autoReset && this.info.reset(), void 0 === a && (a = null), this.setRenderTarget(a), ie.render(V, e, t, r);
						var n = V.opaque,
							s = V.transparent;
						if (e.overrideMaterial) {
							var o = e.overrideMaterial;
							n.length && ke(n, e, t, o), s.length && ke(s, e, t, o)
						} else n.length && ke(n, e, t), s.length && ke(s, e, t);
						a && (Q.updateRenderTargetMipmap(a), Q.updateMultisampleRenderTarget(a)), X.buffers.depth.setTest(!0), X.buffers.depth.setMask(!0), X.buffers.color.setMask(!0), X.setPolygonOffset(!1), e.onAfterRender(ue, e, t), De.enabled && De.submitFrame(), V = null, z = null
					}
				} else console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.")
			}, this.allocTextureUnit = function() {
				var e = xe;
				return e >= Y.maxTextures && console.warn("THREE.WebGLRenderer: Trying to use " + e + " texture units while this GPU supports only " + Y.maxTextures), xe += 1, e
			}, this.setTexture2D = (ze = !1, function(e, t) {
				e && e.isWebGLRenderTarget && (ze || (console.warn("THREE.WebGLRenderer.setTexture2D: don't use render targets as textures. Use their .texture property instead."), ze = !0), e = e.texture), Q.setTexture2D(e, t)
			}), this.setTexture3D = function(e, t) {
				Q.setTexture3D(e, t)
			}, this.setTexture = function() {
				var e = !1;
				return function(t, a) {
					e || (console.warn("THREE.WebGLRenderer: .setTexture is deprecated, use setTexture2D instead."), e = !0), Q.setTexture2D(t, a)
				}
			}(), this.setTextureCube = function() {
				var e = !1;
				return function(t, a) {
					t && t.isWebGLRenderTargetCube && (e || (console.warn("THREE.WebGLRenderer.setTextureCube: don't use cube render targets as textures. Use their .texture property instead."), e = !0), t = t.texture), t && t.isCubeTexture || Array.isArray(t.image) && 6 === t.image.length ? Q.setTextureCube(t, a) : Q.setTextureCubeDynamic(t, a)
				}
			}(), this.setFramebuffer = function(e) {
				de = e
			}, this.getRenderTarget = function() {
				return ce
			}, this.setRenderTarget = function(e) {
				ce = e, e && void 0 === K.get(e).__webglFramebuffer && Q.setupRenderTarget(e);
				var t = de,
					a = !1;
				if (e) {
					var r = K.get(e).__webglFramebuffer;
					e.isWebGLRenderTargetCube ? (t = r[e.activeCubeFace], a = !0) : t = e.isWebGLMultisampleRenderTarget ? K.get(e).__webglMultisampledFramebuffer : r, be.copy(e.viewport), Me.copy(e.scissor), Le = e.scissorTest
				} else be.copy(Te).multiplyScalar(Se), Me.copy(Ae).multiplyScalar(Se), Le = Ee;
				if (me !== t && (H.bindFramebuffer(H.FRAMEBUFFER, t), me = t), X.viewport(be), X.scissor(Me), X.setScissorTest(Le), a) {
					var i = K.get(e.texture);
					H.framebufferTexture2D(H.FRAMEBUFFER, H.COLOR_ATTACHMENT0, H.TEXTURE_CUBE_MAP_POSITIVE_X + e.activeCubeFace, i.__webglTexture, e.activeMipMapLevel)
				}
			}, this.readRenderTargetPixels = function(t, a, r, i, n, s) {
				if (t && t.isWebGLRenderTarget) {
					var o = K.get(t).__webglFramebuffer;
					if (o) {
						var l = !1;
						o !== me && (H.bindFramebuffer(H.FRAMEBUFFER, o), l = !0);
						try {
							var u = t.texture,
								p = u.format,
								d = u.type;
							if (p !== e.RGBAFormat && le.convert(p) !== H.getParameter(H.IMPLEMENTATION_COLOR_READ_FORMAT)) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
							if (!(d === e.UnsignedByteType || le.convert(d) === H.getParameter(H.IMPLEMENTATION_COLOR_READ_TYPE) || d === e.FloatType && (Y.isWebGL2 || k.get("OES_texture_float") || k.get("WEBGL_color_buffer_float")) || d === e.HalfFloatType && (Y.isWebGL2 ? k.get("EXT_color_buffer_float") : k.get("EXT_color_buffer_half_float")))) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
							H.checkFramebufferStatus(H.FRAMEBUFFER) === H.FRAMEBUFFER_COMPLETE ? a >= 0 && a <= t.width - i && r >= 0 && r <= t.height - n && H.readPixels(a, r, i, n, le.convert(p), le.convert(d), s) : console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.")
						} finally {
							l && H.bindFramebuffer(H.FRAMEBUFFER, me)
						}
					}
				} else console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.")
			}, this.copyFramebufferToTexture = function(e, t, a) {
				var r = t.image.width,
					i = t.image.height,
					n = le.convert(t.format);
				this.setTexture2D(t, 0), H.copyTexImage2D(H.TEXTURE_2D, a || 0, n, e.x, e.y, r, i, 0)
			}, this.copyTextureToTexture = function(e, t, a, r) {
				var i = t.image.width,
					n = t.image.height,
					s = le.convert(a.format),
					o = le.convert(a.type);
				this.setTexture2D(a, 0), t.isDataTexture ? H.texSubImage2D(H.TEXTURE_2D, r || 0, e.x, e.y, i, n, s, o, t.image.data) : H.texSubImage2D(H.TEXTURE_2D, r || 0, e.x, e.y, s, o, t.image)
			}
		}
	}, {
		"../constants.js": "y6Nk",
		"../math/Math.js": "M5nx",
		"../textures/DataTexture.js": "loYk",
		"../math/Frustum.js": "MSmz",
		"../math/Matrix4.js": "QUid",
		"./shaders/ShaderLib.js": "SyA9",
		"./shaders/UniformsLib.js": "qSlY",
		"./shaders/UniformsUtils.js": "LbN/",
		"../math/Vector3.js": "QLQv",
		"../math/Vector4.js": "PTKN",
		"./webgl/WebGLAnimation.js": "yP7M",
		"./webgl/WebGLAttributes.js": "geZY",
		"./webgl/WebGLBackground.js": "27qX",
		"./webgl/WebGLBufferRenderer.js": "/GhI",
		"./webgl/WebGLCapabilities.js": "Go6o",
		"./webgl/WebGLClipping.js": "pVD3",
		"./webgl/WebGLExtensions.js": "u8K6",
		"./webgl/WebGLGeometries.js": "R0jI",
		"./webgl/WebGLIndexedBufferRenderer.js": "0b0h",
		"./webgl/WebGLInfo.js": "LE8w",
		"./webgl/WebGLMorphtargets.js": "ig93",
		"./webgl/WebGLObjects.js": "2rwW",
		"./webgl/WebGLPrograms.js": "sSRB",
		"./webgl/WebGLProperties.js": "mMuI",
		"./webgl/WebGLRenderLists.js": "1t6l",
		"./webgl/WebGLRenderStates.js": "lPZD",
		"./webgl/WebGLShadowMap.js": "qGYu",
		"./webgl/WebGLState.js": "Vqte",
		"./webgl/WebGLTextures.js": "QhjG",
		"./webgl/WebGLUniforms.js": "tYce",
		"./webgl/WebGLUtils.js": "itKU",
		"./webvr/WebVRManager.js": "Xve9",
		"./webvr/WebXRManager.js": "hAeI"
	}],
	"Oywa": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.Cache = void 0;
		var e = {
			enabled: !1,
			files: {},
			add: function(e, t) {
				!1 !== this.enabled && (this.files[e] = t)
			},
			get: function(e) {
				if (!1 !== this.enabled) return this.files[e]
			},
			remove: function(e) {
				delete this.files[e]
			},
			clear: function() {
				this.files = {}
			}
		};
		exports.Cache = e;
	}, {}],
	"bW6B": [function(require, module, exports) {
		"use strict";

		function o(o, t, r) {
			var n = this,
				i = !1,
				e = 0,
				s = 0,
				a = void 0;
			this.onStart = void 0, this.onLoad = o, this.onProgress = t, this.onError = r, this.itemStart = function(o) {
				s++, !1 === i && void 0 !== n.onStart && n.onStart(o, e, s), i = !0
			}, this.itemEnd = function(o) {
				e++, void 0 !== n.onProgress && n.onProgress(o, e, s), e === s && (i = !1, void 0 !== n.onLoad && n.onLoad())
			}, this.itemError = function(o) {
				void 0 !== n.onError && n.onError(o)
			}, this.resolveURL = function(o) {
				return a ? a(o) : o
			}, this.setURLModifier = function(o) {
				return a = o, this
			}
		}
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.LoadingManager = o, exports.DefaultLoadingManager = void 0;
		var t = new o;
		exports.DefaultLoadingManager = t;
	}, {}],
	"e/9W": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.ImageLoader = t;
		var e = require("./Cache.js"),
			r = require("./LoadingManager.js");

		function t(e) {
			this.manager = void 0 !== e ? e : r.DefaultLoadingManager
		}
		Object.assign(t.prototype, {
			crossOrigin: "anonymous",
			load: function(r, t, i, n) {
				void 0 === r && (r = ""), void 0 !== this.path && (r = this.path + r), r = this.manager.resolveURL(r);
				var a = this,
					s = e.Cache.get(r);
				if (void 0 !== s) return a.manager.itemStart(r), setTimeout(function() {
					t && t(s), a.manager.itemEnd(r)
				}, 0), s;
				var o = document.createElementNS("http://www.w3.org/1999/xhtml", "img");

				function d() {
					o.removeEventListener("load", d, !1), o.removeEventListener("error", m, !1), e.Cache.add(r, this), t && t(this), a.manager.itemEnd(r)
				}

				function m(e) {
					o.removeEventListener("load", d, !1), o.removeEventListener("error", m, !1), n && n(e), a.manager.itemError(r), a.manager.itemEnd(r)
				}
				return o.addEventListener("load", d, !1), o.addEventListener("error", m, !1), "data:" !== r.substr(0, 5) && void 0 !== this.crossOrigin && (o.crossOrigin = this.crossOrigin), a.manager.itemStart(r), o.src = r, o
			},
			setCrossOrigin: function(e) {
				return this.crossOrigin = e, this
			},
			setPath: function(e) {
				return this.path = e, this
			}
		});
	}, {
		"./Cache.js": "Oywa",
		"./LoadingManager.js": "bW6B"
	}],
	"QAHu": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.TextureLoader = a;
		var e = require("../constants.js"),
			r = require("./ImageLoader.js"),
			t = require("../textures/Texture.js"),
			s = require("./LoadingManager.js");

		function a(e) {
			this.manager = void 0 !== e ? e : s.DefaultLoadingManager
		}
		Object.assign(a.prototype, {
			crossOrigin: "anonymous",
			load: function(s, a, i, n) {
				var o = new t.Texture,
					u = new r.ImageLoader(this.manager);
				return u.setCrossOrigin(this.crossOrigin), u.setPath(this.path), u.load(s, function(r) {
					o.image = r;
					var t = s.search(/\.jpe?g($|\?)/i) > 0 || 0 === s.search(/^data\:image\/jpeg/);
					o.format = t ? e.RGBFormat : e.RGBAFormat, o.needsUpdate = !0, void 0 !== a && a(o)
				}, i, n), o
			},
			setCrossOrigin: function(e) {
				return this.crossOrigin = e, this
			},
			setPath: function(e) {
				return this.path = e, this
			}
		});
	}, {
		"../constants.js": "y6Nk",
		"./ImageLoader.js": "e/9W",
		"../textures/Texture.js": "L5Pf",
		"./LoadingManager.js": "bW6B"
	}],
	"C7HB": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.vertex = exports.fragment = void 0;
		var e = "\nuniform vec2 u_resolution;\n\nuniform sampler2D u_texture;\nuniform sampler2D u_texture2;\nuniform vec2 u_textureFactor;\nuniform vec2 u_texture2Factor;\nuniform float u_textureProgress;\n\n// RGB\nuniform vec2 u_rgbPosition;\nuniform vec2 u_rgbVelocity;\n\nvarying vec2 vUv;\nvec2 centeredAspectRatio(vec2 uvs, vec2 factor){\n    return uvs * factor - factor /2. + 0.5;\n}\nvoid main(){\n    // On THREE 102 The image is has Y backwards\n    // vec2 flipedUV = vec2(vUv.x,1.-vUv.y);\n\n    vec2 normalizedRgbPos = u_rgbPosition / u_resolution;\n    normalizedRgbPos.y = 1. - normalizedRgbPos.y; \n\n    \n    vec2 vel = u_rgbVelocity;\n    float dist = distance(normalizedRgbPos + vel / u_resolution, vUv.xy);\n\n    float ratio = clamp(1.0 - dist * 5., 0., 1.);\n\n\n    vec4 tex1 = vec4(1.);\n    vec4 tex2 = vec4(1.);\n\n    vec2 uv = vUv;\n\n    uv.x -= sin(uv.y) * ratio / 100. * (vel.x + vel.y) / 7.;\n    uv.y -= sin(uv.x) * ratio / 100. * (vel.x + vel.y) / 7.;\n\n    tex1.r = texture2D(u_texture, centeredAspectRatio(uv, u_textureFactor )).r;\n    tex2.r = texture2D(u_texture2, centeredAspectRatio(uv, u_textureFactor )).r;\n\n    \n    uv.x -= sin(uv.y) * ratio / 150. * (vel.x + vel.y) / 7.;\n    uv.y -= sin(uv.x) * ratio / 150. * (vel.x + vel.y) / 7.;\n\n    tex1.g = texture2D(u_texture, centeredAspectRatio(uv, u_textureFactor )).g;\n    tex2.g = texture2D(u_texture2, centeredAspectRatio(uv, u_textureFactor )).g;\n    \n    uv.x -= sin(uv.y) * ratio / 300. * (vel.x + vel.y) / 7.;\n    uv.y -= sin(uv.x) * ratio / 300. * (vel.x + vel.y) / 7.;\n\n    tex1.b = texture2D(u_texture, centeredAspectRatio(uv, u_textureFactor )).b;\n    tex2.b = texture2D(u_texture2, centeredAspectRatio(uv, u_textureFactor )).b;\n     \n    \n\n\n    vec4 fulltex1 = texture2D(u_texture, centeredAspectRatio(vUv, u_textureFactor) );\n    vec4 fulltex2 = texture2D(u_texture2, centeredAspectRatio(vUv, u_texture2Factor));\n    \n    vec4 mixedTextures =  mix(tex1,tex2,u_textureProgress);\n\n    gl_FragColor = mixedTextures;\n}\n";
		exports.fragment = e;
		var t = "\n#define PI 3.14159265359\nuniform float u_offset;\nuniform float u_progress;\nuniform float u_direction;\nuniform float u_time;\nuniform float u_waveIntensity;\nuniform float u_waveFrequency;\nuniform float u_waveSpeed;\nuniform float u_waveAmplitude;\nvarying vec2 vUv;\nvoid main(){\n    vec3 pos = position.xyz;\n\n    float distance = length(uv.xy - 0.5 );\n    float sizeDist = length(vec2(0.5,0.5));\n    float normalizedDistance = distance/sizeDist ;\n\n    float stickOutEffect = normalizedDistance ;\n    float stickInEffect = -normalizedDistance ;\n\n    \n    float stickEffect = mix(stickOutEffect,stickInEffect, u_direction);\n\n    // Backwards V wave.\n    float stick = 0.5;\n\n    float waveIn = u_progress*(1. / stick); \n    float waveOut =  -( u_progress - 1.) * (1./(1.-stick) );\n    waveOut = pow(smoothstep(0.,1.,waveOut),0.7);\n\n    float stickProgress = min(waveIn, waveOut);\n\n\n\n\n\n    // We can re-use stick Influcse because this oen starts at the same position\n    float offsetInProgress = clamp(waveIn,0.,1.);\n\n    // Invert stickout to get the slope moving upwards to the right\n    // and move it left by 1\n    float offsetOutProgress = clamp(1.-waveOut,0.,1.);\n\n    float offsetProgress = mix(offsetInProgress,offsetOutProgress,u_direction);\n\n\n    float stickOffset = u_offset;\n    pos.z += stickEffect * stickOffset * stickProgress  - u_offset * offsetProgress;\n\n    \n    pos.z += sin(distance * u_waveFrequency - u_time * u_waveSpeed )  * u_waveIntensity * u_waveAmplitude;\n\n    gl_Position =   \n        projectionMatrix * \n        modelViewMatrix * \n         vec4(pos, 1.0);\n\n    vUv = uv;\n}\n";
		exports.vertex = t;
	}, {}],
	"XX42": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.GLManager = u;
		var e = require("three/src/cameras/PerspectiveCamera.js"),
			t = require("three/src/scenes/Scene.js"),
			i = require("three/src/renderers/WebGLRenderer.js"),
			r = require("three/src/loaders/TextureLoader.js"),
			s = require("three/src/math/Vector2.js"),
			n = require("three/src/geometries/PlaneGeometry.js"),
			o = require("three/src/materials/ShaderMaterial.js"),
			a = require("three/src/objects/Mesh.js"),
			h = require("./shaders");

		function u(n) {
			var o = this,
				a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
			this.totalEntries = n.length, this.loadedEntries = 0;
			var h = new e.PerspectiveCamera(45, 1, .1, 1e4);
			h.position.z = 5;
			var u = new t.Scene;
			h.lookAt = u.position;
			var l = new i.WebGLRenderer({
				alpha: !0,
				antialias: !0
			});
			l.setSize(window.innerWidth, window.innerHeight), l.setPixelRatio(window.devicePixelRatio), this.options = a, this.render = this.render.bind(this), this.textures = n.map(function(e, t) {
				return (new r.TextureLoader).load(e.image, o.calculateAspectRatioFactor.bind(o, t))
			}), this.factors = n.map(function(e) {
				return new s.Vector2(1, 1)
			}), this.currentIndex = 0, this.nextIndex = 0, this.textureProgress = 0, this.camera = h, this.scene = u, this.renderer = l, this.initialRender = !1, this.time = 0, this.loopRaf = null, this.loop = this.loop.bind(this)
		}
		u.prototype.getViewSize = function() {
			var e = this.camera.fov * Math.PI / 180;
			return Math.abs(this.camera.position.z * Math.tan(e / 2) * 2)
		}, u.prototype.getPlaneSize = function() {
			var e = this.getViewSize();
			return {
				width: 1.5 * e,
				height: e
			}
		}, u.prototype.calculateAspectRatioFactor = function(e, t) {
			var i = this.getPlaneSize(),
				r = window.innerWidth / window.innerHeight,
				n = i.width / i.height * r,
				o = t.image.width / t.image.height,
				a = 1,
				h = 1;
			n > o ? (a = 1, h = 1 / n * o) : (a = 1 * n / o, h = 1), this.factors[e] = new s.Vector2(a, h), this.currentIndex === e && (this.mesh.material.uniforms.u_textureFactor.value = this.factors[e], this.mesh.material.uniforms.u_textureFactor.needsUpdate = !0), this.nextIndex === e && (this.mesh.material.uniforms.u_texture2Factor.value = this.factors[e], this.mesh.material.uniforms.u_texture2Factor.needsUpdate = !0), this.initialRender && (this.loadedEntries++, this.loadedEntries === this.totalEntries && document.body.classList.remove("loading"), this.render())
		}, u.prototype.createPlane = function() {
			this.getViewSize();
			var e = this.getPlaneSize(),
				t = e.width,
				i = e.height,
				r = new n.PlaneBufferGeometry(t, i, 60, 60),
				u = new o.ShaderMaterial({
					uniforms: {
						u_texture: {
							type: "t",
							value: this.textures[this.currentIndex]
						},
						u_textureFactor: {
							type: "f",
							value: this.factors[this.currentIndex]
						},
						u_texture2: {
							type: "t",
							value: this.textures[this.nextIndex]
						},
						u_texture2Factor: {
							type: "f",
							value: this.factors[this.nextIndex]
						},
						u_textureProgress: {
							type: "f",
							value: this.textureProgress
						},
						u_offset: {
							type: "f",
							value: 8
						},
						u_progress: {
							type: "f",
							value: 0
						},
						u_direction: {
							type: "f",
							value: 1
						},
						u_effect: {
							type: "f",
							value: 0
						},
						u_time: {
							type: "f",
							value: this.time
						},
						u_waveIntensity: {
							type: "f",
							value: 0
						},
						u_resolution: {
							type: "v2",
							value: new s.Vector2(window.innerWidth, window.innerHeight)
						},
						u_rgbPosition: {
							type: "v2",
							value: new s.Vector2(window.innerWidth / 2, window.innerHeight / 2)
						},
						u_rgbVelocity: {
							type: "v2",
							value: new s.Vector2(0, 0)
						},
						u_waveFrequency: {
							type: "f",
							value: this.options.waveFrequency ? this.options.waveFrequency : 8
						},
						u_waveSpeed: {
							type: "f",
							value: this.options.waveSpeed ? this.options.waveSpeed : 2
						},
						u_waveAmplitude: {
							type: "f",
							value: this.options.waveAmplitude ? this.options.waveAmplitude : 1
						}
					},
					vertexShader: h.vertex,
					fragmentShader: h.fragment,
					side: 2
				}),
				l = new a.Mesh(r, u);
			this.scene.add(l), this.mesh = l
		}, u.prototype.updateTexture = function(e, t) {
			var i = !1;
			null != e && this.newIndex !== this.currentIndex && (this.currentIndex = this.nextIndex, this.nextIndex = e, this.textureProgress = 0, this.mesh.material.uniforms.u_textureProgress.value = 0, this.mesh.material.uniforms.u_texture.value = this.textures[this.currentIndex], this.mesh.material.uniforms.u_textureFactor.value = this.factors[this.currentIndex], this.mesh.material.uniforms.u_texture2.value = this.textures[e], this.mesh.material.uniforms.u_texture2Factor.value = this.factors[e], i = !0), null != t && t !== this.textureProgress && (this.mesh.material.uniforms.u_textureProgress.value = t, this.textureProgress = t, i = !0), !this.loopRaf && i && this.render()
		}, u.prototype.updateStickEffect = function(e) {
			var t = e.progress,
				i = e.direction,
				r = e.waveIntensity;
			this.mesh.material.uniforms.u_progress.value = t, this.mesh.material.uniforms.u_direction.value = i, this.mesh.material.uniforms.u_waveIntensity.value = r
		}, u.prototype.updateRgbEffect = function(e) {
			var t = e.position,
				i = e.velocity;
			this.mesh.material.uniforms.u_rgbPosition.value = new s.Vector2(t.x, t.y), this.mesh.material.uniforms.u_rgbVelocity.value = new s.Vector2(i.x, i.y), this.loopRaf || this.render()
		}, u.prototype.render = function() {
			this.initialRender || (this.initialRender = !0), this.renderer.render(this.scene, this.camera)
		}, u.prototype.mount = function(e) {
			e.appendChild(this.renderer.domElement)
		}, u.prototype.unmount = function() {
			this.mesh.material.dispose(), this.mesh.geometry.dispose(), this.mesh = null, this.renderer = null, this.camera = null, this.scene = null, this.container = null
		}, u.prototype.onResize = function() {
			this.renderer.setSize(window.innerWidth, window.innerHeight), this.mesh.material.uniforms.u_resolution.value = new s.Vector2(window.innerWidth, window.innerHeight);
			for (var e = 0; e < this.textures.length; e++) this.textures[e].image && this.calculateAspectRatioFactor(e, this.textures[e]);
			this.render()
		}, u.prototype.scheduleLoop = function() {
			this.loopRaf || this.loop()
		}, u.prototype.loop = function() {
			this.render(), this.time += .1, this.mesh.material.uniforms.u_time.value = this.time, this.loopRaf = requestAnimationFrame(this.loop)
		}, u.prototype.cancelLoop = function() {
			cancelAnimationFrame(this.loopRaf), this.loopRaf = null
		};
	}, {
		"three/src/cameras/PerspectiveCamera.js": "iz3s",
		"three/src/scenes/Scene.js": "E4Pr",
		"three/src/renderers/WebGLRenderer.js": "BXu0",
		"three/src/loaders/TextureLoader.js": "QAHu",
		"three/src/math/Vector2.js": "vOoB",
		"three/src/geometries/PlaneGeometry.js": "TPAv",
		"three/src/materials/ShaderMaterial.js": "Kxey",
		"three/src/objects/Mesh.js": "RvMr",
		"./shaders": "C7HB"
	}],
	"KFGT": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.invariant = exports.warning = void 0;
		var e = "Hey, listen! ",
			n = function() {};
		exports.warning = n;
		var r = function() {};
		exports.invariant = r;
	}, {}],
	"pBGv": [function(require, module, exports) {

		var t, e, n = module.exports = {};

		function r() {
			throw new Error("setTimeout has not been defined")
		}

		function o() {
			throw new Error("clearTimeout has not been defined")
		}

		function i(e) {
			if (t === setTimeout) return setTimeout(e, 0);
			if ((t === r || !t) && setTimeout) return t = setTimeout, setTimeout(e, 0);
			try {
				return t(e, 0)
			} catch (n) {
				try {
					return t.call(null, e, 0)
				} catch (n) {
					return t.call(this, e, 0)
				}
			}
		}

		function u(t) {
			if (e === clearTimeout) return clearTimeout(t);
			if ((e === o || !e) && clearTimeout) return e = clearTimeout, clearTimeout(t);
			try {
				return e(t)
			} catch (n) {
				try {
					return e.call(null, t)
				} catch (n) {
					return e.call(this, t)
				}
			}
		}! function() {
			try {
				t = "function" == typeof setTimeout ? setTimeout : r
			} catch (n) {
				t = r
			}
			try {
				e = "function" == typeof clearTimeout ? clearTimeout : o
			} catch (n) {
				e = o
			}
		}();
		var c, s = [],
			l = !1,
			a = -1;

		function f() {
			l && c && (l = !1, c.length ? s = c.concat(s) : a = -1, s.length && h())
		}

		function h() {
			if (!l) {
				var t = i(f);
				l = !0;
				for (var e = s.length; e;) {
					for (c = s, s = []; ++a < e;) c && c[a].run();
					a = -1, e = s.length
				}
				c = null, l = !1, u(t)
			}
		}

		function m(t, e) {
			this.fun = t, this.array = e
		}

		function p() {}
		n.nextTick = function(t) {
			var e = new Array(arguments.length - 1);
			if (arguments.length > 1)
				for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
			s.push(new m(t, e)), 1 !== s.length || l || i(h)
		}, m.prototype.run = function() {
			this.fun.apply(null, this.array)
		}, n.title = "browser", n.env = {}, n.argv = [], n.version = "", n.versions = {}, n.on = p, n.addListener = p, n.once = p, n.off = p, n.removeListener = p, n.removeAllListeners = p, n.emit = p, n.prependListener = p, n.prependOnceListener = p, n.listeners = function(t) {
			return []
		}, n.binding = function(t) {
			throw new Error("process.binding is not supported")
		}, n.cwd = function() {
			return "/"
		}, n.chdir = function(t) {
			throw new Error("process.chdir is not supported")
		}, n.umask = function() {
			return 0
		};
	}, {}],
	"bSZI": [function(require, module, exports) {
		var process = require("process");
		var e = require("process");
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.getFrameData = exports.cancelSync = exports.default = void 0;
		var n, t = require("hey-listen"),
			r = 0,
			a = "undefined" != typeof window && void 0 !== window.requestAnimationFrame ? function(e) {
				return window.requestAnimationFrame(e)
			} : function(e) {
				var n = Date.now(),
					t = Math.max(0, 16.7 - (n - r));
				r = n + t, setTimeout(function() {
					return e(r)
				}, t)
			},
			c = function(e) {
				var n = [],
					r = [],
					a = 0,
					c = !1,
					o = 0,
					i = new WeakSet,
					d = new WeakSet,
					u = {
						cancel: function(e) {
							var n = r.indexOf(e);
							i.add(e), -1 !== n && r.splice(n, 1)
						},
						process: function(t) {
							var s, f;
							if (c = !0, n = (s = [r, n])[0], (r = s[1]).length = 0, a = n.length)
								for (o = 0; o < a; o++)(f = n[o])(t), !0 !== d.has(f) || i.has(f) || (u.schedule(f), e(!0));
							c = !1
						},
						schedule: function(e, o, u) {
							void 0 === o && (o = !1), void 0 === u && (u = !1), (0, t.invariant)("function" == typeof e, "Argument must be a function");
							var s = u && c,
								f = s ? n : r;
							i.delete(e), o && d.add(e), -1 === f.indexOf(e) && (f.push(e), s && (a = n.length))
						}
					};
				return u
			};
		! function(e) {
			e.Read = "read", e.Update = "update", e.Render = "render", e.PostRender = "postRender", e.FixedUpdate = "fixedUpdate"
		}(n || (n = {}));
		var o = 40,
			i = 1 / 60 * 1e3,
			d = !0,
			u = !1,
			s = !1,
			f = {
				delta: 0,
				timestamp: 0
			},
			p = [n.Read, n.Update, n.Render, n.PostRender],
			l = function(e) {
				return u = e
			},
			v = p.reduce(function(e, n) {
				var t = c(l);
				return e.sync[n] = function(e, n, r) {
					return void 0 === n && (n = !1), void 0 === r && (r = !1), u || R(), t.schedule(e, n, r), e
				}, e.cancelSync[n] = function(e) {
					return t.cancel(e)
				}, e.steps[n] = t, e
			}, {
				steps: {},
				sync: {},
				cancelSync: {}
			}),
			m = v.steps,
			h = v.sync,
			x = v.cancelSync;
		exports.cancelSync = x;
		var y = function(e) {
				return m[e].process(f)
			},
			w = function(e) {
				u = !1, f.delta = d ? i : Math.max(Math.min(e - f.timestamp, o), 1), d || (i = f.delta), f.timestamp = e, s = !0, p.forEach(y), s = !1, u && (d = !1, a(w))
			},
			R = function() {
				u = !0, d = !0, s || a(w)
			},
			S = function() {
				return f
			};
		exports.getFrameData = S;
		var g = h;
		exports.default = g;
	}, {
		"hey-listen": "KFGT",
		"process": "pBGv"
	}],
	"Hokg": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.complex = exports.color = exports.hex = exports.hsla = exports.rgbUnit = exports.rgba = exports.vh = exports.vw = exports.px = exports.progressPercentage = exports.percent = exports.degrees = exports.alpha = exports.scale = exports.number = void 0;
		var r = function() {
				return (r = Object.assign || function(r) {
					for (var t, e = 1, n = arguments.length; e < n; e++)
						for (var s in t = arguments[e]) Object.prototype.hasOwnProperty.call(t, s) && (r[s] = t[s]);
					return r
				}).apply(this, arguments)
			},
			t = function(r, t) {
				return function(e) {
					return Math.max(Math.min(e, t), r)
				}
			},
			e = function(r) {
				return function(t) {
					return "string" == typeof t && 0 === t.indexOf(r)
				}
			},
			n = function(r) {
				return r.substring(r.indexOf("(") + 1, r.lastIndexOf(")"))
			},
			s = function(r) {
				return "string" == typeof r ? r.split(/,\s*/) : [r]
			},
			a = function(r) {
				return r % 1 ? Number(r.toFixed(5)) : r
			},
			o = {
				test: function(r) {
					return "number" == typeof r
				},
				parse: parseFloat,
				transform: function(r) {
					return r
				}
			};
		exports.number = o;
		var u = r({}, o, {
			transform: t(0, 1)
		});
		exports.alpha = u;
		var p = r({}, o, {
			default: 1
		});
		exports.scale = p;
		var f = function(r) {
				return {
					test: function(t) {
						return "string" == typeof t && t.endsWith(r) && 1 === t.split(" ").length
					},
					parse: parseFloat,
					transform: function(t) {
						return "" + t + r
					}
				}
			},
			i = f("deg");
		exports.degrees = i;
		var c = f("%");
		exports.percent = c;
		var l = f("px");
		exports.px = l;
		var h = f("vh");
		exports.vh = h;
		var g = f("vw");
		exports.vw = g;
		var v = r({}, c, {
			parse: function(r) {
				return c.parse(r) / 100
			},
			transform: function(r) {
				return c.transform(100 * r)
			}
		});
		exports.progressPercentage = v;
		var x = t(0, 255),
			m = /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))$/i,
			d = function(r) {
				return void 0 !== r.red
			},
			b = function(r) {
				return void 0 !== r.hue
			},
			y = function(r) {
				var t = r.length;
				return function(e) {
					if ("string" != typeof e) return e;
					for (var a = {}, o = s(n(e)), u = 0; u < t; u++) a[r[u]] = void 0 !== o[u] ? parseFloat(o[u]) : 1;
					return a
				}
			},
			O = function(r) {
				var t = r.red,
					e = r.green,
					n = r.blue,
					s = r.alpha;
				return "rgba(" + t + ", " + e + ", " + n + ", " + (void 0 === s ? 1 : s) + ")"
			},
			M = function(r) {
				var t = r.hue,
					e = r.saturation,
					n = r.lightness,
					s = r.alpha;
				return "hsla(" + t + ", " + e + ", " + n + ", " + (void 0 === s ? 1 : s) + ")"
			},
			w = r({}, o, {
				transform: function(r) {
					return Math.round(x(r))
				}
			});
		exports.rgbUnit = w;
		var F = e("rgb"),
			I = {
				test: function(r) {
					return "string" == typeof r ? F(r) : d(r)
				},
				parse: y(["red", "green", "blue", "alpha"]),
				transform: function(r) {
					var t = r.red,
						e = r.green,
						n = r.blue,
						s = r.alpha;
					return O({
						red: w.transform(t),
						green: w.transform(e),
						blue: w.transform(n),
						alpha: a(s)
					})
				}
			};
		exports.rgba = I;
		var P = e("hsl"),
			j = {
				test: function(r) {
					return "string" == typeof r ? P(r) : b(r)
				},
				parse: y(["hue", "saturation", "lightness", "alpha"]),
				transform: function(r) {
					var t = r.hue,
						e = r.saturation,
						n = r.lightness,
						s = r.alpha;
					return M({
						hue: Math.round(t),
						saturation: c.transform(a(e)),
						lightness: c.transform(a(n)),
						alpha: a(s)
					})
				}
			};
		exports.hsla = j;
		var N = r({}, I, {
			test: e("#"),
			parse: function(r) {
				var t = "",
					e = "",
					n = "";
				return r.length > 4 ? (t = r.substr(1, 2), e = r.substr(3, 2), n = r.substr(5, 2)) : (t = r.substr(1, 1), e = r.substr(2, 1), n = r.substr(3, 1), t += t, e += e, n += n), {
					red: parseInt(t, 16),
					green: parseInt(e, 16),
					blue: parseInt(n, 16),
					alpha: 1
				}
			}
		});
		exports.hex = N;
		var $ = {
			test: function(r) {
				return "string" == typeof r && m.test(r) || I.test(r) || j.test(r) || N.test(r)
			},
			parse: function(r) {
				return I.test(r) ? I.parse(r) : j.test(r) ? j.parse(r) : N.test(r) ? N.parse(r) : r
			},
			transform: function(r) {
				return d(r) ? I.transform(r) : b(r) ? j.transform(r) : r
			}
		};
		exports.color = $;
		var U = /(-)?(\d[\d\.]*)/g,
			_ = /(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi,
			T = "${c}",
			W = "${n}",
			k = {
				test: function(r) {
					if ("string" != typeof r || !isNaN(r)) return !1;
					var t = 0,
						e = r.match(U),
						n = r.match(_);
					return e && (t += e.length), n && (t += n.length), t > 0
				},
				parse: function(r) {
					var t = r,
						e = [],
						n = t.match(_);
					n && (t = t.replace(_, T), e.push.apply(e, n.map($.parse)));
					var s = t.match(U);
					return s && e.push.apply(e, s.map(o.parse)), e
				},
				createTransformer: function(r) {
					var t = r,
						e = 0,
						n = r.match(_),
						s = n ? n.length : 0;
					if (n)
						for (var o = 0; o < s; o++) t = t.replace(n[o], T), e++;
					var u = t.match(U),
						p = u ? u.length : 0;
					if (u)
						for (o = 0; o < p; o++) t = t.replace(u[o], W), e++;
					return function(r) {
						for (var n = t, o = 0; o < e; o++) n = n.replace(o < s ? T : W, o < s ? $.transform(r[o]) : a(r[o]));
						return n
					}
				}
			};
		exports.complex = k;
	}, {}],
	"xQjT": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.cubicBezier = J, exports.bounceInOut = exports.bounceIn = exports.bounceOut = exports.anticipate = exports.backInOut = exports.backOut = exports.backIn = exports.circInOut = exports.circOut = exports.circIn = exports.easeInOut = exports.easeOut = exports.easeIn = exports.linear = exports.createAnticipateEasing = exports.createBackIn = exports.createExpoIn = exports.createMirroredEasing = exports.createReversedEasing = exports.mirrored = exports.reversed = void 0;
		var r = 1.525,
			e = function(r) {
				return function(e) {
					return 1 - r(1 - e)
				}
			};
		exports.reversed = e;
		var t = function(r) {
			return function(e) {
				return e <= .5 ? r(2 * e) / 2 : (2 - r(2 * (1 - e))) / 2
			}
		};
		exports.mirrored = t;
		var n = e;
		exports.createReversedEasing = n;
		var o = t;
		exports.createMirroredEasing = o;
		var a = function(r) {
			return function(e) {
				return Math.pow(e, r)
			}
		};
		exports.createExpoIn = a;
		var u = function(r) {
			return function(e) {
				return e * e * ((r + 1) * e - r)
			}
		};
		exports.createBackIn = u;
		var c = function(r) {
			var e = u(r);
			return function(r) {
				return (r *= 2) < 1 ? .5 * e(r) : .5 * (2 - Math.pow(2, -10 * (r - 1)))
			}
		};
		exports.createAnticipateEasing = c;
		var s = function(r) {
			return r
		};
		exports.linear = s;
		var i = a(2);
		exports.easeIn = i;
		var p = e(i);
		exports.easeOut = p;
		var x = t(i);
		exports.easeInOut = x;
		var v = function(r) {
			return 1 - Math.sin(Math.acos(r))
		};
		exports.circIn = v;
		var f = e(v);
		exports.circOut = f;
		var I = t(f);
		exports.circInOut = I;
		var O = u(r);
		exports.backIn = O;
		var b = e(O);
		exports.backOut = b;
		var d = t(O);
		exports.backInOut = d;
		var k = c(r);
		exports.anticipate = k;
		var E = 4 / 11,
			M = 8 / 11,
			l = .9,
			g = 4356 / 361,
			h = 35442 / 1805,
			w = 16061 / 1805,
			y = function(r) {
				var e = r * r;
				return r < E ? 7.5625 * e : r < M ? 9.075 * e - 9.9 * r + 3.4 : r < l ? g * e - h * r + w : 10.8 * r * r - 20.52 * r + 10.72
			};
		exports.bounceOut = y;
		var A = function(r) {
			return 1 - y(1 - r)
		};
		exports.bounceIn = A;
		var B = function(r) {
			return r < .5 ? .5 * (1 - y(1 - 2 * r)) : .5 * y(2 * r - 1) + .5
		};
		exports.bounceInOut = B;
		var m = 8,
			F = .001,
			R = 1e-7,
			_ = 10,
			j = 11,
			z = 1 / (j - 1),
			P = "undefined" != typeof Float32Array,
			q = function(r, e) {
				return 1 - 3 * e + 3 * r
			},
			C = function(r, e) {
				return 3 * e - 6 * r
			},
			D = function(r) {
				return 3 * r
			},
			G = function(r, e, t) {
				return 3 * q(e, t) * r * r + 2 * C(e, t) * r + D(e)
			},
			H = function(r, e, t) {
				return ((q(e, t) * r + C(e, t)) * r + D(e)) * r
			};

		function J(r, e, t, n) {
			var o = P ? new Float32Array(j) : new Array(j),
				a = function(e) {
					for (var n, a, u, c = 0, s = 1, i = j - 1; s !== i && o[s] <= e; ++s) c += z;
					return n = (e - o[--s]) / (o[s + 1] - o[s]), (u = G(a = c + n * z, r, t)) >= F ? function(e, n) {
						for (var o = 0, a = 0; o < m; ++o) {
							if (0 === (a = G(n, r, t))) return n;
							n -= (H(n, r, t) - e) / a
						}
						return n
					}(e, a) : 0 === u ? a : function(e, n, o) {
						var a, u, c = 0;
						do {
							(a = H(u = n + (o - n) / 2, r, t) - e) > 0 ? o = u : n = u
						} while (Math.abs(a) > R && ++c < _);
						return u
					}(e, c, c + z)
				};
			! function() {
				for (var e = 0; e < j; ++e) o[e] = H(e * z, r, t)
			}();
			return function(o) {
				return r === e && t === n ? o : 0 === o ? 0 : 1 === o ? 1 : H(a(o), e, n)
			}
		}
	}, {}],
	"cue+": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.interpolate = E, Object.defineProperty(exports, "createAnticipateEasing", {
			enumerable: !0,
			get: function() {
				return n.createAnticipateEasing
			}
		}), Object.defineProperty(exports, "createBackIn", {
			enumerable: !0,
			get: function() {
				return n.createBackIn
			}
		}), Object.defineProperty(exports, "createExpoIn", {
			enumerable: !0,
			get: function() {
				return n.createExpoIn
			}
		}), Object.defineProperty(exports, "cubicBezier", {
			enumerable: !0,
			get: function() {
				return n.cubicBezier
			}
		}), Object.defineProperty(exports, "linear", {
			enumerable: !0,
			get: function() {
				return n.linear
			}
		}), Object.defineProperty(exports, "easeIn", {
			enumerable: !0,
			get: function() {
				return n.easeIn
			}
		}), Object.defineProperty(exports, "easeOut", {
			enumerable: !0,
			get: function() {
				return n.easeOut
			}
		}), Object.defineProperty(exports, "easeInOut", {
			enumerable: !0,
			get: function() {
				return n.easeInOut
			}
		}), Object.defineProperty(exports, "circIn", {
			enumerable: !0,
			get: function() {
				return n.circIn
			}
		}), Object.defineProperty(exports, "circOut", {
			enumerable: !0,
			get: function() {
				return n.circOut
			}
		}), Object.defineProperty(exports, "circInOut", {
			enumerable: !0,
			get: function() {
				return n.circInOut
			}
		}), Object.defineProperty(exports, "backIn", {
			enumerable: !0,
			get: function() {
				return n.backIn
			}
		}), Object.defineProperty(exports, "backOut", {
			enumerable: !0,
			get: function() {
				return n.backOut
			}
		}), Object.defineProperty(exports, "backInOut", {
			enumerable: !0,
			get: function() {
				return n.backInOut
			}
		}), Object.defineProperty(exports, "anticipate", {
			enumerable: !0,
			get: function() {
				return n.anticipate
			}
		}), Object.defineProperty(exports, "reversed", {
			enumerable: !0,
			get: function() {
				return n.reversed
			}
		}), Object.defineProperty(exports, "mirrored", {
			enumerable: !0,
			get: function() {
				return n.mirrored
			}
		}), exports.wrap = exports.velocityPerSecond = exports.velocityPerFrame = exports.toDecimal = exports.steps = exports.springForceLinear = exports.springForceExpo = exports.springForce = exports.snap = exports.smoothFrame = exports.smooth = exports.radiansToDegrees = exports.progress = exports.pointFromVector = exports.pipe = exports.mixComplex = exports.mixColor = exports.mixArray = exports.mix = exports.isPoint3D = exports.isPoint = exports.distance = exports.degreesToRadians = exports.conditional = exports.clamp = exports.applyOffset = exports.angle = void 0;
		var r = require("style-value-types"),
			e = require("hey-listen"),
			t = require("framesync"),
			n = require("@popmotion/easing"),
			o = {
				x: 0,
				y: 0,
				z: 0
			},
			a = function(r) {
				return "number" == typeof r
			},
			i = function(r) {
				return 180 * r / Math.PI
			};
		exports.radiansToDegrees = i;
		var u = function(r, e) {
			return void 0 === e && (e = o), i(Math.atan2(e.y - r.y, e.x - r.x))
		};
		exports.angle = u;
		var s = function(r, e) {
			var t = !0;
			return void 0 === e && (e = r, t = !1),
				function(n) {
					return t ? n - r + e : (r = n, t = !0, e)
				}
		};
		exports.applyOffset = s;
		var c = function(r) {
				return function(e, t, n) {
					return void 0 !== n ? r(e, t, n) : function(n) {
						return r(e, t, n)
					}
				}
			},
			p = function(r, e, t) {
				return Math.min(Math.max(t, r), e)
			},
			f = c(p);
		exports.clamp = f;
		var x = function(r, e) {
			return function(t) {
				return r(t) ? e(t) : t
			}
		};
		exports.conditional = x;
		var v = function(r) {
			return r * Math.PI / 180
		};
		exports.degreesToRadians = v;
		var l = function(r) {
			return r.hasOwnProperty("x") && r.hasOwnProperty("y")
		};
		exports.isPoint = l;
		var m = function(r) {
			return l(r) && r.hasOwnProperty("z")
		};
		exports.isPoint3D = m;
		var h = function(r, e) {
				return Math.abs(r - e)
			},
			d = function(r, e) {
				if (void 0 === e && (e = o), a(r) && a(e)) return h(r, e);
				if (l(r) && l(e)) {
					var t = h(r.x, e.x),
						n = h(r.y, e.y),
						i = m(r) && m(e) ? h(r.z, e.z) : 0;
					return Math.sqrt(Math.pow(t, 2) + Math.pow(n, 2) + Math.pow(i, 2))
				}
				return 0
			};
		exports.distance = d;
		var b = function(r, e, t) {
			var n = e - r;
			return 0 === n ? 1 : (t - r) / n
		};
		exports.progress = b;
		var g = function(r, e, t) {
			return -t * r + t * e + r
		};
		exports.mix = g;
		var y = function() {
				return (y = Object.assign || function(r) {
					for (var e, t = 1, n = arguments.length; t < n; t++)
						for (var o in e = arguments[t]) Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
					return r
				}).apply(this, arguments)
			},
			O = function(r, e, t) {
				var n = r * r,
					o = e * e;
				return Math.sqrt(t * (o - n) + n)
			},
			P = [r.hex, r.rgba, r.hsla],
			M = function(r) {
				return P.find(function(e) {
					return e.test(r)
				})
			},
			j = function(t, n) {
				var o = M(t),
					a = M(n);
				(0, e.invariant)(o.transform === a.transform, "Both colors must be Hex and/or RGBA, or both must be HSLA");
				var i = o.parse(t),
					u = a.parse(n),
					s = y({}, i),
					c = o === r.hsla ? g : O;
				return function(r) {
					for (var e in s) "alpha" !== e && (s[e] = c(i[e], u[e], r));
					return s.alpha = g(i.alpha, u.alpha, r), o.transform(s)
				}
			};
		exports.mixColor = j;
		var I = function(r, e) {
				return function(t) {
					return e(r(t))
				}
			},
			F = function() {
				for (var r = [], e = 0; e < arguments.length; e++) r[e] = arguments[e];
				return r.reduce(I)
			};
		exports.pipe = F;
		var w = function(e, t) {
			var n = e.slice(),
				o = n.length,
				i = e.map(function(e, n) {
					var o = t[n];
					return a(e) ? function(r) {
						return g(e, o, r)
					} : r.color.test(e) ? j(e, o) : A(e, o)
				});
			return function(r) {
				for (var e = 0; e < o; e++) n[e] = i[e](r);
				return n
			}
		};
		exports.mixArray = w;
		var A = function(t, n) {
			var o = r.complex.createTransformer(t);
			return (0, e.invariant)(o(t) === r.complex.createTransformer(n)(t), "Values '" + t + "' and '" + n + "' are of different format, or a value might have changed value type."), F(w(r.complex.parse(t), r.complex.parse(n)), o)
		};
		exports.mixComplex = A;
		var k = function(r, e) {
			return function(t) {
				return g(r, e, t)
			}
		};

		function q(e) {
			return "number" == typeof e ? k : r.color.test(e) ? j : A
		}

		function B(r, e, t) {
			for (var n = [], o = t || q(r[0]), a = r.length - 1, i = 0; i < a; i++) {
				var u = o(r[i], r[i + 1]);
				if (e) {
					var s = Array.isArray(e) ? e[i] : e;
					u = F(s, u)
				}
				n.push(u)
			}
			return n
		}

		function D(r, e) {
			var t = r[0],
				n = r[1],
				o = e[0];
			return function(r) {
				return o(b(t, n, r))
			}
		}

		function z(r, e) {
			var t = r.length,
				n = t - 1;
			return function(o) {
				var a = 0,
					i = !1;
				if (o <= r[0] ? i = !0 : o >= r[n] && (a = n - 1, i = !0), !i) {
					for (var u = 1; u < t && !(r[u] > o || u === n); u++);
					a = u - 1
				}
				var s = b(r[a], r[a + 1], o);
				return e[a](s)
			}
		}

		function E(r, t, n) {
			var o = void 0 === n ? {} : n,
				a = o.clamp,
				i = void 0 === a || a,
				u = o.ease,
				s = o.mixer,
				c = r.length;
			(0, e.invariant)(c === t.length, "Both input and output ranges must be the same length"), (0, e.invariant)(!u || !Array.isArray(u) || u.length === c - 1, "Array of easing functions must be of length `input.length - 1`, as it applies to the transitions **between** the defined values."), r[0] > r[c - 1] && (r = [].concat(r), t = [].concat(t), r.reverse(), t.reverse());
			var p = B(t, u, s),
				x = 2 === c ? D(r, p) : z(r, p);
			return i ? F(f(r[0], r[c - 1]), x) : x
		}
		var T = function(r, e, t) {
			return e = v(e), {
				x: t * Math.cos(e) + r.x,
				y: t * Math.sin(e) + r.y
			}
		};
		exports.pointFromVector = T;
		var C = function(r, e) {
			return void 0 === e && (e = 2), e = Math.pow(10, e), Math.round(r * e) / e
		};
		exports.toDecimal = C;
		var L = function(r, e, t, n) {
			return void 0 === n && (n = 0), C(r + t * (e - r) / Math.max(n, t))
		};
		exports.smoothFrame = L;
		var R = function(r) {
			void 0 === r && (r = 50);
			var e = 0,
				n = 0;
			return function(o) {
				var a = (0, t.getFrameData)().timestamp,
					i = a !== n ? a - n : 0,
					u = i ? L(e, o, i, r) : e;
				return n = a, e = u, u
			}
		};
		exports.smooth = R;
		var S = function(r) {
			if ("number" == typeof r) return function(e) {
				return Math.round(e / r) * r
			};
			var e = 0,
				t = r.length;
			return function(n) {
				var o = Math.abs(r[0] - n);
				for (e = 1; e < t; e++) {
					var a = r[e],
						i = Math.abs(a - n);
					if (0 === i) return a;
					if (i > o) return r[e - 1];
					if (e === t - 1) return a;
					o = i
				}
			}
		};
		exports.snap = S;
		var V = function(r) {
				return r
			},
			H = function(r) {
				return void 0 === r && (r = V), c(function(e, t, n) {
					var o = t - n,
						a = -(0 - e + 1) * (0 - r(Math.abs(o)));
					return o <= 0 ? t + a : t - a
				})
			};
		exports.springForce = H;
		var _ = H();
		exports.springForceLinear = _;
		var G = H(Math.sqrt);
		exports.springForceExpo = G;
		var J = function(r, e) {
			return a(r) ? r / (1e3 / e) : 0
		};
		exports.velocityPerFrame = J;
		var K = function(r, e) {
			return e ? r * (1e3 / e) : 0
		};
		exports.velocityPerSecond = K;
		var N = function(r, e, t) {
				var n = e - r;
				return ((t - r) % n + n) % n + r
			},
			Q = c(N);
		exports.wrap = Q;
		var U = f(0, 1),
			W = function(r, e) {
				return void 0 === e && (e = "end"),
					function(t) {
						var n = (t = "end" === e ? Math.min(t, .999) : Math.max(t, .001)) * r,
							o = "end" === e ? Math.floor(n) : Math.ceil(n);
						return U(o / r)
					}
			};
		exports.steps = W;
	}, {
		"style-value-types": "Hokg",
		"hey-listen": "KFGT",
		"framesync": "bSZI",
		"@popmotion/easing": "xQjT"
	}],
	"KOul": [function(require, module, exports) {
		"use strict";
		var r = this && this.__assign || function() {
				return (r = Object.assign || function(r) {
					for (var t, e = 1, n = arguments.length; e < n; e++)
						for (var i in t = arguments[e]) Object.prototype.hasOwnProperty.call(t, i) && (r[i] = t[i]);
					return r
				}).apply(this, arguments)
			},
			t = this && this.__spreadArrays || function() {
				for (var r = 0, t = 0, e = arguments.length; t < e; t++) r += arguments[t].length;
				var n = Array(r),
					i = 0;
				for (t = 0; t < e; t++)
					for (var o = arguments[t], p = 0, u = o.length; p < u; p++, i++) n[i] = o[p];
				return n
			};
		Object.defineProperty(exports, "__esModule", {
			value: !0
		});
		var e = require("@popmotion/popcorn"),
			n = function() {
				function n(r) {
					void 0 === r && (r = {}), this.props = r
				}
				return n.prototype.applyMiddleware = function(e) {
					return this.create(r(r({}, this.props), {
						middleware: this.props.middleware ? t([e], this.props.middleware) : [e]
					}))
				}, n.prototype.pipe = function() {
					for (var r = [], t = 0; t < arguments.length; t++) r[t] = arguments[t];
					var n = 1 === r.length ? r[0] : e.pipe.apply(void 0, r);
					return this.applyMiddleware(function(r) {
						return function(t) {
							return r(n(t))
						}
					})
				}, n.prototype.while = function(r) {
					return this.applyMiddleware(function(t, e) {
						return function(n) {
							return r(n) ? t(n) : e()
						}
					})
				}, n.prototype.filter = function(r) {
					return this.applyMiddleware(function(t) {
						return function(e) {
							return r(e) && t(e)
						}
					})
				}, n
			}();
		exports.default = n;
	}, {
		"@popmotion/popcorn": "cue+"
	}],
	"btfs": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		});
		var e = function() {
			return function(e, t) {
				var r = this,
					o = e.middleware,
					i = e.onComplete;
				this.isActive = !0, this.update = function(e) {
					r.observer.update && r.updateObserver(e)
				}, this.complete = function() {
					r.observer.complete && r.isActive && r.observer.complete(), r.onComplete && r.onComplete(), r.isActive = !1
				}, this.error = function(e) {
					r.observer.error && r.isActive && r.observer.error(e), r.isActive = !1
				}, this.observer = t, this.updateObserver = function(e) {
					return t.update(e)
				}, this.onComplete = i, t.update && o && o.length && o.forEach(function(e) {
					return r.updateObserver = e(r.updateObserver, r.complete)
				})
			}
		}();
		exports.Observer = e, exports.default = function(t, r, o) {
			var i = r.middleware;
			return new e({
				middleware: i,
				onComplete: o
			}, "function" == typeof t ? {
				update: t
			} : t)
		};
	}, {}],
	"bkas": [function(require, module, exports) {
		"use strict";
		var t = this && this.__extends || function() {
				var t = function(r, e) {
					return (t = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function(t, r) {
							t.__proto__ = r
						} || function(t, r) {
							for (var e in r) r.hasOwnProperty(e) && (t[e] = r[e])
						})(r, e)
				};
				return function(r, e) {
					function n() {
						this.constructor = r
					}
					t(r, e), r.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n)
				}
			}(),
			r = this && this.__assign || function() {
				return (r = Object.assign || function(t) {
					for (var r, e = 1, n = arguments.length; e < n; e++)
						for (var o in r = arguments[e]) Object.prototype.hasOwnProperty.call(r, o) && (t[o] = r[o]);
					return t
				}).apply(this, arguments)
			},
			e = this && this.__rest || function(t, r) {
				var e = {};
				for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && r.indexOf(n) < 0 && (e[n] = t[n]);
				if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
					var o = 0;
					for (n = Object.getOwnPropertySymbols(t); o < n.length; o++) r.indexOf(n[o]) < 0 && Object.prototype.propertyIsEnumerable.call(t, n[o]) && (e[n[o]] = t[n[o]])
				}
				return e
			},
			n = this && this.__importDefault || function(t) {
				return t && t.__esModule ? t : {
					default: t
				}
			};
		Object.defineProperty(exports, "__esModule", {
			value: !0
		});
		var o = n(require("../chainable")),
			i = n(require("../observer")),
			u = function(n) {
				function o() {
					return null !== n && n.apply(this, arguments) || this
				}
				return t(o, n), o.prototype.create = function(t) {
					return new o(t)
				}, o.prototype.start = function(t) {
					void 0 === t && (t = {});
					var n = !1,
						o = {
							stop: function() {}
						},
						u = this.props,
						s = u.init,
						p = e(u, ["init"]),
						c = s(i.default(t, p, function() {
							n = !0, o.stop()
						}));
					return o = c ? r(r({}, o), c) : o, t.registerParent && t.registerParent(o), n && o.stop(), o
				}, o
			}(o.default);
		exports.Action = u, exports.default = function(t) {
			return new u({
				init: t
			})
		};
	}, {
		"../chainable": "KOul",
		"../observer": "btfs"
	}],
	"tiEx": [function(require, module, exports) {
		"use strict";
		var t = this && this.__importDefault || function(t) {
			return t && t.__esModule ? t : {
				default: t
			}
		};
		Object.defineProperty(exports, "__esModule", {
			value: !0
		});
		var e = t(require("framesync")),
			r = t(require("../action")),
			u = function(t) {
				var u = t.getCount,
					n = t.getFirst,
					o = t.getOutput,
					a = t.mapApi,
					i = t.setProp,
					c = t.startActions;
				return function(t) {
					return r.default(function(r) {
						var f = r.update,
							s = r.complete,
							p = r.error,
							d = u(t),
							l = o(),
							v = function() {
								return f(l)
							},
							_ = 0,
							m = c(t, function(t, r) {
								var u = !1;
								return t.start({
									complete: function() {
										u || (u = !0, ++_ === d && e.default.update(s))
									},
									error: p,
									update: function(t) {
										i(l, r, t), e.default.update(v, !1, !0)
									}
								})
							});
						return Object.keys(n(m)).reduce(function(t, e) {
							return t[e] = a(m, e), t
						}, {})
					})
				}
			};
		exports.default = u;
	}, {
		"framesync": "bSZI",
		"../action": "bkas"
	}],
	"Or16": [function(require, module, exports) {
		"use strict";
		var t = this && this.__importDefault || function(t) {
			return t && t.__esModule ? t : {
				default: t
			}
		};
		Object.defineProperty(exports, "__esModule", {
			value: !0
		});
		var e = t(require("./multi")),
			r = e.default({
				getOutput: function() {
					return {}
				},
				getCount: function(t) {
					return Object.keys(t).length
				},
				getFirst: function(t) {
					return t[Object.keys(t)[0]]
				},
				mapApi: function(t, e) {
					return function() {
						for (var r = [], n = 0; n < arguments.length; n++) r[n] = arguments[n];
						return Object.keys(t).reduce(function(n, u) {
							var i;
							return t[u][e] && (r[0] && void 0 !== r[0][u] ? n[u] = t[u][e](r[0][u]) : n[u] = (i = t[u])[e].apply(i, r)), n
						}, {})
					}
				},
				setProp: function(t, e, r) {
					return t[e] = r
				},
				startActions: function(t, e) {
					return Object.keys(t).reduce(function(r, n) {
						return r[n] = e(t[n], n), r
					}, {})
				}
			});
		exports.default = r;
	}, {
		"./multi": "tiEx"
	}],
	"O9o7": [function(require, module, exports) {
		"use strict";
		var t = this && this.__importDefault || function(t) {
			return t && t.__esModule ? t : {
				default: t
			}
		};
		Object.defineProperty(exports, "__esModule", {
			value: !0
		});
		var r = t(require("./multi")),
			n = r.default({
				getOutput: function() {
					return []
				},
				getCount: function(t) {
					return t.length
				},
				getFirst: function(t) {
					return t[0]
				},
				mapApi: function(t, r) {
					return function() {
						for (var n = [], e = 0; e < arguments.length; e++) n[e] = arguments[e];
						return t.map(function(t, e) {
							if (t[r]) return Array.isArray(n[0]) ? t[r](n[0][e]) : t[r].apply(t, n)
						})
					}
				},
				setProp: function(t, r, n) {
					return t[r] = n
				},
				startActions: function(t, r) {
					return t.map(function(t, n) {
						return r(t, n)
					})
				}
			});
		exports.default = function() {
			for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
			return n(t)
		};
	}, {
		"./multi": "tiEx"
	}],
	"opif": [function(require, module, exports) {
		"use strict";
		var r = this && this.__assign || function() {
				return (r = Object.assign || function(r) {
					for (var e, t = 1, n = arguments.length; t < n; t++)
						for (var o in e = arguments[t]) Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
					return r
				}).apply(this, arguments)
			},
			e = this && this.__rest || function(r, e) {
				var t = {};
				for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && e.indexOf(n) < 0 && (t[n] = r[n]);
				if (null != r && "function" == typeof Object.getOwnPropertySymbols) {
					var o = 0;
					for (n = Object.getOwnPropertySymbols(r); o < n.length; o++) e.indexOf(n[o]) < 0 && Object.prototype.propertyIsEnumerable.call(r, n[o]) && (t[n[o]] = r[n[o]])
				}
				return t
			},
			t = this && this.__importDefault || function(r) {
				return r && r.__esModule ? r : {
					default: r
				}
			};
		Object.defineProperty(exports, "__esModule", {
			value: !0
		});
		var n = require("style-value-types"),
			o = t(require("../compositors/composite")),
			u = t(require("../compositors/parallel")),
			i = require("@popmotion/popcorn"),
			c = require("hey-listen"),
			f = function(r) {
				var e = Object.keys(r),
					t = function(e, t) {
						return void 0 !== e && !r[t](e)
					};
				return {
					getVectorKeys: function(r) {
						return e.reduce(function(e, n) {
							return t(r[n], n) && e.push(n), e
						}, [])
					},
					testVectorProps: function(r) {
						return r && e.some(function(e) {
							return t(r[e], e)
						})
					}
				}
			},
			a = [n.px, n.percent, n.degrees, n.vh, n.vw],
			s = function(r) {
				return a.find(function(e) {
					return e.test(r)
				})
			},
			p = function(r) {
				return Boolean(s(r))
			},
			l = function(r, e) {
				return r(e)
			},
			m = function(r) {
				return function(e, t) {
					return e[t] = e[t][r], e
				}
			},
			y = function(e, t, n) {
				var o = n[0],
					i = t[o].map(function(o, u) {
						var i = n.reduce(m(u), r({}, t));
						return x(o)(e, i)
					});
				return u.default.apply(void 0, i)
			},
			v = function(r) {
				return function(e, t) {
					return e[t] = e[t][r], e
				}
			},
			d = function(e, t, n) {
				var u = n[0],
					i = Object.keys(t[u]).reduce(function(o, i) {
						var c = n.reduce(v(i), r({}, t));
						return o[i] = x(t[u][i])(e, c), o
					}, {});
				return o.default(i)
			},
			h = function(t, n) {
				var o = n.from,
					u = n.to,
					i = e(n, ["from", "to"]),
					c = s(o) || s(u),
					f = c.transform,
					a = c.parse;
				return t(r(r({}, i), {
					from: "string" == typeof o ? a(o) : o,
					to: "string" == typeof u ? a(u) : u
				})).pipe(f)
			},
			O = function(t, o) {
				var u = o.from,
					c = o.to,
					f = e(o, ["from", "to"]);
				return t(r(r({}, f), {
					from: 0,
					to: 1
				})).pipe(i.mixColor(u, c), n.color.transform)
			},
			b = function(t, o) {
				var u = o.from,
					f = o.to,
					a = e(o, ["from", "to"]),
					s = n.complex.createTransformer(u);
				return c.invariant(s(u) === n.complex.createTransformer(f)(u), "Values '" + u + "' and '" + f + "' are of different format, or a value might have changed value type."), t(r(r({}, a), {
					from: 0,
					to: 1
				})).pipe(i.mixArray(n.complex.parse(u), n.complex.parse(f)), s)
			},
			g = function(r, e) {
				var t = f(e),
					n = t.testVectorProps,
					o = t.getVectorKeys;
				return function(e) {
					if (!n(e)) return r(e);
					var t = o(e),
						u = e[t[0]];
					return x(u)(r, e, t)
				}
			},
			x = function(r) {
				var e = l;
				return "number" == typeof r ? e = l : Array.isArray(r) ? e = y : p(r) ? e = h : n.color.test(r) ? e = O : n.complex.test(r) ? e = b : "object" == typeof r && (e = d), e
			};
		exports.default = g;
	}, {
		"style-value-types": "Hokg",
		"../compositors/composite": "Or16",
		"../compositors/parallel": "O9o7",
		"@popmotion/popcorn": "cue+",
		"hey-listen": "KFGT"
	}],
	"WRxs": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		});
		var e = require("@popmotion/popcorn");
		exports.angle = e.angle, exports.degreesToRadians = e.degreesToRadians, exports.distance = e.distance, exports.isPoint3D = e.isPoint3D, exports.isPoint = e.isPoint, exports.dilate = e.mix, exports.getValueFromProgress = e.mix, exports.pointFromAngleAndDistance = e.pointFromVector, exports.getProgressFromValue = e.progress, exports.radiansToDegrees = e.radiansToDegrees, exports.smooth = e.smoothFrame, exports.speedPerFrame = e.velocityPerFrame, exports.speedPerSecond = e.velocityPerSecond, exports.stepProgress = function(e, o) {
			var r = 1 / (e - 1),
				s = 1 / (2 * (e - 1)),
				t = Math.min(o, 1) / s;
			return Math.floor((t + 1) / 2) * r
		};
	}, {
		"@popmotion/popcorn": "cue+"
	}],
	"e6Gg": [function(require, module, exports) {
		var process = require("process");
		var e = require("process"),
			t = this && this.__importStar || function(e) {
				if (e && e.__esModule) return e;
				var t = {};
				if (null != e)
					for (var r in e) Object.hasOwnProperty.call(e, r) && (t[r] = e[r]);
				return t.default = e, t
			},
			r = this && this.__importDefault || function(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			};
		Object.defineProperty(exports, "__esModule", {
			value: !0
		});
		var a = t(require("framesync")),
			s = require("style-value-types"),
			i = r(require("../../action")),
			n = r(require("../../action/vector")),
			u = require("../../calc"),
			o = function(e) {
				return void 0 === e && (e = {}), i.default(function(t) {
					var r = t.update,
						s = t.complete,
						i = e.velocity,
						n = void 0 === i ? 0 : i,
						o = e.from,
						d = void 0 === o ? 0 : o,
						c = e.to,
						l = void 0 === c ? 0 : c,
						f = e.stiffness,
						v = void 0 === f ? 100 : f,
						p = e.damping,
						m = void 0 === p ? 10 : p,
						h = e.mass,
						M = void 0 === h ? 1 : h,
						b = e.restSpeed,
						_ = void 0 === b ? .01 : b,
						q = e.restDelta,
						y = void 0 === q ? .01 : q,
						S = n ? -n / 1e3 : 0,
						x = 0,
						O = l - d,
						P = d,
						g = P,
						j = a.default.update(function(e) {
							var t = e.delta;
							x += t;
							var i = m / (2 * Math.sqrt(v * M)),
								o = Math.sqrt(v / M) / 1e3;
							if (g = P, i < 1) {
								var d = Math.exp(-i * o * x),
									c = o * Math.sqrt(1 - i * i);
								P = l - d * ((S + i * o * O) / c * Math.sin(c * x) + O * Math.cos(c * x))
							} else {
								d = Math.exp(-o * x);
								P = l - d * (O + (S + o * O) * x)
							}
							n = u.speedPerSecond(P - g, t);
							var f = Math.abs(n) <= _,
								p = Math.abs(l - P) <= y;
							f && p ? (r(P = l), a.cancelSync.update(j), s()) : r(P)
						}, !0);
					return {
						stop: function() {
							return a.cancelSync.update(j)
						}
					}
				})
			},
			d = n.default(o, {
				from: s.number.test,
				to: s.number.test,
				stiffness: s.number.test,
				damping: s.number.test,
				mass: s.number.test,
				velocity: s.number.test
			});
		exports.default = d;
	}, {
		"framesync": "bSZI",
		"style-value-types": "Hokg",
		"../../action": "bkas",
		"../../action/vector": "opif",
		"../../calc": "WRxs",
		"process": "pBGv"
	}],
	"Zu7q": [function(require, module, exports) {
		"use strict";

		function t(t, s) {
			if (!(t instanceof s)) throw new TypeError("Cannot call a class as a function")
		}

		function s(t, s) {
			for (var r = 0; r < s.length; r++) {
				var e = s[r];
				e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), Object.defineProperty(t, e.key, e)
			}
		}

		function r(t, r, e) {
			return r && s(t.prototype, r), e && s(t, e), t
		}
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.Grab = void 0;
		var e = function() {
			function s(r) {
				r.indexSize, r.onIndexChange;
				var e = r.onGrabStart,
					o = r.onGrabMove,
					n = r.onGrabEnd;
				t(this, s), this.onGrabEnd = n, this.onGrabStart = e, this.onGrabMove = o, this.scroll = {
					start: 0,
					current: 0,
					initial: 0
				}, this.listen("mousedown", this.onMouseDown.bind(this)), this.listen("mousemove", this.onMouseMove.bind(this)), this.listen("mouseup", this.onMouseUp.bind(this)), this.listen("touchstart", this.onMouseDown.bind(this), !0), this.listen("touchmove", this.onMouseMove.bind(this), !0), this.listen(["touchend", "touchcancel"], this.onMouseUp.bind(this), !0)
			}
			return r(s, [{
				key: "listen",
				value: function(t, s, r) {
					var e = function(t) {
						"mouseout" === t.type && null != t.relatedTarget || s({
							y: t.clientY
						}, t)
					};
					if (r && (e = function(t) {
							s({
								y: t.targetTouches[0] ? t.targetTouches[0].clientY : null
							}, t)
						}), Array.isArray(t))
						for (var o = 0; o < t.length; o++) window.addEventListener(t[o], e, !1);
					else window.addEventListener(t, e, !1)
				}
			}, {
				key: "onMouseDown",
				value: function(t, s) {
					s.target && "a" === s.target.tagName.toLowerCase() || (this.scroll.inital = this.scroll.current, this.scroll.start = t.y, this.scroll.current = t.y, this.scroll.delta = this.scroll.current - this.scroll.start, this.onGrabStart({
						delta: this.scroll.delta,
						direction: Math.abs(this.scroll.delta),
						current: this.scroll.current,
						start: this.scroll.start
					}))
				}
			}, {
				key: "onMouseMove",
				value: function(t) {
					this.scroll.start && (this.scroll.current = t.y, this.scroll.delta = this.scroll.current - this.scroll.start, this.onGrabMove({
						delta: this.scroll.delta,
						direction: Math.abs(this.scroll.delta),
						current: this.scroll.current,
						start: this.scroll.start
					}))
				}
			}, {
				key: "onMouseUp",
				value: function() {
					this.scroll.start && (this.onGrabEnd({
						delta: this.scroll.delta,
						direction: Math.abs(this.scroll.delta),
						current: this.scroll.current,
						start: this.scroll.start
					}), this.scroll.start = null, this.scroll.current = null, this.scroll.delta = null)
				}
			}]), s
		}();
		exports.Grab = e;
	}, {}],
	"Lcb8": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.reach = void 0;
		var e = function(e) {
			var r = e.from,
				t = e.to,
				n = e.restDelta,
				c = void 0 === n ? .01 : n,
				u = Object.assign({}, r),
				a = Object.keys(r),
				i = {
					current: null
				},
				o = function(e, r) {
					if (0 === a.length) return cancelAnimationFrame(i.current), i.current = null, void r(u);
					a.slice();
					for (var n, l, s = a.length; s >= 0; s--) l = a[s], n = u[l] + .1 * (t[l] - u[l]), Math.abs(t[l] - n) < c ? (u[l] = t[l], a.splice(s, 1), s--) : u[l] = n;
					e(u), i.current = requestAnimationFrame(o)
				};
			return {
				start: function(e) {
					var r = e.update,
						t = e.complete;
					return o = o.bind(null, r, t), i.current = requestAnimationFrame(o), {
						stop: function() {
							cancelAnimationFrame(i.current), i.current = null
						}
					}
				}
			}
		};
		exports.reach = e;
	}, {}],
	"UaVh": [function(require, module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.Showcase = r;
		var t = require("./GLManager"),
			e = s(require("popmotion/src/animations/spring/index.ts")),
			i = s(require("popmotion/src/compositors/parallel.ts")),
			n = require("./Grab"),
			o = require("./reach");

		function s(t) {
			return t && t.__esModule ? t : {
				default: t
			}
		}

		function r(e) {
			var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
			this.GL = new t.GLManager(e, {
				waveFrequency: i && i.wave && i.wave.frequency,
				waveSpeed: i && i.wave && i.wave.speed,
				waveAmplitude: i && i.wave && i.wave.amplitude
			}), this.GL.createPlane(), this.data = e, this.progress = 0, this.direction = 1, this.waveIntensity = 0, this.options = i, this.index = {
				target: 0,
				current: 0,
				initial: 0,
				scrollSize: window.innerHeight / 6,
				active: 0
			}, this.follower = {
				x: 0,
				y: 0
			}, this.followerSpring = null, this.slidesSpring = null, this.grab = new n.Grab({
				onGrabStart: this.onGrabStart.bind(this),
				onGrabMove: this.onGrabMove.bind(this),
				onGrabEnd: this.onGrabEnd.bind(this)
			})
		}

		function a(t, e, i) {
			return Math.max(e, Math.min(t, i))
		}
		r.prototype.mount = function(t) {
			this.GL.mount(t)
		}, r.prototype.render = function() {
			this.GL.render()
		}, r.prototype.onMouseMove = function(t) {
			var e = this;
			this.followerSpring && (this.followerSpring.stop(), this.followerSpring = null), this.followerSpring = (0, o.reach)({
				from: {
					x: this.follower.x,
					y: this.follower.y
				},
				to: {
					x: t.clientX,
					y: t.clientY
				},
				velocity: {
					x: this.follower.vx,
					y: this.follower.vy
				},
				stiffness: 500,
				damping: 50,
				mass: 1
			}).start({
				update: function(t) {
					var i = {
						x: t.x - e.follower.x,
						y: t.y - e.follower.y
					};
					e.GL.updateRgbEffect({
						position: t,
						velocity: i
					}), e.follower = {
						x: t.x,
						y: t.y,
						vx: i.x,
						vy: i.y
					}
				},
				complete: function() {
					e.GL.updateRgbEffect({
						position: e.follower,
						velocity: {
							x: 0,
							y: 0
						}
					}), e.follower.vx = 0, e.follower.vy = 0
				}
			})
		}, r.prototype.onGrabMove = function(t) {
			var i = this;
			this.index.target = a(this.index.initial + t.delta / this.index.scrollSize, .51 - this.data.length, .49);
			var n = a(Math.round(-this.index.target), 0, this.data.length - 1);
			this.index.active !== n && (this.index.active = n, this.options.onActiveIndexChange && this.options.onActiveIndexChange(this.index.active), this.GL.updateTexture(n), this.textureProgressSpring && (this.textureProgressSpring.stop(), this.textureProgressSpring = null), this.textureProgressSpring = (0, e.default)({
				from: 0,
				to: 1,
				stiffness: 400,
				damping: 30
			}).start(function(t) {
				i.GL.updateTexture(null, t)
			})), this.slidesPop && this.slidesPop.stop(), this.slidesPop = (0, o.reach)({
				from: {
					index: this.index.current
				},
				to: {
					index: this.index.target
				},
				restDelta: .001
			}).start({
				update: function(t) {
					i.options.onIndexChange && i.options.onIndexChange(t.index), i.index.current = t.index
				},
				complete: function(t) {
					i.options.onIndexChange && i.options.onIndexChange(t.index), i.index.current = t.index
				}
			})
		}, r.prototype.onGrabStart = function() {
			var t = this;
			this.options.onZoomOutStart && this.options.onZoomOutStart({
				activeIndex: this.index.active
			}), this.index.initial = this.index.current, this.GLStickPop && this.GLStickPop.stop(), this.GL.scheduleLoop();
			var n = (0, e.default)({
					from: 0 === this.progress ? 0 : this.direction,
					to: 0,
					mass: 1,
					stiffness: 800,
					damping: 2e3
				}),
				o = (0, e.default)({
					from: this.progress,
					to: 1,
					mass: 5,
					stiffness: 350,
					damping: 500
				}),
				s = (0, e.default)({
					from: this.waveIntensity,
					to: .5,
					mass: 5,
					stiffness: 10,
					damping: 200
				});
			this.GLStickPop = (0, i.default)(o, n, s).start({
				update: function(e) {
					t.progress, e[0], t.progress = e[0], t.direction = e[1], t.waveIntensity = e[2], t.GL.updateStickEffect({
						progress: t.progress,
						direction: t.direction,
						waveIntensity: t.waveIntensity
					})
				},
				complete: function() {
					t.options.onZoomOutFinish && t.options.onZoomOutFinish({
						activeIndex: t.index.active
					})
				}
			})
		}, r.prototype.snapCurrentToActiveIndex = function() {
			var t = this;
			this.slidesPop && this.slidesPop.stop(), this.slidesPop = (0, o.reach)({
				from: {
					index: this.index.current
				},
				to: {
					index: Math.round(this.index.target)
				},
				restDelta: .001
			}).start({
				complete: function() {},
				update: function(e) {
					t.options.onIndexChange && t.options.onIndexChange(e.index), t.index.current = e.index
				}
			})
		}, r.prototype.onGrabEnd = function() {
			var t = this;
			this.options.onFullscreenStart && this.options.onFullscreenStart({
				activeIndex: this.index.active
			}), this.snapCurrentToActiveIndex(), this.GLStickPop && this.GLStickPop.stop();
			var n = (0, e.default)({
					from: 1 === this.progress ? 1 : this.direction,
					to: 1,
					mass: 1,
					stiffness: 800,
					damping: 2e3
				}),
				o = (0, e.default)({
					from: this.progress,
					to: 0,
					mass: 4,
					stiffness: 400,
					damping: 70,
					restDelta: 1e-4
				}),
				s = (0, e.default)({
					from: this.waveIntensity,
					to: 0,
					mass: .1,
					stiffness: 800,
					damping: 50
				});
			this.GLStickPop = (0, i.default)(o, n, s).start({
				update: function(e) {
					t.progress = e[0], t.direction = e[1], t.waveIntensity = e[2], t.GL.updateStickEffect({
						progress: t.progress,
						direction: t.direction,
						waveIntensity: t.waveIntensity
					})
				},
				complete: function() {
					t.options.onFullscreenFinish && t.options.onFullscreenFinish({
						activeIndex: t.index.active
					}), t.GL.cancelLoop()
				}
			})
		}, r.prototype.onResize = function() {
			this.GL.onResize()
		};
	}, {
		"./GLManager": "XX42",
		"popmotion/src/animations/spring/index.ts": "e6Gg",
		"popmotion/src/compositors/parallel.ts": "O9o7",
		"./Grab": "Zu7q",
		"./reach": "Lcb8"
	}],
	"/YDW": [function(require, module, exports) {
		"use strict";

		function e(e, s) {
			if (!(e instanceof s)) throw new TypeError("Cannot call a class as a function")
		}

		function s(e, s) {
			for (var t = 0; t < s.length; t++) {
				var i = s[t];
				i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
			}
		}

		function t(e, t, i) {
			return t && s(e.prototype, t), i && s(e, i), e
		}
		Object.defineProperty(exports, "__esModule", {
			value: !0
		}), exports.Slides = void 0;
		var i = function(e, s) {
				var t = document.createElement(e);
				return t.className = s, t
			},
			n = function() {
				function s(t) {
					var n = this;
					e(this, s), this.data = t, this.container = i("div", "slides"), this.currentIdx = 0, this.slides = this.data.map(function(e, s) {
						var t = i("div", "slide"),
							a = i("h1", "slide-title"),
							r = i("p", "slide-meta"),
							l = i("a", "slide-more");
						return l.href = e.link, t.classList.add(0 !== s ? "next" : "show-meta"), r.innerHTML = e.meta, a.innerHTML = e.title, l.innerHTML = "Read more", t.appendChild(r), t.appendChild(a), t.appendChild(l), n.container.appendChild(t), t
					})
				}
				return t(s, [{
					key: "mount",
					value: function(e) {
						e.appendChild(this.container)
					}
				}, {
					key: "onActiveIndexChange",
					value: function(e) {
						this.currentIdx = e;
						for (var s = 0; s < this.slides.length; s++) e === s ? (this.slides[s].classList.remove("next"), this.slides[s].classList.remove("prev")) : e > s ? (this.slides[s].classList.remove("next"), this.slides[s].classList.add("prev")) : (this.slides[s].classList.add("next"), this.slides[s].classList.remove("prev"))
					}
				}, {
					key: "onMove",
					value: function(e) {
						this.container.style.transform = "translateY(".concat(100 * e / this.slides.length, "%)")
					}
				}, {
					key: "appear",
					value: function() {
						this.container.classList.add("scrolling"), this.slides[this.currentIdx].classList.remove("show-meta")
					}
				}, {
					key: "disperse",
					value: function(e) {
						this.slides[this.currentIdx].classList.add("show-meta"), this.container.classList.remove("scrolling");
						for (var s = 0; s < this.data.length; s++) s > e ? (this.slides[s].classList.add("next"), this.slides[s].classList.remove("prev")) : s < e ? (this.slides[s].classList.remove("next"), this.slides[s].classList.add("prev")) : (this.slides[s].classList.remove("next"), this.slides[s].classList.remove("prev"))
					}
				}]), s
			}();
		exports.Slides = n;
	}, {}],
	"Focm": [function(require, module, exports) {
		var global = arguments[3];
		var define;
		var e, n = arguments[3],
			o = require("./Showcase"),
			t = require("./Slides"),
			i = function() {
				var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
					n = e.data,
					i = void 0 === n ? [] : n,
					a = e.containerId,
					c = void 0 === a ? "app" : a,
					d = e.waveOptions,
					s = document.getElementById(c),
					u = new t.Slides(i),
					r = new o.Showcase(i, {
						onActiveIndexChange: function(e) {
							u.onActiveIndexChange(e)
						},
						onIndexChange: function(e) {
							u.onMove(e)
						},
						onZoomOutStart: function(e) {
							e.activeIndex;
							u.appear()
						},
						onZoomOutFinish: function(e) {
							e.activeIndex
						},
						onFullscreenStart: function(e) {
							var n = e.activeIndex;
							u.disperse(n)
						},
						onFullscreenFinish: function(e) {
							e.activeIndex
						},
						wave: d
					});
				r.mount(s), u.mount(s), r.render(), window.addEventListener("resize", function() {
					r.onResize()
				}), window.addEventListener("mousemove", function(e) {
					r.onMouseMove(e)
				})
			};
		n.StickyShowcase = {
			StickShowcase: i
		}, module.exports = i, n.StickyShowcase = i, console.log(e);
	}, {
		"./Showcase": "UaVh",
		"./Slides": "/YDW"
	}]
}, {}, ["Focm"], "StickyShowcase")
//# sourceMappingURL=/index.js.map