import React from 'react'
import './admLayout.scss'
import { Outlet } from 'react-router-dom'
import AdmSidebar from '../../../components/admSidebar/AdmSidebar'
import AdmNavbar from '../../../components/admNavbar/AdmNavbar'

const AdmLayout = () => {
    return (
        <div className='adm-layout'>
            <AdmSidebar />
            <div className="container">
                <AdmNavbar />
                <Outlet />
            </div>

        </div>
    )
}

export default AdmLayout