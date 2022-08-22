import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import orderAPI from '../../api/orderAPI'
import Helmet from '../../components/helmet/Helmet'
import WebSection from '../../components/web-section/WebSection'
import { List, Avatar, Spin, Card } from 'antd'
import millify from 'millify'

const WebSingleOrderDetail = () => {
    const { id } = useParams()

    const [cartData, setCartData] = useState({})
    const [loading, setLoading] = useState(true)

    const auth = useSelector(state => state.auth.isAuth)
    const user = useSelector(state => state.auth.user)

    useEffect(() => {
        if (auth) {
            setLoading(true)
            orderAPI.getMyOrderDetail({ username: user.username, id })
                .then(res => {
                    console.log(res)
                    setCartData(res)
                    setLoading(false)
                })
                .catch(error => console.log(error))
        }
    }, [])
    return (
        <Helmet title="Đơn hàng của tôi">
            <WebSection>
                {
                    loading ? (
                        <>
                            <Spin />
                            Loading...
                        </>
                    ) : (
                        <>
                            <Card title={`Đơn hàng của tôi. Mã đơn hàng: ${cartData.id}`}>
                                <p><b>Địa chỉ nhận hàng: </b> {cartData.adress.detail}</p>
                                <p><b>Số điện thoại người nhận: </b> {cartData.adress.phone}</p>
                                <p>Chi tiết</p>
                                <List
                                    itemLayout='horizontal'
                                    dataSource={cartData.orderDetails}
                                    renderItem={(item) => {
                                        return (
                                            <List.Item>
                                                <p><b>Id: </b>{item.product.id}</p>
                                                <p><b>Name: </b>{item.product.title}</p>
                                                <p><b>price: </b>{item.price}</p>
                                                <p><b>quantity: </b>{item.quantity}</p>
                                                <p><b>total: </b>{millify(item.quantity * item.price)} VND</p>
                                                <Avatar src={`http://localhost:8080/api/file/images/${item.product.productMedias[0].mediaLink}`}/>
                                            </List.Item>
                                        )
                                    }}
                                >
                                    <p><b>Thanh toan: </b>{millify(cartData.orderDetails.reduce((total, item) => {
                                        return total + item.quantity*item.price
                                    }, 0))} VND</p>
                                </List>
                            </Card>
                        </>
                    )
                }
            </WebSection>
        </Helmet>
    )
}

export default WebSingleOrderDetail