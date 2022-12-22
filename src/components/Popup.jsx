import React from "react";
import './Popup.css'

const Popup = (props) =>{
    return (props.trigger) ? (
        <div className="popUp">
            <div className="popUpInner">
                <button className="btnClose"
                        onClick={()=>props.setTrigger(false)}>X</button>
                { props.children }
            </div>
        </div>
    ) : "";
}

export default Popup;