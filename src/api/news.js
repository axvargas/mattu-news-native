import { API_HOST } from '../utils/constants'

export const getNewsAPI = async() => {
    const url = `${API_HOST}/news?_sort=created_at:DESC&_limit=100`
    const response = await fetch(url)
    const data =  await response.json()
    return data
}