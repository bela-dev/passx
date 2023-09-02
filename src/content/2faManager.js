import { openInfo } from "../globalComponents/infoDisplay";
import { sendAuthRequest } from "./apiManager"

function enable2FA(setQRCode) {
    sendAuthRequest("account/2fa/enable", "POST", {}, (data) => {
        if(data.status.includes("201")) {
            setQRCode(data.data.qrCode);
        }else if(!data.status.includes("429")) {
            openInfo("Error", data.message);
        }
    }, (err) => {
        openInfo("Error", "An error occured while enabling 2FA");
    });
}

export {enable2FA}