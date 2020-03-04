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
                sorter: {
                    compare: (a, b) => Date.parse(a.start_time) - Date.parse(b.start_time),
                    multiple: 1,
                }
            },
            {
                title: 'End Time',
                dataIndex: 'end_time',
                sorter: {
                    compare: (a, b) => Date.parse(a.end_time) - Date.parse(b.end_time),
                    multiple: 1,
                }
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
                        <img src={image} alt={name} />
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
