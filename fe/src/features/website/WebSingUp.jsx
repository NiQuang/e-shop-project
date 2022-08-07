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

const SignUpSuccessContent = () => (
  <>
    <p>Đăng ký thành công!</p>
    <p>Vui lòng kiểm tra email của bạn để xác mình tài khoản!</p>
    <Link to="/login">Đăng nhập ngay</Link>
  </>
)

const WebSignUp = () => {

  const [isLoginFail, setIsLoginFail] = useState(false)
  const [isLoginSuccess, setIsLoginSuccess] = useState(false)
  const [loginText, setLoginText] = useState('')
  const [checkingAuth, setCheckingAuth] = useState(true)

  const isAuth = useSelector((state) => state.auth.isAuth)

  

  const navigate = useNavigate()

  const dispath = useDispatch()

  const onFinish = async (values) => {
    const user = {
      username: values.username,
      password: values.password,
      fullname: values.fullname,
      email: values.email,
      role: ["user"]
    }
    console.log(user)
    const res = await authAPI.signup(user)

    if (!res.status) {
      console.log(res)
      setIsLoginSuccess(true)
      setLoginText(<SignUpSuccessContent />)
      // const res2 = await authAPI.signin({ username: user.username, password: user.password })
      // if (!res2.status) {
      //   console.log(res2)
      //   dispath(signin(res2))
      //   navigate("/")
      // }
    } else {
      console.log(res)
      setIsLoginFail(true)
      setLoginText('Đăng ký thất bại!')
    }
  }

  const loginFailCancel = () => {
    setIsLoginFail(false)
    setLoginText('')
  }

  const loginSuccess = () => {
    setIsLoginSuccess(false)
    setLoginText('')
  }

  useState(() => {
    if (isAuth) {
      setCheckingAuth(true)
    } else {
      setCheckingAuth(false)
    }
  }, [isAuth])

  useEffect(() => {
    if (checkingAuth) {
      navigate("/")
    }
  }, [checkingAuth])

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
                      <h2>Đăng ký tài khoản</h2>
                    </div>
                    <div className="login__content--form">
                      <Form
                        labelCol={24}
                        wrapperCol={24}
                        layout='vertical'
                        onFinish={onFinish}
                      >
                        <Form.Item
                          label="Họ và tên"
                          name="fullname"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập họ và tên!"
                            },
                            {
                              whitespace: true,
                              message: "Vui lòng không nhập khoảng trắng!"
                            },
                            {
                              max: 100,
                              message: "Họ và tên không quá 100 kí tự!"
                            }
                          ]}
                          hasFeedback
                        >
                          <Input placeholder='Họ và tên' />
                        </Form.Item>
                        <Form.Item
                          label="Email"
                          name="email"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập email!"
                            },
                            {
                              whitespace: true,
                              message: "Vui lòng không nhập khoảng trắng!"
                            },
                            {
                              max: 200,
                              message: "Email không quá 200 kí tự!"
                            }
                          ]}
                          hasFeedback
                        >
                          <Input placeholder='Email' />
                        </Form.Item>
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
                          label="Xác nhận mật khẩu"
                          name="password2"
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
                          <Input placeholder='Xác nhận mật khẩu' type='password' />
                        </Form.Item>
                        <Form.Item>
                          <Button className='my-btn my-btn--primary' htmlType='submit' style={{ width: '100%' }}>
                            Đăng ký
                          </Button>
                        </Form.Item>
                      </Form>
                    </div>
                  </Col>
                </Row >
              </div >
              <Modal
                title="Đăng ký thất bại"
                visible={isLoginFail}
                onCancel={loginFailCancel}
                onOk={loginFailCancel}
              >
                {
                  loginText
                }
              </Modal>
              <Modal
                title="Đăng ký thành công"
                visible={isLoginSuccess}
                onCancel={loginFailCancel}
                onOk={loginSuccess}
              >
                {
                  loginText
                }
              </Modal>
            </WebSection >
          )
      }
    </Helmet >
  )
}

export default WebSignUp