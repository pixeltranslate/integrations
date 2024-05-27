import { join, basename, extname } from 'node:path'
import { promises, existsSync } from 'node:fs'
import * as yml from 'js-yaml'
import { globby } from 'globby'
import { Integration } from '../types'
import { integrationsDir } from '../paths'

export async function loadIntegrationFromPath (id?: string) {
    const path = `${integrationsDir}/${id}.yml`
    if (!existsSync(path)) {
        return
    }
    return yml.load(await promises.readFile(path, 'utf8')) as Integration
}

export async function loadIntegrations() {
    const globPattern = join(integrationsDir, '*.yml').replace(/\\/g, '/')
    const names = (await globby(globPattern)).map(p => basename(p, extname(p))).filter(_ => _)

    return Promise.all(names.map(n => loadIntegrationFromPath(n))).then(integrations => integrations.filter(i => !!i))
}
