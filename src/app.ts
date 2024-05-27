import { createApp, createRouter } from "h3";

import HealthRouteHandler from './routes/health'

export const app = createApp();

const router = createRouter();
app.use(router);

router.get("/", HealthRouteHandler);