import DeviceCt from "./DeviceCt";
import React from "react";

function HomeSelector({homes, defaultValue, value, onChange}) {
    let home1 = homes.filter(h => h.home_id === Number(value))[0];
    if(!home1){
        home1 = {
            name: "home",
            geo_name: "address"
        };
    }
    return (
        <div className={"row my-3"}>
            <div className={"col-lg-8"}>
                <p className="h3">{home1.name}
                    <small className="text-muted">{home1.geo_name}
                    </small>
                </p>
            </div>
            <div className={"col-lg-4"}>
                <div className={"form-floating"}>
                    <select
                        value={value}
                        onChange={e => onChange( e.target.value )}
                        className="form-select form-select" aria-label=".form-select-lg example">
                        <option defaultValue disabled={true} value="0">{defaultValue}</option>
                        {homes.map((home, index) =>
                            <option key={"HomeSelectorOption"+home.home_id} value={home.home_id}>{home.name}</option>
                        )}
                    </select>
                    <label htmlFor="floatingInput">{defaultValue}</label>
                </div>
            </div>
        </div>
    );
}
export default HomeSelector;


