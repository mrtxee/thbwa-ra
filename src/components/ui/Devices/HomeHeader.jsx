import React, {useEffect, useState} from "react";
import {Col, Collapse, Container, Dropdown, Row} from "react-bootstrap";
import HomeHeaderCaption from "./HomeHeaderCaption";
import PostServiceV2 from "../../../api/PostServiceV2";
import TuyaDevicesLoadRecomendationModal from "./TuyaDevicesLoadRecomendationModal";

function HomeHeader({
                        homes,
                        value,
                        onHomeSelect,
                        loadTuyaDevicesSuccessCallback,
                        loadTuyaDevicesRecommendationFlag,
                        successMsgCallback,
                        processTuyaError
                    }) {
    let home1 = homes.filter(h => h.home_id === Number(value))[0];
    if (!home1) {
        home1 = {
            name: "home",
            geo_name: "address"
        };
    }


    // - - - - - Tools PANEL
    const [toolsPanelIsOpen, setToolsPanelIsOpen] = useState(false);
    const [toolsPanelText, setToolsPanelText] = useState([]);
    const [toolsPanelSpinnerVisibility, setToolsPanelSpinnerVisibility] = useState('invisible'); //d-none d-block
    const [showLoadSmartHomesConfirmationModal, setShowLoadSmartHomesConfirmationModal] = useState(false);

    useEffect(() => {
        setShowLoadSmartHomesConfirmationModal(loadTuyaDevicesRecommendationFlag);
        if (loadTuyaDevicesRecommendationFlag)
            setToolsPanelIsOpen(true);
    }, [loadTuyaDevicesRecommendationFlag])

    async function smartHomesLoadClickHandler() {
        setToolsPanelSpinnerVisibility('visible');
        setToolsPanelText('5% complete');
        try {
            await PostServiceV2.fetchHomes(
                (errMessage, err) => {
                    throw (err)
                },
                () => setToolsPanelText('15% complete')
            );
            await PostServiceV2.fetchRooms(
                (errMessage, err) => {
                    throw (err)
                },
                () => setToolsPanelText('27% complete')
            );
            await PostServiceV2.fetchDevices(
                (errMessage, err) => {
                    throw (err)
                },
                () => setToolsPanelText('68% complete')
            );
            await PostServiceV2.fetchDeviceFunctions(
                (errMessage, err) => {
                    throw (err)
                },
                () => setToolsPanelText('84% complete')
            );
            await PostServiceV2.fetchRemotes(
                (errMessage, err) => {
                    throw (err)
                },
                () => setToolsPanelText('89% complete')
            );
            await PostServiceV2.fetchDeviceRooms(
                (errMessage, err) => {
                    throw (err)
                },
                () => {
                    loadTuyaDevicesSuccessCallback();
                    successMsgCallback('smart homes loading success');
                    setToolsPanelText(null);
                    setToolsPanelSpinnerVisibility('invisible');
                    setToolsPanelIsOpen(false);
                }
            )
        } catch (err) {
            setToolsPanelText('error');
            processTuyaError(err);
        }
    }

    // - - - - - Tools PANEL^^^^^

    return (
        <Container>
            <Collapse in={toolsPanelIsOpen}>
                <Row id="toolsPanelID" className={"flex-fill mb-2"}>
                    <Col className={"p-0 d-flex flex-row align-items-center"}>
                        <div className={"me-2 m-0 p-0"}>
                            <button type="button" className="btn btn-sm btn-outline-primary"
                                    onClick={smartHomesLoadClickHandler}>
                                <i className="bi bi-arrow-clockwise"> </i>
                                Load Smart Homes
                            </button>
                        </div>
                        <div className="flex-fill">
                            <div
                                className={`spinner-border spinner-border-sm text-danger mx-2 ${toolsPanelSpinnerVisibility}`}
                                role="status" aria-hidden="true"></div>
                            <code className={""}>{toolsPanelText}</code>
                        </div>
                    </Col>
                </Row>
            </Collapse>

            <Row className={"mb-3"}>
                <Col className={"p-0"}>
                    {(homes.length > 1) ? (
                        <Dropdown onSelect={e => onHomeSelect(e)}>
                            <Dropdown.Toggle variant="" className={"p-0 m-0 text-start"}>
                                <HomeHeaderCaption home1={home1}/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {homes.map((home, index) =>
                                    <Dropdown.Item eventKey={home.home_id}
                                    >
                                        {home.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : (
                        <HomeHeaderCaption home1={home1}/>
                    )}
                </Col>
                <Col className={"p-0 col-auto"}>
                    <a className="btn btn-outline-secondary btn-sm"
                       onClick={() => setToolsPanelIsOpen(!toolsPanelIsOpen)}
                       aria-controls="toolsPanelID"
                       aria-expanded={toolsPanelIsOpen}>
                        <i className="bi bi-gear"></i>
                    </a>
                </Col>
            </Row>
            <TuyaDevicesLoadRecomendationModal
                showLoadSmartHomesConfirmationModal={showLoadSmartHomesConfirmationModal}
                setShowLoadSmartHomesConfirmationModal={setShowLoadSmartHomesConfirmationModal}
                smartHomesLoadClickHandler={smartHomesLoadClickHandler}
            />
        </Container>
    );
}

export default HomeHeader;