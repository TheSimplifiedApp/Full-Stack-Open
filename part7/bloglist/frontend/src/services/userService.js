import axios from 'axios'
const baseUrl = '/api/users'

const getAll = () => {
  const request = axios.get(baseUrl).then((response) => response.data)
  return request.sort((a, b) => b.blogs.length - a.blogs.length)
}

export default { getAll }