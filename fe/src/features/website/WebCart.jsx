import { Button, Col, Row, Card, Tag, List, Select, Empty, Popconfirm, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
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
import { useNavigate } from 'react-router-dom'
import cartAPI from '../../api/cartAPI'

const WebCart = () => {
    const cart = useSelector((state) => state.cart)

    
    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()

    const [isEmptyModal, setIsEmptyModal] = useState(false)
    const [isEmpty, setIsEmpty] = useState(cart.length === 0)
    const [cartData, setCartData] = useState(cart)

    const navigate = useNavigate()  

    const handleChangeItemQuantity = (id, quantity) => {
        console.log(id, quantity)
        dispatch(updateCartItemQuantity({ id: id, quantity: quantity }))
    }

    const handleRemoveCartItem = (id) => {
        dispatch(removeCartItem({ id: id }))
    }

    const handleCheckOut = async () => {
        if (cart.length > 0) {
            const checkout = {
                adress: "testfw",
                phonenumber: "testfw0123",
                username: user?.username,
                orderDetails: cart.map((item, index) => {
                    return {
                        price: item.item.price,
                        quantity: item.quantity,
                        product: {
                            id: item.item.id
                        }
                    }
                }),
                status: 0
            }

            const res = await cartAPI.checkout(checkout)

            if (!res.status) {
                console.log(res)
            } else {
                console.log(res)
            }
        } else {
            setIsEmptyModal(true)
        }
    }


    return (
        <Helmet
            title="Gi??? h??ng"
        >
            <WebSection>
                <div className="cart" style={{ overflow: 'hidden' }}>
                    <Row className='cart--inner' gutter={[32, 0]}>
                        <Col span={16} className="cart__info">
                            <Card
                                title="Gi??? h??ng"
                                className="cart__info--card"
                            >
                                {
                                    cart.length !== 0 ? (
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
                                                                        title="B???n c?? mu???n x??a s???n ph???m kh???i gi??? h??ng ?"
                                                                        okText="C??"
                                                                        cancelText="Kh??ng"
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
                                                            <Tag color="orange">{numberWithCommas(item?.item.price * item.quantity)} VN??</Tag>
                                                        </div>
                                                        <Popconfirm
                                                            title="B???n c?? mu???n x??a s???n ph???m kh???i gi??? h??ng ?"
                                                            okText="C??"
                                                            cancelText="Kh??ng"
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
                                title="Th??ng tin thanh to??n"
                                className="cart__payment"
                            >
                                <div className="cart__payment--item sub-total">
                                    <span className="cart__payment--item__title">
                                        T???ng ti???n:
                                    </span>
                                    <span className="cart__payment--item__detail">
                                        {cart.length !== 0 ? (
                                            numberWithCommas(
                                                cart.reduce((total, item) => {
                                                    return (
                                                        total + item.item.price * item.quantity
                                                    )
                                                }, 0)
                                            )
                                        ) : 0}
                                    </span>
                                </div>
                                <div className="cart__payment--item">
                                    <span className="cart__payment--item__title">
                                        Gi???m gi??:
                                    </span>
                                    <span className="cart__payment--item__detail">
                                        {
                                            cart.length > 0 ? numberWithCommas(15000) : 0
                                        }
                                    </span>
                                </div>
                                <div className="cart__payment--item">
                                    <span className="cart__payment--item__title">
                                        Thanh to??n:
                                    </span>
                                    <span className="cart__payment--item__detail">
                                        {
                                            numberWithCommas(
                                                cart.reduce((total, item) => {
                                                    return (
                                                        total + item.item.price * item.quantity
                                                    )
                                                }, 0) - (cart.length > 0 ? 15000 : 0)
                                            )
                                        }
                                    </span>
                                </div>
                                <div className="cart__payment--item">
                                    <span className="cart__payment--item__title">Ph????ng th???c thanh to??n</span>
                                    <div className="cart__payment--item__detail">
                                        <Select style={{ width: '100%' }} defaultValue={"1"}>
                                            <Select.Option value={"1"}>
                                                Thanh to??n khi nh???n h??ng
                                            </Select.Option>
                                            <Select.Option value={"2"}>
                                                Thanh to??n b???ng m?? mo mo
                                            </Select.Option>
                                            <Select.Option value={"3"}>
                                                Thanh to??n b???ng t??i kho???n ng??n h??ng
                                            </Select.Option>
                                        </Select>
                                    </div>
                                </div>
                                <div className="cart__payment--action">
                                    <Button className='my-btn my-btn--primary' onClick={handleCheckOut}>
                                        X??c nh???n
                                    </Button>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <Modal
                    title="Ch??a c?? s???n ph???m trong gi??? h??ng!"
                    visible={isEmptyModal}
                    onOk={() => {
                        setIsEmptyModal(false)
                        navigate("/products")
                    }}
                    onCancel={() => { setIsEmptyModal(false) }}
                >
                    Mua s???m ngay ?
                </Modal>
            </WebSection>
        </Helmet>
    )
}

export default WebCart