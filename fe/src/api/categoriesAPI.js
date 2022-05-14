import axiosClient from "./axiosClient";

const categoriesAPI = {
    getAll: () => {
        const url = '/categories'
        return axiosClient.get(url)
    },
    createCategory: (payload) => {
        const url = '/categories'
        return axiosClient.post(url, payload)
    },
    deleteCategory: (id) => {
        const url = '/categories/'+id
        return axiosClient.delete(url)
    },
    updateCategory: (payload) => {
        const url = '/categories/'+payload.id
        return axiosClient.put(url, payload)
    }
}

export default categoriesAPI