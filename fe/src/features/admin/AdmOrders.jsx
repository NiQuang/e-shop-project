import React, { useEffect } from 'react'
import orderAPI from '../../api/orderAPI'
import Helmet from '../../components/helmet/Helmet'
import { Table, Button, Badge } from 'antd'
import {
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { useState } from 'react'
import millify from 'millify';

const AdmOrders = () => {

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
        orderAPI.getAll().then(response => {
            const data = response.map((item, index) => ({
                index: index,
                ...item
            }))
            setTableData(data)
            console.log(data)
        })
    }, [])

    return (
        <Helmet
            title="Admin - Orders List"
        >
            <div className="adm__content--section">
                <div className="adm__content--section__title">
                    <h2>admin orders list manager</h2>
                </div>
                <div className="adm__content--section__detail">
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
                                                <b>Username:</b> {record.username}
                                            </p>
                                            <p>
                                                <b>Email:</b> {record.email}
                                            </p>
                                            <p>
                                                <b>Phonenumber:</b> {record.phone}
                                            </p>
                                            <p>
                                                <b>Adress:</b> {record.adress}
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
                </div>
            </div>
        </Helmet>
    )
}

export default AdmOrders