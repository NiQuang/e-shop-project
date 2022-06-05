import axiosClient from "./axiosClient";

const productMediasAPI = {
    createMedia: (item) => {
        const url = '/product-medias'
        return axiosClient.post(url, item)
    },
    deleteMedia: (id) => {
        const url = '/product-medias/'+id
        return axiosClient.delete(url)
    }
}

export default productMediasAPI