import { Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Helmet from '../helmet/Helmet'
import WebSection from '../web-section/WebSection'

const ProtectAdmin = ({ children }) => {

    const user = useSelector(state => state.auth.user)
    const isAuth = useSelector(state => state.auth.isAuth)
    const navigate = useNavigate()

    const check = isAuth && user?.roles?.length > 0 && (user?.roles?.includes("ROLE_ADMIN") || user?.roles?.includes("ROLE_EMPLOYEE"))

    useEffect(() => {
        const check = isAuth && user?.roles?.length > 0 && (user?.roles?.includes("ROLE_ADMIN") || user?.roles?.includes("ROLE_EMPLOYEE"))
        if(!check){
            navigate("/")
        }
    }, [user, isAuth])

    return (
        check ? (
            children
        ) : (
            null
        )
    )
}

export default ProtectAdmin