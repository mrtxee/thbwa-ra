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
            break;
        default:
            return (
                <CommonDevice device={device}
                              updateDeviceStateMethod={props.updateDeviceStateMethod}
                              postDeviceStateMethod={props.postDeviceStateMethod}
                />
            );
            break;
    }

}

export default DeviceCt;