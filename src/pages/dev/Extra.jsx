
import React from "react";
import SigninModal from "../../components/ui/Header/SigninModal";

const Extra = () => {
    const SigninModalID = 'asdfasfd';
    return (
        <div>
            <p>
                extra page
            </p>
            <p>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#"+SigninModalID}>
                sign in
            </button>
            </p>
        </div>
    );
};

export default Extra;