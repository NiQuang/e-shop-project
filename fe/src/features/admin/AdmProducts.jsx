import {
    Table,
    Button,
    Modal,
    Drawer,
    Space,
    Form,
    Input,
    Select,
    message,
    InputNumber,
    Upload,
    Popconfirm
}
    from 'antd'
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
import fileAPI from '../../api/fileAPI';
import productMediasAPI from '../../api/productMediasAPI';


const ExpandRow = ({ record, onReload }) => {

    const [uploadList, setUploadList] = useState([])

    const handleUploadImage = async (id) => {
        const formData = new FormData();
        uploadList.forEach(item => {
            formData.append('file', item)
        })

        const res = await fileAPI.upload('images', formData)
        if (res) {
            const mediaLinks = res
            for (const link of mediaLinks) {
                const res2 = await productMediasAPI.createMedia({
                    mediaLink: link,
                    product: { id: id }
                })
                console.log(res2)
            }
            setUploadList([])
        }

    }

    const handleDeleteIamge = async (item) => {
        const res = productMediasAPI.deleteMedia(item.id)
        onReload()
    }

    return (
        <div className='adm--products__table--row__expand'>
            <div className="adm--products__table--row__expand--img">
                {
                    record.productMedias.length > 0 && record.productMedias.map((item, index) => (
                        <div className="adm--products__table--row__expand--img__item" key={item.id}>
                            <Popconfirm
                                title={"Are you sure to delete this image ?"}
                                onConfirm={() => handleDeleteIamge(item)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <img src={`http://localhost:8080/api/file/images/${item.mediaLink}`} />
                            </Popconfirm>
                        </div>
                    ))
                }
            </div>
            <div className="adm--products__table--row__expand--upload">
                <Upload.Dragger
                    action={"http://localhost:3000/api/file/images"}
                    multiple
                    listType='picture'
                    showUploadList={{ showRemoveIcon: true }}
                    accept='.png,.jpg,.jpeg'
                    fileList={uploadList}
                    beforeUpload={(file, fileList) => {
                        setUploadList(prev => [...prev, file])
                        return false
                    }}
                    onRemove={(file) => {
                        setUploadList(uploadList.filter((item) => file.uid !== item.uid))
                    }}
                >
                    <p>Drag files here OR</p>
                    <br />
                    <Button>Choose file</Button>
                </Upload.Dragger>
                <Button
                    className='my-btn my-btn--primary'
                    onClick={() => { handleUploadImage(record.id) }}
                >
                    Up load
                </Button>
            </div>
        </div>
    )
}

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


    const [isModalUpload, setIsModalUpload] = useState(false)
    const [modalUploadLoading, setModalUploadLoading] = useState(false)
    const [modalUploadText, setModalUploadText] = useState('')


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
            price: values.price,
            category: {
                id: values.category
            }
        }
        if (idEditting) {
            const res = await productAPI.updateProduct({
                ...newProduct,
                id: idEditting
            })

            if (res) {
                reloadFetchData()
                message.success("Update successfully")
            } else {
                console.log(res)
            }
        } else {
            const res = await productAPI.createProduct(newProduct)

            if (res) {
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
            console.log(response)
            setTableData(response.map((item, index) => (
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
            setCategories(response)
        })
            .catch((error) => {
                console.log(error)
            })
    }, [reload])

    useEffect(() => {
        if (idEditting) {
            productAPI.getProduct(idEditting).then((response) => {
                form.setFieldsValue({
                    title: response.title,
                    preview: response.preview,
                    images: response.images,
                    category: response.category.id,
                    price: response.price
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
                                expandable={{
                                    expandedRowRender: record => (
                                        <ExpandRow record={record} onReload={() => {setReload(!reload)}}/>
                                    )
                                }}
                            >
                                <Table.Column className="adm--products__table--column__index" title="STT" dataIndex="index" key="index" />
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
            <Modal
                visible={isModalUpload}
                title={modalUploadText}
                onCancel={() => { setIsModalUpload(false) }}
                confirmLoading={modalUploadLoading}
                onOk={() => { setIsModalUpload(false) }}
            >
                {modalUploadText}
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
                            label="Price"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng không để trống !'
                                },
                                ({ getFieldsValue }) => ({
                                    validator(_, value) {
                                        if (Number(value) > 0) {
                                            return Promise.resolve()
                                        }
                                        return Promise.reject('Giá phải lơn 0 !')
                                    }
                                })
                            ]}
                            hasFeedback
                        >
                            <InputNumber style={{ width: '100%' }} />
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
                        <Form.Item label="Upload Image">
                            {/* <Upload.Dragger
                                action={"http://localhost:3000/api/file/images"}
                                multiple
                                listType='picture'
                                showUploadList={{ showRemoveIcon: true }}
                                accept='.png,.jpg,.jpeg'
                                beforeUpload={(file) => {
                                    console.log(file)
                                    return false
                                }}
                            >
                                <p>Drag files here OR</p>
                                <br />
                                <Button>Upload</Button>
                            </Upload.Dragger> */}
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