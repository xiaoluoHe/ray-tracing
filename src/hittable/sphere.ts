import { Point3 } from "./../vec/point3";
import { Hittable, HitRecord } from "./hittable";
import { Ray } from "../ray";
import { Vec3 } from "../vec";
import { Material } from "../material";

export default class Sphere extends Hittable {
  center: Point3;
  radius: number;
  material: Material;

  constructor(cen: Point3, r: number, material: Material) {
    super();
    this.center = cen;
    this.radius = r;
    this.material = material;
  }

  hit(r: Ray, t_min: number, t_max: number, rec: HitRecord): boolean {
    const oc: Vec3 = Vec3.minus(r.origin, this.center);
    const a = r.direction.lengthSquared();
    const halfB = Vec3.dot(oc, r.direction);
    const c = oc.lengthSquared() - this.radius * this.radius;
    const discriminant = halfB * halfB - a * c;

    if (discriminant > 0) {
      const root = Math.sqrt(discriminant);

      let temp = (-halfB - root) / a;
      if (temp < t_max && temp > t_min) {
        rec.t = temp;
        rec.p = r.at(rec.t);
        const outwardNormal = Vec3.multiply(
          Vec3.minus(rec.p, this.center),
          1 / this.radius
        );
        rec.setFaceNormal(r, outwardNormal);
        rec.material = this.material;
        return true;
      }

      temp = (-halfB + root) / a;
      if (temp < t_max && temp > t_min) {
        rec.t = temp;
        rec.p = r.at(rec.t);
        const outwardNormal = Vec3.multiply(
          Vec3.minus(rec.p, this.center),
          1 / this.radius
        );
        rec.setFaceNormal(r, outwardNormal);
        rec.material = this.material;
        return true;
      }
    }

    return false;
  }
}
