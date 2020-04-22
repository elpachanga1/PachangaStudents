import React, { useState } from "react";
import { connect } from "react-redux";

import { CreateStudent, EditStudent } from "../../Actions/StudentActions";

function StudentForm(props) {
  const { history } = props;
  const StudentID = props.match.params.key;

  const [student, setStudent] = useState(
    StudentID
      ? props.StudentReducers.students.filter((x) => x.id == StudentID)[0]
      : {
          username: "",
          firstName: "",
          lastName: "",
          age: 0,
          career: "",
        }
  );

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    //redirect
    history.push("/");
  };

  const handleSubmit = async (event) => {
    debugger;
    event.preventDefault();
    console.log(props);

    if (StudentID) {
      //edita
      await props.EditStudent({ ...student, age: parseInt(student.age) });
    } else {
      //crea
      await props.CreateStudent({ ...student, age: parseInt(student.age) });
    }

    history.push("/");
  };

  return (
    <div>
      <h1 className="text-center">Student Form</h1>
      <form className="d-block" onSubmit={handleSubmit}>
        <br />
        <br />
        <label className="col-md-3 col-sm-3">
          <strong>First Name: </strong>
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          className="col-md-8 col-sm-8"
          required
          defaultValue={student.firstName}
          onChange={handleChange}
        />
        <br />
        <br />
        <label className="col-md-3 col-sm-3">
          <strong>Last Name: </strong>
        </label>
        <input
          className="col-md-8 col-sm-8"
          type="text"
          id="lastName"
          name="lastName"
          required
          defaultValue={student.lastName}
          onChange={handleChange}
        />
        <br />
        <br />
        <label className="col-md-3 col-sm-3">
          <strong>User Name: </strong>
        </label>
        <input
          className="col-md-8 col-sm-8"
          type="text"
          id="username"
          name="username"
          required
          defaultValue={student.username}
          onChange={handleChange}
        />
        <br />
        <br />
        <label className="col-md-3 col-sm-3">
          <strong>Age: </strong>
        </label>
        <input
          className="col-md-8 col-sm-8"
          type="number"
          id="age"
          name="age"
          required
          defaultValue={student.age}
          onChange={handleChange}
        />
        <br />
        <br />
        <label className="col-md-3 col-sm-3">
          <strong>Career: </strong>
        </label>
        <input
          className="col-md-8 col-sm-8"
          type="text"
          id="career"
          name="career"
          required
          defaultValue={student.career}
          onChange={handleChange}
        />
        <br />
        <br />
        <div className="ml-auto">
          <button className="btn btn-info mr-3">
            {props.match.params.key ? "Edit" : "Create"}
          </button>
          <button className="btn btn-danger" onClick={handleClose}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = ({ StudentReducers }) => {
  return {
    StudentReducers,
  };
};

const mapDispatchToProps = { CreateStudent, EditStudent };

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm);
