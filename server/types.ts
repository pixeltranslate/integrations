type IntegrationType = 'IDE' | 'language' | 'framework' | 'pipeline'

interface IntegrationMaintainer {
    name: string
    avatar: string
    github: string
    twitter?: string
}

interface Integration {
    name: string
    description: string
    type: IntegrationType
    repo: string
    links: {
        github: string
        website?: string
        docs?: string
    }
    authors: IntegrationMaintainer[]
}
