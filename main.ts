import { rm } from "node:fs/promises";

import * as core from "@actions/core";

import { CACHE_DIR } from "./constants";
import { exec } from "./execPromises";
import { fileExists } from "./fileExists";

async function main() {
  const path = core.getInput("path", { required: true });
  const key = core.getInput("key", { required: true });
  const cacheFile = `${CACHE_DIR}/${key}.tar.zst`;
  const cacheExists = await fileExists(cacheFile);
  if (cacheExists) {
    core.info(`Cache found: ${cacheFile}`);
    await rm(path, { force: true, recursive: true });
    await exec(`tar -xf ${cacheFile} ${path}`);
  } else {
    core.info(`Cache not found: ${cacheFile}`);
  }
}

main();
