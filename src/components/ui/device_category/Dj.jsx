function Dj({device}) {
    return (
        <div className={"col m-1 p-3 border bg-warning bg-gradient"}>
            <img
                src={device.icon_url}
                className="rounded float-start"
                alt={device.name}
                style={{height: "60px"}}
            />
            <p>
                {device.name}<br/>
                <small className="text-muted">
                    {device.category}<br/>
                    {device.uuid}
                </small>
            </p>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" />
                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked">on/off</label>
            </div>
        </div>
    );
}

export default Dj;