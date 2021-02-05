import {to} from "./NetworkUtils";

export default class ActionUtils {
    static async createThunkEffect(dispatch, actionType, effect, ...args) {
        dispatch(ActionUtils.createAction(actionType));

        let [response, error] = await to(effect(...args));
        if (response) {
            response = await response.json()
        }
        
        dispatch(ActionUtils.createAction(`${actionType}_FINISHED`, response || error, (error === undefined && response === undefined) || !!error));

        return [response, error];
    }

    static createAction(type, payload, error = false) {
        return {type, payload, error};
    }
}
