import React, { useEffect } from 'react'

const Helmet = ({ children, title }) => {

    document.title = title ? title : "QH-EShop"


    return (
        <>
            {children}
        </>
    )
}

export default Helmet