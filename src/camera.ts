import { Point3 } from "./vec/point3";
import { Vec3 } from "./vec";
import { Ray } from "./ray";
import { DegreeToRadians } from "./utils";

export class Camera {
  origin: Point3;
  lowerLeftCorner: Point3;
  horizontal: Vec3;
  vertical: Vec3;
  u: Vec3;
  v: Vec3;
  w: Vec3;
  lensRadius: number;

  constructor(
    lookFrom: Point3,
    lookAt: Point3,
    vup: Vec3,
    vfov: number, // 垂直fov in degrees
    aspectRatio: number,
    aperture: number, // 光圈
    focusDist: number
  ) {
    const theta = DegreeToRadians(vfov);
    const h = Math.tan(theta / 2);
    const viewport_height = h * 2;
    const viewport_width = viewport_height * aspectRatio;

    this.w = Vec3.unit(Vec3.minus(lookFrom, lookAt));
    this.u = Vec3.unit(Vec3.cross(vup, this.w));
    this.v = Vec3.cross(this.w, this.u);

    this.origin = lookFrom;
    this.horizontal = Vec3.multiply(this.u, viewport_width).multiply(focusDist);
    this.vertical = Vec3.multiply(this.v, viewport_height).multiply(focusDist);
    // 一连串平移操作，找到图像左下角在camera坐标系的坐标
    this.lowerLeftCorner = Vec3.minus(
      this.origin,
      Vec3.multiply(this.horizontal, 0.5),
      Vec3.multiply(this.vertical, 0.5),
      Vec3.multiply(this.w, focusDist)
    );
    this.lensRadius = aperture / 2;
  }

  getRay(s: number, t: number): Ray {
    const rd = Vec3.randomInUnitDisk().multiply(this.lensRadius);
    const offset = Vec3.multiply(this.u, rd.x).add(Vec3.multiply(this.v, rd.y));
    const direction = Vec3.add(
      this.lowerLeftCorner,
      Vec3.multiply(this.horizontal, s),
      Vec3.multiply(this.vertical, t)
    )
      .minus(this.origin)
      .minus(offset);
    const origin = Vec3.add(this.origin, offset);
    return new Ray(origin, direction);
  }
}
