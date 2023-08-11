import React from "react";

const Extra = ({signinModalID}) => {
    return (
        <div>
            <p>
                extra page
            </p>
            <p>
            <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target={"#"+signinModalID}>
                toggle modal {"#"+signinModalID}
            </button>
            </p>
        </div>
    );
};

export default Extra;