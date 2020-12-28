import { Vec3 } from "./vec";
import { Point3 } from "./vec/point3";
export class Ray {
  private _orig: Point3;
  private _dir: Vec3;

  get origin(): Point3 {
    return this._orig;
  }

  get direction(): Vec3 {
    return this._dir;
  }

  constructor(origin: Point3, direction: Vec3) {
    this._orig = origin;
    this._dir = direction;
  }

  at(t: number): Point3 {
    return Vec3.add(this._orig, this._dir.multiply(t));
  }
}
