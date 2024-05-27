import { createApp, createRouter } from "h3";

import HealthRouteHandler from './routes/health'
import IconRouteHandler from './routes/icon'

export const app = createApp();

const router = createRouter();
app.use(router);

router.get("/", HealthRouteHandler);
router.get("/icon/:integration", IconRouteHandler)