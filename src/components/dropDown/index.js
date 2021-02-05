import React , {useState , useEffect} from 'react';
import DropdownImg from '../../assets/svg/drop-down-arrow.svg';
import './style.scss';

function Dropdown(props) {
    const [genderVal , setgenderVal] = useState()

    useEffect(() => {
        if(props.value) {
            setgenderVal(props.value)
        } else {
            setgenderVal(props.dropType);
        }
    }, [props])
    return (
        <div className="gender-container">
            <span className={(props.value) ? " " : "placeholder"}>{genderVal}</span>
            <img src={DropdownImg} />
        </div>
    )
}

export default Dropdown;