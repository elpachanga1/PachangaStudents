import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";

import { links } from "../../Config/Config";

function StudentElement({ student, history }) {
  const deleteStudent = (id) => {
    console.log("eliminando", id);

    Swal.fire({
      title: "Are You Sure?",
      text: "A deleted Student can't be recovered",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yeah, kill it!",
      cancelButtonText: "Nohh, let it to live",
    }).then(async (result) => {
      if (result.value) {
        try {
          const resultado = await axios.delete(links.database_api);

          if (resultado.status === 200) {
            Swal.fire(
              "You kill it!",
              "Are you concient that you did?.",
              "success"
            );
            history.push("/");
          }
        } catch (ex) {
          console.log(ex);
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: "An Error Happened, Try again",
          });
        }
      }
    });
  };

  return (
    <li className="list-group-item">
      <div className="row p-1">
        <div className="col-xl-8 col-lg-7 col-xs-6">
          <h4>
            {student.lastName} - {student.firstName}
          </h4>
          <p className="text-justify">
            <span className="font-weight-bold">First Name: </span>
            {student.firstName}
            <br />
            <span className="font-weight-bold">Last Name: </span>
            {student.lastName}
            <br />
            <span className="font-weight-bold">Age: </span>
            {student.age}
            <br />
            <span className="font-weight-bold">Career: </span>
            {student.career}
            <br />
            <span className="font-weight-bold">User Name: </span>
            {student.username}
          </p>
        </div>

        <div className="col-xl-3 col-lg-3 col-xs-2 pt-3 ml-auto d-flex justify-content-end align-self-center">
          <Link
            type="button"
            className="btn btn-info mr-2"
            to={`/edit/${student.id}`}
          >
            Edit
          </Link>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => deleteStudent(student.id)}
          >
            Delete &times;
          </button>
        </div>
      </div>
    </li>
  );
}

export default withRouter(StudentElement);
