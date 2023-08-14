import React from "react";
import {Button, Modal} from "react-bootstrap";
import {Link} from "react-router-dom";

function BadTuyaCredentialsErrorModal({showBadTuyaCredentialsErrorModal, setShowBadTuyaCredentialsErrorModal}) {

    return (
        <Modal show={showBadTuyaCredentialsErrorModal} onHide={setShowBadTuyaCredentialsErrorModal}>
            <Modal.Header closeButton>
                <Modal.Title>Ошибка реквизитов доступа</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Некорректные реквизиты доступа к платформе IOT Tuya. Введите корректные данные <Link to="/user/profile/">в
                профиле</Link> пользователя
            </Modal.Body>
            <Modal.Footer>
                <Link variant="primary" to="/user/profile/" className={"btn btn-primary"}><i className="bi bi-person-fill"></i> Профиль
                    пользователя</Link>
                <Button variant="secondary" onClick={()=>{setShowBadTuyaCredentialsErrorModal(false)}}>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default BadTuyaCredentialsErrorModal;