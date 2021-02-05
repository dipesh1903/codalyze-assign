import React from 'react';
import './style.scss';

function Button(props) {

    const {
        value,
        onClick
    } = props;
    
    return (
    <button onClick={onClick} className="button-container">{value}</button>
    )
}

export default Button;
