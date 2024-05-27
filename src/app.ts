import 'dotenv/config'

import { createApp, createRouter } from "h3";

import HealthRouteHandler from './routes/health'
import IntegrationsListRouteHandler from './routes/list'
import IntegrationByIdRouteHandler from './routes/integration'
import IconRouteHandler from './routes/icon'

export const app = createApp();

const router = createRouter();
app.use(router);

router.get("/", IntegrationsListRouteHandler)
router.get("/:integration", IntegrationByIdRouteHandler)
router.get("/:integration/icon", IconRouteHandler)
router.get("/health", HealthRouteHandler);
