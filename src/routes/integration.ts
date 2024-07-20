import { createError, eventHandler, getRouterParam } from 'h3'
import { loadIntegrationFromId } from '../integrations/load'

export default eventHandler(async (event) => {
  const integrationId = getRouterParam(event, 'integration')
  if (!integrationId) {
    throw createError({ statusCode: 404 })
  }
  const integration = await loadIntegrationFromId(integrationId)
  if (!integration) {
    throw createError({ statusCode: 404 })
  }
  return integration
})
