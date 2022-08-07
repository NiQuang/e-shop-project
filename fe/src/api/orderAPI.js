import axiosClient from "./axiosClient";

const orderAPI = {
    checkout: (payload) => {
        const url = '/order/checkout'
        return axiosClient.post(url, payload)
    },
    getAll: () => {
        const url = '/order/get-all'
        return axiosClient.get(url)
    }
}

export default orderAPI