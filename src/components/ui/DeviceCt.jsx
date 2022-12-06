function DeviceCt(props) {
    return (
        <div style={{border: "1px solid #aaa", margin: "1px 0px"}}>
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