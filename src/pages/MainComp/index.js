import React ,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import EditGrid from '../../components/edit-grid';
import ActionUtils from '../../redux/tables/action';
import ShowGrid from '../../components/showGrid';
import './style.scss';

function App() {

  const rowSelectorData = useSelector((state) => state.tables);
  const dispatch = useDispatch();
  const history = useHistory();

  function submitValue(val) {
    dispatch(ActionUtils.addRow(val))
  }


  return (
    <div>
      <div className="App">
        <EditGrid onSubmit={submitValue} rowData={rowSelectorData.rows}/>
        <div className="show-grid-container">
          <ShowGrid rowData={rowSelectorData.rows} />
        </div>
    </div>
    </div>
  );
}

export default App;
