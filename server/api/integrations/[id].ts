import { parseYMLToIntegration } from '~/server/integrations/parse'

export default eventHandler(async (event) => {
  const integrationId = getRouterParam(event, 'id')
  const _integration = await useStorage('assets:integrations').getItem(`${integrationId}.yml`)
  if (!_integration || !integrationId) {
    throw createError({ statusCode: 404 })
  }

  return parseYMLToIntegration(integrationId, _integration)
})
