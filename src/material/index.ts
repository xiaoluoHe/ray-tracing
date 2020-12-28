import { HitRecord } from "./../hittable/hittable";
import { Ray } from "../ray";
import { Color } from "../vec/color";
import { Vec3 } from "../vec";

export interface IScattered {
  attenuation?: Color;
  scattered?: Ray;
  reflected: boolean;
}

export interface IMaterial {
  scatter(rIn: Ray, rec: HitRecord): IScattered;
}

export abstract class Material implements IMaterial {
  scatter(rIn: Ray, rec: HitRecord): IScattered {
    return {
      reflected: false,
    };
  }
}

export function reflect(v: Vec3, n: Vec3): Vec3 {
  const dot = Vec3.dot(v, n);
  return Vec3.minus(v, Vec3.multiply(n, 2 * dot));
}

/**
 * Sec 10.2 斯涅尔定律求解折射光线
 * R' = R'⊥ + R'∥
 * @param uv
 * @param n 法线
 * @param etaiOverEtat  𝜂/𝜂' 两个介质的折射率
 */
export function refract(uv: Vec3, n: Vec3, etaiOverEtat: number) {
  const cosTheta = Math.min(Vec3.dot(Vec3.multiply(uv, -1), n), 1.0);
  const r_out_perp = Vec3.multiply(
    Vec3.add(uv, Vec3.multiply(n, cosTheta)),
    etaiOverEtat
  );
  const r_out_parallel = Vec3.multiply(
    n,
    -Math.sqrt(Math.abs(1 - r_out_perp.lengthSquared()))
  );
  return Vec3.add(r_out_perp, r_out_parallel);
}
