import { Button, Col, Input, Row } from 'antd'
import React from 'react'
import logo from '../../assets/imgs/logo.jpg'
import {
    HomeOutlined,
    PhoneOutlined,
    EnvironmentOutlined,
    MailOutlined
} from '@ant-design/icons';

import footerPayment from '../../assets/data/footer-payment';

const Footer = () => {
    return (
        <div className="footer">
            <Row gutter={[64, 0]} className="footer__inner">
                <Col span={6} className="footer__inner--contact" >
                    <div className="footer__inner--contact__logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="footer__inner--contact__item">
                        <div className="footer__inner--contact__item--icon">
                            <HomeOutlined />
                        </div>
                        <div className="footer__inner--contact__item--content">
                            công ty tnhh 1 thành viên Man NLC
                        </div>
                    </div>
                    <div className="footer__inner--contact__item">
                        <div className="footer__inner--contact__item--icon">
                            <PhoneOutlined />
                        </div>
                        <div className="footer__inner--contact__item--content">
                            0123456789
                        </div>
                    </div>
                    <div className="footer__inner--contact__item">
                        <div className="footer__inner--contact__item--icon">
                            <MailOutlined />
                        </div>
                        <div className="footer__inner--contact__item--content">
                            quangniph12613@fpt.edu.vn
                        </div>
                    </div>
                </Col>
                <Col span={6} className="footer__inner--location">
                    <div className="footer__inner--location__title">
                        <h3>địa chỉ</h3>
                    </div>
                    <div className="footer__inner--location__item">
                        <div className="footer__inner--location__item--icon">
                            <EnvironmentOutlined />
                        </div>
                        <div className="footer__inner--location__item--content">
                            45 Núi Trúc, Ba Đình, HN
                        </div>
                    </div>
                    <div className="footer__inner--location__item">
                        <div className="footer__inner--location__item--icon">
                            <EnvironmentOutlined />
                        </div>
                        <div className="footer__inner--location__item--content">
                            19 Hồ Đắc Di, Đống Đa, HN
                        </div>
                    </div>
                    <div className="footer__inner--location__item">
                        <div className="footer__inner--location__item--icon">
                            <EnvironmentOutlined />
                        </div>
                        <div className="footer__inner--location__item--content">
                            The New Play Ground Vincom Bà Triệu
                        </div>
                    </div>
                    <div className="footer__inner--location__item">
                        <div className="footer__inner--location__item--icon">
                            <EnvironmentOutlined />
                        </div>
                        <div className="footer__inner--location__item--content">
                            204 Trần Duy Hưng, Cầu Giấy, HN
                        </div>
                    </div>
                </Col>
                <Col span={6} className="footer__inner--policy">
                    <div className="footer__inner--policy__item">
                        chính sách thành viên
                    </div>
                    <div className="footer__inner--policy__item">
                        chính sách đổi trả
                    </div>
                    <div className="footer__inner--policy__item">
                        chính sách vận chuyển
                    </div>
                </Col>
                <Col span={6} className="footer__inner--register">
                    <div className="footer__inner--register__title">
                        <h3>đăng ký nhận thông tin</h3>
                    </div>
                    <div className="footer__inner--register__detail">
                        <p>
                            nhận thông tin sản phẩm mới nhất, tin khuyến mại, và nhiều hơn thế nữa.
                        </p>
                    </div>
                    <div className="footer__inner--register__form">
                        <Input placeholder='Nhập email của bạn' />
                    </div>
                    <div className="footer__inner--register__button">
                        <Button>
                            đăng ký
                        </Button>
                    </div>
                    <div className="footer__inner--register__payment">
                        {
                            footerPayment.map((item,index) => (
                                <div className="footer__inner--register__payment--item" key={index}>
                                    <img src={item.img} alt="" />
                                </div>
                            ))
                        }
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Footer