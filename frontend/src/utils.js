import {toast} from 'react-toastify';

export const handleSuccess = (message) => {
    toast.success(message, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,

    })
}

export const handleError = (msg) => {
    toast.error(msg, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
    })
}