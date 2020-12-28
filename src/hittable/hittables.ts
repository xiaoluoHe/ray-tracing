import { Hittable, HitRecord } from "./hittable";
import { Ray } from "../ray";

export class HittableList extends Hittable {
  objects: Hittable[] = [];

  constructor(object?: Hittable) {
    super();
    if (object) {
      this.add(object);
    }
  }

  clear() {
    this.objects = [];
  }
  add(object: Hittable) {
    this.objects.push(object);
  }

  hit(r: Ray, tMin: number, tMax: number, rec: HitRecord) {
    let hitAny = false;
    let closetSoFar = tMax;

    for (const object of this.objects) {
      if (object.hit(r, tMin, closetSoFar, rec)) {
        hitAny = true;
        closetSoFar = rec.t;
      }
    }

    return hitAny;
  }
}
