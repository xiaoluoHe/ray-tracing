import { Lambertian } from "./material/lambertian";
import { Metal } from "./material/metal";
import { Camera } from "./camera";
import { Point3 } from "./vec/point3";
import { Vec3 } from "./vec";
import { Color, genColor } from "./vec/color";
import { Ray } from "./ray";
import { Hittable, HitRecord } from "./hittable/hittable";
import { HittableList } from "./hittable/hittables";
import { Sphere } from "./hittable";
import { random } from "./utils";
import { Dielectric } from "./material/dielectric";
import { randomScene } from "./hittable/random";
var fs = require("fs");

// Image

const FILE_PATH = "test.ppm";
const IMG_WIDTH = 120;
export const ASPECT_RATIO = 3 / 2;
const IMG_HEIGHT = IMG_WIDTH / ASPECT_RATIO;
const SAMPLES_PER_PIXEL = 50;
const MAX_DEPTH = 50;

// World

// const R = Math.cos(Math.PI / 4);
// const world = new HittableList();
const world = randomScene();

// const material_left = new Lambertian(new Color(0, 0, 1));
// const material_right = new Lambertian(new Color(1, 0, 0));
// world.add(new Sphere(new Point3(-R, 0, -1), R, material_left));
// world.add(new Sphere(new Point3(R, 0, -1), R, material_right));

// const material_ground = new Lambertian(new Color(0.8, 0.8, 0.0));
// const material_center = new Lambertian(new Color(0.1, 0.2, 0.5));
// // const material_left = new Metal(new Color(0.8, 0.8, 0.8), 0.3);
// const material_left = new Dielectric(1.5);
// const material_right = new Metal(new Color(0.8, 0.6, 0.2), 0.0);

// world.add(new Sphere(new Point3(0.0, -100.5, -1.0), 100.0, material_ground));
// world.add(new Sphere(new Point3(0.0, 0.0, -1.0), 0.5, material_center));
// world.add(new Sphere(new Point3(-1.0, 0.0, -1.0), 0.5, material_left));
// // world.add(new Sphere(new Point3(-1.0, 0.0, -1.0), -0.45, material_left));
// world.add(new Sphere(new Point3(1.0, 0.0, -1.0), 0.5, material_right));

// Camera
const lookFrom = new Point3(13, 2, 3);
const lookAt = new Point3(0, 0, 0);
const vup = new Vec3(0, 1, 0);
const aperture = 0.1;
const distToFocus = 13.5;

const cam = new Camera(
  lookFrom,
  lookAt,
  vup,
  20,
  ASPECT_RATIO,
  aperture,
  distToFocus
);

// Render

let imgStr = `P3\n${IMG_WIDTH} ${IMG_HEIGHT}\n255\n`;

for (let j = IMG_HEIGHT - 1; j >= 0; j--) {
  console.log(`\rScanlines remaining: ${j} `);
  for (let i = 0; i < IMG_WIDTH; i++) {
    const pixel_color = new Color(0, 0, 0);
    if (i === 200 && j === 200) {
      debugger;
    }
    for (let s = 0; s < SAMPLES_PER_PIXEL; s++) {
      const u = (i + random()) / (IMG_WIDTH - 1);
      const v = (j + random()) / (IMG_HEIGHT - 1);
      const r = cam.getRay(u, v);
      pixel_color.add(rayColor(r, world, MAX_DEPTH));
    }

    const str = genColor(pixel_color, SAMPLES_PER_PIXEL);
    imgStr += str;
  }
}
console.log(`\nDone\n`);

if (imgStr) {
  fs.writeFile(FILE_PATH, imgStr, (err) => {
    console.log(err);
  });
}

function rayColor(r: Ray, world: Hittable, depth: number) {
  const rec = new HitRecord();

  // ray bounce limit, 防止递归调用太深，BOOM!
  if (depth <= 0) {
    return new Color(0, 0, 0);
  }
  if (world.hit(r, 0.001, Infinity, rec)) {
    const { scattered, attenuation, reflected } = rec.material.scatter(r, rec);
    if (reflected && scattered && attenuation) {
      return Vec3.multiply(attenuation, rayColor(scattered, world, depth - 1));
    }
    const target = Vec3.add(
      rec.p,
      rec.normal,
      // Vec3.randomInUnitSphere()
      Vec3.randomInHemiSphere(rec.normal)
    );
    // ?
    return Vec3.multiply(
      rayColor(new Ray(rec.p, Vec3.minus(target, rec.p)), world, depth - 1),
      0.5
    );
  }
  const unitDirection: Vec3 = Vec3.unit(r.direction);
  const t = 0.5 * (unitDirection.y + 1.0);
  const white = new Color(1, 1, 1);
  const color = new Color(0.5, 0.7, 1.0);
  // 其实就是一个alpha混合
  return white.multiply(1 - t).add(color.multiply(t));
}
