type IntegrationType = 'IDE' | 'language' | 'framework' | 'pipeline' | 'other'

interface IntegrationMaintainer {
    name: string
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
