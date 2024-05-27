import { eventHandler } from "h3";
import { getAllIntegrationIds } from "../integrations/load";
import { verifyIntegrity } from "../check";
import { ORIGIN } from "../paths";

export default eventHandler(async () => {
    const integrations = await getAllIntegrationIds()
    const errors = (await Promise.all(integrations.map(i => verifyIntegrity(i)))).flat()

    return ({
        time: new Date(),
        app: {
            origin: ORIGIN
        },
        integrations: {
            total: integrations.length,
            success: errors.length === 0,
            errors
        }
    })
})
