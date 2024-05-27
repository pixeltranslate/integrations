import { eventHandler } from "h3";
import { loadIntegrations } from "../integrations/load";

export default eventHandler(async () => await loadIntegrations())