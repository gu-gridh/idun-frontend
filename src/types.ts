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
    status: [
        {
            '@value': string
        }
    ],
    subject: [],
    subjectArea: [],
    owner: [
        {
            display_title: string,
            url: string
        }
    ],
    homepage: [
        {
            '@id': string
        }
    ],
    funding: [
        {
            '@id': string,
            display_title: string
        }
    ],
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
    status: [
        {
            '@value': string
        }
    ],
    'schema:status': [
        {
            '@value': string
        }
    ],
    
}   

export interface Tool {
    id: number
    name: string
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
    },
    subjectArea: [],
    descriptionText: string,
    legacy: [
        {
            '@value': string
        }
    ],
    type: [
        {
            '@value': string
        }
    ],
    family: [
        {
            '@value': string
        }
    ],
    color: [
        {
            '@value': string
        }
    ],
}