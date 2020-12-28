import { IScattered } from "./index";
import { Vec3 } from "./../vec/index";
import { HitRecord } from "./../hittable/hittable";
import { Ray } from "./../ray";
import { Material } from ".";
import { Color } from "../vec/color";

export class Lambertian extends Material {
  albedo: Color;

  constructor(a: Color) {
    super();
    this.albedo = a;
  }

  scatter(rIn: Ray, rec: HitRecord): IScattered {
    const scatterDirection = Vec3.add(rec.normal, Vec3.randomInUnitSphere());
    const scattered = new Ray(rec.p, scatterDirection);
    const attenuation = this.albedo;
    const reflected = true;
    return { scattered, attenuation, reflected };
  }
}
