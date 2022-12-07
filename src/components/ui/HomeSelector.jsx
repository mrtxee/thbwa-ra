import DeviceCt from "./DeviceCt";
import React from "react";

function HomeSelector({homes, defaultValue, value, onChange}) {
    return (
        <select
            value={value}
            onChange={e => onChange( e.target.value )}
            className="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
        >
            <option defaultValue disabled={true} value="0">{defaultValue}</option>
            {homes.map((home, index) =>
                <option key={"HomeSelectorOption"+home.home_id} value={home.home_id}>{home.name}</option>
            )}
        </select>
    );
}
export default HomeSelector;


