import React from 'react'
import Helmet from '../../components/helmet/Helmet'

import { dashboardData } from '../../assets/data/adm-dashboard'
import { Image } from 'antd'

const DashBoardWidget = ({ icon, title, detail }) => {
    return (
        <div className="dashboard--widget">
            <div className="dashboard--widget__icon">
                {icon}
            </div>
            <div className="dashboard--widget__content">
                <div className="dashboard--widget__content--title">
                    {title}
                </div>
                <div className="dashboard--widget__content--detail">
                    {detail}
                </div>
            </div>
        </div>
    )
}

const AdmDashboard = () => {
    return (
        <Helmet title="Admin - Dashboard">
            <div className="adm__content--section">
                <div className="adm__content--section__title">
                    <h2>admin dashboard</h2>
                </div>
                <div className="adm__content--section__detail">
                    <div className="adm--dashboard">
                        <div className="adm--dashboard__section">
                            <div className="adm--dashboard__section--title">
                                <h3>social widget</h3>
                            </div>
                            <div className="adm--dashboard__section--content">
                                {dashboardData.map((item, index) => (
                                    <DashBoardWidget
                                        key={index}
                                        icon={item.icon}
                                        title={item.title}
                                        detail={item.detail}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    )
}

export default AdmDashboard