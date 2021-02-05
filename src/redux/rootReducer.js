import tableReducer from './tables/reducer';
import {combineReducers} from "redux";

const appReducers = combineReducers({
    tables: tableReducer
});

export default appReducers;