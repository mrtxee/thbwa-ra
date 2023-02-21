import CommonDevice from "./device_category/CommonDevice";
import Dj from "./device_category/Dj";

function DeviceCt({device, ...props}) {

    switch (device.category) {
        case "dj_OLD":
            return (
                <Dj device={device}
                    updateDeviceStateMethod={props.updateDeviceStateMethod}
                    postDeviceStateMethod={props.postDeviceStateMethod}
                />
            );
        default:
            return (
                <CommonDevice device={device}
                              updateDeviceStateMethod={props.updateDeviceStateMethod}
                              postDeviceStateMethod={props.postDeviceStateMethod}
                              sendRCCMethod={props.sendRCCMethod}
                />
            );
    }

}

export default DeviceCt;