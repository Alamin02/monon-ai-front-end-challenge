import React, { Component } from "react";

import { Row, Col, Table } from 'antd';

class Employee extends Component {
    state = {
        employee: {}
    }

    componentDidMount() {
        return fetch('/data/employees.json')
            .then(res => {
                if (res.ok) return res.json()
                throw new Error(res.status);
            })
            .then(json => {
                const { id } = this.props.match.params
                const target = json.find(employee => employee.id === id)
                this.setState({ employee: target })
            });
    }

    render() {
        const { name, department, designation, email, image, phone_number, attendances } = this.state.employee

        const cols = [
            {
                title: 'Start Time',
                dataIndex: 'start_time',
            },
            {
                title: 'End Time',
                dataIndex: 'end_time',
            },
            {
                title: 'Duration',
                dataIndex: '',
            }
        ]

        return (
            <div>
                <Row gutter={16}>
                    <Col span={6}>
                        <img src={image} />
                    </Col>
                    <Col>
                        <p><b>Name:</b> {name}</p>
                        <p><b>Department:</b> {department}</p>
                        <p><b>Desgnation:</b> {designation}</p>
                        <p><b>Email:</b> {email}</p>
                        <p><b>Phone Number:</b> {phone_number}</p>
                    </Col>
                </Row>

                <Table
                    columns={cols}
                    dataSource={attendances}
                    pagination={{ pageSize: 10 }}
                />

            </div>
        )
    }
}


export default Employee;
