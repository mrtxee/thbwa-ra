import DefaultDeviceCat from "./device_category/DefaultDeviceCat";
import Dj from "./device_category/Dj";
import Kg from "./device_category/Kg";

function DeviceCt({device}) {

    switch (device.category) {
        case "kg":
            return (
                <Kg device={device}/>
            );
            break;
        case "dj":
            return (
                <Dj device={device}/>
            );
            break;
        default:
            return (
                <DefaultDeviceCat device={device}/>
            );
            break;
    }

}

export default DeviceCt;