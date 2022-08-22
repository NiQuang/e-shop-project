import React, {useState} from 'react'
import Helmet from '../../components/helmet/Helmet'
import WebSection from '../../components/web-section/WebSection'
import orderAPI from '../../api/orderAPI'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Badge, Button } from 'antd'
import millify from 'millify'
import { Link } from 'react-router-dom'


const WebAllOrder = () => {

    const auth = useSelector(state => state.auth.isAuth)
    const user = useSelector(state => state.auth.user)


    const [tableData, setTableData] = useState([])


    const orderStatusToText = (status) => {
        switch (status) {
            case (1):{
                return "Chờ xác nhận!"
                break
            }
            case (2):{
                return "Đang chuẩn bị hàng!"
                break
            }

            default:{
                return "Đang chuẩn bị hàng!"
            }
        }
    }

    useEffect(() => {
        if(auth){
            orderAPI.getAllMy(user.username).then((response)=> {
                console.log(response)
                const data = response.map((item, index) => ({
                    index: index,
                    ...item
                }))
                setTableData(data)
                console.log(data)
            }).catch(error => console.log(error))
        }
    }, [])

    return (
        <Helmet title="Đơn đặt hàng">
            <WebSection>
            <div className="adm--orders">
                        <div className="adm--orders__table">
                            <Table
                                dataSource={tableData}
                                size='small'
                                bordered
                            >
                                <Table.Column className="adm--orders__table--column__index" title="STT" dataIndex="index" key="index" />
                                <Table.Column className="adm--orders__table--column__index" title="Create Date" dataIndex="createdate" key="createdate" />
                                <Table.Column
                                    className="adm--orders__table--column__index"
                                    title="User Info"
                                    render={record => (
                                        <>
                                            <p>
                                                <b>Username:</b> {record.user.username}
                                            </p>
                                            <p>
                                                <b>Email:</b> {record.user.email}
                                            </p>
                                            <p>
                                                <b>Phonenumber:</b> {record.adress.phone}
                                            </p>
                                            <p>
                                                <b>Adress:</b> {record.adress.detail}
                                            </p>
                                        </>
                                    )}
                                />
                                <Table.Column
                                    className="adm--orders__table--column__index"
                                    title="Total"
                                    render={record => (
                                        <>
                                            {
                                                millify(record.orderDetails.reduce((total, curr) => {
                                                    return total + curr.price * curr.quantity
                                                }, 0))
                                            } Vnđ
                                        </>
                                    )}
                                />
                                <Table.Column
                                    className="adm--orders__table--column__index"
                                    title="Status"
                                    render={record => (
                                        <>
                                            <Badge.Ribbon
                                                text={orderStatusToText(record.orderStatus)}
                                            >
                                                {record.orderStatus}
                                            </Badge.Ribbon>
                                            <Button className='my-btn'>
                                                <Link to={`/my-order/${record.id}`}>Xem chi tiết</Link>
                                            </Button>
                                        </>
                                    )}
                                />
                                {/* <Table.Column className="adm--products__table--column__index" title="STT" dataIndex="index" key="index" />
                                <Table.Column className="adm--products__table--column__title" title="Name" dataIndex="title" key="title" />
                                <Table.Column className="adm--products__table--column__preview" title="Preview" dataIndex="preview" key="preview" />
                                <Table.Column title="Category" render={(record) => (
                                    <>
                                        {record.category.title}
                                    </>
                                )} />
                                <Table.Column title="Action" render={(record) => (
                                    <div className='adm--products__table--row__actions'>
                                        <Button
                                            className='my-btn my-btn--primary'
                                            icon={<EditOutlined />}
                                            onClick={() => { onOpenForm(record.id) }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            className='my-btn my-btn--danger'
                                            icon={<DeleteOutlined />}
                                            onClick={() => { onClickDeleteProduct(record.id) }}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                )} /> */}
                            </Table>
                        </div>
                    </div>
            </WebSection>
        </Helmet>
    )
}

export default WebAllOrder