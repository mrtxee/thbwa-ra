import React from 'react';

const MyModal = ({MyModalId, MyModalCloseRef}) => {
    return (
        <div className="modal fade" id={MyModalId} tabIndex="-1" aria-labelledby={MyModalId+'Label'}
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id={MyModalId+'Label'}>Modal title</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={MyModalCloseRef}></button>
                    </div>
                    <div className="modal-body">
                        ...
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={
                            ()=>{MyModalCloseRef.current.click()}
                        }
                        >Close modal by ref</button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default MyModal;