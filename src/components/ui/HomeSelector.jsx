import React, {useEffect} from "react";

function HomeSelector({homes, defaultValue, value, onChange}) {
    let home1 = homes.filter(h => h.home_id === Number(value))[0];
    if(!home1){
        home1 = {
            name: "home",
            geo_name: "address"
        };
    }

    return (
        <div className={"row my-3 align-items-end"}>
            <div className={"col"}>
                <span className="h3">{home1.name}
                    <small className="text-muted"> {home1.geo_name}
                    </small>
                </span>
            </div>

            {(homes.length > 1) && (
            <div className={"col"}>
                <div className={"form-floating"}>
                    <select
                        value={value}
                        onChange={e => onChange( e.target.value )}
                        //className="form-select bg-dark text-white">
                        className = {"form-select "}>
                        <option defaultValue disabled={true} value="0">{defaultValue}</option>
                        {homes.map((home, index) =>
                            <option key={"HomeSelectorOption"+home.home_id} value={home.home_id}>{home.name}</option>
                        )}
                    </select>
                    <label>{defaultValue}</label>
                </div>
            </div>
            )}
        </div>
    );
}
export default HomeSelector;


