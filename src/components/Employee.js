import React, { Component } from "react";
import NotFound from "./NotFound";
import EmployeeInfo from "./EmployeeInfo";
import AttendanceList from "./AttendanceList";

class Employee extends Component {
    state = {
        employee: {
            attendances: []
        },
        isFound: true
    }

    componentDidMount = () => {
        return fetch('/data/employees.json')
            .then(res => {
                if (res.ok) return res.json()
                throw new Error(res.status);
            })
            .then(data => {
                const { id } = this.props.match.params
                const desiredEmployee = data.find(employee => employee.id === id);

                if (desiredEmployee) {
                    this.setState({ employee: desiredEmployee });
                } else {
                    this.setState({ isFound: false })
                }
            });
    }

    render() {
        if (this.state.isFound) {
            const { employee } = this.state;

            return (
                <React.Fragment>
                    <EmployeeInfo employee={employee} />
                    <AttendanceList attendances={employee.attendances} />
                </React.Fragment>
            )
        } else {
            return <NotFound info="Employee with this ID does not exist" />
        }
    }
}


export default Employee;
