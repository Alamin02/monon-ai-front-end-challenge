import React from 'react';
import EmployeeList from "./components/EmployeeList";
import Employee from "./components/Employee";

import { Switch, Route } from "react-router-dom";
import { Layout } from "antd";

function App() {
  return (
    <div style={{
      padding: "25px"
    }}>
      <Layout>
        <Layout.Content>
          <Switch>
            <Route exact path="/" component={EmployeeList} />
            <Route exact path="/detail/:id" component={Employee} />
          </Switch>
        </Layout.Content>
      </Layout>
    </div>
  );
}

export default App;
