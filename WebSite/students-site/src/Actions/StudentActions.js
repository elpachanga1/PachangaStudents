import * as Types from "../Types/StudentTypes";
import axios from "axios";
import { links } from "../Config/Config";
import Swal from "sweetalert2";

export const GetStudents = () => async (dispatch) => {
  dispatch({
    type: Types.LOADING,
  });

  try {
    const respuesta = await axios.get(links.database_api);

    console.log(respuesta);

    dispatch({
      type: Types.GET_STUDENTS,
      payload: respuesta.data,
    });
  } catch (error) {
    console.log("Error: ", error.message);
    dispatch({
      type: Types.ERROR,
      payload: "Students Information not Available",
    });
  }
};

export const CreateStudent = (data) => async (dispatch) => {
  try {
    const respuesta = await axios.post(links.database_api, data);

    console.log(respuesta);
  } catch (error) {
    console.log("Error: ", error.message);
    dispatch({
      type: Types.ERROR,
      payload: "Students Information not Available",
    });

    Swal.fire({
      type: "error",
      title: "Oops...",
      text: "An Error Happened, Try again",
    });
  }
};

export const EditStudent = (data) => async (dispatch) => {
  debugger;
  try {
    const respuesta = await axios.put(`${links.database_api}/${data.id}`, data);

    console.log(respuesta);
  } catch (error) {
    console.log("Error: ", error.message);
    dispatch({
      type: Types.ERROR,
      payload: "Students Information not Available",
    });

    Swal.fire({
      type: "error",
      title: "Oops...",
      text: "An Error Happened, Try again",
    });
  }
};
