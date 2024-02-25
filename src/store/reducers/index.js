import { combineReducers } from "redux";
import patientsReducer from "./patientsReducer";

export default combineReducers({
    patients: patientsReducer
});
