/**
 * "Streha nastaja" frame sequence.
 * While frameCount is 0 the section draws the roof in SVG. After the AI video exists, run
 * `scripts/extract-roof-frames.sh` and set frameCount to the number of frames it prints.
 */
export const roofBuild = {
  frameCount: 0,
  desktopDir: "/roof-build/desktop",
  mobileDir: "/roof-build/mobile",
  ext: "webp",
}

export const frameSrc = (dir: string, i: number) =>
  `${dir}/${String(i + 1).padStart(4, "0")}.${roofBuild.ext}`
