import { z } from 'zod'
import { ORIGIN } from './paths'

const integrationTypeSchema = z.enum(['IDE', 'language', 'framework', 'pipeline', 'other'])
export const integrationYMLSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullish(),
    type: integrationTypeSchema.default('other'),
    repo: z.string().min(2),
    icon: z.string(),
    links: z.object({
        website: z.string().nullish(),
        docs: z.string().nullish()
    }).nullish(),
    authors: z.array(z.object({
        name: z.string(),
        github: z.string(),
        avatar: z.string().nullish(),
        twitter: z.string().nullish(),
        website: z.string().nullish()
    }))
}).transform(({ icon, links, authors, ...args}) => {
    const iconObj = { name: icon, ...(ORIGIN ? { url: `${ORIGIN}/${args.id}/icon` } : {}) }
    const linksObj = {  github: `https://github.com/${args.repo}`, ...links}
    const authorsArray = authors.map(({ name, github, avatar, ...args }) => ({
        name,
        github: `https://github.com/${github}`,
        avatar: avatar ?? `https://avatars.githubusercontent.com/${github}?v=4`,
        ...args,
    }))

    return { 
        ...args,
        icon: iconObj,
        links: linksObj,
        authors: authorsArray
    }
})
