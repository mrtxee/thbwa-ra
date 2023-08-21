import React from "react";
import HomeDropdownSelector from "./HomeDropdownSelector";
import {Dropdown, DropdownButton, Stack} from "react-bootstrap";

function HomeHeader({homes, defaultValue, value, onChange}) {
    let home1 = homes.filter(h => h.home_id === Number(value))[0];
    if (!home1) {
        home1 = {
            name: "home",
            geo_name: "address"
        };
    }

    return (
        <Stack direction="horizontal" gap={1} className={"my-3 align-items-end"}>
            <div className={""}>
                <span className="h3">{home1.name}
                    <small className="text-muted"> {home1.geo_name}
                    </small>
                </span>
            </div>

            {(homes.length > 1) && (
                <DropdownButton
                    align="end"
                    title={""}
                    id="dropdown-menu-align-end"
                    variant="outline-secondary" size="sm"
                >
                    <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                    {homes.map((home, index) =>
                        <Dropdown.Item eventKey={home.home_id}>{home.name}</Dropdown.Item>
                    )}
                </DropdownButton>
            )}
        </Stack>
    );
}

export default HomeHeader;