import { Point3 } from "../vec/point3";
import { Vec3 } from "../vec";
import { Ray } from "../ray";
import { Material, IMaterial } from "../material";

interface IHitRecord {
  p: Point3;
  normal: Vec3;
  material: Material;
  t: number;
  fontFace: boolean;
  setFaceNormal: (r: Ray, outwardNormal: Vec3) => void;
}

export class HitRecord implements IHitRecord {
  p: Point3;
  normal: Vec3;
  // @ts-ignore
  material: Material;

  t: number = 0;
  fontFace: boolean = false;

  constructor() {
    this.p = new Point3();
    this.normal = new Vec3();
  }

  setFaceNormal(r: Ray, outwardNormal: Vec3) {
    this.fontFace = Vec3.dot(r.direction, outwardNormal) < 0;
    this.normal = this.fontFace
      ? outwardNormal
      : Vec3.multiply(outwardNormal, -1);
  }
}

export abstract class Hittable {
  abstract hit(r: Ray, t_min: number, t_max: number, rec: HitRecord): boolean;
}
