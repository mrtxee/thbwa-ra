import React, {useEffect, useState} from "react";
import {Button, Modal} from 'react-bootstrap';
import PostServiceV2 from "../../api/PostServiceV2";
import {toast_error} from "./ToastCt";


function ToolsPanel({
                        loadSmartHomesSuccessCallback,
                        loadSmartHomesRecommendFlag,
                        errorMsgCallback,
                        successMsgCallback,
                        badCredentialErrorCallback
                    }) {
    const [panelText, setPanelText] = useState([]);
    const [spinnerVisibility, setSpinnerVisibility] = useState('invisible'); //d-none d-block

    const [showLoadSmartHomesConfirmationModal, setShowLoadSmartHomesConfirmationModal] = useState(false);
    const loadSmartHomesConfirmationModalCloseHandler = () => setShowLoadSmartHomesConfirmationModal(false);
    const loadSmartHomesConfirmationModalSubmitHandler = () => {
        loadSmartHomesConfirmationModalCloseHandler();
        smartHomesLoadClickHandler();
    };

    useEffect(() => {
        setShowLoadSmartHomesConfirmationModal(loadSmartHomesRecommendFlag);
        if (loadSmartHomesRecommendFlag)
            document.getElementById("toolsPanelCollapse").classList.add('show');
    }, [loadSmartHomesRecommendFlag])

    function errorHandler(msg) {
        errorMsgCallback(msg);
        setPanelText(msg);
        setSpinnerVisibility('invisible');
    }

    async function smartHomesLoadClickHandler() {
        setSpinnerVisibility('visible');
        setPanelText('5% complete');
        try {
            await PostServiceV2.fetchHomes(
                (errMessage) => {
                    toast_error(errMessage);
                    throw errMessage;
                },
                () => {
                    setSpinnerVisibility('visible');
                    setPanelText('15% complete');
                }
            )
            await PostServiceV2.fetchRooms(
                (errMessage) => {
                    toast_error(errMessage);
                    throw errMessage;
                },
                () => setPanelText('27% complete')
            )
            await PostServiceV2.fetchDevices(
                (errMessage) => {
                    toast_error(errMessage);
                    throw errMessage;
                },
                () => setPanelText('68% complete')
            )
            await PostServiceV2.fetchDeviceFunctions(
                (errMessage) => {
                    toast_error(errMessage);
                    throw errMessage;
                },
                () => setPanelText('84% complete')
            )
            await PostServiceV2.fetchRemotes(
                (errMessage) => {
                    toast_error(errMessage);
                    throw errMessage;
                },
                () => setPanelText('89% complete')
            )
            await PostServiceV2.fetchDeviceRooms(
                (errMessage) => {
                    toast_error(errMessage);
                    throw errMessage;
                },
                () => {
                    loadSmartHomesSuccessCallback();
                    successMsgCallback('smart homes loading success');
                    setPanelText(null);
                    setSpinnerVisibility('invisible');
                }
            )
        } catch (err) {
            console.log(err.message);
            //todo: сделай, чтобы эта проверка работала
            if ('badCredentialError' === err.message)
                badCredentialErrorCallback();
            errorHandler('connection error');
        }
    }

    return (
        <div className={"d-flex flex-row"}>
            <div className={"me-2"}>
                <a className="btn btn-outline-secondary" data-bs-toggle="collapse" role="button" aria-expanded="true"
                   aria-controls="toolsPanelCollapse" href="#toolsPanelCollapse">
                    <i className="bi bi-gear"></i>
                </a>
            </div>
            <div id="toolsPanelCollapse" className={"collapse flex-fill"}>
                <div id="toolsPanelCollapseRow" className={"d-flex flex-row align-items-center"}>
                    <div className={"me-2"}>
                        <div className="btn-group btn-group m-0 p-0" role="group">
                            <button type="button" className="btn btn-outline-primary"
                                    onClick={smartHomesLoadClickHandler}>
                                <i className="bi bi-arrow-clockwise"> </i>
                                Load Smart Homes
                            </button>
                        </div>
                    </div>
                    <div className="flex-fill">
                        <div className={`spinner-border spinner-border-sm text-danger mx-2 ${spinnerVisibility}`}
                             role="status" aria-hidden="true"></div>
                        <code className={""}>{panelText}</code>
                    </div>
                </div>
            </div>
            <Modal show={showLoadSmartHomesConfirmationModal} onHide={loadSmartHomesConfirmationModalCloseHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>Загрузить устроства?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Умные устройства и дома не обнаружены. Загрузить устройства из Вашего
                    tuya-аккаунта?</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={loadSmartHomesConfirmationModalSubmitHandler}>Загрузить
                        устройства</Button>
                    <Button variant="secondary" onClick={loadSmartHomesConfirmationModalCloseHandler}>Отмена</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ToolsPanel;