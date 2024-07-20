import { loadIntegrationFromId } from '~/server/integrations/load'

export default eventHandler(async (event) => {
  const integrationId = getRouterParam(event, 'id')
  if (!integrationId) {
    throw createError({ statusCode: 404 })
  }
  try {
    return await loadIntegrationFromId(integrationId)
  }
  catch (err) {
    if (err instanceof Error) {
      throw createError({ statusCode: 404, message: err.name })
    }
    throw createError({ statusCode: 404 })
  }
})
