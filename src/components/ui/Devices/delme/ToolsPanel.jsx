import React, {useEffect, useState} from "react";
import {Button, Modal} from 'react-bootstrap';
import PostServiceV2 from "../../../../api/PostServiceV2";


function ToolsPanel({loadTuyaDevicesSuccessCallback, loadTuyaDevicesRecommendationFlag, successMsgCallback, processTuyaError}) {
    const [panelText, setPanelText] = useState([]);
    const [spinnerVisibility, setSpinnerVisibility] = useState('invisible'); //d-none d-block
    const [showLoadSmartHomesConfirmationModal, setShowLoadSmartHomesConfirmationModal] = useState(false);

    useEffect(() => {
        setShowLoadSmartHomesConfirmationModal(loadTuyaDevicesRecommendationFlag);
        if (loadTuyaDevicesRecommendationFlag)
            document.getElementById("toolsPanelCollapse").classList.add('show');
    }, [loadTuyaDevicesRecommendationFlag])

    async function smartHomesLoadClickHandler() {
        setSpinnerVisibility('visible');
        setPanelText('5% complete');
        try {
            await PostServiceV2.fetchHomes(
                (errMessage, err) => {throw (err)},
                () => setPanelText('15% complete')
            );
            await PostServiceV2.fetchRooms(
                (errMessage, err) => {throw (err)},
                () => setPanelText('27% complete')
            );
            await PostServiceV2.fetchDevices(
                (errMessage, err) => {throw (err)},
                () => setPanelText('68% complete')
            );
            await PostServiceV2.fetchDeviceFunctions(
                (errMessage, err) => {throw (err)},
                () => setPanelText('84% complete')
            );
            await PostServiceV2.fetchRemotes(
                (errMessage, err) => {throw (err)},
                () => setPanelText('89% complete')
            );
            await PostServiceV2.fetchDeviceRooms(
                (errMessage, err) => {throw (err)},
                () => {
                    loadTuyaDevicesSuccessCallback();
                    successMsgCallback('smart homes loading success');
                    setPanelText(null);
                    setSpinnerVisibility('invisible');
                }
            )
        } catch (err) {
            setPanelText('error');
            processTuyaError(err);
        }
    }

    return (
        <div className={"d-flex flex-row"}>
            <div className={"me-2"}>
                <a className="btn btn-outline-secondary" data-bs-toggle="collapse" role="button" aria-expanded="true"
                   aria-controls="toolsPanelCollapse" href="src/components/ui/Devices/delme/ToolsPanel#toolsPanelCollapse">
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

            <Modal show={showLoadSmartHomesConfirmationModal} onHide={() => setShowLoadSmartHomesConfirmationModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Загрузить устроства?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Умные устройства и дома не обнаружены. Загрузить устройства из Вашего
                    tuya-аккаунта?</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                            setShowLoadSmartHomesConfirmationModal(false);
                            smartHomesLoadClickHandler();
                    }}>Загрузить
                        устройства</Button>
                    <Button variant="secondary" onClick={() => setShowLoadSmartHomesConfirmationModal(false)}>Отмена</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ToolsPanel;