import { IScattered, reflect, refract } from "./index";
import { Vec3 } from "./../vec/index";
import { HitRecord } from "./../hittable/hittable";
import { Ray } from "./../ray";
import { Material } from ".";
import { Color } from "../vec/color";

export class Dielectric extends Material {
  ir: number; // index of refraction

  constructor(indexOfRefraction: number) {
    super();
    this.ir = indexOfRefraction;
  }

  scatter(rIn: Ray, rec: HitRecord): IScattered {
    const attenuation = new Color(1.0, 1.0, 1.0);
    const refractionRatio = rec.fontFace ? 1 / this.ir : this.ir;

    const unitDirection = Vec3.unit(rIn.direction);

    const cos_theta = Math.min(
      Vec3.dot(Vec3.multiply(unitDirection, -1), rec.normal),
      1.0
    );
    const sin_theta = Math.sqrt(1 - cos_theta * cos_theta);

    const cannot_refract = refractionRatio * sin_theta > 1.0;
    let direction: Vec3;
    if (
      cannot_refract ||
      this.reflectance(cos_theta, refractionRatio) > Math.random()
    ) {
      direction = reflect(unitDirection, rec.normal);
    } else {
      direction = refract(unitDirection, rec.normal, refractionRatio);
    }

    const scattered = new Ray(rec.p, direction);
    const reflected = true;
    return { scattered, attenuation, reflected };
  }

  /**
   * Schlick's approximation for reflectance.
   * https://learnopengl-cn.github.io/07%20PBR/01%20Theory/
   * 反射率随着角度变化而变化的
   * @param cosine
   * @param refIdx
   */
  private reflectance(cosine: number, refIdx: number): number {
    let r0 = (1 - refIdx) / (1 + refIdx);
    r0 = r0 * r0;
    return r0 + (1 - r0) * Math.pow(1 - cosine, 5);
  }
}
