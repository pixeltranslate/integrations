import { verifyIntegrationsIntegrity } from '../server/integrations/check'

verifyIntegrationsIntegrity().catch((err) => {
  console.error(err)
  process.exit(1)
})
