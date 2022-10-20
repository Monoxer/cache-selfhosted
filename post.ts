import { mkdir, unlink } from "node:fs/promises";

import * as core from "@actions/core";

import { CACHE_DIR } from "./constants";
import { exec } from "./execPromises";
import { fileExists } from "./fileExists";

async function post() {
  const path = core.getInput("path", { required: true });
  const key = core.getInput("key", { required: true });
  const cacheFile = `${CACHE_DIR}/${key}.tar.zst`;
  const cacheExists = await fileExists(cacheFile);
  if (cacheExists) {
    core.info(`Cache exists: ${cacheFile}`);
  } else {
    await mkdir(CACHE_DIR, { recursive: true });
    await rm(cacheFile, { force: true });
    await exec(`tar -caf ${cacheFile} ${path}`);
    core.info(`Cache created: ${cacheFile}`);
  }
}

post();
