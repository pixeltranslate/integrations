import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { existsSync, promises } from 'node:fs'
import { globby } from 'globby'
import { load } from 'js-yaml'
import { integrationYMLSchema } from './server/integrations/schemas'

const PREFIX = 'INTEGRITY'
function logParseResult(id: string, errors: string[]) {
  if (errors.length === 0) {
    return console.info(`- ${id}: parsed successfully.`)
  }

  console.error(`- ${id}: ${errors.length} ${errors.length === 1 ? 'error was' : 'errors were'} found:`)
  errors.forEach((message) => {
    console.error(`  - ${message}`)
  })
}

async function checkIntegrity() {
  // Get all the integrations
  const rootDir = dirname(fileURLToPath(import.meta.url))
  const globPattern = join(rootDir, '/integrations/*.yml').replace(/\\/g, '/')
  const integrationFilePaths = await globby(globPattern)

  const errors: string[] = []

  await Promise.all(integrationFilePaths.map(async (filePath) => {
    if (!existsSync(filePath)) {
      const errorMessage = `File ${filePath} does not exist.`
      logParseResult(filePath, [errorMessage])
      errors.push(errorMessage)
      return
    }

    const fileData = await promises.readFile(filePath, 'utf8')
    const integrationId = filePath.split('/').at(-1) ?? filePath

    // Is the integration file formatted correctly?
    const integrationData = load(fileData) as Record<string, string>
    const parseResult = integrationYMLSchema.safeParse({ id: integrationId, ...integrationData })
    if (!parseResult.success) {
      const errorMessages = parseResult.error.issues.map((e) => {
        return `Error at ${e.path}: ${e.message}`
      })
      logParseResult(integrationId, errorMessages)
      errors.push(...errorMessages)
      return
    }

    // Does an Icon exist for the integration?
    if (!existsSync(join(rootDir, parseResult.data.icon.url))) {
      const errorMessage = `Icon at ${parseResult.data?.icon.url} does not exist.`
      logParseResult(integrationId, [errorMessage])
      errors.push(errorMessage)
      return
    }

    logParseResult(integrationId, [])
  }))

  console.info('\n--------------------------------------------------------')

  if (errors.length !== 0) {
    console.warn(`${PREFIX}: Check Failed with ${errors.length} ${errors.length === 1 ? 'error' : 'errors'}!`)
    console.info('--------------------------------------------------------\n')
    return process.exit(1)
  }
  console.info(`${PREFIX}: Check succeeded. All integrations are healthy.`)
  console.info('--------------------------------------------------------\n')
}

checkIntegrity()
