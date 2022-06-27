import axiosClient from './axiosClient'

const cartAPI = {
    checkout: (payload) => {
        const url = '/order/checkout'
        return axiosClient.post(url, payload)
    } 
}

export default cartAPI