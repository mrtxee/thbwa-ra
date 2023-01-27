import React, {useState} from "react";
import PostService from "../../API/PostService";

function ToolsPanel({loadSmartHomesSuccessCallback, errorMsgHandler, successMsgHandler}) {
    const [panelStatus, setPanelStatus] = useState([]);
    const [spinnerVisibility, setSpinnerVisibility] = useState('invisible'); //d-none d-block

    function errorHandler(msg){
        console.log(msg);
        errorMsgHandler(msg);
        setPanelStatus(msg);
        setSpinnerVisibility('invisible');
    }

    async function LoadSmartHomesClickHandler(){
        setSpinnerVisibility('visible');
        setPanelStatus('5% done');
        PostService.fetchHomes().then(resp => {
            const data = resp
            if(!data.success)
                errorHandler('homes loading error');
            else {
                setSpinnerVisibility('visible');
                setPanelStatus('15% done');
                PostService.fetchRooms().then(resp => {
                    const data = resp
                    if(!data.success)
                        errorHandler('rooms loading error');
                    else{
                        setSpinnerVisibility('visible');
                        setPanelStatus('27% done');
                        PostService.fetchDevices().then(resp => {
                            const data = resp
                            if(!data.success)
                                errorHandler('devices loading error');
                            else {
                                setSpinnerVisibility('visible');
                                setPanelStatus('68% done');
                                PostService.fetchDeviceFunctions().then(resp => {
                                    const data = resp
                                    if(!data.success)
                                        errorHandler('functions loading error');
                                    else{
                                        setSpinnerVisibility('visible');
                                        setPanelStatus('84% done');
                                        PostService.fetchDeviceRooms().then(resp => {
                                            const data = resp
                                            if(!data.success)
                                                errorHandler('device rooms loading error');
                                            else{
                                                loadSmartHomesSuccessCallback();
                                                successMsgHandler('smart homes loading success');
                                                setPanelStatus(null);
                                                setSpinnerVisibility('invisible');
                                            }
                                        }).catch(function (error) {
                                            errorHandler('connection error');
                                        })
                                    }
                                }).catch(function (error) {
                                    errorHandler('connection error');
                                })
                            }
                        }).catch(function (error) {
                            errorHandler('connection error');
                        })
                    }
                }).catch(function (error) {
                    errorHandler('connection error');
                })
            }
        }).catch(function (error) {
            errorHandler('connection error');
        });
    }
    return (
        <div className={"container p-0"}>
            <div className={"d-flex flex-row"} >
                <div className={"me-2"}>
                    <a className="btn btn-outline-secondary" data-bs-toggle="collapse" role="button" aria-expanded="true" aria-controls="toolsPanelCollapse" href="#toolsPanelCollapse">
                        <i className="bi bi-gear"></i>
                    </a>
                </div>
                <div id="toolsPanelCollapse" className={"collapse show flex-fill"}>
                    <div id="toolsPanelCollapse" className={"d-flex flex-row align-items-center"}>
                        <div className={"me-2"} >
                            <div className="btn-group btn-group m-0 p-0" role="group">
                                <button type="button" className="btn btn-outline-primary" onClick={LoadSmartHomesClickHandler}>
                                    <i className="bi bi-arrow-clockwise"> </i>
                                    Load Smart Homes
                                </button>
                            </div>
                        </div>
                        <div className="flex-fill">
                            <div className={`spinner-border spinner-border-sm text-danger mx-2 ${spinnerVisibility}`} role="status" aria-hidden="true"></div>
                            <code className={""}>{panelStatus}</code>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default ToolsPanel;