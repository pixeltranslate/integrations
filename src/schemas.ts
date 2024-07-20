import { z } from 'zod'
import { GITHUB_AVATAR_URL, GITHUB_BASE_URL, ORIGIN } from './paths'

const githubUsernameSchema = z.string().transform(name => name.startsWith(GITHUB_BASE_URL) ? name : `${GITHUB_BASE_URL}/${name}`)

const integrationTypeSchema = z.enum(['IDE', 'language', 'framework', 'pipeline', 'other'])
export const integrationYMLSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: integrationTypeSchema.default('other'),
  description: z.string().nullish(),
  repo: z.string().min(2),
  icon: z.string(),
  links: z.object({
    website: z.string().nullish(),
    docs: z.string().nullish()
  }).nullish(),
  authors: z.array(z.object({
    name: z.string(),
    github: githubUsernameSchema,
    avatar: z.string().nullish(),
    twitter: z.string().nullish(),
    website: z.string().nullish()
  }))
}).transform(({ icon, links, authors, ...args }) => {
  const url = ORIGIN ? `${ORIGIN}/${args.id}` : undefined

  const iconObj = { name: icon, ...(url ? { url: `${url}/icon` } : {}) }
  const linksObj = { github: `${GITHUB_BASE_URL}/${args.repo}`, ...links }
  const authorsArray = authors.map(({ avatar, ...args }) => ({
    ...args,
    avatar: avatar ?? `${GITHUB_AVATAR_URL}/${args.github.replace('https://github.com/', '')}?v=4`,
  }))

  return {
    ...args,
    icon: iconObj,
    links: linksObj,
    authors: authorsArray
  }
})
