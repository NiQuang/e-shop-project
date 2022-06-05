import { Col, Row, Rate, Button, Empty } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    ArrowUpOutlined,
    ArrowDownOutlined,
    MinusOutlined,
    PlusOutlined
} from '@ant-design/icons';
import numberWithCommas from '../../utils/numberComas';

const Product = ({ item }) => {
    const [rateValue, setRateValue] = useState(3.5)
    const [previewExpand, setPreviewExpand] = useState(false)
    const [previewMaxHeight, setPreviewMaxHeight] = useState(0)
    const [prvImg, setPrvImg] = useState(item.productMedias.length > 0 ? item.productMedias[0].mediaLink : null)
    const previewRefElement = useRef()
    const [quantity, setQuantity] = useState(0)



    const handleChangePreviewImg = (link) => {
        setPrvImg(link)
    }

    const handleChangeQuantity = (type) => {
        if (type) {
            setQuantity(quantity + 1)
        } else {
            if (quantity - 1 <= 0) {
                setQuantity(0)
            } else {
                setQuantity(quantity - 1)
            }
        }
    }

    const togglePreviewExpand = () => {
        if (previewExpand) {
            previewRefElement.current.classList.remove('expand')
            setPreviewExpand(false)
        } else {
            previewRefElement.current.classList.add('expand')
            setPreviewExpand(true)
        }
    }


    useEffect(() => {
        if (previewMaxHeight > 120) {
            previewRefElement.current.classList.remove('expand')
            setPreviewExpand(false)
        }
    }, [previewMaxHeight])

    useEffect(() => {
        setPreviewMaxHeight(previewRefElement.current.clientHeight)
        if(item.productMedias.length > 0){
            setPrvImg(item.productMedias[0].mediaLink)
        }else{
            setPrvImg(null)
        }
    }, [item])
    return (
        <div className="product">
            <Row gutter={[64, 0]}>
                <Col
                    span={14}
                    className='product__imgs'
                >
                    {
                        item.productMedias.length > 0 ? (
                            <>

                                <div className="product__imgs--img">
                                    {
                                        prvImg ?
                                            (<img src={`http://localhost:8080/api/file/images/${prvImg}`} alt="" />)
                                            :
                                            (
                                                <Empty />
                                            )
                                    }

                                </div>
                                <div className="product__imgs--list">

                                    {
                                        item.productMedias.map(media => (
                                            <div className="product__imgs--list__item" key={media.id}>
                                                <img src={`http://localhost:8080/api/file/images/${media.mediaLink}`} alt="" onClick={() => { handleChangePreviewImg(media.mediaLink) }} />
                                            </div>
                                        ))
                                    }
                                </div>
                            </>
                        ) :
                            (
                                <Empty />
                            )
                    }
                </Col>
                <Col
                    span={10}
                    className='product__info'
                >
                    <div className="product__info--navigate">
                        <Link to="/products">Sản phẩm</Link> {` > Chi tiết sản phẩm `}
                    </div>
                    <div className="product__info--title">
                        <h2>{item.title}</h2>
                    </div>
                    <div className="product__info--price">
                        USD {numberWithCommas(item.price)}
                    </div>
                    <div className="product__info--rate">
                        <Rate value={rateValue} allowHalf disabled />
                    </div>
                    <div className="product__info--reviews">
                        {numberWithCommas(1234)} reviews
                    </div>
                    <div className="product__info--sizes">
                        <div className="product__info--sizes__title">
                            Kích cỡ:
                        </div>
                        <div className="product__info--sizes__option">
                            <div className="product__info--sizes__option--item choosed">
                                S
                            </div>
                            <div className="product__info--sizes__option--item">
                                M
                            </div>
                            <div className="product__info--sizes__option--item">
                                L
                            </div>
                            <div className="product__info--sizes__option--item">
                                XL
                            </div>
                        </div>
                    </div>
                    <div className="product__info--quantity">
                        <div className="product__info--quantity__title">
                            Số lượng:
                        </div>
                        <div className="product__info--quantity__detail">
                            <div className="product__info--quantity__detail--minus" onClick={() => { handleChangeQuantity(false) }}>
                                <MinusOutlined />
                            </div>
                            <div className="product__info--quantity__detail--info">
                                {quantity}
                            </div>
                            <div className="product__info--quantity__detail--plus" onClick={() => { handleChangeQuantity(true) }}>
                                <PlusOutlined />
                            </div>
                        </div>
                    </div>

                    <div className="product__info--action">
                        <Button
                            className='my-btn my-btn--primary'
                        >
                            Thêm vào giỏ hàng
                        </Button>
                    </div>
                </Col>
                <Col span={24} className={`product__preview`}>
                    <div className="product__preview--title">
                        <h3>Chi tiết sản phẩm</h3>
                    </div>
                    <div className={`product__preview--content expand`} ref={previewRefElement}>
                        <p>
                            {item.preview}
                        </p>
                    </div>
                    {
                        (previewMaxHeight > 120) && (
                            <div className="product__preview--toggle">
                                <Button
                                    className='my-btn my-btn--primary'
                                    onClick={() => { togglePreviewExpand() }}
                                    icon={previewExpand ? (<ArrowUpOutlined />) : (<ArrowDownOutlined />)}
                                >
                                    {previewExpand ? 'Thu gọn' : 'Xem thêm'}
                                </Button>
                            </div>
                        )
                    }
                </Col>
            </Row>
        </div>

    )
}

export default Product