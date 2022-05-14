import { Table, Button, Modal, Drawer, Space, Form, Input, Select, message } from 'antd'
import React, { useEffect, useState } from 'react'
import productAPI from '../../api/productsAPI'
import Helmet from '../../components/helmet/Helmet'
import {
    EditOutlined,
    DeleteOutlined,
    PlusCircleOutlined
} from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';
import categoriesAPI from '../../api/categoriesAPI';

const AdmProducts = () => {

    const [tableData, setTableData] = useState([])
    const [categories, setCategories] = useState([])
    const [isModal, setIsModal] = useState(false)
    const [modalLoading, setModalLoading] = useState(false)
    const [modalText, setModalText] = useState('')
    const [idEditting, setIdEditting] = useState(null)
    const [reload, setReload] = useState(true)
    const [modal, contextHolder] = Modal.useModal()
    const [isForm, setIsForm] = useState(false)
    const [form] = useForm()




    const reloadFetchData = () => {
        setReload(!reload)
    }

    const onClickDeleteProduct = (id) => {
        setIsModal(true)
        setIdEditting(id)
    }

    const handleDeleteProduct = async () => {
        setModalText('Deleting...')
        setModalLoading(true)
        if (idEditting) {
            const res = await productAPI.deleteProduct(idEditting)
            if (res.status === 200) {
                setModalText('')
                setModalLoading(false)
                setIsModal(false)
                setIdEditting(null)
                reloadFetchData()
                modal.success({
                    title: "Delete successfully !",

                })
            } else {
                modal.error({
                    title: "Something wrong... Try later !"
                })
            }
        }

    }

    const onOpenForm = (id) => {
        setIdEditting(id)
        setIsForm(true)
    }

    const onCloseForm = () => {
        setIsForm(false)
        setIdEditting(null)
        form.resetFields()
    }

    const onFinish = async (values) => {
        const newProduct = {
            title: values.title,
            preview: values.preview,
            images: values.images,
            category: {
                id: values.category
            }
        }
        if (idEditting) {
            const res = await productAPI.updateProduct({
                ...newProduct,
                id: idEditting
            })

            if (res.status === 200) {
                reloadFetchData()
                message.success("Update successfully")
            } else {
                console.log(res)
            }
        } else {
            const res = await productAPI.createProduct(newProduct)

            if (res.status === 200) {
                form.resetFields()
                reloadFetchData()
                message.success("Create successfully")
            } else {
                console.log(res)
            }

        }

    }

    useEffect(() => {
        productAPI.getAll().then((response) => {
            setTableData(response.data.map((item, index) => (
                {
                    ...item,
                    index: index + 1,
                    key: item.id
                }
            )))
        })
            .catch((error) => {
                console.log(error)
            })

        categoriesAPI.getAll().then((response) => {
            setCategories(response.data)
        })
            .catch((error) => {
                console.log(error)
            })
    }, [reload])

    useEffect(() => {
        if (idEditting) {
            productAPI.getProduct(idEditting).then((response) => {
                form.setFieldsValue({
                    title: response.data.title,
                    preview: response.data.preview,
                    images: response.data.images,
                    category: response.data.category.id
                })
            })
                .catch(error => console.log(error))
        } else {
            form.resetFields()
        }
    }, [idEditting])

    return (
        <Helmet title={"Admin - Products"}>
            <div className="adm__content--section">
                <div className="adm__content--section__title">
                    <h2>admin products manager</h2>
                </div>
                <div className="adm__content--section__detail">
                    <div className="adm--products">
                        <div className="adm--product__action">
                            <Button
                                className='my-btn my-btn--primary'
                                icon={<PlusCircleOutlined />}
                                onClick={() => onOpenForm(null)}
                            >
                                Create
                            </Button>
                        </div>

                        <div className="adm--products__table">
                            <Table
                                dataSource={tableData}
                                size='small'
                                bordered
                            >
                                <Table.Column className="adm--products__table--column__index" title="STT" dataIndex="index" key="index" />
                                <Table.Column className="adm--products__table--column__title" title="Name" dataIndex="title" key="title" />
                                <Table.Column className="adm--products__table--column__preview" title="Preview" dataIndex="preview" key="preview" />
                                <Table.Column className="adm--products__table--column__image" title="Image" render={(record) => (
                                    <div className="adm--products__table--row__image">
                                        <img src={record.images} alt={record.title} />
                                    </div>
                                )} />
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
                                )} />
                            </Table>
                        </div>

                    </div>
                </div>
            </div>
            <Modal
                visible={isModal}
                title={"Are you sure about that !"}
                onCancel={() => { setIsModal(false); setIdEditting(null) }}
                confirmLoading={modalLoading}
                onOk={handleDeleteProduct}
            >
                {modalText}
            </Modal>
            {contextHolder}
            <Drawer
                visible={isForm}
                title={idEditting ? `Edit product Id: ${idEditting}` : 'Create a new product'}
                width={720}
                onClose={onCloseForm}
                extra={
                    <Space>
                        <Button className='my-btn' onClick={onCloseForm}>
                            Close
                        </Button>
                    </Space>
                }
                placement='left'
            >
                <div className="adm--products__form">
                    <Form
                        form={form}
                        labelCol={24}
                        wrapperCol={24}
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Form.Item
                            label="Name"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input this field!"
                                },
                                {
                                    whitespace: true,
                                    message: "Please don't input blank!"
                                }
                            ]}
                            hasFeedback
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Preview"
                            name="preview"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Image"
                            name="images"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Category"
                            name="category"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input this field!"
                                }
                            ]}
                        >
                            <Select
                                allowClear
                            >
                                {
                                    categories.map((item, index) => (
                                        <Select.Option value={item.id} key={item.id}>
                                            {item.title}
                                        </Select.Option>
                                    ))
                                }

                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                className='my-btn my-btn--primary'
                                htmlType='submit'
                            >
                                {idEditting ? 'Update' : 'Create'}
                            </Button>
                            <Button className='my-btn'>
                                Reset
                            </Button>
                            <Button className='my-btn'>
                                Cancel
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Drawer>
        </Helmet>
    )
}

export default AdmProducts