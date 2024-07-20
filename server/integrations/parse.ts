import { z } from 'zod'
import { load } from 'js-yaml'
import { integrationYMLSchema } from './schemas'

function transformYMLToJSON(yml: any) {
  const ymlAsString = z.string().parse(yml)
  return load(ymlAsString)
}

export function parseYMLToIntegration(id: string, yml: any) {
  const integrationData = transformYMLToJSON(yml) as Record<string, string>
  return integrationYMLSchema.parse({ id, ...integrationData })
}
