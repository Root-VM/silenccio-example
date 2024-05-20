import {Bounce, toast} from "react-toastify";

export const successAlert = (text: string)=> {
    toast(text, {
        position: "bottom-right",
        autoClose: 15000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
}
