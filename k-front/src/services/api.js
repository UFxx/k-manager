import axios from 'axios'
import { useLoaderStore } from '~/src/stores/loaderStore'

const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
})

apiClient.interceptors.request.use(config =>
{
	useLoaderStore().showLoader()
	return config
})

apiClient.interceptors.response.use(
	response =>
	{
		useLoaderStore().hideLoader()
		return response
	},
	error =>
	{
		useLoaderStore().hideLoader()
		return Promise.reject(error)
	}
)

export default apiClient