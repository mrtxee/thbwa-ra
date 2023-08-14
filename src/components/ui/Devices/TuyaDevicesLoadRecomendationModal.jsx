import React from 'react';
import {Button, Modal} from "react-bootstrap";

const TuyaDevicesLoadRecomendationModal = ({showTuyaDevicesLoadRecomendationModal, setShowTuyaDevicesLoadRecomendationModal}) => {
    return (
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
    );
};

export default TuyaDevicesLoadRecomendationModal;