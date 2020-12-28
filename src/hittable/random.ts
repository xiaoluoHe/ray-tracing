import { Metal } from "./../material/metal";
import { Vec3 } from "./../vec/index";
import { Lambertian } from "./../material/lambertian";
import { HittableList } from "./hittables";
import { Color } from "../vec/color";
import { Sphere } from ".";
import { Point3 } from "../vec/point3";
import { random, randomInRange } from "../utils";
import { Material } from "../material";
import { Dielectric } from "../material/dielectric";
export function randomScene(): HittableList {
  const world = new HittableList();

  const groundMaterial = new Lambertian(new Color(0.5, 0.5, 0.5));
  world.add(new Sphere(new Point3(0, -2000, 0), 2000, groundMaterial));

  for (let a = 3; a < 5; a++) {
    for (let b = 3; b < 5; b++) {
      const choose_mat = random();
      const center = new Point3(a + 0.9 * random(), 0.2, b + 0.9 * random());

      if (Vec3.minus(center, new Point3(4, 0.2, 0)).length() > 0.9) {
        console.log(center);
        let sphereMaterial: Material;

        if (choose_mat < 0.8) {
          // diffuse
          const albedo = Vec3.random(0, 1).multiply(Vec3.random(0, 1));
          sphereMaterial = new Lambertian(albedo);
          world.add(new Sphere(center, 0.2, sphereMaterial));
        } else if (choose_mat < 0.95) {
          // metal
          const albedo = Vec3.random(0.5, 1);
          const fuzz = randomInRange(0, 0.5);
          sphereMaterial = new Metal(albedo, fuzz);
          world.add(new Sphere(center, 0.2, sphereMaterial));
        } else {
          // glass
          sphereMaterial = new Dielectric(1.5);
          world.add(new Sphere(center, 0.2, sphereMaterial));
        }
      }
    }
  }

  const material1 = new Dielectric(1.5);
  const material2 = new Lambertian(new Color(0.4, 0.2, 0.1));
  const material3 = new Metal(new Color(0.7, 0.6, 0.5), 0.0);

  //   world.add(new Sphere(new Point3(0, 1, 0), 1.0, material1));
  //   world.add(new Sphere(new Point3(-4, 1, 0), 1.0, material2));
  //   world.add(new Sphere(new Point3(6, 1, 0), 1.0, material2));

  return world;
}
