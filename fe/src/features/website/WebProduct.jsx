import { Col, Menu, message, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import categoriesAPI from '../../api/categoriesAPI'
import productAPI from '../../api/productsAPI'
import Helmet from '../../components/helmet/Helmet'
import ProductItem from '../../components/product/ProductItem'
import {AppstoreOutlined} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cartSlice'


const WebProduct = () => {
    const [products, setProducts] = useState([])
    
    const dispatch = useDispatch()

    const getItem = (label, key, icon, children, type) => {
        return {
            key,
            icon,
            children,
            label,
            type
        }
    }

    const [cateItems, setCateItems] = useState([])


    const onClickFilter = (e) => {
        console.log('click',e)
    }
    
    const handleAddToCart = (item) => {
        dispatch(addToCart(item))
        message.success('Thêm vào giỏ hàng thành công!')
    }

    useEffect(() => {
        productAPI.getAll().then((response) => {
            setProducts(response)
            // console.log(response)
        })

        categoriesAPI.getAll().then((response) => {
            console.log(response)
            setCateItems([
                getItem('Thể loại', 'cate-sub',<AppstoreOutlined />,[
                    getItem('Tất cả','cate-sub-all'),
                    ...response.map((item) => (
                        getItem(item.title, `cate-sub-${item.id}`)
                    ))
                ])
            ])
        })
    },[])

    return (
        <Helmet
            title="Sản phẩm"
        >
            <Row className='web--product'>
                <Col span={4} className='web--product__filter'>
                    <div className="web--product__filter--title">
                        <h3>Bộ lọc</h3>
                    </div>
                    <div className="web--product__filter--content">
                        <Menu
                            items={cateItems}
                            mode='inline'
                            defaultSelectedKeys={['cate-sub-all']}
                            defaultOpenKeys={['cate-sub']}
                        >
                            Thể loại
                        </Menu>
                    </div>
                </Col>
                <Col span={20} className='web--product__content'>
                    <div className="web--product__content--title">
                        <h3>Danh mục sản phẩm</h3>
                    </div>
                    <div className="web--product__content--detail">
                        <Row gutter={[64, 48]}>
                            {products.length>0 && products.map((item,index) => (
                                <ProductItem item={item} key={item.id} onAddToCart={handleAddToCart}/>
                            ))}
                        </Row>
                    </div>
                </Col>
            </Row>
        </Helmet>
    )
}

export default WebProduct