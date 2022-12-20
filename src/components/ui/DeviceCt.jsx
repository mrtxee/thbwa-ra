import CommonDevice from "./device_category/CommonDevice";
import Dj from "./device_category/Dj";

function DeviceCt({device, ...props}) {

    switch (device.category) {
        case "dj_OLD":
            return (
                <Dj device={device}
                    passToChild = {props.passToChild}
                />
            );
            break;
        default:
            return (
                <CommonDevice device={device}
                              passToChild = {props.passToChild}
                />
            );
            break;
    }

}

export default DeviceCt;