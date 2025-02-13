export interface Projects {
    id: number
    name: string
    description: []

}

export interface Project {
    id: number
    name: string
    owner: string
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
            value: string
        }
    ]
    contributingRole: []
    timeInterval: []
    subjectArea: []
    subject: []
}    