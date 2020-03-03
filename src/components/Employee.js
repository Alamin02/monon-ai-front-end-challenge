import React, { Component } from "react";

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
        const { name, department, designation, email, id, image, phone_number } = this.state.employee

        return (
            <div>
                <p>Name: {name}</p>
                <p>Department: {department}</p>
                <p>Desgnation: {designation}</p>
                <p>Email: {email}</p>
                <p>Image: {image}</p>
                <p>Phone Number: {phone_number}</p>
            </div>
        )
    }
}


export default Employee;
