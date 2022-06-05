import { Col, Row } from 'antd'
import React from 'react'
import Helmet from '../../components/helmet/Helmet'
import WebSection from '../../components/web-section/WebSection'

const WebAboutUs = () => {
    return (
        <Helmet
            title="Man NLC"
        >
            <WebSection>
                <div className="about-us">
                    <Row className='about-us__banner'>
                        <Col span={24} className="about-us__banner--inner">
                            <div className="about-us__banner--inner__img">

                            </div>
                            <div className="about-us__banner--inner__content">
                                <p>
                                    Hàng may mặc, sản phẩm của lao động tinh vi và tài nguyên quý giá, đã mất giá trị.
                                    Chúng ta mua nhiều hơn và sử dụng chúng ít hơn bao giờ hết - đóng gói tủ quần áo, lấp đầy các bãi chôn lấp và nạp nhiên liệu cho các lò đốt.
                                    <br />
                                    Tất cả đều phải trả giá bằng xã hội và hành tinh của chúng ta.
                                    <br />

                                    Chúng tôi không thiết kế cho các mùa, chúng tôi tạo ra cho mãi mãi.
                                    Khi điều gì đó không hoàn hảo, chúng tôi sẽ cải thiện nó.
                                    Khi một cái gì đó bị hỏng, chúng tôi sẽ sửa chữa nó.
                                    <br />
                                    Định nghĩa của chúng tôi về sự tiến bộ là giảm tủ quần áo.
                                    Được xây dựng trên những mảnh ghép sẽ đứng vững trước thử thách của thời gian.
                                    Cả về tay nghề và thiết kế.
                                    <br />
                                    Chúng tôi hình dung một thế giới không có tiêu dùng nhanh.
                                    Một thế giới ít lộn xộn hơn, ít rác thải hơn, ít khói thuốc hơn và những tấm gương.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </WebSection>
        </Helmet>
    )
}

export default WebAboutUs