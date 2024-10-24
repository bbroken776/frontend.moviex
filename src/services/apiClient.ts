import axios from 'axios'
import { parseCookies } from 'nookies'

const { ['moviex.session']: session } = parseCookies()
const apiClient = axios.create({
  baseURL: process.env.API_URL,
})

apiClient.interceptors.request.use(config => {
  if (session) config.headers.Authorization = `Bearer ${session}`
  return config
})

export default apiClient