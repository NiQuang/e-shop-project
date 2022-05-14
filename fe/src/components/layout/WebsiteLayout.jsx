import React from 'react'
import { Outlet } from 'react-router-dom'

const WebsiteLayout = () => {
    return (
        <>
        <div>WebsiteLayout</div>
        
        <Outlet />  
        </>
        
    )
}

export default WebsiteLayout