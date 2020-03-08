import React, { useState, useEffect } from "react";
import NotFound from "./NotFound";
import EmployeeInfo from "./EmployeeInfo";
import AttendanceList from "./AttendanceList";

function Employee(props) {

    const [employee, setEmployee] = useState({ attendances: [] });

    const [isFound, setIsFound] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        fetch('/data/employees.json')
            .then(res => {
                if (res.ok) return res.json()
                throw new Error(res.status);
            })
            .then(data => {
                const { id } = props.match.params
                const desiredEmployee = data.find(employee => employee.id === id)

                setIsLoading(false)

                if (desiredEmployee) {
                    setEmployee(desiredEmployee);
                    setIsFound(true);
                } else {
                    setIsFound(false);
                }
            });
    }, [props.match.params]);

    if (isFound) {
        return (
            <React.Fragment>
                <EmployeeInfo employee={employee} />
                <AttendanceList attendances={employee.attendances} />
            </React.Fragment>
        )
    } else if (isLoading) {
        return <NotFound info="Loading..." />
    } else {
        return <NotFound info="Employee with this ID does not exist" />
    }
}


export default Employee;
