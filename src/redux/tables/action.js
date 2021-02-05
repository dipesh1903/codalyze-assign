import ActionUtils from "../../utils/ActionsUtils";

export default class TableAction {
    static ADD_ROW = 'ADD_ROW';
    static DELETE_SELECTED_ROW = 'DELETE_SELECTED_ROW';

    static addRow = (data) => {
            return ActionUtils.createAction(this.ADD_ROW, data);
    };

    static removeRow = (data) => {
        return ActionUtils.createAction(this.DELETE_SELECTED_ROW);
    };
}

