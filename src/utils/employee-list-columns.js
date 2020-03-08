import React from "react";
import { Link } from "react-router-dom";

const employeeListCols = [
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
        dataIndex: 'last_seen',
    },
]

export default employeeListCols;