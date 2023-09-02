import { sendAuthRequest, sendRequest } from "./apiManager";
import {encrypt, decrypt, encryptEqualOutput} from "./encryptionManager";
import { setParam } from "../globalComponents/globalParams";
import { openInfo } from "../globalComponents/infoDisplay";

import {clearEntries, getEntries} from "./entryManager"

import { SERVER_SIDE_ENCRYPTION } from "./apiManager";
import { getCookieSessionId, getCookieUsername, storeUser } from "./cookieManager";
import { unstoreUser } from "./cookieManager";


class User {

    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    getPasswordTest() {
        return getPasswordTest(this.password);
    }

    setName(name) {
        this.name = name;
    }

    setEmail(email) {
        this.email = email;
    }

    getName() {
        return this.name;
    }

    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }

    setSessionId(sessionId) {
        this.sessionId = sessionId;
    }

    getSessionId() {
        return this.sessionId;
    }

    setEmail(e) {
        this.email = e;
    }

}

const SESSION_CHECK_INTERVAL = 15 * 1000;
var user;
var sessionCheckInterval = -1;

function getDummyUser() {
    return new User("", "", "");
}

function checkUser(navigate) {
    if(!user) {
        if(getCookieSessionId() && getCookieUsername()) {
            if(navigate) navigate("/relogin");
            return false;
        }
        if(!navigate) return;
        setTimeout(() => {
            navigate("/error/401");
        }, 100);
        return false;
    }
    disableSessionCheck();
    sessionCheckInterval = setInterval(() => {
        checkSession(user.getSessionId());
    }, SESSION_CHECK_INTERVAL);
    return true;
}

function disableSessionCheck() {
    clearInterval(sessionCheckInterval);
}

function checkSession(currentSessionId) {
    if(currentSessionId != user.getSessionId()) return;
    sendAuthRequest("auth/check-session", "POST", {}, (data) => {
        if(data.status.includes("401")) {
            clearEntries();
            window.location.href = "/error/601";
            clearInterval(sessionCheckInterval);
        }
    }, (error) => {
        openInfo("Error", error.message);
    }, true);
}

var alreadyLoggingOut = false;

function logout(callback, callbackError) {
    if(alreadyLoggingOut) return;
    alreadyLoggingOut = true;
    if(!checkUser) {
        callbackError();
        return;
    }
    sendAuthRequest("auth/logout", "POST", {}, (data) => {
        if(data.status.includes("200")) {
            callback(data);
            delUserInformation();
        }else {
            openInfo("Error", data.message);            
        }
        alreadyLoggingOut = false;
    }, (error) => {
        openInfo("Error", error.message);
    });
}

function delUserInformation() {
    user = undefined;
    unstoreUser();
}

function register(username, email, password, repeatPassword, callback) {
    if(!(username && password && repeatPassword)) {
        callback({
            status: "400 - Bad Request",
            message: "Please fill in all fields"
        });
        return;
    }
    if(password != repeatPassword) {
        callback({
            status: "400 - Bad Request",
            message: "The passwords you entered do not match"
        });
        return;
    }
    sendRequest("auth/register", "POST", {
        "username": username,
        "email": email,
        "passwordTest": getPasswordTest(password),
        "serverSideEncryption": true,
        "hutchaToken": ""
    }, (data) => {
        callback(data);
    }, (error) => {
        callback(error);
    });
}

function login(username, password, callback) {
    sendRequest("auth/login", "POST", {
        "username": username,
        "passwordTest": getPasswordTest(password)
    }, (data) => {
        if(data.status.includes("200")) {
            user = new User(username, "", password);
            user.setSessionId(data.data.sessionId);
            getAccountInformation((d) => {
                user.setEmail(d.data.user.email);
                callback(data);
            }, (e) => {
                callback({
                    status: "400 - Bad Request",
                    message: "Something went wrong. Please try again later"
                });
            });
        }else {
            callback(data);
        }
        
    }, (error) => {
        openInfo("Error", "An error occured while trying to login");
    });
}

function getAccountInformation(callback, callbackError) {
    sendAuthRequest("account/information", "GET", {}, (data) => {
        callback(data);
    }, (error) => {
        callbackError(error);
    });
}

function updateUserPassword(password, newPassword, callback) {
    var entries = [];
    for(var i = 0; i < getEntries().length; i++) {
        var entry = getEntries()[i];
        console.log(entry);
        entries.push({
            "id": + entry.getId(),
            "title": encrypt(entry.getTitle(), newPassword),
            "url": encrypt(entry.getUrl(), newPassword),
            "username": encrypt(entry.getUsername(), newPassword),
            "email": encrypt(entry.getEmail(), newPassword),
            "password": encrypt(entry.getPassword(), newPassword),
            "description": encrypt(entry.getDescription(), newPassword),
        });
    }
    sendAuthRequest("account/change-password", "PATCH", {
        "passwordTest": getPasswordTest(password),
        "newPasswordTest": getPasswordTest(newPassword),
        "entries": entries
    }, (data) => {
        callback(data);
    }, (error) => {
        openInfo("Error", error.message);
    });
}

function deleteAccount(password, callback) {
    sendAuthRequest("account", "DELETE", {
        "passwordTest": getPasswordTest(password)
    }, (data) => {
        callback(data);
    }, (error) => {
        openInfo("Error", error.message);
    });
}

function updateUser(password, username, email, callback) {
    sendAuthRequest("account/information", "PUT", {
        "passwordTest": getPasswordTest(password),
        "data": {
            "email": email ? email : user.getEmail(),
            "username": username ? username : user.getName()
        }
    }, (data) => {
        if(data.status.includes("200")) {
            user.setEmail(email);
            user.setName(username);
        }
        callback(data);
    }, (error) => {
        openInfo("Error", error.message);
    });
}

function getPasswordTest(password) {
    return encryptEqualOutput("encryptionTest", password);
}

export {login, register, user, checkUser, updateUser, logout, getDummyUser, delUserInformation, updateUserPassword, deleteAccount, disableSessionCheck}