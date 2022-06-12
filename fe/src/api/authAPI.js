import axiosClient from './axiosClient'

const authAPI = {
    signin: (payload) => {
        const url = "/auth/signin"
        return axiosClient.post(url, payload)
    },
    signup: (payload) => {
        const url = '/auth/signup'
        return axiosClient.post(url, payload)
    }
}

export default authAPI