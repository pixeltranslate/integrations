import { createError, defineEventHandler, getRouterParam, serveStatic } from "h3";
import { stat, readFile } from "node:fs/promises";
import { loadIntegrationFromPath } from '../integrations/load'
import { iconsDir } from "../paths";

async function getIntegrationIconPath(id: string) {
    const config = await loadIntegrationFromPath(id)
    if (!config) {
        throw createError({ statusCode: 404 })
    }
    return `${iconsDir}/${config.icon}`
}

async function readIntegrationIcon (id: string) {
    const path = await getIntegrationIconPath(id)
    return readFile(path)
}

async function getIntegrationIconStats (id: string) {
    const path = await getIntegrationIconPath(id)
    return stat(path)
}

export default defineEventHandler((event) => {
    const integrationId = getRouterParam(event, 'integration')
    if (!integrationId) {
        throw createError({ statusCode: 404 })
    }
    return serveStatic(event, {
        getContents: () => readIntegrationIcon(integrationId),
        getMeta: () => getIntegrationIconStats(integrationId)
    })
})