import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Spinner from "../General/Spinner/Spinner";
import Error from "../General/Error";
import StudentList from "./StudentList";

import * as StudentActions from "../../Actions/StudentActions";

const { GetStudents } = StudentActions;

function Students(props) {
  useEffect(() => {
    async function getStudents() {
      await props.GetStudents();
    }

    getStudents();
  }, []);

  const putInformation = () => {
    if (props.StudentReducers.loading) {
      return <Spinner />;
    }

    if (props.StudentReducers.error) {
      return <Error mensaje={props.error} />;
    }

    return (
      <StudentList
        students={props.StudentReducers.students}
        history={props.history}
      />
    );
  };

  return (
    <div>
      <h1 className="text-center">Student List</h1>
      <div className="d-flex">
        <h4 className="my-4">Do you Wish to Create a New Student?</h4>
        <Link
          type="button"
          className="btn btn-info mr-2 ml-auto align-self-center"
          to={"/edit"}
        >
          Create
        </Link>
      </div>
      {putInformation()}
    </div>
  );
}

const mapStateToProps = ({ StudentReducers }) => {
  return { StudentReducers };
};

const mapDispatchToProps = {
  GetStudents,
};

export default connect(mapStateToProps, mapDispatchToProps)(Students);
