import { Button, Col, Row, Card, Tag, List, Select, Empty, Popconfirm } from 'antd'
import React, { useState } from 'react'
import Helmet from '../../components/helmet/Helmet'
import WebSection from '../../components/web-section/WebSection'
import {
    PlusOutlined,
    MinusOutlined,
    CloseSquareOutlined
} from '@ant-design/icons'

import { product } from '../../assets/data/productsData'
import numberWithCommas from '../../utils/numberComas'
import { useDispatch, useSelector } from 'react-redux'
import { updateCartItemQuantity, removeCartItem } from '../../redux/features/cartSlice'

const WebCart = () => {
    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch()

    const handleChangeItemQuantity = (id, quantity) => {
        console.log(id, quantity)
        dispatch(updateCartItemQuantity({ id: id, quantity: quantity }))
    }

    const handleRemoveCartItem = (id) => {
        dispatch(removeCartItem({ id: id }))
    }

    return (
        <Helmet
            title="Giỏ hàng"
        >
            <WebSection>
                <div className="cart" style={{ overflow: 'hidden' }}>
                    <Row className='cart--inner' gutter={[32, 0]}>
                        <Col span={16} className="cart__info">
                            <Card
                                title="Giỏ hàng"
                                className="cart__info--card"
                            >
                                {
                                    cart.length > 0 ? (
                                        <List
                                            dataSource={cart}
                                            renderItem={item => (
                                                <List.Item>
                                                    <div className="cart__info--item">
                                                        <div className="cart__info--item__img">
                                                            <img src={`http://localhost:8080/api/file/images/${item?.item?.productMedias[0].mediaLink}`} alt="" />
                                                        </div>
                                                        <div className="cart__info--item__title">
                                                            <Tag color="cyan">{item?.item?.title}</Tag>
                                                        </div>
                                                        <div className="cart__info--item__quantity">
                                                            {
                                                                item.quantity - 1 <= 0 ? (
                                                                    <Popconfirm
                                                                        title="Bạn có muốn xóa sản phẩm khỏi giỏ hàng ?"
                                                                        okText="Có"
                                                                        cancelText="Không"
                                                                        onConfirm={() => handleRemoveCartItem(item.item.id)}
                                                                    >
                                                                        <div className="cart__info--item__quantity--minus">
                                                                            <MinusOutlined />
                                                                        </div>
                                                                    </Popconfirm>
                                                                ) : (
                                                                    <div className="cart__info--item__quantity--minus" onClick={() => handleChangeItemQuantity(item.item.id, item.quantity - 1)}>
                                                                        <MinusOutlined />
                                                                    </div>
                                                                )
                                                            }
                                                            <div className="cart__info--item__quantity--info">
                                                                {item?.quantity}
                                                            </div>
                                                            <div className="cart__info--item__quantity--plus" onClick={() => handleChangeItemQuantity(item.item.id, item.quantity + 1)}>
                                                                <PlusOutlined />
                                                            </div>
                                                        </div>
                                                        <div className="cart__info--item__price">
                                                            <Tag color="orange">{numberWithCommas(item?.item.price * item.quantity)} VNĐ</Tag>
                                                        </div>
                                                        <Popconfirm
                                                            title="Bạn có muốn xóa sản phẩm khỏi giỏ hàng ?"
                                                            okText="Có"
                                                            cancelText="Không"
                                                            onConfirm={() => handleRemoveCartItem(item.item.id)}
                                                        >
                                                            <div className="cart__info--item__drop">
                                                                <CloseSquareOutlined />
                                                            </div>
                                                        </Popconfirm>
                                                    </div>
                                                    <div className='' />
                                                </List.Item>
                                            )}
                                        />
                                    ) : (
                                        <Empty>

                                        </Empty>
                                    )
                                }

                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                title="Thông tin thanh toán"
                                className="cart__payment"
                            >
                                <div className="cart__payment--item sub-total">
                                    <span className="cart__payment--item__title">
                                        Tổng tiền:
                                    </span>
                                    <span className="cart__payment--item__detail">
                                        {numberWithCommas(
                                            cart.reduce((total, item) => {
                                                return (
                                                    total + item.item.price * item.quantity
                                                )
                                            }, 0)
                                        )}
                                    </span>
                                </div>
                                <div className="cart__payment--item">
                                    <span className="cart__payment--item__title">
                                        Giảm giá:
                                    </span>
                                    <span className="cart__payment--item__detail">
                                        {
                                            numberWithCommas(15000)
                                        }
                                    </span>
                                </div>
                                <div className="cart__payment--item">
                                    <span className="cart__payment--item__title">
                                        Thanh toán:
                                    </span>
                                    <span className="cart__payment--item__detail">
                                        {
                                            numberWithCommas(
                                                cart.reduce((total, item) => {
                                                    return (
                                                        total + item.item.price * item.quantity
                                                    )
                                                }, 0) - 15000
                                            )
                                        }
                                    </span>
                                </div>
                                <div className="cart__payment--item">
                                    <span className="cart__payment--item__title">Phương thức thanh toán</span>
                                    <div className="cart__payment--item__detail">
                                        <Select style={{ width: '100%' }} defaultValue={"1"}>
                                            <Select.Option value={"1"}>
                                                Thanh toán khi nhận hàng
                                            </Select.Option>
                                            <Select.Option value={"2"}>
                                                Thanh toán bằng mí mo mo
                                            </Select.Option>
                                            <Select.Option value={"3"}>
                                                Thanh toán bằng tài khoản ngân hàng
                                            </Select.Option>
                                        </Select>
                                    </div>
                                </div>
                                <div className="cart__payment--action">
                                    <Button className='my-btn my-btn--primary'>
                                        Xác nhận
                                    </Button>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>


            </WebSection>
        </Helmet>
    )
}

export default WebCart