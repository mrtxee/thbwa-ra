import {toast, ToastContainer} from "react-toastify";
import React from "react";

export function toast_error(msg){
    const options = {
        position: toast.POSITION.BOTTOM_RIGHT,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored"
    };
    toast.error(msg,options);
}
export function toast_success(msg){
    const options = {
        position: toast.POSITION.TOP_RIGHT,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored"
    };
    toast.success(msg,options);
}

function ToastCt() {
    return (
        <ToastContainer />
    );
}

export default ToastCt;