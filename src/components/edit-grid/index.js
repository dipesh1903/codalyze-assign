import React, { Component, useState, useEffect } from 'react';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './style.scss';

import Dropdown from '../dropDown/index';
import DropPick from '../dropPick/index';
import PlaceholderInput from '../placeholderInput/index'; 
import Button from '../button/index';
import DeleteButton from '../deleteButton/index';


const App = (props) => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [rowData, setRowData] = useState(props.rowData);
    const [missingFields, setmissingFields] = useState(false);

    
    
    useEffect(() => {
        if(missingFields) {
        }
    },[missingFields])

    function onGridReady(params) {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    }
    
    function emailValid(val) {
        return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(val));
    }

    const emailStyleRules = (params) => {

        if(params.column.columnApi?.context?.isSubmitted) {
            return !params.value ? {backgroundColor: 'red'} : 

            emailValid(params?.value) || params?.value?.length === 0? {backgroundColor: 'white'} : {backgroundColor: 'yellow'}
        } else {
            return (
                emailValid(params?.value) || params?.value?.length === 0? {backgroundColor: 'white'} : {backgroundColor: 'yellow'}
            );
        }
      };

    const nameStyleRules = (params) => {
        if(params.column.columnApi?.context?.isSubmitted) {
            return !params.value ? {backgroundColor: 'red'} : 
            verifyName(params.value) || params.value.length === 0 ? {backgroundColor: 'white'} : {backgroundColor: 'yellow'}
        } else {
            return verifyName(params.value) || params.value.length === 0 ? {backgroundColor: 'white'} : {backgroundColor: 'yellow'}
        }
    }

    const emptyStyleRules = (params) => {
        return params.column.columnApi?.context?.isSubmitted && !params.value ? {backgroundColor: 'red'} : {backgroundColor:'white'};
    }


    function addRow() {

        let val = {
            id: '',
            name: '',
            email: '',
            gender: '',
            dob: '',
            country: '',
            city: '',
            action: ' '
        }

        let data = [...rowData ,val]
        setRowData(data);
    }

    function deleteRow(grid, data) {
        let g = [...grid.props.rowData];
        g.splice(data , 1);
        setRowData(g);
    }

    function submit(e) {
        let checkVal = rowData.filter((item, index)=> {
            let innerVal = Object.entries(item).filter((item2) =>  {
                if (item2[0] == 'name') {
                    return !verifyName(item2[1]) || !item2[1];
                } else if(item2[0] == 'email') {
                    return !verifyEmail(item2[1]) || !item2[1];
                }
                return !item2[1]
        })
            if (innerVal.length > 0) {
                return true;
            }
        });

        if(checkVal.length != 0) {
            setmissingFields(true);
            gridColumnApi.context = {
                isSubmitted: true
            }
            gridApi.redrawRows();
            gridApi.refreshCells({force: true, suppressFlash: true});
            alert('Please verify the fields!!')
        } else {
            gridColumnApi.context = {
                isSubmitted: missingFields
            }
            alert('Data saved successfully')
            setmissingFields(false);
            props.onSubmit(rowData);
        }
    }

    function verifyName(data) {
        return data.length >= 3;
    }

    function verifyEmail(data) {
        return emailValid(data);
    }

    function nameTooltip(params) {
        if (!verifyName(params.data)) {
            return "name should not be less than 3 characters long";
        } else {
            return params.value;
        }
        
    }

    function emailTooltip(params) {
        if(emailValid(params?.value) || params?.value?.length === 0) {
            return params.value
        } else {
            return 'Invalid Email Id'
        }
    }

    function deleteRows(e, type){

        gridColumnApi.context = {
            isSubmitted: false
        }

        let nodes = gridApi.getSelectedNodes();
        let indexes = [];
        nodes.forEach((item, index) => {
            indexes.push(+item.id);
        });
        let val ; 
        if(type) {
            val = rowData.filter((item, index) => !indexes.includes(index));
        } else {
            val = rowData.filter((item, index) => indexes.includes(index));
        }
        setRowData(val);
        alert('Fields Deleted . To save changes please submit');
    }

    return (
        <div style={{width:'100%'}}>
            <div>
                <Button onClick={addRow} value={"Add Row"} />
                <Button onClick={(e) => deleteRows(e,1)} value={"Delete Selected Rows"} />
                <Button onClick={(e) => deleteRows(e, 0)} value={"Delete Non Selected Rows"} />
                <Button onClick={submit} value={"Submit"} />
            </div>
        <div className="ag-theme-alpine" style={{ height: 200, width: '100%' }}>

            <AgGridReact
                onGridReady={onGridReady}
                rowData={rowData}
                singleClickEdit={true}
                frameworkComponents={{
                    dropDownRenderer: Dropdown, 
                    placeholderRenderer : PlaceholderInput,
                    deleteBtnRenderer: DeleteButton,
                    dropPickEditor: DropPick,
                    
                }}

                enableBrowserTooltips={true}

                rowSelection="multiple"> 
                <AgGridColumn
                    field="id"
                    editable={true}
                    sortable={true}
                    resizable={true}
                    filter={true}
                    checkboxSelection={true}
                    cellRenderer = "placeholderRenderer"
                    cellRendererParams = {{
                        customType: 'id'
                    }}
                    cellStyle={emptyStyleRules}
                    
                >
                </AgGridColumn>
                <AgGridColumn
                    field="name"
                    editable={true}
                    sortable={true}
                    resizable={true}
                    filter={true}
                    cellRenderer = "placeholderRenderer"
                    cellRendererParams = {{
                        customType: 'name'
                    }}
                    cellStyle={nameStyleRules}
                    tooltipValueGetter={nameTooltip}
                >
                </AgGridColumn> 
                <AgGridColumn
                    field="email"
                    editable={true}
                    sortable={true}
                    resizable={true}
                    filter={true}
                    cellStyle={emailStyleRules}
                    cellRenderer = "placeholderRenderer"
                    cellRendererParams = {{
                        customType: 'email'
                    }}
                    tooltipValueGetter={emailTooltip}
                >
                </AgGridColumn>
                <AgGridColumn
                    field="gender"
                    editable={true}
                    sortable={true}
                    resizable={true}
                    filter={true}
                    cellRenderer = "dropDownRenderer"
                    cellRendererParams = {{
                        dropType: "Gender"
                    }}
                    cellEditor="agSelectCellEditor"
                    cellEditorParams={{
                        values: ['Male', 'Female']
                    }}
                    cellStyle={emptyStyleRules}
                    tooltipField="tooltip"
                >
                </AgGridColumn>
                <AgGridColumn
                    field="dob"
                    editable={true}
                    sortable={true}
                    resizable={true}
                    filter={true}
                    cellEditor="dropPickEditor"
                    cellRenderer = "placeholderRenderer"
                    cellRendererParams = {{
                        customType: 'dob'
                    }}
                    cellStyle={emptyStyleRules}
                >
                </AgGridColumn>
                <AgGridColumn
                    field="country"
                    editable={true}
                    sortable={true}
                    resizable={true}
                    filter={true}
                    cellRenderer = "dropDownRenderer"
                    cellRendererParams = {{
                        dropType: "Country"
                    }}
                    cellEditor="agSelectCellEditor"
                    cellEditorParams={{
                        values: ['skjsf', 'gsdfhskf']
                    }}
                    cellStyle={emptyStyleRules}
                    tooltipField="tooltip"
                >
                </AgGridColumn>
                <AgGridColumn
                    field="city"
                    editable={true}
                    sortable={true}
                    resizable={true}
                    filter={true}
                    cellRenderer = "placeholderRenderer"
                    cellRendererParams = {{
                        customType: 'city'
                    }}
                    cellStyle={emptyStyleRules}
                    tooltipField="tooltip"
                >
                </AgGridColumn>
                <AgGridColumn
                    field=""
                    resizable={true}
                    cellRenderer="deleteBtnRenderer"
                    cellRendererParams = {{
                        clicked : deleteRow
                    }}
                >
                </AgGridColumn>
            </AgGridReact>
        </div>
        </div>
    );
};

function getDatePicker() {
    function Datepicker() {}
    Datepicker.prototype.init = function (params) {
      this.eInput = document.createElement('input');
      this.eInput.value = params.value;
      this.eInput.classList.add('ag-input');
      this.eInput.style.height = '100%';
      this.eInput.style.width = '100%';
      this.eInput.type="date";
      this.eInput.focus();
      this.eInput.select();
    };
    Datepicker.prototype.getGui = function () {
        this.eInput.focus();
        this.eInput.select();
      return this.eInput;
    };
    Datepicker.prototype.afterGuiAttached = function () {
      this.eInput.focus();
      this.eInput.select();
    };
    Datepicker.prototype.getValue = function () {
      return this.eInput.value;
    };
    Datepicker.prototype.destroy = function () {};
    Datepicker.prototype.isPopup = function () {
      return false;
    };
    return Datepicker;
  }

export default App;