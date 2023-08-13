import React, {useContext, useEffect, useState} from 'react';
import {toast_error} from "../../components/ui/ToastCt";
import PostServiceV2 from "../../api/PostServiceV2";
import {UserContext} from "../../context";
import GoogleLoginButton from "../../components/ui/GoogleLoginButton/GoogleLoginButton";

const UnitsDev = () => {
    const {loginData, setLoginData, getLoginDataByToken} = useContext(UserContext);
    const [consoleText, setConsoleText] = useState({'start': 'state'});
    const defaultErrorHandler = (errMessage) => {
        toast_error(errMessage);
        setConsoleText(errMessage);
    }
    useEffect(() => {
        let txt = {'TOKEN': 'state'}
        if (loginData) {
            txt = loginData;
            txt['TOKEN'] = localStorage.getItem('token');
        }
        txt['TOKEN'] = localStorage.getItem('token');
        setConsoleText(txt);
    }, [loginData]);


    return (<div className="container">
            <div className="row align-items-start">
                <div className="col-4">
                    <button className='btn btn-secondary'
                            onClick={() => {
                                PostServiceV2.fetchDeviceFunctions((errMessage) => {
                                    toast_error(errMessage);
                                    throw errMessage;
                                }, (res) => {
                                    console.log(res);
                                    setConsoleText(res)
                                })
                            }}>load devices-functions
                    </button>
                    <hr/>
                    <button className='btn btn-secondary'
                            onClick={() => {
                                PostServiceV2.sendRCC((errMessage) => defaultErrorHandler(errMessage), (res) => setConsoleText(res), '53436805c44f33b7cadc', {"switch_led_1": true})
                            }}>send device rcc
                    </button>
                    <hr/>
                    <button className='btn btn-secondary'
                            onClick={() => {
                                PostServiceV2.getDeviceState((errMessage) => defaultErrorHandler(errMessage), (res) => setConsoleText(res), '321728022462ab4df0d5')
                            }}>get device state
                    </button>
                    <hr/>
                    <button className='btn btn-secondary'
                            onClick={() => {
                                PostServiceV2.getHomesRoomsDevices((errMessage) => defaultErrorHandler(errMessage), (res) => setConsoleText(res))
                            }}>get homes
                    </button>
                    <hr/>
                    <button className='btn btn-secondary'
                            onClick={() => {
                                PostServiceV2.getUserData((errMessage) => defaultErrorHandler(errMessage), (res) => setConsoleText(res))
                            }}>geme user data
                    </button>
                    <hr/>
                    <button className='btn btn-secondary'
                            onClick={() => {
                                PostServiceV2.getUserSettings((errMessage) => defaultErrorHandler(errMessage), (res) => setConsoleText(res))
                            }}>geme user settings
                    </button>
                    <hr/>
                    <button className='btn btn-secondary'
                            onClick={() => {
                                setLoginData();
                                localStorage.removeItem("token");
                            }}>Logout
                    </button>
                    <hr/>
                    <button className='btn btn-secondary'
                            onClick={() => {
                                PostServiceV2.isUniqueUsernameCheck((errMessage) => defaultErrorHandler(errMessage), (res) => setConsoleText(res), {'username': 'delmeUser1'});
                            }}>Unique username check
                    </button>
                    <hr/>
                    <button className='btn btn-secondary'
                            onClick={() => {
                                PostServiceV2.registerUser((errMessage) => defaultErrorHandler(errMessage), (res) => setLoginData(res), {
                                    'username': 'delmeUser1',
                                    'password': '****bw',
                                    'email': 'rvanat@mail.ru',
                                    'first_name': 'vasya',
                                    'last_name': 'pupkin'
                                });
                            }}>Register user
                    </button>
                    <hr/>
                    <button className='btn btn-secondary'
                            onClick={() => {
                                PostServiceV2.authenticateUser((errMessage) => defaultErrorHandler(errMessage), (res) => setLoginData(res), {
                                    'username': 'root1',
                                    'password': 'Ss3pLsmbw'
                                });
                            }}>Login
                    </button>
                    <hr/>
                    <button className='btn btn-secondary' onClick={getLoginDataByToken}>Get loginData by token</button>
                    <hr/>
                    <GoogleLoginButton/>
                    <hr/>
                </div>
                <div className="col overflow-hidden">
                    <h4>console</h4>
                    <pre className={""}>
                        <code>{JSON.stringify(consoleText, null, 2)}
                        </code>
                    </pre>
                </div>
            </div>
        </div>);
};

export default UnitsDev;