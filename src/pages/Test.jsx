import React, {useState} from 'react';
import axios from "axios";



const Test = () => {

    const [userContext, setUserContext] = useState([]);
    async function getUserContext() {
        console.log('getUserContext');

        var BACKEND_BASE_URL = 'http://127.0.0.1:8000';
        const response = await axios.get(`${BACKEND_BASE_URL}/api/v1.0/get_context`).catch(function (error) {
            throw error
        })

        if (!response.data.success){
            if(response.data.msgs[1].includes('bad tuya settings provided') || response.data.msgs[1].includes('bad settings provided')){
                throw new Error('badCredentialError')
            }
            //console.log(response.data)
            setUserContext(response.data.msgs);
            //throw new Error('badDataError')

        }
        else setUserContext(response.data.data);
    }

    return (<div>
        <h1>test</h1>
        <p>console:</p>
        <samp className={"m-4"}>{JSON.stringify(userContext, null, 2)}</samp>
        <p className={"m-4"}>
            <button onClick={getUserContext}>go axios</button>
        </p>
    </div>);
};

export default Test;