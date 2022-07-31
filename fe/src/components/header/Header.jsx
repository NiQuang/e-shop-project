import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import headerNavData from '../../assets/data/web-headernav'
import logo from '../../assets/imgs/logo.jpg'
import {
    ShoppingOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Avatar, Button, Dropdown, Menu } from 'antd';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { signout } from '../../redux/features/authSlice';
import { clearCart } from '../../redux/features/cartSlice';

const Header = () => {
    const location = useLocation()


    const cart = useSelector(state => state.cart.cart)

    const isAuth = useSelector(state => state.auth.isAuth)

    const user = useSelector(state => state.auth.user)

    const dispath = useDispatch()

    const [length, setLength] = useState(undefined)

    const handleSignout = () => {
        dispath(signout())
        dispath(clearCart())
    }

    const check = isAuth && user?.roles?.length > 0 && (user?.roles?.includes("ROLE_ADMIN") || user?.roles?.includes("ROLE_EMPLOYEE"))


    const [menu, setMenu] = useState((
        <Menu
            items={isAuth ?
                (
                    [
                        {
                            label: <Link to="/my-account">Cài đặt</Link>,
                            key: '0'
                        },
                        check ?
                            {
                                label: <Link to="/admin">Trang quản trị</Link>,
                                key: '00'
                            } : null
                        ,
                        {
                            label: <Button onClick={() => { handleSignout() }}>Đăng xuất</Button>,
                            key: '1'
                        }
                    ]
                )
                :
                [
                    {
                        label: <Link to="/login">Đăng nhập</Link>,
                        key: '0'
                    },
                    {
                        label: <Link to="/signup">Đăng ký</Link>,
                        key: '1'
                    }
                ]
            }

        />
    ))

    useEffect(() => {
        const check = isAuth && user?.roles?.length > 0 && (user?.roles?.includes("ROLE_ADMIN") || user?.roles?.includes("ROLE_EMPLOYEE"))

        setMenu(
            (
                <Menu
                    items={isAuth ?
                        [
                            {
                                label: <Link to="/my-account">Cài đặt</Link>,
                                key: '0'
                            },
                            check ?
                                {
                                    label: <Link to="/admin">Trang quản trị</Link>,
                                    key: '00'
                                } : null,
                            {
                                label: <Button onClick={() => { handleSignout() }}>Đăng xuất</Button>,
                                key: '1'
                            }
                        ]
                        :
                        [
                            {
                                label: <Link to="/login">Đăng nhập</Link>,
                                key: '0'
                            },
                            {
                                label: <Link to="/signup">Đăng ký</Link>,
                                key: '1'
                            }
                        ]
                    }

                />
            )
        )
    }, [isAuth])


    return (
        <div className="header">
            <div className="header__logo">
                <Link className="header__logo--inner" to="/">
                    <img src={logo} alt="Logo img" className="header__logo--inner__img" />
                </Link>
            </div>
            <div className="header__nav">
                {
                    headerNavData.map((item, index) => (
                        <Link
                            key={index}
                            className={`header__nav--item ${location.pathname === item.router ? 'active' : ''}`}
                            to={item.router}
                        >
                            {item.view}
                        </Link>
                    ))
                }
            </div>

            <div className="header__customer">
                <div className="header__customer--cart">
                    <div className="header__customer--cart__icon">
                        <Link to="/cart">
                            <ShoppingOutlined />
                        </Link>
                    </div>
                    <div className="header__customer--cart__info">
                        {cart.length}
                    </div>
                </div>
                <div className="header__customer--user">
                    <div className="header__customer--user__inner">
                        <Dropdown
                            overlay={menu}
                            trigger={['click']}
                        >
                            <Avatar icon={<UserOutlined />} />
                        </Dropdown>
                        {
                            isAuth ? <p>{user.fullname}</p> : null
                        }
                        {false && <img src={logo} alt="" className="header__customer--user__inner--avatar" />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header