import React, { Component } from "react";
import { Row, Col, Table, Typography } from 'antd';
import moment from 'moment';
import humanizeDuration from 'humanize-duration';

const cols = [
    {
        title: 'Enter',
        dataIndex: 'start_time_formatted'
    },
    {
        title: 'Exit',
        dataIndex: 'end_time_formatted',
    },
    {
        title: 'Duration',
        dataIndex: 'duration_formatted',
        sorter: {
            compare: (a, b) => a.duration - b.duration,
            multiple: 1,
        }
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

                        let st = moment(attendance.start_time)
                        let et = moment(attendance.end_time)

                        attendance.duration = et.diff(st)
                        attendance.duration_formatted = humanizeDuration(et.diff(st))

                        attendance.start_time_formatted = st.format('MMMM Do YYYY, h:mm:ss a');
                        attendance.end_time_formatted = et.format('MMMM Do YYYY, h:mm:ss a');

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
