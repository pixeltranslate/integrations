import { createError, eventHandler, getRouterParam } from "h3";
import { loadIntegrationFromPath } from "../integrations/load";

export default eventHandler(async (event) => {
    const integrationId = getRouterParam(event, 'integration')
    const integration = await loadIntegrationFromPath(integrationId)
    if (!integration) {
        throw createError({ statusCode: 404 })
    }
    return integration
})
