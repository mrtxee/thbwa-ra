import React, {useEffect, useState} from 'react';
import PostService from "../api/PostService";
import {toast_error, toast_success} from "../components/ui/ToastCt";
import ToolsPanel from "../components/ui/ToolsPanel";
import HomeSelector from "../components/ui/HomeSelector";
import HomeRoomsTabs from "../components/ui/HomeRoomsTabs";
import CredentialsErrorModal from "../components/ui/CredentialsErrorModal";
import PostServiceV2 from "../api/PostServiceV2";

const Devices = () => {
    const [homes, setHomes] = useState([]);
    const [currentHomeID, setCurrentHomeID] = useState(0);
    const [loadSmartHomesRecommendFlag, setLoadSmartHomesRecommendFlag] = useState(false);
    const [showBadCredentialErrorModal, setShowBadCredentialErrorModal] = useState(false);

    useEffect(() => {
        fetchHomes();
    }, [])

    useEffect(() => {
        if (homes.length > 0) {
            setCurrentHomeID(homes[0].home_id)
        }
    }, [homes]);

    function fetchHomes() {
        PostServiceV2.getHomesRoomsDevices(
            (errMsg) => toast_error(errMsg),
            (res) => {
                setHomes(res.data);
                setLoadSmartHomesRecommendFlag(res.data.length < 1);
            }
        );
    }

    function badCredentialErrorModalHandler() {
        setShowBadCredentialErrorModal(true);
    }

    function homeChange(home_id) {
        setCurrentHomeID(Number(home_id));
    }

    async function updateDeviceState(device, setDeviceState) {
        const loadDeviceState = (device, setDeviceState) => PostServiceV2.getDeviceState(
            (errMessage) => {
                toast_error(errMessage)
            },
            (res) => {
                setDeviceState(res.data)
            },
            device.device_id
        );
        loadDeviceState(device, setDeviceState);
        const interval = setInterval(() => {
            loadDeviceState(device, setDeviceState)
        }, 3600 * 1000)
        return () => clearInterval(interval)
    }

    async function postDeviceState(device, newDeviceState) {
        PostServiceV2.putDeviceState(
            (errMessage) => toast_error(errMessage),
            () => {
            },
            device.device_id,
            newDeviceState
        )
    }

    async function sendRCC(device_uuid, remote_uuid, category_id, remote_index, key, key_id) {
        PostService.sendRCC(device_uuid, remote_uuid, category_id, remote_index, key, key_id).then(resp => {
            const data = resp
            if (!'sent' == data) {
                toast_error(`sendRCC error for ${device_uuid}.${remote_uuid}`);
            }
        })
    }

    return (
        <div className={"container container-fluid p-0"}>
            <ToolsPanel
                loadSmartHomesSuccessCallback={fetchHomes}
                loadSmartHomesRecommendFlag={loadSmartHomesRecommendFlag}
                errorMsgCallback={toast_error}
                successMsgCallback={toast_success}
                badCredentialErrorCallback={badCredentialErrorModalHandler}
            />
            <HomeSelector
                value={currentHomeID}
                onChange={homeChange}
                homes={homes}
                renderTheme={localStorage.getItem('theme') == null ? "auto" : localStorage.getItem('theme')}
                defaultValue="select home"
            />
            <HomeRoomsTabs
                home={homes.filter(h => h.home_id === Number(currentHomeID))[0]}
                activeTabIndex={0}
                updateDeviceStateMethod={updateDeviceState}
                postDeviceStateMethod={postDeviceState}
                sendRCCMethod={sendRCC}
            />
            <CredentialsErrorModal
                showBadCredantialsErrorModal={showBadCredentialErrorModal}
                setShowBadCredantialsErrorModal={setShowBadCredentialErrorModal}
            />
        </div>
    );
};

export default Devices;