import React from 'react';
import { Row, Col, Typography } from "antd";

function EmployeeInfo({ employee }) {
    const {
        name,
        department,
        designation,
        email,
        image,
        phone_number,
    } = employee;


    return (
        <Row gutter={16}>
            <Col span={6}>
                <img src={image} alt={name} />
            </Col>
            <Col>
                <Typography.Title>{name}</Typography.Title>
                <p><b>Department:</b> {department}</p>
                <p><b>Desgnation:</b> {designation}</p>
                <p><b>Email:</b> <a href={"mailto:" + email}>{email}</a></p>
                <p><b>Phone Number:</b> {phone_number}</p>
            </Col>
        </Row>
    )

}

export default EmployeeInfo;