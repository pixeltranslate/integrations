import { z } from 'zod'

const integrationTypeSchema = z.enum(['IDE', 'language', 'framework', 'pipeline', 'other'])
export const integrationYMLSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullish(),
    type: integrationTypeSchema.default('other'),
    repo: z.string().min(2),
    icon: z.string(),
    links: z.object({
        github: z.string(),
        website: z.string().nullish(),
        docs: z.string().nullish()
    }),
    authors: z.array(z.object({
        name: z.string(),
        github: z.string(),
        twitter: z.string().nullish(),
        website: z.string().nullish()
    }))
})
