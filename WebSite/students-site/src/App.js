import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Students from "./Components/Student";
import StudentsForm from "./Components/Student/StudentForm";

const App = () => (
  <Router>
    <main className="container mt-5">
      <div className="jumbotron">
        <Switch>
          <Route exact path="/" component={Students} />
          <Route exact path="/edit" component={StudentsForm} />
          <Route exact path="/edit/:key" component={StudentsForm} />
        </Switch>
      </div>
    </main>
  </Router>
);

export default App;
