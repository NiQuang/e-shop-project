import axiosClient from "./axiosClient";

const orderAPI = {
    checkout: (payload) => {
        const url = '/order/checkout'
        return axiosClient.post(url, payload)
    }
}

export default orderAPI