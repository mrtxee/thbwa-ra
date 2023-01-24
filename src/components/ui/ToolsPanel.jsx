import React from "react";

function ToolsPanel() {
    return (
        <div className={"container p-0"}>
            <div className={"d-flex flex-row"}>
                <div className={"me-2 align-text-bottom"}>
                    <a className="btn btn-light" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="toolsPanelCollapse" href="#toolsPanelCollapse" >
                        <i className="bi bi-gear"></i>
                    </a>
                </div>
                <div id="toolsPanelCollapse" className={"collapse flex-fill"}>
                    <div id="toolsPanelCollapse" className={"collapse d-flex flex-row"}>
                        <div className={"me-2"} >
                            <div className="btn-group m-0 p-0" role="group">
                                <button type="button" className="btn btn-primary">
                                    <i className="bi bi-arrow-clockwise"></i>
                                    Load Smart Homes
                                </button>
                            </div>
                        </div>
                        <div className="flex-fill align-items-center">
                            <code>Loading...</code>
                            <div className="spinner-border text-primary ms-2" role="status" aria-hidden="true"></div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default ToolsPanel;