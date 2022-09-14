import * as core from '@actions/core';
import { promisify } from "util";
import { exec } from "child_process";
import { mkdir, unlink } from "node:fs/promises"

const execPromise = promisify(exec)

const CACHE_DIR = '/Users/admin/caches';

async function main () {
    const path = core.getInput('path', { required: true });
    const key = core.getInput('key', { required: true });
    await mkdir(CACHE_DIR, { recursive: true })
    await unlink(`${CACHE_DIR}/${key}.tar.xz`)
    await execPromise(`tar -cJf ${CACHE_DIR}/${key}.tar.xz ${path}`);
}

main()
