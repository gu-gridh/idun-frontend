const apiUrl = 'https://idun.dh.gu.se/api/'

const header: RequestInit = {
    method: "GET",
    credentials: "include" as RequestCredentials
}

export const fetchItem = async (id: string) => {
  const response = await fetch(apiUrl + 'items/' + id, header

  )
    return await response.json()
}

export const fetchByResourceClass = async (id: number, items: number) => {
    const response = await fetch(apiUrl + 'items?resource_class_id=' + id + '&per_page=' + items, header

    )
        return await response.json()
}

export const fetchByResourceTemplate = async (id: number) => {
    const response = await fetch(apiUrl + 'items?resource_template_id=' + id, header)
    return  response
}

export const fetchAllPages = async () => {
    const response = await fetch(apiUrl + 'site_pages', header
      
    )
        return await response.json()
}