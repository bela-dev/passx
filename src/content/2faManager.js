import { openInfo } from "../globalComponents/infoDisplay";
import { sendAuthRequest } from "./apiManager"

function disable2FA(callback) {
    sendAuthRequest("account/2fa/disable", "DELETE", {}, (data) => {
        callback(data.status.includes("200"));
    }, () => {
        openInfo("Error", "An error occured while trying to disable 2FA");
    })
}

function enable2FA(setQRCode) {
    sendAuthRequest("account/2fa/enable", "POST", {}, (data) => {
        if(data.status.includes("201")) {
            setQRCode(data.data.qrCode.replace("http://", "https://").replace(":80", ""));
        }else if(!data.status.includes("429")) {
            openInfo("Error", data.message);
        }
    }, (err) => {
        openInfo("Error", "An error occured while enabling 2FA");
    });
}

function confirm2FA(otp, callback) {
    sendAuthRequest("account/2fa/confirm", "POST", {
        "otp": otp
    }, (data) => {
        callback(data.status.includes("200"));

    }, (data) => {
        console.log("Error");
        return;
    })
}

function is2FAActivated(callback) {
    sendAuthRequest("account/2fa/status", "GET", {}, (data) => {
        if(data.status.includes("429")) return;
        callback(data.data.status === "activated");
    }, (data) => {
        callback(false);
    })
}

export {enable2FA, is2FAActivated, confirm2FA, disable2FA}