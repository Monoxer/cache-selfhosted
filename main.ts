import * as core from '@actions/core';
import { promisify } from "node:util";
import { exec } from "node:child_process";
import { access, rm } from "node:fs/promises"

const execPromise = promisify(exec)

const CACHE_DIR = '/Users/admin/caches';

async function main () {
    const path = core.getInput('path', { required: true });
    const key = core.getInput('key', { required: true });

    try {
        await access(`${CACHE_DIR}/${key}.tar.xz`);
    } catch (err) {
        return;
    }

    await rm(path, { force: true, recursive: true })
    await execPromise(`tar -cJf ${CACHE_DIR}/${key}.tar.xz ${path}`);
}

main()

