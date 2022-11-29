import React, {useRef, useState} from 'react';
import {Alert, Button, ButtonGroup, Spinner} from 'reactstrap';
import AlertExample from "./components/ui/alert/alert";
import axios from "axios";

function App() {
    async function getHomes(){
        console.log('getHomes()');
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        console.log(response.data);
    }

    const alertRef = useRef();
    let isAlertExampleVisible=true;
    const onLoadHomesClick = function() {
        console.log('onLoadHomesClick');
        getHomes().then(r => {
            console.log('r is ok');
        });
        toggleAlert();
    }
    const [visible, setVisible] = useState(true);
    const toggleAlert = function (){
        if (visible)
            setVisible(false);
        else setVisible(true);
    }
    return (
    <div>
        <AlertExample
            color="success"
            visible = {visible}
            toggleAlert = {toggleAlert}
            msg = "lorem ipsum"
        />
        <p ref={alertRef}>the stuff is here</p>
        <p>кнопки управления</p>
        <ButtonGroup>
            <Button color="warning" onClick={onLoadHomesClick}>
                load homes
            </Button>
            <Button color="warning">
                load rooms
            </Button>
            <Button color="warning">
                load rooms devices
            </Button>
            <Button color="warning">
                load all
            </Button>
        </ButtonGroup>
        <p>лоадер</p>
        <Spinner color="info">
            Loading...
        </Spinner>
        <p>сообщения: данныне успешно загружены, ошибка</p>
        <Alert color="warning" isOpen={visible} toggle={toggleAlert}>
            hello
        </Alert>
        <p>список элементов пока линейный</p>
    </div>
  );
}

export default App;
