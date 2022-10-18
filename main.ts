import { rm } from "node:fs/promises";

import * as core from "@actions/core";

import { CACHE_DIR } from "./constants";
import { exec } from "./execPromises";
import { fileExists } from "./fileExists";


async function main() {
  const path = core.getInput("path", { required: true });
  const key = core.getInput("key", { required: true });
  const cacheExists = await fileExists(`${CACHE_DIR}/${key}.tar.zst`);
  if (cacheExists) {
    core.info("Cache found: ${CACHE_DIR}/${key}.tar.zst")
    await rm(path, { force: true, recursive: true });
    await exec(`tar -xf ${CACHE_DIR}/${key}.tar.zst ${path}`);
  } else {
    core.info(`Cache not found: ${CACHE_DIR}/${key}.tar.zst`)
  }
}

main();
