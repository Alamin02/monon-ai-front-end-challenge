import React, { useState, useEffect } from "react";
import { Table } from "antd";
import moment from 'moment';
import cols from "../utils/employee-list-columns";

function EmployeeList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/data/employees.json')
            .then(res => {
                if (res.ok) return res.json();
                throw new Error(res.status);
            })
            .then(jsonData => {
                reformatFetchedData(jsonData)
            });
    }, [])

    const reformatFetchedData = (fetchedData) => {
        fetchedData.map(employee => {
            // add a 'key' field to data for table rendering
            employee.key = employee.id

            // Find 'last_seen'
            // Though the array seems to be sorted, just in case!
            let last_seen = employee.attendances[0].end_time;
            for (let i = 0; i < employee.attendances.length; i++) {
                let ls = new Date(last_seen);
                let temp = new Date(employee.attendances[i].end_time)
                if (temp > ls) {
                    last_seen = employee.attendances[i].end_time
                }
            }
            employee.last_seen = moment(last_seen).format('MMMM Do YYYY, h:mm:ss a')
            return employee
        })

        setData(fetchedData)
    }


    return (
        <div>
            <Table
                columns={cols}
                dataSource={data}
                pagination={{ pageSize: 10 }}
            />
        </div>
    )

}

export default EmployeeList;
