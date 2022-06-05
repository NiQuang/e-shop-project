import { Col, Row } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../footer/Footer'
import Header from '../header/Header'

const WebsiteLayout = () => {
    return (
        <Row className='web'>
            <Col span={24} className="web--header">
                <Header />
            </Col>
            <Col span={24} className="web--content">
                <Outlet />
            </Col>
            <Col span={24} className="web--footer">
                <Footer />
            </Col>

        </Row>

    )
}

export default WebsiteLayout