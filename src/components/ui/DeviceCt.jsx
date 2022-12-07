function DeviceCt(props) {
    return (
        <div className={"col m-1 p-3 border bg-light bg-gradient"}>
            <img
                src={props.device.icon_url}
                className="rounded float-start"
                alt={props.device.name}
                style={{height: "60px"}}
            />
            <p>
                {props.device.name}<br/>
                <small className="text-muted">
                    {props.device.category}<br/>
                </small>
            </p>
        </div>
    );
}

export default DeviceCt;