import employeeReducer from "./employeeReducer";

const { combineReducers } = require("redux");

const rootReducer = combineReducers({
    employeeData: employeeReducer,
});
export default rootReducer;