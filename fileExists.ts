import { PathLike } from "node:fs";
import { access } from "node:fs/promises";

export async function fileExists (path: PathLike) {
  try {
    await access(path);
    return true;
  } catch (_) {
    return false;
  }
}