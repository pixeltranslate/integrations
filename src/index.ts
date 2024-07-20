import { toWebHandler } from 'h3'
import { app } from './app.ts'

Bun.serve({
  port: 3000,
  fetch: toWebHandler(app),
})
