import { Button, Col, Row, Card, Tag, List, Select, Empty, Popconfirm, Modal, InputNumber, message } from 'antd'
import React, { useEffect, useState } from 'react'
import Helmet from '../../components/helmet/Helmet'
import WebSection from '../../components/web-section/WebSection'
import {
    PlusOutlined,
    MinusOutlined,
    CloseSquareOutlined,
    ClearOutlined
} from '@ant-design/icons'

import { product } from '../../assets/data/productsData'
import numberWithCommas from '../../utils/numberComas'
import { useDispatch, useSelector } from 'react-redux'
import { updateCartItemQuantity, removeCartItem, clearCart } from '../../redux/features/cartSlice'
import { useNavigate } from 'react-router-dom'
import cartAPI from '../../api/cartAPI'
import orderAPI from '../../api/orderAPI'

const WebCart = () => {
    const cart = useSelector((state) => state.cart.cart)


    const auth = useSelector((state) => state.auth.isAuth)
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
        // if (cart.length > 0) {
        //     const checkout = {
        //         adress: "testfw",
        //         phonenumber: "testfw0123",
        //         username: user?.username,
        //         orderDetails: cart.map((item, index) => {
        //             return {
        //                 price: item.item.price,
        //                 quantity: item.quantity,
        //                 product: {
        //                     id: item.item.id
        //                 }
        //             }
        //         }),
        //         status: 0
        //     }

        //     const res = await cartAPI.checkout(checkout)

        //     if (!res.status) {
        //         console.log(res)
        //     } else {
        //         console.log(res)
        //     }
        // } else {
        //     setIsEmptyModal(true)
        // }
        if(auth){
            console.log(cart)
            console.log(user)
            const checkoutObject = {
                adress:1,
                status:1,
                username: user.username,
                orderDetails: 
                    cart.map((item, index) => ({
                        price : item.item.price,
                        product : {
                            id: item.item.id
                        },
                        quantity: item.quantity
                    }))
            }
            const res = await orderAPI.checkout(checkoutObject)
            console.log(res)
            if(!res.status){
                message.success('Đặt hàng thành công!')
                dispatch(clearCart())
            }
        }
    }

    const handleClearCart = () => {
        dispatch(clearCart())
    }

    const handleUpdateCartItemQuantity = (id, value) => {
        if(value && value >= 0){
            dispatch(updateCartItemQuantity({ id: id, quantity: value }))
        }
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
                                                                {/* {item?.quantity} */}
                                                                <InputNumber 
                                                                    value={item?.quantity}
                                                                    onChange={value => handleUpdateCartItemQuantity(item.item.id,value)}
                                                                />
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
                            {cart.length > 0 && (
                                <div className='cart__info--clear'>
                                    <Popconfirm
                                        title="Bạn có muốn xóa hết giỏ hàng không ?!?"
                                        okText="Có"
                                        cancelText="Không"
                                        onConfirm={handleClearCart}
                                    >
                                        <Button
                                            className='my-btn'
                                            icon={<ClearOutlined />}
                                        >
                                            Xóa giỏ hàng
                                        </Button>
                                    </Popconfirm>
                                </div>
                            )}

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
                                        {cart.length !== 0 ? (
                                            numberWithCommas(
                                                cart.reduce((total, item) => {
                                                    return (
                                                        total + item?.item?.price * item.quantity
                                                    )
                                                }, 0)
                                            )
                                        ) : 0}
                                    </span>
                                </div>
                                <div className="cart__payment--item">
                                    <span className="cart__payment--item__title">
                                        Giảm giá:
                                    </span>
                                    <span className="cart__payment--item__detail">
                                        {
                                            cart.length > 0 ? numberWithCommas(15000) : 0
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
                                                        total + item?.item?.price * item.quantity
                                                    )
                                                }, 0) - (cart.length > 0 ? 15000 : 0)
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
                                    <Button className='my-btn my-btn--primary' onClick={handleCheckOut} disabled={cart.length == 0}>
                                        Xác nhận
                                    </Button>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <Modal
                    title="Chưa có sản phẩm trong giỏ hàng!"
                    visible={isEmptyModal}
                    onOk={() => {
                        setIsEmptyModal(false)
                        navigate("/products")
                    }}
                    onCancel={() => { setIsEmptyModal(false) }}
                >
                    Mua sắm ngay ?
                </Modal>
            </WebSection>
        </Helmet>
    )
}

export default WebCart