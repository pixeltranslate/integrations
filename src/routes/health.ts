import { eventHandler } from "h3";
import { loadIntegrationFromPath } from "../integrations/load";

export default eventHandler(async (event) => ({
    path: event.path,
    time: new Date(),
    online: true,
    integration: await loadIntegrationFromPath()
}))
