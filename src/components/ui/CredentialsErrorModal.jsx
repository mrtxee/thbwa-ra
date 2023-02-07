import React from "react";
import {Button, Modal} from "react-bootstrap";

function CredentialsErrorModal({showBadCredantialsErrorModal, setShowBadCredantialsErrorModal}) {
    function showBadCredantialsErrorModalCloseHandler(){
        setShowBadCredantialsErrorModal(false);
    }
    return (
        <Modal show={showBadCredantialsErrorModal} onHide={showBadCredantialsErrorModalCloseHandler}>
            <Modal.Header closeButton>
                <Modal.Title>Ошибка реквизитов доступа</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Некорректные реквизиты доступа к платформе IOT Tuya. Введите корректные данные <a href="/user/profile/">в профиле</a> пользователя
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" href="/user/profile/"><i className="bi bi-person-fill"></i> Профиль пользователя</Button>
                <Button variant="secondary" onClick={showBadCredantialsErrorModalCloseHandler}>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CredentialsErrorModal;