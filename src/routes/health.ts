import { eventHandler } from "h3";
import convertIntegrationFromYML from "../integrations/convert";

export default eventHandler(async (event) => ({
    path: event.path,
    time: new Date(),
    online: true,
    integration: await convertIntegrationFromYML()
}))
