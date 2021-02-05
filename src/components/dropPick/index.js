import React ,{useRef, useState, useImperativeHandle, forwardRef, useEffect} from 'react';
import './style.scss';

const DropPick = forwardRef((props, ref) => {


    console.log(props);
    const [dateVal , setdateVal] = useState(props.value);

    const dateRef = useRef();

    useEffect(() => {

    }, [dateVal])

    useImperativeHandle(ref, () => {
        return {
            getValue() {
                return dateVal;
            }
        };
    });
    return (
        <div>
            <input ref={dateRef} onChange={(e) => {setdateVal(e.target.value)}} value={dateVal} className="date-container" type="date"></input>
        </div>
        
    )
});

export default DropPick;