import React from 'react';

const MyToast = ({myToasId}) => {
    return (<div className="toast-container position-fixed bottom-0 end-0 p-3">
            <div id={myToasId} className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                    <strong className="me-auto">Bootstrap</strong>
                    <small>11 mins ago</small>
                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body">
                    Hello, world! This is a toast message.
                </div>
            </div>
        </div>

    );
};

export default MyToast;