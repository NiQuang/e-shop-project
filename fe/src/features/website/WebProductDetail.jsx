import {Empty } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Helmet from '../../components/helmet/Helmet'

// import { product } from '../../assets/data/productsData'
import Product from '../../components/product-page/Product'
import WebSection from '../../components/web-section/WebSection'
import productsAPI from '../../api/productsAPI'

const WebProductDetail = ({ }) => {
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState(null)


    useEffect(() => {
        productsAPI.getProduct(id).then((response) => {
            if(response.status === 200) {
                setProduct(response.data)
                setLoading(false)
            }else{
                setProduct(null)
                setLoading(true)
            }
        })
    }, [id])

    return (
        <Helmet
            title={`Chi tiết sản phẩm ${id}`}
        >
            {
                loading ?
                    (<>
                        <WebSection>
                            <Empty />
                        </WebSection>
                    </>)
                    :
                    (<>
                        <WebSection>
                            <Product item={product} />
                        </WebSection>
                        <WebSection>
                            More item
                        </WebSection>
                    </>)
            }

        </Helmet>
    )
}

export default WebProductDetail