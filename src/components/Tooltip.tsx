import React, { useEffect } from "react";
import { useState } from "react";

export default function ToolTip(props: any) {
    const [isOpen, setIsOpen] = useState(false); 
    const popupRef: any = React.createRef();

    useEffect(() => {
        popupRef.current.focus();
    })

    function handleClick() {
        setIsOpen(!isOpen);
    }

    return (
        <div onBlur={() => setIsOpen(false)} tabIndex={0} className={`relative text-${props.iconColor}`}>
            <i onClick={() => handleClick()} className="material-icons cursor-pointer fill-current">help</i>

            <div ref={popupRef} className={`${isOpen ? 'absolute' : 'hidden'} z-10 rounded-xl border outline-none p-4 w-60 h-auto shadow-xl top-6 left-0 bg-${props.popupColor} text-${props.textColor}`}>
                <p> {props.popupText} </p>
            </div>
        </div>
    )
}
