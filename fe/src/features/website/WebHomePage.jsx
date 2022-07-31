import { Button, Carousel, Col, Row } from 'antd'
import React from 'react'

import Helmet from '../../components/helmet/Helmet'

import productsData from '../../assets/data/productsData'
import bannerData from '../../assets/data/web-banner'
import ProductItem from '../../components/product/ProductItem'
import { useState } from 'react'
import { useEffect } from 'react'

import productsAPI from '../../api/productsAPI'

const HomeBannerSlider = (props) => {
    return (
        <Carousel
            afterChange={() => { }}
            className="banner"
            autoplay
        >
            {props.data.map((item, index) => (
                <div className="banner__item" key={index}>
                    <img src={item.img} alt="" />
                </div>
            ))}
        </Carousel>
    )
}

const HomePageSection = (props) => {

    const [newCreateProducts, setNewCreateProducts] = useState([])

    useEffect(() => {
        productsAPI.getNewCreateProduct().then(response => {
        })
        .catch( response =>
            console.log(response)
        )
    },[])

    return (
        <Row>
            <Col span={24} className="home--section">
                <div className="home--section__title">
                    <h2>
                        {props.title}
                    </h2>
                </div>
                <Row className="home--section__content" gutter={[128, 0]}>
                    {
                        false && props.data.map((item, index) => (
                            <ProductItem item={item} key={item.id}/>

                        ))
                    }
                </Row>
            </Col>
        </Row>
    )
}

const WebHomePage = () => {
    return (
        <Helmet
            title={"Trang chủ"}
        >
            <Row>
                <Col span={24}>
                    <HomeBannerSlider
                        data={bannerData}
                    />
                </Col>
                <Col span={24}>
                    <HomePageSection
                        title="Sản phẩm mới nhất"
                        data={productsData}
                    />
                </Col>
                <Col span={24}>
                    <HomePageSection
                        title="Sản phẩm bán chạy"
                        data={productsData}
                    />
                </Col>
            </Row>
        </Helmet>
    )
}

export default WebHomePage