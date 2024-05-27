import { existsSync } from 'node:fs'
import { getAllIntegrationIds, loadIntegrationFromId } from "./integrations/load"
import { iconsDir } from "./paths"
import { integrationYMLSchema } from './schemas'

const PREFIX = 'INTEGRITY'
const makeErrorMessage = (id: string, error: string) => `${id}: ${error}`

async function verifyIntegrity(id: string) {
    const errors: string[] = []

    // Check 1: Does the integration config exist?
    const integrationObj = await loadIntegrationFromId(id).catch(() => errors.push(makeErrorMessage(id, 'Integration config could not be found.')))
    if (!integrationObj) {
        return errors
    }

    // Check 2: Does the integration schema parse correctly?
    const integrationParse = integrationYMLSchema.safeParse(integrationObj)
    if (!integrationParse.success) {
        errors.push(...integrationParse.error.issues.map(e => makeErrorMessage(id, `Error at ${e.path}: e.message`)))
        return errors
    }
    const { data: integration } = integrationParse

    // Check 3: Does the Icon File exist?
    if (!existsSync(`${iconsDir}/${integration.icon.name}`)) {
        errors.push(makeErrorMessage(integration.id, `Icon at ${integration.icon.name} does not exist.`))
    }

    return errors
}

async function main() {
    const integrations = await getAllIntegrationIds()
    console.info(`${PREFIX}: Found ${integrations} integrations. Verifying integrity of each.`)
}

main().catch(err => {
    console.error(err)
    process.exit(1)
})