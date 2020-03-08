import React from "react";
import cols from "../utils/attendance-columns";
import { Table } from 'antd';
import moment from 'moment';
import humanizeDuration from 'humanize-duration';

function AttendanceList({ attendances }) {
    attendances.map((attendance, index) => {
        // Format for visual representation in Table
        attendance.key = index;
        let st = moment(attendance.start_time)
        let et = moment(attendance.end_time)

        attendance.duration = et.diff(st)
        attendance.duration_formatted = humanizeDuration(et.diff(st))

        attendance.start_time_formatted = st.format('MMMM Do YYYY, h:mm:ss a');
        attendance.end_time_formatted = et.format('MMMM Do YYYY, h:mm:ss a');

        return attendance
    });

    return (
        <Table
            columns={cols}
            dataSource={attendances}
            pagination={{ pageSize: 10 }}
        />
    )
}

export default AttendanceList;