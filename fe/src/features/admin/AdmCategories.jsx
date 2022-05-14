import { Button, Drawer, Table, Modal, Form, Input, message } from 'antd'
import React, { useEffect, useState } from 'react'
import categoriesAPI from '../../api/categoriesAPI'
import Helmet from '../../components/helmet/Helmet'
import {
    EditOutlined,
    DeleteOutlined,
    PlusCircleOutlined,
    PlusOutlined,
    RetweetOutlined
} from '@ant-design/icons';
import { useForm } from "antd/lib/form/Form";

const AdmCategories = () => {

    const [tableData, setTableData] = useState([])
    const [isForm, setIsForm] = useState(false)
    const [isModal, setIsModal] = useState(false)
    const [modalLoading, setModalLoading] = useState(false)
    const [modalText, setModalText] = useState('')
    const [form] = useForm()
    const [reload, setReload] = useState(true)
    const [isCreating, setIsCreating] = useState(false)
    const [modal, contextHolder] = Modal.useModal()
    const [idEditting, setIdEditting] = useState(null)

    const onFinish = values => {
        if (!idEditting) {
            handleCreateCategory(values)
        } else {
            const updatedCategory = {
                ...values,
                id: idEditting
            }
            handleUpdateCategory(updatedCategory)
        }
    }

    const handleCreateCategory = async (payload) => {
        setIsCreating(true)
        const res = await categoriesAPI.createCategory(payload)
        if (res.status === 200) {
            setReload(!reload)
            setIsCreating(false)
            modal.success({
                title: "Create successfully !",

            })
            form.resetFields()
            setIsForm(false)
        } else {
            message.error(res)
        }
    }

    const handleUpdateCategory = async (payload) => {
        const res = await categoriesAPI.updateCategory(payload)
        if (res.status === 200) {
            setReload(!reload)
            modal.success({
                title: "Update successfully !",

            })
        } else {
            modal.error({
                title: "Something wrong... Try later !"
            })
        }
    }

    const handleDeleteCategory = async () => {
        setModalText('Deleting...')
        setModalLoading(true)
        const res = await categoriesAPI.deleteCategory(idEditting)
        if (res.status === 200) {
            setModalText('')
            setModalLoading(false)
            setIsModal(false)
            setIdEditting(null)
            setReload(!reload)
            modal.success({
                title: "Delete successfully !",

            })
        } else {
            modal.error({
                title: "Something wrong... Try later !"
            })
        }
    }

    useEffect(() => {
        categoriesAPI.getAll().then((response) => {
            setTableData(response.data.map((item, index) => (
                {
                    ...item,
                    index: index +1,
                    key: item.id
                }
            )))
        })
            .catch((error) => {
                console.log(error)
            })
    }, [reload])

    return (
        <Helmet title="Admin - Categories">
            <div className="adm__content--section">
                <div className="adm__content--section__title">
                    <h2>admin categories manager</h2>
                </div>
                <div className="adm__content--section__detail">
                    <div className="adm--categories">
                        <div className="adm--categories__form">
                            <Button
                                className='my-btn my-btn--primary'
                                icon={<PlusCircleOutlined />}
                                onClick={() => { setIsForm(true); setIdEditting(null); form.resetFields() }}
                            >
                                Create
                            </Button>
                        </div>
                        <div className="adm--categories__table">
                            <Table
                                dataSource={tableData}
                                size='small'
                            >
                                <Table.Column title="STT" dataIndex="index" key="index" />
                                <Table.Column title="ID" dataIndex="id" key="id" />
                                <Table.Column title="Name" dataIndex="title" key="title" />
                                <Table.Column title="Action" className='adm--categories__table--action-column' render={(record) => (
                                    <div className='adm--categories__table--action-column__inner'>
                                        <Button
                                            className='my-btn my-btn--primary'
                                            icon={<EditOutlined />}
                                            onClick={()=> {setIsForm(true); setIdEditting(record.id);  form.setFieldsValue({title: record.title})}}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            className='my-btn my-btn--danger'
                                            icon={<DeleteOutlined />}
                                            onClick={() => { setIsModal(true); setIdEditting(record.id); }}
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
            <Drawer
                title={idEditting ? `Edit category Id: ${idEditting}` : "Create new category"}
                visible={isForm}
                placement="left"
                onClose={() => { setIsForm(false); setIdEditting(null) }}
            >
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
                        <Input placeholder='Input category name here!' />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            className={`my-btn ${idEditting ? '' : 'my-btn--primary'} `}
                            icon={idEditting ? <RetweetOutlined />: <PlusOutlined />}
                            htmlType='submit'
                            disabled={isCreating}
                        >
                            {idEditting ? 'Update' : 'Create'}
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
            <Modal
                visible={isModal}
                title={"Are you sure about that !"}
                onCancel={() => { setIsModal(false) }}
                confirmLoading={modalLoading}
                onOk={handleDeleteCategory}
            >
                {modalText}
            </Modal>
            {contextHolder}
        </Helmet>
    )
}

export default AdmCategories