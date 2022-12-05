import React, { useState } from 'react';
import { Alert } from 'reactstrap';

function deviceCt(props) {
    return (
        <Alert color={props.color} isOpen={props.visible} toggle={props.toggleAlert}>
            {props.msg}
        </Alert>
    );
}

export default deviceCt;