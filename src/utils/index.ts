export const PI = 3.1415926535897932385;

export function DegreeToRadians(degree: number) {
  return (degree * PI) / 180.0;
}

export function randomInRange(min: number, max: number) {
  return min + Math.random() * max;
}

export function random() {
  return Math.random();
}

export function clamp(x: number, min: number, max: number) {
  if (x < min) return min;
  if (x > max) return max;
  return x;
}
