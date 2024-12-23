import { api } from './eden'

const blogs = await api.blog.index.get()
console.log(blogs)
