import React, { Component } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";

class EmployeeList extends Component {
    state = {
        data: []
    }

    componentDidMount() {
        return fetch('/data/employees.json')
            .then(res => {
                if (res.ok) return res.json();
                throw new Error(res.status);
            })
            .then(json => this.setState({ data: json }));
    }

    render() {

        const cols = [
            {
                title: 'Name',
                dataIndex: 'name',
                render: (text, record) => <Link to={"/detail/" + record.id}>{text}</Link>,
                sorter: {
                    compare: (a, b) => {
                        return a.name.localeCompare(b.name);
                    },
                    multiple: 3,
                },
            },
            {
                title: 'Email',
                dataIndex: 'email',
                sorter: {
                    compare: (a, b) => {
                        return a.email.localeCompare(b.email);
                    },
                    multiple: 2,
                },
            },
            {
                title: 'Department',
                dataIndex: 'department',
                sorter: {
                    compare: (a, b) => a.department.localeCompare(b.department),
                    multiple: 1,
                },
            },
            {
                title: 'Last Seen',
                dataIndex: '',
            },
        ]

        function onChange(pagination, filters, sorter, extra) {
            console.log('params', pagination, filters, sorter, extra);
        }

        this.state.data.map(d => {
            return d.key = d.id
        })


        return (
            <div>
                <Table
                    columns={cols}
                    dataSource={this.state.data}
                    onChange={onChange}
                />
            </div>
        )
    }
}

export default EmployeeList;
