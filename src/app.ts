import { createApp, createRouter } from "h3";

import HealthRouteHandler from './routes/health'
import IntegrationByIdRouteHandle from './routes/integration'
import IconRouteHandler from './routes/icon'

export const app = createApp();

const router = createRouter();
app.use(router);

router.get("/", HealthRouteHandler);
router.get("/:integration", IntegrationByIdRouteHandle)
router.get("/:integration/icon", IconRouteHandler)
