import { promises, existsSync } from 'node:fs'
import * as yml from 'js-yaml'

const INTEGRATION_FOLDER = './integrations'

export default async function convertIntegrationFromYML () {
    const path = `${INTEGRATION_FOLDER}/cli.yml`
    if (existsSync(path)) {
        return yml.load(await promises.readFile(path, 'utf8'))
    }
}
