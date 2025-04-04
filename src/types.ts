export interface Projects {
    id: number
    name: string
    description: []
    shortDescription: [{
        '@value': string
    }]
    links: [
        {
            '@id': string
        }
    ]
    image: {
        small: string,
        medium: string,
        large: string
    }
}

export interface Project {
    id: number
    identifier: [
        {
            '@value': string
        }
    ]
    name: string
    owner: [
        {
            display_title: string
        }
    ]
    description: []
    homepage: string
    contributor: [
        {
            display_title: string
        }
    ]
    fundingProvider: [
        {
            display_title: string
        }
    ]
    funding: [
        {
           '@value': string
        }
    ]
    timeInterval: [
        {
            '@value': string
        }
    ]
    subjectArea: []
    subject: [],
    
}   

export interface Tool {
    id: number
    name: string
    description: []
    shortDescription: [{
        '@value': string
    }]
    links: [
        {
            '@id': string
        }
    ]
    image: {
        small: string,
        medium: string,
        large: string
    }
}