import { existsSync } from 'node:fs'
import { getAllIntegrationIds, loadIntegrationYML } from "./integrations/load"
import { iconsDir } from "./paths"
import { integrationYMLSchema } from './schemas'

const PREFIX = 'INTEGRITY'
const makeErrorMessage = (id: string, error: string) => `${id}: ${error}`

export async function verifyIntegrity(id: string) {
    const errors: string[] = []

    // Check 1: Does the integration config exist?
    const integrationObj = await loadIntegrationYML(id).catch(() => errors.push(makeErrorMessage(id, 'Integration config could not be found.')))
    if (!integrationObj) {
        return errors
    }

    // Check 2: Does the integration schema parse correctly?
    const integrationParse = integrationYMLSchema.safeParse(integrationObj)
    if (!integrationParse.success) {
        errors.push(...integrationParse.error.issues.map(e => makeErrorMessage(id, `Error at ${e.path}: ${e.message}`)))
        return errors
    }
    const { data: integration } = integrationParse

    // Check 3: Does the Icon File exist?
    if (!existsSync(`${iconsDir}/${integration.icon.name}`)) {
        errors.push(makeErrorMessage(integration.id, `Icon at ${integration.icon.name} does not exist.`))
    }

    return errors
}

async function verifyIntegrationsIntegrity() {
    const integrations = await getAllIntegrationIds()
    console.info(`${PREFIX}: Found ${integrations.length} integrations.`)
    
    const errors = (await Promise.all(integrations.map(async key => await verifyIntegrity(key)))).flat()
    if (errors.length > 0) {
        console.error(`${PREFIX}: Check Failed! Please resolve the following errors`)
        errors.map(e => console.log(e))
        return process.exit(1)
    }
    console.info(`${PREFIX}: Check succeeded. All integrations configs are healthy`)
}

verifyIntegrationsIntegrity().catch(err => {
    console.error(err)
    process.exit(1)
})
