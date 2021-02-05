import React from 'react';
import DeleteImg from '../../assets/svg/delete.svg';

import './style.scss';

function DeleteButton(props) {

    const {
        clicked,
        data,
        rowIndex,
        agGridReact
    } = props;

    function btnClick() {
        clicked(agGridReact , rowIndex);
    }

    return (
        <div className="delete-btn-container">
            <img onClick={btnClick}  src={DeleteImg}/>
        </div>
    )
}

export default DeleteButton;