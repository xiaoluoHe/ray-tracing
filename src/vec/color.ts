import { Vec3 } from "./index";
import { clamp } from "../utils";

export class Color extends Vec3 {}

/**
 * 颜色计算
 * @param pixelColor 一个像素点多次采样后累计得到的颜色值
 * @param samplesPerPixel 采样次数
 */
export function genColor(pixelColor: Color, samplesPerPixel: number) {
  let r = pixelColor.x;
  let g = pixelColor.y;
  let b = pixelColor.z;

  // 采样平均
  const scale = 1 / samplesPerPixel;
  r = Math.sqrt(scale * r);
  g = Math.sqrt(scale * g);
  b = Math.sqrt(scale * b);

  const ir = Math.floor(256 * clamp(r, 0.0, 0.999));
  const ig = Math.floor(256 * clamp(g, 0.0, 0.999));
  const ib = Math.floor(256 * clamp(b, 0.0, 0.999));
  return `${ir} ${ig} ${ib}\n`;
}
