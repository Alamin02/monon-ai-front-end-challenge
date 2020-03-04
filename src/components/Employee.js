import React, { Component } from "react";
import { Row, Col, Table, Typography } from 'antd';
import moment from 'moment';
import humanizeDuration from 'humanize-duration';

const cols = [
    {
        title: 'Enter',
        dataIndex: 'start_time',
        sorter: {
            compare: (a, b) => Date.parse(a.start_time) - Date.parse(b.start_time),
            multiple: 1,
        }
    },
    {
        title: 'Exit',
        dataIndex: 'end_time',
        sorter: {
            compare: (a, b) => Date.parse(a.end_time) - Date.parse(b.end_time),
            multiple: 1,
        }
    },
    {
        title: 'Duration',
        dataIndex: 'duration',
    }
]

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
                const desiredEmployee = json.find(employee => employee.id === id);

                if (desiredEmployee) {
                    // Make attendance formatting for the table
                    desiredEmployee.attendances.map((attendance, index) => {
                        attendance.key = index;

                        let a = moment(attendance.start_time)
                        let b = moment(attendance.end_time)

                        attendance.duration = humanizeDuration(b.diff(a))

                        attendance.start_time = moment(attendance.start_time).format('MMMM Do YYYY, h:mm:ss a');
                        attendance.end_time = moment(attendance.end_time).format('MMMM Do YYYY, h:mm:ss a');

                        return attendance
                    })
                    this.setState({ employee: desiredEmployee })
                }
            });
    }

    render() {
        const { name, department, designation, email, image, phone_number, attendances } = this.state.employee

        return (
            <div>
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
