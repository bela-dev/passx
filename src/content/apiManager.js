import { swipeLeft } from "../globalComponents/animationWrapper";
import { setLoadingBarState } from "../globalComponents/loadingBar";
import { getApiUrlCookie, removeApiUrlCookie, setApiUrlCookie } from "./cookieManager";
import { checkUser, user } from "./userManager";

var DEFAULT_API_URL = "https://api.cuodex.net:443/passx/v3/";
var API_URL = "";

const SERVER_SIDE_ENCRYPTION = true;

// Send request with sessionId
function sendAuthRequest(path, verb, body, onresp, onerr, disableLoadingBar) {
    if(!checkUser()) return;
    sendRequest(path, verb, body, onresp, onerr, "Bearer " + user.getSessionId(), disableLoadingBar);
}

function checkStatus(apiUrl, setStatus) {
    fetch(apiUrl + "general/status", {
        method: "GET",
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.status.includes("429")) return;
        setStatus(data.status.includes("200"));
    })
    .catch((err) => {
        setStatus(false);
    });
}

async function sendRequest(path, verb, body, onresp, onerr, auth, disableLoadingBar) {
    if(!disableLoadingBar) setLoadingBarState(20);
    loadApiUrl();
    await fetch(API_URL + path, {
        method: verb,
        body: Object.keys(body).length ? JSON.stringify(body) : undefined,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': auth
        },
    })
        .then((response) => response.json())
        .then((data) => {
            onresp(data);
            if(!disableLoadingBar) setLoadingBarState(100);
        })
        .catch((err) => {
            onerr(err);
            if(!disableLoadingBar) setLoadingBarState(100);
        });
}

function getApiUrl() {
    loadApiUrl();
    return API_URL;
}

function setApiUrl(newUrl) {
    API_URL = newUrl;
    if(newUrl != DEFAULT_API_URL) {
        setApiUrlCookie(newUrl);
    }else {
        removeApiUrlCookie();
    }
}

function loadApiUrl() {
    if(!API_URL) {
        if(getApiUrlCookie()) {
            API_URL = getApiUrlCookie();
        }else {
            API_URL = DEFAULT_API_URL;
        }
        checkStatus(API_URL, (status) => {
            if(!status && user) {
                swipeLeft("error/500");
            }
        });
    }
}

export {sendRequest, sendAuthRequest, checkStatus, SERVER_SIDE_ENCRYPTION, getApiUrl, setApiUrl};