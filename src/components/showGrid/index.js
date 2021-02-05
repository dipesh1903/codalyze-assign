import React , {useState} from 'react';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


const ShowGrid = (props) => {

    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    function onGridReady(params) {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    }

    return (
        <div className="ag-theme-alpine" style={{height: 200, width: '100%' }}>
            <AgGridReact
                onGridReady={onGridReady}
                rowData={props.rowData}>
                <AgGridColumn
                    field="id"
                    filter={true}
                >
                </AgGridColumn>
                <AgGridColumn
                    field="name"
                    filter={true}
               >
                </AgGridColumn> 
                <AgGridColumn
                    field="email"
                    filter={true}
                >
                </AgGridColumn>
                <AgGridColumn
                    field="gender"
                    filter={true}
                >
                </AgGridColumn>
                <AgGridColumn
                    field="dob"
                    filter={true}
                >
                </AgGridColumn>
                <AgGridColumn
                    field="country"
                    filter={true}
                >
                </AgGridColumn>
                <AgGridColumn
                    field="city"
                    filter={true}
                >
                </AgGridColumn>
            </AgGridReact>
        </div>
    );
};

export default ShowGrid;