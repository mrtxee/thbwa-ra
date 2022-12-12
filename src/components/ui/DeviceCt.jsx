import DefaultDeviceCat from "./device_category/DefaultDeviceCat";
import Dj from "./device_category/Dj";

function DeviceCt({device, ...props}) {

    switch (device.category) {
        case "dj":
            return (
                <Dj device={device}
                    passToChild = {props.passToChild}
                />
            );
            break;
        default:
            return (
                <DefaultDeviceCat device={device}
                                  passToChild = {props.passToChild}
                />
            );
            break;
    }

}

export default DeviceCt;