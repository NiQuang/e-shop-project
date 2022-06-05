import React, { useEffect } from 'react'

const Helmet = ({ children, title }) => {

    document.title = title ? title : "QH-EShop"

    useEffect(()=> {
        document.documentElement.scrollTop = 0
    },[])

    return (
        <>
            {children}
        </>
    )
}

export default Helmet