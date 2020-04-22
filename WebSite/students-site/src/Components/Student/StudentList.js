import React from "react";
import StudentElement from "./StudentElement";

const StudentList = ({ students, history }) => {
  const putRows = () =>
    students.map((student) => {
      console.log(student);
      return (
        <StudentElement key={student.id} student={student} history={history} />
      );
    });

  return <ul className="list-group mt-5">{putRows()}</ul>;
};

export default StudentList;
