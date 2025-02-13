const apiUrl = 'https://dev.dh.gu.se/api/'


export const fetchItem = async (id: string) => {
  const response = await fetch(apiUrl + 'items/' + id, {
    method: "GET",
    credentials: "include"
  })
    return await response.json()
}

export const fetchByResourceClass = async (id: number, items: number) => {
    const response = await fetch(apiUrl + 'items?resource_class_id=' + id + '&per_page=' + items, {
        method: "GET",
        credentials: "include"
    })
        return await response.json()
    }