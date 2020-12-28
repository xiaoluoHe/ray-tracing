import { isNumber } from "util";
import { random, randomInRange } from "../utils";

export class Vec3 {
  private _x: number = 0;
  private _y: number = 0;
  private _z: number = 0;

  get x(): number {
    return this._x;
  }
  get y(): number {
    return this._y;
  }
  get z(): number {
    return this._z;
  }

  constructor(x?: number, y?: number, z?: number);
  constructor(x: number, y: number, z: number) {
    this._x = x;
    this._y = y;
    this._z = z;
  }

  minus(v: Vec3): Vec3 {
    if (!v) return this;
    this._x -= v._x;
    this._y -= v._y;
    this._z -= v._z;
    return this;
  }

  add(v: Vec3): Vec3 {
    if (!v) return this;
    this._x += v._x;
    this._y += v._y;
    this._z += v._z;
    return this;
  }

  multiply(t: number | Vec3): Vec3 {
    if (isNumber(t)) {
      this._x *= t;
      this._y *= t;
      this._z *= t;
    } else {
      this._x *= t.x;
      this._y *= t.y;
      this._z *= t.z;
    }

    return this;
  }

  length(): number {
    return Math.sqrt(this.lengthSquared());
  }

  lengthSquared(): number {
    return this._x * this._x + this._y * this._y + this._z * this._z;
  }

  log() {
    console.log([this._x, this._y, this._z]);
  }

  static add(...vec: Vec3[]): Vec3 {
    if (vec && vec.length) {
      return vec.reduce((acc, cur) => {
        return new Vec3(acc.x + cur.x, acc.y + cur.y, acc.z + cur.z);
      });
    }
    return new Vec3();
  }

  static minus(...vec: Vec3[]): Vec3 {
    if (vec && vec.length) {
      return vec.reduce((acc, cur) => {
        return new Vec3(acc.x - cur.x, acc.y - cur.y, acc.z - cur.z);
      });
    }
    return new Vec3();
  }

  static multiply(u: Vec3, v: Vec3 | number): Vec3 {
    if (isNumber(v)) {
      return new Vec3(u.x * v, u.y * v, u.z * v);
    }
    return new Vec3(u.x * v.x, u.y * v.y, u.z * v.z);
  }

  static dot(u: Vec3, v: Vec3): number {
    return u.x * v.x + u.y * v.y + u.z * v.z;
  }

  static cross(u: Vec3, v: Vec3): Vec3 {
    return new Vec3(
      u.y * v.z - u.z * v.y,
      u.z * v.x - u.x * v.z,
      u.x * v.y - u.y * v.x
    );
  }

  static unit(u: Vec3): Vec3 {
    return Vec3.multiply(u, 1 / u.length());
  }

  static random(min: number, max: number): Vec3 {
    return new Vec3(
      randomInRange(min, max),
      randomInRange(min, max),
      randomInRange(min, max)
    );
  }

  static randomInUnitSphere(): Vec3 {
    const a = randomInRange(0, 2 * Math.PI);
    const z = randomInRange(-1, 1);
    const r = Math.sqrt(1 - z * z);
    return new Vec3(r * Math.cos(a), r * Math.sin(a), z);
  }

  /**
   * 对randomInUnitSphere的一个小优化。取上半球面。
   * @param normal 法向量
   */
  static randomInHemiSphere(normal: Vec3): Vec3 {
    const v = Vec3.randomInUnitSphere();
    if (Vec3.dot(normal, v) > 0) return v;
    else return v.multiply(-1);
  }

  /**
   * 单位圆
   */
  static randomInUnitDisk() {
    while (true) {
      const p = new Vec3(randomInRange(-1, 1), randomInRange(-1, 1), 0);
      if (p.lengthSquared() >= 1) continue;
      return p;
    }
  }
}
