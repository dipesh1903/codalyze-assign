import React , {useState , useEffect} from 'react';
import './style.scss';

function PlaceholderInput(props) {

    const [value , setValue] = useState();
    useEffect(() => {
        if(props.value) {
            setValue(props.value)
        } else {
            setValue(props.customType)
        }
    },[props])
    return (
        <div className={(props.value) ? " " : " placeholder"}>
            {value}
        </div>
    )
}

export default PlaceholderInput;