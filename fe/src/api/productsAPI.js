import axiosClient from "./axiosClient";

const productAPI = {
    getAll : () => {
        const url = '/products'
        return axiosClient.get(url)
    },
    deleteProduct: (id) => {
        const url = '/products/' + id
        return axiosClient.delete(url)
    },
    createProduct: (payload) => {
        const url = '/products'
        return axiosClient.post(url, payload)
    },
    getProduct: (id) => {
        const url = '/products/'+ id
        return axiosClient.get(url)
    },
    updateProduct: (payload) => {
        const url = '/products/'+ payload.id
        return axiosClient.put(url, payload)
    }
}

export default productAPI