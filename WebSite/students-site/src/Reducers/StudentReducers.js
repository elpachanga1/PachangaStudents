import * as Types from "../Types/StudentTypes";

const INITIAL_STATE = {
  students: [],
  student: {},
  loading: false,
  error: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.GET_STUDENTS:
      return {
        ...state,
        students: action.payload,
        loading: false,
        error: "",
      };
    case Types.LOADING:
      return { ...state, loading: true, error: "" };
    case Types.ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
