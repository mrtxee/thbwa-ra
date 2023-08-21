import React from 'react';
import {Dropdown} from "react-bootstrap";

const HomeDropdownSelector = ({homes}) => {
    return (
        <Dropdown className={"border"}>
            <Dropdown.Toggle variant="outline-primary" id="HomeDropdownSelectorID" >
                Dropdown Button
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {homes.map((home, index) =>
                    <Dropdown.Item href={"#home_id_"+home.home_id}>{home.name}</Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default HomeDropdownSelector;