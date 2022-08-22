import axiosClient from "./axiosClient";

const orderAPI = {
    checkout: (payload) => {
        const url = '/order/checkout'
        return axiosClient.post(url, payload)
    },
    getAll: () => {
        const url = '/order/get-all'
        return axiosClient.get(url)
    },
    getAllMy: (payload) => {
        const url = '/order/my?username='+payload
        return axiosClient.get(url)
    },
    getMyOrderDetail: (payload) => {
        const url = `order/my/detail?username=${payload.username}&orderid=${payload.id}`
        console.log(url)
        return axiosClient.get(url)
    }
}

export default orderAPI