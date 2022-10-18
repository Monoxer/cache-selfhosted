import { mkdir, unlink } from "node:fs/promises";

import * as core from "@actions/core";

import { CACHE_DIR } from "./constants";
import { exec } from "./execPromises";
import { fileExists } from "./fileExists";

async function post() {
  const path = core.getInput("path", { required: true });
  const key = core.getInput("key", { required: true });
  const cacheExists = await fileExists(`${CACHE_DIR}/${key}.tar.zst`);
  if (cacheExists) {
    core.info(`Cache exists: ${CACHE_DIR}/${key}.tar.zst`);
  } else {
    await mkdir(CACHE_DIR, { recursive: true });
    await unlink(`${CACHE_DIR}/${key}.tar.zst`);
    await exec(`tar -caf ${CACHE_DIR}/${key}.tar.zst ${path}`);
    core.info("Cache created: ${CACHE_DIR}/${key}.tar.zst");
  }
}

post();
