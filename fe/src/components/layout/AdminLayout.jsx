import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Row } from 'antd'

import sidebarData from '../../assets/data/adm-sidebar'

const AdminLayout = () => {
    const location = useLocation()

    return (
        <Row>
            <div className="adm">
                <div className="adm__sidebar">
                    {
                        sidebarData.map((item, index) => (
                            <Link className={`adm__sidebar--item ${item.router === location.pathname ? 'active' : ''}`} key={index} to={item.router}>
                                <div className="adm__sidebar--item__icon">
                                    {item.icon}
                                </div>
                                <div className="adm__sidebar--item__view">
                                    {item.view}
                                </div>
                            </Link>
                        ))
                    }

                </div>
                <div className="adm__content">
                    <Outlet />
                </div>
            </div>
        </Row>
    )
}

export default AdminLayout