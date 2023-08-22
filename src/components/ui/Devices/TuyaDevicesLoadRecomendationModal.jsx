import React from 'react';
import {Button, Modal} from "react-bootstrap";

const TuyaDevicesLoadRecomendationModal = ({showLoadSmartHomesConfirmationModal, setShowLoadSmartHomesConfirmationModal, smartHomesLoadClickHandler}) => {
    return (
        <Modal show={showLoadSmartHomesConfirmationModal}
               onHide={() => setShowLoadSmartHomesConfirmationModal(false)}>
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
                <Button variant="secondary"
                        onClick={() => setShowLoadSmartHomesConfirmationModal(false)}>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TuyaDevicesLoadRecomendationModal;