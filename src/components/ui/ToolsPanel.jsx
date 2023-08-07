import React, {useEffect, useState} from "react";
import PostService from "../../api/PostService";
import {Button, Modal} from 'react-bootstrap';


function ToolsPanel({loadSmartHomesSuccessCallback, loadSmartHomesRecommendFlag, errorMsgCallback, successMsgCallback, badCredentialErrorCallback}) {
    const [panelText, setPanelText] = useState([]);
    const [spinnerVisibility, setSpinnerVisibility] = useState('invisible'); //d-none d-block

    const [showLoadSmartHomesConfirmationModal, setShowLoadSmartHomesConfirmationModal] = useState(false);
    const loadSmartHomesConfirmationModalCloseHandler = () => setShowLoadSmartHomesConfirmationModal(false);
    const loadSmartHomesConfirmationModalSubmitHandler = () => {
        loadSmartHomesConfirmationModalCloseHandler();
        smartHomesLoadClickHandler();
    };

    useEffect( () => {
        setShowLoadSmartHomesConfirmationModal(loadSmartHomesRecommendFlag);
        if(loadSmartHomesRecommendFlag)
            document.getElementById("toolsPanelCollapse").classList.add('show');
    },[loadSmartHomesRecommendFlag])

    function errorHandler(msg){
        errorMsgCallback(msg);
        setPanelText(msg);
        setSpinnerVisibility('invisible');
    }

    async function smartHomesLoadClickHandler(){
        setSpinnerVisibility('visible');
        setPanelText('5% complete');
        try{
            await PostService.fetchHomes().catch(err =>{ throw err })
            setSpinnerVisibility('visible');
            setPanelText('15% complete');

            await PostService.fetchRooms().catch(err =>{ throw err })
            setSpinnerVisibility('visible');
            setPanelText('27% complete');

            await PostService.fetchDevices().catch(err =>{ throw err })
            setSpinnerVisibility('visible');
            setPanelText('68% complete');

            await PostService.fetchDeviceFunctions().catch(err =>{ throw err })
            setSpinnerVisibility('visible');
            setPanelText('84% complete');

            await PostService.fetchRemotes().catch(err =>{ throw err })
            setSpinnerVisibility('visible');
            setPanelText('89% complete');

            await PostService.fetchDeviceRooms().catch(err =>{ throw err })
            loadSmartHomesSuccessCallback();
            successMsgCallback('smart homes loading success');
            setPanelText(null);
            setSpinnerVisibility('invisible');
        }
        catch(err) {
            console.log(err.message);
            if ('badCredentialError'===err.message)
                badCredentialErrorCallback();
            errorHandler('connection error');
        };
    }

    return (
        <div className={"d-flex flex-row"} >
            <div className={"me-2"}>
                <a className="btn btn-outline-secondary" data-bs-toggle="collapse" role="button" aria-expanded="true" aria-controls="toolsPanelCollapse" href="#toolsPanelCollapse">
                    <i className="bi bi-gear"></i>
                </a>
            </div>
            <div id="toolsPanelCollapse" className={"collapse flex-fill"}>
                <div id="toolsPanelCollapseRow" className={"d-flex flex-row align-items-center"}>
                    <div className={"me-2"} >
                        <div className="btn-group btn-group m-0 p-0" role="group">
                            <button type="button" className="btn btn-outline-primary" onClick={smartHomesLoadClickHandler}>
                                <i className="bi bi-arrow-clockwise"> </i>
                                Load Smart Homes
                            </button>
                        </div>
                    </div>
                    <div className="flex-fill">
                        <div className={`spinner-border spinner-border-sm text-danger mx-2 ${spinnerVisibility}`} role="status" aria-hidden="true"></div>
                        <code className={""}>{panelText}</code>
                    </div>
                </div>
            </div>
            <Modal show={showLoadSmartHomesConfirmationModal} onHide={loadSmartHomesConfirmationModalCloseHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>Загрузить устроства?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Умные устройства и дома не обнаружены. Загрузить устройства из Вашего tuya-аккаунта?</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={loadSmartHomesConfirmationModalSubmitHandler}>Загрузить устройства</Button>
                    <Button variant="secondary" onClick={loadSmartHomesConfirmationModalCloseHandler}>Отмена</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ToolsPanel;