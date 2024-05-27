// import { resolve, join, basename, extname } from 'node:path'
import { promises, existsSync } from 'node:fs'
import * as yml from 'js-yaml'
import { Integration } from '../types'

const INTEGRATION_FOLDER = './integrations'

export async function loadIntegrationFromPath () {
    const path = `${INTEGRATION_FOLDER}/cli.yml`
    if (existsSync(path)) {
        return yml.load(await promises.readFile(path, 'utf8')) as Integration
    }
}

/*
export async function readModules() {
    const globPattern = join(INTEGRATION_FOLDER, '*.yml').replace(/\\/g, '/')
    const names = (await globby(globPattern)).map(p => basename(p, extname(p))).filter(_ => _)

    return Promise.all(names.map(n => getModule(n))).then(modules => modules.filter(m => m.name))
}
*/