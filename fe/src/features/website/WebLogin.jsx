import { Button, Checkbox, Col, Form, Input, Modal, Row, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import Helmet from '../../components/helmet/Helmet'
import WebSection from '../../components/web-section/WebSection'
import banner from '../../assets/imgs/login-banner.jpg'
import {
    FacebookOutlined,
    GoogleOutlined,
    GithubOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom'
import authAPI from '../../api/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import { signin } from '../../redux/features/authSlice'

const WebLogin = () => {

    const [isLoginFail, setIsLoginFail] = useState(false)
    const [loginFailText, setLoginFailText] = useState('')
    const [checkingAuth, setCheckingAuth] = useState(true)

    const isAuth = useSelector((state) => state.auth.isAuth)

    const navigate = useNavigate()

    const dispath = useDispatch()

    const onFinish = async (values) => {
        const user = {
            username: values.username,
            password: values.password
        }
        console.log(user)
        const res = await authAPI.signin(user)

        if (!res.status) {
            console.log(res)
            dispath(signin(res))
        } else {
            console.log(res)
            setIsLoginFail(true)
            setLoginFailText('Tên đăng nhập hoặc mật khẩu không chính xác!')
        }
    }

    const loginFailCancel = () => {
        setIsLoginFail(false)
        setLoginFailText('')

    }

    useState(()=> {
        if(isAuth){
            setCheckingAuth(true)
        }else{
            setCheckingAuth(false)
        }
    },[])

    useEffect(()=> {
        if(checkingAuth){
            navigate("/")
        }
    },[checkingAuth])

    return (
        <Helmet
            title={"Đăng nhập"}
        >
            {
                checkingAuth ?
                    (
                        <WebSection>
                            <Spin></Spin>
                        </WebSection>
                    )
                    :
                    (
                        <WebSection>
                            <div className="login">
                                <Row className="login--inner">
                                    <Col span={12} className="login__banner">
                                        <img src={banner} alt="" />
                                    </Col>
                                    <Col span={12} className="login__content">
                                        <div className="login__content--title">
                                            <h2>Đăng nhập</h2>
                                        </div>
                                        <div className="login__content--form">
                                            <Form
                                                labelCol={24}
                                                wrapperCol={24}
                                                layout='vertical'
                                                onFinish={onFinish}
                                            >
                                                <Form.Item
                                                    label="Tên đăng nhập"
                                                    name="username"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Vui lòng nhập tên đăng nhập!"
                                                        },
                                                        {
                                                            whitespace: true,
                                                            message: "Vui lòng không nhập khoảng trắng!"
                                                        },
                                                        {
                                                            max: 50,
                                                            message: "Tên đăng nhập không quá 50 kí tự!"
                                                        }
                                                    ]}
                                                    hasFeedback
                                                >
                                                    <Input placeholder='Tên đăng nhập' />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Mật khẩu"
                                                    name="password"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Vui lòng nhập mật khẩu!"
                                                        },
                                                        {
                                                            whitespace: true,
                                                            message: "Vui lòng không nhập khoảng trắng!"
                                                        },
                                                        {
                                                            max: 50,
                                                            message: "Mật khẩu không quá 250 kí tự!"
                                                        }
                                                    ]}
                                                    hasFeedback
                                                >
                                                    <Input placeholder='Mật khẩu' type='password' />
                                                </Form.Item>
                                                <Form.Item
                                                    label=""
                                                    name="remember"
                                                    valuePropName='checked'
                                                >
                                                    <Checkbox label="Lưu mật khẩu"> Lưu mật khẩu</Checkbox>
                                                </Form.Item>
                                                <Form.Item>
                                                    <Button className='my-btn my-btn--primary' htmlType='submit' style={{ width: '100%' }}>
                                                        Đăng nhập
                                                    </Button>
                                                </Form.Item>
                                            </Form>
                                        </div>
                                        <div className="login__content--register">
                                            <span>Chưa có tài khoản </span>
                                            <Link to="/register">
                                                Đăng ký ngay
                                            </Link>
                                            <p>hoặc</p>
                                        </div>
                                        <div className="login__content--socials">
                                            <div className="login__content--socials__item">
                                                <Button className='my-btn my-btn--social' icon={<FacebookOutlined />}>
                                                    Đăng nhập với  tài khoản Facbook
                                                </Button>
                                            </div>
                                            <div className="login__content--socials__item">
                                                <Button className='my-btn my-btn--social' icon={<GoogleOutlined />}>
                                                    Đăng nhập với tài khoản Google
                                                </Button>
                                            </div>
                                            <div className="login__content--socials__item">
                                                <Button className='my-btn my-btn--social' icon={<GithubOutlined />}>
                                                    Đăng nhập với tài khoản Github
                                                </Button>
                                            </div>
                                        </div>
                                    </Col>
                                </Row >
                            </div >
                            <Modal
                                title="Đăng nhập thất bại"
                                visible={isLoginFail}
                                onCancel={loginFailCancel}
                                okText={loginFailCancel}
                            >
                                {
                                    loginFailText
                                }
                            </Modal>
                        </WebSection >
                    )
            }
        </Helmet >
    )
}

export default WebLogin