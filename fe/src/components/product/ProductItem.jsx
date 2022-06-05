import React from 'react'
import { Col, Button, Empty } from 'antd'
import { Link } from 'react-router-dom'
import numberWithCommas from '../../utils/numberComas'

const ProductItem = ({ item, onAddToCart }) => {
    return (
        <Col
            className="home--section__content--item"
            key={item.id}
            span={6}
        >
            <div className="home--section__content--item__inner">
                <div className="home--section__content--item__inner--detail">
                    <div className="home--section__content--item__inner--imgs">
                        <Link to={`/products/detail/${item.id}`}>
                            {
                                item.productMedias.length > 0 ? (
                                    <img src={`http://localhost:8080/api/file/images/${item.productMedias[0].mediaLink}`} alt="" />
                                ) : (
                                    <Empty />
                                )
                            }
                        </Link>
                    </div>
                    <div className="home--section__content--item__inner--title">
                        <p>
                            {item.title}
                        </p>
                    </div>
                    <div className="home--section__content--item__inner--price">
                        {numberWithCommas(item.price)} $
                    </div>
                    <div className="home--section__content--item__inner--action">
                        <Button className='my-btn my-btn--primary' onClick={() => {onAddToCart(item)}}>
                            Chọn mua
                        </Button>
                    </div>
                </div>

            </div>
        </Col>
    )
}

export default ProductItem