import { join, basename, extname } from 'node:path'
import { promises, existsSync } from 'node:fs'
import * as yml from 'js-yaml'
import { globby } from 'globby'
import { integrationsDir } from '../paths'
import { integrationYMLSchema } from '../schemas'

export async function loadIntegrationFromPath (id?: string) {
    const path = `${integrationsDir}/${id}.yml`
    if (!existsSync(path)) {
        return
    }
    const data = yml.load(await promises.readFile(path, 'utf8')) as Record<string, any>
    return integrationYMLSchema.parse({ id, ...data })
}

export async function loadIntegrations() {
    const globPattern = join(integrationsDir, '*.yml').replace(/\\/g, '/')
    const names = (await globby(globPattern)).map(p => basename(p, extname(p))).filter(_ => _)

    return Promise.all(names.map(n => loadIntegrationFromPath(n))).then(integrations => integrations.filter(i => !!i))
}
