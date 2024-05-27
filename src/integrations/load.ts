import { join, basename, extname } from 'node:path'
import { promises, existsSync } from 'node:fs'
import * as yml from 'js-yaml'
import { globby } from 'globby'
import { integrationsDir } from '../paths'
import { integrationYMLSchema } from '../schemas'

export async function loadIntegrationFromId (id?: string) {
    const path = `${integrationsDir}/${id}.yml`
    if (!existsSync(path)) {
        return
    }
    const data = yml.load(await promises.readFile(path, 'utf8')) as Record<string, any>
    return integrationYMLSchema.parse({ id, ...data })
}

export async function getAllIntegrationIds() {
    const globPattern = join(integrationsDir, '*.yml').replace(/\\/g, '/')
    return (await globby(globPattern)).map(p => basename(p, extname(p))).filter(_ => _)
}

export async function loadIntegrations() {
    const integrationIds = await getAllIntegrationIds()
    return Promise.all(integrationIds.map(n => loadIntegrationFromId(n))).then(integrations => integrations.filter(i => !!i))
}
