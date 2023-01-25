import React, {useState} from "react";
import PostService from "../../API/PostService";
import {toast} from "react-toastify";

function ToolsPanel({loadSmartHomesSuccessMethod}) {
    const [panelStatus, setPanelStatus] = useState([]);
    const [spinnerVisibility, setSpinnerVisibility] = useState('invisible'); //d-none d-block

    async function LoadSmartHomesClickHandler(){
        console.log('LoadSmartHomesClickHandler click')
        const toastOptions = {
            position: toast.POSITION.BOTTOM_RIGHT,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored"
        };

        setSpinnerVisibility('visible');
        setPanelStatus('5% done');
        PostService.fetchHomes().then(resp => {
            const data = resp
            if(!data.success){
                toast.error(`LoadSmartHomesClickHandler ERROR`,toastOptions);
                setPanelStatus('fetchHomes error');
                setSpinnerVisibility('invisible');
            }
            else {
                setSpinnerVisibility('visible');
                setPanelStatus('15% done');
                PostService.fetchRooms().then(resp => {
                    const data = resp
                    if(!data.success){
                        toast.error(`LoadSmartHomesClickHandler ERROR`,toastOptions);
                        setPanelStatus('fetchRooms error');
                        setSpinnerVisibility('invisible');
                    }
                    else{
                        setSpinnerVisibility('visible');
                        setPanelStatus('27% done');
                        PostService.fetchDevices().then(resp => {
                            const data = resp
                            if(!data.success){
                                toast.error(`LoadSmartHomesClickHandler ERROR`,toastOptions);
                                setPanelStatus('fetchDevices error');
                                setSpinnerVisibility('invisible');
                            }
                            else {
                                setSpinnerVisibility('visible');
                                setPanelStatus('68% done');
                                PostService.fetchDeviceFunctions().then(resp => {
                                    const data = resp
                                    if(!data.success){
                                        toast.error(`LoadSmartHomesClickHandler ERROR`,toastOptions);
                                        setPanelStatus('fetchDeviceFunctions error');
                                        setSpinnerVisibility('invisible');
                                    }
                                    else{
                                        setSpinnerVisibility('visible');
                                        setPanelStatus('84% done');
                                        PostService.fetchDeviceRooms().then(resp => {
                                            const data = resp
                                            if(!data.success){
                                                toast.error(`LoadSmartHomesClickHandler ERROR`,toastOptions);
                                                setPanelStatus('fetchDeviceRooms error');
                                            }
                                            else{
                                                setPanelStatus('');
                                                loadSmartHomesSuccessMethod();
                                            }
                                            setSpinnerVisibility('invisible');
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
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