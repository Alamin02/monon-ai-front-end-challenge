import React from 'react';
import EmployeeList from "./EmployeeList";
import Employee from "./Employee";
import NotFound from "./NotFound";

import { Switch, Route } from "react-router-dom";
import { Layout } from "antd";

function App() {
  return (
    <div style={{
      padding: "50px"
    }}>
      <Layout>
        <Layout.Content>
          <Switch>
            <Route exact path="/" component={EmployeeList} />
            <Route exact path="/detail/:id" component={Employee} />
            <Route component={NotFound} />
          </Switch>
        </Layout.Content>
      </Layout>
    </div>
  );
}

export default App;
