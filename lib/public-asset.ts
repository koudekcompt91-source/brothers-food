import fs from "node:fs";
import path from "node:path";

export const HERO_BURGER_PATH = "/images/menu/hero-burger.webp";
export const LOGO_TRANSPARENT_PATH = "/images/brand/logo-transparent.png";

export type PublicImage = {
  src: string;
  width: number;
  height: number;
};

function absolutePublicPath(publicPath: string) {
  return path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
}

function pngSize(buf: Buffer) {
  if (buf.length < 24 || buf.toString("ascii", 12, 16) !== "IHDR") return null;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function webpSize(buf: Buffer) {
  if (buf.length < 30 || buf.toString("ascii", 0, 4) !== "RIFF" || buf.toString("ascii", 8, 12) !== "WEBP") {
    return null;
  }
  const chunk = buf.toString("ascii", 12, 16);
  if (chunk === "VP8X" && buf.length >= 30) {
    return {
      width: 1 + buf.readUIntLE(24, 3),
      height: 1 + buf.readUIntLE(27, 3),
    };
  }
  if (chunk === "VP8 " && buf.length >= 30) {
    return {
      width: buf.readUInt16LE(26) & 0x3fff,
      height: buf.readUInt16LE(28) & 0x3fff,
    };
  }
  if (chunk === "VP8L" && buf.length >= 25) {
    const bits = buf.readUInt32LE(21);
    return {
      width: (bits & 0x3fff) + 1,
      height: ((bits >> 14) & 0x3fff) + 1,
    };
  }
  return null;
}

/** Reads a file from /public when it exists, including its real pixel size. */
export function readPublicImage(publicPath: string): PublicImage | null {
  const abs = absolutePublicPath(publicPath);
  if (!fs.existsSync(abs)) return null;
  const buf = fs.readFileSync(abs);
  const size = publicPath.endsWith(".webp") ? webpSize(buf) : pngSize(buf);
  if (!size || size.width < 1 || size.height < 1) return null;
  return { src: publicPath, width: size.width, height: size.height };
}
