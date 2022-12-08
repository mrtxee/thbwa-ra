function Kg({device}) {
    return (
        <div className={"col m-1 p-3 border bg-success bg-gradient bg-opacity-25"}>
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
                </small>
            </p>
        </div>
    );
}

export default Kg;