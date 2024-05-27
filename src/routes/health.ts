import { eventHandler } from "h3";

export default eventHandler(async (event) => ({
    path: event.path,
    time: new Date(),
    online: true,
}))
