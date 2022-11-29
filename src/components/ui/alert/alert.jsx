import React, { useState } from 'react';
import { Alert } from 'reactstrap';

function AlertExample(props) {
    return (
        <Alert color={props.color} isOpen={props.visible} toggle={props.toggleAlert}>
            {props.msg}
        </Alert>
    );
}

export default AlertExample;