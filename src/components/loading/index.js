import React from 'react';
import Spinner from '../../assets/svg/spinner.svg';
import './style.scss';

function Loader() {
    return (
        <div className="loader-container">
            <img src={Spinner} alt = 'spinner'/>
        </div>
    )
}

export default Loader;