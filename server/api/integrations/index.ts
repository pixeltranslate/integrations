import { parseYMLToIntegration } from '../../integrations/parse'

export default defineEventHandler(async () => {
  const integrationFiles = await useStorage('assets:integrations').getKeys()

  const integrations = await Promise.all(integrationFiles.map(async (fileKey) => {
    const _integration = await useStorage('assets:integrations').getItem(fileKey)
    const integrationId = fileKey.split('.')[0]
    return parseYMLToIntegration(integrationId, _integration)
  }))

  return integrations
})
