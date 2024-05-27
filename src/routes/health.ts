import { eventHandler } from "h3";

export default eventHandler((event) => ({
    path: event.path,
    time: new Date(),
    online: true,
}))
