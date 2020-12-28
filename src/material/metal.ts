import { Vec3 } from "./../vec/index";
import { HitRecord } from "./../hittable/hittable";
import { Ray } from "./../ray";
import { Material, IScattered, reflect } from ".";
import { Color } from "../vec/color";

export class Metal extends Material {
  albedo: Color;
  fuzzy: number; // 软材质

  constructor(a: Color, fuzzy: number = 1) {
    super();
    this.albedo = a;
    this.fuzzy = fuzzy < 1 ? fuzzy : 1;
  }

  scatter(rIn: Ray, rec: HitRecord): IScattered {
    const reflected = reflect(Vec3.unit(rIn.direction), rec.normal);
    const scattered = new Ray(
      rec.p,
      Vec3.add(reflected, Vec3.multiply(Vec3.randomInUnitSphere(), this.fuzzy))
    );
    const attenuation = this.albedo;
    const absorbed = Vec3.dot(scattered.direction, rec.normal) > 0;
    return { scattered, attenuation, reflected: absorbed };
  }
}
